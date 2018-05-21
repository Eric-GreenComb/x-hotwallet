<template>
  <div class="container">
    <div class="search-top disf">
      <div class="search-box disf">
        <i class="icon iconfont icon-sousuo"></i>
        <input type="text" class="search-input" v-model="params.key_word" autofocus="autofocus" @blur="getSearchList"
               placeholder="请输入要搜索的商品">
      </div>
      <router-link :to="from"><span class="cancel">取消</span></router-link>
    </div>
    <div class="history-div" v-if="searched">
     <!-- <p class="row ti disf history-ti"><span>历史记录</span><i class="icon iconfont icon-shanchu"
                                                            @click="deleteHistory"></i>
      </p>
      <p class="history disf"><span @click="search('舒化奶')">舒化奶</span></p>
      <div class="bor"></div>
      <p class="row ti">热门搜索</p>
      <p class="history disf"><span class="red">口红</span><span class="red">保健品</span><span>食用油</span><span>米面粮油</span>
      </p>-->
    </div>
    <div v-else>
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
            <li v-for="item in searchGoodsList" class="goods-li disf" @click="checkDesc(item.id)">
                <div class="goods-pic">
                  <img :src="item.pic" class="goods-pic-class" alt="">
                </div>
                <div class="goods-msg">
                  <div class="goods-name goods-name1">
                    <span class="integrate" v-if="item.price.integral">{{'积分' + item.price.integral}}</span>
                    <span class="integrate" v-else>积分0</span>

                    <span class="bt">{{item.goods_name}}</span>
                  </div>
                  <p class="disf goods-pri">
                    <span class="sign">￥</span>
                    <span class="goods-price">{{item.price.original_price}}</span>
                    <!--                  <span class="goods-price" v-if="isVip==0">{{item.original_price}}</span>
                                      <span class="goods-price" v-else>{{item.price.price.vip_price}}</span>-->
                  </p>
                </div>

            </li>

          </ul>
        </div>
        <div v-show="loading" slot="bottom" class="loader-more-div">
          <img src="../../../static/img/loading.gif" class="loading-more-gif"><span
          class="loading-word">上拉加载更多...</span>
        </div>
        <div v-show="allLoaded" slot="bottom" class="loader-more-div">
          <span class="loading-word">已加载全部内容...</span>
        </div>
      </load-more>


    </div>


  </div>
</template>

<script>
  import LoadMore from './../common_components/loadmore.vue';
  import {search_goods} from '../../api/index'

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
        isVip: 0,
        from: '',
        searched: true,
        searchGoodsList: [],
        params: {
          key_word: '',
          page: 1,
          number: 5
        }
      }
    },
    created() {
      this.$dialog.loading.close();
      this.from = localStorage.getItem('from');
      this.getSearchList();
    },
    methods: {
      deleteHistory() {
        this.$dialog.confirm({
          mes: '确认删除全部历史记录！',
          opts: () => {
            this.$dialog.toast({mes: '你点了确定', timeout: 1000});
          }
        });
      },
      search(history) {
        this.params.key_word = history;
        this.getSearchList();
      },
      getSearchList() {
        var _this = this;
        if (_this.params.key_word == '') {
          _this.searched = true;
        } else {
          _this.searched = false;
          search_goods(this.params).then(function (res) {
            //console.log(res);
            _this.totalPage = Math.ceil(Number(res.data.data.count) / Number(_this.params.number));
            _this.searchGoodsList = res.data.data.data;
          }).catch(function (err) {
            console.log(err);
          })
        }

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
        search_goods(this.params).then(function (res) {
          setTimeout(() => {
            _this.searchGoodsList = _this.searchGoodsList.concat(res.data.data.data);
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
      checkDesc(id){
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
    }
  }
</script>
<style scoped="true">
  .search-top {
    padding: 0.12rem 0.36rem;
    align-items: center;
    border-bottom: 1px solid #eee;
  }

  .search-box {
    align-items: center;
    background-color: #ededed;
    border-radius: 4px;
    color: #a4a4a4;
    font-size: 0.28rem;
    padding: 0.14rem 0.22rem;
    flex: 1;
  }

  .search-input {
    width: 100%;
  }

  .icon-sousuo {
    margin-right: 0.17rem;
  }

  .cancel {
    font-size: 0.28rem;
    color: #2f2f2f;
    margin-left: 0.23rem;
  }

  .row {
    padding: 0.33rem 0.31rem;
  }

  .ti {
    font-size: 0.26rem;
    color: #898989;
  }

  .history {
    padding: 0 0.31rem;

  }

  .history-ti {
    justify-content: space-between;
  }

  .history span {
    padding: 0.1rem 0.15rem;
    border-radius: 4px;
    border: solid 1px #b5b5b5;
    font-size: 0.24rem;
    color: #2f2f2f;
    margin-right: 0.3rem;
  }

  .history .red {
    border: solid 1px #b81f23;
    color: #b81f23;
  }

  .bor {
    height: 0.14rem;
    background-color: #eeeeee;
    margin-top: 0.3rem;
  }

  .icon-shanchu {
    font-size: 0.3rem;
  }

  .classify-second-container {
    padding-top: 0.8rem;
  }

  .bor {
    height: 0.14rem;
    background-color: #eeeeee;
  }

  #common-scroll-nav {
    top: 0;
  }

  .goods-list {
    padding: 0 0.27rem 0 0.27rem;
  }

  .goods-li {
    /*padding: 0.25rem 0;*/
    height:2.2rem;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-bottom: 1px solid #eeeeee;
  }

  .goods-pic {
    width: 1.9rem;
    height: 1.9rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .goods-pic-class {
    width: 100%;
    height: 100%;
  }

  .goods-msg {
    height: 100%;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 0.2rem 0 0.45rem 0.27rem /* padding-bottom: 0.55rem;*/;
  }

  .goods-name {
    padding-top: 0.13rem;
    font-size: 0.28rem;
    line-height: 1.6;
    color: #2f2f2f;
    vertical-align: bottom;
    margin-bottom: 0.1rem;
  }

  .goods-name1{
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    /* autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    white-space: normal;
    -webkit-line-clamp: 2;
  }

  .goods-pri{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: #b81f23;
  }

  .sign {
    font-size: 0.24rem;
    color: #2f2f2f;
  }

  .goods-price {
    font-size: 0.3rem;
    color: #2f2f2f;
  }

  .sign1 {
    font-size: 0.31rem;
    color: #c3c3c3;
  }

  .profit {
    font-size: 0.24rem;
    color: #b81f23;
  }

  .profit-value {
    font-size: 0.3rem;
    color: #b81f23;
  }
  .bt{

  }

  .integrate {
    padding: 0.04rem 0.12rem;
    display: inline-block;
    text-align: center;
    background-color: #f27878;
    border-radius: 2px;
    color: #fff;
    font-size: 0.2rem;
    margin-right: 0.15rem;
    line-height: normal;
    /* float: left; */
  }
  input::input-placeholder {
    font-size: 0.26rem;
    color: #a4a4a4;
  }

  input::-webkit-input-placeholder {
    font-size: 0.26rem;
    color: #a4a4a4;
  }

  input:-ms-input-placeholder {
    font-size: 0.26rem;
    color: #a4a4a4;
  }

  input:-moz-placeholder {
    font-size: 0.26rem;
    color: #a4a4a4;
  }

  input::-moz-placeholder {
    font-size: 0.26rem;
    color: #a4a4a4;
  }

</style>
