<template>
  <div class="container coupons-container" :style="'min-height:'+minHeight">

    <ul>
      <li class="coupons-li">
        <input type="checkbox" name="coupons" value="1" id="checkbox1" v-model="checked" class="disn">
        <label for="checkbox1">
          <p class="title-p disf"><i class="icon iconfont  icon-weixuanzhong-01"></i><span class="coupon-title">满减券 99-20</span></p>
        <div class="coupon-div">
          <img src="../../../static/img/shop/coupon-userful.png" class="coupons" alt="">
          <div class="red-block-text">
            <p class="value"><span class="sign">￥</span>20</p>
            <p class="condition">满99可用</p>
          </div>
          <div class="white-block-text">
            <p class="tit">满减券</p>
            <p class="condition1">仅限美妆频道使用</p>
            <p class="time">有效期：2017.08.01-2017.09.01</p>
          </div>
        </div>
        </label>
      </li>
      <li class="coupons-li">
        <input type="checkbox" name="coupons" value="1" id="checkbox1" v-model="checked" class="disn">
        <label for="checkbox1">
          <p class="title-p disf"><i class="icon iconfont  icon-weixuanzhong-01"></i><span class="coupon-title">满减券 99-20</span></p>
          <div class="coupon-div">
            <img src="../../../static/img/shop/coupon-userful.png" class="coupons" alt="">
            <div class="red-block-text">
              <p class="value"><span class="sign">￥</span>20</p>
              <p class="condition">满99可用</p>
            </div>
            <div class="white-block-text">
              <p class="tit">满减券</p>
              <p class="condition1">仅限美妆频道使用</p>
              <p class="time">有效期：2017.08.01-2017.09.01</p>
            </div>
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
  .coupons-container {
    background-color: #eeeeee;
    position: relative;
    font-size: 0;
    padding-top:0.08rem;
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
    padding: 0.3rem 0;
    margin:0 0.2rem;
  }

  .coupons {
    width: 100%;
  }

  .coupon-div {
    width: 100%;
    position: relative;
    margin-top: 0.24rem;
  }

  .red-block-text {
    position: absolute;
    left: 0.49rem;
    top: 0.4rem;
  }

  .value {
    font-size: 0.70rem;
    color: #ffffff;
    margin-bottom: 0.09rem;
  }

  .sign {
    font-size: 0.30rem;
    color: #ffffff;
  }

  .condition {
    font-size: 0.20rem;
    color: #ffffff;
    padding-left: 0.15rem;
  }

  .white-block-text {
    height: 100%;
    position: absolute;
    left: 2.57rem;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 0.26rem;
    padding-bottom: 0.23rem;
  }

  .tit {
    font-size: 0.28rem;
    color: #2f2f2f;
  }

  .condition1 {
    font-size: 0.22rem;
    color: #898989;
  }

  .time {
    font-size: 0.22rem;
    color: #898989;
  }
  .icon-weixuanzhong-01{
    font-size:0.38rem;
    margin-right: 0.21rem;

  }
  .title-p{
    align-items: center;
  }
</style>
