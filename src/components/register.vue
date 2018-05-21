<template>
  <div class="container register-container" :style="'min-height: '+minHeight">
    <div class="login-tit">
      <p>SIGN UP</p>
      <p>注册</p>
    </div>
    <div class="row">
      <input type="text" v-model="userID" placeholder="手机号"  maxlength="11" class="input">
    </div>
    <div class="row">
      <input type="text" v-model="name" placeholder="昵称" class="input">
    </div>
    <div class="row">
      <input type="text" v-model="email" placeholder="邮箱" class="input">
    </div>
    <div class="row">
      <input type="text" v-model="code" placeholder="请输入验证码" class="input code-input">
      <span class="code-btn" @click="sendCode">获取</span>
    </div>
    <div class="row">
      <input type="password" v-model="passwd" placeholder="密码， 数字+字母组合，6--20位" class="input">
    </div>
    <button class="save" @click="register">注&nbsp;&nbsp;&nbsp;&nbsp;册</button>
  </div>
</template>
<script>
  import {register_api} from '../api/index'
  export default {
    data() {
      return {
        minHeight:500,
        userID:'' ,
        email:'',
        name: '',
        passwd:'',
        code:'',
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
      //用户登录
      register(){
        var myreg = /^[1][3,4,5,6,7,8][0-9]{9}$/;//验证userID(手机号)是否合法
        var emreg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; //验证邮箱是否合法
        var _this=this;
        /*判断用户提交数据*/
        if(this.email == '' || this.userID =='' || this.name =='' || this.passwd == '') {
          this.$dialog.alert({mes: '你有东西没填哦...'});
          return false;
        }else if(!myreg.test(this.userID)){
          this.$dialog.alert({mes:'手机号错啦...'});
          return false;
        }else if(!emreg.test(this.email)){
          this.$dialog.alert({mes:'您的邮箱我不认识哦...'});
          return false;
        }else if(this.passwd.length < 6 ){
          this.$dialog.alert({mes: '密码太短了...'});
          return false;
        }else{
          var obj={
            userID: parseInt(this.userID), //用户userID
            passwd: this.passwd, //密码
            email: this.email, //邮箱
            name: this.name, //昵称
          };
        }

        // this.$dialog.loading.open('登录中');
        register_api(obj).then(function (res) {
          //console.log(res.data);
          if(res.data.errcode==0){
            _this.$dialog.alert({mes: "注册成功....."});
            _this.$router.push({
              path: '/login',
            })
            /* 返回信息
            {
          "errcode": 0,
          "msg": {
              "ID": 0,
              "CreatedAt": "0001-01-01T00:00:00Z",
              "UpdatedAt": "0001-01-01T00:00:00Z",
              "DeletedAt": null,
              "userID": "13810167621",
              "name": "eric",
              "passwd": "0fb6c6c0b7621fb7bd6ff1e6fb656bc746e2254a4f671dee25c0ce3ddd9ccf3e",
              "email": "ministor@126.com"
          }
           }  */
           localStorage.setItem('userID', res.data.data.userID);//将userID存在本地
          }else{
            this.$dialog.alert({mes: "注册失败啦....."});
          }
        }).catch(function (err) {
          console.log(err);
        });
      },
      //发送手机验证码
     sendCode() {
        this.$dialog.loading.open('发送中...');
        setTimeout(() => {
          this.start = true;
          this.$dialog.loading.close();
          this.$dialog.toast({
            mes: '已发送',
            icon: 'success',
            timeout: 1500
          });
        }, 1000);
      },
      start(){
      },
    }
  }
</script>
<style scoped="true">
  .register-container {
    background: #fff;
  }
  .login-tit {
    width: 6.90rem;
    margin:0 auto;
    align-items: center;
    padding: 0.8rem 0 0.6rem;
    background: #fff;
    margin-bottom: 1px;
    font-size: 0.28rem;
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

  .code-input {
    width: 55%;
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
