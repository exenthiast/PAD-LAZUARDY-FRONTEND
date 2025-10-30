import api from './api';

export const registerUser = async (formData) => {
  try {
    const response = await api.post('/register', formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Terjadi kesalahan' };
  }
};
