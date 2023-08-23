import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://port-0-imca-3prof2llkuok2wj.sel4.cloudtype.app/api/v1/',
});

export function BoardPageApi(category) {
  return instance
    .get(`community_board/category/${category}/`)
    .then((res) => res.data);
}

export function getUserDetail(id) {
  return instance.get(`community_board/${id}/`).then((res) => res.data);
}
