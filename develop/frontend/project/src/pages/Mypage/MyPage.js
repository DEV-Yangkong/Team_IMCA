import React, { useEffect, useState } from 'react';
import styles from './MyPage.module.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const MyPage = () => {
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
      });
  }, []);

  const password = watch('password', '');
  const [img, setImg] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const onSubmit = [];
  // const onSubmit = async (data) => {
  //  axios.post('/api/v1/updateUser/', data);
  //     console.log(response.data); //마이페이지 수정 성공
  //   } catch (error) {
  //     console.error('error, 내정보수정 실패', error);
  //   }
  // };

  const validatePassword = (value) => {
    if (!value) return '비밀번호 입력해주세요.';
    if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        value,
      )
    )
      return '8글자 이상의 영문 대문자, 소문자, 숫자, 특수기호만 허용됩니다.';
    return true;
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
              <div className={styles.user_item}>
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
