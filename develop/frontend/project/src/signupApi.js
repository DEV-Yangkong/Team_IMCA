import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://port-0-imca-3prof2llkuok2wj.sel4.cloudtype.app/',
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
