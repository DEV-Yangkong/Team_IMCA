import Category from '../../components/CommunityPage/Category';
import Comment from '../../components/CommunityPage/Comment';

import styles from './Board.module.css';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { BoardPageApi } from '../../communityApi';
import { useQuery } from '@tanstack/react-query';
import Detail from '../../components/CommunityPage/Detail';

const Board = () => {
  // (1) username 값을 어떻게 가져올 수 있을까? -> URL params
  const { username } = useParams();
  console.log(username);

  // (2) 가져온 username 값을 어떻게 서버로 전달할 수 있을까?
  const { data: detailArray } = useQuery(['getUserDetail'], BoardPageApi);

  const navigate = useNavigate();
  console.log('board data check', detailArray);
  return (
    <div className={styles.Board}>
      <Category />
      {detailArray?.map((it) => (
        <Detail key={it.id} title={it.title} />
      ))}
      <Comment />
    </div>
  );
};

export default Board;
