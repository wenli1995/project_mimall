<template>
    <div class="order-header">
        <div class="container">
            <div class="header-logo">
                <a href="/#/index"></a>
            </div>
            <div class="info">
                <div class="title">{{title}}</div>
                <slot name="desc"></slot>
            </div>
            <div class="uname">{{username}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name:"order-header",
    props:{
        title:{
            type:String
        }
    },
    computed:{
        username(){
            return this.$store.state.username;
    }
    }
}
</script>

<style lang="scss">
.order-header{
    .container{
        height: 112px;
        background-color: #FFFFFF;
        color:#333333;
        font-size:16px;
        display:flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid #FF6600;
        .header-logo{
            a{
                display: inline-block;
                width:53px;
                height:53px;
                background:url("../../public/imgs/logo-mi.png") no-repeat center;
                background-size:contain;
            }
        }
        .info{
            flex:1;
            display:flex;
            padding-left: 54px;
            align-items:flex-end;
            font-size: 14px;
            color:#999999;
            .title{
                font-size:28px;
                font-weight: bold;
                color:#333333;
                margin-right: 17px;
            }

        }
        .uname{
            font-size: 16px;
            color:#666666;
        }
    }

}
</style>