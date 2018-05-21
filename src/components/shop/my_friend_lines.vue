<template>
  <div class="container" :style="'min-height:'+minHeight">
    <div class="top-bg">
      <img src="../../../static/img/shop/friend-lines-bg.jpg" class="bg" alt="">
      <div class="top-msg">
        <img src="../../../static/img/shop/default_header.png" v-if="head_pic==''" class="header" alt="">
        <img :src="head_pic" v-else class="header" alt="">
        <span class="name">{{nick_name}}</span>
        <div class="disf integral-div">
          <div>
            <div>本月积分</div>
            <div class="integral-num">{{month_score}}</div>
          </div>
          <span class="line"></span>
          <div>
            <div>上月积分</div>
            <div class="integral-num">{{front_month_score}}</div>
          </div>
        </div>
      </div>
    </div>
    <p class="title">好友列表</p>
    <ul>
      <li class="li" v-for="item in list">
        <img :src="item.head_pic" class="li-header" alt="">
        <div>
          <p class="ti-p"><span>微信名：</span><span>{{item.nick_name}}</span></p>
          <p class="integral-p"><span>本月积分：</span><span>{{item.month_score}}</span></p>
        </div>
        <span class="tag vip-tag" v-if="item.state=='incentive'">待激励</span>
        <span class="tag vip-tag" v-else-if="item.state=='friend'">伙伴</span>
        <span class="tag no-vip" v-else-if="item.state=='new'">新人</span>
        <span class="tag no-vip" v-else-if="item.state=='normal'">正常</span>
        <span class="tag no-vip" v-else-if="item.state=='sleep'">休眠</span>
        <span class="tag no-vip" v-else-if="item.state=='invalid'">无效</span>
      </li>
    </ul>


  </div>
</template>

<script>
  import {getPerson_homepageInfo,get_front_person} from '../../api/index'
  export default {
    data() {
      return {
        minHeight: '',
        invite_code:'',
        list:[],
        nick_name:'',
        head_pic:'',
        month_score:'',
        front_month_score:''
      }
    },
    created() {
      this.$dialog.loading.close();
      this.minHeight = localStorage.getItem('minHeight');
      this.invite_code=this.$route.params.invite_code;
      this.getFriend();
      this.getInfor();
    },
    mounted() {


    },
    methods: {
      getInfor(){
        var _this=this;
        getPerson_homepageInfo({'invite_code': this.invite_code}).then(function (res) {
          console.log('res==',res);
          var data=res.data.data;
          _this.nick_name=data.nick_name;
          _this.head_pic=data.head_pic;
          _this.month_score=data.month_score;
          _this.front_month_score=data.front_month_score;
        }).catch(function (err) {
          console.log(err);
        })
      },
      //获取好友列表
      getFriend() {
        var _this = this;
        get_front_person({'invite_code': this.invite_code}).then(function (res) {
          //console.log('friend',res);
          _this.list = res.data.data;
        }).catch(function (err) {
          console.log(err);
        })
      },
    }
  }
</script>
<style scoped="true">
  @import "../../../static/css/shop/my_friend_lines.css";
</style>
