<template>
  <div class="productHeader" :class="{'fixed':isFixed}">
     <div class="container">
      <div class="header">
          <div class="pro-title">{{title}}</div>
          <div class="pro-param">
            <a href="javascript:;">概述</a><span>|</span>
            <a href="javascript:;">参数</a><span>|</span>
            <a href="javascript:;">用户评价</a>
            <slot name="btn"></slot>   
            <!-- 插槽处传入不同的按钮 -->
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            isFixed:false  
            // 控制是否吸顶，当滚动到头部应该出现的位置时吸顶
        }
    },
    props:{
        title:{
            type:String
        }
    },
    methods:{
        handleScroll(){
            let scrollTop=document.documentElement.scrollTop;
            //console.log(scrollTop);
            if(scrollTop>151){
                this.isFixed=true;
            }else{
                this.isFixed=false;
            }
            //console.log(this.isFixed);
        }
    },
    mounted(){
        console.log("header mounted")
        window.addEventListener("scroll",this.handleScroll);
    },
    unmounted(){
      window.removeEventListener('scroll',this.handleScroll)
    }
}
</script>

<style lang="scss">
@import '../assets/scss/button.scss';
.productHeader{
    background-color: #ffffff;
    //吸顶设计
    &.fixed{
            position:fixed;
            top:0;
            left:0;
            width:100%;
            z-index:9;
    }
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 70px;
        .pro-title{
            font-size: 18px;
            line-height: 70px;
        };
        .pro-param{
            font-size: 14px;
            a{
                color:#666666;
                text-decoration: none;
            }
            span{
                color:#999999;
                margin:0 10px;
            }

        }
    }

}
</style>