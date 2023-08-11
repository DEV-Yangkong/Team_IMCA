import { useState } from 'react';
import styles from './SignUp.module.css';
import { useForm } from 'react-hook-form';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const onSubmit = (data) => {
    console.log(data);
  };
  const [img, setImg] = useState(null);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImg(imageUrl);
  };

  return (
    <div className={styles.SignUp}>
      <div className={styles.SignUp_container}>
        <div className={styles.SignUp_header}>IMCA 회원가입</div>
        <div className={styles.SignUp_wrapper}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.SignUpForm}>
            <section>
              <div className={styles.userImg}>
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
              </div>

              <div className={styles.userText}>
                아이디
                <input
                  className={styles.input_field}
                  name="id"
                  value={id}
                  type="text"
                  placeholder="아이디를 입력해주세요."
                  subtext={errors.id?.message}
                  {...register('id', {
                    required: '아이디를 입력해주세요!',
                    pattern: {
                      minLength: 4,
                      value: /^[a-zA-Z0-9_]+.{4,16}/,
                      message: '최소4글자, 특수문자 사용금지',
                    },
                  })}
                  onChange={(e) => setId(e.target.value)}
                />
                {errors.id && (
                  <p className={styles.erms}>{errors?.id?.message}</p>
                )}
              </div>
              <div className={styles.userText}>
                비밀번호
                <input
                  className={styles.input_field}
                  type="password"
                  name="password"
                  value={password}
                  placeholder="비밀번호"
                  subtext={errors.password?.message}
                  {...register('password', {
                    required: '8글자 이상 영문 대소문자, 숫자, 특수문자 포함',
                    minLength: 8,
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
                      message:
                        '8글자 이상으로 영문 대소문자, 숫자, 특수문자 포함. ',
                    },
                  })}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <p className={styles.erms}>{errors?.password?.message}</p>
                )}
              </div>
              <div className={styles.userText}>
                비밀번호 확인
                <input
                  className={styles.input_field}
                  type="password"
                  name="passwordConfirm"
                  value={passwordConfirm}
                  placeholder="비밀번호 재입력"
                  subtext={errors.passwordConfirm?.message}
                  {...register('passwordConfirm', {
                    required: '비밀번호가 일치하지않습니다.',
                    minLength: 8,
                    pattern: {
                      value:
                        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                      message: '비밀번호가 일치하지않습니다. ',
                    },
                  })}
                  onChange={(e) => {
                    setPasswordConfirm(e.target.value);
                  }}
                />
                {password !== passwordConfirm && (
                  <p className={styles.erms}>
                    {errors?.passwordConfirm?.message}
                  </p>
                )}
              </div>
              <div className={styles.userText}>
                이름
                <input
                  className={styles.input_field}
                  type="text"
                  name="name"
                  value={name}
                  placeholder="이름"
                  subtext={errors.name?.message}
                  {...register('name', {
                    required: '이름을 입력하세요',
                    minLength: { value: 3, message: '3글자 이상 입력하세요' },
                    pattern: {
                      value: /^[A-za-z0-9가-힣]{3,10}$/,
                      message: '가능한 문자: 한글, 영문, 숫자로 입력하세요',
                    },
                  })}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                {errors.name && (
                  <p className={styles.erms}>{errors?.name?.message}</p>
                )}
              </div>
              <div className={styles.userText}>
                닉네임
                <input
                  className={styles.input_field}
                  type="text"
                  name="nickname"
                  value={nickname}
                  placeholder="닉네임"
                  subtext={errors.nickname?.message}
                  {...register('nickname', {
                    required: '닉네임 입력하세요',
                    minLength: { value: 2, message: '2글자 이상 입력하세요' },
                    pattern: {
                      value: /^[A-za-z0-9가-힣]{2,10}$/,
                      message:
                        '가능한 문자: 영문 대소문자, 글자 단위 한글, 숫자',
                    },
                  })}
                  onChange={(e) => {
                    setNickName(e.target.value);
                  }}
                />
                {errors.nickname && (
                  <p className={styles.erms}>{errors?.nickname?.message}</p>
                )}
              </div>

              <div className={styles.userText}>
                이메일
                <input
                  className={styles.input_field}
                  type="text"
                  name="email"
                  value={email}
                  placeholder="IMCA@imca.com"
                  subtext={errors.email?.message}
                  {...register('email', {
                    required: '이메일은 필수 입니다',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: '이메일 형식에 맞지 않습니다.',
                    },
                  })}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                {errors.email && (
                  <p className={styles.erms}>{errors?.email?.message}</p>
                )}
              </div>
              <div className={styles.input_gender}>
                성별
                <select
                  className={styles.select_field}
                  name="성별"
                  value={gender}
                  subtext={errors.gender?.message}
                  {...register('gender', {
                    required: '성별을 선택해주세요.',
                    pattern: { message: '성별을 선택해주세요.' },
                  })}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                >
                  <option disabled value={''}>
                    성별선택
                  </option>
                  <option value={'남'}>남</option>
                  <option value={'여'}>여</option>
                </select>
              </div>
              {errors.gender && (
                <p className={styles.erms}>{errors?.gender?.message}</p>
              )}
              <button className={styles.signUpBtn} type="submit">
                가입완료
              </button>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
