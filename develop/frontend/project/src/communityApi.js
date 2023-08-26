import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://port-0-imca-3prof2llkuok2wj.sel4.cloudtype.app/api/v1/',
});

export function BoardPageApi(category, page = ' ') {
  return instance
    .get(`community_board/category/${category}/`, { params: { page: page } })
    .then((res) => res.data);
}

export function getUserDetail(category, id) {
  return instance
    .get(`community_board/category/${category}/${id}/`)
    .then((res) => res.data);
}

export function SaveApi(category, board_id, postData) {
  return instance
    .post(`review/category/${category}/${board_id}/`, postData)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
export function CommentApi(category, board_id) {
  return instance
    .get(`review/category/${category}/${board_id}/`)
    .then((res) => res.data);
}

export function replyCommentApi(category, review_id) {
  return instance
    .get(`bigreview/category/${category}/${review_id}/replies`)
    .then((res) => res.data);
}
