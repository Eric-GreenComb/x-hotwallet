<template>
  <div class="container my-bussiness-container bg-container" :style="'min-height:'+minHeight">
    <ul>
      <li>
        <router-link to="/main/sell_list" class="row disf">
          <div class="disf left-div">
            <i class="icon iconfont icon-xiaoshoujilu"></i>
            <span class="text">销售记录</span>
          </div>
          <i class="icon iconfont icon-youjiantou"></i>
        </router-link>
      </li>
      <li>
        <router-link to="/main/client_account" class="row disf">
          <div class="disf left-div">
            <i class="icon iconfont icon-kehuzongshouru"></i>
            <span class="text">收支明细</span>
          </div>
          <i class="icon iconfont icon-youjiantou"></i>
        </router-link>
      </li>
    </ul>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        minHeight: ''
      }
    },
    mounted() {
      this.$dialog.loading.close();
      this.minHeight = localStorage.getItem('minHeight');
    },
    methods: {}

  }
</script>
<style scoped="true">
  .my-bussiness-container {
    background: #eee;
  }

  .row {
    padding: 0.29rem;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #eee;
    font-size: 0.28rem;
    color: #2f2f2f;
  }

  .text {
    margin-left: 0.28rem;
  }

  .icon-xiaoshoujilu {
    font-size: 0.36rem;
  }

  .icon-kehuzongshouru {
    color: #2f2f2f;
    font-size: 0.4rem;
  }

  .left-div {
    align-items: center;
  }

  .icon-youjiantou {
    color: #898989;
    font-size: 0.24rem;
  }

</style>
