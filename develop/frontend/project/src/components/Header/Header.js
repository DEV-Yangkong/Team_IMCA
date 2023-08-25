import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';
import { logoutApi } from '../../loginoutApi';
import { faL } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const navigate = useNavigate();

  //쿠키
  const [cookies] = useCookies(['access_token', 'refresh_token']);
  //초기 로그인 상태설정
  const [isLoggedIn, setIsLoggedIn] = useState(!!cookies.access_token);

  //페이지 로드시나 로그인/로그아웃 후에 쿠키검사
  useEffect(() => {
    setIsLoggedIn(!!cookies.access_token);
  }, [cookies.access_token]);

  //로그아웃
  // const handleLogout = async () => {
  //   try {
  //     const response = await logoutApi();
  //     console.log(response, '하이');
  //     if (response?.status === 200) {
  //       removeCookies('access_token', { path: '/' });
  //       removeCookies('refresh_token', { path: '/' });
  //       // setIsLoggedIn(false); //로그아웃 상태로 변경
  //       console.log(isLoggedIn);
  //       navigate('/');
  //     } else {
  //       console.error('로그아웃실패', response);
  //       window.alert('로그아웃 실패했다!');
  //     }
  //   } catch (error) {
  //     console.error('로그아웃실패라고', error);
  //     window.alert('로그아웃실펠야!!');
  //   }
  // };
  const handleLogout = () => {
    logoutApi()
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          Cookies.remove('access_token');
          Cookies.remove('refresh_token');
          setIsLoggedIn(false); // 로그아웃 상태로 변경
          navigate('/');
        } else {
          console.error('로그아웃실패', response);
          window.alert('로그아웃 실패했다!');
        }
      })
      .catch((error) => {
        console.error('로그아웃실패라고', error);
        window.alert('로그아웃실펠야!!');
      });
  };

  useEffect(() => {
    console.log(isLoggedIn);
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
                마이페이지
              </button>
              <button className={styles.joinUs} onClick={handleLogout}>
                로그아웃
              </button>
            </div>
          ) : (
            <div className={styles.joinUsBtn}>
              <button
                className={styles.joinUs}
                onClick={() => navigate('/login')}
              >
                로그인
              </button>
              <button
                className={styles.joinUs}
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
                <li onClick={() => navigate('/concert_all')}>공연/페스티벌</li>
              </ul>
            </div>
            <div className={styles.nav_item}>
              <div onClick={() => navigate('/community_all')}>커뮤니티</div>
              <ul className={styles.item_menu}>
                <li onClick={() => navigate('/freeboard')}> 자유게시판</li>
                <li onClick={() => navigate('/concert_review')}>공연 후기</li>
                <li onClick={() => navigate('/gather')}>동행 / 양도</li>
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
