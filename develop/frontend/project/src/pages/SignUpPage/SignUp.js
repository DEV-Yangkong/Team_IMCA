import './SignUp.css';

const SignUp = () => {
  return (
    <div className="SignUp">
      <div className="SignUp_container">
        <div className="SignUp_header">IMCA 회원가입</div>
        <div className="SignUp_wrapper">
          <form>
            <label htmlFor="files[]" className="user_img">
              <input
                type="file"
                title="file upload"
                name="files[]"
                accept="img/jpg, image/png"
                hidden
              />
            </label>
            <div>
              아이디
              <input type="text" placeholder="아이디" />
            </div>
            <div>
              비밀번호
              <input type="password" placeholder="비밀번호" />
            </div>
            <div>
              비밀번호
              <input type="password" placeholder="비밀번호 확인" />
            </div>
            <div>
              이름
              <input type="text" placeholder="이름" />
            </div>
            <div>
              닉네임
              <input type="text" placeholder="닉네임" />
            </div>
            <div>
              이메일
              <input type="text" placeholder="이메일" />
            </div>
            <div className="input_gender">
              성별
              <select>
                <option disabled>성별선택</option>
                <option>남</option>
                <option>여</option>
              </select>
            </div>
            <button onClick={() => {}}>가입완료</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
