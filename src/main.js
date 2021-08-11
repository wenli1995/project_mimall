import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index.js"
import service from "./service/index.js"
import VueLazyLoad from 'vue3-lazyload'
import VueCookies from 'vue3-cookies'
import store from "./store/index"
import { ElMessage } from 'element-plus';  //按需引入ElMessage组件
import 'element-plus/lib/theme-chalk/index.css';

/*本地集成mockjs,请求发送前拦截，可以造各种数据
const mock="true";
if(mock){
    require('./mock/api.js');
}
*/
const app=createApp(App)
app.use(router);
app.use(VueLazyLoad,{
    loading:"../public/imgs/loading-svg/loading-bars.svg"
});  //图片懒加载插件
app.use(VueCookies); //cookie插件
app.use(store);
app.config.globalProperties.axios=service;
app.config.globalProperties.$message=ElMessage;  //全局注册可通过$message调用
//添加一个可以在应用的任何组件实例中访问的全局 property
app.mount('#app');