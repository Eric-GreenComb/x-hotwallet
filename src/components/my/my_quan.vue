<template>
  <div class="container my-quan-container" :style="'min-height:'+minHeight">
    <ul class="disf ul">
      <li class="type-li " :class="{'active':activeType==1}" @click="changeType(1)">
        <span>未使用</span><span>{{'（' + avaliableLen + '）'}}</span>
      </li>
      <li class="type-li" :class="{'active':activeType==0}" @click="changeType(0)">
        <span>已失效</span><span>{{'（' + noAvaliableLen + '）'}}</span>
      </li>
    </ul>
    <div class="no-order-div" v-show="list.length==0">
      <img src="../../../static/img/my/no-coupon.png" class="no-coupon-pic" alt="">
      <p class="no-order-text">您还没有相关抵用券哦~</p>
    </div>

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
        <ul>
          <li class="coupons-li" v-for="item in list">
            <div class="coupon-div">
              <img src="../../../static/img/shop/coupon-userful.png" v-show="activeType==1" class="coupons" alt="" @click="cancelPreview()">
              <img src="../../../static/img/shop/coupon-nouse.png" v-show="activeType==0" class="coupons" alt=""  @click="cancelPreview()">
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
              <i class="icon iconfont icon-yishixiao" v-show="activeType==0"></i>
              <i class="icon iconfont icon-erweima" v-show="activeType==1" @click="isShowCode=true"></i>

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


    <!--    <ul v-show="activeType==1" v-for="item in list">
          <li class="coupons-li">
            <div class="coupon-div">
              <img src="../../../static/img/shop/coupon-nouse.png" class="coupons" alt="">
              <div class="red-block-text">
                <p class="value"><span class="sign">￥</span>{{item.price_value}}</p>
                <p class="condition"><span>满</span><span>{{item.limit_price}}</span><span>可用</span></p>
              </div>
              <div class="white-block-text">
                <p class="tit">满减券</p>
                &lt;!&ndash;<p class="condition1">仅限美妆频道使用</p>&ndash;&gt;
                <p class="time">有效期：<span>{{item.start_date.split(' ')[0]}}</span>-<span>{{item.end_date.split(' ')[0]}}</span></p>
              </div>
              <i class="icon iconfont icon-yishixiao"></i>
            </div>
          </li>

        </ul>-->
    <p class="tip" v-if="list.length>0">没有更多了~</p>
    <div class="checkCodeCover" v-show="isShowCode">
      <div class="code-div">
        <i class="icon iconfont icon-erweima code-icon"></i>
      </div>
      <i class="icon iconfont icon-guanbi1" @click="isShowCode=false"></i>
    </div>

  </div>
</template>

<script>
  import LoadMore from './../common_components/loadmore.vue';
  import {get_voucher_list} from '../../api/index'

  export default {
    data() {
      return {
        minHeight: '',
        activeType: 1,//未使用1，已失效0
        noCoupon: false,
        avaliableLen: 0,
        noAvaliableLen: 0,
        list: [],
        no_avaliable_list: [],
        params: {
          token: localStorage.getItem('token'),
          page: 1,
          number: 10,
          is_available: 1,
        },
        //  上拉加载数据
        scrollTop: 0,
        containerHeight: 0,
        loading: false,
        allLoaded: false,
        bottomText: '上拉加载更多...',
        bottomStatus: '',
        pageNo: 1,
        totalPage: 1,
        isVip: 0,
        isShowCode: false
      }
    },
    created() {
      this.$dialog.loading.close();

    },
    mounted() {
      this.minHeight = localStorage.getItem('minHeight');
      this.getVoucherList(1);
      this.getNoAvaliableLen();

    },
    methods: {
      //切换类别
      changeType(type) {
        this.params.page = 1;
        this.list = [];
        this.activeType = type;
        this.getVoucherList(type);
      },
      //获取我的抵用券列表
      getVoucherList(is_available) {
        var _this = this;
        this.params.is_available = is_available;
        get_voucher_list(this.params).then(function (res) {
          _this.totalPage = Math.ceil(Number(res.data.data.count) / Number(_this.params.number));
          _this.list = res.data.data.data;
          if (is_available == 1) {
            _this.avaliableLen = res.data.data.count;
          } else {
            _this.noAvaliableLen = res.data.data.count;

          }
        }).catch(function (err) {
          console.log(err);
        })
      },
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
        get_voucher_list(this.params).then(function (res) {
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
      //获取已失效抵用券的数量
      getNoAvaliableLen() {
        var _this = this;
        this.params.is_available = 0;
        get_voucher_list(this.params).then(function (res) {
          _this.noAvaliableLen = res.data.data.count;
        }).catch(function (err) {
          console.log(err);
        })
      },
      cancelPreview(){}

    },
    components: {
      'load-more': LoadMore
    }

  }
</script>
<style scoped="true">
  @import "../../../static/css/my/my_quan.css";
</style>
