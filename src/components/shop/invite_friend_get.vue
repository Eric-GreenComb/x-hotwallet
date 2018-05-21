<template>
  <div class="container" :style="'max-height:'+minHeight+';max-width:'+clientWidth+';'">
    <div class="box">
      <img src="../../../static/img/shop/invite-friend-bg.png" class="bg" alt="">
      <div class="envelope">
        <img src="../../../static/img/shop/envelope.png" alt="">
        <p class="texac value-p"><i class="icon iconfont icon-icon-test"></i></p>
        <div class="input-div">
          <input type="text" v-model="mobile" class="input" placeholder="请填写手机号码">
          <div class="code-input disf">
            <input type="text" v-model="code" class="code" placeholder="请输入验证码">
            <span class="line"></span>
            <span class="text" @click="getCode">{{tip}}</span>
          </div>
          <button class="btn" @click="getGift()">领取奖励</button>
        </div>
        <img src="../../../static/img/shop/default_header.png" class="header" v-if="inviterHeader==''" alt="">
        <img :src="inviterHeader" class="header" v-else alt="">
        <p class="text-p"><span>{{inviterName}}</span><span>送你</span><span class="num">10</span><span>元奖励</span></p>
      </div>
    </div>
  </div>
</template>

<script>
  import {send_roundstr, getPerson_homepageInfo} from '../../api/index'

  export default {
    data() {
      return {
        minHeight: '',
        clientWidth: '',
        mobile: '',
        code: '',
        invite_code: '',
        tip: '获取验证码',
        tip1: 59,
        inviterHeader: '',
        inviterName: ''
      }
    },
    created() {
      this.$dialog.loading.close();
      this.minHeight = localStorage.getItem('minHeight');
      this.clientWidth = localStorage.getItem('clientWidth');
      this.invite_code = this.$route.query.invite_code;
      console.log(this.invite_code);
      sessionStorage.setItem('inviter', this.invite_code);
      this.getInviterMsg();
    },
    mounted() {
    },
    methods: {
      getInviterMsg() {
        var _this = this;
        getPerson_homepageInfo({'invite_code': this.invite_code}).then(function (res) {
          var data = res.data.data;
          _this.inviterHeader = data.head_pic;
          _this.inviterName = data.nick_name;
          var UrlAttr = (decodeURIComponent(location.href)).split('#');
          var param = '/main/invite_friend_get?invite_code=' + _this.$route.query.invite_code;
          var link = config.redirect_url + "?host=" + encodeURIComponent(UrlAttr[0]) + "&param=" + encodeURIComponent(param);
          this.wxutils.wxShare('你有一个10元奖励未领取', '您的好友送你10元奖励，快来领取吧', link, '');

        }).catch(function (err) {
          console.log(err);
        })
      },
      getCode() {
        //console.log('tip1==', this.tip1);
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        var _this = this;
        if (!myreg.test(this.mobile)) {
          this.$dialog.alert({mes: '请输入正确的手机号码'});
        } else {
          if (this.tip == '获取验证码') {
            this.tip1 = 59;
            this.tip = this.tip1 + 's';
            var timer = null;
            timer = setInterval(function () {
              if (_this.tip1 == 0) {
                clearInterval(timer);
                _this.tip = '获取验证码';
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
      getGift(){
        //手机号正则表达式
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(this.mobile)) {
          this.$dialog.alert({mes: '请输入正确的手机号码'});
        } else if (this.code == '') {
          this.$dialog.alert({mes: '请输入验证码'});
        }else{
          this.$router.push('/main/set_password/'+this.mobile+'/'+this.code)
        }

      }
    }
  }
</script>
<style scoped="true">
  .container {
    overflow: hidden;
  }

  .bg {
    width: 100%;
  }

  .container {
    background: #000;
  }

  .box {
    position: relative;
  }

  .envelope {
    position: absolute;
    top: 3.1rem;
    width: 100%;
    left: 0;
    right: 0;
    margin: auto;
  }

  .envelope img {
    width: 100%;
  }

  .input-div {
    position: absolute;
    top: 2.18rem;
  }

  .input {
    display: block;
    width: 5.20rem;
    height: 0.86rem;
    background-color: #ffffff;
    border-radius: 2px;
    font-size: 0.28rem;
    color: #898989;
    margin-left: 1.15rem;
    padding-left: 0.3rem;
  }

  .code-input {
    width: 5.20rem;
    height: 0.86rem;
    background-color: #ffffff;
    border-radius: 2px;
    font-size: 0.28rem;
    color: #898989;
    margin-left: 1.15rem;
    padding-left: 0.3rem;
    margin-top: 0.2rem;
    line-height: 0.86rem;
    display: flex;
    align-items: center;

  }

  .code {
    font-size: 0.28rem;
    color: #898989;
    flex: 1;
    width: 1rem;

  }

  .line {
    width: 2px;
    height: 0.3rem;
    background: #2f2f2f;
    z-index: 100;
  }

  .text {
    padding-left: 0.23rem;
    font-size: 0.26rem;
    color: #2f2f2f;
  }

  .btn {
    width: 5.20rem;
    text-align: center;
    height: 0.86rem;
    line-height: 0.86rem;
    background-image: linear-gradient(90deg,
    #b77e48 0%,
    #e6b870 100%),
    linear-gradient(
      #b81f23,
      #b81f23);
    background-blend-mode: normal,
    normal;
    border-radius: 2px;
    font-size: 0.30rem;
    color: #ffffff;
    border: 0;
    margin-top: 0.35rem;
    margin-left: 1.15rem;

  }

  .sign {
    font-size: 0.42rem;
    color: #b88049;
  }

  .value {
    font-size: 1.42rem;
    color: #b88049;
  }

  .envelope .header {
    width: 0.60rem;
    height: 0.60rem;
    border-radius: 50%;
    position: absolute;
    left: 3.46rem;
    top: 6.22rem;
    border: 1px solid rgba(248, 168, 124, 0.59);
  }

  .text-p {
    font-size: 0.26rem;
    color: #b88049;
    position: absolute;
    top: 7.11rem;
    width: 100%;
    left: 0;
    text-align: center;
  }

  .num {
    font-size: 0.3rem;
  }

  .value-p {
    top: 0.15rem;
    position: absolute;
    left: 0;
    right: 0;
  }

  .icon-icon-test {
    font-size: 2rem;
    color: #b88049;
    margin-bottom: 0.2rem;
  }

  .text {
    width: 1.7rem;
    text-align: center;
    padding-left: 0;
  }
</style>
