import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './WritePost.module.css';

const WritePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleVideoUrlChange = (e) => {
    const newVideoUrl = e.target.value;
    setVideoUrl(newVideoUrl);
    extractThumbnailUrl(newVideoUrl);
  };

  const extractThumbnailUrl = (url) => {
    // 여기에 썸네일 URL 추출 로직을 작성합니다.
    // 예: https://i.ytimg.com/vi/OX6u_W7rFAU/maxresdefault.jpg
    // 추출한 URL을 setThumbnailUrl로 설정합니다.
    const videoId = url.split('v=')[1];
    if (videoId) {
      const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
      setThumbnailUrl(thumbnailUrl);
    } else {
      setThumbnailUrl('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 포스트 작성 로직 추가
    navigate('/youtube');
  };

  const handleCancel = () => {
    navigate('/youtube');
  };

  return (
    <div className={styles['write-post']}>
      <h1 className={styles['post-title']}>포스트 작성하기</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles['form-group']}>
          <label htmlFor="videoUrl">영상 주소</label>
          <input
            type="url"
            id="videoUrl"
            value={videoUrl}
            onChange={handleVideoUrlChange}
            required
            className={styles.input}
          />
        </div>
        {thumbnailUrl && (
          <div className={styles['form-group']}>
            <label htmlFor="thumbnail">썸네일 미리보기</label>
            <img
              src={thumbnailUrl}
              alt="Video Thumbnail"
              className={styles.thumbnail}
              style={{ maxWidth: '100%', maxHeight: '200px' }}
            />
          </div>
        )}
        <div className={styles['form-group']}>
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            required
            className={styles.textarea}
          />
        </div>
        <button type="submit" className={styles['submit-button']}>
          작성 완료
        </button>
        <button
          type="button"
          className={styles['cancel-button']}
          onClick={handleCancel}
        >
          취소
        </button>
      </form>
    </div>
  );
};

export default WritePost;
