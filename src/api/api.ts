import axios from 'react-native-axios';

//axios
const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  timeout: 7000,
});

export const getDataRequest = async (url:string) => {
  try {
    const response = await api.get(url);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error:any) {
    if (error.response) {
      throw new Error(`Request error: ${error.message}`);
    } else if (error.request) {
      throw new Error('Network error: Unable to connect to the server.');
    } else {
      throw new Error(error);
    }
  }
};

export default api;
