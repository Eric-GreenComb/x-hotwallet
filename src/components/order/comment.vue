<template>
  <div class="container comment-container" :style="'min-height:'+minHeight">
    <p class="row">
      <img src="" alt="">
      <span>迪奥（Dior）迪奥小姐花漾淡香氛(EDT)</span>
    </p>
    <div class="star-box">
      <div class="star-div">
        <span class="comment-text">评价</span>
        <i class="icon iconfont icon-xingxing  defaultClass" id="icon0" @click="commentStar($event,0)"></i>
        <i class="icon iconfont icon-xingxing  defaultClass" id="icon1" @click="commentStar($event,1)"></i>
        <i class="icon iconfont icon-xingxing  defaultClass" id="icon2" @click="commentStar($event,2)"></i>
        <i class="icon iconfont icon-xingxing  defaultClass" id="icon3" @click="commentStar($event,3)"></i>
        <i class="icon iconfont icon-xingxing  defaultClass" id="icon4" @click="commentStar($event,4)"></i>
      </div>
    </div>

    <div class="comment-content">
      <textarea v-model="message" class="textarea" placeholder="请输入你的评价~"></textarea>
      <ul class="pic-list">
        <li class="pic-li">
          <i class="icon iconfont icon-xiangji"></i>
          <p class="text">添加图片</p>
        </li>
      </ul>
    </div>
    <p class="btn">提交</p>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        minHeight: '',
        rate5: '',
        message: '',
      }
    },
    created() {
      this.minHeight = localStorage.getItem('minHeight');
    },
    mounted() {
      this.utils.wxImage();
    },
    methods: {
      commentStar(event, index) {
        //console.log(event,index);
        //console.log(event.target.className);
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


      }
    }
  }
</script>
<style scoped="true">
  @import "../../../static/css/order/comment.css";
</style>
