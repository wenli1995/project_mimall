<template>
    <div class="orderContainer">
        <order-header title="订单列表">
            <template v-slot:desc>
                <div>谨防钓鱼链接和诈骗电话，避免上当受骗</div>
            </template>
        </order-header>
        <div class="wrapper">
            <div class="container">
                <loading v-if="loading"></loading>
                <div v-else class="order-list">
                    <div class="order-item"  v-for="item in orderList" :key="item.orderNo">
                        <div class="order-title">
                            <div class="item-info">
                                {{item.createTime}}<span>|</span>
                                {{item.receiverName}}<span>|</span>
                                订单号：{{item.orderNo}}<span>|</span>
                                {{item.paymentTypeDesc}}
                            </div>
                            <div class="item-total">
                                <span>应付金额：</span>
                                <span class="money">{{item.payment}}元</span>
                            </div>
                        </div>
                        <div class="order-content">
                            <div class="goods-list">
                                <div class="goods-item" v-for="goods in item.orderItemVoList" :key="goods.productId">
                                    <img :src="goods.productImage" alt="">
                                    <div class="goods-info">
                                        <div class="name">{{goods.productName}}</div>
                                        <div class="money">{{goods.currentUnitPrice}}x{{goods.quantity}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="order-status">
                                <a  v-if="item.status == 20" href="javascript:;">{{item.statusDesc}}</a>
                                <a v-else href="javascript:;" @click="handleToPay(item.orderNo)">{{item.statusDesc}}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <no-data v-if="!loading && orderList.length==0"></no-data>
            </div>
            <el-pagination
            class="pagination"
            background
            layout="prev, pager, next"
            :total="total"
            :pageSize="pageSize"
            @current-change="handlePageChange"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import OrderHeader from "../components/OrderHeader.vue"
import Loading from "../components/Loading.vue"
import NoData from "../components/NoData.vue"
import { ElPagination,}  from 'element-plus'
export default {
    name:"order-list",
    components:{
        Loading,
        OrderHeader,
        NoData,
        ElPagination,
    },
    data(){
        return{
            orderList:[],
            loading:true,
            total:0,  //条目总数
            pageSize:2,//每页条数
            pageNum:1,
        }
    },
    mounted(){
        this.getOrderList();
    },
    methods:{
        getOrderList(){
            this.axios.get(`/orders`,{
                params:{
                    pageSize:2,
                    pageNum:this.pageNum
                }
          }).then(res=>{
              console.log("订单列表",res)
                this.orderList=res.list;
                this.total=res.total;
                this.pageSize=2;
                this.loading=false;
            })
        },
        handleToPay(orderNo){
            this.$router.push(`/order/pay?orderNo=${orderNo}`)
        },
        //监听分页页数变化
        handlePageChange(pageNum){
            console.log(pageNum)
            this.pageNum = pageNum;
            this.getOrderList();
        }    
    }
}
</script>

<style lang="scss">
.orderContainer{
    .wrapper{
        background-color: #F5F5F5;
        padding:31px 0;
        .order-list{
            width:100%;
            .order-item{
                border:1px solid #D7D7D7;
                background-color: #FFFFFF;
                box-sizing: border-box;
                margin-bottom: 31px;
                padding-bottom: 31px;
                .order-title{
                    padding:0 43px;
                    height: 74px;
                    line-height: 74px;
                    background-color: #FFFAF7;
                    font-size: 16px;
                    color:#666666;
                    &::after{
                        content: "";
                        display: table;
                        clear: both;
                    }
                    .item-info{
                        float: left;
                    }
                    .item-total{
                        float: right;
                        .money{
                            font-size: 26px;
                        }
                    }
                }
                .order-content{
                    padding:0 43px;
                    &::after{
                        content: "";
                        display: table;
                        clear: both;
                    }
                    .goods-list{
                        float: left;
                        width:80%;
                        color:#333333;
                        .goods-item{
                            display: flex;
                            align-items: center;
                            margin-bottom: 31px;
                            img{
                                width:69px;
                                height:89px;
                                margin-right: 44px;
                            }
                            .goods-info{
                                font-size:20px;
                                .name{
                                    margin-bottom: 15px;
                                }
                            }
                        }
                    }
                    .order-status{
                        width:20%;
                        text-align: right;
                        float: right;
                        height: 89px;
                        line-height: 89px;
                        a{
                            text-decoration: none;
                            color:#FF6600;
                            font-size: 20px;
                        }
                    }
                }

            }

        }
        .pagination{
            text-align: right !important;
            &.is-background .el-pager li:not(.disabled).active {
                background-color:#FF6600
            }
        }
    }
}
</style>