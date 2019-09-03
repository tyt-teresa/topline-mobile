import axios from 'axios'

const instance = axios.create({
  baseURL: ' http://ttapi.research.itcast.cn/app/',
  timeout: 1000
})
// 设置请求拦截
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 设置响应拦截
instance.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default instance
