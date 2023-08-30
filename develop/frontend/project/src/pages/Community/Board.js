import Category from '../../components/CommunityPage/Category';
import Comment from '../../components/CommunityPage/Comment';
import Detail from '../../components/CommunityPage/Detail';

import styles from './Board.module.css';
import { faComment, far } from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { getUserDetail } from '../../communityApi';
import { useQuery } from '@tanstack/react-query';

const Board = () => {
  const [likeClick, SetLikeClick] = useState(false);
  const params = useParams();
  const category = params.category;
  const id = params.id;
  console.log('params data', params);

  const navigate = useNavigate();

  const {
    data: pageList, // Make sure 'pageList' is being populated correctly
    isLoading,
    isError,
  } = useQuery(['pageList', category, id], () => getUserDetail(category, id));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !pageList || !pageList) {
    return <div>Error loading data.</div>;
  }

  const { likes_count, reviews_count } = pageList;

  return (
    <div className={styles.Board}>
      <Category />
      <Detail />
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
          {likes_count}
        </div>
        <div className={styles.detailReviews}>
          <FontAwesomeIcon className={styles.icon} icon={faComment} />
          {reviews_count}
        </div>
      </div>
      <Comment />
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
            navigate(`/edit/${category}`);
          }}
        >
          글쓰기
        </button>
      </div>
    </div>
  );
};

export default Board;
