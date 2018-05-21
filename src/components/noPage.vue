<template>
  <div class="no-shop-box">
    <img src="../../../static/img/shop/noPage.png" alt="" class="no-shop">
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fromPath: ''
      }
    },
    created() {
      var _this = this;
      /*this.fromPath = window.localStorage.getItem('fromPath')
      setTimeout(function () {
        _this.$router.push({path: _this.fromPath})
      }, 1000)*/
    }
  }
</script>


<style scoped>
  .no-shop-box {
    background: #fff;
    padding-top: 50%;
  }

  .no-shop {
    width: 100%;
  }
</style>
