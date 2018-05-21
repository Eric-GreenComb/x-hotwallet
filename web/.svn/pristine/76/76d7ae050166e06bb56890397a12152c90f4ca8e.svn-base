<template>
  <div class="container" :style="'min-height:'+minHeight">
    <ul class="bgf">
      <li class="disf">
        <img src="../../../static/img/shop/default_header.png" class="header" alt="">
        <div class="right-div">
          <p class="disf top-p">
            <span class="nick-name">安静的美少女</span>
            <span class="time">03-12 12:28</span>
          </p>
          <p class="content">在吗？</p>
        </div>
      </li>
      <li class="disf">
        <img src="../../../static/img/shop/default_header.png" class="header" alt="">
        <div class="right-div">
          <p class="disf top-p">
            <span class="nick-name">安静的美少女</span>
            <span class="time">03-12 12:28</span>
          </p>
          <p class="content">在吗？</p>
        </div>
      </li>

    </ul>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        minHeight: '',
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
  }

  li {
    padding: 0.3rem;
  }

  .header {
    width: 0.80rem;
    height: 0.80rem;
    margin-right: 0.28rem;
  }

  .right-div {
    flex: 1;
  }

  .top-p {
    justify-content: space-between;
  }

  .nick-name {
    font-size: 0.30rem;
    font-weight: bold;
    color: #2f2f2f;
  }

  .time {
    font-size: 0.24rem;
    color: #a4a4a4;
  }

  .content {
    font-size: 0.26rem;
    color: #2f2f2f;
    margin-top: 0.17rem;
  }
</style>
