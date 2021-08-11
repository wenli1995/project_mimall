<template>
  <div class="login">
      <div class="header">
          <div class="container">
              <div class="wrapper">
                <img src="../../public/imgs/logo-mi.png"/>
                <div>
                    <div class="title">小米商城</div>
                    <div class="desc">让每个人享受科技的快乐</div>
                </div>
              </div>
          </div>
      </div>
      <div class="main">
        <div class="container">
            <div class="login-form">
                <h3>
                    <span class="checked">帐号登录</span>
                    <span>|</span>
                    <span>扫码登录</span>
                </h3>
                <div class='input'><input type="text" placeholder="请输入帐号" v-model="username"/></div>
                <div class='input'><input type="password" placeholder="请输入密码" v-model="password"/></div>
                <div><button class="btn btn-large-main" v-on:click="login">登录</button></div>
            </div>
        </div>
      </div>
      <div class="footer">
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
  </div>
</template>

<script>
export default {
    name:"login",
    data(){
        return{
            username:"",
            password:""
        }
    },
    methods:{
        login(){
            if(!this.username||!this.password){
                alert("用户名或密码不能为空");
                return;
            }
            this.axios.post('/user/login', {
                username: this.username,
                password: this.password
            })
            .then((response)=>{
                console.log(response);
                this.$cookies.set("userId",response.id,"session");  //这里要用箭头函数猜访问到vue实力的$cookie,普通函数this取值是undefined?
                this.$store.dispatch('setUsername',response.username);
                this.getCartCount();
                this.$router.push("/index");
            })
        },
        //获取购物车数量，保存在vuex中
        getCartCount(){
            this.axios.get("/carts/products/sum").then((res)=>{
                this.$store.dispatch("setCartCount",res);
            })
        }
        // register(){
        //     this.axios.post('/user/register',{
        //         username:'cwl',
        //         password:'cwl',
        //         email:'cwl@163.com'
        //     }).then(()=>{
        //         console.log('注册成功');
        //     })
        // }
    }

}
</script>

<style lang="scss">
@import "../assets/scss/button.scss";
.login{
    .header{
        height:114px;
        .wrapper{
            height:114px;
            width:204px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            img{
                display: inline-block;
                width:53px;
                height:53px;
                background:url("../../public/imgs/logo-mi.png") no-repeat center;
                background-size:contain;
            }
            .title{
                font-size:32px;
                font-weight: bold;
                color:#333333;
            }
            .desc{
                font-size:10px;
                color:#666666;
            }
        }

    }
    .main{
        height:576px;
        background:url("../../public/imgs/login-bg.jpg") no-repeat center; 
        .container{
            position:relative;
            .login-form{
                background-color: #ffffff;
                position:absolute;
                top:35px;
                right:0px;
                width:412px;
                height:510px;     
                padding: 0px 31px;;  
                box-sizing: border-box;
                text-align: center;
                h3{
                    height:112px;
                    line-height: 112px;
                    font-size:23px;

                    .checked{
                        color:#FF6600;
                    }
                    span{
                        margin-left: 34px;
                        &:first-child{
                            margin-left: 0px;;
                        }
                    }

                }
                .input{
                    width:348px;
                    height:50px;
                    font-size:14px;
                    margin-bottom: 20px;
                    input{
                        display: inline-block;
                        width:100%;
                        height:100%;
                        border:1px solid #E5E5E5;
                        padding:18px;
                        box-sizing: border-box;
                    }
                }
            }
        }

    }
    .footer{
        box-sizing: border-box;
        padding: 250px 0px 93px;
        height:391px;
        text-align: center;
        font-size:14px;
        a{
            color:#333333
        }
        .footer-link{
            margin-bottom: 14px;
        }
    }
}

</style>