import React, { useState } from 'react';
import styles from './MyPage.module.css';
import { useForm } from 'react-hook-form';

const MyPage = () => {
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
              <div className={styles.user_item}>
                아이디
                <input disabled value={`${id}`} type="text" name="id" />
              </div>
              <div className={styles.user_item}>
                비밀번호
                <input
                  type="password"
                  placeholder="대소문자, 특수문자 포함 8글자이상"
                  name="password"
                  value={password}
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
              </div>
              {errors.password && (
                <p className={styles.erms}>{errors?.password?.message}</p>
              )}
              <div className={styles.user_item}>
                비밀번호확인
                <input
                  placeholder="한번 더 입력"
                  type="password"
                  name="passwordConfirm"
                  value={passwordConfirm}
                  subtext={errors.passwordConfirm?.message}
                  {...register('passwordConfirm', {
                    required: '8글자 이상 영문 대소문자, 숫자, 특수문자 포함',
                    minLength: 8,
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
                      message:
                        '8글자 이상으로 영문 대소문자, 숫자, 특수문자 포함. ',
                    },
                  })}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </div>{' '}
              {errors.password && (
                <p className={styles.erms}>{errors?.password?.message}</p>
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
                  subtext={errors.nickname?.message}
                  {...register('nickname', {
                    required: '닉네임 입력하세요',
                    minLength: { value: 3, message: '3글자 이상 입력하세요' },
                    pattern: {
                      value: /^[A-za-z0-9가-힣]{3,10}$/,
                      message:
                        '가능한 문자: 영문 대소문자, 글자 단위 한글, 숫자',
                    },
                  })}
                  onChange={(e) => {
                    setNickName(e.target.value);
                  }}
                />
              </div>
              {errors.nickname && (
                <p className={styles.erms}>{errors?.nickname?.message}</p>
              )}
              <div className={styles.user_item}>
                이메일
                <input
                  type="text"
                  name="email"
                  value={`${email}`}
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
              </div>
              {errors.email && (
                <p className={styles.erms}>{errors?.email?.message}</p>
              )}
              <div className={styles.user_item}>
                성별
                <select
                  className={styles.select_gender}
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
