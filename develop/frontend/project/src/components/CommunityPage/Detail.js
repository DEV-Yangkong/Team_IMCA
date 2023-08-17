import { useNavigate, useParams } from 'react-router-dom';
import styles from './Detail.module.css';

import { useState } from 'react';
import React from 'react';

import { faComment, far } from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // 배열에 일치한 ID를 찾아줌
  // const post = dataList.find((post) => post.id === parseInt(id));
  // const profileImg = post.user.profileImg;
  const [likeClick, SetLikeClick] = useState(false);

  // if (!post) {
  //   return <div>없음</div>;
  // }
  console.log(id.content);

  return (
    <div className={styles.Detail}>
      <div className={styles.detailHeader}>
        <p className={styles.detailTitle}>{id.title}</p>
      </div>
      <div className={styles.left}>
        <div>
          <div className={styles.detailUser}>
            <img src={id.file} />
          </div>
        </div>
        <div className={styles.author}>
          <div className={styles.authorTop}>
            <div className={styles.detailId}>{id}</div>
          </div>
          <div className={styles.authorBottom}>
            <div className={styles.detailDate}>{id.created_at}</div>
            <div className={styles.detailViews}>조회수 {id.reviews_num}</div>
          </div>
        </div>
      </div>
      <div className={styles.detailContent}>
        <div className={styles.detailImg}>
          <img src={id.photo} alt={id.title} />
        </div>
        <div className={styles.detailContent}>{id.content}</div>
      </div>
      <div className={styles.detailNum}>
        <div className={styles.detailLike}>
          <FontAwesomeIcon
            className={styles.icon}
            style={{ color: 'tomato' }}
            icon={likeClick ? SolidHeart : far.faHeart}
            size="l"
            onClick={() => {
              SetLikeClick(!likeClick);
            }}
          />
          {id.likes_num}
        </div>
        <div className={styles.detailReviews}>
          <FontAwesomeIcon className={styles.icon} icon={faComment} />
          {id.reviews_num}
        </div>
      </div>
      <div className={styles.EditorDiv}>
        <button
          className={styles.listButton}
          type="button"
          onClick={() => navigate(-1)}
        >
          목록
        </button>
        <button
          className={styles.listEditorButton}
          type="button"
          onClick={() => {
            navigate('/edit/:id');
          }}
        >
          글쓰기
        </button>
      </div>
    </div>
  );
};

export default Detail;
