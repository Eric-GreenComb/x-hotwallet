<template>
  <div class="container lun-study-container" id="content" :style="'min-height:'+minHeight">
    <p class="title">{{desc.title}}</p>
    <p class="nick-p"><span class="nick">{{desc.author}}</span><span>{{desc.creat_time}}</span></p>
    <p><span class="tag">{{desc.tag_name}}</span></p>
    <div class="content" v-html="desc.content" id="desc-content"></div>

  </div>
</template>

<script>
  import {get_article_detail,quer_read} from '../../api/index'

  export default {
    data() {
      return {
        minHeight: '',
        desc: {},
        second: 0,
        contentHeight: 0,
        already:false

      }
    },
    mounted() {
      this.$dialog.loading.close();
      this.minHeight = localStorage.getItem('minHeight');
      this.getDetail();
    },
    methods: {
      getDetail() {
        var obj = {
          id: this.$route.params.id,
          token: localStorage.getItem('token')
        };
        var _this = this;
        get_article_detail(obj).then(function (res) {
          var desc = res.data.data;
          desc.creat_time = _this.utils.timeChange(desc.creat_time);
          //console.log('res==', desc);
          _this.desc = desc;
          setTimeout(function () {
            var imgArr=document.getElementById('desc-content').getElementsByTagName('img');
            for(var i=0;i<imgArr.length;i++){
              imgArr[i].style.width='100%';
            }
          },200);
          //滚动条监视阅读质量
          var computed = null;
          //计时器
          computed = setInterval(function () {
            _this.second++;
            //到达指定位置，清除定时器
          }, 1000);
          setTimeout(function () {
            var contentHeight = document.getElementById('content').scrollHeight;
            var minHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || window.screen.availHeight;
            _this.contentHeight = contentHeight;
            window.onscroll = function () {
              //页面滚动实时获取滚动条位置
              var osTop = document.documentElement.scrollTop || document.body.scrollTop;
             // console.log('osTop', osTop);
              //到底了
              if (_this.contentHeight - osTop - minHeight < 20) {
                console.log('到底了');
                console.log(_this.second);
                //判断阅读时间（阅读时间现设置的是5秒）
                if (_this.second >= 5) {
                  console.log('完成');
                  clearInterval(computed);
                  _this.already=true;
                }
              }
            };
          }, 500);
        }).catch(function (err) {
          console.log(err);
        })
      }
    },
    watch:{
      already(n,o){
        if(n){
          var obj = {
            id: this.$route.params.id,
            token: localStorage.getItem('token')
          };
          quer_read(obj).then(function (res) {
            console.log(res);
          }).catch(function (err) {
            console.log(err);
          })
        }
      }
    }
  }
</script>
<style scoped="true">
  @import "../../../static/css/quill.snow.css";
  .lun-study-container {
    padding: 0.38rem;
  }

  .title {
    font-size: 0.34rem;
    color: #000000;
  }

  .nick-p {
    font-size: 0.26rem;
    color: #949494;
    margin-top: 0.24rem;
    margin-bottom: 0.26rem;
  }

  .nick {
    margin-right: 0.5rem;

  }

  .tag {
    width: 1.22rem;
    height: 0.36rem;
    line-height: 0.36rem;
    text-align: center;
    background-color: #e8f5fd;
    border-radius: 17px;
    font-size: 0.24rem;
    color: #247edb;
  }

  .content {
    margin-top: 0.64rem;
  }

  #content {
    height: auto;
  }
</style>
