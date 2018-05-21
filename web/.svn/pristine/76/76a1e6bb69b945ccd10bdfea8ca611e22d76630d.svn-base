<template>
  <div class="container register-container" :style="'min-height: '+minHeight">
      <div class="header">
        <div class="userhead"><img :src="infor.head_pic"></div>
        <div class="userinfor">
          <p>{{ infor.mobile }}</p>
          <p>{{ infor.nick_name }}</p>
          <p><span class="icon-addr"><i :class="'icon iconfont icon-shouye'"></i></span><span class="address">{{ account.address }}</span></p>
        </div>
      </div>
      <div class="createaccount" v-if="accountCount == 0">
          <p class="p1">请先添加账户</p>
          <p class="p2">您还没有账户，创建新账户</p>
          <p class="p3"><button class="save-btn" @click="createAccount()">+</button></p>
      </div>
      <div class="balance" v-if="accountCount > 0">
        <ul class="balance-ul">
          <li class="balance-li disf" v-for="item in balance">
              <span @click="transfer_list(item.address)"><img src="../../static/userhead.jpg" class="icon-score" alt=""></span>
              <span @click="transfer_list(item.address)">{{ item.symbol }}</span>
              <span>{{ item.balance }}</span>
              <span @click="transfer(item.address,item.balance)"><img src="../../static/userhead.jpg" class="icon-money" alt=""></span>
              <div class="clear"></div>
          </li>
        </ul>
      </div>
      <footer-tab :index="2"></footer-tab>
  </div>
</template>

<script>
  import axios from 'axios'
  import {view_balance} from '../api/index'
  import config from '../api/config'
  import FooterTab from './common_components/footer_tab.vue'
  export default {
    data() {
      return {
        redirect: '',
        minHeight: '',
        infor: {
          userId: '13810167616',
          nick_name:'ericGUO',
          mobile: '13552897084',
          head_pic:'../../static/userhead.jpg'
        },
        accountCount: -1,
        account:{},
        balance:[{address:"0xbe589d63faa88007a6de0572f2e90c3bde68ad03",
balance
:
"1000000000",
name
:
"fifu",
symbol
:
"FIFU"},{address:"0xbe589d63faa88007a6de0572f2e90c3bde68ad03",
balance
:
"1000000000",
name
:
"fifu",
symbol
:
"FIFU"},{address:"0xbe589d63faa88007a6de0572f2e90c3bde68ad03",
balance
:
"1000000000",
name
:
"fifu",
symbol
:
"FIFU"}],
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
      this.accountList();
    },
    methods: {
      transfer(address,balance) {
        this.$router.push({
          path: '/transfer/' + address + '/' + balance,
          query: {'redirect': this.redirect}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      },
      transfer_list(tokenaddress) {
        this.$router.push({
          path: '/transfer_list/' + tokenaddress,
          query: {'redirect': this.redirect}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      },
      accountList() {
        let _this = this;
        axios.get(config.account_list+'/'+this.infor.userId).then(function (res) {
          _this.accountCount = res.data.length;
          _this.account = res.data[0];
          if(_this.accountCount > 0){
            view_balance('/13810167616/0x37213Efe922A06C3e5EF99A6DBd9dAaB35B81393').then(function (res) {
              if (res.data.errcode == 0) {
                //_this.balance = res.data.msg;
              }
            }).catch(function (err) {
              console.log(err);
            })
          }
        })
      },
      createAccount() {
        this.$router.push({
          path: '/create_account',
          query: {'redirect': this.redirect}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
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
    background: #f6f5fa;
  }
  .header{
      background: url(../../static/img/bg_wallet.jpg);
      background-size:cover;
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
      color:#fff;
      display:inline-block;
      width:75%;
      padding:0.3rem 0.2rem 0.2rem; 
  }
  .userinfor p:first-child{
    font-size:0.4rem;
  }
  .userinfor p:nth-child(2){
    padding:0.1rem 0rem;
  }
  .userinfor p:nth-child(3){
    display:flex;
  }
 .icon-addr{
      display:flex;
      align-items:center;
      width:10%;
  }
  .address{
      color:#fff;
      word-wrap:break-word;
      display:inline-block;
      width:90%;
  }
  .createaccount{
    height:5rem;
    margin: 0 auto;
    width: 94%;
    background: #fff;
  }
  .createaccount .p1{
    text-align:center;
    font-size:0.35rem;
    color:black;
    font-weight:bold;
    padding-top:1rem;
  }
  .createaccount .p2{
    text-align:center;
    color:#b9b9b9;
    padding-top:0.3rem;
  }
  .createaccount .p3{
    text-align:center;
    padding-top:1rem;
  }
  .save-btn{
    border-color:#a4dde9;
    color:#a4dde9;
    border:2px #a4dde9 solid;
    border-radius:0.1rem;
    width:3rem;
    font-size:0.6rem;
  }
  .balance{
      background: #fff;
      display: flex;
      height: 10rem;
      width:94%;
      margin:5% auto 2rem;
  }
  .balance-ul{
    width:100%;
  }
  .clear{
    clear:both;
  }
  .balance-li span:first-child{
      float:left;
      width:20%;
      padding:0.1rem;
      text-align:left;
      display:flex;
      align-items:center;
  }
  .balance-li span:nth-child(2){
      float:left;
      width:20%;
      padding:0.1rem;
      line-height:0.8rem;
      text-align:left;
  }
  .balance-li span:nth-child(3){
      float:left;
      width:50%;
      padding:0.1rem;
      line-height:0.8rem;
      text-align:right;
  }
  .balance-li span:nth-child(4){
      float:left;
      width:10%;
      padding:0.1rem;
      text-align:center;
      display:flex;
      align-items:center;
  }
  .icon-score{
      height: 0.8rem;
      border-radius:50%;
  }
  .icon-money{
      margin: auto auto;
      height: 0.4rem;
  }
  .userinfor{
      color:#fff;
      display:inline-block;
      width:75%;
      padding:0.3rem 0.2rem 0.2rem; 
  }
  .userinfor p:first-child{
    font-size:0.4rem;
  }
  .userinfor p:nth-child(2){
    padding:0.1rem 0rem;
  }
</style>
