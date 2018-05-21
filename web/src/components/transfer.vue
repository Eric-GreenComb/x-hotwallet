<template>
  <div class="container register-container" :style="'min-height: '+minHeight">
      <div class="header">
        <div class="userhead"><img :src="infor.head_pic"></div>
        <div class="userinfor">
          <p>{{ infor.mobile }}</p>
          <p>{{ infor.nick_name }}</p>
        </div>
      </div>
      <div class="row">转出账户</div>
      <div class="row">
        <input type="text" v-model="mobile" placeholder="手机号" @blur="toAccount()" class="input">
      </div>
      <div class="row">转赠数量</div>
      <div class="row">
        <input type="number" v-model.number="count" placeholder="数量" class="input"></div>
      <div class="row">
        <input type="text" v-model="remarks" placeholder="添加备注 (50字以内)" class="input" ref="wordcount">
      </div>
      <div class="address" v-if="toAccountInfor != ''">
        <span class="icon-addr">
          <i :class="'icon iconfont icon-shouye'"></i>
        </span>
        <span class="addrinfor">
          <p> {{ address }} </p>
          <p> {{ address }} </p>
        </span>
      </div>
      <button v-if="toAccountInfor != ''" class="save" @click="transfer()">确认转赠</button>
      <footer-tab :index="2"></footer-tab>
      <yd-keyboard v-model="show1" title="安全键盘" :callback="doTransfer" disorder ref="safekeyboard"></yd-keyboard>
  </div>
</template>
<script>
  import axios from 'axios'
  import {relate_mobile, regist_user, send_roundstr,token_transfer} from '../api/index'
  import {KeyBoard} from 'vue-ydui/dist/lib.rem/keyboard'
  import config from '../api/config'
  import FooterTab from './common_components/footer_tab.vue'
  export default {
    data() {
      return {
        redirect: '',
        minHeight: '',
        show1: false,
        mobile: '',
        balance: 0,
        remarks: '',
        count: '',
        infor: {
          userId: '13810167616',
          nick_name:'ericGUO',
          mobile: '13552897084',
          head_pic:'../../static/userhead.jpg'
        },
        address: '',
        toAccountInfor: '',
        accountCount: 0,
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
      this.address = this.$route.params.address;
      this.balance = this.$route.params.balance;
      this.accountList(this.infor.userId);
    },
    methods: {
      accountList(userid) {
        let _this = this;
        axios.get(config.account_list+'/'+ userid).then(function (res) {
          _this.accountCount = res.data.length;
        })
      },
      createAccount() {
        this.$router.push({
          path: '/create_account',
          query: {'redirect': this.redirect}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      },
      toAccount() {
        var _this = this;
        var myreg = /^[1][0-9][0-9]{9}$/;
        if (!myreg.test(this.mobile)) {
          this.$dialog.alert({mes: '请输入正确的手机号码'});
          _this.toAccountInfor = '';
          return;
        }
        axios.get(config.account_list+'/'+ this.mobile).then(function (res) {
          if((res.status == 200) && (res.data.length >= 1)){
            _this.toAccountInfor = res.data[0];
          }else{
            _this.toAccountInfor = '';
          }
        })
      },
      doTransfer(val) {
          this.$dialog.loading.open('验证交易密码');
          var obj = {
            conaddr: '0x1dd80b503e3b5de5724fe204bc87fb5387b0470c',
            from: '0x20B5c492B53919e4bfC279C4a43CE350Bb7fDF7c',
            to: '0xeca4635f3fE81b4b8Cc6d40deFf99Eb8428C7BeD',
            amount: 1000,
            pwd: 'a11110',
            memo: 'loan'
          };
          token_transfer(obj).then(function (res) {
            console.log(res)
          })
          /* 模拟异步验证密码 
          setTimeout(() => {
              this.$refs.safekeyboard.$emit('ydui.keyboard.error', '对不起，您的支付密码不正确，请重新输入。');
              this.$dialog.loading.close();
          }, 2000);*/
      },
      transfer(){
        var _this = this;
        var myreg = /^[1][0-9][0-9]{9}$/;
        if (!myreg.test(this.mobile)) {
          this.$dialog.alert({mes: '请输入正确的手机号码'});
          return;
        }
        if(this.count <= 0){
          this.$dialog.alert({mes: '数量不能小于0'});
          return;
        }
        if(this.count > this.balance){
          this.$dialog.alert({mes: '账户数量不足'});
          return;
        }
        this.show1 = true;
      },
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
    },
    watch:{   //watch()监听某个值（双向绑定）的变化，从而达到change事件监听的效果
        remarks:{
            handler:function(){
                //this.remarks = this.remarks.substr(0,50);
                let _sum = 50; //字体限制为100个
                this.$refs.wordcount.setAttribute("maxlength",_sum);
            },
            deep:true
        }
    },
    components: {
      'footer-tab': FooterTab
    }
  }
</script>
<style scoped="true">
  .register-container {
    background: #fff;
  }
  .header{
      display: flex;
      height: 2.5rem;
      width:100%;
  }
  .userhead{
      display:inline-block;
      width:25%;
      padding:0.3rem
  }
  .userhead img{
      height: 1.2rem;
      border-radius:50%;
  }
  .userinfor{
      display:inline-block;
      width:75%;
      padding:0.3rem 0.2rem 0.2rem; 
  }
  .userinfor p:first-child{
    font-size:0.4rem;
  }
  .userinfor p:last-child{
    padding:0.2rem 0rem;
  }
  .createaccount{
    height:5rem;
    margin: 0 auto;
    width: 88%;
    background: #fff;
  }
  .register-p {
    height: 0.82rem;
    line-height: 0.82rem;
    background-color: #ffffff;
    font-size: 0.3rem;
    color: #2f2f2f;
    text-align: center;
    margin-top: 0.5rem;
    margin-bottom: 0.2rem;
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

  .address {
    width: 6.90rem;
    margin:0 auto;
    display: flex;
    align-items: center;
    padding: 0rem 0.29rem;
    background: #fff;
  }
  .addrinfor p{
    padding:0.1rem 0;
  }
  .addrinfor p:first-child{
    color:#999;
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

  input[type="number"]{
    outline-style: none;
    -webkit-appearance: none;
    border: 0;
    font-family: 'PingFang-SC-Regular';
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
