import {
  request
} from "../plugins/request";//使用按需加载request


// 获取标签列表
export const getTags = () => {
  return request({
    method: "GET",
    url: '/api/tags'
  })
}