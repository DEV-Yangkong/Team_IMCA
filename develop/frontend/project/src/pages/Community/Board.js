import Category from '../../components/CommunityPage/Category';
import Comment from '../../components/CommunityPage/Comment';

import styles from './Board.module.css';
import { faComment, far } from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { getUserDetail } from '../../communityApi';
import { useQuery } from '@tanstack/react-query';
import Detail from '../../components/CommunityPage/Detail';

const Board = () => {
  // (1) username 값을 어떻게 가져올 수 있을까? -> URL params
  // const { nickname } = useParams();
  const { id } = useParams();
  const [likeClick, SetLikeClick] = useState(false);

  // console.log(id);

  // (2) 가져온 username 값을 어떻게 서버로 전달할 수 있을까?
  // const { data: detailArray } = useQuery(['detailArray', id], () =>
  //   getUserDetail(id),
  // );

  const navigate = useNavigate();
  // console.log('board data check', detailArray);
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
          {id.likes_num}
        </div>
        <div className={styles.detailReviews}>
          <FontAwesomeIcon className={styles.icon} icon={faComment} />
          {id.reviews_num}
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
            navigate('/edit/:id');
          }}
        >
          글쓰기
        </button>
      </div>
    </div>
  );
};

export default Board;
