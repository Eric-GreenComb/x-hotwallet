<template>
  <div class="container" :style="'min-height:'+minHeight">
    <div class="row">
      <span class="label">姓名：</span>
      <input type="text" v-model="name" placeholder="请输入真实姓名" class="input">
    </div>
    <div class="row" @click="show2 = true">
      <span class="label">性别：</span>
      <input type="text" v-model="sex" placeholder="请选择性别" class="input" disabled>
      <i class="icon iconfont icon-xiajiantou-copy"></i>
    </div>
    <yd-actionsheet :items="myItems2" v-model="show2"></yd-actionsheet>
    <button class="btn" @click="updateInfor()">完成</button>

  </div>
</template>

<script>
  import {update_register_infor} from '../api/index'

  export default {
    data() {
      return {
        minHeight: '',
        name: '',
        sex: '',
        show2: false,
        myItems2: [
          {
            label: '男',
            callback: () => {
              this.sex = '男';
            }
          },
          {
            label: '女',
            callback: () => {
              this.sex = '女';
            }
          }

        ]
      }
    },
    created() {
      this.$dialog.loading.close();
      if (this.$route.query.redirect) {
        this.redirect = this.$route.query.redirect;
      } else {
        this.redirect = '/';
      }
      this.minHeight = localStorage.getItem('minHeight');
    },
    mounted() {


    },
    methods: {
      updateInfor() {
        var _this = this;
        if (this.name == '') {
          this.$dialog.toast({
            mes: '请完善姓名信息',
            timeout: 1200
          });
        } else if (this.sex == '') {
          this.$dialog.toast({
            mes: '请完善性别信息',
            timeout: 1200
          });
        } else {
          var obj = {
            name: this.name,
            sex: this.sex,
            token: localStorage.getItem('token')
          };
          _this.$dialog.loading.open('');
          //alert(localStorage.getItem('token'));
          update_register_infor(obj).then(function (res) {
            //console.log(res);
            _this.$dialog.loading.close();
            if (res.data.errcode == 0) {
              //alert('完善成功');
              _this.$dialog.toast({
                mes: '保存成功',
                timeout: 1000
              });
              localStorage.setItem('invite_code', res.data.data.invite_code);
              //alert(_this.redirect);
              if (_this.$route.query.isLogin) {
                //alert('isLogin');
                _this.$router.push(_this.redirect);
              } else {
                _this.$router.push({
                  path: '/login',
                  query: {'redirect': _this.redirect}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
                })
              }

            } else {
              _this.$dialog.toast({
                mes: res.data.errdesc,
                timeout: 1500
              });
            }
          }).catch(function (err) {
            console.log(err);
          })
        }

      }
    }
  }
</script>
<style scoped="true">
  .container {
    background: #eee;
  }

  .row {
    display: flex;
    align-items: center;
    padding: 0.36rem 0.29rem;
    background: #fff;
    margin-bottom: 1px;
    font-size: 0.28rem;
    color: #2f2f2f;
  }

  input {
    font-size: 0.28rem;
    color: #2f2f2f;
  }

  .label {
    color: #2f2f2f;
    margin-right: 0.2rem;
    width: 1rem;
    display: inline-block;
  }

  .input {
    flex: 1;
    width: 60%;
  }

  .icon-xiajiantou-copy {
    color: #898989;
    font-size: 0.24rem;
    margin-left: 0.3rem;
  }

  .btn {
    display: block;
    width: 6.90rem;
    height: 0.80rem;
    line-height: 0.80rem;
    background-color: #b81f23;
    border-radius: 2px;
    font-size: 0.30rem;
    color: #ffffff;
    text-align: center;
    border: 0;
    margin: 1rem auto 0 auto;
  }

  input::input-placeholder {
    font-size: 0.26rem;
    color: #a4a4a4;
  }

  input::-webkit-input-placeholder {
    font-size: 0.26rem;
    color: #a4a4a4;
  }

  input:-ms-input-placeholder {
    font-size: 0.26rem;
    color: #a4a4a4;
  }

  input:-moz-placeholder {
    font-size: 0.26rem;
    color: #a4a4a4;
  }

  input::-moz-placeholder {
    font-size: 0.26rem;
    color: #a4a4a4;
  }

</style>
