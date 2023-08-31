import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';
import { logoutApi } from '../../loginoutApi';
import {
  faCircleUser,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { useIsSearched } from '../ConcertPage/IsSearchedContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Header = () => {
  const navigate = useNavigate();
  const { isSearched, setIsSearched } = useIsSearched();
  //쿠키
  const [cookies] = useCookies(['access_token', 'refresh_token']);
  //초기 로그인 상태설정
  const [isLoggedIn, setIsLoggedIn] = useState(!!cookies.access_token);

  // refresh_token 상태 처리
  const [refreshToken, setRefreshToken] = useState(cookies.refresh_token);

  //페이지 로드시나 로그인/로그아웃 후에 쿠키검사
  useEffect(() => {
    setIsLoggedIn(!!cookies.access_token);
  }, [cookies.access_token]);

  const handleLogout = () => {
    logoutApi()
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          Cookies.remove('access_token');
          Cookies.remove('refresh_token');
          setRefreshToken(null); //refresh_token상태관리 업데이트
          setIsLoggedIn(false); // 로그아웃 상태로 변경
          navigate('/');
        } else {
          // console.error('로그아웃실패', response);
          window.alert('로그아웃 실패했습니다!');
        }
      })
      .catch((error) => {
        // console.error('로그아웃실패라고', error);
        window.alert('로그아웃을 다시 시도해주세요!!');
      });
  };

  useEffect(() => {
    // console.log(isLoggedIn);
  }, [isLoggedIn]); // 이렇게 isLoggedIn이 변경될 때마다 출력

  return (
    <div className={styles.Header}>
      <div className={styles.header_wrapper}>
        <div className={styles.top_wrapper}>
          <div className={styles.top_logo} onClick={() => navigate('/')}>
            IMCA
          </div>
          {isLoggedIn ? (
            <div className={styles.joinUsBtn}>
              <button
                className={styles.joinUs}
                onClick={() => navigate('/mypage')}
              >
                <FontAwesomeIcon icon={faCircleUser} />
              </button>
              <button className={styles.joinUs} onClick={handleLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} />
              </button>
            </div>
          ) : (
            <div className={styles.joinUsBtn}>
              <button
                className={styles.joinUsText}
                onClick={() => navigate('/login')}
              >
                로그인
              </button>
              <button
                className={styles.joinUsText}
                onClick={() => navigate('/signup')}
              >
                회원가입
              </button>
            </div>
          )}
        </div>
        <div className={styles.nav_container}>
          <div className={styles.nav_wrapper}>
            <div className={styles.nav_item}>
              <div>IMCA</div>
              <ul className={styles.item_menu}>
                <li onClick={() => navigate('/team-introduction')}>팀 소개</li>
              </ul>
            </div>
            <div className={styles.nav_item}>
              <div>공연 소식</div>
              <ul className={styles.item_menu}>
                <li
                  onClick={() => {
                    navigate('/concert_all');
                    setIsSearched(false);
                  }}
                >
                  공연/페스티벌
                </li>
              </ul>
            </div>
            <div className={styles.nav_item}>
              <div>커뮤니티</div>
              <ul className={styles.item_menu}>
                <li onClick={() => navigate('/free')}> 자유게시판</li>
                <li onClick={() => navigate('/after')}>공연 후기</li>
                <li onClick={() => navigate('/trade')}>동행 / 양도</li>
              </ul>
            </div>
            <div className={styles.nav_item}>
              <div>콘텐츠</div>
              <ul className={styles.item_menu}>
                <li onClick={() => navigate('/youtube')}>YouTube</li>
              </ul>
            </div>
            <div
              className={styles.nav_item}
              onClick={() => navigate('/my_calender')}
            >
              내 캘린더
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
