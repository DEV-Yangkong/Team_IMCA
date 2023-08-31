import styles from './SignUp.module.css';
import { useForm } from 'react-hook-form';
import React from 'react';
import { signupApi } from '../../signupApi';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch('password', '');

  const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const signupData = {
        login_id: data.login_id,
        password: data.password,
        nickname: data.nickname,
        email: data.email,
        gender: data.gender,
        name: data.name,
      };
      //signupApi함수 호출 할때 데이터 객체 전달하기
      const response = await signupApi(signupData);
      //회원가입 성공 시 쿠키설정
      setCookie('access_token', response.token.access);
      setCookie('refresh_token', response.token.refresh);

      navigate('/');
    } catch (error) {
      // console.error('회원가입실패', error);
      window.alert('회원가입 실패!');
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
  const validateName = (value) => {
    if (!value) return '이름을 입력하세요.';
    if (!/^[A-za-z0-9가-힣]{3,}$/.test(value)) return '2글자 이상 적어주세요.';
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

  return (
    <div className={styles.SignUp}>
      <div className={styles.SignUp_container}>
        <div className={styles.SignUp_header}>IMCA 회원가입</div>
        <div className={styles.SignUp_wrapper}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.SignUpForm}>
            <section>
              <div className={styles.userText}>
                아이디
                <input
                  className={styles.input_field}
                  name="login_id"
                  type="text"
                  placeholder="아이디를 입력해주세요."
                  {...register('login_id', {
                    required: '아이디를 입력해주세요.',
                    validate: validateUserid,
                  })}
                />
                {errors.login_id && (
                  <p className={styles.erms}>{errors.login_id.message}</p>
                )}
              </div>
              <div className={styles.userText}>
                비밀번호
                <input
                  className={styles.input_field}
                  type="password"
                  name="password"
                  placeholder="8글자, 영문 대소문자, 숫자, 특수문자 포함"
                  {...register('password', {
                    required: '비밀번호를 입력해주세요.',
                    validate: validatePassword,
                  })}
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
                    required: '비밀번호를 입력해주세요.',
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
                  {...register('name', {
                    required: '이름을 입력해주세요.',
                    validate: { validateName },
                  })}
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
                    required: '닉네임을 입력해주세요.',
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
                  {...register('email', {
                    required: '이메일을 입력해주세요.',
                    validate: validateEmail,
                  })}
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
                  {...register('gender', {
                    required: '성별을 선택해주세요.',
                    validate: validateGender,
                  })}
                >
                  <option value="" disabled selected>
                    성별선택
                  </option>
                  <option value={'male'}>남</option>
                  <option value={'female'}>여</option>
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
