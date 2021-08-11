<!--router-view
router-view 将显示与 url 对应的组件。你可以把它放在任何地方，以适应你的布局。-->
<template>
  <div>
    <nav-header></nav-header>
    <router-view></router-view>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavFooter from "../components/NavFooter.vue";
import NavHeader from "../components/NavHeader.vue"
export default {
  components: { 
    NavHeader, 
    NavFooter 
  },
  name:"home"
}
</script>

<style>

</style>