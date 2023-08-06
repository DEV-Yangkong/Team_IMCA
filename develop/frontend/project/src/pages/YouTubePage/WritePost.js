import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useHistory 대신 useNavigate를 임포트합니다.
import './WritePost.css';

const WritePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const navigate = useNavigate(); // useHistory 대신 useNavigate를 사용합니다.

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
    navigate('/youtube'); // useHistory 대신 useNavigate를 사용하여 페이지 이동합니다.
  };

  const handleCancel = () => {
    navigate('/youtube');
  };

  return (
    <div className="write-post">
      <h1 className="post-title">포스트 작성하기</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            required
          />
        </div>
        <button type="submit">작성 완료</button>
        <button type="button" className="cancel-button" onClick={handleCancel}>
          취소
        </button>
      </form>
    </div>
  );
};

export default WritePost;
