export default{
    //store.commit('xxx')触发"setUsername"事件时触发此函数,第二个参数是事件触发时的载荷
    setUsername(state,username){
        this.state.username=username
    },
    setCartCount(state,count){
        this.state.cartCount=count;
    }
}