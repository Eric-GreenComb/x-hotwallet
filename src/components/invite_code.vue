<template>
  <div class="container invite-container" :style="'min-height: '+minHeight">
    <p class="invite-p">请输入邀请码</p>
    <div class="code-box"><input type="text" v-model="inviteCode" placeholder="请输入邀请码" class="code-text"></div>
    <div class="next" @click="next()">下一步</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        redirect: '',
        minHeight: '',
        inviteCode: ''


      }
    },
    mounted() {
      this.$dialog.loading.close();
      this.minHeight = localStorage.getItem('minHeight');
      if (this.$route.query.redirect) {
        this.redirect = this.$route.query.redirect;
      } else {
        this.redirect = '/';
      }
    },
    methods: {
      next() {
        this.$router.push({
          path: '/login',
          query: {'redirect': this.redirect}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      }
    }
  }
</script>
<style scoped="true">
  .invite-container {
    background: #eeeeee;
  }

  .invite-p {
    height: 0.82rem;
    line-height: 0.82rem;
    text-align: center;
    background-color: #ffffff;
    font-size: 0.30rem;
    color: #2f2f2f;
  }

  .code-box {
    width: 6.89rem;
    height: 0.90rem;
    line-height: 0.90rem;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #dcdcdc;
    margin: auto;
    text-align: center;
    margin-bottom: 0.55rem;
    margin-top: 1.75rem;
  }

  .code-text {
    text-align: center;
    font-size: 0.30rem;
    color: #898989;
  }

  .next {
    width: 6.9rem;
    height: 0.90rem;
    line-height: 0.90rem;
    margin: auto;
    background-color: #b81f23;
    border-radius: 4px;
    font-size: 0.30rem;
    color: #ffffff;
    text-align: center;
  }
</style>
