import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://port-0-imca-3prof2llkuok2wj.sel4.cloudtype.app//',
});

// 생성한 인스턴스를 사용하여 요청 보내기
export const BoardPageApi = () => {
  return instance.get('api/v1/community_board/').then((res) => {
    console.log('api data check', res);
    return res.data;
  });
};

// (2) GET: getUserFeeds()
// - 유저네임을 기반으로 해당 유저가 작성한 게시글만 불러온다.
// - URL: http://127.0.0.1:8000/api/v1/feeds/<str:username>
export const getUserDetail = ({ queryKey }) => {
  // ['getUserFeeds', 'inseopadadadada']
  // console.log("getUserFeeds", data.queryKey[1])

  const [_, username] = queryKey;

  return instance.get('board/' + username).then((res) => res.data);
};
