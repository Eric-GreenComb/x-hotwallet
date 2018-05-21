<template>
  <div class="container  new-address-container" :style="'min-height: '+minHeight">
    <!--头部-->
    <!--    <yd-navbar class="navbar" :title="title" :fixed="true" fontsize="0.36rem" color="#2f2f2f" height="1rem">
          <router-link to="/main/address_manage" slot="left">
            <yd-navbar-back-icon color="#2f2f2f"></yd-navbar-back-icon>
          </router-link>
        </yd-navbar>-->
    <div class="new-box">
      <p class="row disf">
        <span class="label-span">收货人</span>
        <input class="input" type="text" v-model="params.user_name" placeholder="请输入姓名">
      </p>
      <p class="row disf">
        <span class="label-span">联系电话</span>
        <input class="input" type="text" v-model.number="params.mobile" placeholder="请输入联系电话">
      </p>
      <p class="row disf">
        <span class="label-span">选择地区</span>
        <input class="input" type="text" @click.stop="show1 = true" v-model="params.simple_adress" readonly
               placeholder="选择地区">
      </p>
      <p class="row disf detail-address">
        <span class="label-span">详细地址</span>
        <textarea class="input" v-model="params.detail_adress" rows=4    placeholder="街道门牌信息"></textarea>
      </p>


    </div>
    <p class="row disf defalut-p" v-if="isAdd" @click="setDefalut">
      <i class="icon iconfont icon-iconfontxuanzhong" v-if="params.is_default==1"></i>
      <i class="icon iconfont icon-weixuanzhong-01" v-else></i>
      <span class="">设为默认地址</span>
    </p>
    <!--  <p class="defalut-p disf"><i class="icon iconfont icon-weixuanzhong-01"></i><span class="set-default">设为默认地址</span></p>-->

    <yd-cityselect v-model="show1" title="选择地区" :callback="result1" :items="district"></yd-cityselect>

    <p class="bottom-btn disf"><span class="btn cancel-btn" @click="cancel">取消</span><span class="btn save-btn"
                                                                                           @click="save">保存</span>
    </p>
  </div>
</template>

<script>
  import District from 'ydui-district/dist/jd_province_city_area_id';
  import {add_Shoping_Adress} from './../../api/index'

  export default {
    data() {
      return {
        minHeight: '',
        from: '',
        show1: false,
        model1: '',
        district: District,
        isDefault: true,
        title: '',
        isAdd: true,
        back: '',
        params: {
          id: '',
          user_id: '',
          province_id: '',
          city_id: '',
          simple_adress: '',
          user_name: '',
          mobile: '',
          detail_adress: '',
          is_default: '0',
        }
      }
    },
    created() {
      this.$dialog.loading.close();

    },
    mounted() {
      this.back = this.$route.query.back;
      this.params.user_id = localStorage.getItem('uid');
      this.minHeight = localStorage.getItem('minHeight');
      //console.log(this.$parent._data.minHeight);
      this.from = localStorage.getItem('from');
      if (this.$route.params.type == 'add') {
        this.title = '添加新地址';
        this.params.id = 0;
      } else {
        this.params.id = this.$route.params.id;
        this.params = JSON.parse(localStorage.getItem('address'));
        this.title = '修改地址';
        this.isAdd = false;

      }


    },
    methods: {
      //打开城市选择器
      result1(ret) {
        console.log('ret', ret);
        this.params.simple_adress = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
        this.params.province_id = ret.itemValue1;
        this.params.city_id = ret.itemValue2;
      },
      //设为默认值
      setDefalut() {
        if (this.params.is_default == 0) {
          this.params.is_default = 1;
        } else {
          this.params.is_default = 0;
        }

      },
      //保存地址
      save() {
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        var _this = this;
        if (this.params.user_name.length < 2) {
          this.$dialog.alert({mes: '收货人姓名请不要少于2个字'});
        } else if (!myreg.test(this.params.mobile)) {
          this.$dialog.alert({mes: '请填写正确的手机号码'});
        } else if (this.params.simple_adress.length <= 0) {
          this.$dialog.alert({mes: '请选择地区'});
        } else if (this.params.detail_adress.length == 0) {
          this.$dialog.alert({mes: '请填写详细地址'});
        } else if (this.params.detail_adress.length < 5) {
          this.$dialog.alert({mes: '详细地址请不要少于5个字'});
        } else {
          add_Shoping_Adress(this.params).then(function (res) {
            //console.log(res);
            if (res.data.errcode == 0) {
              _this.$dialog.toast({
                mes: '保存成功',
                timeout: 1000,
                icon: 'success'
              });
              localStorage.removeItem('address');
              _this.params.id = res.data.data.id;
              sessionStorage.setItem('orderAddress', JSON.stringify(_this.params));
              setTimeout(function () {
                _this.$router.push(_this.back);
              }, 2000);

            } else {
              _this.$dialog.toast({
                mes: res.data.errdesc,
                timeout: 1500,
                icon: 'error'
              });
            }
          }).catch(function (err) {
            console.log(err)
          })
        }
      },
      //取消
      cancel() {
        this.$router.push(this.from);
      }

    }
  }
</script>
<style scoped="true">
  @import "../../../static/css/my/new_address.css";
</style>
