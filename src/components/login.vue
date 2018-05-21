<template>
  <div class="container login-container" :style="'min-height: '+minHeight">
    <div class="login-tit">
      <p>LOGIN</p>
      <p>登录</p>
    </div>
    <div class="row">
      <input type="text" v-model="userID" placeholder="手机号" maxlength="11" class="input">
    </div>
    <div class="row">
      <input type="password" v-model="passwd" placeholder="密码: 字母+数字组合 6--20 位" class="input">
    </div>
    <div class="row forget">
      <router-link to="/forget_pass">忘记密码？</router-link>
    </div>
    <button class="save" @click="login">登&nbsp;&nbsp;&nbsp;&nbsp;录</button>

    <p class="nocount-p"><span class="nocount">还没有账号？</span><span class="register" @click="toRegister">去注册账号！</span></p>
  </div>
</template>
<script>
  import {user_login,login_api,userinfo} from '../api/index'
  export default {
    data() {
      return {
        minHeight:'',
        redirect: '',
        from: '',
        userID: '',
        passwd: '',
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
      //登录
      login() {
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/; //手机号正则表达式
        var _this=this;
        if(!myreg.test(this.userID)) {
          this.$dialog.alert({mes: '请输入正确的手机号码'});
        }else if (this.passwd == '') {
          this.$dialog.alert({mes: '密码坚决不能为空...'});
        }else if (this.passwd.length < 6) {
          this.$dialog.alert({mes: '密码太随便了吧...'});
        }else{
          var obj={
            /*userID: '13810167616',
            passwd: '0fb6c6c0b7621fb7bd6ff1e6fb656bc746e2254a4f671dee25c0ce3ddd9ccf3e',*/
            userID: this.userID,
            passwd: this.passwd,
          };
        };
        login_api(obj).then(function (res) {
          console.log(res);
          if(typeof(res.data.token) != 'undefined'){
            userinfo('/'+_this.userID).then(function(res){
              if(res.data.errcode == 0){
                //登录成功后将token与用户ID(手机号)保存在本地,并跳转至首页面
                localStorage.setItem('token', res.data.token);
                //console.log(res.data.token);
                localStorage.setItem('userID', _this.userID);
                localStorage.setItem('userinfo',JSON.stringify(res.data.msg));
                _this.$router.push({
                  path: '/',
                })
              }
            })
          }
        }).catch(function (err) {
          console.log(err);
        });
      },
      //注册
      toRegister() {
        this.$router.push({
          path: '/register',
          query: {'redirect': this.redirect}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      }
    }
  }
</script>
<style scoped="true">
  .login-container {
    background: #fff;
  }
  .login-tit {
    width: 6.90rem;
    margin:0 auto;
    align-items: center;
    padding: 0.8rem 0 0.6rem;
    background: #fff;
    margin-bottom: 1px;
    font-size: 0.29rem;
    font-family: '黑体';

  }
  .login-tit p:first-child{
    font-size:0.45rem;
    font-weight:bold;
  }
  .login-tit p:last-child{
    padding-top:0.1rem;

  }
  .row {
    width: 6.90rem;
    margin:0 auto;
    display: flex;
    align-items: center;
    padding: 0.36rem 0.29rem;
    background: #fff;
    margin-bottom: 1px;
    font-size: 0.28rem;

  }
  .input {
    flex: 1;
    width: 60%;
  }
  .save {
    width: 6.90rem;
    height: 0.90rem;
    line-height: 0.90rem;
    background-color: #5b8ae2;
    border-radius: 4px;
    font-size: 0.30rem;
    text-align: center;
    color: #ffffff;
    margin: 0.8rem auto 0 auto;
    display: block;
    border: 0;
  }
  .nocount-p{
    position:fixed;
    width:100%;
    bottom:0;
    text-align: center;
    font-size: 0.28rem;
    margin:1rem 0;
  }
  .register {
    color: #247edb;
  }
  .forget{
    justify-content: flex-end;
    text-align:right;
    color:#898989;
    padding: 0.1rem 0.29rem;
  }

</style>
