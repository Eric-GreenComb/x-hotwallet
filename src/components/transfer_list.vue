<template>
  <div class="container register-container" :style="'min-height: '+minHeight">
      <div class="header">
        <div class="score-infor">
          <div class="icon-score"><img src="../../static/img/score.png"></div>
          <div class="name-score">
            {{ score.symbol }}
          </div>
          <div class="clear"></div>
        </div>
        <div class="balance-score">
            {{ score.balance }}
        </div>
      </div>
      <div class="fixed_box"> </div>
      <!-- 上拉加载更多,解注释 -->
     
      <div class="transfer_list">
        <ul class="transfer-ul">
          <li class="transfer-li" style="text-align:center;color:#ccc" v-if="data.length <= 0">
            暂时没有记录
          </li>
          <li class="transfer-li" v-for="item in data">
              <div class="transfer-infor">
                <div>
                  <p class='transfer-desc'>转入账户：{{ item.to }}</p>
                  <p>{{ item.CreatedAt }}</p>
                </div>
                <div v-bind:class="{red:(account.address == item.from),green:(account.address == item.to)}">
                    {{ item.amount }}
                </div>
              </div>
              <div class="transfer-remark">
                  备注：
              </div>
          </li>
        </ul>
        <div v-if="data.length > 0" id="getmore" :disabled="isDisable" @click="getmore" style="background:#fff;text-align:center;color:#5b8ae2;padding:0.2rem 0">点击加载更多</div>
      </div>
<!--       </load-more> -->
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
        score: {
          tokenaddress: '',
          balance: ''
        },
        account: {
        },
        page: 1,
        data: [],
        isDisable: false,
        allLoaded: false,//是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
        scrollMode: 'touch',//移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
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
      this.score.tokenaddress = this.$route.params.tokenaddress;
      this.score.balance = this.$route.params.balance;
      this.score.symbol = this.$route.params.symbol;
      this.account = JSON.parse(localStorage.getItem('account'));
      this.transferList();
    },
    methods: {
      transferList() {
        let _this = this;
        this.$dialog.loading.open('');
        transfer_list('/'+ this.score.tokenaddress +'/'+ this.account.address +'/' + this.page).then(function(res){
          _this.$dialog.loading.close();
          if(res.data.errcode == 0){
            _this.data = _this.data.concat(res.data.msg);
            if(res.data.msg.length < 10){
              document.getElementById('getmore').style.display = "none";
            }else{
              _this.isDisable = false;
            }
            /*_this.data.forEach(function (item) {
              //item.CreatedAt = new Date((new Date(item.CreatedAt).toLocaleDateString()+ " " + new Date(item.CreatedAt).toLocaleTimeString())).format('yyyy-MM-dd hh:mm:ss');
            });*/
          }

        })
      },
      getmore(){
        this.isDisable = true;
        this.page++;
        this.transferList();
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
      background: url(../../static/img/bg_transfer.png);
      background-size:cover;
      position:fixed;
      top:0;
      width:100%;
      z-index:2;
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
      width:94%;
      overflow: hidden;
      margin: 3.8rem auto 1.1rem;
      padding-bottom: 0.3rem;
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
    word-wrap:break-word;
    word-break: break-all;
    color:black;
    font-size: 0.3rem;
    padding:0.1rem 0rem;
  }
  .red{
    color:#f23030;
  }
  .green{
    color:green;
  }
  .fixed_box{
    height:0.4rem;
    background:#f6f5fa;
    position:fixed;
    top:3.4rem;
    width:100%
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
