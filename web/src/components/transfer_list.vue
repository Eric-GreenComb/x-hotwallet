<template>
  <div class="container register-container" :style="'min-height: '+minHeight">
      <div class="header">
        <div class="score-infor">
          <div class="icon-score"><img src="../../static/userhead.jpg"></div>
          <div class="name-score">
            BTC
          </div>
          <div class="clear"></div>
        </div>
        <div class="balance-score">
            0.00
        </div>
      </div>
      <div class="transfer_list">
        <ul class="transfer-ul">
          <li class="transfer-li" v-for="item in data">
              <div class="transfer-infor">
                <div>
                  <p class='transfer-desc'>赠送给ericGUO</p>
                  <p>{{ item.CreatedAt }}</p>
                </div>
                <div>
                    {{ item.amount }}
                </div>
              </div>
              <div class="transfer-remark">
                  备注：
              </div>
          </li>
        </ul>
      </div>
      <footer-tab :index="2"></footer-tab>
  </div>
</template>

<script>
  import axios from 'axios'
  import {transfer_list} from '../api/index'
  import config from '../api/config'
  import FooterTab from './common_components/footer_tab.vue'
  export default {
    data() {
      return {
        redirect: '',
        minHeight: '',
        infor: {
          userId: '13810167616',
          nick_name:'安静的美少女',
          mobile: '13552897084',
          head_pic:'../../static/userhead.jpg'
        },
        data: [],
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
      this.transferList();
    },
    methods: {
      transferList() {
        let _this = this;
        transfer_list('/0x1dd80b503e3b5de5724fe204bc87fb5387b0470c/0x20B5c492B53919e4bfC279C4a43CE350Bb7fDF7c/1').then(function(res){
          if(res.data.errcode == 0){
            _this.data = res.data.msg;
          }
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
      height: 3.5rem;
  }
  .score-infor{
      display: flex;
      width:100%;
  }
  .icon-score{
      display:inline-block;
      width:20%;
      height: 1.4rem;
      padding:0.3rem;
  }
  .icon-score img{
      height: 0.8rem;
      border-radius:50%;
  }
  .name-score{
      width:80%;
      color:#fff;
      height: 1.4rem;
      line-height:0.8rem;
      padding:0.3rem 0; 
  }
  .balance-score{
      height:2.1rem;
      letter-spacing: 0.08rem;
      line-height:1.6rem;
      color:#fff;
      font-size:0.8rem;
      text-align:center;
      width:100%;
  }
  .transfer_list{
      background: #fff;
      display: flex;
      height: 10rem;
      width:94%;
      margin:5% auto 2rem;
  }
  .transfer-ul{
      width:100%;
  }
  .transfer-li{
    padding:0.3rem;
  }
  .transfer-infor{
    display: flex;
    width:100%;
  }
  .transfer-infor div:first-child{
      width:60%;
      color:#999;
  }
  .transfer-infor div:last-child{
      width:40%;
      font-size:0.3rem;
      text-align:right;
      align-items:center; 
      justify-content:flex-end;
      display:flex;
  }
  .transfer-remark{
    width:100%;
    color:#999;
    padding:0.3rem 0 0;
  }
  .transfer-desc{
    color:black;
    font-size: 0.3rem;
    padding:0.1rem 0rem;
  }
  /*.balance-ul{
    width:100%;
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
  }*/
</style>
