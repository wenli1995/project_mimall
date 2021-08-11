<!--
1、根据风格指南，组件文件命名为单文件组件的文件名应该要么始终是单词大写开头 (PascalCase)，要么始终是横线连接 (kebab-case)。
前者对于代码编辑器的自动补全最为友好。
2、根据风格指南，组件名为多个单词。可以避免跟现有的以及未来的 HTML 元素相冲突。
2、关于组件命名name，是在组件全局注册时使用的。根据风格指南，命名为NavHeader或者nav-header都是支持的。
为了在组件使用时和html元素使用保持一致，后者比较好。
-->
<template>
    <div class="header">
        <div class="nav-topbar">
            <div class="container">
                <div class="topbar-menu">
                    <a href="javascript:;">小米商城</a>
                    <a href="javascript:;">MIUI</a>
                    <a href="javascript:;">云服务</a>
                    <a href="javascript:;">协议规则</a>
                </div>
                <div class="topbar-user">
                    <a href="javascript:;" v-if="!username" v-on:click="login">登录</a>
                    <a href="javascript:;" v-if="!username">注册</a>
                    <a href="javascript:;" v-if="username">{{username}}</a>
                    <a href="javascript:;" v-if="username" v-on:click="logout">退出</a>
                    <a href="javascript:;" v-if="username"  @click="handleToOrder">我的订单</a>
                    <a href="javascript:;" class="cart" @click="handleToCart"><span class="icon-cart"></span>购物车({{cartCount}})</a>                
                </div>
            </div>
        </div>
        <div class="nav-header">
            <div class="header-logo">
                <a href="/#/index"></a>
            </div>
            <div class="header-menu">
                <div class="item-menu">
                    <span>小米手机</span>
                    <div class="children">
                        <ul>
                            <li class="product"  v-for="(item,index) in productList" v-bind:key="index">
                                <a v-bind:href="'/#/product/'+item.id" target="_blank">
                                    <div class="pro-img">
                                        <img :src="item.mainImage"/>
                                    </div>
                                    <div class="pro-name">{{item.name}}</div>
                                    <div class="pro-price">￥{{item.price?item.price.toFixed(2):0.00}}元</div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="item-menu">
                    <span>REDMI红米</span>
                </div>
                <div class="item-menu">
                    <span>电视</span>
                </div>
            </div>
            <div class="header-search">
                <input class="search"/>
                <span class="icon-search"></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"nav-header",
    data(){
        return{
            productList:[]
        }
    },
    //axios异步返回，所以用计算属性
    computed:{
        username(){
            return this.$store.state.username;
        },
        cartCount(){
            return this.$store.state.cartCount
        }
    },
    mounted(){
        this.getProductList();
        if(this.$cookies.get("userId")){
            this.getUserInfo();
            this.getCartCount();
        }
    },
    methods:{
        getProductList(){
            this.axios.get("/products",{
                params: {
                    categoryId: '100012',
                    pageSize:6
                }
            }).then(response=>{
                this.productList=response.list;
                console.log(response.list);
            })
        },
        handlePrice(price){
            if(!price){
                return "0.00"
            }
            return '￥' + price.toFixed(2) + '元';
        },
        login(){
            this.$router.push("/login");
        },
        //退出登录
        logout(){
            this.axios.post("/user/logout").then(response=>{
                console.log(response);
                this.$message.success({
                    message: '退出成功',
                    type: 'success'
                });
                //清空cookie
                 this.$cookies.set("userId","",{expires:-1}); 
                //清空vuex里的内容
                this.$store.dispatch('setUsername',"");
                this.$store.dispatch('setCartCount',0);
            })
        },
        handleToCart(){
            this.$router.push('/cart');
        },
        handleToOrder(){
            this.$router.push('/order');
        },
        getUserInfo(){
            this.axios.get("/user").then((res)=>{
                this.$store.dispatch("setUsername",res.username);
            })
        },
        getCartCount(){
            this.axios.get("/carts/products/sum").then((res)=>{
                this.$store.dispatch("setCartCount",res);
            })
        }
    }
}
</script>

<style lang="scss">
.header{
    .nav-topbar{
        height:39px;
        line-height: 39px;
        background-color: #333333;
        color:#B0B0B0;
        font-size:12px;
        .container{
            margin-left: auto;
            margin-right: auto;
            max-width:1226px;
            display:flex;
            justify-content: space-between;
            align-items: center;
            .topbar-menu{
                a{
                    display:inline-block;
                    color:#B0B0B0;
                    margin-right:17px;
                }

            }
            .topbar-user{
                a{
                    display:inline-block;
                    color:#B0B0B0;
                    margin-right:19px;

                }
                //.cart优先级高于a
                .cart{
                    margin-right:0px;
                    padding-left:18px;
                    padding-right:18px;
                    background-color:#FF6600;
                    color:white;
                    .icon-cart{
                        display: inline-block; 
                        //与 display: inline 相比，主要区别在于 display: inline-block 允许在元素上设置宽度和高度
                        background:url("../../public/imgs/icon-cart-checked.png") no-repeat center;
                        background-size:contain;
                        width:16px;
                        height:12px;
                        margin-right:4px;
                    }
                }
            }

        }
    }
    .nav-header{
        position: relative;
        margin-left: auto;
        margin-right: auto;
        max-width:1226px;
        height:112px;
        background-color: #FFFFFF;
        color:#333333;
        font-size:16px;
        display:flex;
        justify-content: space-between;
        align-items: center;
        .header-logo{
            a{
                display: inline-block;
                width:53px;
                height:53px;
                background:url("../../public/imgs/logo-mi.png") no-repeat center;
                background-size:contain;
            }

        }
        .header-menu{
            .item-menu{
                display:inline-block;
                margin-right:20px;
                font-weight: bold;
                font-size:16px;
                line-height:112px;  //这个很关键，使得鼠标移开“小米商城”能点击children上的内容
                &:hover{
                    color:#FF6600;
                    .children{
                        height:220px;  //高度出现设置过渡
                        opacity:1;
                    }
                }
                span{
                    cursor:pointer;
                }
                .children{
                    position: absolute;
                    top:112px;  //相对nav-header进行定位
                    left:0px;
                    width:1226px;
                    height:0px;  //指标移到菜单项上才变化
                    opacity:0;
                    overflow: hidden;
                    text-align: center;  //也控制了img元素居中
                    border-top:1px solid #E5E5E5;
                    box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
                    z-index:10;
                    transition:all 0.5s;
                    background-color: #FFFFFF;
                    .product{
                        position:relative;  //边框线先对定位父元素
                        height:220px;
                        line-height:12px; //前面设置了行高为112，这里一定要进行覆盖
                        display: inline-block;
                        width:16.6%;
                        .pro-img{
                            height:137px;
                            img{
                                height:111px;
                                width:auto;
                                margin-top:26px;

                            }
                        };
                        .pro-name{
                            color:#333333;
                            margin-top:19px;
                        };
                        .pro-price{
                            color:#FF6600;
                            margin-top:8px;
                        };
                      //右侧边框线
                        &:before{
                            content:'';
                            position:absolute;
                            top:28px;
                            left:0px;
                            border-left:solid 1px #D7D7D7;
                            height:100px;
                            width:1px;
                        }
                        &:first-child:before{
                            display:none;
                        }
                    }
                }
            }
        }
        .header-search{
            width:319px;
            height:50px;
            display:flex;
            align-items:center;
            border:1px solid #E0E0E0;
            .search{
                border:none;
                border-right:1px solid #E0E0E0;
                width:264px;
                height:50px;
                box-sizing:border-box;
                padding-left:14px;
            }
            .icon-search{
                display: inline-block;
                background:url("../../public/imgs/icon-search.png") no-repeat center;
                background-size: contain;
                width:18px;
                height:18px;
                margin-left:19px;
            }
        }
    }
}
</style>