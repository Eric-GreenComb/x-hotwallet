<template>
  <div class="container" :style="'min-height:'+minHeight">
    <div class="bgf goods-box">
      <div class="disf bgf box" v-for="item in goods">
        <img :src="item.pic" class="goods-pic" alt="">
        <div class="center">
          <p class="goods-name">{{item.goods_name}}</p>
          <p class="goods-size">{{item.pvs_name}}</p>
        </div>
        <div>
          <p class="goods-price">{{'￥' + item.price}}</p>
          <p class="gooods-num">{{'x' + item.number}}</p>
        </div>
      </div>
    </div>

    <div class="box bgf box1">
      <div class="disf type-div" @click="show1 = true">
        <div>
          <span>申请类型：</span><span>{{type}}</span>
        </div>
        <i class="icon iconfont icon-xiajiantou-copy"></i>
      </div>
      <div class="disf type-div" @click="show2 = true">
        <div class="disf input-div">
          <span>退款原因：</span><input type="text" v-model="simple_reson" placeholder="请选择退款原因" disabled>
        </div>
        <i class="icon iconfont icon-xiajiantou-copy"></i>
      </div>
      <div class="disf type-div">
        <div>
          <span>退款金额：</span><span>￥</span><span>{{returnMoney}}</span><span class="tip1" v-if="voucher_money>0">{{' （优惠券抵用'+voucher_money+'）'}}</span>
        </div>
      </div>
      <textarea name="instruction" v-model="detail_reson" rows="5" placeholder="退款说明最多200字"></textarea>
      <p class="tip"><span>您还可以输入</span><span>{{remain}}</span><span>字</span></p>
    </div>
    <!--    <div class="box bgf">
          <p class="pic-p"><span>上传凭证</span><span class="pic-tip">（最多可上传3张图片）</span></p>
          <ul class="ul">
            <li class="pic-li disf">
              <img src="" alt="">

            </li>
            <li class="disf icon-li">
              <i class="icon iconfont icon-xiangji"></i>
              <p class="texac li-text">添加图片</p>
            </li>
          </ul>
        </div>-->
    <button class="btn" @click="uploadRefund()">提交申请</button>
    <yd-actionsheet :items="myItems1" v-model="show1"></yd-actionsheet>
    <yd-actionsheet :items="myItems2" v-model="show2"></yd-actionsheet>
  </div>
</template>

<script>
  import {get_order_detail, get_order_cancle, upload_return_order} from '../../api/index'

  export default {
    data() {
      return {
        minHeight: '',
        type: '仅退款',
        simple_reson: '',
        detail_reson: '',
        remain: 200,
        show1: false,
        myItems1: [
          {
            label: '仅退款',
            callback: () => {
              this.type = '仅退款';
            }
          },
          {
            label: '退货退款',
            callback: () => {
              this.type = '退货退款';
            }
          },

        ],
        show2: false,
        myItems2: [],
        goods: [],
        returnMoney: 0,
        voucher_money:0
      }
    },
    watch: {
      detail_reson(n, o) {
        var len = n.length;
        if (len >= 200) {
          this.detail_reson = n.substr(0, 200);
          this.remain = 0;
        } else {
          this.remain = 200 - Number(len);
        }

      }
    },
    created() {
      this.$dialog.loading.close();
      this.minHeight = localStorage.getItem('minHeight');
      this.order_id = this.$route.params.order_id;
      this.getOrderDesc();
      this.getReturnReason();
    },
    mounted() {


    },
    methods: {
      //获取订单详情
      getOrderDesc() {
        var obj = {
          'token': localStorage.getItem('token'),
          'order_id': this.order_id
        };
        this.$dialog.loading.open('正在加载');
        var _this = this;
        get_order_detail(obj).then(function (res) {
          //console.log(res);
          var data = res.data.data;
          _this.goods = data.goods;
          _this.returnMoney = Number(data.total_price) - Number(data.voucher_price);
          _this.voucher_money = Number(data.voucher_price);
          _this.$dialog.loading.close();
        }).catch(function (err) {
          console.log(err);
        })
      },
      //获取退款原因
      getReturnReason() {
        var _this = this;
        this.$dialog.loading.open('正在加载');
        get_order_cancle().then(function (res) {
          _this.$dialog.loading.close();
          //console.log(res.data.data);
          var data = res.data.data;
          data.forEach(function (item) {
            var obj = {
              label: item.content,
              callback: () => {
                _this.simple_reson = item.content;
              }
            }
            _this.myItems2.push(obj);
          });
          console.log(_this.myItems2);


        }).catch(function (err) {
          console.log(err);
        })
      },
      //提交退款申请
      uploadRefund(){
        var obj={
          'token':localStorage.getItem('token'),
          'type':this.type,
          'simple_reson':this.simple_reson,
          'detail_reson':this.detail_reson,
          'order_id':this.order_id
        };
        var _this=this;
        this.$dialog.loading.open('正在加载');
        upload_return_order(obj).then(function (res) {
          //console.log(res);
          _this.$dialog.loading.close();
          if(res.data.errcode==0){
            _this.$dialog.toast({
              mes: '申请成功，请在我的查看',
              timeout: 1000,
              icon: 'success'
            });
          }else{
            _this.$dialog.toast({
              mes: res.data.errdesc,
              timeout: 1000
            });
          }
        }).catch(function (err) {
          console.log(err);
        })
      }
    }
  }
</script>
<style scoped="true">
  @import "../../../static/css/order/refund.css";
</style>
