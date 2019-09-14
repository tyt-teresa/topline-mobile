import axios from 'axios'
import JSONbig from 'json-bigint'
import store from '@/store'
import router from '@/router'
// 创建一个axios实例
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
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
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 设置响应拦截
instance.interceptors.response.use(function (response) {
  return response.data.data || response.data
}, async function (error) {
  if (error.response.status === 401) {
    const refreshToken = store.state.user.refresh_token
    try {
      const response = await axios({
        method: 'put',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      })
      const token = response.data.data.token
      store.commit('setUser', {
        token: token,
        refresh_token: refreshToken
      })
      return instance(error.config)
    } catch (err) {
      console.log(err)
      router.push({
        path: '/login',
        query: {
          redirect: router.currentroute.fullpath
        }
      })
    }
  }
  return Promise.reject(error)
})

export default instance
