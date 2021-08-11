<template>
    <div class="detialContainer">
        <productHeader v-bind:title="product.name"></productHeader>
        <div class="container">
            <div class="left">
                <swiper
                :pagination="{ clickable: true }"
                >
                <swiper-slide><img src="../../public/imgs/detail/phone-1.jpg"/></swiper-slide>
                <swiper-slide><img src="../../public/imgs/detail/phone-2.jpg"/></swiper-slide>
                <swiper-slide><img src="../../public/imgs/detail/phone-3.jpg"/></swiper-slide>
                <swiper-slide><img src="../../public/imgs/detail/phone-4.jpg"/></swiper-slide>
                </swiper>
            </div>
            <div class="right">
                <h2 class="title">{{product.name}}</h2>
                <p class="info">相机全新升级 / 960帧超慢动作 / 手持超级夜景 / 全球首款双频GPS / 骁龙845处理器 / 红外人脸解锁 / AI变焦双摄 / 三星 AMOLED 屏</p>
                <div class="price">{{product.price}}元<span class="del">1999元</span></div>
                <div class="line"></div>
                <div class="address">
                    <div class="addr">北京 北京市 朝阳区 安定门街道</div>
                    <div class="stock">有现货</div>
                </div>
                 <div class="version">
                     <h3>选择版本</h3>
                    <div class="v v1" :class="{checked:version===1}" @click="version=1">6GB+64GB 全网通</div>
                    <div class="v v2" :class="{checked:version===2}" @click="version=2">4GB+64GB 移动4G</div>
                </div> 
                 <div class="version">
                    <h3>选择颜色</h3>
                    <div class="v v1 checked"><span class="color"></span>深空灰</div>
                </div>   
                <div class="total">
                    <div class="phone-info">
                        <div class="phone-title">{{version==1?'6GB+64GB 全网通 深灰色':'4GB+64GB 移动4G 深灰色'}}</div>
                        <div class="phone-price">{{product.price}}元</div>
                    </div>
                    <div class="phone-total">总计：{{product.price}}元</div>
                </div>
                <div >
                    <button class="btn btn-large-main" @click="handleAddCart">加入购物车</button>
                </div>                             
            </div>
        </div>
        <div class="price-info">
            <div class="container">
                <h3>价格说明</h3>
                <div class="desc">
                    <img src="../../public/imgs/detail/item-price.jpeg" alt="">
                </div>
            </div>
         </div>
        <service-bar></service-bar>
    </div>
</template>

<script>
//引入swiper-vue组件
import { Swiper, SwiperSlide} from 'swiper/vue'
//引入swiper样式
import 'swiper/swiper.scss';
//使用导航栏和切换按钮要用到SwiperCore,Navigation, Pagination并添加样式
import SwiperCore, {Pagination} from 'swiper'
import 'swiper/components/pagination/pagination.scss';
SwiperCore.use([Pagination]);
import productHeader from "../components/ProductHeader.vue"
import ServiceBar from "../components/ServiceBar.vue"
export default {
    name:"detail",
    components:{
        productHeader,
        ServiceBar,
        Swiper,
        SwiperSlide
    },
    data(){
        return{
            product:{},
            productId:this.$route.params.id,
            version:1  //商品版本切换
        }
    },
    methods:{
        getProductDetail(productId){
          this.axios.get(`/products/${productId}`).then((res)=>{
            this.product=res;
          })
      },
      handleAddCart(){
          this.axios.post("/carts",{
              productId:this.productId,
              selected: true
          }).then((res)=>{
              //console.log("添加到购物车",res)
              this.$store.dispatch("setCartCount",res.cartTotalQuantity)  //更新vuex的购物车数量
              this.$router.push('/cart');
          })
      }
    },
    mounted(){
        this.getProductDetail(this.productId)
    }
}
</script>

<style lang="scss">
.detialContainer{
    .left{
        float:left;
        width:642px;
        height:617px;
        margin-top:5px;
        img{
            width:100%;
            height:100%;
        }
    }
    .right{
        float:right;
        width:584px;
        height:870px;
        .title{
            font-size:28px;
            color:#333333
        }
        .info{
            font-size: 14px;
            color:#999999;
            margin-top: 16px;
        }
        .price{
            font-size:20px;
            color:#FF6700;
            margin-top: 26px;
            .del{
                font-size:14px;
                color:#999999;
                text-decoration:line-through;
            }

        }
        .line{
          height:0;
          margin-top:25px;
          margin-bottom:28px;
          border-top:1px solid #E5E5E5;
        }
        .address{
            margin-top: 28px;
            height:108px;
            border:1px solid #E5E5E5;
            background-color:#FAFAFA;
            padding-top: 32px;
            padding-left:64px;
            font-size:14px;
            .addr{
                color:#666666
            }
            .stock{
                color:#FF6700;
                margin-top:15px;
            }
        }
        .version{
            margin-top: 30px;
            h3{
                color:#333333;
                font-size:18px;
            }
            .v{
                width:287px;
                height: 50px;
                line-height: 50px;
                color:#333333;
                font-size: 16px;
                border: 1px solid #E5E5E5;
                text-align: center;
                margin-top: 20px;
                cursor: pointer;
            }
            .v1{
                float:left;
                 .color{
                    display:inline-block;
                    width:14px;
                    height:14px;
                    background-color:#666666;
                    margin-right: 10px;
                 }
            }
            .v2{
                float:right;
            }
            &::after{
                content:"";
                display:table;
                 clear: both;
            }
            .checked{
                 border:1px solid #FF6600;
                 color:#FF6600;
            }
        }
        .total{
            margin: 50px 0 30px;
            height:108px;
            background-color:hsl(0, 0%, 98%);
            padding: 24px 30px;
            font-size:14px;
            box-sizing: border-box;
            .phone-info{
                height: 30px;
                .phone-title{
                    float: left;
                }
                .phone-price{
                    float:right;
                }
                &::after{
                    content:"";
                    display:table;
                    clear: both;
                }
            }
            .phone-total{
                font-size: 24px;
                color:#FF6600;

            }
        }
    }
    .price-info{
        clear: both;
        background-color: #F3F3F3;
        padding:38px 0 60px;
        h3{
            color:#333333;
            font-size: 24px;
        }
        .desc{
            margin-top: 24px;
            height: 189px;
            width:100%;
            img{
                width:100%;
                height:100%;
            }
        }
    }
}
</style>