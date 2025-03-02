// api/auth.ts - 인증 관련 API 및 인터셉터 설정
import axios from 'axios';

// API 클라이언트 생성
export const customAxios = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  withCredentials: true, // 쿠키 포함
});

customAxios.interceptors.request.use((config) => {
  return config;
})

customAxios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response) {

    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.removeItem('userId');
      localStorage.removeItem('userAvatar');
      localStorage.removeItem('userNickname');
      window.location.href = '/auth';
    } else {
      alert("문제 발생 ");
    }
  }
  return Promise.reject(error);
});
