import React, { useRef, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Editor.module.css';

const Editor = () => {
  const navigate = useNavigate();

  const titleRef = useRef();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          loader.file.then((file) => {
            formData.append('file', file);

            axios
              .post(
                'https://port-0-imca-3prof2llkuol0db.sel4.cloudtype.app/api/v1/',
                formData,
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

  const handleSubmit = () => {
    if (title.length < 1) {
      titleRef.current.focus();
      return;
    }

    const data = {
      title,
      content,
    };

    axios
      .post(
        'https://port-0-imca-3prof2llkuol0db.sel4.cloudtype.app/api/v1/post',
        data,
      )
      .then((res) => {
        if (res.status === 200) {
          navigate('/', { replace: true });
          return;
        } else {
          alert('업로드 실패.');
          return;
        }
      });
  };

  return (
    <div className={styles.Editor}>
      <section>
        <div className={styles.headerTitle}>
          <p>자유게시판</p>
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
          data=""
          config={{
            extraPlugins: [uploadPlugin],
          }}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
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
