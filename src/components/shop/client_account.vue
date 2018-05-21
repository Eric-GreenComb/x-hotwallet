<template>
  <div class="container my-share-container" :style="'min-height:'+minHeight">
    <div class="account-div">
      <p class="ti">账户余额（元）</p>
      <p class="money">{{money}}</p>

    </div>


    <ul class="ul">
      <li class="row disf" v-for="item in list">
        <div>
          <p class="type">{{item.dis}}</p>
          <p class="time">{{item.creat_time}}</p>
        </div>
        <div>
          <span class="value" v-if="item.type=='plus'">+</span>
          <span class="value" v-else>-</span>
          <span class="value">{{item.money}}</span>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
  import {getPersonMoneyList,getPerson_homepageInfo} from '../../api/index'
  export default {
    data() {
      return {
        minHeight: '',
        money:'0',
        list:[],
        params:{
          token:localStorage.getItem('token'),
          page:1,
          number:15
        }
      }
    },
    mounted() {
      this.$dialog.loading.close();
      this.minHeight = localStorage.getItem('minHeight');
      this.getPersonBouns();
      this.getList();
    },
    methods:{
      //获取用户余额
      getPersonBouns() {
        var _this = this;
        this.$dialog.loading.open('');
        getPerson_homepageInfo({'invite_code': localStorage.getItem('invite_code')}).then(function (res) {
          //console.log(res.data.data);
          var data = res.data.data;
          _this.money = data.bonus;
          _this.$dialog.loading.close();
        }).catch(function (err) {
          console.log(err);
        })
      },
      //获取明细列表
      getList(){
        var _this=this;
        this.$dialog.loading.open('');
        getPersonMoneyList(this.params).then(function (res) {
          //console.log('res--',res);
          var data=res.data.data.data;
          _this.list=data;
          _this.$dialog.loading.close();
        }).catch(function (err) {
          console.log(err);
        })
      }
    }

  }
</script>
<style scoped="true">
  .my-share-container {
    background: #eee;
  }
  .ul{
    background: #fff;
  }
  .row{
    margin:0 0.29rem;
    padding:0.29rem 0;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    font-size: 0.28rem;
    color: #2f2f2f;
    border-bottom: 1px solid #eee;
  }
  .account-div{
    padding:0.58rem 0 0.65rem 0;
    background: #fff;
    border-bottom: 0.14rem solid #eee;
  }
  .ti{
    font-size: 0.24rem;
    color: #2f2f2f;
    text-align: center;
    margin-bottom: 0.26rem;
  }
  .money{
    font-size: 0.50rem;
    color: #b81f23;
    text-align: center;
    font-weight: bold;
  }
  .time{
    font-size: 0.26rem;
    color: #898989;
    margin-top: 0.16rem;
  }
  .type{
    font-size: 0.28rem;
    color: #2f2f2f;
  }
.value{
  font-size: 0.30rem;
  color: #2f2f2f;
}
</style>
