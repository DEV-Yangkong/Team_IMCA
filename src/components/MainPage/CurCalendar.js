import styles from './CurCalendar.module.css';

const CurCalendar = ({ title, startDate, endDate, place, img }) => {
  return (
    <div className={styles.current_contents}>
      <div className={styles.current_contents_item}>
        <div className={styles.cur_content_info}>
          <div className={`${styles.cur_content} ${styles.info_title}`}>
            {title}
          </div>
          <div className={`${styles.cur_content} ${styles.info_period}`}>
            {startDate} - {endDate}
          </div>
          <div className={`${styles.cur_content} ${styles.info_place}`}>
            {place}
          </div>
        </div>
        <div className={styles.cur_content_img}>
          <img style={{ width: '100%', height: '90px' }} alt="" src={img} />
        </div>
      </div>
    </div>
  );
};
export default CurCalendar;

// 정보 map 돌리기
// map 돌릴 리스트는 main page에서 받아오기
// 현재 날짜에 상영되고 있는 애들만 데려오기
