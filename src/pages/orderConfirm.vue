<template>
    <div class="confirmContainer">
        <order-header title="订单确认">
            <template v-slot:desc>
                <div>请确认订单信息并填写收货地址</div>
            </template>
        </order-header>
        <div class="wrapper">
            <div class="container">
                <div class="address">
                    <h2>收货地址</h2>
                    <div class="addrList">
                        <div class="addrItem" :class="{checked:checkedIndex===index}" @click="checkedIndex=index" v-for="(item,index) in addressList" :key="item.id">
                            <div class="name">{{item.receiverName}}</div>
                            <div class="phone">{{item.receiverMobile}}</div>
                            <div class="addr">{{item.receiverProvince+" "+item.receiverCity+" "+item.receiverDistrict+" "+item.receiverAddress}}</div>
                            <div class="action">
                                <span class="del" @click="handleShowDelModal(item)"><i class="iconfont icon-shanchu"></i></span>
                                <span class="edit" @click="handleShowEditModal(item)"><i class="iconfont icon-bianji"></i></span>
                            </div>
                        </div>
                        <div class="addAddr" @click="handleShowAddModal()">
                            <div class="add"><i class="iconfont icon-tianjia"></i></div>
                            <div>添加新地址</div>
                        </div>
                    </div>
                </div>
                <div class="goodsList">
                    <h2>商品</h2>
                    <div  class="goods-item" v-for="(item) in goodsList" :key="item.id">
                        <div class="goods-name">
                        <img v-lazy="item.productMainImage" alt="">
                        <span>{{item.productName + ' ' + item.productSubtitle}}</span>
                        </div>
                        <div class="goods-price">{{item.productPrice}}元x{{item.quantity}}</div>
                        <div class="goods-total">{{item.productTotalPrice}}元</div>
                    </div>
                </div>
                <div class="shipping">
                    <h2>配送方式</h2>
                    <span>包邮</span>
                </div>
                <div class="invoice">
                    <h2>发票</h2>
                    <a href="javascript:;">电子发票</a>
                    <a href="javascript:;">个人</a>
                </div>
                <div class="total">
                    <div class="item">
                        <span class="item-name">商品件数：</span>
                        <span class="item-val">{{cartTotalCount}}件</span>
                    </div>
                    <div class="item">
                        <span class="item-name">商品总价：</span>
                        <span class="item-val">{{cartTotalPrice}}元</span>
                    </div>
                    <div class="item">
                        <span class="item-name">优惠活动：</span>
                        <span class="item-val">0元</span>
                    </div>
                    <div class="item">
                        <span class="item-name">运费：</span>
                        <span class="item-val">0元</span>
                    </div>
                    <div class="item-total">
                        <span class="item-name">应付总额：</span>
                        <span class="item-val">{{cartTotalPrice}}元</span>
                    </div>   
                </div>
                <div class="btn-group">
                    <button class="btn btn-middle-default" @click="$router.push('/cart');">返回购物车</button>
                    <button class="btn btn-middle-main" @click="handleSubmit">去结算</button>
                </div>
            </div>
        </div>
        <!-- 删除模态框 -->
         <modal title="确定删除" btnType="3" 
         v-bind:isShow="isShowDelModal" 
         v-on:cancel="isShowDelModal=false"
         v-on:submit="handleAddr"
         >
            <template v-slot:content><p>您确认要删除此地址吗</p></template>
        </modal>
        <!--编辑模态框-->
         <modal title="编辑地址" btnType="3" 
         v-bind:isShow="isShowEditModal" 
         v-on:cancel="isShowEditModal=false"
         v-on:submit="handleAddr"
         >
            <template v-slot:content>
                <div class="editWrap">
                    <div class="item">
                        <input type="text" placeholder="姓名" class="name" v-model="currentItem.receiverName"/>
                        <input type="text" placeholder="手机" class="phone" v-model="currentItem.receiverMobile"/>
                    </div>
                    <div class="item">
                        <select name="province" v-model="currentItem.receiverProvince">
                            <option value="广东省">广东省</option>
                            <option value="湖南省">湖南省</option>
                            <option value="江西省">江西省</option>
                        </select>
                        <select name="city" v-model="currentItem.receiverCity">
                            <option value="广州市">广州市</option>
                            <option value="深圳市">深圳市</option>
                            <option value="珠海市">珠海市</option>
                        </select>
                        <select name="district" v-model="currentItem.receiverDistrict">
                            <option value="荔湾区">荔湾区</option>
                            <option value="越秀区">越秀区</option>
                            <option value="番禺区">番禺区</option>
                            <option value="南沙区">南沙区</option>
                        </select>
                    </div>
                    <div class="item">
                        <textarea name="addr" v-model="currentItem.receiverAddress">详细地址</textarea>
                    </div>
                    <div class="item">
                         <input type="text" placeholder="邮政编号" v-model="currentItem.receiverZip"/>
                    </div>
                </div>
            </template>
        </modal>
    </div>
</template>

<script>
import OrderHeader from "../components/OrderHeader.vue"
import modal from "../components/Modal.vue"
export default {
    name:"order-confirm",
    components:{
        modal,OrderHeader
    },
    data(){
        return{
            addressList:[],
            goodsList:[],
            cartTotalPrice:0,  //商品总金额
            cartTotalCount:0,  //商品总件数
            isShowDelModal:false,  //控制删除弹框的显示
            isShowEditModal:false,  //控制编辑弹框的显示
            currentItem:{}, //当前要增删改的地址，因为是点击model组件的确定按钮才会触发动作的，而模态框不是在item的dom数中没法直接传参
            action:"" ,//用户行为 0：新增 1：编辑 2：删除
            checkedIndex:0  //标记选中的地址
        }
    },
    methods:{
        //获取地址列表数据
        getAddrList(){
            this.axios.get("/shippings").then((res=>{
                console.log("地址列表",res);
                this.addressList=res.list;
            }))
        },
        //获取商品数据
        getGoodsList(){
            this.axios.get("/carts").then((res)=>{
                console.log("购物车列表",res);
                //过滤选中得商品，才是提交到订单里得
                this.goodsList=res.cartProductVoList.filter((item)=>item.productSelected);
                this.cartTotalPrice=res.cartTotalPrice;
                this.goodsList.forEach(item => {
                    this.cartTotalCount=this.cartTotalCount+item.quantity;
                });
            })
        },
        //显示删除模态框
        handleShowDelModal(item){
            this.currentItem=item;  //设置要删除的项目
            this.action=2;  //设置操作类型是删除
            this.isShowDelModal=true;
        },
        //显示编辑的模态框
        handleShowEditModal(item){
            console.log("@@@@@e")
            this.currentItem=item;
            this.action=1; 
            this.isShowEditModal=true;
        },
        //显示新增的模态框
        handleShowAddModal(){
            console.log("@@@@@a")
            this.currentItem={};  
            this.action=0; 
            this.isShowEditModal=true;
        },
        //增删改地址
        handleAddr(){
            let {currentItem,action}=this.$data;
            if(action==2){
                //删除
                this.axios.delete(`/shippings/${currentItem.id}`).then((res)=>{
                    console.log(res);
                    this.isShowDelModal=false;
                    this.getAddrList();  //重新获取地址列表，或者可以直接修改data中的地址数据
                    this.$message.success({
                        message: '删除成功',
                        type: 'success'
                    }); 
                })
            }else if(action==0){
                //新增,将表单数据绑定在对象上
                if(this.checkForm()){
                    this.axios.post(`/shippings`,{...this.currentItem}).then(res=>{
                        console.log("action0",res);
                        this.isShowEditModal=false;
                        this.getAddrList();  //重新获取地址列表，或者可以直接修改data中的地址数据
                        this.$message.success({
                            message: '新增成功',
                            type: 'success'
                        }); 
                    })
                }else{
                    return;
                }

            }else{
                //编辑
                if(this.checkForm()){
                    this.axios.put(`/shippings/${currentItem.id}`,{...this.currentItem}).then(res=>{
                        console.log("action1",res);
                        this.isShowEditModal=false;
                        this.getAddrList();  //重新获取地址列表，或者可以直接修改data中的地址数据
                        this.$message.success({
                            message: '修改成功',
                            type: 'success'
                        }); 
                    })
                }else{
                    return;
                }
            }
        },
        //表单校验
        checkForm(){
            console.log("checking");
            let { receiverName, receiverMobile, receiverProvince, receiverCity, receiverDistrict, receiverAddress, receiverZip} = this.currentItem;
            let errMsg='';
            if(!receiverName){
            errMsg = '请输入收货人名称';
            }else if(!receiverMobile || !/\d{11}/.test(receiverMobile)){
            errMsg = '请输入正确格式的手机号';
            }else if(!receiverProvince){
            errMsg = '请选择省份';
            }else if(!receiverCity){
            errMsg = '请选择对应的城市';
            }else if(!receiverAddress || !receiverDistrict){
            errMsg = '请输入收货地址';
            }else if(!/\d{6}/.test(receiverZip)){
            errMsg = '请输入六位邮编';
            }
            if(errMsg){
                this.$message.error(errMsg);
                return false;
            }else{
                return true;
            }
        },
        //订单提交
        handleSubmit(){
            let item=this.addressList[this.checkedIndex]
            if(!item){
                this.$message.error("请选择收货地址");
                return;
            }else{
                //传入收货地址ID创建订单号
                this.axios.post("/orders",{
                    shippingId:item.id
                }).then(res=>{
                    console.log("handleSubmit",res);
                    //vuex中购物车数量需要发生变化
                    this.$store.dispatch("setCartCount",this.$store.state.cartCount-this.cartTotalCount);
                    //路由没有接收参数，这里用query传参
                    this.$router.push(`/order/pay?orderNo=${res.orderNo}`)
                })
            }
        }
    },
    mounted(){
        this.getAddrList();
        this.getGoodsList();
    }
}
</script>

<style lang="scss">
@import "../assets/iconfont/iconfont.css";
.confirmContainer{
    .wrapper{
        background-color:#F5F5F5;   
        padding-top:30px;
        padding-bottom:114px;
        .container{
            background-color: #ffffff;
            padding:0 50px 90px;
            box-sizing: border-box;
        }
        .address{
            padding-top: 38px;
            h2{
                margin-bottom: 20px;;
            }
            .addrList{
                display: flex;
                flex-wrap: wrap;
                .addrItem{
                    width:271px;
                    height:180px;
                    border:1px solid #E5E5E5;
                    margin-right: 10px;
                    margin-top: 10px;
                    padding:20px;
                    font-size: 14px;
                    box-sizing: border-box;
                    cursor: pointer;
                    &.checked{
                        border:1px solid #ff6700;
                    };
                    .name{
                        line-height:30px ;
                        height:30px;
                        font-size:18px;
                        margin-bottom:10px;
                    }
                    .addr{
                        height:50px;
                    }
                    .action{
                        height:50px;
                        line-height:50px;
                        span{
                             width: 20px;
                             height: 20px;
                             cursor: pointer;
                             padding-right:10px;
                        }
                    }
                }
                .addAddr{
                    width:271px;
                    height:180px;
                    margin-top: 10px;
                    border:1px solid #E5E5E5;
                    text-align: center;
                    color: #999999;
                    box-sizing: border-box;
                    font-size: 16px;
                    cursor: pointer;
                    .add{
                        width:30px;
                        height:30px;
                        margin: 0 auto;
                        margin-top: 45px;
                    }
                }
            }


        }
        .goodsList{
            padding-top: 38px;
            h2{
                margin-bottom: 20px;;
            }
            .goods-item{
                height: 100px;
                line-height: 100px;
                border-top: 1px solid #E5E5E5;
                border-bottom: 1px solid #E5E5E5;
                display: flex;
                align-items: center;
                font-size:16px;
                color:#333333;
                .goods-name{
                    flex:6;
                    img{
                        height: 80px;
                        width:80px;
                        vertical-align:middle;
                    } 
                }
                .goods-price{
                    flex:2;
                }
                .goods-total{
                    flex:2;
                } 
            }          
        }
        .shipping{
            margin-top: 31px;
            h2{
               display: inline-block;
               color:#333333;
               margin-right: 71px;
               font-size: 20px;
               width: 80px;
            }
            span{
                color:#FF6700;
                font-size: 16px;
            }
        }
        .invoice{
            margin-top: 31px; 
            h2{
               display: inline-block;
               color:#333333;
               margin-right: 71px;
               font-size: 20px;
               width: 80px;
            }
            a{
                text-decoration: none;
                color:#FF6700;
                font-size: 16px;
            }
        }
        .total{
          padding: 50px 44px 33px 0;
          border-bottom: 1px solid #f5f5f5;
          text-align: right;
          font-size: 16px;
          color: #666666;
          .item-val{
            color:#FF6700;
          }
          .item{
            line-height: 15px;
            margin-bottom: 12px;
          }
          .item-val{
            display:inline-block;
            width:100px;
          }
          .item-total{
            .item-val{
              font-size:28px;
            }
          }
        }
        .btn-group{
            margin-top: 53px;
            text-align: right;  //button也可以设置？
        }
    }
    .editWrap{
         font-size:14px;
        .item{
            margin-bottom: 14px;
            input{
                width:283px;
                height:40px;
                border:1px solid #E5E5E5;
                padding:13px 15px;
                box-sizing: border-box;
                &.name{
                    margin-right: 14px;
                }
            }
            select{
                width:100px;
                height:50px;
                border:1px solid #E5E5E5;
                padding:13px 15px;
                box-sizing: border-box;
            }
            textarea{
                width:580px;
                height:62px;
                border:1px solid #E5E5E5;
                padding:13px 15px;
                box-sizing: border-box;
            }
        }

    }
}
</style>