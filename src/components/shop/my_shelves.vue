<template>
  <div class="container shelves-container" :style="'min-height: '+minHeight">
    <div class="bg">
      <img src="../../../static/img/shop/shelves-bg.png" alt="">
      <div class="msg">
        <div class="header-div">
          <img src="../../../static/img/shop/default_header.png" v-if="infor.head_pic==''" class="header" alt="">
          <img :src="infor.head_pic" v-else class="header" alt="">
        </div>
        <div>
          <p class="username">{{infor.nick_name}}</p>
          <p><span>商品 </span><span>{{goodsLen}}</span><span class="text">活动 </span><span>{{activityLen}}</span></p>
        </div>
      </div>
      <span class="share-btn" @click="shareShow=true">店铺分享</span>
    </div>
    <div class="sell-cover" :style="'height:'+minHeight" @click="shareShow=false" v-if="shareShow">
      <img src="../../../static/img/click-share.png" class="click-share" alt="">
    </div>
    <div class="type-div">
      <span class="type-span " :class="[active==0?'type-active':'']" @click="changeActive(0)">商品</span>
      <span class="type-span" :class="[active==1?'type-active':'']" @click="changeActive(1)">活动</span>
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
        <!--货架商品-->
        <ul class="goods ul" v-if="active==0&&list.length>0">
          <li class="goods-li" v-for="item in list">
            <img :src="item.pic" class="goods-pic" alt="" @click="checkGoodDesc(item.id)">
            <div class="goods-msg">
              <p><span class="integral">{{'积分' + item.price.integral}}</span><span class="goods-name">{{item.goods_name}}</span>
              </p>
              <div class="disf price-div">
                <div class="price">
                  <!-- <span class="sign">￥</span><span v-if="isVip==1">{{item.price.vip_price}}</span>
                   <span v-else>{{item.price.original_price}}</span>-->
                  <span>{{item.price.original_price}}</span>
                </div>
                <i class="icon iconfont icon-xiajia" @click="shelvesDown(item.id,'goods')"></i>
              </div>
            </div>

          </li>
        </ul>
        <!--货架活动-->
        <ul class="activities ul" v-if="active==1&&list.length>0">
          <li class="activity-li" v-for="item in list">
            <router-link :to="'/main/activity_desc/'+item.id">
              <img :src="item.cover_pic" class="activity-pic" alt="">
            </router-link>
            <div class="down-div">
              <i class="icon iconfont icon-xiajia" @click="shelvesDown(item.id,'activity')"></i>
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
  import {getMy_shelves, add_shelves, getmy_shelves_infor} from '../../api/index'
  import config from '../../api/config'

  export default {
    data() {
      return {
        //  上拉加载数据
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
        minHeight: '',
        active: 0,
        params: {
          invite_code: '',
          page: 1,
          number: 10,
          type: 'goods',
        },
        list: [],
        shareShow: false,
        infor: {
          head_pic: ''
        },
        goodsLen: 0,
        activityLen: 0,
        inviter:'0'
      }
    },
    created() {
      this.isVip = localStorage.getItem('isVip');
      this.minHeight = localStorage.getItem('minHeight');
      console.log(this.$route.query.shelves_owner);//货架分享时带的参数--货架主人的邀请码
      //为了区分是通过别人分享打开的货架还是自己的货架，获取货架内容的时候需要根据邀请码加载内容
      if (this.$route.query.shelves_owner) {
        //他人的货架
        this.params.invite_code = this.$route.query.shelves_owner;
      } else {
        //自己的货架
        if (localStorage.getItem('invite_code')) {
          this.params.invite_code = localStorage.getItem('invite_code');
        } else {
          //查看自己货架时未登录的情况
          sessionStorage.setItem('redirect', '/main/my_shelves');
          //没登录
          this.$router.push({
            path: '/unlogin',
            query: {redirect: '/main/my_shelves'}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
        }
        if(this.$route.query.inviter){
          this.inviter=this.$route.query.inviter;
        }
      }
      this.getMyShelves();

    },
    mounted() {
      this.getInfor();
      this.getLen();
    },
    methods: {
      //初始时获取活动的数量
      getLen() {
        var _this = this;
        var obj = {
          invite_code: this.params.invite_code,
          page: 1,
          number: 10,
          type: 'activity',
        };
        getMy_shelves(obj).then(function (res) {
          _this.activityLen = res.data.data.count;
        }).catch(function (err) {
          console.log(err);
        })
      },
      //获取个人信息
      getInfor() {
        var _this = this;
        getmy_shelves_infor({'invite_code': this.params.invite_code}).then(function (res) {
          _this.infor = res.data.data;
          /*分享start----货架分享出去带的参数shelves_owner,是货架主人的邀请码*/
          var invite_code=0;
          if(localStorage.getItem('invite_code')){
            invite_code=localStorage.getItem('invite_code');  //inviter的值有两种可能，登录状态下是自己的邀请码，否则为0
          }
          var UrlAttr = (decodeURIComponent(location.href)).split('#');
          var param = '/main/my_shelves?shelves_owner=' +_this.params.invite_code+'&inviter='+ invite_code;//两个参数，店主和邀请人
          var link = config.redirect_url + "?host=" + encodeURIComponent(UrlAttr[0]) + "&param=" + encodeURIComponent(param);
          _this.wxutils.wxShare(_this.infor.nick_name, _this.infor.nick_name + '的91云店', link, _this.infor.head_pic);
          /*end*/
        }).catch(function (err) {
          console.log(err)
        })
      },
      //切换选中
      changeActive(type) {
        this.list = [];
        this.active = type;
        if (type == 0) {
          this.params.type = 'goods';
        } else {
          this.params.type = 'activity';
        }
        this.getMyShelves();
      },
      //获取我的货架列表
      getMyShelves() {
        var _this = this;
        this.$dialog.loading.open('');
        getMy_shelves(_this.params).then(function (res) {
          //console.log('res==',res);
          if (_this.params.type == 'goods') {
            _this.goodsLen = res.data.data.count;
          } else {
            _this.activityLen = res.data.data.count;

          }
          _this.totalPage = Math.ceil(Number(res.data.data.count) / Number(_this.params.number));
          _this.list = res.data.data.data;
          _this.$dialog.loading.close();
        }).catch(function (err) {
          console.log(err);
        })
      },//加载
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
        getMy_shelves(this.params).then(function (res) {
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
      //下架
      shelvesDown(id, type) {
        var _this = this;
        var obj = {
          token: localStorage.getItem('token'),
          goods_id: id,
          is_collect: 'n',
          type: type
        };
        add_shelves(obj).then(function (res) {
          console.log('res', res);
          if (res.data.errcode == 0) {
            _this.$dialog.toast({
              mes: '已下架',
              timeout: 1500
            });
            _this.getMyShelves();
          } else {
            _this.$dialog.toast({
              mes: res.data.errdesc,
              timeout: 1000
            });
          }
        }).catch(function (err) {
          console.log(err);
        })
      },
      //查看商品详情
      checkGoodDesc(id) {
        //其他人打开链接后，在购买商品时必须登录，购买完可以获得邀请码，分享时带上自己的邀请码，否则就是0，货主分享时会带上自己的邀请码
        this.$router.push({
          path: '/main/goods_desc',
          query: {
            'id':id,
            'shelves_owner': this.params.invite_code,
            'inviter': this.inviter
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
  @import "../../../static/css/shop/my_shelves.css";
</style>
