import axios from 'axios'

// 创建请求对象
export const request = axios.create({
  baseURL: 'https://api.realworld.io'
})

// 通过插件机制获取到上下文对象（query、params、req、res、app、store...）
// 插件导出函数必须作为 default 成员
export default ({
  store
}) => {

  // 请求拦截器
  // Add a request interceptor
  // 任何请求都要经过请求拦截器
  // 我们可以在请求拦截器中做一些公共的业务处理,例如统一设置 token
  request.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 请求就会经过这里,如果有用户,并且用户有token
    const {
      user
    } = store.state

    if (user && user.token) {
       // Authorization是后端定义的
      config.headers.Authorization = `Token ${user.token}`
    }

    // 返回 config 请求配置对象（如果不返回请求就发送不出去了）
    return config
  }, function (error) {
    // 如果请求失败(此时请求还没有发出去)就会进入这里
    // Do something with request error
    return Promise.reject(error)
  })
}