import request from '@/utils/request'
// 用户认证(登录注册)
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

// 获取用户自己信息
export const getUserInfo = () => {
  return request.get('/app/v1_0/user')
}

// 获取用户个人资料
export const getUserProfile = () => {
  return request.get('/app/v1_0/user/profile')
}

// 上传图片
export const uploadPhoto = (key, file) => {
  const formData = new FormData()
  formData.append(key, file)
  return request.patch('/app/v1_0/user/photo', formData)
}

// 获取用户的关注列表
export const getfollowings = ({
  page,
  perPage
}) => {
  return request.get('/app/v1_0/user/followings', {
    params: {
      page,
      per_page: perPage
    }
  })
}

// 获取用户的粉丝列表
export const getfollowers = ({
  page,
  perPage
}) => {
  return request.get('/app/v1_0/user/followers', {
    params: {
      page,
      per_page: perPage
    }
  })
}
