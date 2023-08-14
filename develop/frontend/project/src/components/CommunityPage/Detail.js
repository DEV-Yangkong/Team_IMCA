import { useParams } from 'react-router-dom';
import styles from './Detail.module.css';
import { dataList } from '../../pages/Community/BoardPage';
import { useState } from 'react';
import React from 'react';

import { faComment, far } from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Detail = () => {
  const { id } = useParams();
  // 배열에 일치한 ID를 찾아줌
  const post = dataList.find((post) => post.id === parseInt(id));
  const profileImg = post.user.profileImg;
  const [likeClick, SetLikeClick] = useState(false);

  if (!post) {
    return <div>없음</div>;
  }

  return (
    <div className={styles.Detail}>
      <div className={styles.detailHeader}>
        <p className={styles.detailTitle}>{post.title}</p>
      </div>
      <div className={styles.left}>
        <div>
          <div className={styles.detailUser}>
            <img src={profileImg} />
          </div>
        </div>
        <div className={styles.author}>
          <div className={styles.authorTop}>
            <div className={styles.detailId}>{post.user.name}</div>
          </div>
          <div className={styles.authorBottom}>
            <div className={styles.detailDate}>{post.date}</div>
            <div className={styles.detailViews}>조회수 {post.views}</div>
          </div>
        </div>
      </div>
      <div className={styles.detailContent}>
        <div className={styles.detailImg}>
          <img src={post.img} alt={post.title} />
        </div>
        <div className={styles.detailContent}>{post.content}</div>
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
          {post.like_num}
        </div>
        <div className={styles.detailReviews}>
          <FontAwesomeIcon className={styles.icon} icon={faComment} />
          {post.reviews}
        </div>
      </div>
    </div>
  );
};

export default Detail;
