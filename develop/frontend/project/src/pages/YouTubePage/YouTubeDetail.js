import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './YouTubeDetail.module.css';
import AlertModal from './AlertModal';

const YouTubeDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const generateEmbedCode = (videoUrl) => {
    const videoId = videoUrl.split('v=')[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return (
      <iframe
        className={styles['video-frame']}
        src={embedUrl}
        title={selectedPost.title}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    );
  };

  const formatDate = (dateString) => {
    const isoDateString = dateString;
    const formattedDateString = isoDateString.split('T')[0];
    return formattedDateString.replace(/\./g, '-');
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/v1/youtube_videos/${postId}/`,
      );
      if (response.status === 204) {
        setIsDeleteModalVisible(true);

        setTimeout(() => {
          setIsDeleteModalVisible(false);
          navigate('../youtube'); // 리스트 페이지로 이동합니다.
        }, 1500);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/youtube_videos/${postId}/`,
        );
        setSelectedPost(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching post detail:', error);
      }
    };

    fetchPostDetail();
  }, [postId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles['youtube-detail']}>
      <h2>{selectedPost.title}</h2>
      <div className={styles['post-info']}>
        <span className={styles['post-date']}>
          {formatDate(selectedPost.created_at)}
        </span>
        <span className={styles['post-views']}>
          조회수 {selectedPost.views_count}
        </span>
      </div>
      <div className={styles['video-content-container']}>
        <div className={styles['video-container']}>
          {generateEmbedCode(selectedPost.video_url)}
        </div>
        <div className={styles['post-content']}>
          <p>{selectedPost.content}</p>
        </div>
      </div>
      <div className={styles['delete-button-container']}>
        <button className={styles['delete-button']} onClick={handleDelete}>
          삭제
        </button>
        <button
          className={styles['list-button']}
          onClick={() => navigate('../youtube')}
        >
          목록
        </button>
      </div>
      {isDeleteModalVisible && (
        <AlertModal
          isOpen={isDeleteModalVisible}
          onClose={() => setIsDeleteModalVisible(false)}
          message="포스트가 삭제되었습니다."
        />
      )}
    </div>
  );
};

export default YouTubeDetail;
