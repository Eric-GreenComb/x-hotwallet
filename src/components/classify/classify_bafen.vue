<template>
  <div class="container classify-container">
    <div class="disf top">
      <div class="disf input-box"><i class="icon iconfont icon-sousuo"></i><input type="text" @click="toSearch"
                                                                                  class="sousuo-input"
                                                                                  placeholder="请输入要搜索的商品"></div>
      <router-link to="/main/shoppingcart"><i class="icon iconfont  icon-gouwuche"></i></router-link>
      <router-link class="xiaoxi-box" to="/main/news"><i class="icon iconfont icon-xiaoxi"></i></router-link>

    </div>
    <div class="disf bot">
      <ul class="ul-box">
        <template v-for="(item,index) in list">
          <li class="list" @click="showType(index)">
            <span>{{item.name}}</span>
            <span class="red-active" v-if="activeIndex==index"></span>
          </li>
        </template>
      </ul>
      <div class="right-container">

        <!--轮播图-->
        <div class="swiper-container">
          <div class="swiper-wrapper">

          </div>
          <ul class="pagination-ul">
            <template v-for="n in 3">
              <li class="pagination activePagination" v-if="bannerIndex==n-1"></li>
              <li class="pagination" v-else></li>
            </template>
          </ul>
        </div>
        <p class="current-type">{{currentType}}</p>
        <ul class="ul">
          <template v-for="(value,i) in list" v-if="activeIndex==i">
            <li class="list2" v-for="(item,index) in value.subs">
              <router-link :to="'/main/classifysecond/'+value.id+'/'+item.id">
                <div class="goods-pic">
                  <img :src="item.pic" class="goods-img"  alt="">
                </div>
                <p>{{item.name}}</p>
              </router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {getgoods_classify} from '../../api/index'

  export default {
    data() {
      return {
        //当前选中类别
        activeIndex: 0,
        currentType: '----',
        bannerIndex: 0,
        list: [],
        //轮播图
        bannerlist: []
      }
    },
    created() {
      this.$dialog.loading.close();
      sessionStorage.setItem('activeIndex', 1);
      this.getClassify();
    },
    mounted() {
      var _this = this;
      var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: true,//可选选项，自动滑动
        on: {
          slideChangeTransitionStart: function () {
            _this.bannerIndex=this.realIndex;
          },
        },
      });
    },
    methods: {
      //获取分类
      getClassify() {
        var _this = this;
        getgoods_classify().then(function (res) {
          //console.log(res.data.data);
          _this.list = res.data.data;
          _this.currentType='- '+_this.list[0].name+' -';
          _this.$dialog.loading.close();
        }).catch(function (err) {
          console.log(err)
        })
      },
      //类别切换
      showType(index) {
        this.activeIndex = index;
        this.currentType = '- ' + this.list[index].name + ' -';
      },
      //搜索
      toSearch() {
        this.$router.push('/main/search');

      }
    }


  }
</script>
<style scoped="true">
  @import "../../../static/css/classify/classify.css";
</style>
