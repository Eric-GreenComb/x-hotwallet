<template>
  <section class="finan">
    <!-- 上拉加载更多 -->
    <load-more
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      :bottomPullText='bottomText'
      :auto-fill="false"
      @bottom-status-change="handleBottomChange"
      ref="loadmore">
      <div>
        <!--      这里写加载内容-->
        <ul class="goods-list">
          <li class="goods-li disf" v-for="(item,index) in goods" :id="'li'+item.id">
            <div class="goods-pic" :style="'background-image: url('+item.pic+')'"></div>
            <div class="goods-msg">
              <p class="goods-name">{{item.goods_name}}</p>
              <p class="disf goods-pri">
                <span class="sign">￥</span>
                <span class="goods-price" v-if="isVip==1">{{item.price.vip_price}}</span>
                <span class="goods-price" v-else>{{item.price.original_price}}</span>
              </p>
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
  </section>
</template>
<script>
  import {getgoods_byclass} from '../../api/index'
  import LoadMore from './../common_components/loadmore.vue';

  export default {
    name: 'FinancialGroup',
    props: {},
    data() {
      return {
        isVip: 1,
        goods: [],
        //  上拉加载数据
        minHeight: 0,
        scrollTop: 0,
        containerHeight: 0,
        loading: false,
        allLoaded: false,
        bottomText: '上拉加载更多...',
        bottomStatus: '',
        pageNo: 1,
        totalCount: '3',
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      /* 下拉加载 */
      _scroll: function (ev) {
        ev = ev || event;
        this.minHeight = this.$refs.innerScroll.minHeight;
        this.scrollTop = this.$refs.innerScroll.scrollTop;
        this.containerHeight = this.$refs.innerScroll.offsetHeight;
      },
      loadBottom: function () {
        //console.log('loadBoeeom');
        var _this = this;
        var obj = {
          class_id: 41,
          page: 1,
          number: 5
        };
        this.pageNo += 1;   // 每次更迭加载的页数
        obj.page = this.pageNo;
        if (this.pageNo > this.totalCount) {
          // 当allLoaded = true时上拉加载停止
          this.loading = false;
          this.allLoaded = true;
          return;
        }
        this.loading = true;

        getgoods_byclass(obj).then(function (res) {
          setTimeout(() => {
            _this.goods = _this.goods.concat(res.data.data);
            this.$nextTick(() => {
              this.loading = false;
            })
          }, 1000)
          console.log(res.data.data);

        }).catch(function (err) {
          console.log(err);
        })
        /*        api.commonApi(后台接口，请求参数) 这个api是封装的axios有不懂的可以看vue2+vuex+axios那篇文章
                  .then(res => {
                    setTimeout(() => {
                      要使用的后台返回的数据写在setTimeout里面
                      this.$nextTick(() => {
                        this.loading = false;
                      })
                    }, 1000)
                  });*/
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      getData() {
        var obj = {
          class_id: 41,
          page: 1,
          number: 5
        };
        var _this = this;
        getgoods_byclass(obj).then(function (res) {
          _this.goods = res.data.data;
          console.log(res.data.data);

        }).catch(function (err) {
          console.log(err);
        })
      }
    },
    components: {
      'load-more': LoadMore
    }
  }
</script>
<style scoped="true">
  @import "../../../static/css/classify/classify_second.css";
</style>
