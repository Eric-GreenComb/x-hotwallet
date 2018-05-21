0.<template>
  <div class="container con">
    <!--头部-->
    <yd-navbar class="navbar" title="业务培训" :fixed="true" fontsize="0.36rem" color="#2f2f2f" height="1rem">
      <router-link to="/shop_school" slot="left">
        <yd-navbar-back-icon color="#2f2f2f"></yd-navbar-back-icon>
      </router-link>

    </yd-navbar>
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

    <!-- 上拉加载更多，课件列表 -->
    <load-more
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      :bottomPullText='bottomText'
      :auto-fill="false"
      @bottom-status-change="handleBottomChange"
      ref="loadmore">
      <div>
        <!--      这里写加载内容-->
        <ul class="material-list" v-show="materialList.length>=1">
          <li class="material-li" v-for="item in materialList">
            <img :src="item.pic" class="material-pic" alt="图片加载失败">
            <p class="title">{{item.title}}</p>
            <p class="disf msg"><span class="tag_name">{{'#' + item.tag_name}}</span><span
              class="create_time">{{item.creat_time}}</span></p>
          </li>
        </ul>
        <ul class="material-list material-no-list" v-show="materialList.length==0">
          <p class="no-data">暂无数据...</p>
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
  import LoadMore from '../common_components/loadmore.vue';
  import {get_material_tags, getmaterial_bytags} from '../../api/index'

  export default {
    data() {
      return {
        /*more*/
        isVip: 1,
        materialList: [],
        //  上拉加载数据
        minHeight: 0,
        scrollTop: 0,
        containerHeight: 0,
        loading: false,
        allLoaded: false,
        bottomText: '上拉加载更多...',
        bottomStatus: '',
        pageNo: 1,
        totalPage: '1',
        /*more*/
        choosed: '全部',
        tagLists: [],
        params: {
          tag_id: 0,
          page: 1,
          number: 5
        },
        isFirstEnter:false
      }
    },
    created() {
      this.isFirstEnter=true;
      this.$dialog.loading.close();
      this.getTags();
      this.getMaterialByTags();
    },
    mounted() {
      var noList = document.getElementsByClassName('material-no-list')[0].offsetTop;
      var minHeight = localStorage.getItem('minHeight');
      var height = Number(minHeight.split('px')[0]) - noList + 'px';
      //console.log('==', height);
      document.getElementsByClassName('material-no-list')[0].style.minHeight = height;

    },
    methods: {
      //业务培训，获取课件分类
      getTags() {
        var _this = this;
        /*this.isLoading(true);*/
        get_material_tags().then(function (res) {
          _this.tagLists = res.data.data;
          //console.log(res.data.data);
          /*          _this.isLoading(false);*/
        }).catch(function (err) {
          console.log(err);
        })
      },
      //切换选中类别
      chooseActive(name, id) {
        this.choosed = name;
        this.params.tag_id = id;
        this.loading = false;
        this.allLoaded = false;
        this.params.page=1;
        this.getMaterialByTags();

      },
      //上拉加载
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
        getmaterial_bytags(_this.params).then(function (res) {
          setTimeout(() => {
            _this.materialList = _this.materialList.concat(res.data.data);
            this.$nextTick(() => {
              this.loading = false;
            })
          }, 1000);
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
      //根据分类获取课件
      getMaterialByTags() {
        var _this = this;
        /*this.isLoading(true);*/
        getmaterial_bytags(this.params).then(function (res) {
          //console.log(res.data.data.data);
          _this.totalPage = Math.ceil(Number(res.data.data.count) / Number(_this.params.number));
          //console.log(_this.totalPage)
          _this.materialList = res.data.data.data;
          /*   _this.isLoading(false);*/
        }).catch(function (err) {
          console.log(err);
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
      if(from.name=='material_desc'){
        to.meta.isBack=true;
        //判断是从哪个路由过来的，
        //如果是page2过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
      }
      next();
    },
    activated() {
      if(!this.$route.meta.isBack|| this.isFirstEnter){
        // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
        this.getTags();
        this.getMaterialByTags();
      }
      // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
      this.$route.meta.isBack=false;
      this.isFirstEnter=false;

    },

  }
</script>
<style scoped="true">
  .material-list {
    padding-top: 0.8rem;
  }

  .material-li {
    padding: 0.3rem;
    border-top: 0.14rem solid #eee;
    border-bottom: 0.14rem solid #eee;
  }

  .material-pic {
    width: 100%;
    border-radius: 4px;
  }

  .title {
    font-size: 0.28rem;
    font-weight: bold;
    color: #2f2f2f;
    margin: 0.16rem 0;
  }

  .msg {
    justify-content: space-between;
  }

  .tag_name {
    font-size: 0.22rem;
    color: #247edb;
  }

  .create_time {
    font-size: 0.22rem;
    color: #898989;
  }

  .navbar-bottom-line-color:after {
    border-color: #fff !important;
  }

  .material-no-list {
    background: #eee;
  }

  .no-data {
    text-align: center;
    margin-top: 20%;

  }
</style>
