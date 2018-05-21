<template>
  <div class="container shop-container common-pt">
    <div class="msg disf">
      <div class="header">
        <img :src="infor.head_pic" v-if="infor.head_pic!=''" class="header-pic" alt="">
        <img src="../../../static/img/shop/default_header.png" v-else class="header-pic" alt="">
      </div>
      <div>
        <p class="username">{{infor.nick_name}}</p>
        <p class="store-num"><span>店铺序列号：</span><span>{{infor.shop_no}}</span></p>
      </div>
    </div>
    <div class="disf msg1">
      <div>
        <p class="money">{{infor.bonus}}</p>
        <p class="type">奖励（元）</p>
      </div>
      <div>
        <div class="btn btn1">
          <span @click="goPage('/main/withdraw')">提现</span>
          <span class="btn1-bor"></span>
        </div>
        <div class="btn btn2">
          <span @click="openTask">本月任务</span>
          <span class="btn2-bor"></span>

        </div>
      </div>
    </div>
    <div class="block-div">
      <div class="block block1" v-if="shop_code != ''" @click="goPage('/main/invite_friend')">
          <img src="../../../static/img/shop/invite-friend.png" class="block-img" alt="">
          <p class="block-text">邀请好友</p>
      </div>
      <div class="block" v-if="shop_code != ''" @click="goPage('/main/shop_giftBag')">
          <img src="../../../static/img/shop/gift-package.png" class="block-img" alt="">
          <p class="block-text">分享开店大礼包</p>
      </div>
      <div class="block" @click="shareShow=true" >
        <img src="../../../static/img/shop/shop-share.png" class="block-img" alt="">
        <p class="block-text">店铺分享</p>
      </div>
    </div>
    <ul class="four-div disf">
      <li class="four-li" @click="goPage('/main/my_shelves')">
          <img src="../../../static/img/shop/hj.png" class="four-img" alt="">
          <p class="four-text">我的货架</p>
      </li>
      <li class="four-li"  @click="goPage('/main/my_friend')">
          <img src="../../../static/img/shop/my-friend.png" class="four-img" alt="">
          <p class="four-text">我的好友</p>
      </li>
      <li class="four-li" @click="goPage('/main/my_bussiness')">
          <img src="../../../static/img/shop/my-bussiness.png" class="four-img" alt="">
          <p class="four-text">我的生意</p>
      </li>
    </ul>
    <div class="disf look-more">
      <span>商学院</span>
      <div @click="checkMoreMaterial()"><span class="right">查看更多 <i class="icon iconfont icon-youjiantou"></i></span>
      </div>
    </div>
    <div class="scroll-box">
      <ul class="scroll-ul">
        <li class="scroll-li" v-for="item in materialList" @click="checkMaterailDesc(item.id)">
          <img :src="item.pic" class="scroll-img" alt="">
          <p class="shop_title">{{item.title}}</p>
        </li>

      </ul>
    </div>
    <div class="disf look-more">
      <span>精彩活动</span>
      <div @click="checkMoreActivity()"><span class="right">查看更多 <i class="icon iconfont icon-youjiantou"></i></span>
      </div>
    </div>
    <ul>
      <li class="activity-li">
        <div @click="checkActivityDesc(item.id)"  v-for="item in activityList" :key="item.id">
          <img :src="item.cover_pic" class="activity-img" alt="">
        </div>
      </li>
    </ul>




    <!--本月任务遮罩层-->
    <cover :isShowSize="isShowSize" :closeByZhao="false" @coverClose="coverClose">
      <div class="task-cover-div">
        <img src="../../../static/img/shop/task.png" class="task-img" alt="">
        <div class="integral-div">
          <p class="integral-num texac">{{infor.now_score}}</p>
          <p class="integral-text texac">当前积分</p>
        </div>
        <p class="more-integral">再获得<span class="more-integral-num" v-if="parseInt(infor.now_score)<parseFloat(1000)">{{parseFloat(1000)-parseFloat(infor.now_score)}}</span><span class="more-integral-num" v-else>{{parseFloat(2000)-parseFloat(infor.now_score)}}</span>积分可获得奖励</p>
        <div id="loading-status">
          <div id="precent"></div>
          <div class="text-div">
            <p class="text">利润</p>
            <p class="text">x10%</p>
          </div>
          <span class="dot"></span>
          <p class="step">1000</p>
          <div class="text-div text-div1">
            <p class="text">利润</p>
            <p class="text">x20%</p>
          </div>
          <span class="dot dot1"></span>
          <p class="step step1">2000</p>
        </div>
        <p class="close-p">
          <i class="icon iconfont icon-guanbi1" @click="closeTask"></i>
        </p>
      </div>
    </cover>

    <div class="sell-cover" :style="'height:'+minHeight" @click="shareShow=false" v-if="shareShow">
      <img src="../../../static/img/click-share.png" class="click-share" alt="">
    </div>
    <footer-tab :index="3"></footer-tab>



  </div>
</template>

<script>
  import Cover from '../common_components/cover.vue'
  import FooterTab from '../common_components/footer_tab.vue'
  import {get_system_activity, getPerson_homepageInfo, getleatest_material} from '../../api/index'
  import config from '../../api/config'


  export default {
    data() {
      return {
        shop_code:  '',  //邀请好友开店大礼包是否显示，空则不显示
        isShowSize: false,
        minHeight: '',
        shareShow: false,
        activityList: [],
        infor: {
          nick_name:'昵称',
          head_pic:'',
          shop_no:'----'
        },
        width:'',
        materialList: []
      }
    },
    created() {
      this.$dialog.loading.close();
      sessionStorage.setItem('activeIndex', 3);
      this.minHeight = localStorage.getItem('minHeight');
    },
    mounted() {
      this.getInfor();
      this.getActivityList();
      this.getMaterialList();
    },
    methods: {
      //获取店铺个人信息
      getInfor() {
        var _this = this;
        this.$dialog.loading.open('');
        getPerson_homepageInfo({'invite_code': localStorage.getItem('invite_code')}).then(function (res) {
          _this.infor = res.data.data;
          _this.shop_code = res.data.data.shop_code;
          _this.width=(_this.infor.now_score/3000)*100+'%';
          /*分享start*/
          var UrlAttr = (decodeURIComponent(location.href)).split('#');
          //从这里分享出去的肯定是自己的店铺，所有货主和邀请人都是自己的邀请码
          var param = '/main/my_shelves?shelves_owner=' + localStorage.getItem('invite_code')+'&inviter='+ localStorage.getItem('invite_code');
          var link = config.redirect_url + "?host=" + encodeURIComponent(UrlAttr[0]) + "&param=" + encodeURIComponent(param);
          _this.wxutils.wxShare(_this.infor.nick_name, _this.infor.nick_name + '的91云店', link, _this.infor.head_pic);
          _this.$dialog.loading.close();
          /*end*/
        }).catch(function (err) {
          console.log(err);
        })
      },

      //子组件发射事件遮罩层关闭coverClose
      coverClose(bool) {
        //bool为子组件通过自定义事件close穿过来的值
        this.isShowSize = false;
        //console.log('bool',bool);
      },
      //打开本月任务
      openTask() {
        this.isShowSize = true;
        var _this=this;
        setTimeout(function () {
          document.getElementById('precent').style.width = _this.width;
        }, 100)
      },
      //关闭本月任务
      closeTask() {
        this.isShowSize = false;
        document.getElementById('precent').style.width = '0'
      },
      //获取店铺精彩活动
      getActivityList() {
        var _this = this;
        this.$dialog.loading.open('');
        get_system_activity().then(function (res) {
          //console.log('activity',res);
          _this.activityList = res.data.data;
          _this.$dialog.loading.close();

        }).catch(function (err) {
          console.log(err);
        })
      },
      //获取商学院课件列表
      getMaterialList() {
        var _this = this;
        _this.$dialog.loading.open();
        getleatest_material().then(function (res) {
          var data = res.data.data;
          //console.log('data',data);
          _this.materialList = data;
          _this.$dialog.loading.close();
        }).catch(function (err) {
          console.log(err);
        })
      },
      //查看更多活动
      checkMoreActivity(){
        this.$router.push('/main/activity_list');
      },
      //查看活动详情
      checkActivityDesc(id){
        this.$router.push('/main/activity_desc/'+id);
      },
      //查看课件详情
      checkMaterailDesc(id){
        this.$router.push('/main/material_desc/'+id);
      },
      //查看更多课件
      checkMoreMaterial(){
        this.$router.push('/main/shop_school');
      },
      goPage(path){
        this.$router.push(path);
      }

    },
    components: {
      'cover': Cover,
      'footer-tab': FooterTab
    }
  }
</script>
<style scoped="true">

  @import "../../../static/css/shop/shop.css";
  .scroll-li{
    height:2rem;
  }
  .scroll-img{
    height:1.29rem;
  }
  .shop_title{
    width:100%;
    font-size:0.22rem;
    color: #333;
    margin-top:0.1rem;
    text-align: center;
    letter-spacing:.1em;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    padding:0 0.1rem;
  }
  .scroll-box{
    padding-bottom:0.2rem;
  }
</style>
