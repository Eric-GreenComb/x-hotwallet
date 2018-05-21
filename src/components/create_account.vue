<template>
  <div class="container register-container" :style="'min-height: '+minHeight">
    <!--<p class="register-p">注册</p>-->
    <div class="row"><span class="label">账户名：</span><input type="text" v-model="name" placeholder="请输入账户名" class="input"></div>
    <div class="row"><span class="label">交易密码：</span><input type="password" v-model="passwd" placeholder="请输入交易密码" class="input"></div>
    <div class="row"><span class="label">确认密码：</span><input type="password" v-model="repasswd" placeholder="请输入交易密码" class="input"></div>
    <button class="save" @click="createAccount">创建</button>
  </div>
</template>

<script>
  import {create_account} from '../api/index'
  import axios from 'axios' 
  import config from '../api/config' 

  export default {
    data() {
      return {
        redirect: '',
        minHeight: '',
        name: '',
        passwd: '',
        repasswd: ''
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
      createAccount() {
        let _this = this;
        if(this.passwd != this.repasswd){
          this.$dialog.alert({mes: '确认密码错误'});
          return;
        }
        axios.post(config.create_account+'/'+localStorage.getItem('userID')+'/'+_this.name+'/'+_this.passwd).then(function (res) {
          if((typeof(res.data) != 'undefined') && (res.data != '')){
            _this.$router.push({
              path: '/',
              query: {'redirect': _this.redirect}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
          }
        })
      },
      register() {
        //手机号正则表达式
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        var _this = this;
        var invite_code = '';
        if (sessionStorage.getItem('inviter')) {
          if (sessionStorage.getItem('inviter') == 0) {
            invite_code = '';
          } else {
            invite_code = sessionStorage.getItem('inviter');
          }
        }else{
          invite_code = '';
        }
        if (!myreg.test(this.mobile)) {
          this.$dialog.alert({mes: '请输入正确的手机号码'});
        } else if (this.code == '') {
          this.$dialog.alert({mes: '请输入验证码'});
        } else if (this.password != this.password1) {
          this.$dialog.alert({mes: '两次输入的密码不一致'});
        } else {
          //如果有用户的微信信息，就用用户公众号注册接口进行注册,用户注册时填的邀请码是他人的邀请码，如果有就传，没有就传空
          if (localStorage.getItem('userInfor')) {
            //用户微信信息
            var userInfor = JSON.parse(localStorage.getItem('userInfor'));
            var obj = {
              token: userInfor.token,// 第三方账号openid
              mobile: this.mobile,
              password: this.password,
              nick_name: userInfor.nickname,// 昵称
              pic: userInfor.headimgurl,// 头像
              invite_code: invite_code,// 邀请码
              roundstr: this.code//验证码
            };

            relate_mobile(obj).then(function (res) {
              //console.log('register',res);
              if (res.data.errcode == 0) {
                localStorage.setItem('token', res.data.data.token);
                _this.$router.push({
                  path: '/main/complete_material',
                  query: {'redirect': _this.redirect}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
                })
              } else {
                _this.$dialog.toast({
                  mes: res.data.errdesc,
                  timeout: 1500
                });
              }
            })
          } else {
            //没有获取到用户的微信信息时，使用手机号注册接口
            var obj = {
              mobile: this.mobile,
              password: this.password,
              roundstr: this.code,//验证码
              invite_code: invite_code,// 邀请码
            };

            regist_user(obj).then(function (res) {
              if (res.data.errcode == 0) {
                localStorage.setItem('token', res.data.data.token);
                _this.$router.push({
                  path: '/main/complete_material',
                  query: {'redirect': _this.redirect}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
                })
              } else {
                _this.$dialog.toast({
                  mes: res.data.errdesc,
                  timeout: 1500
                });
              }
            })
          }


        }
      }
    }
  }
</script>
<style scoped="true">
  .register-container {
    padding-top:0.7rem;
    background: #eee;
  }

  .register-p {
    height: 0.82rem;
    line-height: 0.82rem;
    background-color: #ffffff;
    font-size: 0.3rem;
    color: #2f2f2f;
    text-align: center;
    margin-bottom: 0.2rem;
  }

  .row {
    display: flex;
    align-items: center;
    padding: 0.36rem 0.29rem;
    background: #fff;
    margin-bottom: 1px;
    font-size: 0.28rem;

  }

  .label {
    color: #2f2f2f;
    margin-right: 0.2rem;
    width: 1.5rem;
    display: inline-block;
  }

  .input {
    flex: 1;
    width: 60%;
  }

  .code-input {
    width: 55%;

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
    margin: 1.02rem auto 0 auto;
    display: block;
    border: 0;
  }

  .code-btn {
    display: flex;
    width: 1.20rem;
    height: 0.50rem;
    justify-content: center;
    align-items: center;
    /* line-height: 0.50rem;*/
    background-color: #eeeeee;
    border-radius: 4px;
    font-size: 0.26rem;
    color: #2f2f2f;
    text-align: center;
  }

  .text {
    width: 1.7rem;
    text-align: center;
    padding-left: 0;
  }
  input::input-placeholder {
    font-size: 0.26rem;
    color: #a4a4a4;
  }

  input::-webkit-input-placeholder {
    font-size: 0.26rem;
    color: #a4a4a4;
  }

  input:-ms-input-placeholder {
    font-size: 0.26rem;
    color: #a4a4a4;
  }

  input:-moz-placeholder {
    font-size: 0.26rem;
    color: #a4a4a4;
  }

  input::-moz-placeholder {
    font-size: 0.26rem;
    color: #a4a4a4;
  }
</style>
