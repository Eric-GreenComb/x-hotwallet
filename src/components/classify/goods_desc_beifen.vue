<template>
  <div class="container desc-container" id="container">
    <yd-navbar class="navbar" :fixed="true" fontsize="0.36rem" color="#2f2f2f" height="1rem">
      <!--      <router-link :to="from" slot="left">
              <yd-navbar-back-icon color="#2f2f2f"></yd-navbar-back-icon>
            </router-link>-->
      <div slot="center">
        <i class="icon iconfont icon-location" v-if="to=='goods'"></i>
        <span class="goods" @click="scrollTo('goods')">商品</span>
        <i class="icon iconfont icon-location" v-if="to=='desc'"></i>
        <span class="goods" @click="scrollTo('desc')">详情</span>
        <i class="icon iconfont icon-location" v-if="to=='material'"></i>
        <span @click="scrollTo('material')">素材</span>
      </div>
    </yd-navbar>

    <div class="swiper-self-continer">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in sliderImgs">
            <img class="slider-img" :src="item" alt="">
          </div>
        </div>
        <div class="len"><span>{{curPicIndex}}</span><span> / </span><span>{{len}}</span></div>
      </div>
    </div>

    <div class="box">
      <p class="goods-name">{{goodsName + ' ' + choosed.names}}</p>
<!--      <p class="disf goods-pri" v-if="isVip==1">
        <span class="sign">￥</span>
        <span class="goods-price">{{choosed.vip_price}}</span>
        <span class="goods-price gray-price">{{'￥' + choosed.original_price}}</span>
      </p>
      <p class="disf goods-pri" v-else>
        <span class="sign">￥</span>
        <span class="goods-price">{{choosed.original_price}}</span>
      </p>-->
      <p class="disf goods-pri">
        <span class="sign">￥</span>
        <span class="goods-price">{{choosed.original_price}}</span>
      </p>
      <p class="stock"><span>库存</span><span>{{choosed.stock}}</span></p>
      <p class="jf"><span class="jf-text">积分</span><span class="get-jf">{{'购买可得' + choosed.integral + '积分'}}</span></p>
    </div>
    <div class="size" @click="showSizeCover">
      <span>已选择：</span><span>{{choosed.names}}</span><span>，</span><span>{{count}}</span><span>件</span>
      <i class="icon iconfont icon-youjiantou choose-icon"></i>
    </div>
    <!--商品详情-->
    <div id="desc-content"><img src="../../../static/img/goods-desc.png" class="desc-pic" alt=""></div>
    <div id="material"><img src="../../../static/img/material.jpg" class="desc-pic" alt=""></div>
    <!--立即购买-->
    <div class="buy">
      <router-link to="/main/shoppingcart" class="btn cart">
        <i class="icon iconfont icon-gouwuche"></i>
        <p>购物车</p>
      </router-link>
      <div class="btn cart" @click="addShelves()">
        <i class="icon iconfont icon-shangjia"></i>
        <p>上架</p>
      </div>

      <span class="btn buy-now" @click="showSizeCover">买</span>
      <span class="btn sell" @click="showShare">卖</span>
    </div>
    <!--遮罩层-->
    <cover :isShowSize="isShowSize" :closeByZhao="true" @coverClose="coverClose">
      <!--已选商品信息-->
      <div class="choose-msg disf">
        <i class="icon iconfont icon-guanbi" @click="coverClose"></i>
        <div class="img-container">
          <img :src="sliderImgs[0]" alt="">
        </div>
        <div class="choosed-div">
<!--          <p class="disf goods-pri" v-if="isVip==1">
            <span class="sign">￥</span>
            <span class="goods-price">{{choosed.vip_price}}</span>
            <span class="goods-price gray-price">{{'￥' + choosed.original_price}}</span>
          </p>
          <p class="disf goods-pri" v-else>
            <span class="sign">￥</span>
            <span class="goods-price">{{choosed.original_price}}</span>
          </p>-->
          <p class="disf goods-pri">
            <span class="sign">￥</span>
            <span class="goods-price">{{choosed.original_price}}</span>
          </p>
          <p class="stock"><span>库存</span><span>{{choosed.stock}}</span></p>
          <p class="choosed-size">
            <span>已选择：</span><span>{{choosed.names}}</span><span>，</span><span>{{count}}</span><span>件</span></p>
        </div>
      </div>
      <!--商品规格-->
      <div class="options-container">
        <template v-for="(item,index) in optionsArr">
          <p class="row option-title">{{item.propName}}</p>
          <ul class="row options-ul" :data-propId="item.propId">
            <template v-for="(value,i) in item.values">
              <li class="options-li">
                <span class="options" :data-valueId="value.valueId"
                      :class="{'options-choosed':choosed.names.indexOf(value.name)>=0}"
                      @click="chooseOptions(value.name,item.propId,value.valueId)">{{value.name}}</span>

              </li>
            </template>

          </ul>
        </template>

        <p class="row buy-num">购买数量</p>
        <table class="count-div row">
          <tr>
            <td class="common-discount" :class="{'common-disabled':discountDisabled}" @click="discount">-</td>
            <td class="common-num">{{count}}</td>
            <td
              class="common-add" @click="add">+
            </td>
          </tr>
        </table>
      </div>
      <!--加入购物车，立即购买-->
      <div class="disf">
        <div class="bt add-cart-bt" @click="addToCart">加入购物车</div>
        <div class="bt buy-now-bt" @click="buyNow">立即购买</div>
      </div>
    </cover>
    <div class="sell-cover" :style="'height:'+minHeight" @click="shareShow=false" v-if="shareShow">
      <img src="../../../static/img/click-share.png" class="click-share" alt="">
    </div>
  </div>
</template>

<script>
  import {getDetailGoods, add_shopping_cart, add_shelves} from './../../api/index'
  import Cover from '../common_components/cover.vue'
  import config from '../../api/config'

  export default {
    data() {
      return {
        from: '',
        to: 'goods',
        id: 0,
        len: 0,
        curPicIndex: 1,
        isVip: 0,
        minHeight: '',
        isShowSize: false,
        count: 1,
        discountDisabled: true,
        sliderImgs: [],
        optionsArr: [],
        choosed: {},
        priceUnits: [],
        goodsName: '',
        goodsType: '',//商品类型，普通、抢购、团购
        shareShow: false,
        params:{
          invite_code:''
        }

      }
    },
    created(){
      this.$dialog.loading.close();
      this.isVip = localStorage.getItem('isVip');
      //窗口高度
      this.minHeight = localStorage.getItem('minHeight');
      //上一个页面链接
      this.from = localStorage.getItem('from');
      //商品id
      this.id = this.$route.params.id;

      if (this.$route.query.invite_code) {
        //alert('hsa');
        this.params.invite_code = this.$route.query.invite_code;
        sessionStorage.setItem('inviter', this.$route.query.invite_code);
      } else {
        //alert('no');
        if(localStorage.getItem('invite_code')){
          this.params.invite_code = localStorage.getItem('invite_code');
        }else {
          sessionStorage.setItem('redirect', '/main/goods_desc/'+this.id);
          //没登录
          this.$router.push({
            path: '/unlogin',
            query: {redirect: '/main/goods_desc/'+this.id}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
        }
      }
    },
    mounted() {
      var _this = this;
      this.getDetail();
      var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        /*autoplay: true,*/
        on: {
          slideChangeTransitionStart: function () {
            console.log(this.activeIndex);
            //轮播图循环播放时，用realIndex获取真实索引值
            if(_this.len==0){
              _this.curPicIndex =0;
            }else if(_this.len==1){
              _this.curPicIndex =1;
            }else{
              _this.curPicIndex = Number(this.realIndex)+1;

            }
          },
        },

      });


    },
    watch: {
      count(n, o) {
        if (n <= 1) {
          this.discountDisabled = true;
        } else {
          this.discountDisabled = false;

        }
      }
    },
    methods: {
      //显示分享
      showShare() {
        this.shareShow = true;
        /*this.disabledScroll();*/
      },
      //获取商品详情
      getDetail() {
        var _this = this;
        getDetailGoods({'goods_id': this.id}).then(function (res) {
          console.log(res.data.data);
          var data = res.data.data;
          _this.goodsName = data.goods_name;
          _this.goodsType = data.type;
          _this.sliderImgs = data.pics;
          _this.len = data.pics.length;
          if(_this.len==0){
            _this.curPicIndex =0;
          }else if(_this.len==1){
            _this.curPicIndex =1;
          }
          _this.optionsArr = data.skuProps;
          //默认选择的为第一个
          _this.choosed = data.priceUnits[0];

          /*          _this.priceUnits=[{
                      'integral':'10',
                      'price_id':'1',
                      "names": "红色 32G",
                      "pvs": "1:1;2:5",
                      "profit": "10",
                      "original_price": "60",
                      "vip_price": "50",
                      "stock": "10"
                    },
                      {
                        'integral':'20',
                        'price_id':'2',
                        "names": "灰色 32G",
                        "pvs": "1:2;2:5",
                        "profit": "20",
                        "original_price": "100",
                        "vip_price": "30",
                        "stock": "10"
                      }];*/
          _this.priceUnits = data.priceUnits;
          //console.log(_this.choosed.names.split(' '));
          _this.$dialog.loading.close();


          /*分享start*/
          var invite_code=_this.params.invite_code;
          var UrlAttr = (decodeURIComponent(location.href)).split('#');
          //alert('UrlAttr[0]=='+UrlAttr[0]);
          //alert('UrlAttr[1]=='+UrlAttr[1]);
          var param = '/main/goods_desc/'+_this.id+'?invite_code='+_this.params.invite_code;
          /*var str = '?invite_code='
          //二次分享时把验证码替换成自己的,拼团处的另外处理！！！！！
          if (UrlAttr[1].indexOf('?') >= 0) {
            //alert('has?')
            param = UrlAttr[1].split('?')[0] + str + invite_code;
            //alert('param=== '+param);
          } else {
            param = UrlAttr[1] + str + invite_code;
          }*/
          //alert('param'+param);
          var link = config.redirect_url + "?host=" + encodeURIComponent(UrlAttr[0]) + "&param=" + encodeURIComponent(param);
          _this.wxutils.wxShare(_this.goodsName,_this.goodsName,link,_this.sliderImgs[0]);
          /*end*/

        }).catch(function (err) {
          console.log(err);
        })
      },
      //数量减
      discount() {
        if (this.count > 1) {
          this.count--;
        }
      },
      //数量加
      add() {
        this.count++;
      },
      //显示规格选择遮罩
      showSizeCover() {
        this.isShowSize = true;
        /* this.disabledScroll();*/
      },
      //子组件发射事件遮罩层关闭coverClose
      coverClose(bool) {
        //bool为子组件通过自定义事件close穿过来的值
        this.isShowSize = false;
        //console.log('bool',bool);
      },

      //选择商品属性
      chooseOptions(name, propsId, valueId) {
        var _this = this;
        //根据所选属性的propsId和valueId匹配默认数组中的pvs，进行替换为新选的id对儿
        var str = propsId + ':' + valueId;
        var reg = new RegExp(propsId + ":\\d*", "gim");
        this.choosed.pvs = this.choosed.pvs.replace(reg, str);
        //根据pvs查找对应的names拼成数组
        //var arr = this.choosed.pvs.split(';');
        _this.priceUnits.forEach(function (item) {
          if (_this.choosed.pvs == item.pvs) {
            _this.choosed.integral = item.integral;
            _this.choosed.price_id = item.price_id;
            _this.choosed.names = item.names;
            _this.choosed.original_price = item.original_price;
           // _this.choosed.vip_price = item.vip_price;
            _this.choosed.stock = item.stock;
          }
          //console.log('sss',_this.choosed);
        })


        /*        var result = [];
                var optionsArr = this.optionsArr;
                //一层一层的查找
                for (var i = 0; i < arr.length; i++) {
                  var propId = arr[i].split(':')[0];
                  var valueId = arr[i].split(':')[1];
                  for (var j = 0; j < optionsArr.length; j++) {
                    if (optionsArr[j].propId == propId) {
                      for (var m = 0; m < optionsArr[j].values.length; m++) {
                        if (optionsArr[j].values[m].valueId == valueId) {
                          //console.log(propId,optionsArr[j].propId,optionsArr[j].values[m].valueId);
                          result.push(optionsArr[j].values[m].name);
                        }
                      }
                    }
                  }
                }
                this.choosed.names = result.join(' ');*/


      },
      //查看切换，查看商品、详情、素材
      scrollTo(type) {

        //设置滚动到详情的定时器
        var timer = null;
        //滚动到详情的状态
        var scrollTo = false;
        if (type == 'desc') {
          this.to = 'desc';
          //获取详情到父元素position不为static的顶部距离
          var top = document.getElementById('desc-content').offsetTop;
          //滚动到商品详情的定时器
          timer = setInterval(function () {
            //获取滚动条距离顶部高度
            //兼容写法
            var osTop = document.documentElement.scrollTop || document.body.scrollTop;
            //到达指定位置，清除定时器
            if (Math.abs(osTop - top) <= 10) {
              clearInterval(timer);
              scrollTo = true;
              return;
            }
            ;
            //滚动条滚动的速度
            var ispeed = 10;
            if (osTop < top) {
              document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
            } else {
              document.documentElement.scrollTop = document.body.scrollTop = osTop - ispeed;
            }
          }, 1);
        } else if (type == 'goods') {
          this.to = 'goods';
          //var top = document.getElementById('container').offsetTop;
          var top = 0;
          //滚动到商品的定时器
          timer = setInterval(function () {
            //获取滚动条距离顶部高度
            //兼容写法
            var osTop = document.documentElement.scrollTop || document.body.scrollTop;
            //到达指定位置，清除定时器
            if (Math.abs(osTop - top) <= 10) {
              clearInterval(timer);
              scrollTo = true;
              return;
            }
            ;
            //滚动条滚动的速度
            var ispeed = 10;
            if (osTop < top) {
              document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
            } else {
              document.documentElement.scrollTop = document.body.scrollTop = osTop - ispeed;
            }
          }, 1);
        } else {
          this.to = 'material';
          //获取详情到父元素position不为static的顶部距离
          var top = document.getElementById('material').offsetTop;
          //滚动到商品详情的定时器
          timer = setInterval(function () {
            //获取滚动条距离顶部高度
            //兼容写法
            var osTop = document.documentElement.scrollTop || document.body.scrollTop;
            //到达指定位置，清除定时器
            if (Math.abs(osTop - top) <= 10) {
              clearInterval(timer);
              scrollTo = true;
              return;
            }
            ;
            //滚动条滚动的速度
            var ispeed = 10;
            if (osTop < top) {
              document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
            } else {
              document.documentElement.scrollTop = document.body.scrollTop = osTop - ispeed;
            }
          }, 1);
        }
        //滚动条滚动时触发
        window.onscroll = function () {
          //页面滚动实时获取滚动条位置
          var osTop = document.documentElement.scrollTop || document.body.scrollTop;
          //回到顶部过程中用户滚动滚动条，停止定时器
          if (scrollTo) {
            clearInterval(timer);
            return;
          }
          ;
        };
      },
      //加入购物车
      addToCart() {
        if(localStorage.getItem('token')){
          this.$dialog.loading.open();
          var _this = this;
          var obj = {
            goods_id: this.id,
            token: localStorage.getItem('token'),
            type: _this.goodsType,
            pvs_name: this.choosed.names,
            price_id: this.choosed.price_id,
            number: this.count
          };
          //console.log('obj',obj);
          add_shopping_cart(obj).then(function (res) {
            //console.log('addcart',res);
            _this.$dialog.loading.close();
            if (res.data.errcode == 0) {
              _this.$dialog.toast({
                mes: '加入购物车成功~',
                timeout: 1500,
                icon: 'success'
              });
            } else {
              _this.$dialog.toast({
                mes: res.data.errdesc,
                timeout: 1000
              });
              //已添加过该类商品
              if (res.data.errcode == 4) {
                setTimeout(function () {
                  _this.$router.push('/main/shoppingcart');
                }, 1300)
              }
            }

          }).catch(function (err) {
            console.log(err);
          })
        }else {
          sessionStorage.setItem('redirect', '/main/goods_desc/'+_this.id);
          //没登录
          this.$router.push({
            path: '/unlogin',
            query: {redirect: '/main/goods_desc/'+_this.id}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
        }

      },
      //上架
      addShelves(){
        if(localStorage.getItem('token')){
          var _this=this;
          var obj={
            token:localStorage.getItem('token'),
            goods_id:this.id,
            is_collect:'y',
            type:'goods'
          };
          add_shelves(obj).then(function (res) {
            console.log('res',res);
            if(res.data.errcode==0){
              _this.$dialog.toast({
                mes: '已上架',
                timeout: 1500,
                icon: 'success'
              });
            }else{
              _this.$dialog.toast({
                mes: res.data.errdesc,
                timeout: 1000
              });
            }
          }).catch(function (err) {
            console.log(err);
          })
        }else{
          sessionStorage.setItem('redirect', '/main/goods_desc/'+_this.id);
          //没登录
          this.$router.push({
            path: '/unlogin',
            query: {redirect: '/main/goods_desc/'+_this.id}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
        }
      },
      //立即购买
      buyNow(){
        var goodChoosed={};
        goodChoosed.pic=this.sliderImgs[0];
        goodChoosed.goodsName=this.goodsName;
        goodChoosed.names=this.choosed.names;
        goodChoosed.count=this.count;
        goodChoosed.goods_id=this.id;
        goodChoosed.integral=this.choosed.integral;
        goodChoosed.price_id=this.choosed.price_id;

 /*       if(this.isVip==1){
          goodChoosed.price=this.choosed.vip_price;
        }else{
          goodChoosed.price=this.choosed.original_price;
        }*/
        goodChoosed.price=this.choosed.original_price;
        sessionStorage.setItem('goodChoosed',JSON.stringify(goodChoosed));
        this.$router.push('/main/order_create');
      }
    },
    components: {
      'cover': Cover
    }
  }
</script>
<style scoped="true">
  @import "../../../static/css/classify/goods_desc.css";

  .desc-pic {
    width: 100%;
  }

</style>
