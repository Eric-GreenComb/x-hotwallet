<template>
  <div class="container" :style="'min-height:'+minHeight">
    <ul>
      <li>
        <div class="disf">
          <img src="../../../static/img/shop/default_header.png" class="header" alt="">
          <div class="right-div">
            <p class="nick-name">安静的美少女</p>
            <p class="time">03-12 12:28</p>
          </div>
        </div>
        <p class="content">在吗？</p>
      </li>
      <li class="answer">
        <div class="disf">
          <img src="../../../static/img/shop/default_header.png" class="header" alt="">
          <div class="right-div">
            <p class="nick-name">安静的美少女</p>
            <p class="time">03-12 12:28</p>
          </div>
        </div>
        <p class="content">在吗？</p>
      </li>
    </ul>
    <div class="bottom-div">
      <input type="text" v-model="answer" class="input" placeholder="请输入私信内容">
      <i class="icon iconfont icon-fasong"></i>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        minHeight: '',
        answer: ''
      }
    },
    created() {
      this.$dialog.loading.close();
      this.minHeight = localStorage.getItem('minHeight');


    },
    mounted() {


    },
    methods: {}
  }
</script>
<style scoped="true">
  .container {
    background: #eee;
    position: relative;
  }

  li {
    margin: 0.2rem 0.3rem;
    background: #fff;
    border-radius: 2px;
    padding: 0.2rem;
  }

  .answer {
    background-color: #d5e7ff;
  }

  .header {
    width: 0.80rem;
    height: 0.80rem;
    margin-right: 0.28rem;
  }

  .right-div {
    flex: 1;
  }

  .nick-name {
    font-size: 0.30rem;
    font-weight: bold;
    color: #2f2f2f;
  }

  .time {
    font-size: 0.24rem;
    color: #a4a4a4;
    margin-top: 0.18rem;
  }

  .content {
    font-size: 0.26rem;
    color: #2f2f2f;
    margin-top: 0.33rem;
  }

  .bottom-div {
    height: 0.90rem;
    background-color: #ffffff;
    border: solid 1px #e5e5e5;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    padding: 0 0.3rem;
  }

  .input {
    color: #2f2f2f;
    padding: 0.16rem 0.2rem;
    background: #eeeeee;
    font-size: 0.28rem;
    width: 6.1rem;
    margin-right: 0.4rem;
    border-radius: 2px;
  }

  .icon-fasong {
    color: #2f2f2f;
    font-size: 0.42rem;
  }
</style>
