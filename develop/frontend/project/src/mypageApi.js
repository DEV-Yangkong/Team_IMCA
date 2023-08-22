import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://port-0-imca-3prof2llkuok2wj.sel4.cloudtype.app/',
});

export const mypageApi = async (data) => {
  try {
    const response = await instance.get('/api/v1/users//', data);
    // console.log('wowww', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
