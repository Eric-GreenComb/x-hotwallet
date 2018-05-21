<template>
  <div class="container register-container" :style="'min-height: '+minHeight">
    <div class="row">
      <input type="text" v-model="userid" placeholder="手机号" maxlength="11"  class="input">
    </div>
    <div class="row">
      <input type="password" v-model="old" placeholder="原始密码" class="input code-input">
    </div>
    <div class="row">
      <input type="password" v-model="xin" placeholder="新密码" class="input">
    </div>

    <button class="save" @click="register">保&nbsp;&nbsp;&nbsp;&nbsp;存</button>
    <footer-tab :index="1"></footer-tab>
  </div>
</template>

<script>
  import {findPassWord} from '../api/index'
  import FooterTab from './common_components/footer_tab.vue'
  export default {
    data() {
      return {
        redirect: '',
        minHeight: '',
        userid: '',
        old: '',
        xin: '',
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
      /*getCode() {
        var _this = this;
        this.tip1=59;
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
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        var _this = this;
        if (!myreg.test(this.mobile)) {
          this.$dialog.alert({mes: '请输入正确的手机号码'});
        } else {
          send_roundstr({'mobile': this.mobile}).then(function (res) {
            console.log('验证码接口res', res)
          }).catch(function (err) {
            console.log(err);
          })
        }

      },*/
      register() {
        //手机号正则表达式
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        var _this = this;
        if (!myreg.test(this.userid)) {
          this.$dialog.alert({mes: '请输入正确的手机号码'});
        } else if (this.old == this.xin) {
          this.$dialog.alert({mes: '新密码不能与原始密码一样哦 ...'});
        } else {
          var obj = {
              /*http://123.206.29.15:4100/api/v1/users/updatepasswd/
              13810167616/0fb6c6c0b7621fb7bd6ff1e6fb656bc746e2254a4f671dee25c0ce3ddd9ccf3e/a11111*/
            userid: this.userid, //userID
            old: this.old,//原始密码
            new: this.xin, //新密码
          };
          var str=''+this.userid+'/'+this.old+'/'+this.xin; //拼接POST请求参数
          // _this.$dialog.loading.open('修改中....');
          findPassWord(str).then(function (res) {
            if (res.data.errcode == 0) {
              _this.$dialog.toast({
                mes: '修改成功！',
                timeout: 1500
              });
              setTimeout(function () {
                _this.$router.push({
                  path: '/login',
                })
              },2000)
            } else {
              _this.$dialog.toast({
               mes: res.data.errdesc,
                timeout: 1500
              });
            }
          }).catch(function (err) {
            console.log(err);
          })
        }
      }
    },
    components: {
      'footer-tab': FooterTab
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
</style>
