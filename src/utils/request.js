import axios from 'axios'
import JSONbig from 'json-bigint'
// 创建一个axios实例
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
// 统一处理大数字
instance.defaults.transformResponse = [function (data) {
  try {
    return JSONbig.parse(data)
  } catch (err) {
    return data
  }
}]
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
  return response.data.tada || response.data
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default instance
