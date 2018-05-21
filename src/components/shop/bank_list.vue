<template>
    <div class="container" :style="'min-height:'+minHeight">
<ul>
  <li v-for="item in list" @click="chooseBank(item)">
    <img :src="item.pic_name" class="pic" alt="">
    <span class="text">{{item.bank_name}}</span>
  </li>
</ul>

    </div>
</template>

<script>
  import {getAllBankList} from '../../api/index'
  export default {
    data() {
      return {
        minHeight: '',
        list: []
      }
    },
    created() {
      this.$dialog.loading.close();
      this.minHeight = localStorage.getItem('minHeight');
      this.getBankList();
    },
    mounted() {

    },
    methods: {
      //获取银行列表
      getBankList() {
        var _this = this;
        getAllBankList().then(function (res) {
          _this.list = res.data.data;
          //console.log(_this.list);

        }).catch(function (err) {
          console.log(err);
        })
      },
      //选择银行列表
      chooseBank(item) {
        var _this = this;
        sessionStorage.setItem('bankInfo', JSON.stringify(item));
        setTimeout(function () {
          _this.$router.push(_this.$route.query.redirect);
        },100)

      }
    }
  }
</script>
<style scoped="true">
  li{
    display: flex;
    align-items: center;
    margin:0.2rem 0.32rem;
    padding-bottom: 0.2rem;
    border-bottom: 1px solid #eee;
  }
.pic{
  width:0.7rem;
  height:0.7rem;
  border-radius: 50%;
  display: inline-block;
}
  .text{
    font-size:0.28rem;
    color:#2f2f2f;
    margin-left: 0.3rem;
  }


</style>
