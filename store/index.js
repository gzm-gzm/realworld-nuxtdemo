const cookieparser = process.server ? require('cookieparser'): undefined;

// 为了防止在服务端渲染期间运行都是同一个实例
// 为了防止数据冲突 务必把state定义成一个函数 返回数据对象
export const state = () => {
  return {
    // 当前登录用户的信息
    user: null
  }
}

export const mutations = {
  setUser(state, data) {
    state.user = data
  }
}

export const actions = {
  // nuxt特殊的action
  // 这个action 会在服务端渲染期间自动调用
  // 仅在服务端渲染期间执行
  // 作用： 初始化容器数据，传递数据给客户端使用
  nuxtServerInit({
    commit
  }, {
    req
  }) {
    let user = null
    // 如果请求头有cookie
    if (req.headers.cookie) {
      //把cookie字符串转换成JavaScript对象
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setUser', user)
  }
}