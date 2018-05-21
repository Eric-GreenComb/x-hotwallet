<template>
  <div class="container" :style="'min-height:'+minHeight">
    <div v-html="content"></div>

    <div class="shajia-btn" @click="addShelves()">
      <i class="icon iconfont icon-shangjia"></i><span>上架</span>
    </div>
  </div>
</template>

<script>
  import {add_shelves,get_detail_activity} from '../../api/index'
  export default {
    data() {
      return {
        minHeight: '',
        id:'',
        content:''
      }
    },
    created() {
      this.$dialog.loading.close();
      this.minHeight = localStorage.getItem('minHeight');
      this.id=this.$route.params.id;
      this.getDesc();
    },
    mounted() {

    },
    methods: {
      getDesc(){
        var _this=this;
        get_detail_activity({activity_id:this.$route.params.id}).then(function (res) {
          console.log('desc',res);
          _this.content=res.data.data.content;

        }).catch(function (err) {
          console.log(err);
        })
      },
      //上架
      addShelves(){
        var _this=this;
        var obj={
          token:localStorage.getItem('token'),
          goods_id:this.id,
          is_collect:'y',
          type:'activity'
        };
        add_shelves(obj).then(function (res) {
          //console.log('res',res);
          if(res.data.errcode==0){
            _this.$dialog.toast({
              mes: '已上架',
              timeout: 1500,
              icon: 'success'
            });
          }else{
            _this.$dialog.toast({
              mes: res.data.errdesc,
              timeout: 1000
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
  .container{
    padding-bottom:1rem;
    /*padding:0.3rem 0.3rem 1rem 0.3rem;*/
  }
  .shajia-btn {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 0.9rem;
    line-height: 0.9rem;
    background: #fff;
    color: #2f2f2f;
    text-align: center;
    border-top: 1px solid #eee;
    z-index: 1000;
    font-size: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .icon-shangjia {
    font-size: 0.44rem;
    margin-right: 0.15rem;
  }
</style>
