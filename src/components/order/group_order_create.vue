<template>
  <div class="container order-create-container" :style="'min-height:'+minHeight">
    <div class="msg-container" v-if="address.mobile!==undefined" @click="chooseAddress()">
      <p class="msg bgf"><span class="username">{{address.user_name}}</span><span
        class="mobile">{{address.mobile}}</span>
        <span class="default-btn" v-if="address.is_default==1">默认</span>
      </p>
      <p class="bgf address"><i
        class="icon iconfont icon-shouhuodizhi"></i><span>{{address.simple_adress + ' ' + address.detail_adress}}</span>
      </p>
      <i class="icon iconfont icon-youjiantou right-icon"></i>
      <img src="../../../static/img/order/address-border.png" class="address-border" alt="">
    </div>
    <div class="msg-container" v-else @click="chooseAddress()">
      <p class="bgf no-default-address"><span>请选择收货地址</span>
      </p>
      <i class="icon iconfont icon-youjiantou right-icon"></i>
      <img src="../../../static/img/order/address-border.png" class="address-border" alt="">
    </div>

    <div class="good disf">
      <img :src="goodChoosed.pic" class="good-pic" alt="">
      <div class="right-div">
        <p class="good-name">{{goodChoosed.goodsName}}</p>
        <p class="disf size"><span>{{goodChoosed.names}}</span><span>{{'x' + goodChoosed.count}}</span></p>
        <p class="price"><span>￥</span><span class="price-num">{{goodChoosed.price}}</span><span
          class="goods-price gray-price">{{'￥' + goodChoosed.original_price}}</span></p>
      </div>
    </div>
    <div class="mark">
      <span>备注：</span>
      <input type="text" class="mark-input" placeholder="对此次交易的说明" v-model="remarks">
    </div>
    <!--<div class="quan disf bgf">
      <span>优惠券</span>
      <p><span>暂无可用</span><i class="icon iconfont icon-youjiantou right-icon1"></i></p>
    </div>-->
    <div class="bgf">
      <p class="disf row">
        <span>商品金额</span>
        <span>{{'￥' + goodsTotal}}</span>
      </p>
      <!--      <p class="disf row post">
              <span>运费</span>
              <span>{{'+￥' + freight}}</span>
            </p>-->
      <!--    <p class="disf row">
            <span>总金额</span>
            <span class="total-price">{{'￥' + total}}</span>
          </p>-->
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
    <p class="disf row bgf" v-if="pay_type=='other'">
      <span>账户余额</span>
      <span class="total-price">{{'￥' + accountMoney}}</span>
    </p>


    <div class="bottom-btn disf">
      <div class="left-btn">
        <p class="total-p"><span>总金额：</span><span>{{'￥' + total}}</span></p>
        <!--  <p class="post-p"><span>运费：</span><span>{{'￥' + freight}}</span></p>-->
      </div>
      <div class="submit-button" @click="submitOrder()">提交订单</div>
    </div>

  </div>
</template>

<script>
  import {get_default_address, creat_group_order, getPersonInfo} from '../../api/index'

  export default {
    data() {
      return {
        minHeight: '',
        remarks: '',
        address: {},
        freight: '',
        total: 0,
        goodsTotal: 0,
        goodChoosed: {},
        isVip: 0,
        pay_type: 'wei',
        accountMoney: 0
      }
    },
    created() {
      this.$dialog.loading.close();
      this.isVip = localStorage.getItem('isVip');
      this.goodChoosed = JSON.parse(sessionStorage.getItem('goodChoosed'));
      console.log('goodChoosed', this.goodChoosed);
      this.goodsTotal = Number(this.goodChoosed.count) * Number(this.goodChoosed.price);
      if (sessionStorage.getItem('remarks')) {
        this.remarks = sessionStorage.getItem('remarks');
      }
      if (sessionStorage.getItem('pay_type')) {
        this.pay_type = sessionStorage.getItem('pay_type');
      }
      //判断是否是重新发起的拼团
      if (this.$route.params.isNewGroup) {
        sessionStorage.setItem('groupInviter', localStorage.getItem('invite_code'));
      }
      this.getDefaultAddress();
      this.getAccount();
      this.wxutils.wxConfig();
    },
    mounted() {
      //获取可用屏幕高度
      this.minHeight = localStorage.getItem('minHeight');
    },
    methods: {
      //获取默认地址
      getDefaultAddress() {
        var _this = this;
        _this.$dialog.loading.open('');
        get_default_address({'token': localStorage.getItem('token')}).then(function (res) {
          if (sessionStorage.getItem('orderAddress')) {
            _this.address = {};
            _this.address = JSON.parse(sessionStorage.getItem('orderAddress'));
          } else {
            _this.address = res.data.data.address;
          }
          _this.freight = res.data.data.freight;
          _this.total = Number(_this.goodsTotal);
          //_this.total = Number(_this.freight) + Number(_this.goodsTotal);
          _this.$dialog.loading.close();
        }).catch(function (err) {
          console.log(err);
        })
      },
      //提交订单
      submitOrder() {
        var _this = this;
        if (this.pay_type == 'other' && parseFloat(this.accountMoney) < parseFloat(this.total)) {
          _this.$dialog.toast({
            mes: '账户余额不足',
            timeout: 1000
          });
          return;
        }
        var groupInviter;
        if (sessionStorage.getItem('groupInviter') == 0 || sessionStorage.getItem('groupInviter') == null || sessionStorage.getItem('groupInviter') == 'undefined') {
          groupInviter = '';
        } else {
          groupInviter = sessionStorage.getItem('groupInviter');
        }

        //无收货地址时传0
        if (isNaN(Number(_this.address.id))) {
          _this.address.id = 0;
        }
        if(_this.address.id == 0){
          this.$dialog.toast({
            mes: '请选择收货地址',
            timeout: 1500
          });
          return;
        }

        var obj = {
          'token': localStorage.getItem('token'),
          'invite_code': groupInviter,
          'goods_id': _this.goodChoosed.goods_id,
          'group_id': _this.goodChoosed.group_id,
          'number': _this.goodChoosed.count,
          'price_id': _this.goodChoosed.price_id,
          'address_id': _this.address.id,
          'remarks': _this.remarks,
          'total_price': _this.goodsTotal,
          'total_integral': Number(_this.goodChoosed.integral) * Number(_this.goodChoosed.count),
          'source_code': '',
          'pay_type': _this.pay_type,
          'voucher_id':0

        };
        creat_group_order(obj).then(function (res) {
          var data = res.data.data;
          if (res.data.errcode == 0) {
            sessionStorage.removeItem('orderAddress');
            sessionStorage.removeItem('remarks');
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
                  _this.$router.push('/main/group_invite/' + data.order_id);
                }
              });
            } else {
              _this.$dialog.toast({
                mes: '支付成功',
                timeout: 1000,
                icon: 'success'
              });
              setTimeout(function () {
                _this.$router.push('/main/group_invite/' + data.order_id);
              }, 1100)
            }
          } else {
            if (res.data.errcode == 6) {
              _this.$dialog.confirm({
                title: '提示',
                mes: '该团已满员，是否重新发起拼单',
                opts: () => {
                  sessionStorage.setItem('groupInviter', localStorage.getItem('invite_code'));
                  _this.submitOrder();
                }
              });
            } else {
              _this.$dialog.toast({
                mes: res.data.errdesc,
                timeout: 1500
              });
            }

          }

        }).catch(function (err) {
          console.log(err);
        })
      },
      //选择收货地址
      chooseAddress() {
        sessionStorage.setItem('remarks', this.remarks);
        this.$router.push('/main/choose_address?back=/main/group_order_create/' + this.$route.params.isNewGroup);
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
      //选择付款方式
      choose_pay_type(type) {
        sessionStorage.setItem('remarks', this.remarks);
        this.$router.push('/main/pay/' + type + '?back=/main/group_order_create/'+ this.$route.params.isNewGroup)
      }
    },

  }
</script>
<style scoped="true">
  @import "../../../static/css/order/order_create.css";

  .gray-price {
    color: #898989;
    text-decoration: line-through;
  }

</style>
