import request from '@/utils/request'
// 獲取文章分類
export const artGetChannelAPI = () => request.get('/my/cate/list')

// 新增文章分類
export const artAddChannelAPI = (data) => request.post('/my/cate/add', data)

// 編輯文章分類
export const artEditChannelAPI = (data) => request.put('/my/cate/info', data)

// 刪除文章分類
export const artDelChannelAPI = (id) =>
  request.delete('/my/cate/del', {
    params: { id }
  })

//獲取文章列表
export const artGetListAPI = (params) =>
  request.get('/my/article/list', {
    params
  })
