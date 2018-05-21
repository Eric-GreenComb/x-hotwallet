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
        <ul>
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

  import {getPersonScoreList} from '../../api/index'

  export default {
    data() {
      return {
        minHeight: '',
        list: [],
        params: {
          token: localStorage.getItem('token'),
          page: 1,
          number: 15,
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
        //classId: 0,
      }
    },
    created() {
      this.$dialog.loading.close();
      this.minHeight = localStorage.getItem('minHeight');
      this.getInteralList();
    },
    mounted() {


    },
    methods: {
      //获取积分列表
      getInteralList() {
        var _this = this;
        getPersonScoreList(this.params).then(function (res) {
          //console.log('res', res.data.data.data);
          var data = res.data.data.data;
          _this.totalPage = Math.ceil(Number(res.data.data.count) / Number(_this.params.number));
          _this.list = data;
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
        getPersonScoreList(this.params).then(function (res) {
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

  .li {
    padding: 0.19rem 0.29rem;
    background: #fff;
    border-bottom: 1px solid #eee;
  }

  .desc-p {
    justify-content: space-between;
  }

  .desc-title {
    font-size: 0.28rem;
    color: #2f2f2f;
  }

  .integral-num1 {
    font-size: 0.28rem;
    color: #b81f22;
  }

  .time {
    font-size: 0.22rem;
    color: #898989;
    margin-top: 0.16rem;
  }
</style>
