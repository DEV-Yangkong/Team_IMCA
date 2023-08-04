import React from 'react';
import './TeamIntroduction.css'; // TeamIntroduction 컴포넌트와 스타일을 연결하는 CSS 파일
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FaInstagram, FaGithub } from 'react-icons/fa';

const TeamIntroduction = () => {
  const memberBackgroundColors = [
    '#ffe45e', // 양예은
    '#a7c957', // 김희은
    '#52b69a', // 박민정
    '#0582ca', // 김산이
    '#fdc500', // 김진우
    '#3dccc7', // 방민식
  ];

  return (
    <div className="team-introduction">
      <h1>Team_IMCA - I am Calendar</h1>
      <div class="introParagraph">
        <p>
          <br />
          Team_IMCA는 "I am Calendar"의 약자로, 예술 커뮤니티를 위한 서비스를
          개발하는 팀입니다. <br /> <br />
          우리의 목표는 연극과 뮤지컬의 일정을 캘린더로 표시하고 정보를 제공하여
          예술 관련 이벤트를 즐기는 사람들에게 유용한 서비스를 제공하는
          것입니다.
        </p>
      </div>
      <div className="frontEndDescription">
        <h2>" Frontend "</h2>
        <p>
          프론트엔드는 사용자들이 웹 애플리케이션과 상호작용하는 부분을
          담당합니다.
          <br />
          주로 클라이언트 사이드 개발로, 사용자 인터페이스를 구성하고 사용자가
          웹 서비스를 편리하게 이용할 수 있도록 합니다.
          <br />
          우리 팀의 프론트엔드 개발자들은 다음과 같은 역할을 수행합니다.
        </p>
        <div class="frontEndDescription addParagraph">
          <p>
            사용자 인터페이스(UI) 설계 및 구현, 캘린더 뷰어 개발, 이벤트 정보
            표시와 커뮤니티 기능 구현, 프론트엔드 테스팅
          </p>
        </div>
      </div>
      {/* 프론트엔드 개발자 정보 */}
      <div className="team-members">
        {/* 양예은 팀원 정보 */}
        <div className="team-member">
          <div
            className="team-member-container"
            style={{ backgroundColor: memberBackgroundColors[0] }}
          >
            <img src="/images/DEV-Yangkong.png" alt="양콩" />
          </div>
          <div className="team-member-content">
            <h4>양예은(양콩)</h4>
            <p>🩷 Frontend 🩷</p>
            <div className="social-links">
              <a
                href="https://www.instagram.com/hi._.yangkong/"
                className="instagram"
                target="_blank"
              >
                <FaInstagram size={30} />
              </a>
              <a
                href="https://github.com/DEV-Yangkong"
                className="github"
                target="_blank"
              >
                <FaGithub size={30} />
              </a>
            </div>
          </div>
        </div>
        {/* 김희은 팀원 정보 */}
        <div className="team-member">
          <div
            className="team-member-container"
            style={{ backgroundColor: memberBackgroundColors[1] }}
          >
            <img src="/images/hiheeen.png" alt="희은" />
          </div>
          <div className="team-member-content">
            <h4>김희은</h4>
            <p>🩷 Frontend 🩷</p>
            <div className="social-links">
              <a
                href="https://www.instagram.com/_hiniminih_/"
                className="instagram"
                target="_blank"
              >
                <FaInstagram size={30} />
              </a>
              <a
                href="https://github.com/hiheeen"
                className="github"
                target="_blank"
              >
                <FaGithub size={30} />
              </a>
            </div>
          </div>
        </div>
        {/* 박민정 팀원 정보 */}
        <div className="team-member">
          <div
            className="team-member-container"
            style={{ backgroundColor: memberBackgroundColors[2] }}
          >
            <img src="/images/minz0ey.png" alt="민조이" />
          </div>
          <div className="team-member-content">
            <h4>박민정</h4>
            <p>🩷 Frontend 🩷</p>
            <div className="social-links">
              <a
                href="https://www.instagram.com/minz0ey/"
                className="instagram"
                target="_blank"
              >
                <FaInstagram size={30} />
              </a>
              <a
                href="https://github.com/MINZOEY"
                className="github"
                target="_blank"
              >
                <FaGithub size={30} />
              </a>
            </div>
          </div>
        </div>
        {/* 김산이 팀원 정보 */}
        <div className="team-member">
          <div
            className="team-member-container"
            style={{ backgroundColor: memberBackgroundColors[3] }}
          >
            <img src="/images/tanmtn.png" alt="탄산" />
          </div>
          <div className="team-member-content">
            <h4>김산이</h4>
            <p>🩷 Frontend 🩷</p>
            <div className="social-links">
              <a
                href="https://www.instagram.com/_tancong_"
                className="instagram"
                target="_blank"
              >
                <FaInstagram size={30} />
              </a>
              <a
                href="https://github.com/tanmtn"
                className="github"
                target="_blank"
              >
                <FaGithub size={30} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 백엔드 개발자 정보 */}
      <div className="backEndDescription">
        <h2>" Backend "</h2>
        <p>
          백엔드는 웹 애플리케이션의 서버 측 개발을 담당합니다.
          <br />
          주로 서버 사이드 개발로, 프론트엔드와 사용자의 요청을 처리하고
          데이터를 관리합니다.
          <br />
          우리 팀의 백엔드 개발자들은 다음과 같은 역할을 수행합니다.
        </p>
        <div class="backEndDescription addParagraph">
          <p>
            서버 개발과 데이터베이스 설계, 캘린더와 이벤트 데이터 관리, 사용자
            인증 및 보안 기능 구현, 백엔드 테스팅
          </p>
        </div>
      </div>
      <div className="team-members">
        {/* 김진우 팀원 정보 */}
        <div className="team-member">
          <div
            className="team-member-container"
            style={{ backgroundColor: memberBackgroundColors[4] }}
          >
            <img src="/images/sds7629.png" alt="진우" />
          </div>
          <div className="team-member-content">
            <h4>김진우</h4>
            <p>💙 Backend 💙</p>
            <div className="social-links">
              <a
                href="https://www.instagram.com/sds7629/"
                className="instagram"
                target="_blank"
              >
                <FaInstagram size={30} />
              </a>
              <a
                href="https://github.com/sds7629"
                className="github"
                target="_blank"
              >
                <FaGithub size={30} />
              </a>
            </div>
          </div>
        </div>
        {/* 방민식 팀원 정보 */}
        <div className="team-member">
          <div
            className="team-member-container"
            style={{ backgroundColor: memberBackgroundColors[5] }}
          >
            <img src="/images/spaceenterbs.png" alt="빵식" />
          </div>
          <div className="team-member-content">
            <h4>방민식</h4>
            <p>💙 Backend 💙</p>
            <div className="social-links">
              <a
                href="https://www.instagram.com/spaceenterbs/"
                className="instagram"
                target="_blank"
              >
                <FaInstagram size={30} />
              </a>
              <a
                href="https://github.com/spaceenterbs"
                className="github"
                target="_blank"
              >
                <FaGithub size={30} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamIntroduction;
