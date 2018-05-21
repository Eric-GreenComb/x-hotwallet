<template>
  <div class="container" :style="'height:'+minHeight">
    <div class="shop_gifBox" :style="'height:'+minHeight">
      <img src="../../../static/img/shop/shop_giftbak.jpg" class="shop_giftbak" alt="" :style="'height:'+minHeight">
      <router-link :to="'/main/shop_giftContent?id='+giftId">
        <div class="shop_giftp1">
          <img :src="src" alt="">
        </div>
      </router-link>
      <button class="btn" @click="showShare()">分享开店大礼包</button>
      <div class="sell-cover" :style="'height:'+minHeight" @click="shareShow=false" v-if="shareShow">
        <img src="../../../static/img/click-share.png" class="click-share" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import config from '../../api/config'
  import {get_giftbag_list} from '../../api/index'

  export default {
    data() {
      return {
        shareShow: false,
        minHeight: '',
        src: '',
        giftId: '',
        shop_owner:'',
        share_time:''
      }
    },
    created() {
      this.$dialog.loading.close();
      this.minHeight = localStorage.getItem('minHeight');
      if (this.$route.query.shop_owner) {
        this.shop_owner = this.$route.query.shop_owner;
        this.share_time=this.$route.query.t;
      } else {
        this.shop_owner = localStorage.getItem('invite_code');
        this.share_time=new Date().Format('yyyy-MM-dd hh:mm');
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        var _this = this;
        get_giftbag_list().then(function (res) {
          _this.src = res.data.data[0].pic;
          _this.giftId = res.data.data[0].id;
          /*分享start*/
          var UrlAttr = (decodeURIComponent(location.href)).split('#');
          //从这里分享出去的肯定是自己的店铺，所有货主和邀请人都是自己的邀请码
          var param = '/main/shop_giftContent?id=' + _this.giftId + '&shop_owner=' + _this.shop_owner + '&t=' + _this.share_time;
          var link = config.redirect_url + "?host=" + encodeURIComponent(UrlAttr[0]) + "&param=" + encodeURIComponent(param);
          _this.wxutils.wxShare('91云店店主邀请你抢购超值开店礼包', '还等什么快来抢购吧~', link, _this.src);
          _this.$dialog.loading.close();
          /*end*/
        }).catch(function (err) {
          console.log(err);
        })
      },
      //显示分享
      showShare() {
        this.shareConfig();
        this.shareShow = true;
      },
      shareConfig(){
        var _this=this;
        if (this.$route.query.shop_owner) {
          this.shop_owner = this.$route.query.shop_owner;
          this.share_time=this.$route.query.t;
        } else {
          this.shop_owner = localStorage.getItem('invite_code');
          this.share_time=new Date().Format('yyyy-MM-dd hh:mm');
        }
        /*分享start*/
        var UrlAttr = (decodeURIComponent(location.href)).split('#');
        //从这里分享出去的肯定是自己的店铺，所有货主和邀请人都是自己的邀请码
        var param = '/main/shop_giftContent?id=' + _this.giftId + '&shop_owner=' + _this.shop_owner + '&t=' + _this.share_time;
        var link = config.redirect_url + "?host=" + encodeURIComponent(UrlAttr[0]) + "&param=" + encodeURIComponent(param);
        _this.wxutils.wxShare('91云店店主邀请你抢购超值开店礼包', '还等什么快来抢购吧~', link, _this.src);
        _this.$dialog.loading.close();
        /*end*/
      },
    }
  }
</script>


<style scoped="true">
  .shop_gifBox {
    position: relative;
    width: 100%;
  }

  .shop_giftbak {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    margin: 0;
  }

  .shop_giftp1 {
    position: absolute;
    top: 56%;
    left: 0.65rem;
    width: 6.20rem;
    height: 3.5rem;
  }

  .shop_giftp1 img {
    width: 100%;
  }

  .btn {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0.90rem;
    line-height: 0.90rem;
    text-align: center;
    background: #D24533;
    border-radius: 0px;
    font-size: 0.30rem;
    color: #ffffff;
    border: 0;
    display: block;
  }

</style>
