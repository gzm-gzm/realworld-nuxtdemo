import {
  request
} from "../plugins/request";//使用按需加载request

// 获取公共的文章列表
export const getArticles = (params) => {
  return request({
    method: "GET",
    url: '/api/articles',
    params
  })
}


export const getFeedArticles = (params) => {
  return request({
    method: "GET",
    url: '/api/articles/feed',
    params
  })
}

// 点赞
export const addFavorite = (slug) => {
  return request({
    method: "POST",
    url: `/api/articles/${slug}/favorite`,
  })
}

export const deleteFavorite = (slug) => {
  return request({
    method: "DELETE",
    url: `/api/articles/${slug}/favorite`,
  })
}

// 获取文章详情
export const getArticleDetail = (slug) => {
  return request({
    method: "GET",
    url: `/api/articles/${slug}`,
  })
}


// 获取文章评论
export const getArticleComments = (slug) => {
  return request({
    method: "GET",
    url: `/api/articles/${slug}/comments`,
  })
}

// 创建文章评论
export const createArticleComment = (slug, comment) => {
  return request({
    method: "POST",
    url: `/api/articles/${slug}/comments`,
    data: {
      comment
    }
  })
}

// 创建文章
export const createArticle = (data) => {
  return request({
    method: "POST",
    url: '/api/articles',
    data: {
      article: data
    }
  })
}

// 更新文章
export const updateArticle = (data, slug) => {
  return request({
    method: "PUT",
    url: `/api/articles/${slug}`,
    data: {
      article: data
    }
  })
}

// 删除文章
export const deleteArticle = (slug) => {
  return request({
    method: "DELETE",
    url: `/api/articles/${slug}`,
  })
}