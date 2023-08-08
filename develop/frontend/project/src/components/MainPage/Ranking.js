import styles from './Ranking.module.css';

const Ranking = ({ title }) => {
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
          <div className={styles.act_ranking_item}></div>
          <div className={styles.act_ranking_item}></div>
          <div className={styles.act_ranking_item}></div>
        </div>
      </div>
    </div>
  );
};
export default Ranking;
