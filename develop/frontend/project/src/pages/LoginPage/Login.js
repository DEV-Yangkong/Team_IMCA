import styles from './Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock, faHandPointDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { loginoutApi } from '../../loginoutApi';

const Login = () => {
  const [login_id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies([
    'access_token',
    'refresh_token',
  ]);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault(); // 새고고침막기

    try {
      const response = await loginoutApi(
        { login_id: login_id, password: password },
        // {
        //   withCredentials: true, // 쿠키 전달 설정

        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // },
      );

      //로그인 성공시
      if (response.status === 200) {
        //토큰 추출, 추출한 토큰을 쿠키에 저장 및 상태관리 라이브러리를 활용하여 저장
        const { access_token, refresh_token } = response.data;
        //토큰 쿠키에 저장
        setCookie('access_token', access_token, {
          path: '/',
          maxAge: 10,
        });
        setCookie('refresh_token', refresh_token, {
          path: '/',
          maxAge: 86400,
        });
        console.log(response.data);
      } else if (response.status === 500) {
        console.error('서버 내부 오류:', response.data);
        window.alert('서버 내부 오류가 발생했습니다.');
      } else {
        //로그인 실패시
        console.error('로그인실패:', response);
        window.alert('로그인에 실패했습니다.');
      }
      navigate('/');
    } catch (error) {
      console.error('로그인 실패', error);
      window.alert('아이디와 비밀번호를 다시 확인해주세요.');
    }
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
          <div className={styles.login_header}>IMCA</div>
          <form onSubmit={onSubmit} className={styles.login_item}>
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

            <button type="submit" value="로그인" className={styles.btn_signup}>
              로그인
            </button>
          </form>
          {/* <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>로그인 실패</ModalHeader>
              <ModalCloseButton />
              <ModalBody>아이디와 비밀번호를 다시 확인해주세요.</ModalBody>
            </ModalContent>
          </Modal> */}
          <section className={styles.btn}>
            <div className={styles.btn_join}>
              <div>
                <FontAwesomeIcon icon={faHandPointDown} />
              </div>
              <div> IMCA회원이 아니시라면 </div>
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
  );
};

export default Login;
