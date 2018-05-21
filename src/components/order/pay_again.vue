<template>
  <div class="container bg-container" :style="'min-height: '+minHeight">

    <div class="quan disf bgf">
      <span>优惠券</span>
      <div v-if="hasChoosedVoucher">
        <p @click="useVoucher()">
          <span>{{'满' + choosedVoucher.limit_price + '-' + choosedVoucher.price_value + '券'}}</span>
          <i class="icon iconfont icon-youjiantou right-icon1"></i>
        </p>
      </div>
      <div v-else>
        <p v-if="suitCount==0"><span class="nouse">暂无可用</span></p>
        <p v-if="suitCount>0" @click="useVoucher()">
          <span>{{suitCount + '张可用'}}</span>
          <i class="icon iconfont icon-youjiantou right-icon1"></i></p>
      </div>

    </div>
    <div class="price-div disf">
      <span>商品金额</span><span class="price">{{'￥' + total_price}}</span>
    </div>
    <div class="bgf disf price-row" v-if="hasChoosedVoucher">
      <span>优惠券</span><span>{{'-￥' + choosedVoucher.price_value}}</span>
    </div>
    <div class="bgf disf price-row should-div" v-if="hasChoosedVoucher">
      <span>实付款</span><span class="price">{{'￥' + shouldPay}}</span>
    </div>
    <div class="quan disf bgf pay_type" v-if="isVip==1">
      <span>支付方式</span>
      <div @click="choose_pay_type('wei')" v-if="pay_type=='wei'">
        <img src="../../../static/img/order/wx-pay.png" class="icon-logo icon-logo1" alt="">
        <span class="type">微信支付</span>
        <i class="icon iconfont icon-youjiantou right-icon1"></i>
      </div>
      <div @click="choose_pay_type('other')" v-if="pay_type=='other'">
        <img src="../../../static/img/order/account-pay.png" class="icon-logo" alt="">
        <span class="type">账户余额</span>
        <i class="icon iconfont icon-youjiantou right-icon1"></i>
      </div>
    </div>
    <div class="disf account bgf" v-if="pay_type=='other'">
      <span>账户余额</span>
      <span class="total-price">{{'￥' + accountMoney}}</span>
    </div>
    <button class="btn" @click="payAgain()">立即支付</button>
  </div>
</template>

<script>
  import {creat_orders, get_suit_count, getPersonInfo, pay_order} from '../../api/index'

  export default {
    data() {
      return {
        minHeight: '',
        pay_type: 'wei',
        hasChoosedVoucher: false,
        suitCount: 0,
        choosedVoucher: {},
        order_id: 0,
        total_price: 0,
        voucher_id: 0,
        isVip: 0,
        accountMoney: 0

      }
    },
    created() {
      this.$dialog.loading.close();
      this.isVip = localStorage.getItem('isVip');
      this.order_id = this.$route.params.order_id;
      this.total_price = this.$route.params.total_price;
      if (sessionStorage.getItem('choosedVoucher')) {
        this.hasChoosedVoucher = true;
        this.choosedVoucher = JSON.parse(sessionStorage.getItem('choosedVoucher'));
        this.voucher_id = this.choosedVoucher.id;
        this.shouldPay = Number(this.total_price) - Number(this.choosedVoucher.price_value);
      } else {
        this.hasChoosedVoucher = false;
        this.voucher_id = 0;
        this.choosedVoucher = {};
        this.getSuitVoucherCount();
      }
      if (sessionStorage.getItem('pay_type')) {
        this.pay_type = sessionStorage.getItem('pay_type');
      }
      if (this.pay_type == 'other') {
        this.getAccount();
      }
      this.wxutils.wxConfig();

    },
    mounted() {
      //获取可用屏幕高度
      this.minHeight = localStorage.getItem('minHeight');
    },
    methods: {
      //获取可用优惠券的数量
      getSuitVoucherCount() {
        var obj = {
          token: localStorage.getItem('token'),
          order_price: this.total_price
        };
        var _this = this;
        get_suit_count(obj).then(function (res) {
          _this.suitCount = res.data.data.count;
        }).catch(function (err) {
          console.log(err);
        })
      },
      //选择可用优惠券
      useVoucher() {
        sessionStorage.setItem('remarks', this.remarks);
        this.$router.push({
          path: '/main/order_create_voucher/' + this.total_price,
          query: {back: '/main/pay_again/' + this.order_id + '/' + this.total_price}
        })
      },
      //选择付款方式
      choose_pay_type(type) {
        this.$router.push('/main/pay/' + type + '?back=/main/pay_again/' + this.order_id + '/' + this.total_price)
      },
      //获取账户余额
      getAccount() {
        var _this = this;
        getPersonInfo({'token': localStorage.getItem('token')}).then(function (res) {
          console.log('getAccount==', res);
          _this.accountMoney = res.data.data.bonus_enable;
        }).catch(function (err) {
          console.log(err);
        })
      },
      payAgain() {
        var _this = this;
        var obj = {
          token: localStorage.getItem('token'),
          order_id: this.order_id,
          pay_type: this.pay_type,
          voucher_id: this.voucher_id,
        };
        pay_order(obj).then(function (res) {
          //console.log('pay', res);
          var data = res.data.data;
          if (res.data.errcode == 0) {
            sessionStorage.removeItem('choosedVoucher');
            sessionStorage.removeItem('pay_type');
            if (_this.pay_type == 'wei') {
              var order_sign = data.order_sign;
              wx.chooseWXPay({
                timestamp: order_sign.timeStamp.replace(/s/g, "S"), // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: order_sign.nonceStr, // 支付签名随机串，不长于 32 位
                package: order_sign.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                signType: order_sign.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: order_sign.paySign, // 支付签名
                success: function (res) {
                  // 支付成功后的回调函数
                  _this.$router.push('/main/pay_success/' + data.order_id);
                }
              });
            } else {
              _this.$dialog.toast({
                mes: '支付成功',
                timeout: 1000,
                icon: 'success'
              });
              setTimeout(function () {
                _this.$router.push('/main/pay_success/' + data.order_id);
              }, 1100)
            }
          } else {
            _this.$dialog.toast({
              mes: res.data.errdesc,
              timeout: 1000
            });
          }
        }).catch(function (err) {
          console.log(err);
        })
      }
    },
  }
</script>
<style scoped="true">
  .bgf {
    background: #fff;
  }

  .price-div {
    justify-content: space-between;
    background: #fff;
    padding: 0.3rem 0.3rem 0.2rem 0.3rem;
    font-size: 0.28rem;
  }

  .price-row {
    justify-content: space-between;
    padding: 0.3rem 0.3rem;
    color: #898989;
    font-size: 0.26rem;
  }

  .should-div {
    font-size: 0.28rem;
    color: #2f2f2f;
  }

  .quan {
    border-bottom: 0.14rem solid #eee;
    padding: 0.3rem;
    font-size: 0.28rem;
    color: #2f2f2f;
    justify-content: space-between;
    align-items: center;
  }

  .pay_type {
    border-top: 0.14rem solid #eee;
    border-bottom: 0;
  }

  .icon-logo {
    width: 0.35rem;
    display: inline-block;
    margin-right: 0.07rem;
    vertical-align: bottom;
  }

  .icon-logo1 {
    vertical-align: middle;
  }

  .row {
    padding: 0.4rem;
  }

  .price {
    color: #b81f23;
  }

  .account {
    display: flex;
    justify-content: space-between;
    padding: 0.3rem;
    font-size: 0.28rem;
    color: #2f2f2f;
  }

  .total-price {
    color: #b81f23;
  }

  .right-icon1 {
    font-size: 0.26rem;
    color: #898989;
  }

  .btn {
    width: 6.90rem;
    height: 0.80rem;
    line-height: 0.80rem;
    text-align: center;
    background-color: #b81f23;
    border-radius: 2px;
    font-size: 0.30rem;
    color: #ffffff;
    display: block;
    margin: 1.38rem auto 0 auto;
    border: 0;
  }
</style>
