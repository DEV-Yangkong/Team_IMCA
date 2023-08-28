import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://imca.store/',
});

export const mypageApi = async (data) => {
  try {
    const response = await instance.get('/api/v1/users/info', data);
    // console.log('wowww', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
