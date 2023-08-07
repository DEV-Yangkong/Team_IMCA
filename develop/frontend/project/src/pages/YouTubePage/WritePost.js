import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './WritePost.module.css';
import AlertModal from './AlertModal';
import axios from 'axios';
import Modal from 'react-modal';

const WritePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const navigate = useNavigate();

  // 모달이 열릴 때 스크린 리더가 메인 컨텐츠를 인식하지 못하도록 설정
  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

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
    const videoId = url.match(/v=([^&]+)/);
    if (videoId) {
      const thumbnailUrl = `https://i.ytimg.com/vi/${videoId[1]}/maxresdefault.jpg`;
      setThumbnailUrl(thumbnailUrl);
    } else {
      setThumbnailUrl('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/v1/youtube_videos/',
        {
          title,
          content,
          video_url: videoUrl, // 수정된 필드명
          thumbnail_url: thumbnailUrl, // 수정된 필드명
        },
      );
      console.log(response);
      if (response.status === 201) {
        // 작성 완료 후 필요한 동작 수행
        navigate('/youtube');

        // 응답 데이터 활용 예시: 비디오 생성 후의 동작 수행
        console.log('새로 생성된 비디오의 ID:', response.data.id);
        // 여기에서 생성된 비디오의 ID를 활용하여 프론트엔드 UI 업데이트 등을 수행할 수 있음
      } else {
        // API 요청이 성공하지만 응답 상태가 201가 아닌 경우 처리
        setModalMessage('작성에 실패하였습니다.');
        setModalIsOpen(true);
      }
    } catch (error) {
      // API 요청이 실패한 경우 처리
      console.error('API request error:', error);
      setModalMessage('작성에 실패하였습니다.');
      setModalIsOpen(true);

      // 에러 상태에 따라 사용자에게 알림을 제공하거나 적절한 조치를 취할 수 있음
      if (error.response) {
        // 응답이 도착했지만 응답 상태가 에러인 경우 (e.g. 4xx, 5xx)
        console.error('API response error:', error.response.data);
      } else if (error.request) {
        // 응답이 도착하지 않은 경우 (e.g. 네트워크 오류)
        console.error('No API response:', error.request);
      } else {
        // 그 외의 에러 (e.g. 코드 실행 중 예외 발생)
        console.error('Other error:', error.message);
      }
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalMessage('');
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
        <AlertModal
          isOpen={modalIsOpen}
          onClose={closeModal}
          message={modalMessage}
        />
      </form>
    </div>
  );
};

export default WritePost;
