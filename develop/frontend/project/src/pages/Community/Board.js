import Category from '../../components/CommunityPage/Category';
import Detail from '../../components/CommunityPage/Detail';
import styles from './Board.module.css';

const Board = () => {
  return (
    <div className={styles.Board}>
      <Category />
      <Detail />
    </div>
  );
};

export default Board;
