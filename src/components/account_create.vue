<template>
  <!--<button @click="login">创建账号</button>-->
  <div class="container login-container" :style="'min-height: '+minHeight">
    <div>
      <div class="row disf"><span class="label"></span><input v-model="pwd" class="flex1" type="password" placeholder="密码">
      </div>
      <div class="row disf"><span class="label"></span><input v-model="change_pwd" class="flex1" type="password" placeholder="交易密码">
      </div>
    </div>
    <button class="login-btn" @click="create">创&nbsp;&nbsp;建</button>
  </div>
</template>

<script>
  import {account_create_api} from '../api/index'
  export default {
    data() {
      return {
        from: '',
        mobile: '',
        password: '',
        redirect: '',
        minHeight: '',
      }
    },
    methods: {
      //创建账号
      create(){
        var _this = this;
        var obj = {
          userid:'13810167616',
          name:'培华',
          password:'a11111'
        };
        account_create_api(obj).thern(function (res){
          _this.$router.push({
            path: '/account_create',
            query: {'redirect': _this.redirect}
          })
        }).catch(function (err) {
          console.log(err);
        });
      },
    }
  }
</script>

<style >
  @import "../../static/css/login.css";
  .first_page{
    background:#fff;
    width:100%;
    height:0.9rem;
    line-height:0.9rem;
    padding-left:0.3rem;
  }
  .first_page_title{
    font-size:0.3rem;
    margin-left:0.3rem;
    color: #151515;
  }
  .first_page_title iconfont{
    font-size:0.28rem;
    color: #898989;
  }
  .login-btn{
    cursor: pointer;
  }
  .register{
    cursor: pointer;
  }
</style>
