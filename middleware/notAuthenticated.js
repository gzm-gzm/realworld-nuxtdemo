/**
 * 验证是否登录的中间件
 *  这里的登录之后的操作
 * 
 */
export default function ({ store,redirect }){
    if(store.state.user) {
        return redirect('/') //判断如果登录 直接跳转到首页
    }
}