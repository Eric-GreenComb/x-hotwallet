<template>
  <div class="container">
    <img src="../../../static/img/shop/invite-friend-text.png" class="invite-friend-text" alt="">
    <p class="texac text">成为91top商城VIP</p>
    <img src="../../../static/img/shop/yuan.png" class="yuan" alt="">
    <ul>
      <li class="disf li-text li1">
        <img src="../../../static/img/shop/pig1.png" class="pic" alt="">
        <div class="div">
          <p class="color-text">一次邀请，永久收益</p>
          <p class="tip">您的VIP在云商城购买商品，您都享有相应利润</p>
        </div>
      </li>
      <li class="disf li-text">
        <img src="../../../static/img/shop/bag.png" class="pic" alt="">
        <div class="div">
          <p class="color-text">自主购物，省时省力</p>
          <p class="tip">vip可自主挑选购买商品，跟踪物流、查询售后等</p>
        </div>
      </li>
    </ul>
    <button class="btn" @click="shareShow=true">立即邀请</button>
    <p class="texac note">您已邀请<span class="color-num">{{people_num}}</span>人</p>
    <div class="sell-cover" :style="'height:'+minHeight" @click="shareShow=false" v-if="shareShow">
      <img src="../../../static/img/click-share.png" class="click-share" alt="">
    </div>
  </div>
</template>

<script>
  import config from '../../api/config'
  import {get_invite_user} from '../../api/index'
  export default {
    data() {
      return {
        people_num: 0,
        token: '',
        minHeight: '',
        shareShow: false
      }
    },
    mounted() {
      this.token = window.localStorage.getItem('token');
      this.$dialog.loading.close();
      this.minHeight = localStorage.getItem('minHeight');
      this.getDate();
      var UrlAttr = (decodeURIComponent(location.href)).split('#');
      var param = '/main/invite_friend_get?invite_code=' + localStorage.getItem('invite_code');
      var link = config.redirect_url + "?host=" + encodeURIComponent(UrlAttr[0]) + "&param=" + encodeURIComponent(param);
      this.wxutils.wxShare('你有一个10元奖励未领取', '您的好友送你10元奖励，快来领取吧', link, '');
    },
    methods: {
      getDate(){
        var _this = this;
        get_invite_user({token:this.token}).then(function (res) {
          _this.people_num=res.data.data.count;

        }).catch(function (err) {
          console.log(err);
        })
      }
    }
  }
</script>
<style scoped="true">
  .container {
    font-size: 0;
  }

  .invite-friend-text {
    width: 4.75rem;
    margin: 0.74rem auto 0.3rem auto;
  }

  .text {
    font-size: 0.30rem;
    color: #22202b;
    margin-bottom: 0.45rem;
  }

  .yuan {
    width: 5.16rem;
    margin-left: 1.07rem;
  }

  .li-text {
    padding-left: 0.95rem;
  }

  .pic {
    width: 0.70rem;
    height: 0.70rem;
    margin-right: 0.25rem;
  }

  .color-text {
    font-size: 0.34rem;
    color: #b88049;
  }

  .color-num {
    color: #b88049;

  }

  .tip {
    font-size: 0.22rem;
    color: #2f2f2f;
    margin-top: 0.17rem;
  }

  .li1 {
    margin-bottom: 0.6rem;
  }

  .btn {
    width: 6.91rem;
    height: 0.80rem;
    line-height: 0.80rem;
    text-align: center;
    background-image: linear-gradient(90deg,
    #b77e48 0%,
    #e6b870 100%),
    linear-gradient(
      #b81f23,
      #b81f23);
    background-blend-mode: normal,
    normal;
    border-radius: 4px;
    font-size: 0.30rem;
    color: #ffffff;
    border: 0;
    margin: 1.28rem auto 0.27rem auto;
    display: block;
  }

  .note {
    font-size: 0.26rem;
    color: #000000;
  }
  .div{
    padding-top: 0.17rem;
  }
</style>
