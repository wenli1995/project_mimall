import {createRouter,createWebHashHistory} from "vue-router"
import Home from "../pages/home.vue"
import Index from "../pages/index.vue"
const routes=[
    {
        path:"/",
        name:"home",
        component:Home,
        redirect:"index",
        children:[
            {path:"index",name:"index",component:Index},
            {path:"product/:id",name:"product",component:()=>import("../pages/product.vue")},
            {path:"detail/:id",name:"detail",component:()=>import("../pages/detail.vue")},
        ]
    }, 
    {
        path:"/register",
        name:"/register",
        component:()=>import("../pages/register.vue")  //路由按需加载
    },
    {
        path:"/login",
        name:"/login",
        component:()=>import("../pages/login.vue"),
    },
    {
        path: '/cart',
        name: 'cart',
        component:()=>import("../pages/cart.vue"),
      },
    {
        path:"/order",
        name:"order",
        component:()=>import("../pages/order.vue"),
        redirect:"/order/list",
        children:[
            {path:"list",name:"order-list",component:()=>import("../pages/ordeList.vue")},
            {path:"pay",name:"order-pay",component:()=>import("../pages/orderPay.vue")},
            {path:"confirm",name:"order-confirm",component:()=>import("../pages/orderConfirm.vue")},
            {path: 'alipay',name: 'alipay',component: ()=>import("../pages/alipay.vue")}
        ]
    }
];
const router = createRouter({
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
  })

export default router;