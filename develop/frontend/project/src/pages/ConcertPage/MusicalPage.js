import axios from 'axios';
import { useEffect, useState } from 'react';
import MusicalList from '../../components/ConcertPage/MusicalList';

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
      <h2>Musical 화면입니다</h2>
      <div style={{ display: 'flex' }}>
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
