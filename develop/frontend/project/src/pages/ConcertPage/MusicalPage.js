import axios from 'axios';
import { useEffect, useState } from 'react';
import MusicalList from '../../components/ConcertPage/MusicalList';
import styles from './MusicalPage.module.css';
import { xml2js } from 'xml-js';
import { useQuery } from '@tanstack/react-query';
import { dBData, getConcertData, getDbConcertData } from '../../api';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import { useIsSearched } from '../../components/ConcertPage/IsSearchedContext';
const MusicalPage = () => {
  const [musicalArray, setMusicalArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState();
  // const [isSearched, setIsSearched] = useState(false);
  const [searchedData, setSearchedData] = useState();
  const [count, setCount] = useState({ startCount: 0, endCount: 20 });
  const navigate = useNavigate();
  const [cookies] = useCookies('access_token');
  const { isSearched, setIsSearched } = useIsSearched();
  // const { data: concertData } = useQuery(['concert', currentPage], () =>
  //   getDbConcertData(currentPage),
  // );
  const { data: realData } = useQuery(
    ['realData', cookies.access_token],
    () => dBData(cookies.access_token),
    {
      staleTime: 300000, // 5분 동안 데이터를 "느껴지게" 함
    },
  );

  const onHandlePage = (pageNumber) => {
    setCurrentPage(pageNumber); // 페이지 번호 업데이트
  };
  const onGoDetail = (eventId) => {
    navigate(`/concert/${eventId}`, {
      state: { eventData: eventId },
    });
  };
  const handleClick = () => {
    setIsSearched(true);
    const regex = new RegExp(searchValue, 'i'); // "i" 옵션은 대소문자 구분 없이 검색
    const filteredItem = realData.filter((item) => regex.test(item.name));
    setSearchedData(filteredItem);
  };
  useEffect(() => {
    setSearchValue('');
  }, [isSearched]);
  return (
    <div>
      <div
        style={{
          margin: '0 auto',
          width: '100%',
          maxWidth: 1240,
          padding: '30px 0 10px 0',
          fontSize: 23,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>공연/페스티벌</div>
        <div>
          <input
            style={{ height: 30, marginRight: 10 }}
            value={searchValue}
            onChange={(e) => {
              setIsSearched(false);
              setSearchValue(e.target.value);
            }}
            placeholder="search"
          ></input>
          <button style={{ padding: 5 }} onClick={handleClick}>
            검색
          </button>
        </div>
      </div>
      <div className={styles.list_container}>
        {!isSearched
          ? realData
              ?.slice(count.startCount, count.endCount)
              .map((it, index) => (
                <MusicalList
                  key={index}
                  onGoConcertDetail={() => onGoDetail(it.api_id)}
                  title={it.name}
                  img={it.poster}
                />
              ))
          : searchedData?.map((it, index) => (
              <MusicalList
                key={index}
                onGoConcertDetail={() => onGoDetail(it.api_id)}
                title={it.name}
                img={it.poster}
              />
            ))}
      </div>
      <div
        style={{
          margin: '0 auto',
          padding: '20px 0 40px 0',
          maxWidth: 1240,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <ul style={{ display: 'flex', fontSize: 20 }}>
          <li
            style={{ padding: 20, cursor: 'pointer' }}
            onClick={() => setCount({ startCount: 0, endCount: 20 })}
          >
            1
          </li>
          <li
            style={{ padding: 20, cursor: 'pointer' }}
            onClick={() => setCount({ startCount: 21, endCount: 41 })}
          >
            2
          </li>
          <li
            style={{ padding: 20, cursor: 'pointer' }}
            onClick={() => setCount({ startCount: 42, endCount: 62 })}
          >
            3
          </li>
          <li
            style={{ padding: 20, cursor: 'pointer' }}
            onClick={() => setCount({ startCount: 63, endCount: 73 })}
          >
            4
          </li>
        </ul>
      </div>
    </div>
  );
};
export default MusicalPage;

// 페이지를 불러오는 중입니다... spinner
// react query
