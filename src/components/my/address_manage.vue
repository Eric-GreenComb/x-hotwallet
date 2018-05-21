<template>
  <div class="container  address-manage-container" :style="'min-height: '+minHeight">
    <!--头部-->
    <!--  <yd-navbar class="navbar" title="管理收货地址" :fixed="true" fontsize="0.36rem" color="#2f2f2f" height="1rem">
        <router-link to="/main/my" slot="left">
          <yd-navbar-back-icon color="#2f2f2f"></yd-navbar-back-icon>
        </router-link>
      </yd-navbar>-->
    <ul class="address-box">
      <li class="address-li" v-for="item in addressList">
        <p class="row disf"><span class="name">{{item.user_name}}</span><span class="mobile">{{item.mobile}}</span></p>
        <p class="row disf address-msg">{{item.simple_adress + item.detail_adress}}</p>
        <div class="row disf mar">
          <div class="choose-default disf alic" @click="setDefault(item.id,item.is_default)">
            <i class="icon iconfont icon-iconfontxuanzhong" v-if="item.is_default==1"></i>
            <i class="icon iconfont icon-weixuanzhong-01" v-else></i>
            <span class="default-text" v-if="item.is_default==1">默认地址</span>
            <span class="default-text" v-else>设为默认</span>
          </div>
          <div class="edit-delete disf alic">
            <i class="icon iconfont icon-bianji" @click="editAddress(item)"></i><span class="default-text"
                                                                                      @click="editAddress(item)">编辑</span>
            <span class="icon iconfont icon-shanchu" @click="deleteAddress(item.id)"></span><span class="default-text"
                                                                                                  @click="deleteAddress(item.id)">删除</span>
          </div>
        </div>
      </li>

    </ul>
    <router-link to="/main/new_address/add/0?back=/main/address_manage">
      <p class="new-btn">添加新地址</p>
    </router-link>

  </div>
</template>

<script>
  import {get_my_adress, delete_my_address, setDefault_address} from '../../api/index'

  export default {
    data() {
      return {
        minHeight: '',
        defaultId: 0,
        token: '',
        addressList: []
      }
    },
    mounted() {
      this.$dialog.loading.close();

      this.token = localStorage.getItem('token');
      this.minHeight = localStorage.getItem('minHeight');
      this.getAddressList();
    },
    methods: {
      //获取我的地址列表
      getAddressList() {
        var _this = this;
        /*token赋值后期改*/
        this.$dialog.loading.open('加载中...');
        get_my_adress({'token': _this.token}).then(function (res) {
          //console.log('res',res);
          var data = res.data.data;
          _this.addressList = data;
          _this.$dialog.loading.close();
        }).catch(function (err) {
          console.log(err);
        })
      },
      //删除地址
      deleteAddress(id) {
        this.$dialog.loading.open('加载中...');
        var _this = this;
        var obj = {
          'token': this.token,
          'address_id': id
        };
        delete_my_address(obj).then(function (res) {
          // console.log('delete',res);
          _this.$dialog.loading.close();
          if (res.data.errcode == 0) {
            _this.$dialog.toast({
              mes: '删除成功',
              timeout: 1500,
              icon: 'success'
            });
            _this.getAddressList();
          } else {
            _this.$dialog.toast({
              mes: res.data.errdesc,
              timeout: 1500,
              icon: 'error'
            });
          }
        }).catch(function (err) {
          console.log(err);
        })
      },
      //设置为默认、非默认地址
      setDefault(id, is_default_origin) {
        this.$dialog.loading.open('加载中...');
        var _this = this;
        var obj = {
          token: this.token,
          address_id: id,
          is_default: 0
        };
        if (is_default_origin == 0) {
          obj.is_default = 1;
        } else {
          obj.is_default = 1;
          _this.$dialog.loading.close();
          return;
        }
        setDefault_address(obj).then(function (res) {
          _this.$dialog.loading.close();
          if (res.data.errcode == 0) {
            _this.$dialog.toast({
              mes: '设置默认地址成功',
              timeout: 1500,
              icon: 'success'
            });
            _this.getAddressList();
          } else {
            _this.$dialog.toast({
              mes: res.data.errdesc,
              timeout: 1500,
              icon: 'error'
            });
          }
        }).catch(function (err) {
          console.log(err);
        })
      },
      //编辑收获地址
      editAddress(item) {
        var addresss = JSON.stringify(item);
        localStorage.setItem('address', addresss);
        this.$router.push('/main/new_address/edit/' + item.id + '?back=/main/address_manage');
      }
    }
  }
</script>
<style scoped="true">
  @import "../../../static/css/my/address-manage.css";
</style>
