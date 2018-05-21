import Vue from 'vue'
import axios from 'axios'
import Router from 'vue-router'
import config from '../api/config'
import Index from '../components/index/index.vue'

Vue.use(Router);

var router = new Router({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes: [
    {
      path: '/wallet',
      name: 'wallet',
      meta: {
        title: '首页',
        requireAuth: true
      },
      component: resolve => require(['../components/wallet.vue'], resolve)
    },
    {
      path: '/create_account',
      name: 'create_account',
      meta: {
        title: '创建账户'
      },
      component: resolve => require(['../components/create_account.vue'], resolve)
    },
    {
      path: '/score_list',
      name: 'score_list',
      meta: {
        title: '积分'
      },
      component: resolve => require(['../components/score_list.vue'], resolve)
    },
    {
      path: '/transfer/:address/:balance',
      name: 'transfer',
      meta: {
        title: '积分'
      },
      component: resolve => require(['../components/transfer.vue'], resolve)
    },
    {
      path: '/transfer_list/:tokenaddress',
      name: 'transfer_list',
      meta: {
        title: '交易明细'
      },
      component: resolve => require(['../components/transfer_list.vue'], resolve)
    },
    {
      path: '/invite_code',
      name: 'invite_code',
      meta: {
        title: '注册'
      },
      component: resolve => require(['../components/invite_code.vue'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: resolve => require(['../components/login.vue'], resolve)
    },
    {
      path: '/forget_pass',
      name: 'forget_pass',
      meta: {
        title: '修改密码'
      },
      component: resolve => require(['../components/forget_pass.vue'], resolve)
    },
    {
      path: '/set_pass',
      name: 'set_pass',
      meta: {
        title: '修改密码'
      },
      component: resolve => require(['../components/set_pass.vue'], resolve)
    },
    {
      path: '/reset_tel',
      name: 'reset_tel',
      meta: {
        title: '设置交易密码'
      },
      component: resolve => require(['../components/reset_tel.vue'], resolve)
    },
    {
      path: '/',
      name: 'index',
      meta: {
        title: '首页',
        keepAlive: true,
        isBack:false,
      },
      component: Index
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: '注册'
      },
      component: resolve => require(['../components/register.vue'], resolve)
    }
  ]
});

router.beforeEach((to, from, next) => {
  // console.log('to',to.fullPath)
  /*if(to.meta.title){
    /!*路由变化修改title*!/
    if(to.fullPath == '/main/connect_list/sales_sv'){
      console.log('ok')
      document.title = '售后问题'
    }
    next();
  }*/
  //记住URL
  localStorage.setItem('from', from.fullPath);
  localStorage.setItem('to', to.fullPath);
  var u = navigator.userAgent;
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  // XXX: 修复iOS版微信HTML5 History兼容性问题
  //var urlbase = config.base_url + '#';
  var urlbase = config.domain+location.pathname + '#';
  if (isiOS && !sessionStorage.getItem('iosurl')) {
    sessionStorage.setItem('iosurl', urlbase + to.fullPath);
    //alert(sessionStorage.getItem('iosurl'));
  }
  //判断是否需要登录
  if (to.meta.requireAuth) {
    //检测token是否已经登录
    if (localStorage.getItem('token')) {
      //登录了
      next();
    } else {
      sessionStorage.setItem('redirect', to.fullPath);
      //没登录
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
});
// http response 拦截器
axios.interceptors.response.use(
  response => {
    //未登录状态时调用接口
    if (response.data.errcode == 9999) {
      new Vue().$dialog.confirm({
        title: '您还未登录',
        mes: response.data.errdesc,
        opts: [
          {
            txt: '确定',
            color: true,
            callback: () => {
              window.localStorage.removeItem('token');
              setTimeout(function () {
                router.replace({
                  path: '/login',
                  query: {redirect: router.currentRoute.fullPath}
                });
              }, 500);
            }
          }
        ]
      });

      return;
    }
    return response;
  },
  error => {
    if (error.response) {
      console.log('errorerror=====', error.response);
    }
  });


export default router;
