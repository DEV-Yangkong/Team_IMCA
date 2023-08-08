import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock, faHandPointDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css'; // 모듈 스타일을 불러옴

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.login}>
      <div className={styles.login_container}>
        <div className={styles.login_wrapper}>
          <div
            className={`${styles.login_header} ${styles.custom_login_header}`}
          >
            IMCA
          </div>
          <section className={styles.login_item}>
            <div className={styles.login_id}>
              <FontAwesomeIcon icon={faUser} />
              <input type="text" placeholder="아이디" />
            </div>

            <div className={styles.login_pw}>
              <FontAwesomeIcon icon={faLock} />
              <input type="password" placeholder="비밀번호" />
            </div>
          </section>
          <section className={styles.btn}>
            <button
              className={`${styles.login_button} ${styles.custom_login_button}`}
              onClick={() => {}}
            >
              로그인
            </button>
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
              className={`${styles.signup_button} ${styles.custom_signup_button}`}
              onClick={() => navigate('/signup')}
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
