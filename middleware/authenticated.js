/**
 * 验证是否登录的中间件
 *  这里是未登录的操作
 * 
 */
export default function ({store,redirect}){
    if(!store.state.user) {
        return redirect('/login')
    }
}