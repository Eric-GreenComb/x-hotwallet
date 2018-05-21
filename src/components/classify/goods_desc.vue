<template>
  <div class="container desc-container" id="container" :style="'overflow:'+overflow+';height:'+height">
    <div class="heaer-div disf">
      <div slot="center">
        <i class="icon iconfont icon-location" v-show="to=='goods'"></i><span class="goods"
                                                                              @click="scrollTo('goods')">商品</span>
        <i class="icon iconfont icon-location" v-show="to=='desc'"></i><span class="goods"
                                                                             @click="scrollTo('desc')">详情</span>
        <i class="icon iconfont icon-location" v-show="to=='material'"></i><span
        @click="scrollTo('material')">素材</span>
      </div>
    </div>

    <div class="swiper-self-continer" :style="'width:'+clientWidth+';height:'+clientWidth">
      <div class="swiper-container">
        <div class="swiper-wrapper">
        </div>
        <div class="len"><span>{{curPicIndex}}</span><span> / </span><span>{{len}}</span></div>
      </div>
    </div>

    <div class="box">
      <p class="goods-name">{{goodsName}}</p>
      <p class="disf goods-pri">
        <span class="sign">￥</span>
        <span class="goods-price">{{original_price}}</span>
      </p>
      <p class="stock"><span>库存</span><span>{{store}}</span></p>
      <p class="jf"><span class="jf-text">积分</span><span class="get-jf">{{'购买可得' + integral + '积分'}}</span></p>
    </div>
    <div class="size-div" @click="showSizeCover">
      <div v-if="hasChoosed" class="flex1">
        <div v-if="hasMatch" class="disf choosed-size-div">
          <span class="nowarp">已选择：</span>
          <div class="flex1 choosed-size-name">
            <!--          <span v-if="choosed.names.length>16">{{choosed.names.substr(0,16)+'...'}}</span>
                      <span v-else>{{choosed.names}}</span>-->
            <span>{{choosed.names}}</span>
            <span>，</span><span>{{count}}</span><span>件</span>
          </div>
        </div>
        <div v-else><span>所选规格目前缺货</span></div>
      </div>
      <p v-else><span>请选择规格数量</span></p>
      <i class="icon iconfont icon-youjiantou right-icon"></i>
    </div>
    <!--商品详情-->
    <div id="desc-content">
      <div class="texac gap"><span class="line-gap"></span><span class="gap-text">详情</span><span
        class="line-gap"></span></div>
      <div v-html="goodsContent" class="ql-editor"></div>
    </div>
    <div id="material">
      <div class="texac gap"><span class="line-gap"></span><span class="gap-text">素材</span><span
        class="line-gap"></span></div>
      <div class="material-pic">
        <p class="material-text" v-if="share_text!=''">{{share_text}}</p>
        <img :src="pic" class="desc-pic" alt="" v-for="pic in pic_materials">
      </div>
    </div>
    <!--立即购买-->
    <div class="buy" v-if="isVip==1">
      <div class="btn cart" @click="toCart()">
        <i class="icon iconfont icon-gouwuche"></i>
        <span>购物车</span>
      </div>
      <div class="btn cart" @click="addShelves()">
        <i class="icon iconfont icon-shangjia"></i>
        <p>上架</p>
      </div>
      <span class="btn buy-now" @click="showSizeCover">买</span>
      <span class="btn sell" @click="showShare">卖</span>
    </div>
    <div class="buy" v-else>
      <div class="btn cart common-add-cart-btn" @click="toCart()">
        <i class="icon iconfont icon-gouwuche"></i>
        <p>购物车</p>
      </div>
      <span class="btn buy-now common-buy-now common-buy-now-style" @click="showSizeCover">买</span>
    </div>
    <!--遮罩层-->
    <cover :isShowSize="isShowSize" :closeByZhao="true" @coverClose="coverClose">
      <!--已选商品信息-->
      <div class="choose-msg disf">
        <i class="icon iconfont icon-guanbi" @click="coverClose"></i>
        <div class="img-container">
          <img :src="sliderImgs[0]" alt="">
        </div>
        <div class="choosed-div" v-if="hasMatch">
          <p class="disf goods-pri">
            <span class="sign">￥</span>
            <span class="goods-price">{{choosed.original_price}}</span>
          </p>
          <p class="stock"><span>库存</span><span>{{choosed.stock}}</span></p>

          <p class="choosed-size choosed-name">
            <span>已选择：</span>
            <!-- <span v-if="choosed.names.length>28">{{choosed.names.substr(0,28)+'...'}}</span>
             <span v-else>{{choosed.names}}</span>-->
            <span>{{choosed.names}}</span>
            <span>，</span><span>{{count}}</span><span>件</span>
          </p>
        </div>
        <div class="choosed-div" v-else>
          <p class="disf goods-pri">
            <span class="sign">￥</span>
            <span class="goods-price">{{original_price}}</span>
          </p>
          <p class="stock"><span>库存</span><span>{{stock}}</span></p>
          <p class="choosed-size">
            <span>{{pleaseChooseTip}}</span>
          </p>
        </div>
      </div>
      <!--商品规格-->
      <div class="options-container">
        <template v-for="(item,index) in optionsArr">
          <p class="row option-title">{{item.propName}}</p>
          <ul class="row options-ul" :data-propId="item.propId">
            <template v-for="(value,i) in item.values">
              <li class="options-li">
                <input type="radio" :id="'option'+value.valueId" :name="item.propName" :value="value.valueId"
                       v-model="userChoosed[index].value" class="disn">
                <label :for="'option'+value.valueId" class="options"
                       :class="{'options-choosed':value.valueId==userChoosed[index].value}">{{value.name}}</label>

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
              class="common-add" :class="{'common-disabled':addDisabled}" @click="add">+
            </td>
          </tr>
        </table>
      </div>
      <!--加入购物车，立即购买-->
      <div class="disf">
        <div class="bt add-cart-bt add-to-cart" @click="addToCart">加入购物车</div>
        <div class="bt buy-now-bt noStock" v-if="stock==0">立即购买</div>
        <div class="bt buy-now-bt" v-else @click="buyNow">立即购买</div>

      </div>
    </cover>
    <div class="sell-cover" :style="'height:'+minHeight" @click="shareShow=false" v-if="shareShow">
      <img src="../../../static/img/click-share.png" class="click-share" alt="">
    </div>
  </div>
</template>

<script>
  import {getDetailGoods, get_goods_content, add_shopping_cart, add_shelves} from './../../api/index'
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
        clientWidth: '',
        isShowSize: false,
        count: 1,
        discountDisabled: true,
        addDisabled: false,
        sliderImgs: [],//轮播图轮播图
        optionsArr: [],//选项数组
        pic_materials: [],//素材图片
        goodsContent: '',//商品详情内容
        share_text: '',
        choosed: {
          integral: '',
          price_id: '',
          names: '',
          original_price: '',
          //vip_price: '',
          stock: '',
          pvs: ''
        },//选中商品规格类型的相关信息
        userChoosed: [],//每种规格选中选项的值
        priceUnits: [],//所有商品不同规格价格信息
        goodsName: '',
        original_price: '',
        store: '',//总库存,
        stock: '',
        integral: '',
        goodsType: '',//商品类型，普通、抢购、团购
        shareShow: false,
        params: {
          invite_code: ''
        },
        overflow: 'auto',
        height: 'auto',
        hasChoosed: false,//已经选择规格，根据这个状态判断页面规格处文字显示
        hasMatch: false,//价格数组里是否有匹配的已选规格
        pleaseChooseTip: '',//规格弹出框处提示文字
        allChoosed: false,//是否选择了所有规格
        shelves_owner: '0',
        inviter: '0'
      }
    },
    created() {
      this.$dialog.loading.close();
      var _this = this;
     /* getDetailGoods({'goods_id': this.id}).then(function (res) {
        console.log('res', res.data.errcode)
        if (res.data.errcode == 1) {
          _this.$router.push('/main/noShop')
          return;
        }
      })*/
      this.isVip = localStorage.getItem('isVip');
      //窗口高度
      this.minHeight = localStorage.getItem('minHeight');
      this.clientWidth = localStorage.getItem('clientWidth');
      //上一个页面链接
      this.from = localStorage.getItem('from');
      //商品id
      this.id = this.$route.query.id;
      this.getContent();
      //商品来源--货主信息
      if(this.$route.query.shelves_owner){
        this.shelves_owner = this.$route.query.shelves_owner;
      }else{
        this.shelves_owner = 0;
      }
      if( this.$route.query.inviter){
        this.inviter = this.$route.query.inviter;
      }else{
        this.inviter = 0;
      }

      //把货主和邀请人存起来，下单的时候有用
      sessionStorage.setItem('shelves_owner', this.shelves_owner);
      sessionStorage.setItem('inviter', this.inviter);

    },
    mounted() {
      var html = document.getElementsByTagName('html')[0];
      this.headerHeight = Number(html.style.fontSize.split('px')[0]);
      this.getDetail();
    },
    watch: {
      count(n, o) {
        if (n <= 1) {
          this.discountDisabled = true;
        } else {
          this.discountDisabled = false;
        }
        if (n >= parseInt(this.stock)) {
          this.addDisabled = true;
        } else {
          this.addDisabled = false;
        }
      },
      userChoosed: {
        handler(newValue, oldValue) {
          var _this = this;
          _this.pleaseChooseTip = '请选择：';
          var choosedNum = 0;
          for (var i = 0; i < newValue.length; i++) {
            if (newValue[i].value != 0) {
              _this.hasChoosed = true;
              choosedNum++;
            } else {
              _this.allChoosed = false;
              _this.pleaseChooseTip = _this.pleaseChooseTip + newValue[i].propName + ' ';
            }
          }
          if (choosedNum == newValue.length) {
            _this.allChoosed = true;
          }
          this.chooseOptions();
        },
        deep: true
      },
      isShowSize(n, o) {
        if (n) {
          this.height = this.minHeight;
          this.overflow = 'hidden';
        } else {
          this.height = 'auto';
          this.overflow = 'auto';
        }
      },
      shareShow(n, o) {
        if (n) {
          this.height = this.minHeight;
          this.overflow = 'hidden';
        } else {
          this.height = 'auto';
          this.overflow = 'auto';
        }
      }
    },
    //记录上个页面的路由
    beforeRouteEnter (to, from, next) {
      console.log('from',from.path)
      window.localStorage.setItem('fromPath',from.path)
      next()
    },
    methods: {
      //显示分享
      showShare() {
        var _this = this;
        if (!localStorage.getItem('invite_code')) {
          sessionStorage.setItem('redirect', '/main/goods_desc?id=' + _this.id + '&shelves_owner=' + _this.shelves_owner + '&inviter=' + _this.inviter);
          _this.$router.push({
            path: '/unlogin',
            query: {redirect: '/main/goods_desc?id=' + _this.id + '&shelves_owner=' + _this.shelves_owner + '&inviter=' + _this.inviter}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          });
        } else {
          this.shareShow = true;
        }
      },
      //获取商品详情
      getDetail() {
        var _this = this;
        this.$dialog.loading.open('');
        getDetailGoods({'goods_id': this.id}).then(function (res) {

          console.log('res',res.data.errcode)
          if(res.data.errcode == 1){
            _this.$router.push('/main/noShop')
            return
          }

            var data = res.data.data;//商品详情数据
            var pvsArr = [];//暂放选中选项id的数组
            _this.goodsName = data.goods_name;
            _this.goodsType = data.type;
            _this.sliderImgs = data.pics;
            _this.share_text=data.share_text;
            _this.len = data.pics.length;
            _this.optionsArr = data.skuProps;
            _this.priceUnits = data.priceUnits;
            _this.original_price = data.priceUnits[0].original_price;
            _this.store = data.store;
            _this.stock = _this.store;
            _this.integral = data.priceUnits[0].integral;
            _this.pic_materials = data.pic_materials;
            //轮播图当前页数字控制
            if (_this.len == 0) {
              _this.curPicIndex = 0;
            } else if (_this.len == 1) {
              _this.curPicIndex = 1;
            }
            //配置轮播图模块，因swiper插件slider的img为动态获取时会出现无法滑动，原因是swiper初始化是会计算slider的长度，通过这种方法即可解决
            var slideHtml = '';
            _this.sliderImgs.forEach(function (item) {
              slideHtml += '<div class="swiper-slide"><img class="slider-img" src="' + item + '" alt="" style="width:' + _this.clientWidth + ';height:' + _this.clientWidth + '"></div>';
            });
            var swiper_wrapper = document.getElementsByClassName('swiper-wrapper')[0];
            swiper_wrapper.innerHTML = slideHtml;
            var mySwiper = new Swiper('.swiper-container', {
              initialSlide: 0,
              observer: true,//修改swiper自己或子元素时，自动初始化swiper
              observeParents: true,//修改swiper的父元素时，自动初始化swiper
              //loop: true,
              /*autoplay: true,*/
              on: {
                slideChange: function () {
                  //轮播图循环播放时，用realIndex获取真实索引值
                  _this.curPicIndex = Number(this.realIndex) + 1;
                }
              }
            });
            //轮播图配置end
            //设置默认选择选项
            _this.optionsArr.forEach(function (item) {
              _this.pleaseChooseTip = '请选择：';
              _this.pleaseChooseTip = _this.pleaseChooseTip + item.propName + ' '
              var obj = {
                propId: item.propId,
                propName: item.propName,
                // value: item.values[0].valueId,
                value: 0
              };
              if (item.values.length == 1) {
                obj.value = item.values[0].valueId;
              }
              _this.userChoosed.push(obj);
            });



          //滚动条滚动时触发
          window.onscroll = function () {
            var osTop = document.documentElement.scrollTop || document.body.scrollTop;
            //页面滚动实时获取滚动条位置
            var goodTop = 0;
            var descTop = Number(document.getElementById('desc-content').offsetTop) - _this.headerHeight;
            var materialTop = Number(document.getElementById('material').offsetTop) - _this.headerHeight;
            if (osTop < parseInt(descTop)) {
              _this.to = 'goods';
            } else if (osTop >= parseInt(descTop) && osTop < parseInt(materialTop)) {
              _this.to = 'desc';
            } else {
              _this.to = 'material';
            }
          };
          _this.scrollTo('goods');
          _this.$dialog.loading.close();

          /*分享start--每次分享时如果登录了换上自己的邀请码，没登录时是0*/
          var invite_code;
          if (localStorage.getItem('invite_code')) {
            invite_code = localStorage.getItem('invite_code');
          } else {
            invite_code = '0';
          }
          var UrlAttr = (decodeURIComponent(location.href)).split('#');
          var param = '/main/goods_desc' + '?id=' + _this.id + '&shelves_owner=' + _this.shelves_owner + '&inviter=' + invite_code;
          var link = config.redirect_url + "?host=" + encodeURIComponent(UrlAttr[0]) + "&param=" + encodeURIComponent(param);
          _this.wxutils.wxShare(_this.goodsName, _this.goodsName, link, _this.sliderImgs[0]);
          /*end*/

        }).catch(function (err) {
          console.log(err);
        })
      },
      //获取商品详情
      getContent() {
        var _this = this;
        this.$dialog.loading.open('');
        get_goods_content({'goods_id': this.id}).then(function (res) {
          //console.log(res);
          _this.goodsContent = res.data.data;
          setTimeout(function () {
            var imgArr = document.getElementById('desc-content').getElementsByTagName('img');
            for (var i = 0; i < imgArr.length; i++) {
              imgArr[i].style.width = '100%';
            }
          }, 100);
          _this.$dialog.loading.close();
        }).catch(function (err) {
          console.log(err);
        })
      },
      //数量减
      discount() {
        if (parseInt(this.count) > parseInt(1)) {
          this.count--;
        }
      },
      //数量加
      add() {
        if (parseInt(this.count) < parseInt(this.stock)) {
          this.count++;
        }

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
      chooseOptions() {
        var _this = this;
        var pvsArr = [];
        //把默认选中选项id拼接成字符串放进数组再用;分割
        _this.userChoosed.forEach(function (item) {
          var str = item.propId + ':' + item.value;
          pvsArr.push(str);
        });
        var pvs = pvsArr.join(';');//得到分割好的选中选项id字符串
        //console.log('pvs',pvs);
        for (var i = 0; i < _this.priceUnits.length; i++) {
          if (_this.priceUnits[i].pvs == pvs) {
            _this.hasMatch = true;
            var item = _this.priceUnits[i];
            _this.choosed.integral = item.integral;
            _this.choosed.price_id = item.price_id;
            _this.choosed.names = item.names;
            _this.choosed.original_price = item.original_price;
            _this.choosed.stock = item.stock;
            _this.stock = item.stock;
            _this.choosed.pvs = item.pvs;
            break;
          } else {
            _this.hasMatch = false;
            _this.choosed.integral = '';
            _this.choosed.price_id = '';
            _this.choosed.names = '';
            _this.choosed.original_price = '';
            _this.choosed.stock = '';
            _this.choosed.pvs = '';
            if (_this.allChoosed) {
              _this.pleaseChooseTip = '目前缺货';
              _this.stock = 0;
            }
          }
        }
      },
      //查看切换，查看商品、详情、素材
      scrollTo(type) {
        //由于顶部有标题头，所以滚动高度减去这个高度比较精准，标题头的高度为1rem
        if (type == 'desc') {
          this.to = 'desc';
          var descTop = document.getElementById('desc-content').offsetTop;
          window.scrollTo(0, descTop - this.headerHeight);
        } else if (type == 'goods') {
          this.to = 'goods';
          window.scrollTo(0, 0);
        } else if (type == 'material') {
          this.to = 'material';
          var top = document.getElementById('material').offsetTop;
          window.scrollTo(0, top - this.headerHeight);
        }
      },
      //加入购物车
      addToCart() {
        if (localStorage.getItem('token')) {
          if (this.allChoosed) {
            this.$dialog.loading.open();
            var _this = this;
            var inviter, shelves_owner;//邀请人的邀请码、店主（货源）、优惠券id
            if (sessionStorage.getItem('inviter') == 0) {
              inviter = '';
            } else {
              inviter = sessionStorage.getItem('inviter');
            }
            if (sessionStorage.getItem('shelves_owner') == 0) {
              shelves_owner = '';
            } else {
              shelves_owner = sessionStorage.getItem('shelves_owner');
            }
            var obj = {
              goods_id: this.id,
              token: localStorage.getItem('token'),
              type: _this.goodsType,
              pvs_name: this.choosed.names,
              price_id: this.choosed.price_id,
              number: this.count,
              invite_code: inviter,
              source_code: shelves_owner,
            };
            add_shopping_cart(obj).then(function (res) {
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
              }

            }).catch(function (err) {
              console.log(err);
            })
          } else {
            this.$dialog.toast({
              mes: this.pleaseChooseTip,
              timeout: 1000
            });
          }

        } else {
          sessionStorage.setItem('redirect', '/main/goods_desc?id=' + _this.id + '&shelves_owner=' + _this.shelves_owner + '&inviter=' + _this.inviter);
          //没登录
          this.$router.push({
            path: '/unlogin',
            query: {redirect: '/main/goods_desc?id=' + _this.id + '&shelves_owner=' + _this.shelves_owner + '&inviter=' + _this.inviter}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
        }

      },
      //上架
      addShelves() {
        if (localStorage.getItem('token')) {
          var _this = this;
          var obj = {
            token: localStorage.getItem('token'),
            goods_id: this.id,
            is_collect: 'y',
            type: 'goods'
          };
          add_shelves(obj).then(function (res) {
            if (res.data.errcode == 0) {
              _this.$dialog.toast({
                mes: '已上架',
                timeout: 1500,
                icon: 'success'
              });
            } else {
              _this.$dialog.toast({
                mes: res.data.errdesc,
                timeout: 1000
              });
            }
          }).catch(function (err) {
            console.log(err);
          })
        } else {
          sessionStorage.setItem('redirect', '/main/goods_desc?id=' + _this.id + '&shelves_owner=' + _this.shelves_owner + '&inviter=' + _this.inviter);
          //没登录
          this.$router.push({
            path: '/unlogin',
            query: {redirect: '/main/goods_desc?id=' + _this.id + '&shelves_owner=' + _this.shelves_owner + '&inviter=' + _this.inviter}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
        }
      },
      //立即购买
      buyNow() {
        if (this.allChoosed) {
          var goodChoosed = {};
          goodChoosed.pic = this.sliderImgs[0];
          goodChoosed.goodsName = this.goodsName;
          goodChoosed.names = this.choosed.names;
          goodChoosed.count = this.count;
          goodChoosed.goods_id = this.id;
          goodChoosed.integral = this.choosed.integral;
          goodChoosed.price_id = this.choosed.price_id;
          goodChoosed.price = this.choosed.original_price;
          sessionStorage.setItem('goodChoosed', JSON.stringify(goodChoosed));
          this.$router.push('/main/order_create');
        } else {
          this.$dialog.toast({
            mes: this.pleaseChooseTip,
            timeout: 1000
          });
        }
      },
      toCart() {
        this.$router.push('/main/shoppingcart');
      }
    },
    components: {
      'cover': Cover
    },
    beforeRouteLeave(to, from, next) {
      window.onscroll = function () {
      };
      next();
    }
  }
</script>
<style scoped="true">
  @import "../../../static/css/quill.snow.css";
  @import "../../../static/css/classify/goods_desc.css";


</style>
