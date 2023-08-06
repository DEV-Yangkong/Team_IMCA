import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './WritePost.module.css';

const WritePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 여기서 작성한 포스트를 서버에 저장하는 로직을 추가할 수 있습니다.
    // ...

    // 포스트 작성 후에 포스트 목록 페이지로 이동합니다.
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
          <label htmlFor="title" className={styles['label']}>
            제목
          </label>
          <input
            type="text"
            id="title"
            className={styles['input']}
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="content" className={styles['label']}>
            내용
          </label>
          <textarea
            id="content"
            className={styles['textarea']}
            value={content}
            onChange={handleContentChange}
            required
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
