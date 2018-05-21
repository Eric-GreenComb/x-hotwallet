<template>
  <div class="container">
    <img src="../../../static/img/material.jpg" class="material" alt="">
  </div>
</template>

<script>
  export default {
    created() {
      this.$dialog.loading.close();
    }
  }
</script>
<style scoped="true">
  .material {
    width: 100%;
  }
</style>
