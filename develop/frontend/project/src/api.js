import axios from 'axios';
import { xml2js } from 'xml-js';

const service = 'cabed641996245acbfb041c7c10c6a16';
// const service = 'b14e78c0be214bfab93cc4988904cbb9';
const url = `https://cors-anywhere.herokuapp.com/http://www.kopis.or.kr/openApi/restful/prffest?service=${service}`;
// export const getAllData = (startDate, endDate) => {
//   //전체 게시글을 가져오는 API

//   return axios
//     .get(url, {
//       params: {
//         cpage: 1,
//         rows: 30,
//         shcate: 'CCCD',
//         stdate: '20230601',
//         eddate: '20231231',
//       },
//     })
//     .then((res) => {
//       const options = { compact: true, spaces: 2 };
//       const result = xml2js(res.data, options);
//       console.log('allArray', result.dbs.db);
//       return result.dbs.db;
//     })
//     .catch((error) => console.log('err', error));
// };
export const dBData = async (access_token) => {
  const realData = [];
  for (let page = 1; page <= 4; page++) {
    try {
      const response = await axios.get('http://imca.store/api/v1/apis', {
        params: { page },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        withCredentials: true,
      });
      realData.push(...response.data);
      console.log(`db에서 데이터 받아오기 ${page}`, response.data);
    } catch (error) {
      console.log('db에서 데이터 못 받아옴', error);
    }
  }
  return realData;
};
// export const getAllData = async (startDate, endDate) => {
//   const allData = [];

//   for (let cpage = 1; cpage <= 3; cpage++) {
//     try {
//       const response = await axios.get(url, {
//         params: {
//           cpage,
//           rows: 30,
//           shcate: 'CCCD',
//           stdate: '20230601',
//           eddate: '20231231',
//         },
//       });

//       const options = { compact: true, spaces: 2 };
//       const result = xml2js(response.data, options);
//       const pageData = result.dbs.db;
//       allData.push(...pageData);

//       console.log(`Page ${cpage} data`, pageData);
//     } catch (error) {
//       console.log(`Error fetching page ${cpage}`, error);
//     }
//   }

//   return allData;
// };
export const getDbConcertData = (currentPage) => {
  return axios
    .get('http://imca.store/api/v1/apis', {
      params: { page: currentPage },
    })
    .then((res) => {
      console.log('db에서 페이지네이션 성공', res.data);
      return res.data;
    })
    .catch((err) => console.log('db에서 페이지네이션 에러', err));
};
export const getConcertData = (currentPage) => {
  return axios
    .get(url, {
      params: {
        cpage: currentPage,
        rows: 20,
        shcate: 'CCCD',
        stdate: '20230301',
        eddate: '20240301',
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
// const detailUrl = `https://cors-anywhere.herokuapp.com/http://www.kopis.or.kr/openApi/restful/pblprfr/${dataId}?service=cabed641996245acbfb041c7c10c6a16`;
export const getConcertDetail = (dataId, service) => {
  return axios
    .get(
      `https://cors-anywhere.herokuapp.com/http://www.kopis.or.kr/openApi/restful/pblprfr/${dataId}?service=cabed641996245acbfb041c7c10c6a16`,
    )
    .then((res) => {
      const options = { compact: true, spaces: 2 };
      const result = xml2js(res.data, options);
      console.log('detailArray', result);
      return result.dbs.db;
    });
};
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
      // console.log('boxofficeM', result);
      return result.boxofs.boxof.slice(0, 10);
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
