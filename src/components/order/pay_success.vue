<template>
  <div class="container" :style="'min-height:'+minHeight">
    <div class="bgf box">
      <img src="../../../static/img/order/pay-success.png" class="pay-success" alt="">
      <p class="texac text">订单支付成功！</p>
      <p class="row row1"><span>收货人：</span><span>{{user_name+'  '}}</span><span>{{mobile}}</span></p>
      <p class="row row2"><span>收货地址：</span><span>{{address}}</span></p>
      <p class="row real-pay"><span class="pay-text">实付款：</span><span class="sign">￥</span><span
        class="price">{{realTotal}}</span></p>
      <div class="btn-div">
        <router-link :to="'/main/order_desc/'+order_id">
          <button class="btn">查看订单</button>
        </router-link>
        <router-link to="/">
          <button class="btn">返回首页</button>
        </router-link>
      </div>

    </div>

  </div>
</template>

<script>
  import {get_order_detail} from '../../api/index'
  export default {
    data() {
      return {
        minHeight: '',
        user_name: '',
        mobile: '',
        address: '',
        realTotal: '',
        order_id:''
      }
    },
    created() {
      this.$dialog.loading.close();
      this.minHeight = localStorage.getItem('minHeight');
      this.order_id=this.$route.params.order_id;
      this.getDetail();


    },
    mounted() {


    },
    methods: {
      //获取订单详情
      getDetail(){
        var _this=this;
        this.$dialog.loading.open('');
        get_order_detail({'token':localStorage.getItem('token'),'order_id':this.order_id}).then(function (res) {
          //console.log('des==',res);
          var data=res.data.data;
          _this.user_name=data.user_name;
          _this.mobile=data.mobile;
          _this.address=data.simple_adress+' '+data.detail_adress;
          _this.realTotal=Number(data.total_price)-Number(data.voucher_price);
          _this.$dialog.loading.close();
        }).catch(function (err) {
          console.log(err);
        })
      }
    }
  }
</script>
<style scoped="true">
  .container {
    background: #eee;
  }

  .pay-success {
    width: 2.4rem;
    margin-left: 37%;
  }

  .box {
    padding-top: 0.59rem;
  }

  .text {
    font-size: 0.36rem;
    color: #2f2f2f;
    font-weight: bold;
    padding-bottom: 1.1rem;
  }

  .row {
    margin-left: 0.27rem;
    font-size: 0.28rem;
    color: #2f2f2f;
  }

  .row1 {
    padding-bottom: 0.16rem;
    font-weight: bold;
  }

  .row2 {
    padding-bottom: 0.3rem;
    border-bottom: 1px solid #eee;
  }

  .sign {
    color: #b81f23;
    font-size: 0.24rem;
  }

  .price {
    color: #b81f23;
    font-size: 0.36rem;
  }

  .real-pay {
    padding-top: 0.15rem;
    font-size: 0.28rem;
    color: #2f2f2f;
  }

  .pay-text {
    font-weight: bold;
  }

  .btn {
    width: 2.6rem;
    height: 0.70rem;
    line-height: 0.70rem;
    text-align: center;
    border-radius: 2px;
    border: solid 1px #d2d2d2;
    font-size: 0.30rem;
    color: #2f2f2f;
  }

  .btn-div {
    padding: 1.15rem 0.65rem 0.54rem 0.65rem;
    display: flex;
    justify-content: space-around;
  }
</style>
