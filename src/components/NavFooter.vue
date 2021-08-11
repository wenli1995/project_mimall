<template>
    <div class="footer">
        <div class="footer-logo">
            <img src='../../public/imgs/logo-footer.png'/>
            <div>小米商城</div>
        </div>
        <div class="footer-link">
             <a href="javascript:">小米天猫店</a><span> | </span> 
             <a href="javascript:">小米集团隐私政策</a><span> | </span> 
             <a href="javascript:">小米公司儿童信息保护规则</a><span> | </span> 
             <a href="javascript:">小米商城隐私政策</a><span> | </span> 
             <a href="javascript:">小米商城用户协议</a>
        </div>
        <div class="footer-copyright">
            Copyright ©2021 <span class="site">mi.futurefe.com</span> All Rights Reserved.
        </div>
    </div>
</template>

<script>
export default {
    name:"nav-footer"
}
</script>

<style lang="scss" scoped>
.footer{
    background-color: #333333;
    height:234px;
    font-size:16px;
    color:#999999;
    text-align:center;
    border-top:4px solid #FF6600;  //为什么不增加这个footer-logo外边距不起作用的
    .footer-logo{
        margin-top:46px;
        margin-bottom:31px;
        img{
            width:53px;
            height:36px;
            margin-bottom:13px;
        }

    }
    .footer-link{
        margin-bottom:13px;
        a{
            color:#999999;
        }
    }
    .footer-copyright{
        .site{
            color:#FF6600
        }
    }
}
</style>