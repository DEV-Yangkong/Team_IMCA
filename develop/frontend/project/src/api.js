import axios from 'axios';
import { xml2js } from 'xml-js';

const service = 'cabed641996245acbfb041c7c10c6a16';
const url = `https://cors-anywhere.herokuapp.com/http://www.kopis.or.kr/openApi/restful/prffest?service=${service}`;
export const getAllData = (startDate, endDate) => {
  //전체 게시글을 가져오는 API

  return axios
    .get(url, {
      params: {
        cpage: 1,
        rows: 30,
        shcate: 'CCCD',
        prfpdfrom: startDate,
        prfpdto: endDate,
      },
    })
    .then((res) => {
      const options = { compact: true, spaces: 2 };
      const result = xml2js(res.data, options);
      console.log('allArray', result.dbs.db);
      return result.dbs.db;
    })
    .catch((error) => console.log('err', error));
};

export const getConcertData = (currentPage) => {
  return axios
    .get(url, {
      params: {
        cpage: currentPage,
        rows: 20,
        shcate: 'CCCD',
        prfpdfrom: '20230301',
        prfpdto: '20240301',
      },
    })
    .then((res) => {
      const options = { compact: true, spaces: 2 };
      const result = xml2js(res.data, options);
      console.log('concert1year', result.dbs.db);
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
const boxOfficeUrl = `https://cors-anywhere.herokuapp.com/http://kopis.or.kr/openApi/restful/boxoffice?service=${service}`;
export const getConcertBoxOffice = () => {
  return axios
    .get(boxOfficeUrl, {
      params: {
        ststype: 'week',
        date: '20230816',
        catecode: 'CCCD',
      },
    })
    .then((res) => {
      const options = { compact: true, spaces: 2 };
      const result = xml2js(res.data, options);
      console.log('boxofficeM', result);
      return result.boxofs.boxof.slice(0, 5);
    });
};
// export const getActBoxOffice = () => {
//   return axios
//     .get(boxOfficeUrl, {
//       params: {
//         ststype: 'week',
//         date: '20230816', // 현재 날짜 기준으로 바꿀 것
//         catecode: 'AAAA',
//         area: '11', // 전국 할 것인지, 필터링 할 것인지?
//       },
//     })
//     .then((res) => {
//       const options = { compact: true, spaces: 2 };
//       const result = xml2js(res.data, options);
//       console.log('boxOfficeA', result);
//       return result.boxofs.boxof.slice(0, 5);
//     });
// };
