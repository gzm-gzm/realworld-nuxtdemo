// import axios from "axios";

// const request = axios.create({
//   baseURL: 'https://api.realworld.io'
// });


// // 请求拦截器
// // Add a request interceptor
// // 任何请求都要经过请求拦截器
// // 我们可以在请求拦截器中做一些公共的业务处理,例如统一设置 token
// request.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   // 请求就会经过这里

//   config.headers.Authorization = `Token ${user.token}`

//   // 返回 config 请求配置对象
//   return config
// }, function (error) {
//   // 如果请求失败(此时请求还没有发出去)就会进入这里
//   // Do something with request error
//   return Promise.reject(error)
// })

// export default request;