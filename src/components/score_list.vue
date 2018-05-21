<template>
  <div class="container register-container" :style="'min-height: '+minHeight">
    <div class="search disf">
      <div class="disf input-box"><i class="icon iconfont icon-sousuo"></i><input type="text" class="sousuo-input" placeholder="请输入要搜索的商品"></div>
      <span class="cancel-btn">取消</span>
    </div>
    
    <div class="score-container">
      <ul class="score-ul">
        <li class="score-li" v-for="item in data">
          <span><img src="../../static/img/score.png" class="icon-score" alt=""></span>
          <span class="score-desc">{{ item.name }}</span>
          <span></span>
          <span @click="addScore(item.address)" class="score-btn"><i class="icon iconfont icon-jiahao"></i></span>
          <div class="clear"></div>
        </li>
      </ul>
    </div>
    <footer-tab :index="1"></footer-tab>
  </div>
</template>

<script>
  import axios from 'axios'
  import config from '../api/config'
  import {view_create} from '../api/index'
  import FooterTab from './common_components/footer_tab.vue'

  export default {
    data() {
      return {
        redirect: '',
        minHeight: '',
        code: '',
        data:[], 
        page: 1
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
      this.scoreList();
    },
    methods: {
      scoreList(){
        let _this = this;
        axios.get(config.score_list+'/'+this.page).then(function (res) {
          if(res.data.errcode == 0){
            _this.data = res.data.msg;
          }
        })
      },
      addScore(address){
        let _this = this;
        view_create('/'+ localStorage.getItem('userID') +'/'+ JSON.parse(localStorage.getItem('account')).address +'/' + address).then(function (res) {
        console.log(res);
          if(res.data.errcode == 0){
            _this.$router.push({
              path: '/',
              query: {'redirect': _this.redirect}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
          }else{
            _this.$router.push({
              path: '/',
              query: {'redirect': _this.redirect}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
          }
        })
      }
    },
    components: {
      'footer-tab': FooterTab
    },
  }
</script>
<style scoped="true">
  .register-container {
    background: #eee;
  }
  .score{
      background: #fff;
      display: flex;
      height: 10rem;
      width:94%;
      margin:5% auto 2rem;
  }
  .icon-jiahao{
    font-size:0.46rem;
  }
  .score-ul{
    width:100%;
  }
  .score-li{
    width:100%;
    display:flex;
  }
  .clear{
    clear:both;
  }
  .score-li span:first-child{
      float:left;
      width:20%;
      padding:0.1rem;
      text-align:left;
      display:flex;
      align-items:center;
  }
  .score-li span:nth-child(2){
      float:left;
      width:20%;
      padding:0.1rem;
      line-height:0.8rem;
      text-align:left;
  }
  .score-li span:nth-child(3){
      display:table-cell;
      float:left;
      width:50%;
      padding:0.1rem;
      line-height:0.8rem;
      text-align:right;
      vertical-align:middle;
  }
  .score-li span:nth-child(4){
      float:left;
      width:10%;
      padding:0.1rem;
      display:flex;
      align-items:center;
  }
  .icon-score{
      height: 0.7rem;
      border-radius:50%;
  }
  .icon-money{
      margin: auto auto;
      height: 0.4rem;
  }
  .input-box {
    width: 86%;
    height: 0.6rem;
    background-color: #f2f2f2;
    border-radius: 4px;
    align-items: center;
    padding: 0.15rem 0;
    color: #a4a4a4;
  }
  .cancel-btn{
    display: flex;
    width: 1.20rem;
    height: 0.50rem;
    justify-content: center;
    align-items: center;
    /* line-height: 0.50rem;*/
    background-color: #fff;
    font-size: 0.26rem;
    color: #2f2f2f;
    text-align: center;
  }
  .search{
    padding: 0 0.26rem;
    width: 100%;
    height: 0.9rem;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #e5e5e5;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
  }
  .icon-sousuo {
    margin: 0 0.17rem 0 0.32rem;
  }
  .sousuo-input {
    width: 80%;
  }
  .score-container{
    padding: 0 0.26rem;
    width: 100%;
    margin-top: 1.3rem;
  }
  .score-container ul{
    background: #fff;
  }
  .score-container ul li{
    padding:0.1rem 0.2rem;
  }
    .score-desc{
    display:inline-block;
        width:86%;
    }
</style>
