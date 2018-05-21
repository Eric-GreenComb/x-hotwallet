<template>
  <div class="kf-container" :style="'min-height: '+minHeight">
    <!--   <yd-navbar title="联系客服" :fixed="true" fontsize="0.36rem" color="#2f2f2f" height="1rem">
         <router-link to="/classify" slot="left">
           <yd-navbar-back-icon color="#2f2f2f"></yd-navbar-back-icon>
         </router-link>
       </yd-navbar>-->
    <div class="content">
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
      <div class="right-xiaoxi left-icon"><i class="icon iconfont icon-xiaoxi"></i>
        <p class="xiaoxi">转人工</p></div>
      <div class="disf input-box"><input type="text" class="sousuo-input" placeholder="请简短描述您的问题"></div>
      <div class="right-xiaoxi"><i class="icon iconfont icon-xiaoxi"></i>
        <p class="xiaoxi">消息</p></div>
    </div>
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
      //获取可用屏幕高度
      this.$dialog.loading.close();
      this.minHeight = this.$parent._data.minHeight;
    }
  }
</script>
<style scoped="true">
  @import "../../static/css/kf/kf.css";
</style>
