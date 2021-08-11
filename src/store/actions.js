/*Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，
因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。
Action 通过 store.dispatch 方法触发。也就是
store.dispatch("setUsername")触发action,action中调用store.commit("setUsername")提触发mutation中对应事件，mutation中修改state状态。
https://next.vuex.vuejs.org/zh/
*/
export default{
    setUsername(context,username){
        context.commit("setUsername",username);
    },
    setCartCount(context,count){
        context.commit("setCartCount",count);
    } 
}