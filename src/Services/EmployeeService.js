import AxiosInstance from './AxiosInstance';

const login = async (credentials) => {
  const response = await AxiosInstance.post('/auth/login', credentials);
  localStorage.setItem('token', response.data.data.accessToken);
  localStorage.setItem('user_data', JSON.stringify(response.data.data));
  return response.data;
};

const assembleBike = async (data) => {
  const response = await AxiosInstance.post('/bike/assemble', data);
  return response.data;
};

const getBikes = async () => {
  const response = await AxiosInstance.get('/bike/list');
  return response.data;
};

export default {
  login,
  assembleBike,
  getBikes
};
