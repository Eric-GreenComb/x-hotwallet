<template>
  <div>
    <div>
      <yd-button size="large" type="primary" @click.native="show2 = true">设置交易密码</yd-button>
      <yd-keyboard v-model="show2" :callback="done2" disorder ref="keyboardDemo2"></yd-keyboard>
    </div>
    <footer-tab :index="1"></footer-tab>
  </div>
</template>
<script type="text/babel">
  import {set_exchange_api} from '../api/index'
  export default {
    data() {
      return {
        show2: true
      }
    },
    methods: {
      //获取用户的身份信息和输入的密码
      done2(val) {
        //console.log('输入的密码是：' + val ); //  用户输入的密码
        this.$dialog.loading.open('验证支付密码');
        /* 模拟异步验证密码 */
        setTimeout(() => {
         //保存密码至服务端
          var _this=this;
          var obj={
            addr:'0x20B5c492B53919e4bfC279C4a43CE350Bb7fDF7c',
            val:val,
          };
          var str = ''+'0x20B5c492B53919e4bfC279C4a43CE350Bb7fDF7c'+'/'+val; //拼接post请求url
          //http://123.206.29.15:4100/api/v1/account/recover/0x20B5c492B53919e4bfC279C4a43CE350Bb7fDF7c/a11111
          //account/recover/:addr/:newpassword
          // 用户的addr 应从localstorage 中获取  暂时写死了
          set_exchange_api(str).then(function (res) {
            // console.log(res.data); // "0x20B5c492B53919e4bfC279C4a43CE350Bb7fDF7c"  返回值
              _this.$router.push({
                path: '/main/find',
              })
          }).catch(function (err) {
            console.log(err);
          });
           //this.$dialog.alert({mes: "您输入的密码是"+val}); //用户数输入的密码
          //this.$refs.keyboardDemo2.$emit('ydui.keyboard.error', '对不起，您的支付密码不正确，请重新输入。');
          this.$dialog.loading.close();
        }, 1500);
      },
    }
  }
</script>
<style scoped="true">

</style>
