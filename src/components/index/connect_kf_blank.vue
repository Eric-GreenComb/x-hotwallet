<template>
  <div class="kf-container container" :style="'min-height: '+minHeight">

    <!--<div class="content">
      <ul>
        <li class="chat-lit disf">
          <div class="header"></div>
          <div class="chat tp">亲，我是机智聪明又可爱的机器人，请问有什么可以帮助您的呢？</div>
        </li>
        <li class="chat-lit disf">
          <div class="header"></div>
          <div class="chat">
            <p class="tp">您可能想要了解</p>
            <ul class="want-ul">
              <li class="want-li bor">
                <span class="disc"></span>
                <span>商品什么时候能发货</span>
              </li>
              <li class="want-li">
                <span class="disc"></span>
                <span>我要改地址</span>
              </li>
              <li class="want-li">
                <span class="disc"></span>
                <span>如何退货</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>


    </div>
    <div class="disf bot">
      <div class="right-xiaoxi left-icon"><i class="icon iconfont icon-zhuanrengong"></i>
        <p class="xiaoxi">转人工</p></div>
      <div class="disf input-box"><input type="text" class="sousuo-input" placeholder="请简短描述您的问题"></div>
      <i class="icon iconfont icon-tianjia"></i>
    </div>-->
    <div class="header-div">
      <img src="../../../static/img/connect/kf.png" class="header" alt="">
      <span>欢迎使用自助查询</span>
    </div>
    <p class="ti">您可能想要了解</p>
    <ul>
      <li v-for="item in list">
        <router-link :to="'/main/kf_question_desc/'+item.id" class="question-li disf">
          <span class="question-span">{{item.title}}</span>
          <i class="icon iconfont icon-youjiantou"></i>
        </router-link>
      </li>

    </ul>
    <div class="bottom-div">
      <i class="icon iconfont icon-big-WeChat"></i>
      <span>如有更多问题，可关注微信服务号</span>
      <span class="red-text">“91TOP”</span>
      <span>咨询</span>
    </div>


  </div>
</template>


<script>
  import {get_faq_list} from '../../api/index'

  export default {
    data() {
      return {
        minHeight: '',
        list: []
      }
    },
    mounted() {
      this.$dialog.loading.close();
      //获取可用屏幕高度
      this.minHeight = localStorage.getItem('minHeight');
      this.getList();

    },
    methods: {
      //获取常见问题列表
      getList() {
        var _this = this;
        this.$dialog.loading.open('');
        get_faq_list().then(function (res) {
          _this.list = res.data.data;
          _this.$dialog.loading.close();
        }).catch(function (err) {
          console.log(err);
        })
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
