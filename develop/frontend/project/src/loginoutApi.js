import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://imca.store/',
});
// 로그인시
export const loginoutApi = async (data) => {
  try {
    const response = await instance.post('/api/v1/users/Loginout/', data);
    return response;
  } catch (error) {
    throw error;
  }
};

// 로그아웃시
export const logoutApi = async () => {
  try {
    const response = await instance.delete('/api/v1/users/Loginout/', {
      withCredentials: true,
    });
    console.log(response, '로그아웃요청');
    return response;
  } catch (error) {
    throw error;
  }
};
// 토큰 재발행
// export const refreshAccessToken = async (refresh_token) => {
//   try {
//     const response = await instance.post('/api/v1/users/Refresh/');
//     return response;
//   } catch (error) {
//     console.log('리프레시 토큰발행 실패', error);
//   }
// };
// 토큰 재발행

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

export const getUserMypage = (cookies) => {
  return instance
    .get('api/v1/user/info', {
      withCredentials: true,
    })
    .then((res) => {
      console.log('유저 데이터 수신 받음', res);
      return res.data; //데이터 반환
    })
    .catch((err) => {
      console.log('유저 데이터 수신 거절', err);
      throw err; // 에러처리
    });
};
