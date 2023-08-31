import axios from 'axios';
import { useCookies } from 'react-cookie';

const instance = axios.create({
  baseURL: 'http://imca.store/',
});

//날짜 선택 누르면 나오는 데이터
// export const getCalendarDetail = (cookies, selectedDate) => {
//   return instance
//     .get('api/v1/calendar/menu/', {
//       params: {
//         date: selectedDate,
//       },
//       headers: {
//         Authorization: `Bearer ${cookies.access_token}`,
//       },
//       withCredentials: true,
//     })
//     .then((res) => {
//       console.log('날짜 선택한 캘린더 데이터 수신 받음', res);
//       return res.data; //데이터 반환
//     })
//     .catch((err) => {
//       console.log('날짜 선택한 캘린더 데이터 수신 거절', err);
//       throw err; // 에러처리
//     });
// };

//전체캘린더 점표시하는 api
export const getCalendar = (cookies) => {
  return instance
    .get('api/v1/calendar/', {
      headers: {
        Authorization: `Bearer ${cookies.access_token}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      // console.log('전체 캘린더 데이터 수신 받음', res);
      return res.data; //데이터 반환
    })
    .catch((err) => {
      // console.log('전체 캘린더 데이터 수신 거절', err);
      throw err; // 에러처리
    });
};

export const postCalendarMemoInput = async (cookies) => {
  try {
    const response = await instance.post(
      '/api/v1/calendar/${id}/memo/',
      cookies,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//메모리스트 api
export const postMemoApi = (cookies, id, memo) => {
  try {
    const response = instance.post(
      `api/v1/calendar/${id}/memo/`,
      { content: memo },
      {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getMemoApi = (id, cookies) => {
  try {
    const response = instance.get(
      `api/v1/calendar/${id}/memo/`,

      {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// export function postCalendarInput(id) {
//   return instance.post('/api/v1/calendar/${id}/memo/').then((res) => res.data);
// }

// // access_token 쿠키를 설정하고 가져온다고 가정
// const access_token = 'yourAccessToken';

// // 공통으로 사용될 헤더 설정 (쿠키 헤더 추가)
// instance.defaults.headers.common['Cookie'] = `access_token=${access_token}`;

// const getCalendarMemo = (id) => {
//   return axios
//     .get(
//       '/api/v1/calendar/{id}/memo/',
//       { withCredentials: true },
//       {
//         params: {
//           id: '0',
//           title: 'string',
//           content: 'string',
//           calendar: 0,
//           user: '0',
//         },
//       },
//     )
//     .then((res) => {})
//     .catch((error) => console.log('캘린더메모 에러', error));
// };

// export const postCalendarMemo = async (data) => {
//   try {
//     const response = await instance.post('/api/v1/calendar/{id}/memo/', data);
//     return response;
//   } catch (error) {
//     console.log('메모에러잡자');
//     throw error;
//   }
// };

// export default getCalendarMemo;
