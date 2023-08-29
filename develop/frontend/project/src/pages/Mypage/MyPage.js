import React, { useEffect, useState } from 'react';
import styles from './MyPage.module.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: 'onBlur' });
  const [cookies] = useCookies('access_token');

  const [userData, setUserData] = useState({
    img: '',
    login_id: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    email: '',
    gender: '',
  });
  // 버튼을 눌러야지 비밀번호 입력창 나옴
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [passwordChangeMode, setPasswordChangeMode] = useState(false);

  const togglePasswordChangeMode = () => {
    setPasswordChangeMode(!passwordChangeMode);
    clearPasswordFields(); // Clear password fields when toggling
  };

  const [passwordValue, setPasswordValue] = useState('');
  const [passwordConfirmValue, setPasswordConfirmValue] = useState('');

  const clearPasswordFields = () => {
    setPasswordValue('');
    setPasswordConfirmValue('');
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
        setUserData(response.data);
        alert('회원정보가 수정되었습니다!');
        navigate('/');
      })
      .catch((error) => {
        console.error('정보수정에러', error);
      });
  }, []);

  const updateUserData = () => {
    // axios
    //   .put('http://imca.store/api/v1/users/info', userData, {
    //     headers: {
    //       Authorization: `Bearer ${cookies.access_token}`,
    //     },
    //     withCredentials: true,
    //   })
    //   .then((response) => {
    //     setUserData(response.data);
    //     alert('회원정보가 수정되었습니다!');
    //     navigate('/');
    //   });
  };

  const password = watch('password', '');
  const [img, setImg] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');

  const onSubmit = async (data) => {
    if (showPasswordFields && passwordValue !== passwordConfirmValue) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    await axios
      .put('http://imca.store/api/v1/users/info', userData, {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        setUserData(response.data);
        alert('회원정보가 수정되었습니다!');
        navigate('/');
      });
  };

  const validatePassword = (value, passwordConfirmValue) => {
    if (!value) return '비밀번호 입력해주세요.';
    if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        value,
      )
    )
      return '8글자 이상의 영문 대문자, 소문자, 숫자, 특수기호만 허용됩니다.';
    if (passwordValue && value !== passwordConfirmValue) return true;
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
    return true;
  };

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
              {/* <div className={styles.user_item}>
                비밀번호
                <input
                  type="password"
                  name="password"
                  value={userData.password || ''}
                  placeholder="대소문자, 특수문자 포함 8글자이상"
                  {...register('password', { validate: validatePassword })}
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
              {errors.confirmPassword && (
                <p className={styles.erms}>{errors.confirmPassword.message}</p>
              )} */}

              {/* <div className={styles.user_item}>
                비밀번호 변경
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
              </div>

              {showPasswordFields && (
                <div className={styles.password_fields}>
                  <div>
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
              )} */}

              {passwordChangeMode ? (
                <div className={styles.password_fields_horizontal}>
                  <div className={styles.password_input}>
                    <input
                      type="password"
                      name="password"
                      value={passwordValue}
                      placeholder="새로운 비밀번호"
                      onChange={(e) => setPasswordValue(e.target.value)}
                    />
                  </div>
                  <div className={styles.password_input}>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordConfirmValue}
                      placeholder="비밀번호 확인"
                      onChange={(e) => setPasswordConfirmValue(e.target.value)}
                    />
                  </div>
                  <div className={styles.change_password_btn}>
                    <button type="button">비밀번호 변경하기</button>
                  </div>
                </div>
              ) : (
                <div className={styles.user_item}>
                  비밀번호 변경
                  <button
                    type="button"
                    className={styles.password_btn}
                    onClick={togglePasswordChangeMode}
                  >
                    비밀번호 변경
                  </button>
                </div>
              )}

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
                  <option disabled value={''}>
                    성별선택
                  </option>
                  <option value={'male'}>남</option>
                  <option value={'female'}>여</option>
                </select>
              </div>
              {errors.gender && (
                <p className={styles.erms}>{errors.gender.message}</p>
              )}
              <button type="submit" className={styles.MyPage_btn}>
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
