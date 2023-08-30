import React, { useEffect, useState } from 'react';
import styles from './MyPage.module.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

const MyPage = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: 'onBlur' });
  const [cookies] = useCookies('access_token');
  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 엔터 키의 기본 동작 막기
    }
  };

  const [editPassword, setEditPassword] = useState(false);

  const [userData, setUserData] = useState({
    img: '',
    login_id: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    email: '',
    gender: '',
  });

  // const password = watch('password', '');
  const [password, setPassword] = useState('');
  const [img, setImg] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  // const [name, setName] = useState('');
  // const [nickname, setNickName] = useState('');
  // const [email, setEmail] = useState('');
  // const [gender, setGender] = useState('');

  //모달 비밀번호 변경 안할 경우
  const [new_password, setNewPassword] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (new_password === '') {
      // 비밀번호를 변경하지 않은 경우, 이전 비밀번호를 사용하도록 설정
      setNewPassword(password);
    }
    //변경 후 상태 업데이트
    setPasswordChanged(false);

    if (userData.password && new_password !== passwordConfirm) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }
    // if (password !== new_password) {
    //   alert('동일한 비밀번호를 사용할 수 없습니다.');
    //   return;
    // }

    await axios
      .put(
        'http://imca.store/api/v1/users/change/',
        { new_password: new_password },
        {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )
      .then((response) => {
        setUserData(response.data);
        alert('비밀번호가 변경되었습니다!');
        onClose();
        // console.log(userData.password, 'dddkdkdk');
      });
  };
  useEffect(() => {
    axios
      .get(`http://imca.store/api/v1/users/info`, {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('정보수정에러', error);
      });
  }, []);

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append('image', img); // img는 이미지 파일
    formData.append('login_id', userData.login_id.slice(0, 30));
    formData.append('name', userData.name);
    formData.append('nickname', userData.nickname);
    formData.append('email', userData.email);
    formData.append('gender', userData.gender);
    // await axios
    //   .put('http://imca.store/api/v1/users/info', formData, {
    //     headers: {
    //       Authorization: `Bearer ${cookies.access_token}`,
    //       'Content-Type': 'multipart/form-data',
    //     },
    //     withCredentials: true,
    //   })
    //   .then((response) => {
    //     setUserData(response.data);
    //   })
    //   .catch((error) => console.log('정보수정에러', error));
    try {
      const response = await axios.put(
        'http://imca.store/api/v1/users/info',
        formData, // 수정한 부분이 없는 경우
        {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        },
      );

      setUserData(response.data);
      console.log('정보 수정 성공', response.data);
    } catch (error) {
      console.error('정보수정 에러', error);
    }
  };

  const validatePassword = (value) => {
    if (!value)
      return '영문 대소문자, 숫자, 특수 기호 사용하여 총 8글자 이상으로';
    if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        value,
      )
    )
      return '8글자 이상의 영문 대문자, 소문자, 숫자, 특수기호만 허용됩니다.';
    if (password && value !== passwordConfirm) return true;
  };

  const validateEmail = (value) => {
    if (!value) return '이메일 입력하세요.';
    if (!/\S+@\S+\.\S+/.test(value)) return '올바른 이메일 형식이 아닙니다.';
    return true;
  };

  const validateNickname = (value) => {
    if (!value) return '닉네임을 입력하세요.';
    if (!/^[A-za-z0-9가-힣]{3,}$/.test(value)) return '2글자 이상 적어주세요.';
    return true;
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImg(imageUrl);
  };
  const validateGender = (value) => {
    if (!value) return '성별을 선택하세요.';
    return '';
  };
  console.log(userData.gender);
  return (
    <div className={styles.MyPage}>
      <div className={styles.MyPage_container}>
        <div className={styles.MyPage_wrapper}>
          <span>MYPAGE</span>
          <form
            className={styles.MyPage_form}
            onSubmit={handleSubmit(onSubmit)}
          >
            <section className={styles.section}>
              <div className={styles.userImg}>
                <p className={styles.imgBox}>프로필 이미지</p>
                {img && (
                  <img
                    src={img}
                    alt="Profile_img"
                    className={styles.uploadedImg}
                  />
                )}
                <label className={styles.upload_button}>
                  <input
                    className={styles.input_field}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <div className={styles.user_item}>
                아이디
                <input
                  disabled
                  type="text"
                  name="login_id"
                  value={userData.login_id}
                />
              </div>
              {editPassword ? (
                <>
                  <div className={styles.user_item}>
                    비밀번호
                    <input
                      type="password"
                      name="password"
                      value={userData.password || ''}
                      placeholder="대소문자, 특수문자 포함 8글자이상"
                      {...register('password', {
                        validate: validatePassword,
                      })}
                      onChange={(e) =>
                        setUserData({ ...userData, password: e.target.value })
                      }
                    />
                  </div>
                  {errors.password && (
                    <p className={styles.erms}>{errors.password.message}</p>
                  )}
                  <div className={styles.user_item}>
                    비밀번호확인
                    <input
                      placeholder="한번 더 입력"
                      type="password"
                      name="confirmPassword"
                      value={passwordConfirm}
                      {...register('confirmPassword', {
                        validate: (value) =>
                          value === password || '비밀번호가 일치하지 않습니다.',
                      })}
                      onChange={(e) => {
                        setPasswordConfirm(e.target.value);
                      }}
                    />
                  </div>
                  <button>변경하기</button>
                </>
              ) : (
                <>
                  <div className={styles.user_item}>
                    비밀번호
                    {!editPassword && (
                      <button className={styles.modalPwBtn} onClick={onOpen}>
                        비밀번호 변경하기
                        <Modal isOpen={isOpen} onClose={onClose}>
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>비밀번호 변경</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                              {/* 비밀번호 입력 필드 */}
                              <div>
                                <label htmlFor="new_password">
                                  새 비밀번호:
                                </label>
                                <input
                                  type="password"
                                  name="new_password"
                                  placeholder="대소문자, 특수문자 포함 8글자이상"
                                  value={new_password}
                                  {...register('new_password', {
                                    validate: validatePassword,
                                  })}
                                  onChange={(e) =>
                                    setNewPassword(e.target.value)
                                  }
                                />
                                {errors.new_password && (
                                  <p className={styles.error}>
                                    {errors.new_password.message}
                                  </p>
                                )}
                              </div>

                              {/* 비밀번호 확인 입력 필드 */}
                              <div>
                                <label htmlFor="confirmPassword">
                                  새 비밀번호 확인:
                                </label>
                                <input
                                  type="password"
                                  name="confirmPassword"
                                  placeholder="한번 더 입력"
                                  value={passwordConfirm}
                                  {...register('confirmPassword', {
                                    validate: (value) =>
                                      value === new_password ||
                                      '비밀번호가 일치하지 않습니다.',
                                  })}
                                  onChange={(e) => {
                                    setPasswordConfirm(e.target.value);
                                  }}
                                />
                              </div>
                            </ModalBody>

                            <ModalFooter>
                              <button
                                colorScheme="blue"
                                mr={3}
                                onClick={onClose}
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                onClick={handlePasswordChange}
                              >
                                변경하기
                              </button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
                      </button>
                    )}
                  </div>
                </>
              )}

              {/* <div className={styles.user_item}>
                비밀번호 변경
                {showPasswordFields && (
                  <div className={styles.password_fields}>
                    <div style={{ height: '50px', backgroundColor: 'red' }}>
                      비밀번호
                      <input
                        type="password"
                        name="password"
                        // value={userData.password || ''}
                        value={passwordValue}
                        placeholder="대소문자, 특수문자 포함 8글자이상"
                        onChange={(e) =>
                          // setUserData({ ...userData, password: e.target.value
                          setPasswordValue(e.target.value)
                        }
                      />
                    </div>
                    <div>
                      비밀번호 확인
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordConfirmValue}
                        onChange={(e) => {
                          setPasswordConfirmValue(e.target.value);
                        }}
                      />
                    </div>
                    {errors.password && (
                      <p className={styles.erms}>{errors.password.message}</p>
                    )}
                  </div>
                )}
                <button
                  type="button"
                  className={styles.password_btn}
                  onClick={() => {
                    setShowPasswordFields(!showPasswordFields);
                    clearPasswordFields(); // Clear password fields when toggling
                  }}
                >
                  비밀번호 변경
                </button>
              </div> */}
              <div className={styles.user_item}>
                이름
                <input disabled name="name" value={userData.name} />
              </div>
              <div className={styles.user_item}>
                닉네임
                <input
                  type="text"
                  placeholder="닉네임"
                  name="nickname"
                  value={userData.nickname}
                  {...register('nickname', {
                    validate: { validateNickname },
                  })}
                  onChange={(e) => {
                    setUserData({ ...userData, nickname: e.target.value });
                  }}
                  onKeyDown={handleEnterKey}
                />
              </div>
              {errors.nickname && (
                <p className={styles.erms}>{errors.nickname.message}</p>
              )}
              <div className={styles.user_item}>
                이메일
                <input
                  type="text"
                  name="email"
                  value={userData.email}
                  placeholder="IMCA@imca.com"
                  {...register('email', { validate: validateEmail })}
                  onChange={(e) => {
                    setUserData({ ...userData, email: e.target.value });
                  }}
                />
              </div>
              {errors.email && (
                <p className={styles.erms}>{errors.email.message}</p>
              )}
              <div className={styles.user_item}>
                성별
                <select
                  className={styles.select_gender}
                  name="gender"
                  value={userData.gender}
                  {...register('gender', { validate: validateGender })}
                  onChange={(e) => {
                    setUserData({ ...userData, gender: e.target.value });
                  }}
                >
                  <option disabled value={'/'}>
                    성별선택
                  </option>
                  <option value={'male'}>남</option>
                  <option value={'female'}>여</option>
                </select>
              </div>
              {errors.gender && (
                <p className={styles.erms}>{errors.gender.message}</p>
              )}
              <button
                type="submit"
                onClick={onSubmit}
                className={styles.MyPage_btn}
              >
                수정하기
              </button>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};
export default MyPage;
