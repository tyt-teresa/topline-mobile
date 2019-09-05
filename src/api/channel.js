import request from '@/utils/request'
export const getDafaultChannel = () => {
  return request.get('/app/v1_0/user/channels')
}
