<template>
  <div class="cartContainer">
    <order-header title="我的购物车">
      <template v-slot:desc>
          <div>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</div>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="cartBox">
          <div class="row cartHeader">
              <div class="col-1"><span class="checkbox" :class="{checked:selectedAll}" @click="hanldeSeleteAll"></span>全选</div>
              <div class="col-3">商品名称</div>
              <div class="col-1">单价</div>
              <div class="col-2">数量</div>
              <div class="col-1">小计</div>
              <div class="col-1">操作</div>
          </div>
          <div class="cartList">
            <div class="row cartItem" v-for="item in cartList" :key="item.id">
              <div class="col-1 item-check">
                <span class="checkbox" :class="{checked:item.productSelected}" @click="updateCart(item)"></span>
              </div>
              <div class="col-3 item-name">
                <img v-lazy="item.productMainImage">
                <span>{{item.productName + ' , ' + item.productSubtitle}}</span>
              </div>
              <div class="col-1 item-price">{{item.productPrice}}元</div>
              <div class="col-2 item-num">
                <div class="num-box">
                  <a href="javascript:;" @click="updateCart(item,'-')">-</a>
                  <span>{{item.quantity}}</span>
                  <a href="javascript:;" @click="updateCart(item,'+')">+</a>
                </div>
              </div>
              <div class="col-1 item-total">{{item.productTotalPrice}}元</div>
              <div class="col-1 item-del" @click="handleDelete(item.productId)"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="order-wrap">
        <div class="cart-tip">
          <a href="">继续购物</a>
          共<span>{{cartList.length}}</span>件商品，已选择<span>{{checkedNum}}</span>件
        </div>
        <div class="cart-total">
          合计：<span>{{cartTotalPrice}}</span>元
          <button class="btn btn-small-main" @click="handleToConfirm">去结算</button>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import orderHeader from "../components/OrderHeader.vue"
export default {
    name:"cart",
    components:{
        orderHeader
    },
    data(){
      return{
        cartList:[],
        selectedAll:false,  //全选标志
        cartTotalPrice:0,  //商品总金额
        checkedNum:0//选中商品数量
      }
    },
    mounted(){
      this.getCartList();
    },
    methods:{
      //选中或者改变数量时更新购物车
      updateCart(item,type){
        //item指向cartList实际的条目，改变item,cartList也改变了
        if(type==="-"){
          if(item.quantity===1){
            alert("商品数量不能少于1");
            return;
          }else{
            item.quantity=item.quantity-1;
          }
        }else if(type==="+"){
          if(item.quantity===item.productStock){
            alert("商品数量不能超过库存");
            return;
          }else{
            item.quantity=item.quantity+1;
          }
        }else{
          item.productSelected=!item.productSelected
        }
        //更新后台购物车数据
        this.axios.put(`/carts/${item.productId}`,{
          quantity:item.quantity,
          selected: item.productSelected    
        }).then(res=>{
          console.log("更新购物车",res)
          this.renderData(res);
          this.getCartCount();  
        })
      },
      //初始化购物车的数据
      getCartList(){
        this.axios.get("/carts").then(res=>{
          console.log("购物车",res)
          this.renderData(res);
        })
      },
      //更新购物车也要重新渲染数据，所以封装为函数
      renderData(res){
          this.cartList=res.cartProductVoList;
          this.selectedAll=res.selectedAll;
          this.cartTotalPrice=res.cartTotalPrice;
          this.checkedNum=this.cartList.filter(item=>item.productSelected).length;
      },
      // 删除购物车中的商品
      handleDelete(productId){
        this.axios.delete(`carts/${productId}`).then(res=>{
          console.log("删除商品",res);
           this.renderData(res);
           this.getCartCount();
        })
      },
      //全选按钮
      hanldeSeleteAll(){
          //全选中：/carts/selectAll，全补选中：/carts/unSelectAll
          this.selectedAll=!this.selectedAll;
          let url=this.selectedAll?"/carts/selectAll":"/carts/unSelectAll"
          this.axios.put(url).then(res=>{
            this.renderData(res);
          })
        
      },
      //跳转到结算页面
      handleToConfirm(){
        if(this.checkedNum===0){
          this.$message.warning({
            message: '请选择要结算的商品',
            type: 'warning'
          });
          //alert("请选择要结算的商品")
        }else{
          //全选标志恢复为false
          this.selectedAll=false;
          this.$router.push("/order/confirm")
        }
      },
      //获取购物中所有商品数量总和
      getCartCount(){
        this.axios.get("/carts/products/sum").then((res)=>{
          this.$store.dispatch("setCartCount",res);
        })
      }
      }
}
</script>

<style lang="scss">
@import "../assets/scss/button.scss";
.cartContainer{
  .wrapper{
     background-color:#F5F5F5;   
     padding-top:30px;
     padding-bottom:114px;
    .cartBox{
      text-align: center;
      background-color:#FFFFFF;
      .checkbox{
        display: inline-block;
        width: 22px;
        height: 22px;
        border: 1px solid #E5E5E5;
        vertical-align: middle;
        margin-right: 17px;
        cursor:pointer;
        &.checked{
          background:url('../../public/imgs/icon-gou.png') #FF6600 no-repeat center;
          background-size:16px 12px;
          border:none;
        }
      }
      .row{
        display: flex;
        .col-1{
          flex:1;
        }
        .col-2{
          flex:2;
        }
        .col-3{
          flex:3;
        }
      }
      .cartHeader{
        line-height: 79px;
        height: 79px;
        color:#666666;
        font-size: 14px;
      }
      .cartList{
        .cartItem{
          height: 125px;
          line-height: 125px;
          border-top: 1px solid #E5E5E5;
          display: flex;
          align-items: center;
          font-size:16px;
          color:#333333;
        }
        .item-name{
          display: flex;
          align-items: center;
          height: 80px;
          img{
            width:80px;
            vertical-align:middle;
          }
          span{
            line-height: 40px;
            font-size:18px;
            margin-left: 30px;
          }
        }
        .item-num{
          .num-box{
            margin:0 auto;
            width:150px;
            height:40px;
            line-height:40px;
            border:1px solid #E5E5E5;
            a{
              display:inline-block;
              width:50px;
              color:#333333;
            }
            span{
              display:inline-block;
              width:50px;
              color:#333333;
            }
          }
        }
        .item-total{
            color:#FF6600
        }
        .item-del{
              width:14px;
              height:12px;
              background:url('/imgs/icon-close.png') no-repeat center;
              background-size:contain;
              cursor:pointer;
        }

      }

    }
    .order-wrap{
        font-size:14px;
        color: #666666;
        margin-top: 20px;
        height: 50px;
        line-height: 50px;
      .cart-tip{
        float:left;
        margin-left: 29px;
          a{
            color: #666666;
            margin-right:37px;
          }
          span{
            color:#FF6600;
            margin:0 5px;
          }
      }
      .cart-total{
        margin-right: 29px;
        float:right;
        font-size:14px;
        color:#FF6600;
        span{
           font-size:24px;
        }
        button{
          margin-left:37px;
          cursor: pointer;
        }
      }
      &::after{
        content: '';
        clear: both;
        display: table;
      }
    }
  }

}

</style>