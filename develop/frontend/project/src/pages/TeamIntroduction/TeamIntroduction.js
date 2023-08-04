// src/components/TeamIntroduction.js
import React from 'react';
import './TeamIntroduction.css'; // TeamIntroduction 컴포넌트와 스타일을 연결하는 CSS 파일
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FaInstagram, FaGithub } from 'react-icons/fa';

const TeamIntroduction = () => {
  // 팀원들의 배경색 값을 담은 배열
  const memberBackgroundColors = [
    '#ffc8dd', // 양예은
    '#fefae0', // 김희은
    '#a3b18a', // 박민정
    '#cdb4db', // 김산이
    '#8ecae6', // 김진우
    '#219ebc', // 방민식
  ];

  return (
    <div className="team-introduction">
      <h2>Team_IMCA - I am Calendar</h2>
      <p>
        Team_IMCA는 "I am Calendar"의 약자로, 예술 커뮤니티를 위한 서비스를
        개발하는 팀입니다. <br /> <br />
        우리의 목표는 연극과 뮤지컬의 일정을 캘린더로 표시하고 정보를 제공하여
        예술 관련 이벤트를 즐기는 사람들에게 유용한 서비스를 제공하는 것입니다.
        <br />
        <br />
      </p>
      <h3>팀원 소개</h3>
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
                <FaInstagram size={25} />
              </a>
              <a
                href="https://github.com/DEV-Yangkong"
                className="github"
                target="_blank"
              >
                <FaGithub size={25} />
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
            <img src="/images/tancong.png" alt="희은" />
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
                <FaInstagram size={25} />
              </a>
              <a
                href="https://github.com/hiheeen"
                className="github"
                target="_blank"
              >
                <FaGithub size={25} />
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
                <FaInstagram size={25} />
              </a>
              <a
                href="https://github.com/MINZOEY"
                className="github"
                target="_blank"
              >
                <FaGithub size={25} />
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
            <img src="/images/tancong.png" alt="탄산" />
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
                <FaInstagram size={25} />
              </a>
              <a
                href="https://github.com/tanmtn"
                className="github"
                target="_blank"
              >
                <FaGithub size={25} />
              </a>
            </div>
          </div>
        </div>
        {/* 김진우 팀원 정보 */}
        <div className="team-member">
          <div
            className="team-member-container"
            style={{ backgroundColor: memberBackgroundColors[4] }}
          >
            <img src="/images/tancong.png" alt="진우" />
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
                <FaInstagram size={25} />
              </a>
              <a
                href="https://github.com/sds7629"
                className="github"
                target="_blank"
              >
                <FaGithub size={25} />
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
                <FaInstagram size={25} />
              </a>
              <a
                href="https://github.com/spaceenterbs"
                className="github"
                target="_blank"
              >
                <FaGithub size={25} />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* 추가적인 팀원 소개 내용 */}
    </div>
  );
};

export default TeamIntroduction;
