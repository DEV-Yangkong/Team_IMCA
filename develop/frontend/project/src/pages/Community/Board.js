import Category from '../../components/CommunityPage/Category';
import Detail from '../../components/CommunityPage/Detail';
import Comment from '../../components/CommunityPage/Comment';
import styles from './Board.module.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Board = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.Board}>
      <Category />
      <Detail />
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
