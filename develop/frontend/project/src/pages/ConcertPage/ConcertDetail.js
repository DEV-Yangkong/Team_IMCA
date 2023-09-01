import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { getConcertDetail } from '../../api';
import styles from './ConcertDetail.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const ConcertDetail = () => {
  const [info, setInfo] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const eventData = location.state.eventData;
  const { data, isLoading } = useQuery(
    ['concertDetail', eventData],
    () => getConcertDetail(eventData),
    {
      onSuccess: (data) => {
        // 성공시 호출
        setInfo(data);
      },
    },
  );

  if (isLoading) {
    return (
      <div className={styles.detail_container}>
        <div
          style={{ padding: 100, display: 'flex', justifyContent: 'center' }}
        >
          <div>
            <FontAwesomeIcon icon={faSpinner} size="xl" />
          </div>
        </div>
      </div>
    );
  }

  const onGoList = () => {
    navigate('/concert_all');
  };
  return (
    <div className={styles.detail_container}>
      {info && (
        <div className={styles.detail_wrapper}>
          <div className={styles.title}>{info.prfnm._text}</div>
          <hr />
          <div className={styles.concert_img}>
            <img
              alt=""
              src={info.poster._text}
              style={{ width: 600, height: 850 }}
            />
          </div>
          <div className={styles.concert_info}>
            <div>
              공연 날짜 : {info.prfpdfrom._text} - {info.prfpdto._text}
            </div>
            <div>공연 시간 : {info.dtguidance._text}</div>
            <div>공연 장소 : {info.fcltynm._text}</div>
            {info.prfruntime._text && (
              <div>런타임 : {info.prfruntime._text}</div>
            )}
            {info.pcseguidance._text && (
              <div>티켓 가격 : {info.pcseguidance._text}</div>
            )}
          </div>
          <hr />
          <div className={styles.concert_list} onClick={onGoList}>
            목록
          </div>
        </div>
      )}
    </div>
  );
};
export default ConcertDetail;
