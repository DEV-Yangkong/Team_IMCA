import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.Header}>
      <div className={styles.header_wrapper}>
        <div className={styles.top_wrapper}>
          <div className={styles.top_logo} onClick={() => navigate('/')}>
            IMCA
          </div>
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
                <li onClick={() => navigate('/concert_act')}>연극</li>
                <li onClick={() => navigate('/concert_musical')}>뮤지컬</li>
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
            <div
              className={styles.nav_item}
              onClick={() => navigate('/mypage')}
            >
              마이페이지
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
