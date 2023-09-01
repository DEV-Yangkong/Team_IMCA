import styles from './Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock, faHandPointDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { loginoutApi } from '../../loginoutApi';
import axios from 'axios';

const Login = () => {
  const [login_id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie, getCookie, removeCookie] = useCookies([
    'access_token',
    'refresh_token',
  ]);

  const [refreshToken, setRefreshToken] = useState(cookies.refresh_token);

  const navigate = useNavigate();

  // const refreshTokenApi = (refreshToken) => {};

  // const onSubmit = async (e) => {
  //   e.preventDefault(); // 새고고침막기

  //   try {
  //     const response = await loginoutApi(
  //       { login_id: login_id, password: password },
  //       // {
  //       //   withCredentials: true, // 쿠키 전달 설정

  //       //   headers: {
  //       //     'Content-Type': 'application/json',
  //       //   },
  //       // },
  //     );

  //     //로그인 성공시
  //     if (response === 200) {
  //       //토큰 추출, 추출한 토큰을 쿠키에 저장 및 상태관리 라이브러리를 활용하여 저장
  //       const { access_token, refresh_token } = response.data;
  //       //토큰 쿠키에 저장
  //       setCookie('access_token', access_token, {
  //         path: '/',
  //         maxAge: 10,
  //       });
  //       setCookie('refresh_token', refresh_token, {
  //         path: '/',
  //         maxAge: 86400,
  //       });
  //       console.log(response.data);
  //     } else if (response.status === 500) {
  //       console.error('서버 내부 오류:', response.data);
  //       window.alert('서버 내부 오류가 발생했습니다.');
  //     } else {
  //       //로그인 실패시
  //       console.error('로그인실패:', response);
  //       window.alert('로그인에 실패했습니다.');
  //     }
  //     navigate('/');
  //   } catch (error) {
  //     console.error('로그인 실패', error);
  //     window.alert('아이디와 비밀번호를 다시 확인해주세요.');
  //   }
  // };
  const onSubmit = (e) => {
    e.preventDefault();
    loginoutApi({ login_id, password })
      .then((response) => {
        if (response.status === 200) {
          const access_token = response.data.token.access;
          const refresh_token = response.data.token.refresh;
          const oneDay = 24 * 60 * 60 * 1000; //하루만
          const expirationDate = new Date(Date.now() + oneDay);
          setCookie('access_token', access_token, {
            path: '/',
            expires: expirationDate,
          });
          setCookie('refresh_token', refresh_token, {
            path: '/',
          });
          //쿠키 상태업데이트
          setRefreshToken(refresh_token);
          // console.log(response.data);
          // async function refreshAccessToken(refresh_token) {
          //   try {
          //     const response = await axios.post(
          //       `http://imcal.store/api/v1/users/Refresh/`,
          //       { refresh_token: refresh_token },
          //     );
          //     if (response.data.access_token) {
          //       return response.data.access_token;
          //     } else {
          //       throw new Error('로그인을 다시 해주세요.');
          //     }
          //   } catch (error) {
          //     throw new Error('로그아웃, 재로그인이 필요합니다.');
          //   }
          // }
        } else if (response.status === 500) {
          // console.error('서버 내부 오류:', response.data);
          window.alert('서버 내부 오류가 발생했습니다.');
        } else {
          // console.error('로그인 실패:', response.data);
          window.alert('로그인에 실패했습니다.');
        }
        navigate('/');
      })
      .catch((error) => {
        // console.error('로그인 실패', error);
        window.alert(
          '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.',
        );
      });
  };

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    if (name === 'login_id') {
      setId(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login_container}>
        <div className={styles.login_wrapper}>
          <div className={styles.ltBox}>
            <img
              className={styles.photo}
              src="https://img.freepik.com/free-vector/memphis-shape-template-badge-colorful-graphic-design-sticker-psd_53876-157852.jpg?w=1480&t=st=1693417986~exp=1693418586~hmac=b328da7ccd02747ec33c0db2fa89fd6e1747df7e9f5f4d5904e95a96436a93b1"
            />
          </div>
          <div className={styles.rtBox}>
            <div className={styles.login_header}>IMCA</div>
            <div className={styles.rtWrapper}>
              <form onSubmit={onSubmit} className={styles.login_item}>
                <div className={styles.userInfo}>
                  <div className={styles.login_id}>
                    <FontAwesomeIcon icon={faUser} />
                    <input
                      className={styles.user}
                      type="text"
                      name="login_id"
                      value={login_id}
                      placeholder="아이디"
                      required
                      onChange={onChange}
                    />
                  </div>

                  <div className={styles.login_pw}>
                    <FontAwesomeIcon icon={faLock} />
                    <input
                      className={styles.user}
                      type="password"
                      name="password"
                      value={password}
                      placeholder="비밀번호"
                      required
                      onChange={onChange}
                    />
                  </div>
                  <button
                    type="submit"
                    value="로그인"
                    className={styles.btn_login}
                  >
                    로그인
                  </button>
                </div>
              </form>
              <section className={styles.register}>
                <div className={styles.btn_join}>
                  <div>
                    <FontAwesomeIcon icon={faHandPointDown} />
                  </div>
                  <div className={styles.imcaText}> IMCA회원이 아니시라면 </div>
                  <div>
                    <FontAwesomeIcon icon={faHandPointDown} />
                  </div>
                </div>
                <button
                  onClick={() => navigate('/signup')}
                  className={styles.btn_signup}
                >
                  회원가입
                </button>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
