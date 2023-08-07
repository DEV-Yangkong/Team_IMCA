import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock, faHandPointDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login">
      <div className="login_container">
        <div className="login_wrapper">
          <div className="login_header">IMCA</div>
          <section className="login_item">
            <div className="login_id">
              <FontAwesomeIcon icon={faUser} />
              <input type="text" placeholder="아이디" />
            </div>

            <div className="login_pw">
              <FontAwesomeIcon icon={faLock} />
              <input type="password" placeholder="비밀번호" />
            </div>
          </section>
          <section className="btn">
            <button onClick={() => {}}>로그인</button>
            <div className="btn_join">
              <div>
                <FontAwesomeIcon icon={faHandPointDown} />
              </div>
              <div> IMCA회원이 아니시라면 </div>
              <div>
                <FontAwesomeIcon icon={faHandPointDown} />
              </div>
            </div>
            <button onClick={() => navigate('/signup')}>회원가입</button>
          </section>
        </div>
      </div>
    </div>
  );
};
export default Login;
