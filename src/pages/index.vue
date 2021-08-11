<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡</a>
              <div class="children">
                <div class="chidren-data">
                  <ul v-for="(phones,index) in phoneList" v-bind:key="index">
                    <li v-for="(item,i) in phones" v-bind:key="i">
                      <a :href="'/#/product/'+item.id">
                        <img v-bind:src="item.img"/>
                        <span>{{item.name}}</span>
                      </a>
                    </li>
                </ul>
                </div>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电视 盒子</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">笔记本 平板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">家电 插线板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">出行 穿戴</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">智能 路由器</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电源 配件</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">生活 箱包</a>
            </li>
          </ul>
        </div>
        <swiper
              :slides-per-view="1"
              navigation
              :pagination="{ clickable: true }"
              loop=true
              :autoplay="{delay:3000}"
              effect="cube"
              :cubeEffect="{shadow: false}"
          >
            <swiper-slide v-for="(item,index) in slideList" v-bind:key="index">
              <a :href="item.id?'/#/product/'+item.id:'/#/product/'+42"><img v-bind:src="item.img"/></a>
            </swiper-slide>
        </swiper>
      </div>
      <div class="ads-box">
          <a  v-bind:href="'/#/product/'+item.id" v-for="item in adsList" v-bind:key="item">
            <img v-lazy="item.img"/>  <!--运用图片懒加载技术-->
          </a>
      </div>
      <div class="banner">
        <a href="/#/product/30"><img src="/imgs/banner-1.png"/></a>
      </div>
    </div>
    <div class="product-box">
        <div class="container">
          <p class="title">手机</p>
          <div class="wrapper">
            <div class="banner-left">
              <a href="/#/product/35"><img src="../../public/imgs/mix-alpha.jpg"></a>
            </div>
            <div class="product-list">
              <div class="product-item" v-for="(item,index) in productList" v-bind:key="index">
                <span v-bind:class="index%2==0?'new-pro':'kill-pro'">{{index%2==0?'新品':'促销'}}</span> <!--假设偶数是新品-->
                <div class="item-img">
                  <img :src="item.mainImage"/>
                </div>
                <div class="item-title">{{item.name}}</div>
                <div class="item-desc">{{item.subtitle}}</div>
                <div class="item-price" v-on:click="addCart(item.id)">￥{{item.price?item.price.toFixed(2):0.00}}</div>
              </div>
            </div>
          </div>
        </div>
    </div> 
    <service-bar></service-bar>
    <modal title="提示信息" btnType="1" sureText="查看购物车" v-bind:isShow="showModal" v-on:cancel="showModal=false" @submit="handleToCart">
         <template v-slot:content>商品添加成功</template>
    </modal>
  </div>
</template>

<script>
/*swipper的使用:https://swiperjs.com/vue
https://swiperjs.com/swiper-api
*/
//引入swiper-vue组件
import { Swiper, SwiperSlide} from 'swiper/vue'
//引入swiper样式
import 'swiper/swiper.scss';
//使用导航栏和切换按钮要用到SwiperCore,Navigation, Pagination并添加样式
import SwiperCore, {Navigation, Pagination,Autoplay,EffectCube} from 'swiper'
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/effect-cube/effect-cube.scss';
SwiperCore.use([Navigation, Pagination,Autoplay,EffectCube]);
import ServiceBar from "../components/ServiceBar.vue"
import Modal from "../components/Modal.vue"
export default {
    name:"index",
    components:{
      ServiceBar,
      Swiper,
      SwiperSlide,
      Modal
    },
    data(){
      return {
        slideList:[
          {
            id:'42',
            img:'/imgs/slider/slide-1.jpg'
          },
          {
            id:'45',
            img:'/imgs/slider/slide-2.jpg'
          },
          {
            id:'46',
            img:'/imgs/slider/slide-3.jpg'
          },
          {
            id:'',
            img:'/imgs/slider/slide-4.jpg'
          },
          {
            id:'',
            img:'/imgs/slider/slide-1.jpg'
          }
        ],
        phoneList:[
          [
            {id:30,img:'/imgs/item-box-1.png',name:'小米CC9',},
            {id:31,img:'/imgs/item-box-2.png',name:'小米8青春版',},
            {id:32,img:'/imgs/item-box-3.jpg',name:'Redmi K20 Pro',},
            {id:33,img:'/imgs/item-box-4.jpg',name:'移动4G专区',},
            {id:30,img:'/imgs/item-box-1.png',name:'小米CC9',},
            {id:31,img:'/imgs/item-box-2.png',name:'小米8青春版',},
          ],
          [
            {id:30,img:'/imgs/item-box-1.png',name:'小米CC9',},
            {id:31,img:'/imgs/item-box-2.png',name:'小米8青春版',},
            {id:32,img:'/imgs/item-box-3.jpg',name:'Redmi K20 Pro',},
            {id:33,img:'/imgs/item-box-4.jpg',name:'移动4G专区',},
            {id:30,img:'/imgs/item-box-1.png',name:'小米CC9',},
            {id:31,img:'/imgs/item-box-2.png',name:'小米8青春版',},
          ]
        ],
        adsList:[
          {
            id:33,
            img:'/imgs/ads/ads-1.png'
          },{
            id:48,
            img:'/imgs/ads/ads-2.jpg'
          },{
            id:45,
            img:'/imgs/ads/ads-3.png'
          },{
            id:47,
            img:'/imgs/ads/ads-4.jpg'
          }
        ],
        productList:[],
        showModal:false //控制模态框的显示
      }
    },
    mounted(){
      this.getProductList();
      //console.log(this.$store.state.username+","+this.$store.state.cartCount);
    },
    methods:{
        getProductList(){
            this.axios.get("/products",{
                params: {
                    categoryId: '100012',
                    pageSize:14
                }
            }).then(response=>{
                this.productList=response.list.slice(6,14);
                //console.log(response.list);
            })
        },
        addCart(id){
          this.axios.post("/carts",{
                productId:id,
                selected: true
            }).then((res)=>{
                //console.log("添加到购物车",res)
                this.showModal=true;
                this.$store.dispatch("setCartCount",res.cartTotalQuantity)  //更新vuex的购物车数量
            })
        },
        //跳转到购物车
        handleToCart(){
          this.$router.push("/cart");
        }
    }

}
</script>

<style lang="scss">
@import '../assets/scss/common.scss';
  .index{
    position:relative;
    .swiper-box{
      //这是swiper自动生成的div的类
      .swiper-container {
        height:451px;
        img{
          width:100%;
          height:100%
        }
        //左侧菜单的出钱，分页器上一页的按钮位置需要调整
        .swiper-button-prev{
          left:274px;
        }
      }
      .nav-menu{
        position:absolute;
        z-index:9;   //顶部菜单的z-index是10
        width:264px;
        height:451px;
        font-size:16px;
        background-color: #55585a7a;
        padding:26px 0;
        box-sizing: border-box;
        .menu-wrap{
          .menu-item{  
            //垂直居中技巧
           height:50px;
           line-height: 50px;
            a{
              position: relative;
              display: block;
              padding-left:30px;
              color:#FFFFFF;
              &:after{
                content:"";
                position:absolute;
                top:17px;
                right:30px;
                background:url('/imgs/icon-arrow.png') no-repeat center;
                background-size:contain;
                width:10px;
                height:15px;

              }
            }
            &:hover{
                background-color: #FF6600;
                .children{
                  display: block;
                }
              }
            .children{
               display:none;
              .chidren-data{
                position:absolute;
                top:0px;
                left:264px;
                display: flex;
                height:451px;
                width:481px;
                flex-direction:column;
                flex-wrap: wrap;
                justify-content: space-between;
                background-color: #FFFFFF;
                border:1px solid #e5e5e5;
                ul{
                  height:100%;
                  li{
                    padding-left: 23px;
                    //垂直居中技巧
                    height:75px;
                    line-height:75px;
                    a{
                      color:#333333;
                      font-size: 14px;

                    }
                    img{
                      width:35px;
                      height:42px;
                      vertical-align: middle;
                      margin-right:15px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .ads-box{
      margin-top: 14px;
      display: flex;
      justify-content: space-between;
      a{
        width:296px;
        height:167px;
        img{
          width:100%;
          height:100%;
        }
      }
    }
    .banner{
      margin-top:31px;
      margin-bottom: 50px;
         img{
          width:100%;
          height:100%;
        }     
    }
    .product-box{
      height:740px;
      background-color: #F5F5F5;
      .container{
        padding:30px 0 50px;
        .title{
          font-size:21px;
          margin-bottom: 20px;
        }
        .wrapper{
          display: flex;
          height:619px;
          .banner-left{
            width:224px;
            margin-right:16px;
            img{
              width:100%;
              height:100%;
            }
          }
          .product-list{
            width:986px;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            align-content: space-between; //上下拉伸不留间距
            .product-item{
              width:236px;
              height:302px;
              text-align:center;
              background-color: #FFFFFF;
              span{
                display: inline-block;
                width:67px;
                height:24px;
                font-size:14px;
                color:#FFFFFF;
                line-height:24px;
                &.new-pro{
                  background-color:#7ECF68;
                }
                &.kill-pro{
                  background-color:#E82626;
                }
              }
              .item-img{
                img{
                  width:100%;
                  height:195px;
                }
              }
              .item-title{
                font-size: 13px;
                color:#333333;
                font-weight: bold;
              }
              .item-desc{
                font-size:13px;
                color:#999999;
                margin:6px auto 13px;
              }
              .item-price{
                font-size:13px;
                color:#F20A0A;
                font-weight: bold;
                cursor: pointer;
                &:after{
                  content:"";
                  background:url("../../public/imgs/icon-cart-hover.png") no-repeat center;
                  background-size: contain;
                  width:22px;
                  height:22px;
                  margin-left: 5px;
                  vertical-align: middle;
                  display: inline-block;
                }
              }

            }
          }
        }
      }
    }
  }
</style>