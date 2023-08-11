import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import MusicalList from '../../components/ConcertPage/MusicalList';
import styles from './MusicalPage.module.css';
import { xml2js } from 'xml-js';
const MusicalPage = () => {
  const [musicalArray, setMusicalArray] = useState([]);
  // 공공 데이터 public musical
  useEffect(() => {
    axios
      .get('http://localhost:8000/API/public', {
        params: {
          cpage: 1,
          rows: 30,
          shcate: 'GGGA',
          prfstate: '01',
          prfpdfrom: '20230801',
          prfpdto: '20230831',
        },
      })
      .then((res) => {
        // console.log(res.data);
        const options = { compact: true, spaces: 2 };
        const result = xml2js(res.data, options);
        setMusicalArray(result.dbs.db);
        console.log('musicalArray', musicalArray);
      })
      .catch((error) => console.log('err', error));
  }, []);
  return (
    <div>
      <div className={styles.list_container}>
        {musicalArray.map((it) => (
          <MusicalList
            title={it.prfnm._text}
            startDate={it.prfpdfrom._text}
            endDate={it.prfpdto._text}
            place={it.fcltynm._text}
            img={it.poster._text}
          />
        ))}{' '}
      </div>
    </div>
  );
};
export default MusicalPage;

// 페이지를 불러오는 중입니다... spinner
// react query
