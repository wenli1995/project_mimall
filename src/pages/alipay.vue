<template>
  <div class="form" v-html="content"></div>
</template>

<script>
export default {
    data(){
        return{
            orderId:this.$route.query.orderId,
            content:""
        }
    },
    mounted(){
        this.paySubmit()
    },
    methods:{
        paySubmit(){
            this.axios.post("/pay",{
                orderId:this.orderId,
                orderName:'Vue小米商城',
                amount:0.01,//单位元
                payType:1, //1支付宝，2微信
            }).then((res)=>{
                //console.log(res)  //res.content是html内容
                this.content=res.content;
                setTimeout(()=>{
                    document.forms[0].submit();
                },100)
            })
        }
    }
}
</script>

<style>

</style>