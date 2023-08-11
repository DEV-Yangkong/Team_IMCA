import axios from 'axios';
import { useEffect, useState } from 'react';
import MusicalList from '../../components/ConcertPage/MusicalList';
import './MusicalPage.css';
const MusicalPage = () => {
  const [musicalArray, setMusicalArray] = useState([]);
  const callApi = async () => {
    axios.get('http://localhost:5000/api').then((res) => {
      console.log(res.data.dbs.db);
      setMusicalArray(res.data.dbs.db);
    });
  };

  useEffect(() => {
    callApi();
  }, []);
  return (
    <div>
      <div className="list_container">
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
