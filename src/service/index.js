import axios from "axios";
//import env from "../evn.js"
/*
axios官方文档：https://www.npmjs.com/package/axios#cancellation
vue3 globalProperties的使用https://v3.cn.vuejs.org/api/application-config.html#globalproperties
参考博客：https://blog.51cto.com/u_11462036/2793808
*/
//根据前端跨域方式调整baseURL,
//CORS跨域:(env.js)开发环境、线上环境设置不一样的baseURL。赋值为evn.baseURL。
//代理模式：前端接口统一以"/api"作为前缀，方便统一拦截，并在vue.config.js中进行代理设置
const service=axios.create({
  //baseURL:env.baseURL,
  baseURL:"/api",
  timeout:5000
});

//接口错误拦截-响应拦截器——未登录拦截
service.interceptors.response.use(function (response) {
    let res= response.data;
    console.log(res.status);
    if(res.status==0){
        return res.data;
    }else if(res.status==10){
        window.location.href="/#/login";
        return Promise.reject(res);
    }else{
        alert(res.msg)
        return Promise.reject(res);
    }
    /*res.status是和后台接口规范，0是成功，10是未登录
      res.data是请求成功时后台返回的数据
      res.msg是请求失败时后台返回的错误信息
    */
  }, function (error) {
    console.log(error);   //处理2xx以外的错误码
    return Promise.reject(error);
  });
  
  export default service