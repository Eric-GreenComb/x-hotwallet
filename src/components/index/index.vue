<template>
  <div class="container" >
    <!--首页->  提示用户登录!-->
    <div id="btn">
      <router-link :to="'/login'">
        <yd-button @click.native="" size="large" type="danger">亲,先要登录哦!</yd-button>
      </router-link>
    </div>
    </div>

</template>

<script>
  import FooterTab from '../common_components/footer_tab.vue'

  export default {
    components: {
      'footer-tab': FooterTab
    }
  }
</script>
<style scoped="true">
</style>
