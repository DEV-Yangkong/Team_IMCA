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

export function CommentApi(category) {
  return instance.get(`review/category/${category}/`).then((res) => res.data);
}
