import axios from 'axios';
import { useCookies } from 'react-cookie';

const instance = axios.create({
  baseURL: 'http://imca.store/api/v1/',
  withCredentials: true,
});

// instance.interceptors.request.use((config) => {
//   const [cookies] = useCookies(['access_token']);
//   config.headers.Authorization = `Bearer ${cookies.access_token}`;
//   return config;
// });

export function BoardPageApi(category, page = ' ') {
  return instance
    .get(`community_board/category/${category}/get/`, {
      params: { page: page },
    })
    .then((res) => res.data);
}

export function getUserDetail(category, id) {
  return instance
    .get(`community_board/category/${category}/detail/${id}/get/`)
    .then((res) => res.data);
}

export function SaveApi(category, board_id, postData) {
  return instance
    .post(`review/category_gather_review/${category}/${board_id}/`, postData)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
export function CommentApi(category, board_id) {
  return instance
    .get(`review/category_gather_review/${category}/${board_id}/get/`)
    .then((res) => res.data);
}

export function deleteUserDetail(category, id) {
  return instance
    .delete(`community_board/category/${category}/detail/${id}/`)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
