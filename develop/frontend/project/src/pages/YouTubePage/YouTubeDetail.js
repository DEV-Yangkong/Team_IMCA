import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './YouTubeDetail.module.css';

const YouTubeDetail = () => {
  const { postId } = useParams();
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 임베드 코드 생성 함수를 함수 외부로 이동
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
        width="100%"
        height="500"
      ></iframe>
    );
  };

  // 날짜를 원하는 형식으로 변환하는 함수
  const formatDate = (dateString) => {
    const isoDateString = dateString; // 예: '2023-08-08T11:59:01.894580+09:00'
    const formattedDateString = isoDateString.split('T')[0]; // '2023-08-08'
    return formattedDateString.replace(/\./g, '-'); // '.'을 '-'로 변경
  };

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/youtube_videos/${postId}/`,
        );
        console.log('Response:', response.data);
        setSelectedPost(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching post detail:', error);
      }
    };

    fetchPostDetail();
  }, [postId]);

  // 로딩 중이면 로딩 메시지 표시
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // selectedPost가 null이 아닌 경우에만 임베드 코드 생성
  if (selectedPost) {
    const embedCode = generateEmbedCode(selectedPost.video_url);

    return (
      <div className={styles['youtube-detail']}>
        <h2>{selectedPost.title}</h2>
        <div className={styles['post-info']}>
          <span className={styles['post-date']}>
            {formatDate(selectedPost.created_at)}
          </span>
          <span className={styles['post-views']}>
            {selectedPost.views} 조회수
          </span>
        </div>
        <div className={styles['video-container']}>{embedCode}</div>
        <div className={styles['post-content']}>
          <p>{selectedPost.content}</p>
        </div>
      </div>
    );
  }

  // selectedPost가 null이면 에러 메시지 표시
  console.log('Selected post is null.');
  return <div>포스트를 찾을 수 없습니다.</div>;
};

export default YouTubeDetail;
