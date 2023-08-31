import React, { useRef, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Editor.module.css';
import { useCookies } from 'react-cookie';

const Editor = () => {
  const navigate = useNavigate();

  const titleRef = useRef();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [cookies] = useCookies(['access_token']);

  const params = useParams();
  const { category } = params;

  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          loader.file.then((file) => {
            formData.append('file', file);

            axios
              .post(
                `http://imca.store/api/v1/community_board/category/${category}/`,
                formData,
                {
                  headers: {
                    Authorization:
                      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk1MDQzNjM2LCJpYXQiOjE2OTMzMTU2MzYsImp0aSI6IjBiNDYyODI5MjliNjQ2ZjFiZDQ0NjlkMDRiM2NjYWIyIiwidXNlcl9pZCI6MX0.IJDo-1IOGUUi1kt-_LPy9Gn8H0EO8n1OtG5j3zQ5EPY',
                  },
                  withCredentials: true,
                },
              )
              .then((res) => {
                resolve({
                  default: res.data.data.uri,
                });
              })
              .catch((err) => reject(err));
          });
        });
      },
    };
  };

  function uploadPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }

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
    const postApiEndpoint = `http://imca.store/api/v1/community_board/category/${category}/`;
    await axios
      .post(postApiEndpoint, data, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk1MDQzNjM2LCJpYXQiOjE2OTMzMTU2MzYsImp0aSI6IjBiNDYyODI5MjliNjQ2ZjFiZDQ0NjlkMDRiM2NjYWIyIiwidXNlcl9pZCI6MX0.IJDo-1IOGUUi1kt-_LPy9Gn8H0EO8n1OtG5j3zQ5EPY',
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 201) {
          navigate(`/${category}`, { replace: true });
        } else {
          alert('업로드 실패.');
        }
      })
      .catch((error) => {
        console.error('업로드 에러:', error);
        alert('업로드 중 오류가 발생했습니다.');
      });
  };

  return (
    <div className={styles.Editor}>
      <section>
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
            <div className={styles.cancelBtnWrapper}>
              <button
                className={styles.cancelButton}
                onClick={() => navigate(-1, { replace: true })}
              >
                취소
              </button>
            </div>
            <div className={styles.submitBtnWrapper}>
              <button
                className={styles.createButton}
                type="black"
                onClick={handleSubmit}
              >
                완료
              </button>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className={styles.titleWrapper}>
          <textarea
            className={styles.inputTitle}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
            ref={titleRef}
          />
        </div>
      </section>
      <section className={styles.Ckeditor}>
        <CKEditor
          editor={ClassicEditor}
          data={content}
          config={{
            extraPlugins: [uploadPlugin],
            enterMode: 2,
            shiftEnterMode: 1,
            autoParagraph: false,
          }}
          onReady={(editor) => {
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor) => {
            setContent(editor.getData());
            console.log({ event, editor, content });
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
        />
      </section>
    </div>
  );
};

export default Editor;
