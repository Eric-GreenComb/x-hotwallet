<template>
  <div class="container choose-address-container" :style="'min-height: '+minHeight">
    <!--头部-->
    <!--    <yd-navbar class="navbar" title="选择收货地址" :fixed="true" fontsize="0.36rem" color="#2f2f2f" height="1rem">
          <router-link to="/" slot="left">
            <yd-navbar-back-icon color="#2f2f2f"></yd-navbar-back-icon>
          </router-link>
          <router-link to="/main/address_manage" slot="right">
            <span>编辑</span>
          </router-link>
        </yd-navbar>-->
    <ul class="address-list">
      <li class="address-li" v-for="item in addressList" @click="chooseAddress(item)">
        <p class="name-mobile disf"><span>{{item.user_name}}</span><span>{{item.mobile}}</span></p>
        <p class="address"><span class="default"
                                 v-if="item.is_default==1">[默认地址] </span>{{item.simple_adress + item.detail_adress}}</p>
      </li>
    </ul>
    <router-link :to="'/main/new_address/add/0?back='+back">
      <p class="new-btn">添加新地址</p>
    </router-link>
  </div>
</template>

<script>
  import {get_my_adress} from '../../api/index'

  export default {
    data() {
      return {
        minHeight: '',
        token: '',
        addressList: [],
        back: ''
      }
    },
    mounted() {
      this.$dialog.loading.close();
      this.back = this.$route.query.back;
      this.token = localStorage.getItem('token');
      this.minHeight = localStorage.getItem('minHeight');
      //console.log(this.$parent._data.minHeight);
      this.getAddressList();
    },
    methods: {
      //获取我的地址列表
      getAddressList() {
        var _this = this;
        /*token赋值后期改*/
        this.$dialog.loading.open('加载中...');
        get_my_adress({'token': _this.token}).then(function (res) {
          //console.log('res', res);
          var data = res.data.data;
          _this.addressList = data;
          _this.$dialog.loading.close();
        }).catch(function (err) {
          console.log(err);
        })
      },
      //选择地址
      chooseAddress(item) {
        //console.log('item', item);
        sessionStorage.setItem('orderAddress', JSON.stringify(item));
        this.$router.push(this.back)
      }
    }
  }
</script>
<style scoped="true">
  .choose-address-container {
    background: #eee;
    padding-bottom: 0.9rem;
  }

  .address-li {
    padding: 0.3rem;
    border-bottom: 1px solid #eee;
    background: #fff;
  }

  .name-mobile {
    font-size: 0.28rem;
    color: #2f2f2f;
    justify-content: space-between;
  }

  .address {
    font-size: 0.24rem;
    color: #2f2f2f;
    margin-top: 0.21rem;
  }

  .default {
    color: #b81f23;
  }

  .new-btn {
    width: 100%;
    height: 0.9rem;
    background-color: #b81f23;
    text-align: center;
    line-height: 0.9rem;
    color: #fff;
    font-size: 0.3rem;
    position: fixed;
    bottom: 0;
    left: 0;
  }
</style>
