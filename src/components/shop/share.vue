<template>
  <div class="container coupons-container" :style="'min-height:'+minHeight">

    <ul class="ul">
      <li class="coupons-li">
        <input type="checkbox" name="coupons" value="1" id="checkbox1" v-model="checked" class="disn">
        <label for="checkbox1">
          <p class="title-p disf"><i class="icon iconfont  icon-weixuanzhong-01"></i><span class="coupon-title">白色情人节甜蜜价到</span></p>
          <div class="coupon-div">
            <img src="" class="pic" alt="">
          </div>
        </label>
      </li>

    </ul>
    <button class="send-btn">发送</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        minHeight: '',
        checked: []
      }
    },
    mounted() {
      this.minHeight = localStorage.getItem('minHeight');

    },
    methods: {}

  }
</script>
<style scoped="true">
  .ul{
    padding-top:0.05rem;
    background: #fff;
  }
  .coupons-container {
    background-color: #eeeeee;
    position: relative;
    font-size: 0;
  }
  .coupon-title{

    font-size: 0.28rem;
    color: #2f2f2f;
  }
  .send-btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    height: 0.90rem;
    line-height: 0.90rem;
    background-color: #b81f23;
    color: #fff;
    text-align: center;
    border: 0;
    font-size: 0.30rem;
  }

  .disn {
    display: none;
  }

  .coupons-li {
   /* padding: 0.3rem 0;*/
    padding:0.29rem 0.2rem 0.39rem 0.2rem;
    background: #fff;
    border-bottom: 0.14rem solid #eee;
  }
  .pic{
    width: 6.90rem;
    height: 2.30rem;
    margin: auto;
  }


  .coupon-div {
    width: 100%;
    position: relative;
    margin-top: 0.24rem;
  }

  .icon-weixuanzhong-01{
    font-size:0.38rem;
    margin-right: 0.21rem;

  }
  .title-p{
    padding-left:0.1rem;
    align-items: center;
  }
</style>
