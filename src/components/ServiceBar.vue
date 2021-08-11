<template>
    <div class="service">
        <div class="container">
            <ul>
                <li><span class="icon-setting"></span>预约维修服务</li>
                <li><span class="icon-7day"></span>7天无理由退货</li>
                <li><span class="icon-15day"></span>15天免费换货</li>
                <li><span class="icon-post"></span>满150包邮</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name:"service-bar"
}
</script>

<style lang="scss" scoped>
.service{
    font-size:16px;
    padding:33px;
    color:#666666;
    li{
        display:inline-block;
        width:24.9%;
        text-align:center;   
        border-right: 1px solid #E5E5E5;
        span{
            display: inline-block; 
            vertical-align: middle;   
            height:20px;
            width:20px;
            margin-right: 8px;
        }
        .icon-setting{
            background:url("../../public/imgs/icon-setting.png") no-repeat center;
            background-size:contain;
        }
        .icon-7day{
            background:url("../../public/imgs/icon-7day.png") no-repeat center;
            background-size:contain;
        }
        .icon-15day{
            background:url("../../public/imgs/icon-15day.png") no-repeat center;
            background-size:contain;
        }
        .icon-post{
            background:url("../../public/imgs/icon-post.png") no-repeat center;
            background-size:contain;
        }
    }
}

</style>