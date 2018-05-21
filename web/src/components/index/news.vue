<template>
  <div class="container bg-container" :style="'min-height:'+minHeight">
<!--    <ul class="news-ul">
      <li class="row">
        <div class="top-p disf">
          <div class="icon-div">
            <p class="icon-span"><i class="icon iconfont icon-xitongxiaoxi"></i><span class="dot"></span></p>
          </div>
          <div class="text">
            <p class="ti">系统消息</p>
            <p class="text1">VIP大牌日</p>
          </div>
          <span class="time">03-12 12:28</span>
        </div>
      </li>
      <li class="row">
        <div class="top-p disf">
          <div class="icon-div">
            <p class="icon-span"><i class="icon iconfont icon-sixin"></i><span class="dot"></span></p>
          </div>
          <div class="text">
            <p class="ti">私信消息</p>
            <p class="text1">点击查看</p>
          </div>
          <span class="time">03-12 12:28</span>
        </div>
      </li>
    </ul>-->
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
      //console.log(this.$parent._data.minHeight);
    }
  }
</script>
<style scoped="true">
  .newslist {
    width: 100%;
  }

  .icon-div {
    width: 0.70rem;
  }

  .icon-span {
    /*margin-right: 0.35rem;*/
    color: #898989;
    position: relative;
    display: inline-block;
  }
  .row:first-child{
    border-bottom:1px solid #eee;
  }

  .row {
    padding: 0.29rem 0.37rem;
    background: #fff;
  }

  .top-p {
    align-items: flex-start;
  }

  .text {
    flex: 1;
    font-size: 0.30rem;
    color: #2f2f2f;
    line-height: 0.24rem;
  }

  .time {
    font-size: 0.24rem;
    color: #a4a4a4;
  }

  .text1 {
    font-size: 0.26rem;
    color: #2f2f2f;
    margin-top: 0.2rem;
  }

  .icon-xitongxiaoxi, .icon-sixin {
    font-size: 0.38rem;
  }

  .ti {
    font-weight: bold;
  }

  .ti, .time {
    padding-top: 0.08rem;
  }

  .dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #b81f23;
    position: absolute;
    top: 2px;
    right: -1px;
  }
</style>
