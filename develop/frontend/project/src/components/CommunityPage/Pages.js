import styles from './Pages.module.css';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { faComment, far } from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { BoardPageApi } from '../../communityApi';
import { useAuth } from '../../AuthContext';

const Pages = ({ item, handleTitleClick }) => {
  const [likeClick, setLikeClick] = useState(false);

  const { isLoggedIn } = useAuth();

  return (
    <div className={styles.Pages}>
      <main>
        <div className={styles.main} key={item.id}>
          {item.photo && ( // 이미지가 있을 때만 이미지 영역 렌더링
            <div className={styles.left}>
              <img src={item.photo} alt={item.title} />
            </div>
          )}
          <div className={styles.column}>
            <div className={styles.space}>
              <div
                onClick={() => handleTitleClick(item.id)}
                style={{ cursor: 'pointer' }} // 커서 스타일을 적용합니다
              >
                {item.title}
              </div>
              <div>
                <FontAwesomeIcon className={styles.icon} icon={faComment} />
                {item.reviews_count}
              </div>
            </div>
            <ul className={styles.bottom}>
              <li>{item.writer.nickname}</li> {/* user.name 가져오기 */}
              <li>{item.created_at}</li>
              <li>조회수 {item.views_count}</li>
              <li>
                <FontAwesomeIcon
                  className={styles.icon}
                  style={{ color: 'tomato' }}
                  icon={likeClick ? SolidHeart : far.faHeart}
                  F
                  size="l"
                  onClick={() => {
                    setLikeClick(!likeClick);
                  }}
                />
                {item.likes_count}
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pages;
