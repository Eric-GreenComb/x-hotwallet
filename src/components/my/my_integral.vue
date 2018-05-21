<template>
  <div class="container" :style="'min-height:'+minHeight">
    <div class="bg-top">
      <img src="../../../static/img/my/integral-bg.png" class="bg-pic" alt="">
      <div class="disf top-text">
        <span>当前积分</span>
        <div><i class="icon iconfont icon-warning_icon"></i><span>积分规则</span></div>
      </div>
      <p class="integral-num">{{now_integral}}</p>
      <div class="title disf">
        <span>积分明细</span>
        <router-link to="/main/integral_desc" class="right-more">
          <span>查看更多</span><i class="icon iconfont icon-youjiantou"></i>
        </router-link>
      </div>
      <ul class="list-ul">
        <li class="li" v-for="item in list">
          <div class="disf desc-p">
            <span class="desc-title">{{item.dis}}</span>
            <div>
              <span class="integral-num1" v-if="item.type=='plus'">+</span>
              <span class="integral-num1" v-else>-</span>
              <span class="integral-num1">{{item.score}}</span>
            </div>
          </div>
          <p class="time">{{item.creat_time}}</p>
        </li>
      </ul>
      <p class="ti">-积分兑换-</p>
      <ul>
        <li class="disf voucher-li" v-for="item in voucherList">
          <img :src="item.pic_url" class="pic" alt="">
          <div class="right-div">
            <div class="voucher-title">
              <span>满</span><span>{{item.limit_price}}</span><span>-</span><span>{{item.price_value}}</span><span>抵用券</span>
            </div>
            <div class="button-div">
              <span>{{item.score + '积分'}}</span>
              <button class="btn" @click="exchange(item.id)">立即兑换</button>
            </div>
          </div>

        </li>

      </ul>
    </div>

  </div>
</template>

<script>
  import {getPersonScoreList, get_score_voucher, verb_voucher} from '../../api/index'

  export default {
    data() {
      return {
        minHeight: '',
        activeType: 0,
        list: [],
        noCoupon: false,
        params: {
          token: localStorage.getItem('token'),
          page: 1,
          number: 2,
        },
        voucherList: [],
        now_integral: ''
      }
    },
    created() {
      this.$dialog.loading.close();
      this.getInteralList();
      this.getVoucherList();

    },
    mounted() {
      this.minHeight = localStorage.getItem('minHeight');

    },
    methods: {
      //获取积分列表
      getInteralList() {
        var _this = this;
        this.$dialog.loading.open('');
        getPersonScoreList(this.params).then(function (res) {
          //console.log('res', res.data.data.data);
          var data = res.data.data.data;
          _this.now_integral = res.data.data.now_score;
          _this.list = data;
          _this.$dialog.loading.close();
        }).catch(function (err) {
          console.log(err);
        })
      },
      //获取可兑换的券列表
      getVoucherList() {
        var _this = this;
        this.$dialog.loading.open('');
        get_score_voucher().then(function (res) {
          console.log(res);
          _this.voucherList = res.data.data;
          _this.$dialog.loading.close();
        }).catch(function (err) {
          console.log(err);
        })
      },
      //积分兑换抵用券
      exchange(id) {
        var _this = this;
        var obj = {
          token: localStorage.getItem('token'),
          voucher_id: id,
          number: 1
        };
        verb_voucher(obj).then(function (res) {
          //console.log(res);
          if (res.data.errcode == 0) {
            _this.$dialog.toast({
              mes: '兑换成功',
              timeout: 1500
            });
          } else {
            _this.$dialog.toast({
              mes: res.data.errdesc,
              timeout: 1500
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
  @import "../../../static/css/my/my_integral.css";
</style>
