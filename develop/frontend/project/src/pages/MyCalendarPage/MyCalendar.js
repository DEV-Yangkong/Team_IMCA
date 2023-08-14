import styles from './MyCalendar.module.css';
import MyCalendarDate from './MyCalendarDate';

const MyCalendar = () => {
  return (
    <div className={styles.MyCalendar}>
      <div className={styles.MyCalendar_Container}>
        <div className={styles.MyCalendar_title}>MyCalendar</div>
        <div className={styles.MyCalendar_Wrapper}>
          <section className={styles.MyCalendar_left}>
            {/* 내캘린더 */}
            <MyCalendarDate />
          </section>
          <section className={styles.MyCalendar_right}>
            {/* 캘린더 매모 */}
          </section>
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
