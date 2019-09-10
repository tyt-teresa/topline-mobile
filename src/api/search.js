import request from '@/utils/request'
// 獲取聯想建議
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
// 獲取搜索結果
export const getSearchResult = ({
  page = null,
  perPage = null,
  q
}) => {
  return request.get('/app/v1_0/search', {
    params: {
      page,
      per_page: perPage,
      q
    }
  })
}
