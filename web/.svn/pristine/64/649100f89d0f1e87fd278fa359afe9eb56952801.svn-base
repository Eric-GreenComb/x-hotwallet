<template>
  <div class="container new-container">
    <!--轮播图-->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <template v-for="item in items">
          <div class="swiper-slide">
            <img class="banner-pic" :src="item.pic " alt="" @click="bannerLink(item.infor_type , item.subject_id)"  :style="'width:'+clientWidth+';height:'+bannerHeight">
          </div>
        </template>
      </div>
      <ul class="pagination-ul">
        <template v-for="n in bannerList.length">
          <li class="pagination activePagination" v-if="bannerIndex==n-1"></li>
          <li class="pagination" v-else></li>
        </template>
      </ul>
    </div>
    <!-- 上拉加载更多,解注释 -->
    <load-more
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      :bottomPullText='bottomText'
      :auto-fill="false"
      @bottom-status-change="handleBottomChange"
      ref="loadmore">
      <!--      这里写加载内容-->
      <div class="box bor-top">
        <ul class="disf like-ul">
          <li class="scroll-li like-li" v-for="item in newList">
            <router-link :to="'/main/goods_desc?id='+item.id">
              <div class="like-bg-box disf">
                <img :src="item.pic" class="goods-pic" alt="">
              </div>
              <span class="integrate">{{'积分' + item.price.integral}}</span>
              <p class="grounp-name" v-if="item.goods_name.length<12">{{item.goods_name}}</p>
              <p class="grounp-name" v-else>{{item.goods_name.substr(0, 11) + '...'}}</p>
              <p class="price-p disf">
                <span class="sign">￥</span>
                <span class="price">{{item.price.original_price}}</span>
                <!--               <span class="price" v-if="isVip==0">{{item.price.original_price}}</span>
                               <span class="price" v-else>{{item.price.vip_price}}</span>-->
              </p>
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

    <!--商品列表-->

  </div>
</template>

<script>
  import LoadMore from './../common_components/loadmore.vue';
  import {get_new_elect, get_top_banner} from './../../api/index'

  export default {
    data() {
      return {
        activeIndex: '0',
        bannerIndex: 0,
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
        params: {
          page: 1,
          number: 10
        },
        newList: [],
        //轮播图
        items: [],
        bannerList: [],
        clientWidth: '',
        bannerHeight: ''
      }
    },
    created() {
      this.$dialog.loading.close();
      this.clientWidth = localStorage.getItem('clientWidth');
      //轮播图高度
      this.bannerHeight = Number(this.clientWidth.split('px')[0]) / 750 * 360 + 'px';
      this.getNewList();
      this.getBanner();

    },
    mounted() {
      var _this = this;
      var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: true,//可选选项，自动滑动
        on: {
          slideChangeTransitionStart: function () {
            _this.bannerIndex = this.realIndex;
          },
        },
      });
    },
    methods: {
      //获取轮播图
      getBanner() {
        var _this = this;
        this.$dialog.loading.open();
        get_top_banner({'type': 'new_elect'}).then(function (res) {
          // console.log('bbbbbbbbbbbbbb',res.data.data);
          _this.bannerList = res.data.data;
          _this.items = res.data.data;
          //配置轮播图模块，因swiper插件slider的img为动态获取时会出现无法滑动，原因是swiper初始化是会计算slider的长度，通过这种方法即可解决
          /*var slideHtml = '';
          _this.bannerList.forEach(function (item) {
            slideHtml += '      <div class="swiper-slide">\n' +
              '          <img class="banner-pic" src="' + item.pic + '" alt="" @click="bannerLink(' + item.infor_type + ',' + item.subject_id + ')" style="width:' + _this.clientWidth + ';height:' + _this.bannerHeight + '">\n' +
              '        </div>'
          });
          var swiper_wrapper = document.getElementsByClassName('swiper-wrapper')[0];
          swiper_wrapper.innerHTML = slideHtml;*/
          var mySwiper = new Swiper('.swiper-container', {
            initialSlide: 0,
            observer: true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents: true,//修改swiper的父元素时，自动初始化swiper
            loop: true,
            autoplay: true,
            on: {
              slideChange: function () {
                //轮播图循环播放时，用realIndex获取真实索引值
                _this.bannerIndex = Number(this.realIndex);
              }
            }
          });
          //轮播图配置end
          _this.$dialog.loading.close();
        }).catch(function (err) {
          console.log(err);
          _this.$dialog.loading.close();

        })
      },
      //获取内容列表
      getNewList() {
        var _this = this;
        this.$dialog.loading.open();
        get_new_elect(_this.params).then(function (res) {
          console.log('data', res.data.data.data);
          _this.totalPage = Math.ceil(Number(res.data.data.count) / Number(_this.params.number));
          _this.newList = res.data.data.data;
          _this.$dialog.loading.close();
        }).catch(function (err) {
          console.log(err);
          _this.$dialog.loading.close();
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
        get_new_elect(this.params).then(function (res) {
          setTimeout(() => {
            _this.newList = _this.newList.concat(res.data.data.data);
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
      bannerLink(type, id) {
        var _this = this;
        switch (type) {
          case 'goods':
            _this.$router.push('/main/goods_desc?id=' + id);
            break;
          case 'activity':
            _this.$router.push('/main/activity_desc/' + id);
            break;
          case 'article':
            _this.$router.push('/main/material_desc/' + id);
            break;
          case 'web':
            _this.$router.push('/main/web_desc/' + id);
            break;
        }
      }
    },
    components: {
      'load-more': LoadMore
    }
  }
</script>
<style scoped="true">
  @import "../../../static/css/index/new_recommend.css";
</style>
