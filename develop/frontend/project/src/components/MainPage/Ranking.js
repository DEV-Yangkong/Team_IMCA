import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Ranking.module.css';
import { FaCaretLeft } from '@fortawesome/free-regular-svg-icons';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
const Ranking = ({
  title,
  boxOfArray,
  onGoBoxOfficeDetail,
  onHandleNext,
  onHandlePrev,
}) => {
  return (
    <div className={styles.Ranking}>
      <div className={styles.act_ranking_title}>
        <div style={{ fontSize: '20px', color: '#134f2c', fontWeight: 'bold' }}>
          {title}
        </div>
        <div className={styles.act_ranking_line}>
          <div
            style={{
              border: '0.5px solid black',
              height: 1,
              backgroundColor: '#134f2c',
            }}
          ></div>
        </div>
      </div>

      <div className={styles.act_ranking_container}>
        <div className={styles.act_ranking_wrapper}>
          <div className={styles.act_ranking_click}>
            <div onClick={onHandlePrev} className={styles.act_ranking_prev}>
              <FontAwesomeIcon icon={faCaretLeft} />
            </div>
            <div onClick={onHandleNext} className={styles.act_ranking_next}>
              <FontAwesomeIcon icon={faCaretRight} />
            </div>
          </div>
          {boxOfArray?.map((it, index) => (
            <div
              onClick={() => onGoBoxOfficeDetail(it.mt20id._text)}
              key={index}
              className={`${styles['act_ranking_item_' + it.rnum._text]}`}
            >
              <img
                style={{ width: '100%', height: '280px' }}
                alt=""
                src={'http://www.kopis.or.kr/' + `${it.poster._text}`}
              ></img>
              <div>{it.prfnm._text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Ranking;
