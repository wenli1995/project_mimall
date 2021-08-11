<!--对话框：支持自定义标题、内容、按钮
并由父组件传递自定义书数值
-->
<template>
<transition>
  <div class="modal" v-if="isShow">
      <div class="modal-mask">
      </div>
      <div class="modal-dialog">
          <div class="modal-title">
              <span>{{title}}</span>
              <a href="javascript:;" class="icon-close" v-on:click="$emit('cancel')"></a>
          </div>
          <div class="modal-content">
              <slot name="content">{{content}}</slot>
          </div>
          <div class="modal-footer">
              <button v-if="btnType=='1'" class="btn btn-small-main" v-on:click="$emit('submit')">{{sureText}}</button>
              <button v-if="btnType=='2'" class="btn btn-small-default" v-on:click="$emit('cancel')">{{cancelText}}</button>
              <div class="btn-group" v-if="btnType=='3'">
                    <button  class="btn btn-small-main" v-on:click="$emit('submit')">{{sureText}}</button>
                    <button class="btn btn-small-default" v-on:click="$emit('cancel')">{{cancelText}}</button>                  
              </div>
          </div>
      </div>
  </div>
</transition>
</template>

<script>
export default {
    name:"model",
    emits:["cancel","submit"], //弹窗关闭需要子-父通信，父及showModal属性置为false
    props:{
        //模态框标题
        title:{
            type:String,
            default:"标题"
        },
        //模态框按钮类型：1确定、2取消、3确定取消按钮组
        btnType:String,
        sureText:{
            type:String,
            default:"确认"
        },
        cancelText:{
            type:String,
            default:"取消"
        },
        isShow:Boolean   //控制模态框是否显示

    }
}
</script>

<style lang="scss">
@import "../assets/scss/modal.scss";
@import "../assets/scss/button.scss";
</style>