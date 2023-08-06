import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './WritePost.css';

const WritePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const history = useHistory();

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
    history.push('/youtube');
  };

  return (
    <div className="write-post">
      <h1>글쓰기</h1>
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
      </form>
    </div>
  );
};

export default WritePost;
