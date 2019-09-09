import request from '@/utils/request'
export const getSuggestion = (q) => {
  return request.get('/app/v1_0/suggestion', {
    params: {
      q
    }
  })
}
// 獲取用戶搜索歷史
export const getSearchHistory = () => {
  return request.get('/app/v1_0/search/histories')
}
// 刪除用戶搜索歷史
export const deleteSearchHistory = () => {
  return request.delete('/app/v1_0/search/histories')
}
