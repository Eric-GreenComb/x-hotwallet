<template>
  <div class="container friend-container" :style="'min-height: '+minHeight">
    <ul>
      <li class="row disf" v-for="item in list"  @click="checkLines(item.invite_code)">
        <div class="disf left-div">
          <div class="header-div">
            <img :src="item.head_pic" v-if="item.head_pic!=''" class="header" alt="">
            <img src="../../../static/img/shop/default_header.png" v-else class="header" alt="">
            <span class="tag vip-tag" v-if="item.state=='incentive'">待激励</span>
            <span class="tag vip-tag" v-else-if="item.state=='friend'">伙伴</span>
            <span class="tag no-vip" v-else-if="item.state=='new'">新人</span>
            <span class="tag no-vip" v-else-if="item.state=='normal'">正常</span>
            <span class="tag no-vip" v-else-if="item.state=='sleep'">休眠</span>
            <span class="tag no-vip" v-else-if="item.state=='invalid'">无效</span>
          </div>
          <div>
            <p class="nickname"><span>微信名：</span><span>{{item.nick_name}}</span></p>
            <p class="identity" v-if="item.is_vip==1&&item.vip_rank==0">店长</p>
            <p class="identity" v-if="item.is_vip==0">普通会员</p>
          </div>
        </div>
       <!-- <i class="icon iconfont icon-sixin" @click="showCover()"></i>-->
      </li>

    </ul>
    <!--遮罩层-->
    <div class="news-cover" v-show="isShowSize">
      <div class="news-box">
        <p class="comment-tip-p"><span class="cancel" @click="coverClose">取消</span><span class="ok" @click="sendNews()">发送</span>
        </p>
        <textarea name="news" v-model="news" id="news" rows="6" placeholder="请在此输入私信内容~"></textarea>
      </div>
    </div>


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
        list: [],
        news: ''

      }
    },
    created() {
      this.minHeight = localStorage.getItem('minHeight');
      this.getFriend();
    },
    methods: {
      //获取好友列表
      getFriend() {
        var _this = this;
        get_front_person({'invite_code': localStorage.getItem('invite_code')}).then(function (res) {
          //console.log('friend',res);
          _this.list = res.data.data;
        }).catch(function (err) {
          console.log(err);
        })
      },
      //查看下线列表
      checkLines(invite_code) {
        this.$router.push('/main/my_friend_lines/'+invite_code)
      },
      coverClose() {
        this.isShowSize = false;
      },
      showCover() {
        this.isShowSize = true;
      },
      sendNews() {
        this.isShowSize = false;
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
    position: relative;
  }

  .header-div {
    width: 1rem;
    margin-right: 0.24rem;
    position: relative;
  }

  .header {
    width: 0.80rem;
    height: 0.80rem;
    border-radius: 50%;
  }

  .row {
    background: #fff;
    padding: 0.23rem 0.28rem;
    justify-content: space-between;
    align-items: center;
  }

  .left-div {
    flex: 1;
  }

  .nickname {
    font-size: 0.28rem;
    color: #2f2f2f;
    padding-top:0.14rem;
  }

  .identity {
    font-size: 0.20rem;
    color: #898989;
    margin-top: 0.14rem;
  }

  .icon-sixin {
    font-size: 0.38rem;
    color: #2f2f2f;
    margin-left: 0.5rem;
  }

  #news {
    border: 1px solid #eee;
    width: 94%;
    padding: 0.3rem;
    font-size: 0.3rem;
    color: #2f2f2f;
    border-radius: 4px;
    display: block;
    margin: 0 auto 0.5rem auto;

  }

  #news::input-placeholder {
    font-size: 0.3rem;
    color: #898989;
  }

  #news::-webkit-input-placeholder {
    font-size: 0.3rem;
    color: #898989;
  }

  #news:-ms-input-placeholder {
    font-size: 0.3rem;
    color: #898989;
  }

  #news:-moz-placeholder {
    font-size: 0.3rem;
    color: #898989;
  }

  #news::-moz-placeholder {
    font-size: 0.3rem;
    color: #898989;
  }

  .cancel-btn {
    padding: 0.12rem 0.38rem;
    font-size: 0.28rem;
    color: #fff;
    margin-top: 0.35rem;
    float: left;
    border: 0;
    border-radius: 2px;
    background-color: #b81f23;
    margin-left: 0.3rem;

  }

  .cancel-btn:after {
    content: '';
    display: table;
    clear: both;
  }

  .send-btn {
    padding: 0.12rem 0.38rem;
    font-size: 0.28rem;
    color: #fff;
    margin-top: 0.35rem;
    float: right;
    border: 0;
    background: #14b507;
    border-radius: 2px;
    margin-right: 0.3rem;
    margin-bottom: 0.35rem;

  }

  .send-btn:after {
    content: '';
    display: table;
    clear: both;
  }

  .news-cover {
    position: fixed;
    width: 100%;
    top: 0;
    left:;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.64);
    z-index:10;
  }

  .news-box {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
  }

  .comment-tip-p {
    padding: 0.32rem 0.45rem;
    display: flex;
    justify-content: space-between;
    background: #FBFBFB;
    font-weight: bold;
  }

  .ok {
    color: #0BB20C;
    font-size: 0.28rem;
  }

  .cancel {
    color: #2f2f2f;
    font-size: 0.28rem;
  }

  .tag {
    width: 0.74rem;
    height: 0.26rem;
    text-align: center;
    line-height: 0.3rem;
    font-size: 0.18rem;
    color: #ffffff;
    z-index: 2;
    position: absolute;
    background-blend-mode: normal,
    normal;
    border-radius: 2px;
    left: 0.04rem;
    bottom: -0.1rem;
  }
  .vip-tag{
    background-image: linear-gradient(90deg,
    #ffa131 0%,
    #ff8c04 100%),
    linear-gradient(
      #2f2f2f,
      #2f2f2f);
  }
  .no-vip{
    background-color: #b5b5b5;
  }
</style>
