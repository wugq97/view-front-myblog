import request from '@/utils/request'

export function getAllCategories () {
  return request({
    url: '/front/categories',
    method: 'get',
    params: {
      page: 1,
      pageSize: 0
    }
  })
}

export function getInfo () {
  return request({
    url: '/front/info',
    method: 'get'
  })
}

export function getHotArticles () {
  return request({
    url: '/front/hotArticles',
    method: 'get'
  })
}

export function getAllTags () {
  return request({
    url: '/front/tags',
    method: 'get'
  })
}

export function getArticles (category, tag, page) {
  return request({
    url: '/front/articles',
    method: 'get',
    params: {
      category, tag, page
    }
  })
}

export function getSearchArticles (text) {
  return request({
    url: '/front/search',
    method: 'get',
    params: {
      text
    }
  })
}

export function getArticle (id) {
  return request({
    url: `/front/article/${id}`,
    method: 'get'
  })
}

export function getComment (id) {
  return request({
    url: '/front/comment',
    method: 'get',
    params: {
      articleId: id
    }
  })
}

export function commitComment (articleId, name, content) {
  return request({
    url: '/front/comment',
    method: 'post',
    params: {
      articleId: articleId,
      username: name,
      content: content
    }
  })
}

export function commitReply (articleId, name, reply) {
  return request({
    url: '/front/comment',
    method: 'post',
    params: {
      articleId: articleId,
      username: name,
      pid: reply.parentId,
      replyName: reply.replyName,
      content: reply.content
    }
  })
}

export function addViews (articleId) {
  return request({
    url: '/front/article/view',
    method: 'post',
    params: {
      articleId: articleId
    }
  })
}

export function addLikes (articleId, userId) {
  return request({
    url: '/front/article/like',
    method: 'post',
    params: {
      articleId, userId
    }
  })
}

export function getView (articleId, userId) {
  return request({
    url: '/front/like',
    method: 'get',
    params: {
      articleId, userId
    }
  })
}

export function getRecommend () {
  return request({
    url: '/front/recommend',
    method: 'get'
  })
}

export function updateUsername (id, username) {
  return request({
    url: '/front/user/username',
    method: 'post',
    params: {
      id, username
    }
  })
}

export function updatePassword (id, oldPassword, newPassword) {
  return request({
    url: '/front/user/password',
    method: 'post',
    params: {
      id, oldPassword, newPassword
    }
  })
}

export function getCategoryByArticle(id) {
  return request({
    url: '/front/article/category',
    method: 'get',
    params: {
      id
    }
  })
}
