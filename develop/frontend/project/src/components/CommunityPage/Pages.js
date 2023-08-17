import { useState, useEffect } from 'react';
import styles from './Pages.module.css';
import Pagination from './Pagination';
import { dataList } from '../../pages/Community/BoardPage';
import { Navigate, useNavigate } from 'react-router-dom';
import React from 'react';

import { faComment, far } from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Pages = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(dataList);
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

  return (
    <div className={styles.Pages}>
      <main>
        {posts.slice(offset, offset + limit).map((item, index) => (
          <div className={styles.main} key={item.id}>
            <div className={styles.left}>
              <img src={item.img} alt={item.title} />
            </div>
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
                  {item.reviews}
                </div>
              </div>
              <ul className={styles.bottom}>
                <li>{item.user.name}</li> {/* user.name 가져오기 */}
                <li>{item.date}</li>
                <li>조회수 {item.views}</li>
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
                  {item.like_num}
                </li>
              </ul>
            </div>
          </div>
        ))}
      </main>
      <footer>
        <div className={styles.EditorDiv}>
          <button
            className={styles.EditorButton}
            type="button"
            onClick={() => {
              navigate('/edit/:id');
            }}
          >
            글쓰기
          </button>
        </div>
        <Pagination
          total={posts.length}
          limit={10}
          page={page}
          setPage={setPage}
        />
      </footer>
    </div>
  );
};

export default Pages;
