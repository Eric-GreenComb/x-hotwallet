<template>
  <div>
    <p class="register-p"></p>
    <div class="row">
      <input type="password" v-model="old" placeholder="原始交易密码" class="input code-input">
    </div>
    <div class="row">
      <input type="password" v-model="xin" placeholder="新交易密码" class="input">
    </div>

    <button class="save" @click="register">确定</button>

    <footer-tab :index="2"></footer-tab>
  </div>
</template>
<script type="text/babel">
  import {reset_exchange_api} from '../api/index'
  import FooterTab from './common_components/footer_tab.vue'
  export default {
    data() {
      return {
        old:'',
        xin:'',
        addr:'',
      }
    },
    methods: {
      register() {
        var _this = this;
        var obj = {
          addr : localStorage.getItem('addr'), //用户的身份唯一地址标识
          password:this.old, //旧密码
          newpassword:this.xin, //新密码
        };
         // var str      =''+this.addr+'/'+this.old+'/'+this.xin; //拼接POST请求参数
          var str=''+'0x20B5c492B53919e4bfC279C4a43CE350Bb7fDF7c'+'/'+this.old+'/'+this.xin; //拼接POST请求参数
          //_this.$dialog.loading.open('修改中....');
        reset_exchange_api(str).then(function (res) {
            if (res.data.errcode == 0) {
              _this.$dialog.toast({
                mes: '修改成功！',
                timeout: 1500
              });
            /*  setTimeout(function () {
                _this.$router.push({
                  path: '/login',
                })
              },2000)*/
            }
          }).catch(function (err) {
            console.log(err);
          })
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
    width: 6.90rem;
    margin:0 auto;
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
    font-size: 0.33rem;
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
