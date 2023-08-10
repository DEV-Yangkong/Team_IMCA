import axios from 'axios';
import { xml2js } from 'xml-js';

// const instance = () => {
//   axios.create({ baseURL: 'http://localhost:8000/API' });
// };
export const getAllMusical = (type, startDate, endDate) => {
  //전체 게시글을 가져오는 API

  return axios
    .get('http://localhost:8000/API/public', {
      params: {
        cpage: 1,
        rows: 30,
        shcate: type === '연극' ? 'AAAA' : 'GGGA',
        prfstate: '02',
        prfpdfrom: startDate || '',
        prfpdto: endDate || '',
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

// export const getAllAct = () => {
//   return axios
//     .get('http://localhost:8000/API/public', {
//       params: {
//         cpage: 1,
//         rows: 30,
//         shcate: 'AAAA',
//         prfstate: '01',
//         prfpdfrom: '20230801',
//         prfpdto: '20231030',
//       },
//     })
//     .then((res) => {
//       // console.log(res.data);
//       const options = { compact: true, spaces: 2 };
//       const result = xml2js(res.data, options);

//       console.log('actArray', result.dbs.db);
//       return result.dbs.db;
//     })
//     .catch((error) => console.log('err', error));
// };

export const getMusicalBoxOffice = () => {
  return axios
    .get('http://localhost:8000/API/boxoffice', {
      params: {
        catecode: 'AAAA',
      },
    })
    .then((res) => {
      const options = { compact: true, spaces: 2 };
      const result = xml2js(res.data, options);
      console.log('boxofficeM', result);
      return result.boxofs.boxof.slice(0, 5);
    });
};
// useEffect(() => {
//   axios
//     .get('http://localhost:8000/API/boxoffice', {
//       params: {
//         catecode: 'AAAA',
//       },
//     })
//     .then((res) => {
//       const options = { compact: true, spaces: 2 };
//       const result = xml2js(res.data, options);
//       console.log('boxofficeA', result);
//       setBoxOfAct(result.boxofs.boxof.slice(0, 5));
//     });
// }, []);
