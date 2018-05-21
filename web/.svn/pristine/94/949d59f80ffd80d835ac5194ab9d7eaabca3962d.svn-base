<template>
  <div class="container">
    <transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>

  <!--  <footer-tab></footer-tab>-->
  </div>

</template>

<script>
  import FooterTab from './common_components/footer_tab.vue'

  export default {
    data(){
      return{
        tabIndex:0
      }
    },
    mounted() {
      this.$dialog.loading.close();
    },
    components: {
      'footer-tab': FooterTab
    },

  }
</script>
<style scoped>
</style>
