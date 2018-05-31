<template>
  <div class="container register-container" :style="'min-height: '+minHeight">
      <div class="header">
        <div class="userhead"><img src="../../static/userhead.jpg"></div>
        <div class="userinfor">
          <p>{{ infor.userID }}({{ infor.name }})</p>
          <p style="font-size:9px;">{{ fromAccount.address }}</p>
        </div>
      </div>
      <div class="row">
        <div style="float:left;">转出账户&nbsp;:&nbsp;</div>
        <div style="float:left;"><input type="text" v-model="mobile" placeholder="手机号" @blur="getAccount()" class="input"></div> 
        <div style="float:clear;"></div>
      </div>
      <div class="row">
          <p style="font-size:9px;">{{ toAccount.address }}</p>
      </div>
      <div class="row">
        <div style="float:left;">转赠数量&nbsp;:&nbsp;</div>
        <div style="float:left;"><input type="number" v-model.number="count" placeholder="数量" class="input"></div> 
        <div style="float:clear;"></div>      
      </div>
     <div class="row">
        <div style="float:left;">交易密码&nbsp;:&nbsp;</div>
        <div style="float:left;"><input type="password" v-model="password" placeholder="请输入交易密码"  class="input"></div> 
        <div style="float:clear;"></div>         
     </div>
     <div class="row">
        <input type="text" v-model="remarks" placeholder="添加备注 (50字以内)" class="input" ref="wordcount">
     </div>

      <button class="save" @click="doTransfer()">确认交易</button>

      <div class="row">
      </div>
      
      <footer-tab :index="2"></footer-tab>
  </div>
</template>
<script>
  import axios from 'axios'
  import {token_transfer} from '../api/index'
  import {KeyBoard} from 'vue-ydui/dist/lib.rem/keyboard'
  import config from '../api/config'
  import FooterTab from './common_components/footer_tab.vue'
  export default {
    data() {
      return {
        redirect: '',
        minHeight: '',
        showkeyboard: false,
        infor: {
          userId: '13810167616',
          name:'ericGUO',
          head_pic:'../../static/userhead.jpg'
        },
        fromAccount: '',
        toAccount: '',
        tokenaddress: '',
        balance: 0,
        mobile: '',
        remarks: '',
        count: '',
        password: '',
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
      this.infor = JSON.parse(localStorage.getItem('userinfo'));
      this.fromAccount = JSON.parse(localStorage.getItem('account'));
      this.tokenaddress = this.$route.params.address;
      this.balance = this.$route.params.balance;
    },
    methods: {
      getAccount() {
        var _this = this;
        var myreg = /^[1][0-9][0-9]{9}$/;
        if (!myreg.test(this.mobile)) {
          this.$dialog.alert({mes: '请输入正确的手机号码'});
          _this.toAccount = '';
          return;
        }
        axios.get(config.account_list+'/'+ this.mobile).then(function (res) {
          if((res.status == 200) && (res.data.length >= 1)){
            _this.toAccount = res.data[0];
          }else{
            _this.toAccount = '';
          }
        })
      },
      doTransfer(val) {
          this.$dialog.loading.open('努力验证中...');
          var _this = this;
          var obj = {
            conaddr: this.tokenaddress,
            from: this.fromAccount.address,
            to: this.toAccount.address,
            amount: this.count,
            pwd: this.password,
            memo: this.remarks
          };
          token_transfer(obj).then(function (res) {
           if(res.data.errcode == 1){
             setTimeout(() => {
               _this.$dialog.loading.open('交易密码错误...');
               setTimeout(() => {
                 _this.$dialog.loading.close();
                 _this.password = '';
               }, 2000);
             }, 2000);
            }else{
             setTimeout(() => {
                 _this.$dialog.loading.open('交易成功');
                 setTimeout(() => {
                     _this.$router.push({
                       path: '/'
                     })
                 }, 2000);
             }, 2000);
           }
          })
      },
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
      padding:0.1rem 0.2rem 0.2rem;
  }
  .userinfor p:first-child{
    font-size:0.4rem;
  }
  .userinfor p:last-child{
    padding:0.2rem 0rem;
  }
  .row {
    width: 6.90rem;
    margin:0 auto;
    display: flex;
    align-items: center;
    padding: 0.30rem 0.29rem;
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
    margin-top: 0.1rem;
    width: 1.5rem;
    display: inline-block;
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
    margin: 0.6rem auto 0 auto;
    display: block;
    border: 0;
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