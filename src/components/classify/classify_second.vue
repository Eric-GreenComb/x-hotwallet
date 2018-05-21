<template>
  <!--二级分类-->
  <div class="container classify-second-container">
    <div id="common-scroll-nav">
      <ul class="disf common-list-ul">
        <template v-for="(item,index) in list">
          <li class="common-list common-active" id="common-active" v-if="params.class_id==item.id"
              @click="chooseActive(item)">
            {{item.name}}
          </li>
          <li class="common-list" v-else @click="chooseActive(item)">{{item.name}}</li>
        </template>
      </ul>
    </div>
    <div class="bor"></div>
    <!--商品列表-->
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
        <ul class="goods-list">
          <li v-for="(item,index) in goods" :id="'li'+item.id" @click="checkGoodsDesc(item.id)" class="goods-li disf">
              <div class="goods-pic">
                <img :src="item.pic" class="goods-pic-class" alt="图片加载失败">
              </div>
              <div class="goods-msg">
                <div class="goods-name goods-name1">
                  <span class="integrate" v-if="item.price.integral">{{'积分' + item.price.integral}}</span>
                  <span class="integrate" v-else>积分0</span>
                  <!--<span class="disib" v-if="item.goods_name.length>30">{{item.goods_name.substr(0,30)+'...'}}</span>-->
                  <!--<span class="disib" v-else>{{item.goods_name}}</span>-->
                  <span>{{item.goods_name}}</span>
                </div>
                <p class="disf goods-pri">
                  <span class="sign">￥</span>
                  <span class="goods-price">{{item.price.original_price}}</span>
                  <!--<span class="goods-price" v-if="isVip==0">{{item.original_price}}</span>
                  <span class="goods-price" v-else>{{item.price.price.vip_price}}</span>-->
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

  </div>

</template>

<script>
  import LoadMore from './../common_components/loadmore.vue';
  import {getgoods_classify, getgoods_byclass} from '../../api/index'

  export default {
    name: 'FinancialGroup',
    props: {},
    data() {
      return {
        //  上拉加载数据
        minHeight: 0,
        scrollTop: 0,
        containerHeight: 0,
        loading: false,
        allLoaded: false,
        bottomText: '上拉加载更多...',
        bottomStatus: '',
        pageNo: 1,
        totalPage: 1,
        isVip: 0,
        //classId: 0,s
        params: {
          class_id: 0,
          page: 1,
          number: 20
        },
        //类别
        list: [],
        //商品列表
        goods: [],
        isFirstEnter:false
      }
    },
    created() {
      this.$dialog.loading.close();
      this.isFirstEnter=true;
      //获取上一页面选中的类型、索引
      this.params.class_id = this.$route.params.id;
      this.getGoodsByClass();

    },
    mounted() {
      this.$dialog.loading.open();
      this.getClassify();
    },
    methods: {
      //获取分类
      getClassify() {
        this.$dialog.loading.open();
        var _this = this;
        getgoods_classify().then(function (res) {
          //console.log(res.data.data);
          _this.list = res.data.data;
          //获取选中的当前的位置，控制滑块滑动到当前选中
          setTimeout(function () {
            var active = document.getElementById('common-active').offsetLeft - 15;
            //console.log(active);
            document.getElementById('common-scroll-nav').scrollLeft = active;
            _this.$dialog.loading.close();
          }, 100);

        }).catch(function (err) {
          console.log(err)
        })
      },
      //切换选中
      chooseActive(item) {
        this.params.page=1;
        this.params.class_id = item.id;
        this.loading = false;
        this.allLoaded = false;
        this.goods=[];
        this.getGoodsByClass();
      },
      //根据分类查找商品
      getGoodsByClass() {
        var _this = this;
        getgoods_byclass(this.params).then(function (res) {
          //console.log(res.data.data.data);
          _this.totalPage = Math.ceil(Number(res.data.data.count) / Number(_this.params.number));
          //console.log( _this.totalPage);
          _this.goods = res.data.data.data;
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
        getgoods_byclass(this.params).then(function (res) {
          setTimeout(() => {
            _this.goods = _this.goods.concat(res.data.data.data);
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
      checkGoodsDesc(id){
        this.$router.push({
          path: '/main/goods_desc',
          query: {
            'id':id
          }
        })
      }
    },
    components: {
      'load-more': LoadMore
    },
    beforeRouteEnter(to, from, next) {
      // 路由导航钩子，此时还不能获取组件实例 `this`，所以无法在data中定义变量（利用vm除外）
      // 参考 https://router.vuejs.org/zh-cn/advanced/navigation-guards.html
      // 所以，利用路由元信息中的meta字段设置变量，方便在各个位置获取。这就是为什么在meta中定义isBack
      // 参考 https://router.vuejs.org/zh-cn/advanced/meta.html
      if(from.name=='goods_desc'){
        to.meta.isBack=true;
        //判断是从哪个路由过来的，
        //如果是page2过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
      }

      next();
    },
    activated() {
      if(!this.$route.meta.isBack|| this.isFirstEnter){
        // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
        this.params.page=1;
        this.params.class_id = this.$route.params.id;
        this.goods=[];
        this.loading = false;
        this.allLoaded = false;
        this.getClassify();
        this.getGoodsByClass();
      }
      // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
      this.$route.meta.isBack=false;
      this.isFirstEnter=false;

    },

  }
</script>
<style scoped="true">
  @import "../../../static/css/classify/classify_second.css";
</style>
