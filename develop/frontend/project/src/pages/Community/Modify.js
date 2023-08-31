import React, { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { useNavigate, useParams } from 'react-router-dom';
import styles from './Modify.module.css';
import { useCookies } from 'react-cookie';
import { getUserDetail } from '../../communityApi';
import axios from 'axios';

const Modify = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const titleRef = useRef();
  const [cookies] = useCookies(['access_token']);
  const params = useParams();
  const { category, id } = params;

  useEffect(() => {
    // Fetch the existing content data using 'id' and 'category'
    getUserDetail(category, id)
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
      })
      .catch((error) => {});
  }, [category, id]);

  const handleSubmit = async () => {
    if (title.length < 1 || content.length < 1) {
      titleRef.current.focus();
      return;
    }
    const contentWithoutPTags = content.replace(/<\/?p>/gi, '');
    const data = {
      title: title,
      content: contentWithoutPTags,
      category: category,
    };
    const putApiEndpoint = `http://imca.store/api/v1/community_board/category/${category}/detail/${id}/`;
    await axios
      .put(putApiEndpoint, data, {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          navigate(`/${category}/detail/${id}`, { replace: true });
        } else {
          alert('업로드 실패.');
        }
      })
      .catch((error) => {});
  };

  return (
    <div className={styles.EditPage}>
      <div className={styles.headerTitle}>
        <p>
          {category === 'free'
            ? '자유게시판'
            : category === 'after'
            ? '공연후기'
            : category === 'trade'
            ? '동행/양도'
            : ''}
        </p>
        <div className={styles.controlBox}>
          {/* Cancel button */}
          <button
            className={styles.cancelButton}
            onClick={() => navigate(-1, { replace: true })}
          >
            취소
          </button>
          {/* Submit button */}
          <button
            className={styles.createButton}
            type="button"
            onClick={handleSubmit}
          >
            완료
          </button>
        </div>
      </div>
      <div className={styles.titleWrapper}>
        {/* Title input */}
        <input
          className={styles.inputTitle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
        />
      </div>
      <div className={styles.Ckeditor}>
        {/* CKEditor instance for content input */}
        <CKEditor
          editor={ClassicEditor}
          data={content}
          config={{
            enterMode: 2,
            shiftEnterMode: 1,
            autoParagraph: false, // Disable automatic <p> wrapping
          }}
          onReady={(editor) => {}}
          onChange={(event, editor) => {
            setContent(editor.getData());
          }}
        />
      </div>
    </div>
  );
};

export default Modify;
