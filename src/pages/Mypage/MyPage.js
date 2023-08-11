import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import styles from './MyPage.module.css';
import { useForm } from 'react-hook-form';

const MyPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: 'onBlur' });

  const [userData, setUserData] = useState({
    id: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    email: '',
    gender: '',
  });

  // useEffect(() => {
  //   //서버 api 호출하여 데이터 가져오기
  //   axios.get('/api/user').then((response) => {
  //     setUserData(response.data);
  //   });
  // }, []);

  const password = watch('password', '');

  const [img, setImg] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');

  const onSubmit = (data) => {
    // axios.post('/api/upadateUser', data).then((response) => {
    //   console.log(response.data);
    // });
  };
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
                <input disabled type="text" name="id" />
              </div>
              <div className={styles.user_item}>
                비밀번호
                <input
                  type="password"
                  name="password"
                  placeholder="대소문자, 특수문자 포함 8글자이상"
                  // subtext={errors.password?.message}
                  // {...register('password', {
                  //   required: '8글자 이상 영문 대소문자, 숫자, 특수문자 포함',
                  //   minLength: 8,
                  //   pattern: {
                  //     value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
                  //     message:
                  //       '8글자 이상으로 영문 대소문자, 숫자, 특수문자 포함. ',
                  //   },
                  // })}
                  {...register('password', { validate: validatePassword })}
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
                  // subtext={errors.passwordConfirm?.message}
                  // {...register('passwordConfirm', {
                  //   required: '8글자 이상 영문 대소문자, 숫자, 특수문자 포함',
                  //   minLength: 8,
                  //   pattern: {
                  //     value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
                  //     message:
                  //       '8글자 이상으로 영문 대소문자, 숫자, 특수문자 포함. ',
                  //   },
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
                <input disabled name="name" value={`${name}`} />
              </div>
              <div className={styles.user_item}>
                닉네임
                <input
                  type="text"
                  placeholder="닉네임"
                  name="nickname"
                  value={nickname}
                  // subtext={errors.nickname?.message}
                  // {...register('nickname', {
                  //   required: '닉네임 입력하세요',
                  //   minLength: { value: 3, message: '3글자 이상 입력하세요' },
                  //   pattern: {
                  //     value: /^[A-za-z0-9가-힣]{3,10}$/,
                  //     message:
                  //       '가능한 문자: 영문 대소문자, 글자 단위 한글, 숫자',
                  //   },
                  // })}
                  {...register('nickname', {
                    validate: { validateNickname },
                  })}
                  onChange={(e) => {
                    setNickName(e.target.value);
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
                  value={`${email}`}
                  placeholder="IMCA@imca.com"
                  // subtext={errors.email?.message}
                  // {...register('email', {
                  //   required: '이메일은 필수 입니다',
                  //   pattern: {
                  //     value: /\S+@\S+\.\S+/,
                  //     message: '이메일 형식에 맞지 않습니다.',
                  //   },
                  // })}
                  {...register('email', { validate: validateEmail })}
                  onChange={(e) => {
                    setEmail(e.target.value);
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
                  {...register('gender', { validate: validateGender })}
                >
                  <option disabled value={''}>
                    성별선택
                  </option>
                  <option value={'남'}>남</option>
                  <option value={'여'}>여</option>
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
