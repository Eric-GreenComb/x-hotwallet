<template>
  <div class="container unlogin-container" :style="'min-height: '+minHeight">
    <div>
      <div class="row disf"><span class="label"></span><input v-model="mobile" class="flex1" type="text" placeholder="请输入手机号">
      </div>
      <div class="row disf">
        <input v-model="password" class="flex1" type="password" placeholder="短信验证码">
        <button class="button" id="btn_ck" >获取验证码</button>
      </div>
      <div class="row disf"><span class="label"></span><input v-model="mobile" class="flex1" type="password" placeholder="字母和数字组合,620位">
      </div>
    </div>
    <button class="button" @click="toLogin">确&nbsp;&nbsp;&nbsp;&nbsp;定</button>


  </div>
</template>

<script>
  import config from '../api/config'
  import {getAuthor_infor, third_login} from '../api/index'
  export default {
    data() {
      return {
        minHeight: '',
        code: null,
        base: ''
      }
    },
    created() {
      this.base = config.domain+location.pathname;
      /*this.base = config.base_url;*/
      console.log('unlogin====');
      //记录之前的路由
      var _this = this;
      console.log('cookie', document.cookie);
      if (document.cookie) {
        console.log('has');
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isiOS) {
          sessionStorage.setItem('iosurl',_this.base+'#/unlogin');
          //alert('unloginpage===='+sessionStorage.getItem('iosurl'));
        }
        var userInfor = decodeURIComponent(document.cookie).split('user_infor=')[1];
        localStorage.setItem('userInfor', userInfor);
        _this.thirdLogin();
      } else {
        console.log('no');
      }
    },
    mounted() {
      this.$dialog.loading.close();
      this.minHeight = localStorage.getItem('minHeight');
    },
    methods: {

    }
  }
</script>
<style scoped="true">
  @import "../../static/css/login.css";
  .unlogin-container {
    background: #fff;
    position: relative;;
  }

  .text {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 40.5%;
    left: 0;
    color: #8D8E90;

  }

  .button {
    display: block;
    padding: 0.15rem 0.35rem;
    /*height: 0.7rem;*/
    /* line-height: 0.7rem;*/
    margin: auto;
    background: #007aff;
    color: #fff;
    border: 0;
    border-radius: 4px;
    text-align: center;
    margin-top: 0.3rem;
    width: 80%;

  }
  #btn_ck{
    width: 40%;
  }

  .unlogin-pic {
    width: 80%;
    margin: 35% auto 0 auto;
  }
</style>



