<template>
  <div class="container" :style="'min-height:'+minHeight">
    <div class="row">
      <span class="label">密码：</span>
      <input type="password" v-model="password" placeholder="请输入密码" class="input">
    </div>
    <div class="row">
      <span class="label">确认密码：</span>
      <input type="password" v-model="password1" placeholder="请再次输入密码" class="input">
    </div>

    <button class="btn" @click="register()">完成</button>

  </div>
</template>

<script>
  import {regist_user} from '../../api/index'

  export default {
    data() {
      return {
        redirect: '',
        minHeight: '',
        mobile: '',
        code: '',
        password: '',
        password1: '',

      }
    },
    mounted() {
      this.$dialog.loading.close();
      this.minHeight = localStorage.getItem('minHeight');
      this.mobile = this.$route.params.mobile;
      this.code = this.$route.params.code;
    },
    methods: {
      register() {
        var _this = this;
        var invite_code = '';
        if (sessionStorage.getItem('inviter')) {
          if (sessionStorage.getItem('inviter') == 0) {
            invite_code = '';
          } else {
            invite_code = sessionStorage.getItem('inviter');
          }
        }
        if (this.password != this.password1) {
          this.$dialog.alert({mes: '两次输入的密码不一致'});
        } else {
          var obj = {
            mobile: this.mobile,
            password: this.password,
            roundstr: this.code,//验证码
            invite_code: invite_code,// 邀请码
          };
          regist_user(obj).then(function (res) {
            if (res.data.errcode == 0) {
              localStorage.setItem('token', res.data.data.token);
              _this.$router.push('/main/complete_material')
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
</script>
<style scoped="true">
  .container {
    background: #eee;
  }

  .row {
    display: flex;
    align-items: center;
    padding: 0.36rem 0.29rem;
    background: #fff;
    margin-bottom: 1px;
    font-size: 0.28rem;
    color: #2f2f2f;
  }

  input {
    font-size: 0.28rem;
    color: #2f2f2f;
  }

  .label {
    color: #2f2f2f;
    margin-right: 0.2rem;
    width: 1.8rem;
    display: inline-block;
  }

  .input {
    flex: 1;
    width: 60%;
  }

  .icon-xiajiantou-copy {
    color: #898989;
    font-size: 0.24rem;
    margin-left: 0.3rem;
  }

  .btn {
    display: block;
    width: 6.90rem;
    height: 0.80rem;
    line-height: 0.80rem;
    background-color: #b81f23;
    border-radius: 2px;
    font-size: 0.30rem;
    color: #ffffff;
    text-align: center;
    border: 0;
    margin: 1rem auto 0 auto;
  }

</style>
