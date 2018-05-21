<template>
  <div class="container" :style="'min-height:'+minHeight">
    <ul>
      <template v-for="item in list">
      <li v-if="item.type=='card'">
        <img :src="item.pic_name" class="pic" alt="">
        <div class="div-right">
          <div class="disf msg-p top-p">
            <div class="dis">
              <span>{{item.bank_name}}</span>
              <span>（尾号</span>
              <span>{{item.ic_number}}</span>
              <span>）</span>
            </div>
            <div>
              <span class="sign">-</span><span class="value">{{item.money}}</span>
            </div>
          </div>
          <div class="disf msg-p"><span class="time">{{item.creat_time}}</span><span class="state" v-if="item.state=='handing'">正在审核</span><span class="state" v-else>已到账</span></div>
        </div>
      </li>
      <li v-else>
        <img src="../../../static/img/shop/alipay.png" class="pic" alt="">
        <div class="div-right">
          <div class="disf msg-p top-p">
            <div class="dis">
              <span>支付宝</span>
              <span>{{'（'+item.ic_number+'）'}}</span>
            </div>
            <div>
              <span class="sign">-</span><span class="value">{{item.money}}</span>
            </div>
          </div>
          <div class="disf msg-p"><span class="time">{{item.creat_time}}</span><span class="state" v-if="item.state=='handing'">正在审核</span><span class="state" v-else>已到账</span></div>
        </div>
      </li>
      </template>
    </ul>

  </div>
</template>

<script>
  import {get_withdraw_list} from '../../api/index'

  export default {
    data() {
      return {
        minHeight: '',
        params: {
          token: localStorage.getItem('token'),
          page: 1,
          number: 10
        },
        list: []
      }
    },
    created() {
      this.$dialog.loading.close();
      this.minHeight = localStorage.getItem('minHeight');
      this.getList();
    },
    mounted() {
    },
    methods: {
      getList() {
        var _this = this;
        get_withdraw_list(this.params).then(function (res) {
          var data = res.data.data.data;
          data.forEach(function (item) {
            if (item.type == 'card') {
              var len = item.ic_number.length;
              item.ic_number = item.ic_number.substr(len - 4, 4);
            } else {
              var len = item.ic_number.length;
              var num = len - 7;
              var s = '';
              for (var i = 0; i < num; i++) {
                s += '*';
              }
              item.ic_number = item.ic_number.substr(0, 3) + s + item.ic_number.substr(len - 4, 4);
            }
          });
          _this.list = data;
        }).catch(function (err) {
          console.log(err);
        })
      }
    }
  }
</script>
<style scoped="true">
  .container {
    background: #eee;
  }

  li {
    display: flex;
    padding: 0.29rem 0.3rem;
    background: #fff;
    align-items: center;
  }

  .pic {
    width: 0.58rem;
    height: 0.58rem;
    border-radius: 50%;
    margin-right: 0.26rem;
  }

  .div-right {
    flex: 1;
  }

  .msg-p {
    display: flex;
    justify-content: space-between;
  }

  .top-p {
    margin-bottom: 0.18rem;
  }

  .time {
    font-size: 0.26rem;
    color: #898989;
  }

  .dis {
    font-size: 0.28rem;
    color: #2f2f2f;
  }

  .state {
    font-size: 0.26rem;
    color: #2f2f2f;
  }

  .value, .sign {
    font-size: 0.28rem;
    color: #2f2f2f;
  }
</style>
