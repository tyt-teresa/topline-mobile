import request from '@/utils/request'

// 獲取文章
export const getArticles = ({
  channelId,
  timestamp,
  withTop
}) => {
  return request.get('/app/v1_1/articles', {
    params: {
      channel_id: channelId,
      timestamp,
      with_top: withTop
    }
  })
}

// 對文章不感興趣
export const dislikeArticles = (id) => {
  return request.post('/app/v1_0/article/dislikes', {
    target: id
  })
}

// 舉報文章
export const reportsArticle = ({
  target,
  // 举报类型： 0-其他问题，1-标题夸张，2-低俗色情，3-错别字多，4-旧闻重复，5-广告软文，6-内容不实，7-涉嫌违法犯罪，8-侵权'
  type
}) => {
  return request.post('/app/v1_0/article/reports', {
    target,
    type
  })
}
