import { createStore } from 'vuex';
import actions from "./actions.js"
import mutations from './mutations.js';
const state={
    username:"",  //用户名
    cartCount:0   //购物车商品数量
}
const store=createStore({
    state,
    actions,
    mutations
});
export default store;