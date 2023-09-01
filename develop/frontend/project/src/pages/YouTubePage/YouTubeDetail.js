import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './YouTubeDetail.module.css';
import AlertModal from './AlertModal';

const YouTubeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedPost, setEditedPost] = useState({});
  const [videoError, setVideoError] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  const generateEmbedCode = (videoUrl) => {
    try {
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
    } catch (error) {
      // 비디오 URL 파싱 오류 시 모달 표시
      setVideoError(true);
      return null;
    }
  };

  const formatDate = (dateString) => {
    const isoDateString = dateString;
    const formattedDateString = isoDateString.split('T')[0];
    return formattedDateString.replace(/\./g, '-');
  };

  const handleEditClick = () => {
    setIsEditMode(true);
    setEditedPost({ ...selectedPost });
    extractThumbnailUrl(selectedPost.video_url);
  };

  const handleSaveClick = async () => {
    try {
      // 썸네일 URL 업데이트
      const updatedPost = { ...editedPost, thumbnail_url: thumbnailUrl };

      const response = await axios.put(
        `https://port-0-imca-3prof2llkuok2wj.sel4.cloudtype.app/api/v1/youtube_video/${id}/`,
        updatedPost, // 업데이트된 포스트 정보 사용
      );
      if (response.status === 200) {
        setIsEditMode(false);
        setSelectedPost(response.data);
        extractThumbnailUrl(response.data.video_url);
      }
    } catch (error) {
      console.error('Error updating post:', error);
      if (error.response && error.response.status === 400) {
        setVideoError(true);
      }
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://port-0-imca-3prof2llkuok2wj.sel4.cloudtype.app/api/v1/youtube_video/${id}/`,
      );
      if (response.status === 204) {
        if (!isDeleteModalVisible) {
          setIsDeleteModalVisible(true);

          setTimeout(() => {
            setIsDeleteModalVisible(false);
            navigate('../youtube'); // 리스트 페이지로 이동합니다.
          }, 1500);
        }
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const extractThumbnailUrl = (url) => {
    const videoId = url.match(/v=([^&]+)/);
    if (videoId) {
      const thumbnailUrl = `https://i.ytimg.com/vi/${videoId[1]}/maxresdefault.jpg`;
      console.log('Thumbnail URL:', thumbnailUrl); // 디버깅용 출력
      setThumbnailUrl(thumbnailUrl);
    } else {
      setThumbnailUrl('');
    }
  };

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await axios.get(
          `https://port-0-imca-3prof2llkuok2wj.sel4.cloudtype.app/api/v1/youtube_video/${id}/`,
        );
        setSelectedPost(response.data);
        setIsLoading(false);
        extractThumbnailUrl(response.data.video_url);
      } catch (error) {
        console.error('Error fetching post detail:', error);
      }
    };

    fetchPostDetail();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles['youtube-detail']}>
      <h2>
        {isEditMode ? (
          <input
            className={styles['edit-title-input']}
            value={editedPost.title}
            onChange={(e) =>
              setEditedPost({ ...editedPost, title: e.target.value })
            }
          />
        ) : (
          selectedPost.title
        )}
      </h2>
      <div className={styles['post-info']}>
        <span className={styles['post-date']}>
          {formatDate(selectedPost.created_at)}
        </span>
        <span className={styles['post-views']}>
          조회수 {selectedPost.views_count + 1}
        </span>
      </div>
      <div className={styles['video-content-container']}>
        {isEditMode && (
          <div className={styles['video-url-container']}>
            <input
              className={styles['video-url-input']}
              value={editedPost.video_url}
              onChange={(e) => {
                const newVideoUrl = e.target.value;
                setEditedPost({ ...editedPost, video_url: newVideoUrl });
                console.log('New Video URL:', newVideoUrl); // 디버깅용 출력
                extractThumbnailUrl(newVideoUrl);
              }}
              onBlur={() => extractThumbnailUrl(editedPost.video_url)}
            />
          </div>
        )}
        <div className={styles['video-container']}>
          {/* 비디오 URL 오류 시 모달 표시 */}
          {videoError && (
            <AlertModal
              isOpen={videoError}
              onClose={() => setVideoError(false)}
              message="유효하지 않은 비디오 URL입니다."
            />
          )}
          {generateEmbedCode(
            isEditMode ? editedPost.video_url : selectedPost.video_url,
          )}
        </div>
        <div className={styles['post-content']}>
          {isEditMode ? (
            <textarea
              value={editedPost.content}
              onChange={(e) =>
                setEditedPost({ ...editedPost, content: e.target.value })
              }
            />
          ) : (
            // HTML에서 줄바꿈 태그인 <br>을 사용하여 줄바꿈 표시
            selectedPost.content.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))
          )}
        </div>
      </div>
      <div className={styles['button-container']}>
        {isEditMode ? (
          <>
            <button className={styles['save-button']} onClick={handleSaveClick}>
              저장
            </button>
            <button
              className={styles['cancel-button']}
              onClick={() => setIsEditMode(false)}
            >
              취소
            </button>
          </>
        ) : (
          <>
            <button className={styles['edit-button']} onClick={handleEditClick}>
              수정
            </button>
            <button className={styles['delete-button']} onClick={handleDelete}>
              삭제
            </button>
            <button
              className={styles['list-button']}
              onClick={() => navigate('../youtube')}
            >
              목록
            </button>
          </>
        )}
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
