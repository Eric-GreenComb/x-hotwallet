<template>
    <div class="container"></div>
</template>

<script>
  import config from '../api/config'
    export default {
      data(){
        return{
          code:null,
          base:config.base_url
        }
      },
      created () {
        console.log('authore====');
        //记录之前的路由

        var url=this.base+'#/author';
        var encodeUrl=encodeURIComponent(url);
        console.log('encodeUrl',encodeUrl);
        var code=this.getQueryString('code');
        if(code==null){
          //刚开始进入没有授权时
          //授权以后调回author界面
          var query=encodeURIComponent(this.$route.query.redirect);
          location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa7641616abe7bf5f&redirect_uri='+encodeUrl+'&response_type=code&scope=snsapi_userInfor&state='+query+'#wechat_redirect';
        }else{
          //已经有code后
          localStorage.setItem('userInfor1',{'name':'lily'});
          console.log(localStorage.getItem('userInfor1'));
          location.href=this.base+'#'+decodeURIComponent (this.getQueryString('state'));
          /*this.$router.push();*/
        }


      },
      methods: {
        getQueryString(name) {
          var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
          var r = window.location.search.substr(1).match(reg);
          if (r != null) {
            return unescape(r[2]);
          }
          return null;
        }
       /* login () {
          let url = this.webUrl + '/Wap/User/info'
          // 通过cookie中保存的token 获取用户信息
          this.$http.get(url).then(response => {
            response = response.body
            if(response){
              // 保存用户登录状态(Vuex)
              this.$store.commit('user', response)
              setTimeout(() => {
                this.goBeforeLoginUrl() // 页面恢复(进入用户一开始请求的页面)
              }, 2000)
            }else{
              this.$alert('服务器撸猫去惹 :(', 'wrong')
              if(holdno.cookie.get('user')){
                // 跳转到微信授权页面
                window.location.href = this.webUrl + '/Wap/User/getOpenid'
              }
            }
          })
        }*/
      }
    }
</script>
<style scoped="true">

</style>
