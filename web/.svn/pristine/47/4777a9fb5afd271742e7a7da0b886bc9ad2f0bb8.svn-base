<template>
  <div id="app" ref="app">
    <div id="loading-div" v-show="isLoading">
      <img src="../static/img/loading.gif" id="loading" alt="">
      <p id="loading-now">加载中...</p>
    </div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" v-wechat-title="$route.meta.title">
        <!-- 这里是会被缓存的视图组件，比如 page1,page2 -->
      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" v-wechat-title="$route.meta.title">
      <!-- 这里是不被缓存的视图组件，比如 page3 -->
    </router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        minHeight: '',
        isLoading: false
      }
    },
    created() {
      var minHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || window.screen.availHeight;
      var clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || window.screen.availWidth;
      localStorage.setItem('minHeight', minHeight + 'px');
      localStorage.setItem('clientWidth', clientWidth + 'px');
      Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      }
    },
    methods:{
      cli(data){
        this.a=data;
      }
    }

  }
</script>

<style>
  @import "../static/iconfont/iconfont.css";
  @import '../static/css/app.css';
  @import "../static/css/quill.snow.css";

</style>
