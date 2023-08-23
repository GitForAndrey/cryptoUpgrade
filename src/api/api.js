import axios from 'react-native-axios';

//axios
const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
});

export const getDataRequest = async url => {
  try {
    const response = await api.get(url);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    if (error.response) {
      // Ошибка с ответом от сервера (например, ошибка статуса)
      throw new Error(`Request error: ${error.message}`);
    } else if (error.request) {
      // Ошибка без ответа от сервера (например, проблемы с сетью)
      throw new Error('Network error: Unable to connect to the server.');
    } else {
      // Прочие ошибки
      throw new Error('An error occurred while making the request.');
    }
  }
};

// // Создание новой записи
// export const createRecord = async data => {
//   try {
//     const response = await api.post('/records', data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export default api;
