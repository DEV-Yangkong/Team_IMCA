import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://port-0-imca-3prof2llkuok2wj.sel4.cloudtype.app/',
  headers: {},
});

// GET 요청 보내기
// instance
//   .get('/endpoint')
//   .then((response) => {
//     console.log('응답 데이터:', response.data);
//   })
//   .catch((error) => {
//     console.error('에러 발생:', error);
//   });

// // POST 요청 보내기
// const postData = {
//   key: 'value',
// };

// instance
//   .post('/endpoint', postData)
//   .then((response) => {
//     console.log('응답 데이터:', response.data);
//   })
//   .catch((error) => {
//     console.error('에러 발생:', error);
//   });
