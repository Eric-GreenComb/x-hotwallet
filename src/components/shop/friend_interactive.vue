<template>
  <div class="container friend-container" :style="'min-height: '+minHeight">
    <ul>
      <li class="row disf" @click="showCover" v-for="item in list">
        <div class="header-div">
          <img :src="item.head_pic" v-if="item.head_pic!=''" class="header" alt="">
          <img src="../../../static/img/shop/default_header.png" v-else class="header" alt="">
        </div>
        <div>
          <p class="nickname"><span>微信名：</span><span>{{item.nick_name}}</span></p>
          <p class="identity">新会员</p>
        </div>
      </li>

    </ul>
    <cover :isShowSize="isShowSize" :closeByZhao="true" @coverClose="coverClose">
      <div class="methods-cover">
        <p class="tit">选择激活方式</p>
        <i class="icon iconfont icon-guanbi" @click="closeCover"></i>
        <ul class="disf methods-ul">
          <li>
            <router-link to="/main/greeting">
              <img src="../../../static/img/shop/greeting.png" class="methods-img" alt="">
              <p class="methods-text">问候</p>
            </router-link>
          </li>
          <li>
            <router-link to="/main/share">
              <img src="../../../static/img/shop/share.png" class="methods-img" alt="">
              <p class="methods-text">分享</p>
            </router-link>
          </li>
          <li>
            <router-link to="/main/send_coupons">
              <img src="../../../static/img/shop/send-coupons.png" class="methods-img" alt="">
              <p class="methods-text">送券</p>
            </router-link>
          </li>
        </ul>

      </div>

    </cover>


  </div>
</template>

<script>
  import {get_front_person} from '../../api/index'
  import Cover from '../common_components/cover.vue'

  export default {
    data() {
      return {
        minHeight: '',
        isShowSize: false,
        list:[]
      }
    },
    created() {
      this.minHeight = localStorage.getItem('minHeight');
      this.getFriend();

    },
    methods: {
      //子组件发射事件遮罩层关闭coverClose
      coverClose(bool) {
        //bool为子组件通过自定义事件close穿过来的值
        this.isShowSize = false;
        //console.log('bool',bool);
      },
      closeCover() {
        this.isShowSize = false;
      },
      showCover() {
        this.isShowSize = true;
      },
      //好友列表
      getFriend(){
        var _this=this;
        get_front_person({'token':localStorage.getItem('token')}).then(function (res) {
          //console.log('friend',res);
          _this.list=res.data.data;
        }).catch(function (err) {
          console.log(err);
        })
      }
    },
    components: {
      'cover': Cover
    }
  }
</script>
<style scoped="true">
  .friend-container {
    background: #eee;
  }

  .header-div {
    width: 0.80rem;
    height: 0.80rem;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 0.24rem;
  }

  .header {
    width: 100%;
    height: 100%;
  }

  .row {
    background: #fff;
    padding: 0.2rem 0.28rem;
  }

  .nickname {
    font-size: 0.28rem;
    color: #2f2f2f;
  }

  .identity {
    font-size: 0.20rem;
    color: #898989;
    margin-top: 0.14rem;
  }

  .methods-cover {
    width: 100%;
    height: 4.2rem;
    background: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .tit {
    margin-top: 0.31rem;
    text-align: center;
    font-size: 0.30rem;
    color: #2f2f2f;
  }

  .methods-ul {
    padding: 1rem 0.9rem;
    justify-content: space-between;
  }

  .methods-img {
    width: 0.96rem;
    height: 0.96rem;
  }

  .methods-text {
    font-size: 0.26rem;
    color: #2f2f2f;
    margin-top: 0.24rem;
    text-align: center;
  }

  .icon-guanbi {
    position: absolute;
    top: 0.27rem;
    right: 0.32rem;
    font-size: 0.36rem;

  }
</style>
