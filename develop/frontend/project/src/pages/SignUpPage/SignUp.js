import styles from './SignUp.module.css';
import { useForm } from 'react-hook-form';
import React from 'react';
import axios from 'axios';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch('password', '');

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/accounts/signup/', data);
      console.log(response.data.message);
    } catch (error) {
      console.error('error signup', error);
    }
    // console.log(data);
    // 회원가입 로직처리
  };

  const validateUserid = (value) => {
    if (!value) return '아이디 입력하세요.';
    if (!/^[A-Za-z0-9]{3,}$/.test(value))
      return '3글자 이상의 영문과 숫자만 허용됩니다.';
    return true;
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

  const validateGender = (value) => {
    if (!value) return '성별을 선택하세요.';
    return true;
  };
  // const [img, setImg] = useState(null);
  // const [formData, setFormData] = useState({
  //   id: '',
  //   password: '',
  //   passwordConfirm: '',
  //   name: '',
  //   nickname: '',
  //   email: '',
  //   gender: '',
  //   // 다른 필드도 추가하세요 (name, nickname, email, gender 등)
  // });

  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   const imageUrl = URL.createObjectURL(file);
  //   setImg(imageUrl);
  // };

  return (
    <div className={styles.SignUp}>
      <div className={styles.SignUp_container}>
        <div className={styles.SignUp_header}>IMCA 회원가입</div>
        <div className={styles.SignUp_wrapper}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.SignUpForm}>
            <section>
              {/* <div className={styles.userImg}>
                <p className={styles.imgBox}>프로필 이미지</p>
                {img && (
                  <img src={img} alt="img" className={styles.uploadedImg} />
                )}
                <label className={styles.upload_button}>
                  <input
                    className={styles.input_field}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div> */}

              <div className={styles.userText}>
                아이디
                <input
                  className={styles.input_field}
                  name="id"
                  type="text"
                  placeholder="아이디를 입력해주세요."
                  {...register('id', { validate: validateUserid })}
                />
                {errors.id && (
                  <p className={styles.erms}>{errors.id.message}</p>
                )}
              </div>
              <div className={styles.userText}>
                비밀번호
                <input
                  className={styles.input_field}
                  type="password"
                  name="password"
                  placeholder="8글자, 영문 대소문자, 숫자, 특수문자 포함"
                  {...register('password', { validate: validatePassword })}
                />
                {errors.password && (
                  <p className={styles.erms}>{errors.password.message}</p>
                )}
              </div>
              <div className={styles.userText}>
                비밀번호 확인
                <input
                  className={styles.input_field}
                  type="password"
                  name="confirmPassword"
                  placeholder="비밀번호 재입력"
                  {...register('confirmPassword', {
                    validate: (value) =>
                      value === password || '비밀번호가 일치하지 않습니다.',
                  })}
                />
                {errors.confirmPassword && (
                  <p className={styles.erms}>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <div className={styles.userText}>
                이름
                <input
                  className={styles.input_field}
                  type="text"
                  name="name"
                  placeholder="이름"
                  {...register('name', { required: '이름을 입력해주세요.' })}
                />
                {errors.name && (
                  <p className={styles.erms}>{errors.name.message}</p>
                )}
              </div>
              <div className={styles.userText}>
                닉네임
                <input
                  className={styles.input_field}
                  type="text"
                  name="nickname"
                  placeholder="닉네임"
                  {...register('nickname', {
                    validate: { validateNickname },
                  })}
                />
                {errors.nickname && (
                  <p className={styles.erms}>{errors.nickname.message}</p>
                )}
              </div>

              <div className={styles.userText}>
                이메일
                <input
                  className={styles.input_field}
                  type="text"
                  name="email"
                  placeholder="IMCA@imca.com"
                  {...register('email', { validate: validateEmail })}
                />
                {errors.email && (
                  <p className={styles.erms}>{errors.email.message}</p>
                )}
              </div>
              <div className={styles.input_gender}>
                성별
                <select
                  className={styles.select_field}
                  name="성별"
                  {...register('gender', { validate: validateGender })}
                >
                  <option value={''} disabled>
                    성별선택
                  </option>
                  <option value={'남'}>남</option>
                  <option value={'여'}>여</option>
                </select>
              </div>
              {errors.gender && (
                <p className={styles.erms}>{errors.gender.message}</p>
              )}
              <button className={styles.signUpBtn} type="submit">
                가입하기
              </button>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
