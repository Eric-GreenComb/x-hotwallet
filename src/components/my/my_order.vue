<template>
  <div class="container my-order-container">
    <div id="common-scroll-nav">
      <ul class="disf common-list-ul">
        <li class="common-list" :class="{'common-active':activeIndex==0}" @click="changeActive(0,'all')">
          全部
        </li>
        <li class="common-list" :class="{'common-active':activeIndex==1}"
            @click="changeActive(1,'paying')">
          待付款
        </li>
        <li class="common-list" :class="{'common-active':activeIndex==2}"
            @click="changeActive(2,'confirming')">
          待分享
        </li>
        <li class="common-list" :class="{'common-active':activeIndex==3}"
            @click="changeActive(3,'payed')">
          待发货
        </li>
        <li class="common-list" :class="{'common-active':activeIndex==4}"
            @click="changeActive(4,'dispatch')">
          待收货
        </li>
        <li class="common-list" :class="{'common-active':activeIndex==5}"
            @click="changeActive(5,'commenting')">
          待评价
        </li>
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
        <ul class="order-list">
          <li class="box-li" v-for="item in orderList">
            <p class="order-num-p disf row"  @click="checkOrderDesc(item.id)">
              <span>{{'订单号：' + item.order_number}}</span>
              <span class="status" v-if="item.state=='paying'">待付款</span>
              <span class="status" v-if="item.state=='confirming'">待分享</span>
              <span class="status" v-if="item.state=='payed'">待发货</span>
              <span class="status" v-if="item.state=='dispatch'">待收货</span>
              <span class="status" v-if="item.state=='commenting'">待评价</span>
              <span class="status" v-if="item.state=='completed'">交易完成</span>
              <span class="status" v-if="item.state=='returning'">退款处理中</span>
              <span class="status" v-if="item.state=='returned'">已退款</span>
            </p>
            <div class="box disf row" v-for="good in item.goods" :class="item.type+'-'+good.id"
                 @click="checkOrderDesc(item.id)">
              <img :src="good.pic" class="good-pic" alt="">
              <div class="right-good">
                <p class="good-name">{{good.goods_name}}</p>
                <p class="good-size">{{good.pvs_name}}</p>
              </div>
            </div>
            <p class="msg"><span>共</span><span>{{item.goods.length}}</span><span>件，合计</span><span class="red-price">{{'￥' + item.total_price}}</span>
          <!--    <span class="gray">{{'（含运费￥' + item.freight + '）'}}</span>-->
            </p>
            <p class="btn-p">
              <!--待付款-->
              <button class="btn" v-if="item.state=='paying'" @click="cancelOrder(item.id)">取消订单</button>
              <button class="btn red-btn" v-if="item.state=='paying'" @click="payAgain(item)">付款</button>
              <!--待分享-->
              <button class="btn red-btn" v-if="item.state=='confirming'" @click="showShare(item)">邀请好友拼单</button>

              <!--待发货-->
              <!--<button class="btn" v-if="item.state=='payed'">提醒发货</button>-->


              <!--待收货-->
              <button class="btn" v-if="item.state=='dispatch'" @click="checkLogistics(item)">查看物流</button>
              <button class="btn red-btn" v-if="item.state=='dispatch'" @click="confirmReceive(item.id)">确认收货</button>

              <!--待评价-->
              <button class="btn red-btn" v-if="item.state=='commenting'" @click="comment(item.id)">去评价</button>
              <!--交易完成-->
              <button class="btn red-btn" v-if="item.state=='completed'" @click="deleteOrder(item.id)">删除订单</button>


            </p>
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

    <div class="no-order-div" v-if="orderList.length==0">
      <img src="../../../static/img/my/no-order.png" class="no-order-pic" alt="">
      <p class="no-order-text">您还没有相关订单哦</p>
    </div>
    <cover :isShowSize="isShowComment" :closeByZhao="true" @coverClose="coverClose">
      <div class="star-box">
        <p class="comment-tip-p"><span class="cancel" @click="coverClose">取消</span><span class="ok"
                                                                                         @click="submitComment">确定</span>
        </p>
        <p class="star-ti">请您对此次购物评分~</p>

        <div class="star-div">

          <i class="icon iconfont icon-xingxing  defaultClass" id="icon0" @click="commentStar($event,0)"></i>
          <i class="icon iconfont icon-xingxing  defaultClass" id="icon1" @click="commentStar($event,1)"></i>
          <i class="icon iconfont icon-xingxing  defaultClass" id="icon2" @click="commentStar($event,2)"></i>
          <i class="icon iconfont icon-xingxing  defaultClass" id="icon3" @click="commentStar($event,3)"></i>
          <i class="icon iconfont icon-xingxing  defaultClass" id="icon4" @click="commentStar($event,4)"></i>
        </div>
      </div>
    </cover>
    <div class="sell-cover" :style="'height:'+minHeight" @click="shareShow=false" v-if="shareShow">
      <img src="../../../static/img/click-share.png" class="click-share" alt="">
    </div>


  </div>
</template>

<script>
  import LoadMore from './../common_components/loadmore.vue'
  import Cover from '../common_components/cover.vue'
  import {get_my_orderlist,upload_order_comment,confirm_receive,getOrderTracesByJson,delete_order,cancle_order} from '../../api/index'
  import config from '../../api/config'

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
        activeIndex: 0,
        params: {
          token: '',
          page: 1,
          number: 20,
          state: 'all',
        },
        orderList: [],
        isShowComment: false,
        commentId: '',
        score:0,
        shareShow:false,
        isFirstEnter:false
      }
    },
    created() {
      this.$dialog.loading.close();
      this.isFirstEnter=true;
      this.minHeight=localStorage.getItem('minHeight');
      this.activeIndex = Number(this.$route.params.type);
      switch (this.activeIndex){
        case 0: this.params.state = 'all';break;
        case 1: this.params.state = 'paying';break;
        case 2: this.params.state = 'confirming';break;
        case 3: this.params.state = 'payed';break;
        case 4: this.params.state = 'dispatch';break;
        case 5: this.params.state = 'commenting';break;
      }
      this.params.token = localStorage.getItem('token');
      this.getMyOrderList();
    },
    methods: {
      //切换滚动导航
      changeActive(index, state) {
        var _this = this;
        this.loading = false;
        this.allLoaded = false;
        this.orderList = [];
        this.activeIndex = index;
        this.params.state = state;
        this.params.page=1;
        this.getMyOrderList();

      },
      //获取我的订单列表
      getMyOrderList() {
        var _this = this;
        this.$dialog.loading.open('');
        get_my_orderlist(this.params).then(function (res) {
          //console.log(res.data.data.data);
          _this.totalPage = Math.ceil(Number(res.data.data.count) / Number(_this.params.number));
          var data = res.data.data.data;
          _this.orderList = data;
          _this.$dialog.loading.close();
        }).catch(function (err) {
          console.log(err)
        })
      },
      //上拉加载内容
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
        get_my_orderlist(this.params).then(function (res) {
          setTimeout(() => {
            _this.orderList = _this.orderList.concat(res.data.data.data);
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
      //查看订单详情
      checkOrderDesc(id) {
        this.$router.push('/main/order_desc/' + id);
      },
      //子组件发射事件遮罩层关闭coverClose
      coverClose(bool) {
        //bool为子组件通过自定义事件close穿过来的值
        this.isShowComment = false;
        this.changeAllStarGray();
      },
      //评价弹窗关闭时，把所有的星星都变为灰色
      changeAllStarGray() {
        for (var i = 0; i < 5; i++) {
          var icon = document.getElementById('icon' + i);
          if (icon.className.match(new RegExp("(\\s|^)" + 'choosedClass' + "(\\s|$)"))) {
            icon.className = icon.className.replace(new RegExp("(\\s|^)" + 'choosedClass' + "(\\s|$)"), " defaultClass");
          }
        }
      },
      //评价框
      comment(id) {
        this.isShowComment = true;
        this.commentId = id;
      },
      //星星点击事件
      commentStar(event, index) {
        //console.log(event,index);
        //console.log(event.target.className);
        this.score=Number(index)+1;
        for (var i = 0; i < 5; i++) {
          var icon = document.getElementById('icon' + i);
          if (i == index) {
            if (icon.className.match(new RegExp("(\\s|^)" + 'defaultClass' + "(\\s|$)"))) {
              icon.className = icon.className.replace(new RegExp("(\\s|^)" + 'defaultClass' + "(\\s|$)"), " choosedClass");
            }
          } else if (i < index) {
            if (icon.className.match(new RegExp("(\\s|^)" + 'defaultClass' + "(\\s|$)"))) {
              icon.className = icon.className.replace(new RegExp("(\\s|^)" + 'defaultClass' + "(\\s|$)"), " choosedClass");
            }
          } else if (i > index) {
            if (icon.className.match(new RegExp("(\\s|^)" + 'choosedClass' + "(\\s|$)"))) {
              icon.className = icon.className.replace(new RegExp("(\\s|^)" + 'choosedClass' + "(\\s|$)"), " defaultClass");
            }
          }

        }
      },
      //提交评价
      submitComment() {
        var _this = this;
        var obj={
          'order_id':this.commentId,
          'token':localStorage.getItem('token'),
          'score':this.score,
        };
        upload_order_comment(obj).then(function (res) {
          console.log(res);
          if(res.data.errcode==0){
            _this.isShowComment = false;
            _this.changeAllStarGray();
            _this.$dialog.toast({
              mes: '发表成功',
              timeout: 1000
            });

          }else{
            _this.$dialog.toast({
              mes: res.data.errdesc,
              timeout: 1000
            });
          }

        }).catch(function (err) {
          console.log(err);
        })
      },
      //付款
      payAgain(item){
        this.$router.push('/main/pay_again/'+item.id+'/'+item.total_price)
      },
      //邀请好友拼单
      showShare(item){
        this.$router.push('/main/order_desc/'+item.id);
        /*this.shareShow=true;
        var _this=this;
        var UrlAttr = (decodeURIComponent(location.href)).split('#');
        var param = '/main/grounp_desc/' + item.group_id + '?groupInviter=' + item.invite_code;
        var link = config.redirect_url + "?host=" + encodeURIComponent(UrlAttr[0]) + "&param=" + encodeURIComponent(param);
        _this.wxutils.wxShare(item.goods[0].goods_name, item.goods[0].goods_name, link, item.goods[0].pic);*/
      },
      //确认收货
      confirmReceive(id){
        var _this = this;
        confirm_receive({'token':localStorage.getItem('token'),'order_id':id}).then(function (res) {
          console.log('res==',res);
          if(res.data.errcode==0){
            _this.$dialog.toast({
              mes: '确认收货成功',
              timeout: 1000,
              icon: 'success'
            });
          }else{
            _this.$dialog.toast({
              mes: res.data.errdesc,
              timeout: 1000
            });
          }
        }).catch(function (err) {
          console.log(err);
        })
      },
      //查看物流
      checkLogistics(item){
        this.$router.push({
          name:'logistics_desc',
          params:{
            order_id:item.id,
            orderCode:item.order_number,
            shipperCode:item.shipperCode,
            logisticCode:item.logisticCode
          }
        })
      },
      //删除订单
      deleteOrder(id){
        var _this=this;
        delete_order({'token':localStorage.getItem('token'),'order_id':id}).then(function (res) {
          if(res.data.errcode==0){
            _this.$dialog.toast({
              mes: '删除成功',
              timeout: 1000,
              icon: 'success'
            });
            _this.getMyOrderList();
          }else{
            _this.$dialog.toast({
              mes: res.data.errdesc,
              timeout: 1000
            });
          }
        }).catch(function (err) {
          console.log(err);
        })
      },
      //取消订单
      cancelOrder(id){
        var _this=this;
        cancle_order({'token':localStorage.getItem('token'),'order_id':id}).then(function (res) {
          if(res.data.errcode==0){
            _this.$dialog.toast({
              mes: '取消成功',
              timeout: 1000,
              icon: 'success'
            });
            _this.getMyOrderList();
          }else{
            _this.$dialog.toast({
              mes: res.data.errdesc,
              timeout: 1000
            });
          }
        }).catch(function (err) {
          console.log(err);
        })
      },

    },
    components: {
      'load-more': LoadMore,
      'cover': Cover
    },
    beforeRouteEnter(to, from, next) {
      // 路由导航钩子，此时还不能获取组件实例 `this`，所以无法在data中定义变量（利用vm除外）
      // 参考 https://router.vuejs.org/zh-cn/advanced/navigation-guards.html
      // 所以，利用路由元信息中的meta字段设置变量，方便在各个位置获取。这就是为什么在meta中定义isBack
      // 参考 https://router.vuejs.org/zh-cn/advanced/meta.html
      if(from.name=='pay_again'||from.name=='order_desc'||from.name=='logistics_desc'){
        to.meta.isBack=true;
        //判断是从哪个路由过来的，
        //如果是page2过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
      }

      next();
    },
    activated() {
      if(!this.$route.meta.isBack|| this.isFirstEnter){
        // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
        this.minHeight=localStorage.getItem('minHeight');
        this.activeIndex = Number(this.$route.params.type);
        switch (this.activeIndex){
          case 0: this.params.state = 'all';break;
          case 1: this.params.state = 'paying';break;
          case 2: this.params.state = 'confirming';break;
          case 3: this.params.state = 'payed';break;
          case 4: this.params.state = 'dispatch';break;
          case 5: this.params.state = 'commenting';break;
        }
        this.orderList = [];
        this.params.page=1;
        this.loading = false;
        this.allLoaded = false;
        this.params.token = localStorage.getItem('token');
        this.getMyOrderList();

      }
      // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
      this.$route.meta.isBack=false;
      this.isFirstEnter=false;

    },


  }
</script>
<style scoped="true">
  @import '../../../static/css/order/my_order.css';


</style>
