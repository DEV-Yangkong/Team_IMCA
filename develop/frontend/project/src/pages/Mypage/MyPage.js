import './MyPage.css';

const MyPage = () => {
  return (
    <div className="MyPage">
      <div className="MyPage_container">
        <div className=" MyPage_wrapper">
          <span>MYPAGE</span>
          <form>
            <section>
              <div className="img">
                <div>프로필사진</div>
                <input
                  type="file"
                  title="file upload"
                  name="files[]"
                  accept="img/jpg, image/png"
                />
              </div>
              <div className="user_item">
                아이디
                <input disabled text={``} />
              </div>
              <div className="user_item">
                비밀번호
                <input
                  type="password"
                  placeholder="대소문자, 특수문자 포함 8글자이상"
                />
              </div>
              <div className="user_item">
                비밀번호확인
                <input type="password" />
              </div>
              <div className="user_item">
                이름
                <input disabled text={``} />
              </div>
              <div className="user_item">
                닉네임
                <input type="text" placeholder="닉네임" />
              </div>
              <div className="user_item">
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
              <button>수정하기</button>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
