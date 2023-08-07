import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './YouTubeDetail.module.css';

const YouTubeDetail = ({ youtubePosts }) => {
  const { postId } = useParams();
  const selectedPost = youtubePosts.find(
    (post) => post.id.toString() === postId,
  );

  if (!selectedPost) {
    return <div>포스트를 찾을 수 없습니다.</div>;
  }

  return (
    <div className={styles['youtube-detail']}>
      <h2>{selectedPost.title}</h2>
      <div className={styles['post-info']}>
        <span className={styles['post-date']}>{selectedPost.date}</span>
        <span className={styles['post-views']}>{selectedPost.views} views</span>
      </div>
      <div className={styles['video-container']}>
        <iframe
          className={styles['video-frame']}
          src={selectedPost.videoUrl}
          title={selectedPost.title}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <div className={styles['post-content']}>
        <p>{selectedPost.content}</p>
      </div>
    </div>
  );
};

export default YouTubeDetail;
