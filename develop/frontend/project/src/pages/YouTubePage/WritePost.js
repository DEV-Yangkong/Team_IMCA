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
  const [isPostSuccess, setIsPostSuccess] = useState(false);

  const navigate = useNavigate();

  // 모달이 열릴 때 스크린 리더가 메인 컨텐츠를 인식하지 못하도록 설정
  useEffect(() => {
    Modal.setAppElement('#root'); // 모달의 앱 엘리먼트 설정을 제거
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
          video_url: videoUrl,
          thumbnail_url: thumbnailUrl,
        },
      );

      console.log(response.data); // 응답 데이터 출력

      if (response.status === 201) {
        // 작성 완료 후 필요한 동작 수행
        setIsPostSuccess(true); // 작성 성공한 경우 상태 변경
        setModalMessage('작성이 완료되었습니다.');
        setModalIsOpen(true);
      } else {
        // 응답 상태 코드가 201이 아닌 경우 처리
        setIsPostSuccess(false);
        console.error('작성에 실패하였습니다.');
        setModalMessage('작성에 실패하였습니다.'); // 모달 메시지 설정
        setModalIsOpen(true); // 모달 열기
      }
    } catch (error) {
      // API 요청이 실패한 경우 처리
      console.error('에러의 원인을 추적합니다');
      // 에러 상태에 따라 사용자에게 알림을 제공하거나 적절한 조치를 취할 수 있음
      if (error.response.data.thumbnail_url) {
        console.error('영상의 URL이 유효하지 않습니다.');
        setModalMessage(
          '작성에 실패하였습니다. 영상의 URL이 유효하지 않습니다.',
        );
      } else if (error.response) {
        // 응답이 도착했지만 응답 상태가 에러인 경우 (e.g. 4xx, 5xx)
        console.error('API response error:', error.response.data);
        setModalMessage('작성에 실패하였습니다. 응답 에러');
      } else if (error.request) {
        // 응답이 도착하지 않은 경우 (e.g. 네트워크 오류)
        console.error('No API response:', error.request);
        setModalMessage('작성에 실패하였습니다. 네트워크 오류');
      } else {
        // 그 외의 에러 (e.g. 코드 실행 중 예외 발생)
        console.error('Other error:', error.message);
        setModalMessage('작성에 실패하였습니다.');
      }
      setModalIsOpen(true);
    }
  };

  // const closeModal = () => {
  //   setModalIsOpen(false);
  //   setModalMessage('');
  // };

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
          onClose={() => {
            setModalIsOpen(false);
            setModalMessage('');
            if (isPostSuccess) {
              setIsPostSuccess(false); // 확인 후 작성 완료 상태 초기화
              navigate('/youtube'); // 작성 성공한 경우 페이지 이동
            }
          }}
          message={modalMessage}
        />
      </form>
    </div>
  );
};

export default WritePost;
