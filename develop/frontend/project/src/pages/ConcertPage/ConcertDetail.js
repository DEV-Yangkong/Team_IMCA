import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { getConcertDetail } from '../../api';
import styles from './ConcertDetail.module.css';
const ConcertDetail = () => {
  const location = useLocation();
  const eventData = location.state.eventData;
  const { data, isLoading } = useQuery(
    ['concertDetail', eventData],
    () => getConcertDetail(eventData),
    {
      onSuccess: (data) => {
        // 성공시 호출
        console.log(data);
      },
    },
  );
  if (isLoading) {
    return <span>Loading...</span>;
  }
  return (
    <div className={styles.detail_container}>
      <div className={styles.detail_wrapper}>
        <div className={styles.title}>{data.prfnm._text}</div>
        <hr />
        <div className={styles.concert_img}>
          <img
            alt=""
            src={data.poster._text}
            style={{ width: 690, height: 950 }}
          />
        </div>
        <div className={styles.concert_info}>
          <div>
            공연 날짜 : {data.prfpdfrom._text} - {data.prfpdto._text}
          </div>
          <div>공연 시간 : {data.dtguidance._text}</div>
          <div>공연 장소 : {data.fcltynm._text}</div>
          {data.prfruntime._text && <div>런타임 : {data.prfruntime._text}</div>}
        </div>
      </div>
    </div>
  );
};
export default ConcertDetail;
