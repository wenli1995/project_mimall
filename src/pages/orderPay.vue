<template>
    <div class="payContainer">
        <order-header title="订单支付">
        </order-header>
        <div class="wrapper">
            <div class="container">
                <div class="order">
                    <div class="order-brief">
                        <div class="icon-succ"></div>
                        <div class="order-info">
                            <h2>订单提交成功！去付款咯～</h2>
                            <p>请在<span>30分</span>内完成支付, 超时后将取消订单</p>
                            <p>收货信息：{{addressInfo}}</p>
                        </div>
                        <div class="order-total">
                            <p>应付总额：<span>{{payment}}</span>元</p>
                            <!-- <p>订单详情<em class="icon-down"></em></p> -->
                        </div>
                    </div>
                    <div class="order-detial">
                        <div class="item">
                            <div class="detail-title">订单号：</div>
                            <div class="detail-info theme-color">{{orderId}}</div>
                        </div>
                        <div class="item">
                            <div class="detail-title">收货信息：</div>
                            <div class="detail-info">{{addressInfo}}</div>
                        </div>
                        <div class="item">
                            <div class="detail-title">商品名称：</div>
                            <div class="detail-info">
                                <div v-for="(item,index) in orderDetailList"  :key="index">
                                    <img v-lazy="item.productImage"/>
                                    <span>{{item.productName}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="detail-title">发票信息：</div>
                            <div class="detail-info">电子发票 个人</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="way">
                    <div class="tip">请选择以下支付方式付款</div>
                    <div class="platform">支付平台</div>
                    <div class="pay pay-ali" @click="handleAliPay"></div>
                    <div class="pay pay-wechat" @click="handleWechatPay"></div>
                </div>
            </div>
        </div>
        <scan-pay-code v-if="isQRShow" :img="payImg" @click="handleClickQR"></scan-pay-code>
        <!-- 支付确认模态框 -->
         <modal title="确定删除" btnType="3" 
         v-bind:isShow="isConfirmShow" 
         v-on:cancel="isConfirmShow=false"
         v-on:submit="handleToList"
         sureText="已支付"
         cancelText="未支付"
         >
            <template v-slot:content><p>请确认是否支付完成</p></template>
        </modal>
    </div>
</template>

<script>
import OrderHeader from "../components/OrderHeader.vue"
import QRCode from 'qrcode';
import ScanPayCode from "../components/ScanPayCode.vue"
import Modal from "../components/Modal.vue"
export default {
  components: {OrderHeader, ScanPayCode,Modal },
    name:"order-pay",
    data(){
        return {
            orderId:this.$route.query.orderNo,
            orderDetailList:[],
            addressInfo:"",  //地址信息
            payment:0, //订单总金额
            payImg:"", //二维码图片
            isQRShow:false, //控制二维码模态框是否显示
            isConfirmShow:false, //控制支付确认弹窗是否显示
            T:'' //轮询器
        }
    },
    mounted(){
        this.getOrderDetail();
    },
    methods:{
        getOrderDetail(){
            this.axios.get(`/orders/${this.orderId}`).then(res=>{
                let shippingVo=res.shippingVo;
                this.orderDetailList=res.orderItemVoList;
                this.addressInfo=shippingVo.receiverName+" "+shippingVo.receiverMobile+" "+shippingVo.receiverProvince+" "+shippingVo.receiverCity+" "+shippingVo.receiverDistrict+" "+shippingVo.receiverAddress;
                this.payment=res.payment;
            })
        },
        //点击支付宝跳转
        handleAliPay(){
            window.open(`/#/order/alipay?orderId=${this.orderId}`,'_blank');
            //在新窗口打开支付页面,因为返回的content是html需要页面渲染，在页面挂载时发请求
        },
        //点击微信支付跳转
        handleWechatPay(){
            this.axios.post("/pay",{
                orderId:this.orderId,
                orderName:'Vue小米商城',
                amount:0.01,//单位元
                payType:2, //1支付宝，2微信
            }).then((res)=>{
                //console.log(res)  //res.content是一条链接，借助qrconde将链接生成二维码
                QRCode.toDataURL(res.content)
                .then(url => {
                    console.log("二维码图片",url);
                    this.isQRShow=true;
                    this.payImg=url;
                    //轮询订单支付状态;
                    this.queryOrderStatus();
                })
                .catch(err => {
                    this.$message.error("生成二维码失败，请稍后重试"+err);
                })
            })
        },
        //关闭二维码
        handleClickQR(){
            this.isQRShow=false;
            this.isConfirmShow=true;
            clearInterval(this.T);
        },

        /* 二维码展示后的用户场景
        1、直接关闭二维码——已处理
        2、支付成功，二维码出现后就设置轮询器，轮询器中查询到支付成功，再清除轮询器
        3、支付成功，但接口没有轮循到，主动点击关闭，弹出支付确认弹窗，已支付则直接跳转到订单页，该页面会做一次查询。
        迪纳基未支付，直接关闭二维码
        4、支付失败，抛出错误
        */
       //跳转到订单列表
       handleToList(){
           this.$router.push("/order/list") /* 跳转到订单列表页 */
       },
       //轮询订单支付状态
       queryOrderStatus(){
        this.T=setInterval(()=>{
            this.axios.get(`/orders/${this.orderId}`).then(res=>{
                console.log(res);
                if(res.status==20){
                    clearInterval(this.T);
                    this.handleToList();
                }
            }).catch(()=>{
                this.$message.error("支付失败")
            })
        },1000)
       }
    }
    
}
</script>

<style lang="scss">
.payContainer{
    .wrapper{
        background-color:#F5F5F5;
        padding-top:30px;
        padding-bottom:61px;
        .order{
            padding: 62px 50px;
            background-color: #fff;
            font-size:14px;
            box-sizing: border-box;
            .order-brief{
                display:flex;
                align-items: center;
                color:#333333;
                padding-bottom: 45px;
                border-bottom: 1px solid #D7D7D7;
                .icon-succ{
                    width: 90px;
                    height: 90px;
                    border-radius: 50%;
                    background:url('/imgs/icon-gou.png') #80c58a no-repeat center;
                    background-size:60px;
                    margin-right:40px;
                }
                .order-info{
                    margin-right: 248px;
                    h2{
                        font-size:24px;
                        margin-bottom: 20px;
                    }
                    span{
                        color:#FF6700;
                    }
                }
                .order-total{
                    // &>p:first-child{
                    //     margin-bottom:30px;  
                    // }
                    span{
                        font-size:28px;
                        color:#FF6700;
                    }
                }

            }
            .order-detial{
                padding-top: 47px;
                padding-left: 130px;
                .item{
                    margin-bottom: 20px;
                    .detail-title{
                        margin-left: 26px;
                        float: left;
                    }
                    .detail-info{
                        display: inline-block;
                        img{
                            width: 30px;
                            vertical-align: middle;
                        }
                    }
                    .theme-color{
                        color:#FF6600;
                    }
                }
            }
        }
        .way{
            margin:30px 0;
            padding:0 50px 72px;
            background-color: #fff;
            font-size:14px;
            box-sizing: border-box;
            .tip{
                color:#333333;
                font-size: 20px;
                padding:24px 0;
                border-bottom: 1px solid #D7D7D7;;
            }
            .platform{
                color:#333333;
                font-size: 18px;
                padding:19px 0;
            }
            .pay{
                display:inline-block;
                width:188px;
                height:64px;
                border:1px solid #D7D7D7;
                cursor:pointer;
                &:last-child{
                margin-left:20px;
                }
            }
            .pay-ali{
                background:url('../../public/imgs/pay/icon-ali.png') no-repeat center;
                background-size:103px 38px;
                margin-top:19px;
            }
            .pay-wechat{
                background:url('../../public/imgs/pay/icon-wechat.png') no-repeat center;
                background-size:103px 38px;
            }
        }
    }
}
</style>