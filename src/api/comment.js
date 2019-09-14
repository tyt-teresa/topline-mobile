import request from '@/utils/request'

// 獲取評論或評論回復
export const getCommentList = ({
  isArticle,
  source,
  offset,
  limit
}) => {
  return request.get('/app/v1_0/comments', {
    params: {
      type: isArticle ? 'a' : 'c',
      source,
      offset,
      limit
    }
  })
}

// 添加評論或評論回復
export const sendComment = ({
  target,
  content,
  artId
}) => {
  return request.post('/app/v1_0/comments', {
    target,
    content,
    art_id: artId
  })
}
