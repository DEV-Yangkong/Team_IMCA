import Category from '../../components/CommunityPage/Category';
import Detail from '../../components/CommunityPage/Detail';
import Comment from '../../components/CommunityPage/Comment';
import styles from './Board.module.css';
import React from 'react';

const Board = () => {
  return (
    <div className={styles.Board}>
      <Category />
      <Detail />
      <Comment />
    </div>
  );
};

export default Board;
