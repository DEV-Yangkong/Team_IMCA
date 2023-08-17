import { useNavigate } from 'react-router-dom';
import styles from './Editor.module.css';

const Editor = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.Editor}>
      <h2>자유게시판</h2>
      <div>
        <button
          className={styles.EditorCancel}
          type="button"
          onClick={() => navigate(-1)}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default Editor;
