<template>
  <div class="container" :style="'height:'+minHeight+';width:'+clientWidth+';overflow:hidden'">
    <div class="content-box" >
      <img src="../../../static/img/my/update-store-bg.jpg" alt="" class="bg">
      <div class="content">
        <p>恭喜您，360个积分攒够啦，一键升级开店，边消费边赚钱！<p></p>0元进货，0库存0风险，自用省钱，分享赚钱，全球尖货，品质保证，快速推广，便捷结算！</p><p>这么好的事儿，还等什么！创业之旅，我们与您在一起！</p>
      </div>
      <div class="bottom-div">
        <div class="input-div">
          <input type="text" placeholder="请输入邀请码" v-model="invite_code" class="code-input">
          <button class="btn" @click="updateToStore()">成为店长</button>
        </div>
        <!--<p class="texac tip-p"><span class="red-text">*</span><span>重新刷新后享受店长权益</span></p>-->
      </div>


    </div>

  </div>
</template>

<script>
  import {upgrade_shopowner} from '../../api/index'

  export default {
    data() {
      return {
        minHeight: '',
        invite_code: '',
        clientWidth:''
      }
    },
    created() {
      this.$dialog.loading.close();
      this.minHeight = localStorage.getItem('minHeight');
      this.clientWidth = localStorage.getItem('clientWidth');
    },
    methods: {
      updateToStore(){
        var obj={
          'token':localStorage.getItem('token'),
          'invite_code':this.invite_code
        };
        var _this=this;
        _this.$dialog.loading.open('');
        upgrade_shopowner(obj).then(function (res) {
          console.log(res);
          _this.$dialog.loading.close();
          if(res.data.errcode==0){
            _this.$dialog.toast({
              mes: '恭喜您成功升级为店长,快去您的店铺看看吧~',
              timeout: 1500
            });
            setTimeout(function () {
              localStorage.setItem('isVip',1);
              _this.$router.push('/main/shop');
            },1600)
          }else{
            _this.$dialog.toast({
              mes: res.data.errdesc,
              timeout: 1500
            });
          }
        }).catch(function (err) {
          console.log(err);
        })
      }
    }
  }
</script>
<style scoped="true">
  .content-box {
    position: relative;
    height:100%;
  }

  .bg {
    width: 100%;
    height:100%;
  }

  .content {
    font-size: 0.28rem;
    color: #2f2f2f;
    position: absolute;
    width: 5.02rem;
    top: 4rem;
    left: 0;
    right: 0;
    margin: auto;
    font-family: PingFang-SC-Medium;
    line-height: 0.60rem;
    text-align: justify;
  }

  .bottom-div {
    position: absolute;
    bottom: 1.3rem;
    width: 100%;
    left: 0;
  }

  .input-div {
    padding-left: 0.78rem;
    display: flex;
    align-items: center;
    margin-bottom: 0.25rem;
  }

  .code-input {
    width: 3.80rem;
    height: 0.80rem;
    background-color: #ffffff;
    border-radius: 2px 0px 0px 2px;
    border: solid 1px #dcdcdc;
    padding-left: 0.28rem;
  }

  input[type='text'] {
    font-size: 0.30rem;
    color: #898989;
  }

  input::input-placeholder {
    font-size: 0.30rem;
    color: #898989;
  }

  input::-webkit-input-placeholder {
    font-size: 0.30rem;
    color: #898989;
  }

  input:-ms-input-placeholder {
    font-size: 0.30rem;
    color: #898989;
  }

  input:-moz-placeholder {
    font-size: 0.30rem;
    color: #898989;
  }

  input::-moz-placeholder {
    font-size: 0.30rem;
    color: #898989;
  }

  .btn {
    width: 2.14rem;
    height: 0.80rem;
    background-color: #b81f22;
    border-radius: 0px 2px 2px 0px;
    font-size: 0.30rem;
    color: #ffffff;
    text-align: center;
    line-height: 0.8rem;
    border: solid 1px #b81f22;
    border: 0;
  }

  .tip-p {
    font-size: 0.24rem;
    color: #898989;
  }

  .red-text {
    color: #b81f22;
  }

</style>
