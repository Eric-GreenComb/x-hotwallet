<template>
  <div class="kf-container container" :style="'min-height: '+minHeight">
    <div class="kf-box1">
      <p class="kf-title">自助工具</p>
      <ul class="kf-ul1">

        <li @click="enter('a')">
          <i class="iconfont icon-shouhou"></i>
          <span>我的售后</span>
        </li>

        <li @click="enter('b')">
          <i class="iconfont icon-tixian"></i>
          <span>我要提现</span>
        </li>

        <li @click="enter('c')">
          <i class="iconfont icon-huanbangshouji"></i>
          <span>换绑手机</span>
        </li>

        <li @click="enter('d')">
          <i class="iconfont icon-dizhiguanli"></i>
          <span>地址管理</span>
        </li>
      </ul>
    </div>
    <div class="kf-box2">
      <p class="kf-title" style="color: #898989;">常见问题</p>
      <ul class="kf-ul2">
        <li v-if="is_vip == 1">  <!--普通会员不可见-->
          <router-link to="../main/connect_list/shop" >
            <img src="../../../static/img/connect/kf-bd.png" alt="">
            <span>店长宝典</span>
          </router-link>
        </li>
        <li>
          <router-link to="../main/connect_list/sales_sv" >
            <img src="../../../static/img/connect/kf-sh.png" alt="">
            <span>售后问题</span>
          </router-link>
        </li>
        <li>
          <router-link to="../main/my_order/4" >
            <img src="../../../static/img/connect/kf-wl.png" alt="">
            <span>物流查询</span>
          </router-link>
        </li>
        <li>
          <router-link to="../main/activity_list" >
            <img src="../../../static/img/connect/kf-activity.png" alt="">
            <span>活动资讯</span>
          </router-link>
        </li>
        <li>
          <router-link to="../main/connect_list/order" >
            <img src="../../../static/img/connect/kf-order.png" alt="">
            <span>订单科普</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="bottom-div">
      <i class="icon iconfont icon-big-WeChat"></i>
      <div>
        <p style="margin-bottom: 3px;">如有更多问题，可关注微信服务号<span class="red-text">91TOP俱乐部</span></p>
        <p>或致电<span class="red-text"><a href="tel:4001616360">4001616360</a></span>咨询</p>
      </div>
    </div>
  </div>
</template>


<script>
  import {get_faq_list} from '../../api/index'

  export default {
    data() {
      return {
        token: '',
        is_vip: 0,
        minHeight: '',
        list: []
      }
    },
    mounted() {
      this.$dialog.loading.close();
      this.is_vip = window.localStorage.getItem('isVip');
      this.$dialog.loading.close();
      //获取可用屏幕高度
      this.minHeight = localStorage.getItem('minHeight');
    },
    created(){
      this.token = window.localStorage.getItem('token');
    },
    methods: {
      enter(type){

        var  _this = this;

        if(!this.token || this.token == '') {
          _this.$dialog.loading.open();
          setTimeout(function () {
            _this.$router.push({
              path: '/unlogin'
            })
          }, 2000)
          window.sessionStorage.setItem('redirect', '/unlogin')
          return;
        }

        if(type =='a'){
          this.$router.push('/main/refund_and_aftersales/return')
        }

        if(type =='b'){
          this.$router.push('/main/withdraw')
        }

        if(type == 'c'){
          console.log('this.token',this.token)
          this.$router.push('/reset_tel')
        }

        if(type =='d'){
          this.$router.push('/main/address_manage')
        }
      }
    }
  }
</script>
<style scoped="true">
  @import "../../../static/css/kf/kf.css";

  .container {
    position: relative;
  }

  .header-div {
    padding: 0.24rem 0.29rem;
    background: #fff;
    font-size: 0.30rem;
    color: #2f2f2f;
  }

  .header {
    width: 0.80rem;
    height: 0.80rem;
    vertical-align: middle;
    display: inline-block;
    margin-right: 0.35rem;
  }

  .ti {
    padding: 0.28rem 0.29rem;
    font-size: 0.26rem;
    color: #898989;
  }

  ul {
    padding: 0 0.29rem;
    background: #fff;
  }

  .question-li {
    padding: 0.34rem 0;
    justify-content: space-between;
    align-items: center;
    font-size: 0.28rem;
    color: #2f2f2f;
    border-bottom: 1px solid #eee;
  }

  .icon-youjiantou {
    color: #898989;
    font-size: 0.24rem;
  }

  .bottom-div {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    padding: 0.26rem 0.34rem;
    font-size: 0.26rem;
    color: #2f2f2f;
    display: flex;
    align-items: center;
  }

  .red-text {
    color: #b81f23;
  }

  .icon-big-WeChat {
    color: #13b007;
    font-size: 0.5rem;
    margin-right: 0.18rem;
  }
</style>
