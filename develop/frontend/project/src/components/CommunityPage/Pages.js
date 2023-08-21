import { useState, useEffect } from 'react';
import styles from './Pages.module.css';
import Pagination from './Pagination';
import { pageList } from '../../pages/Community/BoardPage';
import { Navigate, useNavigate } from 'react-router-dom';
import React from 'react';

import { faComment, far } from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Pages = ({ item }) => {
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [likeClick, SetLikeClick] = useState(false);
  const handleClick = () => {
    SetLikeClick(true);
  };

  const offset = (page - 1) * limit; // 데이터 시작 번호

  const handleTitleClick = (id) => {
    navigate(`/board/${id}`); // 클릭한 게시물의 ID로 페이지 이동
  };
  console.log('title', item.title);
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
                className={styles.title}
                onClick={() => handleTitleClick(item.id)}
              >
                {item.title}
              </div>
              <div>
                <FontAwesomeIcon className={styles.icon} icon={faComment} />
                {item.reviews_num}
              </div>
            </div>
            <ul className={styles.bottom}>
              <li>{item.author.nickname}</li> {/* user.name 가져오기 */}
              <li>{item.created_at}</li>
              <li>조회수 {item.reviews_num}</li>
              <li>
                <FontAwesomeIcon
                  className={styles.icon}
                  style={{ color: 'tomato' }}
                  icon={likeClick ? SolidHeart : far.faHeart}
                  size="l"
                  onClick={() => {
                    SetLikeClick(!likeClick);
                  }}
                />
                {item.likes_num}
              </li>
            </ul>
          </div>
        </div>
      </main>
      <footer>
        <Pagination
          total={item.length}
          limit={10}
          page={page}
          setPage={setPage}
        />
      </footer>
    </div>
  );
};

export default Pages;
