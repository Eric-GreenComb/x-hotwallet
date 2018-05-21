<template>
  <!--二级分类-->
  <div class="container classify-second-container">
    <div id="common-scroll-nav">
      <ul class="disf common-list-ul">
        <template v-for="(value,i) in list" v-if="id==value.id">
          <template v-for="(item,index) in value.subs">
            <template v-if="params.class_id==0">
              <li class="common-list common-active" id="common-active" v-if="index==0"
                  @click="chooseActive(item)">
                {{item.name}}
              </li>
              <li class="common-list" v-else @click="chooseActive(item)">{{item.name}}</li>
            </template>
            <template v-else>
              <li class="common-list common-active" id="common-active" v-if="params.class_id==item.id"
                  @click="chooseActive(item)">
                {{item.name}}
              </li>
              <li class="common-list" v-else @click="chooseActive(item)">{{item.name}}</li>
            </template>

          </template>
        </template>
      </ul>
    </div>
    <div class="bor"></div>
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
          <li v-for="(item,index) in goods" :id="'li'+item.id">
            <router-link :to="'/main/goods_desc/'+item.id" class="goods-li disf">
              <div class="goods-pic">
                <img :src="item.pic" class="goods-pic-class" alt="图片加载失败">
              </div>
              <div class="goods-msg">
                <p class="goods-name">
                  <span class="integrate" v-if="item.price.integral">{{'积分' + item.price.integral}}</span>
                  <span class="integrate" v-else>积分0</span>
                  <span class="disib">{{item.goods_name}}</span></p>
                <p class="disf goods-pri">
                  <span class="sign">￥</span>
                  <span class="goods-price">{{item.original_price}}</span>
               <!--   <span class="goods-price" v-if="isVip==0">{{item.original_price}}</span>
                  <span class="goods-price" v-else>{{item.price.price.vip_price}}</span>-->
                </p>
              </div>
            </router-link>

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
        id: 0,
        isVip: 0,
        //classId: 0,
        params: {
          class_id: 0,
          page: 1,
          number: 5
        },
        //类别
        list: [],
        //商品列表
        goods: []
      }
    },
    created() {
      this.$dialog.loading.close();
      //获取上一页面选中的类型、索引
      this.id = this.$route.params.id;
      this.params.class_id = this.$route.params.class_id;
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
        this.params.class_id = item.id;
        this.title = item.name;
        this.loading = false;
        this.allLoaded = false;
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
    },
    components: {
      'load-more': LoadMore
    }
  }
</script>
<style scoped="true">
  @import "../../../static/css/classify/classify_second.css";
</style>
