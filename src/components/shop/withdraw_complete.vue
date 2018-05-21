<template>
  <div class="container" :style="'min-height:'+minHeight">
    <div class="box texac">
      <i class="icon iconfont icon-iconfontxuanzhong"></i>
      <p class="ti">提现申请已提交</p>
      <p class="tip">预计3个工作日内到账</p>
    </div>
    <ul>
      <li class="row" v-if="type=='card'">
        <div>银行卡</div>
        <div><span>{{bank_name+' '}}</span><span>尾号</span><span>{{card}}</span></div>
      </li>
      <li class="row" v-else>
        <div>支付宝</div>
        <div><span>{{alicount}}</span></div>
      </li>
      <li class="row">
        <div>提现金额</div>
        <div><span>{{money}}</span><span>元</span></div>
      </li>
      <li class="row">
        <div>账户余额</div>
        <div class="remain"><span>{{bonus}}</span><span>元</span></div>
      </li>
    </ul>
    <button class="btn" @click="finish">完成</button>



  </div>
</template>

<script>
  import {getPerson_homepageInfo} from '../../api/index'
  export default {
    data() {
      return {
        minHeight: '',
        bonus:'',
        type:'',
        bank_name:'',
        card:'',
        alicount:'',
        money:''
      }
    },
    created() {
      this.$dialog.loading.close();
      this.minHeight = localStorage.getItem('minHeight');
      var obj=JSON.parse(sessionStorage.getItem('recordInfo'));
     // console.log(obj);
      this.type=obj.type;
      this.money=obj.money;
      if(this.type=='card'){
        this.bank_name=obj.bank_name;
        this.card=obj.card;
      }else{
        this.alicount=obj.alicount;
      }
      this.getPersonBouns();

    },
    methods: {
      //获取账户余额
      getPersonBouns() {
        var _this = this;
        getPerson_homepageInfo({'invite_code': localStorage.getItem('invite_code')}).then(function (res) {
          //console.log(res.data.data);
          var data = res.data.data;
          _this.bonus = data.bonus;
        }).catch(function (err) {
          console.log(err);
        })
      },
      finish(){
        sessionStorage.removeItem('recordInfo');
        this.$router.push('/main/shop');
      }
    }
  }
</script>
<style scoped="true">
  .container {
    background: #eee;
  }

  .box {
    padding: 0.52rem 0 0.94rem 0;
    background: #fff;
  }

  .icon-iconfontxuanzhong {
    font-size: 1.2rem;
    color: #14b507;
  }

  .ti {
    font-size: 0.30rem;
    color: #2f2f2f;
    margin-top: 0.3rem;
    font-weight: bold;
  }

  .tip {
    font-size: 0.24rem;
    color: #898989;
    margin-top: 0.17rem;
  }

  .row {
    padding: 0.26rem 0.38rem;
    background: #fff;
    display: flex;
    justify-content: space-between;
    font-size: 0.28rem;
    color: #2f2f2f;
  }
  .remain{
    color: #247edb;
  }
  .btn {
    width: 6.90rem;
    height: 0.80rem;
    background-color: #b81f23;
    border-radius: 2px;
    border:0;
    display: block;
    margin:0.9rem auto 0 auto;
    text-align: center;
    line-height: 0.8rem;
    font-size: 0.30rem;
    color: #ffffff;
  }
</style>
