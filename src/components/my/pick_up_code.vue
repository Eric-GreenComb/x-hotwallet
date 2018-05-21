<template>
  <div class="container order-desc-container" :style="'min-height: '+minHeight">


  </div>
</template>

<script>
  export default {
    data() {
      return {
        minHeight: ''
      }
    },
    created() {
      this.$dialog.loading.close();

    },
    mounted() {
      //获取可用屏幕高度
      this.minHeight = this.$parent._data.minHeight;
    }
  }
</script>
<style scoped="true">
  .order-desc-container {
    background: #cad6df;
  }

  .order-desc1 {
    width: 80%;
    margin: 30% auto 0 auto;
  }

</style>
