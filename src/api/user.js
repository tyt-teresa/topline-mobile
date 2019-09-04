import request from '@/utils/request'
export const login = ({ mobile, code }) => {
//   return request({
//     method: 'POST',
//     url: 'app/v1_0/authorizations',
//     data: { mobile, code }
//   })
  return request.post('app/v1_0/authorizations', {
    mobile,
    code
  })
}
