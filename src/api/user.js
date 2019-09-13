import request from '@/utils/request'
export const login = ({ mobile, code }) => {
  return request.post('/app/v1_0/authorizations', {
    mobile,
    code
  })
}

// 拉黑作者接口
export const blackListUser = (id) => {
  return request.post('/app/v1_0/user/blacklists', {
    target: id
  })
}

// 關注用戶
export const followUser = (id) => {
  return request.post('/app/v1_0/user/followings', {
    target: id
  })
}

// 取消關注
export const unfollowUser = (id) => {
  return request.delete(`/app/v1_0/user/followings/${id}`)
}
