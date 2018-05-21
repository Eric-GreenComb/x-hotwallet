<template>
  <div class="container my-share-container" :style="'min-height:'+minHeight">
    <table class="table">
      <thead>
      <th>用户手机</th>
      <th>用户姓名</th>
      <th>状态</th>
      <th>购买日期</th>
      </thead>
      <tbody>
      <tr v-for="item in list" v-if="list.length>0">
        <td>{{item.mobile}}</td>
        <td>{{item.name}}</td>
        <td>{{item.state}}</td>
        <td>{{item.date}}</td>
      </tr>
      </tbody>
    </table>
    <img src="../../../static/img/shop/noshare.png" class="noshar" alt="" v-if="list.length==0">
    <p class="texac no-tip" v-if="list.length==0">暂无分享记录</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        minHeight: '',
        list:[
          /*{
            'mobile':17710531136,
            'name':'lily',
            'state':'已支付',
            'date':'2018-01-20',
          },
          {
            'mobile':17710531136,
            'name':'lily',
            'state':'已支付',
            'date':'2018-01-20',
          },
          {
            'mobile':17710531136,
            'name':'lily',
            'state':'已支付',
            'date':'2018-01-20',
          }*/
        ]
      }
    },
    mounted() {
      this.$dialog.loading.close();
      this.minHeight = localStorage.getItem('minHeight');
      //console.log(this.$parent._data.minHeight);
    }

  }
</script>
<style scoped="true">
  .table {
    margin-top: 0.31rem;
    width: 100%;
    font-size: 0.28rem;
    color: #898989;
    text-align: center;
  }

  th {
    font-size: 0.28rem;
    padding-bottom: 0.25rem;
  }

  td {
    padding: 0.25rem 0;
    border-bottom: 1px solid #eee;
    font-size: 0.24rem;
    color: #2f2f2f;
  }
  .noshar{
    width:78%;
    display: block;
    margin:3.1rem auto 0 auto;
  }
  .no-tip{
    font-size: 0.26rem;
    color: #898989;
    margin-top: -0.9rem;
    z-index:100;
  }
</style>
