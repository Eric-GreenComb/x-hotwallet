<template>
  <div class="container" :style="'min-height:'+minHeight">
    <ul class="ul">
      <li class="row disf bor">
        <span class="left label">头像</span>
        <div class="right disf header-right">
          <div class="header-div">
            <img src="../../../static/img/shop/default_header.png" v-if="head_pic==''" class="header" alt="">
            <img :src="head_pic" v-else class="header" alt="">
          </div>
          <!--<i class="icon iconfont icon-youjiantou"></i>-->
        </div>
      </li>
      <li class="row disf bor">
        <span class="left label">姓名</span>
        <div class="right">
          <input type="text" v-model="nick_name" placeholder="未填写" class="text-right" readonly
                 @focus="record('nick_name')" @blur="update('nick_name')">
          <!--<i class="icon iconfont icon-youjiantou"></i>-->
        </div>
      </li>
      <!--<li class="row disf">
        <span class="left label">姓名</span>
        <div class="right">
          <input type="text" v-model="name" placeholder="未填写" class="text-right" readonly @focus="record('name')"
                 @blur="update('name')">
          &lt;!&ndash;<i class="icon iconfont icon-youjiantou"></i>&ndash;&gt;
        </div>
      </li>-->
      <li class="row disf bor">
        <span class="left label">生日</span>
        <div class="right" @click="open">
          <yd-datetime type="date" class="datetime" ref="datetime" v-model="birthday1" start-date="1900-01-01"
                       :end-date="endDate" :init-emit="false" :callback="chooseBirthday"></yd-datetime>
          <!--<input type="text" v-model="birthday" placeholder="未填写" @click="open" disabled @blur="updateInfor('birthday',birthday)">-->
          <span>{{birthday}}</span>
          <i class="icon iconfont icon-youjiantou"></i>
        </div>
      </li>
      <li class="row disf bor">
        <span class="left label">性别</span>
        <div class="right" @click.stop="showSex=true">
          <span>{{sex}}</span>
          <i class="icon iconfont icon-youjiantou"></i>
        </div>
      </li>
      <li class="row disf bor">
        <span class="left label">地区</span>
        <div class="right" @click.stop="showAddress=true">
          <span>{{address}}</span>
          <i class="icon iconfont icon-youjiantou"></i>
        </div>
      </li>
    </ul>
    <yd-actionsheet :items="sexItem" v-model="showSex"></yd-actionsheet>
    <yd-cityselect v-model="showAddress" :callback="chooseAddress" :items="district"></yd-cityselect>


  </div>
</template>

<script>
  import {uploadheadpic, update_userSimpleInfo, getPersonInfo} from '../../api/index'
  import District from 'ydui-district/dist/jd_province_city_area_id';

  export default {
    data() {
      return {
        minHeight: '',
        sexItem: [
          {
            label: '男',
            callback: () => {
              this.sex = '男';
              this.updateInfor('sex', this.sex);
              /* 注意： callback: function() {} 和 callback() {}  这样是无法正常使用当前this的 */
            }
          },
          {
            label: '女',
            callback: () => {
              this.sex = '女';
              this.updateInfor('sex', this.sex);

            }
          }
        ],
        nick_name: '',
        before_nick_name: '',
        name: '',
        before_name: '',
        showSex: false,
        sex: '未填写',
        birthday: '未填写',
        birthday1: '',
        endDate: '',
        showAddress: false,
        address: '未填写',
        district: District,

        head_pic: ''

      }
    },
    watch: {},
    created() {
      this.$dialog.loading.close();
      this.minHeight = localStorage.getItem('minHeight');
      this.endDate = new Date().Format("yyyy-MM-dd");
      this.getUserInfor();


    },
    mounted() {
      this.wxutils.wxConfig();

    },
    methods: {
      record(type) {
        switch (type) {
          case 'name':
            this.before_name = this.name;
            break;
          case 'nick_name':
            this.before_nick_name = this.nick_name;
            break;
        }
      },
      update(type) {
        switch (type) {
          case 'name':
            if (this.name != this.before_name) {
              this.updateInfor('name', this.name);
            }
            break;
          case 'nick_name':
            if (this.nick_name != this.before_nick_name) {
              this.updateInfor('nick_name', this.nick_name);
            }
            break;
        }


      },
      //选择生日
      open() {
        this.$refs.datetime.open();
      },
      //选择地址回调
      chooseAddress(ret) {
        this.address = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
        this.updateInfor('address', this.address);
      },
      //选择生日回调
      chooseBirthday() {
        this.birthday = this.birthday1;
        this.updateInfor('birthday', this.birthday);

      },
      //更新用户信息
      updateInfor(type, value) {
        var _this = this;
        var obj = {
          token: localStorage.getItem('token'),
          type: type,
          value: value
        };
        update_userSimpleInfo(obj).then(function (res) {
          if (res.data.errcode == 0) {
            _this.$dialog.toast({
              mes: '保存成功',
              timeout: 1500,
              icon: 'success'
            });
          } else {
            _this.$dialog.toast({
              mes: res.data.errdesc,
              timeout: 1500
            });
          }
        }).catch(function (err) {
          console.log(err);
        })
      },
      //获取个人信息
      getUserInfor() {
        var _this = this;
        this.$dialog.loading.open('');
        getPersonInfo({'token': localStorage.getItem('token')}).then(function (res) {
          //console.log('infor',res);
          var data = res.data.data;
          _this.address = data.address;
          _this.birthday = data.birthday;
          _this.head_pic = data.head_pic;
          _this.nick_name = data.nick_name;
          _this.sex = data.sex;
          _this.name = data.name;
          _this.$dialog.loading.close();

        }).catch(function (err) {
          console.log(err);
        })
      },
      updateHeader() {
        var _this = this;
        //拍照或从手机相册中选图接口
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            _this.head_pic = localIds[0];
            //alert(localIds);
            //上传图片接口
            //上传图片有效期3天，可用微信多媒体接口下载图片到自己的服务器，此处获得的 serverId 即 media_id。
            wx.uploadImage({
              localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
              isShowProgressTips: 1, // 默认为1，显示进度提示
              success: function (res) {
                var serverId = res.serverId; // 返回图片的服务器端ID
                wx.downloadImage({
                  serverId: serverId, // 需要下载的图片的服务器端ID，由uploadImage接口获得
                  isShowProgressTips: 1, // 默认为1，显示进度提示
                  success: function (res) {
                    var localId = res.localId; // 返回图片下载后的本地ID
                    alert(localId);
                  }
                });
              }
            });
          }
        });
      }
    }
  }
</script>
<style scoped="true">
  @import '../../../static/css/my/person_information.css';
</style>
