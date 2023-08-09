import { useParams } from 'react-router-dom';
import styles from './Detail.module.css';
import { dataList } from '../../pages/Community/BoardPage';

const Detail = () => {
  const { id } = useParams();
  // 배열에 일치한 ID를 찾아줌
  const post = dataList.find((post) => post.id === parseInt(id));

  if (!post) {
    return <div>없음</div>;
  }

  return (
    <div className={styles.Detail}>
      <div className={styles.detailTitle}>{post.title}</div>
      <div className={styles.author}>
        <div className={styles.detailId}>{post.id}</div>
        <div className={styles.detailDate}>{post.date}</div>
        <div className={styles.detailViews}>조회수 {post.views}</div>
      </div>
      <div className={styles.detailImg}>
        <img src={post.img} alt={post.title} />
      </div>
      <div className={styles.detailContent}>{post.content}</div>
      <div className={styles.detailLike}>{post.like_num}</div>
      <div className={styles.detailReviews}>{post.reviews}</div>
    </div>
  );
};

export default Detail;
