<template>
  <div class="container" :style="'min-height:'+minHeight">

    <!-- 上拉加载更多,解注释 -->
    <load-more
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      :bottomPullText='bottomText'
      :auto-fill="false"
      @bottom-status-change="handleBottomChange"
      ref="loadmore">
      <div>
        <!--      这里写加载内容-->
        <ul v-for="item in list">
          <li class="coupons-li" @click="choosed(item)">
            <div class="coupon-div">
              <img src="../../../static/img/shop/coupon-userful.png" class="coupons" alt="">
              <div class="red-block-text">
                <p class="value"><span class="sign">￥</span>{{item.price_value}}</p>
                <p class="condition"><span>满</span><span>{{item.limit_price}}</span><span>可用</span></p>
              </div>
              <div class="white-block-text">
                <p class="tit">满减券</p>
                <!--<p class="condition1">仅限美妆频道使用</p>-->
                <p class="time">
                  有效期：<span>{{item.start_date.split(' ')[0]}}</span>-<span>{{item.end_date.split(' ')[0]}}</span></p>
              </div>
            </div>
          </li>

        </ul>
      </div>
      <div v-show="loading" slot="bottom" class="loader-more-div">
        <img src="../../../static/img/loading.gif" class="loading-more-gif"><span class="loading-word">上拉加载更多...</span>
      </div>
      <div v-show="allLoaded" slot="bottom" class="loader-more-div">
        <span class="loading-word">已加载全部内容...</span>
      </div>
    </load-more>

  </div>
</template>

<script>
  import LoadMore from './../common_components/loadmore.vue';
  import {get_suit_voucher} from '../../api/index'

  export default {
    data() {
      return {
        minHeight: '',
        params: {
          token: localStorage.getItem('token'),
          page: 1,
          number: 10,
          order_price: 0,
        },
        list: [],
        //  上拉加载数据
        scrollTop: 0,
        containerHeight: 0,
        loading: false,
        allLoaded: false,
        bottomText: '上拉加载更多...',
        bottomStatus: '',
        pageNo: 1,
        totalPage: 1
      }
    },
    created() {
      this.$dialog.loading.close();
      this.minHeight = localStorage.getItem('minHeight');
      this.params.order_price = this.$route.params.order_price;
      this.getSuitVoucher();
    },
    methods: {
      //获取下单时可用优惠券列表
      getSuitVoucher() {
        var _this = this;
        get_suit_voucher(this.params).then(function (res) {
          _this.totalPage = Math.ceil(Number(res.data.data.count) / Number(_this.params.number));
          _this.list = res.data.data.data;
        }).catch(function (err) {
          console.log(err);
        })
      },
      //上拉加载
      loadBottom: function () {
        var _this = this;
        this.pageNo += 1;   // 每次更迭加载的页数
        this.params.page = this.pageNo;
        if (this.pageNo > this.totalPage) {
          // 当allLoaded = true时上拉加载停止
          this.loading = false;
          this.allLoaded = true;
          return;
        }
        this.loading = true;
        get_suit_voucher(this.params).then(function (res) {
          setTimeout(() => {
            _this.list = _this.list.concat(res.data.data.data);
            this.$nextTick(() => {
              this.loading = false;
            })
          }, 1000)
        }).catch(function (err) {
          console.log(err);
        })
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      //选择完优惠券后返回创建订单界面
      choosed(item) {
        sessionStorage.setItem('choosedVoucher', JSON.stringify(item));
        this.$router.push(this.$route.query.back);
      }
    },
    components: {
      'load-more': LoadMore
    }
  }
</script>
<style scoped="true">
  .container {
    background: #eee;
  }

  .ul {
    padding: 0.19rem 1.17rem 0 1.17rem;
    justify-content: space-between;
    background: #fff;
  }

  .type-li {
    font-size: 0.28rem;
    color: #2f2f2f;
    padding-bottom: 0.1rem;
    padding-left: 0.1rem;
  }

  .active {
    color: #b81f23;
    border-bottom: 2px solid #b81f23;
  }

  .coupons-li {
    /* padding: 0.3rem 0;*/
    margin: 0.34rem 0.2rem;
  }

  .coupons {
    width: 100%;
  }

  .coupon-div {
    width: 100%;
    position: relative;
    margin-top: 0.24rem;
  }

  .red-block-text {
    position: absolute;
    left: 0.49rem;
    top: 0.4rem;
  }

  .value {
    font-size: 0.70rem;
    color: #ffffff;
    margin-bottom: 0.09rem;
  }

  .sign {
    font-size: 0.30rem;
    color: #ffffff;
  }

  .condition {
    font-size: 0.20rem;
    color: #ffffff;
    padding-left: 0.15rem;
  }

  .white-block-text {
    height: 100%;
    position: absolute;
    left: 2.57rem;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 0.26rem;
    padding-bottom: 0.23rem;
  }

  .tit {
    font-size: 0.28rem;
    color: #2f2f2f;
  }

  .condition1 {
    font-size: 0.22rem;
    color: #898989;
  }

  .time {
    font-size: 0.22rem;
    color: #898989;
  }

  .icon-yishixiao {
    position: absolute;
    top: -0.2rem;
    right: 0.1rem;
    font-size: 1.4rem;
    color: #d2d2d2;
  }

  .tip {
    text-align: center;
    font-size: 0.26rem;
    color: #898989;
    margin-top: 0.36rem;
  }

  .no-order-div {
    width: 100%;
    margin-top: 2rem;
    position: relative;

  }

  .no-coupon-pic {
    width: 100%;
  }

  .no-order-text {
    position: absolute;
    width: 100%;
    text-align: center;
    bottom: 1.2rem;
    left: 0;
    font-size: 0.26rem;
    color: #898989;
  }

</style>
