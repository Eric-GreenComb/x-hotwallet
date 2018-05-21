<template>
  <div class="container" :style="'min-height:'+minHeight">
    <p class="texac ti bgf">还差<span class="num">{{remainNum}}</span>人，点击右上角发送给朋友</p>
    <p class="texac bgf time-p">
      <span class="span1">剩余</span>
      <yd-countdown slot="right" :time="end_time">
        <span class="time-block">{%h}</span><span class="break">:</span><span
        class="time-block">{%m}</span><span class="break">:</span><span class="time-block">{%s}</span>
      </yd-countdown>
      <span class="span2">结束</span>
    </p>
    <div class="bgf btn-div">
      <button class="invite-btn" @click="shareShow=true">邀请好友拼单</button>

    </div>
    <div class="bgf">
      <ul class="header-ul">
        <li class="header-li" v-for="(item,index) in groupMember">
          <img :src="item.head_pic" class="header" alt="">
          <span class="identity" v-if="index==0">团长</span>
        </li>
        <li class="header-li" v-for="n in Number(remainNum)">
          <span>?</span>
        </li>
      </ul>
    </div>
    <p class="notice bgf disf">拼团须知<span></span><span class="notice-text">好友拼团   人满发货   人数不足自动退款</span></p>
    <div class="sell-cover" :style="'height:'+minHeight" @click="shareShow=false" v-if="shareShow">
      <img src="../../../static/img/click-share.png" class="click-share" alt="">
    </div>


  </div>
</template>

<script>
  import {get_realgrouporer,get_order_detail} from '../../api/index'
  import config from '../../api/config'
  export default {
    data() {
      return {
        minHeight: '',
        shareShow: false,
        remainNum:0,
        end_time:'',
        groupMember:[]
      }
    },
    created() {
      this.$dialog.loading.close();
      this.minHeight = localStorage.getItem('minHeight');
      this.getGroupMsg();


    },
    mounted() {
      this.getGroupDesc();
    },
    methods: {
      //获取拼团信息
      getGroupMsg(){
        var _this=this;
        get_realgrouporer({'order_id':this.$route.params.order_id}).then(function (res) {
          console.log('res--',res);
          var data=res.data.data;
          _this.remainNum=Number(data.group.start_quantity)-Number(data.users.length);
          _this.end_time=data.group.end_time.replace(/-/g, "/");;
          _this.groupMember=data.users;
        }).catch(function (err) {
          console.log(err);
        })
      },
      getGroupDesc(){
        var obj={
          'token':localStorage.getItem('token'),
          'order_id':this.$route.params.order_id
        };
        var _this=this;
        get_order_detail(obj).then(function (res) {
          console.log(res.data.data);
          var data=res.data.data;
          var UrlAttr = (decodeURIComponent(location.href)).split('#');
          var param = '/main/grounp_desc/' + data.group_id + '?groupInviter=' + sessionStorage.getItem('groupInviter');
          var link = config.redirect_url + "?host=" + encodeURIComponent(UrlAttr[0]) + "&param=" + encodeURIComponent(param);
          _this.wxutils.wxShare(data.goods[0].goods_name, data.goods[0].goods_name, link, data.goods[0].pic);
        }).catch(function (err) {
          console.log(err);
        })
      }
    }
  }
</script>
<style scoped="true">
  /*@import '../../../static/css/my/person_information.css';*/
  .container {
    background: #eee;
  }

  .bgf {
    background: #fff;
  }

  .ti {
    padding-top: 0.74rem;
    font-size: 0.40rem;
    font-weight: bold;
    color: #2f2f2f;
  }

  .num {
    color: #b81f23;
  }

  .time-p {
    padding-top: 0.57rem;
    padding-bottom: 0.54rem;
    font-size: 0.28rem;
    color: #2f2f2f;
  }

  .time-block {
    display: inline-block;
    width: 0.45rem;
    height: 0.35rem;
    line-height: 0.35rem;
    background-color: #2f2f2f;
    border-radius: 4px;
    text-align: center;
    font-size: 0.28rem;
    color: #ffffff;
  }

  .span1 {
    margin-right: 0.15rem;
  }

  .span2 {
    margin-left: 0.15rem;
  }

  .invite-btn {
    display: block;
    font-size: 0.30rem;
    color: #ffffff;
    width: 6.90rem;
    height: 0.80rem;
    line-height: 0.80rem;
    background-color: #b81f23;
    border-radius: 4px;
    text-align: center;
    border: 0;
    margin: auto;

  }

  .header-ul {
    display: flex;
    justify-content: center;
    padding:0.7rem 0.2rem 0.78rem 0.2rem;
    border-bottom: 0.14rem solid #eee;

  }

  .header-li {
    width: 0.89rem;
    height: 0.89rem;
    border-radius: 50%;
    border: 1px dashed #dcdcdc;
    text-align: center;
    line-height: 0.89rem;
    position: relative;
    margin-right: 0.37rem;
    color: #dcdcdc;
    font-size: 0.4rem;
  }

  .header {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }

  .identity {
    display: inline-block;
    width: 0.54rem;
    height: 0.26rem;
    background-image: linear-gradient(90deg,
    #ffa131 0%,
    #ff8c04 100%),
    linear-gradient(
      #2f2f2f,
      #2f2f2f);
    background-blend-mode: normal,
    normal;
    border-radius: 4px;
    font-size: 0.18rem;
    color: #ffffff;
    line-height: 0.28rem;
    text-align: center;
    position: absolute;
    bottom: -0.13rem;
    z-index: 100;
    left: 0.08rem;
  }

  .notice {
    padding: 0.3rem;
    justify-content: space-between;
    font-size: 0.28rem;
    color: #2f2f2f;
    font-weight: bold;
  }

  .notice-text {
    color: #898989;
    font-size: 0.26rem;
    font-weight: normal;
  }
  .break{
    padding:0 0.05rem;
  }

  .header-ul{
    display: block;
    overflow: hidden;
  }
  .header-li{
    float: left;
    height:0.96rem;
    line-height:0.96rem;
    width:0.96rem;
    margin-bottom:0.4rem;
    margin-right:0.42rem;
  }
  .header-li:nth-child(5){
    margin-right:0;
  }
  .identity{
    left:0.2rem;
  }
</style>
