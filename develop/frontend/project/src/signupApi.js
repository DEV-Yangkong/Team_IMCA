import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://imcal.store/',
});

export const signupApi = async (data) => {
  try {
    const response = await instance.post('/api/v1/users/Register/', data);
    // console.log('wowww', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
