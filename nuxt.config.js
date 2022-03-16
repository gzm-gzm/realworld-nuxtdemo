module.exports = {
  router: {
    // 匹配对应的link 增加这个类名 头部有高亮
    linkActiveClass: 'active',
    // 自定义路由规则
    extendRoutes(routes, resolve) {

      // 清除nuxt基于pages生成的路由表规则
      routes.splice(0);

      routes.push(...[{
        path: '/',
        component: resolve(__dirname, 'pages/layout/'),
        children: [{
            path: '', // 默认子路由
            name: 'home',
            component: resolve(__dirname, 'pages/home/')
          },
          {
            path: '/login',
            name: 'login',
            component: resolve(__dirname, 'pages/login/')
          },
          {
            path: '/register',
            name: 'register',
            component: resolve(__dirname, 'pages/login/')
          },
          {
            path: '/profile/:username',
            name: 'profile',
            component: resolve(__dirname, 'pages/profile/')
          },
          {
            path: '/settings',
            name: 'settings',
            component: resolve(__dirname, 'pages/settings/')
          },
          {
            path: '/editor',
            name: 'editor',
            component: resolve(__dirname, 'pages/editor/')
          },
          {
            path: '/editor/:title',
            name: 'modify',
            component: resolve(__dirname, 'pages/editor/')
          },
          {
            path: '/article/:slug',
            name: 'article',
            component: resolve(__dirname, 'pages/article/')
          }
        ]
      }])
    }
  },
  // 开发的时候注释,
  // 上线取消注释(释放)
  server: {
    host: '0.0.0.0',
    port: 8081
  },
  // 注册插件
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js'
  ]
}