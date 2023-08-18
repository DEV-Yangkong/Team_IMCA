import axios from 'axios';
import { useEffect, useState } from 'react';
import MusicalList from '../../components/ConcertPage/MusicalList';
import styles from './MusicalPage.module.css';
import { xml2js } from 'xml-js';
import { useQuery } from '@tanstack/react-query';
import { getConcertData } from '../../api';
import { useNavigate } from 'react-router';
const MusicalPage = () => {
  const [musicalArray, setMusicalArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { data: concertData } = useQuery(['concert', currentPage], () =>
    getConcertData(currentPage),
  );
  const onHandlePage = (pageNumber) => {
    setCurrentPage(pageNumber); // 페이지 번호 업데이트
  };
  const onGoDetail = (eventId) => {
    navigate(`/concert/${eventId}`, {
      state: { eventData: eventId },
    });
  };

  return (
    <div>
      <div className={styles.list_container}>
        {concertData?.map((it) => (
          <MusicalList
            onGoConcertDetail={() => onGoDetail(it.mt20id._text)}
            title={it.prfnm._text}
            startDate={it.prfpdfrom._text}
            endDate={it.prfpdto._text}
            place={it.fcltynm._text}
            img={it.poster._text}
          />
        ))}{' '}
      </div>
      <div
        style={{
          margin: '0 auto',
          maxWidth: 1240,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <ul style={{ display: 'flex', fontSize: 20 }}>
          <li
            style={{ padding: 20, cursor: 'pointer' }}
            onClick={() => onHandlePage(1)}
          >
            1
          </li>
          <li
            style={{ padding: 20, cursor: 'pointer' }}
            onClick={() => onHandlePage(2)}
          >
            2
          </li>
          <li
            style={{ padding: 20, cursor: 'pointer' }}
            onClick={() => onHandlePage(3)}
          >
            3
          </li>
          <li
            style={{ padding: 20, cursor: 'pointer' }}
            onClick={() => onHandlePage(4)}
          >
            4
          </li>
          <li
            style={{ padding: 20, cursor: 'pointer' }}
            onClick={() => onHandlePage(5)}
          >
            5
          </li>
        </ul>
      </div>
    </div>
  );
};
export default MusicalPage;

// 페이지를 불러오는 중입니다... spinner
// react query
