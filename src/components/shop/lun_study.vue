<template>
  <div class="container lun-study-container" :style="'min-height:'+minHeight">

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
        <ul class="list-ul"  v-if="studyList.length>0">
          <li class="list-li" v-for="(item,index) in studyList">
            <router-link :to="'/main/lun_desc/'+item.id">
              <p class="row disf nick-p"><span>{{item.author}}</span><span class="time">{{item.creat_time}}</span></p>
              <p class="row tag-p"><span class="tag" :class="[index%2==0?'':'tag1']">{{item.tag_name}}</span></p>
              <p class="row title">{{item.title}}</p>
              <p class="content" v-if="item.dis.length>43">{{item.dis.substr(0,41)+'...'}}</p>
              <p class="content" v-else>{{item.dis}}</p>
            </router-link>
          </li>
        </ul>
        <p class="texac nomore" v-if="studyList.length==0">没有更多数据~~</p>
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

  import {getStudy_article_list} from '../../api/index'

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
        studyList: [],
        params: {
          page: 1,
          number: 10
        },

      }
    },
    mounted() {
      this.$dialog.loading.close();
      this.minHeight = localStorage.getItem('minHeight');
      this.getStudyList();
    },
    methods: {
      getStudyList() {
        var _this = this;
        _this.$dialog.loading.open();
        getStudy_article_list(this.params).then(function (res) {
          _this.totalPage = Math.ceil(Number(res.data.data.count) / Number(_this.params.number));
          var data = res.data.data.data;
          data.forEach(function (item) {
            item.creat_time = _this.utils.timeChange(item.creat_time);
          });
          //console.log(data);
          _this.studyList = data;
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
        getStudy_article_list(this.params).then(function (res) {
          setTimeout(() => {
            _this.studyList = _this.studyList.concat(res.data.data.data);
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
  @import "../../../static/css/shop/lun_study.css";


</style>
