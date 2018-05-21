<template>
  <div class="container bg-container" :style="'min-height: '+minHeight">
    <ul class="bgf ul">
      <li class="li disf" @click="chooseType('wei')">
        <div>
          <img src="../../../static/img/order/wx-pay.png" class="icon-logo" alt="">
          <span class="type">微信支付</span>
        </div>
        <i class="icon iconfont icon-iconfontxuanzhong" v-if="pay_type=='wei'"></i>
        <i class="icon iconfont icon-weixuanzhong-01" v-else></i>
      </li>
      <li class="li disf" @click="chooseType('other')">
        <div>
          <img src="../../../static/img/order/account-pay.png" class="icon-logo" alt="">
          <span class="type">账户余额</span>
        </div>
        <i class="icon iconfont icon-iconfontxuanzhong" v-if="pay_type=='other'"></i>
        <i class="icon iconfont icon-weixuanzhong-01" v-else></i>
      </li>
    </ul>
  </div>
</template>

<script>
  import {creat_orders} from '../../api/index'
  export default {
    data() {
      return {
        minHeight: '',
        pay_type: 'wei',
      }
    },
    created() {
      this.$dialog.loading.close();
      this.pay_type=this.$route.params.type;
    },
    mounted() {
      //获取可用屏幕高度
      this.minHeight = localStorage.getItem('minHeight');
    },
    methods:{
      chooseType(type){
        var _this=this;
        this.pay_type=type;
        sessionStorage.setItem('pay_type',type);
        setTimeout(function () {
          _this.$router.push(_this.$route.query.back);
        },100);
      }
    }
  }
</script>
<style scoped="true">
  .bgf {
    background: #fff;
  }

/*
  .ul {
    padding-bottom: 0.3rem;
    padding-top: 0.1rem;
  }
*/

  .row {
    padding: 0.4rem;
  }

  .price-p {
    font-size: 0.28rem;
    color: #2f2f2f;
    padding: 0.35rem 0.3rem;
    justify-content: space-between;
    border-bottom: 0.14rem solid #eee;
  }

  .price {
    color: #b81f23;
  }

  .li {
    padding: 0.29rem;
    font-size: 0.28rem;
    color: #2f2f2f;
    justify-content: space-between;
  }
  .li:first-child{
    border-bottom: 1px solid #eee;
  }

  .li1 {
    margin-top: 0.59rem;
  }

  .ti {
    font-size: 0.26rem;
    color: #898989;
    border-bottom: 1px solid #eee;
    margin-left: 0.3rem;
    padding: 0.3rem 0;
  }

  .type {
    margin-left: 0.26rem;
  }

  .icon-logo {
    width: 0.4rem;
    display: inline-block;
    vertical-align: middle;
  }

  .icon-iconfontxuanzhong, .icon-weixuanzhong-01 {
    font-size: 0.36rem;
  }

  .btn {
    width: 6.90rem;
    height: 0.80rem;
    line-height: 0.80rem;
    text-align: center;
    background-color: #b81f23;
    border-radius: 2px;
    font-size: 0.30rem;
    color: #ffffff;
    display: block;
    margin: 1.38rem auto 0 auto;
    border: 0;
  }
</style>
