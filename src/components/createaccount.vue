<template>
  <div class="container register-container" :style="'min-height: '+minHeight">
    <!--<p class="register-p">注册</p>-->
    <div class="row"><span class="label">手机号：</span><input type="text" v-model="mobile" placeholder="请输入手机号"
                                                           class="input"></div>
    <div class="row"><span class="label">验证码：</span><input type="text" v-model="code" placeholder="请输入验证码"
                                                           class="input code-input"><span class="code-btn"
                                                                                          @click="getCode">{{tip}}</span>
    </div>
    <div class="row"><span class="label">密码：</span><input type="password" v-model="password" placeholder="请输入密码"
                                                          class="input"></div>
    <div class="row"><span class="label">确认密码：</span><input type="password" v-model="password1" placeholder="请再次输入密码"
                                                            class="input"></div>
    <button class="save" @click="register">创建</button>
  </div>
</template>

<script>
  import {relate_mobile, regist_user, send_roundstr} from '../api/index'

  export default {
    data() {
      return {
        redirect: '',
        minHeight: '',
        mobile: '',
        code: '',
        password: '',
        password1: '',
        tip: '获取',
        tip1: 59

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
      getCode() {
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        var _this = this;
        if (!myreg.test(this.mobile)) {
          this.$dialog.alert({mes: '请输入正确的手机号码'});
        } else {
          if (this.tip == '获取') {
            this.tip1 = 59;
            this.tip = this.tip1 + 's';
            var timer = null;
            timer = setInterval(function () {
              if (_this.tip1 == 0) {
                clearInterval(timer);
                _this.tip = '获取';
                return;
              }
              _this.tip1--;
              _this.tip = _this.tip1 + 's';
            }, 1000);
            send_roundstr({'mobile': this.mobile}).then(function (res) {
              if (res.data.errcode == 0) {
                _this.$dialog.toast({
                  mes: '验证码已发送',
                  timeout: 1500
                });
              } else {
                _this.$dialog.toast({
                  mes: res.data.errdesc,
                  timeout: 1500
                });
              }
            }).catch(function (err) {
              console.log(err);
            })
          } else {
            _this.$dialog.toast({
              mes: '验证码已发送，' + this.tip + '后重发',
              timeout: 1500
            });
          }
        }

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
    background-color: #b81f23;
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
