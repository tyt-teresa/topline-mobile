import request from '@/utils/request'
export const getDafaultChannel = () => {
  return request.get('/app/v1_0/user/channels')
}
// 獲取所有頻道
export const getAllChannels = () => {
  return request.get('/app/v1_0/channels')
}
// 刪除用戶指定頻道
export const deleteChannel = (id) => {
  return request.delete(`/app/v1_0/user/channels/${id}`)
}
// 增加用戶指定頻道
export const addChannel = (id, seq) => {
  return request.patch('/app/v1_0/user/channels', {
    channels: [{
      id,
      seq
    }]
  })
}
