<template>
    <div class="container" :style="'min-height:'+minHeight">
      <ul>
        <template v-for="item in activityList">
          <li class="activity-li" >
            <router-link :to="'/main/activity_desc/'+item.id" :key="item.id">
              <img :src="item.cover_pic" class="activity-img" alt="">
            </router-link>
          </li>
        </template>
      </ul>
    </div>
</template>

<script>
  import {get_system_activity} from '../../api/index'
    export default {
        data() {
            return {
                minHeight: '',
                activityList:[],
                isFirstEnter:false
            }
        },
        created() {
            this.$dialog.loading.close();
            this.isFirstEnter=true;
            this.minHeight = localStorage.getItem('minHeight');
            this.getActivityList();
        },
        methods: {
          //获取店铺精彩活动
          getActivityList() {
            var _this = this;
            get_system_activity().then(function (res) {
              //console.log('activity',res);
              _this.activityList = res.data.data;
            }).catch(function (err) {
              console.log(err);
            })
          },
        },
      beforeRouteEnter(to, from, next) {
        // 路由导航钩子，此时还不能获取组件实例 `this`，所以无法在data中定义变量（利用vm除外）
        // 参考 https://router.vuejs.org/zh-cn/advanced/navigation-guards.html
        // 所以，利用路由元信息中的meta字段设置变量，方便在各个位置获取。这就是为什么在meta中定义isBack
        // 参考 https://router.vuejs.org/zh-cn/advanced/meta.html
        if(from.name=='activity_desc'){
          to.meta.isBack=true;
          //判断是从哪个路由过来的，
          //如果是page2过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
        }

        next();
      },
      activated() {
        if(!this.$route.meta.isBack|| this.isFirstEnter){
          // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
          this.minHeight = localStorage.getItem('minHeight');
          this.getActivityList();
        }
        // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
        this.$route.meta.isBack=false;
        this.isFirstEnter=false;

      },

    }
</script>
<style scoped="true">
  .activity-li {
    margin: 0.28rem;
  }
  .activity-img {
    width: 100%;
  }
</style>
