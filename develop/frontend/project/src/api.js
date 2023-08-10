import axios from 'axios';
import { xml2js } from 'xml-js';

// const instance = () => {
//   axios.create({ baseURL: 'http://localhost:8000/API' });
// };
export const getAllMusical = () => {
  //전체 게시글을 가져오는 API
  return axios
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
      const options = { compact: true, spaces: 2 };
      const result = xml2js(res.data, options);
      console.log('musicalArray', result.dbs.db);
      return result.dbs.db;
    })
    .catch((error) => console.log('err', error));
};
export const getAllAct = () => {
  return axios
    .get('http://localhost:8000/API/public', {
      params: {
        cpage: 1,
        rows: 30,
        shcate: 'AAAA',
        prfstate: '01',
        prfpdfrom: '20230801',
        prfpdto: '20230831',
      },
    })
    .then((res) => {
      // console.log(res.data);
      const options = { compact: true, spaces: 2 };
      const result = xml2js(res.data, options);

      console.log('actArray', result.dbs.db);
      return result.dbs.db;
    })
    .catch((error) => console.log('err', error));
};
