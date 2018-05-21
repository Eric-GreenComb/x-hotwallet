<template>
  <div class="container" :style="'min-height:'+minHeight">
    <!--头部-->
    <!--分类-->
    <div id="common-scroll-nav">
      <ul class="disf common-list-ul">
        <li class="common-list common-active" v-if="choosed=='全部'" @click="chooseActive('全部',0)">全部</li>
        <li class="common-list" v-else @click="chooseActive('全部',0)">全部</li>
        <template v-for="(item,index) in tagLists">
          <li class="common-list common-active" v-if="choosed==item.name" @click="chooseActive(item.name,item.id)">
            {{item.name}}
          </li>
          <li class="common-list" v-else @click="chooseActive(item.name,item.id)">{{item.name}}</li>
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
      <div>
        <!--      这里写加载内容-->
        <ul class="material-list" v-if="materialList.length>0">
          <li class="material-li" v-for="item in materialList">
            <router-link :to="'/main/material_desc/'+item.id">
              <img :src="item.pic" class="material-pic" alt="图片加载失败">
              <p class="title">{{item.title}}</p>
              <p class="disf msg"><span class="tag_name">{{'#' + item.tag_name}}</span><span
                class="create_time">{{item.creat_time}}</span></p>
            </router-link>
          </li>
        </ul>
        <div class="material-list material-list1" :style="'min-height: '+minHeight" v-if="materialList.length==0">
          <p class="texac nomore">没有更多了~~</p>
        </div>
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
  import {get_material_tags, getmaterial_bytags} from '../../api/index'

  export default {
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
        /*more*/
        isVip: 0,
        materialList: [],
        //  上拉加载数据
        choosed: '全部',
        tagLists: [],
        params: {
          tag_id: 0,
          page: 1,
          number: 5
        }
      }
    },
    created() {
      this.minHeight = localStorage.getItem('minHeight');
      this.$dialog.loading.close();
      this.getTags();
      this.getMaterialByTags();
    },
    mounted() {

    },
    methods: {
      //业务培训，获取课件分类
      getTags() {
        var _this = this;
        _this.$dialog.loading.open();
        get_material_tags().then(function (res) {
          _this.tagLists = res.data.data;
          _this.$dialog.loading.close();
        }).catch(function (err) {
          console.log(err);
        })
      },
      //切换选中类别
      chooseActive(name, id) {
        this.choosed = name;
        this.params.tag_id = id;
        this.materialList = [];
        this.params.page = 1;
        this.getMaterialByTags();
      },

      //根据分类获取课件
      getMaterialByTags() {
        var _this = this;
        _this.$dialog.loading.open();
        getmaterial_bytags(this.params).then(function (res) {
          _this.totalPage = Math.ceil(Number(res.data.data.count) / Number(_this.params.number));
          var data = res.data.data.data;
          //console.log('res===',res)
          data.forEach(function (item) {
            item.creat_time = _this.utils.timeChange(item.creat_time);
          });
          _this.materialList = data;
          _this.$dialog.loading.close();
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
        getmaterial_bytags(this.params).then(function (res) {
          setTimeout(() => {
            _this.materialList = _this.materialList.concat(res.data.data.data);
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
  @import "../../../static/css/shop/business_training.css";
</style>
