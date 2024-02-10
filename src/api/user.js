import request from '@/utils/request'

//註冊
export const userRegisterAPI = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })

// 登入
export const userLoginAPI = ({ username, password }) =>
  request.post('/api/login', { username, password })
