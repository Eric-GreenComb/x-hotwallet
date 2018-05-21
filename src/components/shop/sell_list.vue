<template>
  <div class="container my-share-container" :style="'min-height:'+minHeight">
    <ul>
      <li class="row disf">
        <div>
          <p class="desc">安静的美少女购买您的XX产品</p>
          <p class="time">4月11日 11:14:58</p>
        </div>
        <div class="money">+120.00</div>
      </li>
    </ul>
    <img src="../../../static/img/shop/noshare.png" class="noshar" alt="" v-if="list.length==0">
    <p class="texac no-tip" v-if="list.length==0">暂无销售记录</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        minHeight: '',
        list: [
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
  .row {
    padding: 0.24rem 0.29rem;
    justify-content: space-between;
    align-items: center;
  }

  .desc {
    font-size: 0.28rem;
    color: #2f2f2f;
  }

  .time {
    font-size: 0.26rem;
    color: #898989;
    margin-top: 0.19rem;
  }

  .money {
    font-size: 0.30rem;
    color: #2f2f2f;
  }

  .noshar {
    width: 78%;
    display: block;
    margin: 3.1rem auto 0 auto;
  }

  .no-tip {
    font-size: 0.26rem;
    color: #898989;
    margin-top: -0.9rem;
    z-index: 100;
  }
</style>
