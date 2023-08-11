import styles from './Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock, faHandPointDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // e.preventDefault();
    console.log(data, 'data');
  };
  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    console.log(name, value);
    if (name == 'id') {
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
                name="id"
                value={id}
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
                value={password}
                placeholder="비밀번호"
                required
                onChange={onChange}
              />
            </div>

            <button
              type="submit"
              value="로그인"
              className={styles.btn_signup}
              onSubmit={onSubmit}
            >
              로그인
            </button>
          </form>
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
