<template>
  <div class="productContainer">
    <productHeader v-bind:title="product.name">
      <template v-slot:btn>
        <button class="btn btn-small-main" @click="handleToDetail(product.id)">立即购买</button>
      </template>
    </productHeader>
    <div class="content">
        <div class="item-bg">
          <h2>{{product.name}}</h2>
          <h3>{{product.subtitle}}</h3>
          <p>
            <a href="" id="">全球首款双频 GP</a>
            <span>|</span>
            <a href="" id="">骁龙845</a>
            <span>|</span>
            <a href="" id="">AI 变焦双摄</a>
            <span>|</span>
            <a href="" id="">红外人脸识别</a>
          </p>
          <div class="price">
            <span>￥{{product.price}}</span>
          </div>
        </div>
        <div class="item-bg-2"></div>
        <div class="item-bg-3"></div>
        <div class="item-swiper">
          <swiper
            :slides-per-view="3"
            :space-between="30"
            :pagination="{ clickable: true }"
          >
            <swiper-slide><img src="../../public/imgs/product/gallery-2.png"/></swiper-slide>
            <swiper-slide><img src="../../public/imgs/product/gallery-3.png"/></swiper-slide>
            <swiper-slide><img src="../../public/imgs/product/gallery-4.png"/></swiper-slide>
            <swiper-slide><img src="../../public/imgs/product/gallery-5.jpg"/></swiper-slide>
            <swiper-slide><img src="../../public/imgs/product/gallery-6.jpg"/></swiper-slide>
          </swiper>
        </div>
         <div class="item-video">
           <h2>60帧超慢动作摄影<br/>慢慢回味每一瞬间的精彩</h2>
           <p>后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！<br/>更能AI 精准分析视频内容，15个场景智能匹配背景音效。</p>
           <div class="video-bg" @click="showVideo"></div>
           <div class="video-box" >
             <div class="video-mask" @click="hideVideo" v-show="isShow"></div>
             <video :class="{show:isShow}"
             src="../../public/imgs/product/video.mp4" 
             controls="controls" 
             autoplay muted></video>
           </div>
         </div>
      </div>
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
export default {
    name:"product",
    components:{
      productHeader,
      Swiper,
      SwiperSlide
    },
    props:{
      title:{
        type:String
      }
    },
    data(){
      return{
        product:{},
        isShow:false
      }
    },
    mounted(){
      console.log("接收到的路由参数是:",this.$route.params.id)
      let productId=this.$route.params.id;
      this.getProductDetail(productId);
    },
    methods:{
      showVideo(){
        //控制video的样式已控制video的出现，控制遮罩层出现
        this.isShow=true;
      },
      hideVideo(){
        this.isShow=false;
      },
      getProductDetail(productId){
          this.axios.get(`/products/${productId}`).then((res)=>{
            console.log("getProductDetail",res)
            this.product=res;
          })
          console.log(this.product)
      },
      handleToDetail(productId){
        this.$router.push(`/detail/${productId}`);
      }
    }
}
</script>

<style lang="scss">

.productContainer{
  .btn{
    margin-left: 10px;
    height:30px;
    line-height: 30px;
  }
  .content{
    .item-bg{
      height:718px;
      background:url('../../public/imgs/product/product-bg-1.png') no-repeat center;
      background-size:cover;
      text-align: center;  //文本居中对齐
      h2{
        font-size: 80px;
        padding-top: 56px;
      }
      h3{
        font-size: 23px;
        font-weight: lighter;
        letter-spacing: 10px;
      }
      p{
        font-size: 13px;
        margin-top: 22px;
        a{
          text-decoration: none;
          color:#333333;
        }
        span{
          margin:0 18px;
        }
      }
      .price{
        margin-top: 40px;
        font-size: 29px;
      }
    }
    .item-bg-2{
      height:480px;
      background-color: white;
      background:url('../../public/imgs/product/product-bg-2.png') no-repeat center;
      background-size:1226px 397px; 
    }
    .item-bg-3{
      height:638px;
      background:url('../../public/imgs/product/product-bg-3.png') no-repeat center;
      background-size:cover;
    }
    .item-swiper{
        margin:36px auto 52px;
        img{
          width:100%;
        }
    }
    .item-video{
      height: 1044px;
      background-color: #070708;
      text-align: center;
      h2{
        font-size: 60px;
        color:#FFFFFF;
        padding-top: 82px;
      }
      p{
        font-size: 24px;
        color:#FFFFFF;
        font-weight: lighter;
        margin-top: 47px;
      }
      .video-bg{
        background:url('../../public/imgs/product/gallery-1.png') no-repeat center;
        background-size:cover;
        height: 540px;
        width:1226px;
        margin:58px auto 120px;
        cursor: pointer; 
      }
      // 点击背景图片，弹出视频 
      .video-box{
            //遮罩层占满全屏
            .video-mask{
                background-color:#000000;
                opacity: 0.8;
                position:fixed;
                top:0px;
                left:0px;
                width:100%;
                height:100%;
                z-index: 10;
            }
            video{
              // 视频居中
                 transition: top 0.5s;  //top变化时有过度动画
                 position:fixed;
                 top:-100%;   //等要显示是再设置为50%
                 left: 50%;
                 transform: translate(-50%,-50%);
                 width:1000px;
                 height:536px;
                 z-index: 11;
                 &.show{
                   top:50%; 
                 }
            }
        }
    }
  }
}
</style>