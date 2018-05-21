<template>
  <div class="container find-container" :style="'overflow:'+overflow+';height:'+height">
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
          <li class="row" >
             <router-link :to="'/set_pass'">
              <p class="title" >修改登录密码</p> <!--用户的-->
              </router-link>
              <router-link :to="'/reset_tel'">
              <p class="title">设置交易密码</p>  <!--账户的-->
              </router-link>
               <router-link :to="'/main/noPage'">
              <p class="title">导出备份</p>
               </router-link>
          </li>
        </ul>
      </div>
    </load-more>
    <footer-tab :index="2"></footer-tab>
  </div>
</template>
<script>
  import LoadMore from './../common_components/loadmore.vue';
  import FooterTab from '../common_components/footer_tab.vue'
  import {getFind_list} from '../../api/index'

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
        id: 0,
        list: [],
        isVip: 0,
        params: {
          page: 1,
          number: 15
        },
        isShowBigImg: false,
        bigImgPic: '',
        isFirstEnter: false,
        height:'auto',
        overflow:'auto',
      }
    },
    created() {
      this.$dialog.loading.close();
      this.isFirstEnter = true;
      this.minHeight = localStorage.getItem('minHeight');
      this.isVip = localStorage.getItem('isVip');
      sessionStorage.setItem('activeIndex', 2);
      //this.getFindList();
    },
    methods: {
      getFindList() {
        var _this = this;
        getFind_list(this.params).then(function (res) {
          _this.totalPage = Math.ceil(Number(res.data.data.count) / Number(_this.params.number));
          _this.list = res.data.data.data;
          _this.list.forEach(function (item) {
            item.creat_time = _this.utils.timeChange(item.creat_time);
          });
          console.log(_this.list);
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
        getFind_list(this.params).then(function (res) {
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
      //点击查看大图
      ShowBigImg(pic) {
        var container=document.getElementById('pic-container').offsetTop;
        console.log('top==',container);
        this.bigImgPic = pic;
        this.isShowBigImg = true;
      }
    },
    components: {
      'load-more': LoadMore,
      'footer-tab': FooterTab
    },
    beforeRouteEnter(to, from, next) {
      sessionStorage.setItem('activeIndex', 2);
      if (from.name == 'index' || from.name == 'goods_desc' || from.name == 'my' || from.name == 'shop') {
        console.log('isback');
        to.meta.isBack = true;
        //判断是从哪个路由过来的，
        //如果是page2过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
      }
      next();
    },
    activated() {
      if (!this.$route.meta.isBack || this.isFirstEnter) {
        console.log('test');
        // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
        this.params.page = 1;
        this.goods = [];
        this.loading = false;
        this.allLoaded = false;
        //this.getFindList();
      }
      // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
      this.$route.meta.isBack = false;
      this.isFirstEnter = false;

    },
  }
</script>
<style scoped="true">
  @import "../../../static/css/find.css";
 .row{
   font-family: '宋体';
 }
</style>
