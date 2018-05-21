<template>
  <div class="container" :style="'min-height:'+minHeight">
    <div class="bgf scene-title-div">
      <img src="../../../static/img/shop/scene.png" class="scene-title-pic" alt="">

    </div>
    <div class="top-div disf bgf">
      <div class="scroll-div">
        <ul class="scroll-ul" id="scroll-ul">
          <template v-for="(item,index) in list">
            <li class="scroll-li choosed-scene" id="choosed" v-if="index==choosedIndex" @click="changeScene(index)">{{item}}</li>
            <li class="scroll-li" v-else  @click="changeScene(index)">{{item}}</li>
          </template>

        </ul>
      </div>
      <span class="ispan">
        <i class="icon iconfont icon-xiajiantou-copy" @click="showCover"></i>
      </span>
    </div>
    <div class="scene-div">
      <img src="../../../static/img/shop/greeting-bg.png" class="greeting-bg" alt="">
      <img src="" class="scene-img" alt="">
    </div>
    <button class="send-btn">发送</button>
    <cover :isShowSize="isShowSize" :closeByZhao="true" @coverClose="coverClose">
      <div class="drop-menu">
        <p class="disf drop-p">
          <span class="drop-text">选择场景</span>
          <span class="ispan">
          <i class="icon iconfont icon-shangjiantou" @click="closeCover"></i>
      </span>
        </p>
        <ul class="disf drop-ul">
          <template v-for="(item,index) in list">
            <li class="drop-li " :class="{'choosed-scene':index==choosedIndex}" @click="changeScene1(index)">{{item}}</li>

          </template>

        </ul>
      </div>
    </cover>


  </div>
</template>

<script type="text/babel">
  import Cover from '../common_components/cover.vue'

  export default {
    data() {
      return {
        isShowSize: false,
        minHeight: '',
        choosedIndex:0,
        list:['新年','情人节','元宵节','除夕','七夕节','新年','情人节','元宵节','除夕','七夕节']
      }
    },
    mounted() {
      this.minHeight = localStorage.getItem('minHeight');

    },
    methods: {
      //关闭遮罩
      coverClose(bool) {
        //bool为子组件通过自定义事件close穿过来的值
        this.isShowSize = false;
        //console.log('bool',bool);
      },
      //显示遮罩
      showCover() {
        this.isShowSize = true;
      },
      //关闭遮罩
      closeCover() {
        this.isShowSize = false;
      },
      //切换场景
      changeScene(index){
        this.choosedIndex=index;
      },
      changeScene1(index){
        var _this=this;
        this.choosedIndex=index;
        setTimeout(function () {
          console.log(document.getElementById('choosed'));
          var choosed = document.getElementById('choosed').offsetLeft - 15;
          //console.log(active);
          document.getElementById('scroll-ul').scrollLeft = choosed;
          _this.isShowSize = false;
        },100)



      }


    },
    components: {
      'cover': Cover,
      isShowSize: false,
    }
  }
</script>

<style scoped="true">
 @import "../../../static/css/shop/greeting.css";
</style>
