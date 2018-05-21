<template>
  <div class="container desc-container" id="container" :style="'overflow:'+overflow+';height:'+height">
    <!--<div class="heaer-div disf">
      <div slot="center">
        <i class="icon iconfont icon-location" v-show="to=='goods'"></i><span class="goods">商品</span>
        &lt;!&ndash; <i class="icon iconfont icon-location" v-show="to=='desc'"></i><span class="goods"
                                                                              @click="scrollTo('desc',true)">详情</span>
         <i class="icon iconfont icon-location" v-show="to=='material'"></i><span
         @click="scrollTo('material',true)">素材</span>&ndash;&gt;
      </div>
    </div>-->

    <!--轮播图-->
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
     <!-- <p class="jf"><span class="jf-text">积分</span><span class="get-jf">{{'购买可得' + integral + '积分'}}</span></p>-->
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
            <span v-if="choosed.stock==0">（目前缺货）</span>
          </div>
        </div>
        <div v-else><span>所选规格目前缺货</span></div>
      </div>
      <p v-else><span>请选择规格数量</span></p>
      <i class="icon iconfont icon-youjiantou right-icon"></i>
    </div>
    <!--商品详情-->
    <div id="desc-content" v-html="goodsContent" class="ql-editor"></div>
    <!--立即购买-->
    <div class="buy">
      <span class="btn sell" @click="showShare">分享大礼包</span>
    </div>
    <!--遮罩层-->
    <cover :isShowSize="isShowSize" :closeByZhao="true" @coverClose="coverClose">
      <!--已选商品信息-->
      <div class="choose-msg disf">
        <i class="icon iconfont icon-guanbi" @click="coverClose"></i>
        <div class="img-container">
          <img :src="choosed.pics" alt="" v-if="hasMatch">
          <img :src="sliderImgs[0]" alt="" v-else>
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
            <span v-if="choosed.stock==0">（目前缺货）</span>
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
        <ul class="row options-ul">
          <li class="options-li" v-for="(item,index) in optionsArr">
            <input type="radio" :id="'option'+item.id" name="size" :value="item.id"
                   v-model="userchoosed" class="disn">
            <label :for="'option'+item.id" class="options"
                   :class="{'options-choosed':item.id==userchoosed}">{{item.names}}</label>
          </li>
        </ul>
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
  import {
    get_giftbag_detail,
    get_web_gift
  } from './../../api/index'
  import Cover from '../common_components/cover.vue'
  import config from '../../api/config'

  export default {
    data() {
      return {
        userchoosed: '',
        choosed: {
          integral: '',
          names: '',
          stock: '',
          pics: '',
          original_price: ''
        },//选中商品规格类型的相关信息
        sliderImgs: [],//轮播图轮播图
        id: 0,
        len: 0,
        curPicIndex: 1,
        minHeight: '',
        clientWidth: '',
        isShowSize: false,
        count: 1,
        discountDisabled: true,
        addDisabled: false,
        optionsArr: [],//选项数组
        goodsContent: '',//商品详情内容
        overflow: 'auto',
        height: 'auto',
        hasChoosed: false,//已经选择规格，根据这个状态判断页面规格处文字显示
        hasMatch: false,//价格数组里是否有匹配的已选规格
        goodsName: '',
        original_price: '',
        store: '',//总库存,
        stock: '',
        integral: '',
        pleaseChooseTip: '请选择礼包类型',//规格弹出框处提示文字
        shop_owner:'',
        share_time:'',
        shareShow: false,
        pic_materials: [],//素材图片

      }
    },
    created() {
      this.$dialog.loading.close();
      //窗口高度
      this.minHeight = localStorage.getItem('minHeight');
      this.clientWidth = localStorage.getItem('clientWidth');
      //商品id
      this.id = this.$route.query.id;
      this.getContent();
    },
    mounted() {
      this.getDetail();
      this.shareConfig();
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
      userchoosed(n, o) {
        this.hasChoosed = true;
        var arr = this.optionsArr;
        for (var i = 0; i < arr.length; i++) {
          var item = arr[i];
          if (item.id == n) {
            this.choosed.integral = item.integral;
            this.choosed.price_id = item.id;
            this.choosed.names = item.names;
            this.choosed.stock = item.stock;
            this.choosed.goods_id = item.goods_id;
            this.choosed.pics = item.pics[0];
            this.choosed.original_price = item.original_price;
            this.stock = item.stock;
            this.hasMatch = true;
            break;
          }
        }
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
    methods: {
      //显示分享
      showShare() {
        this.shareConfig();
        this.shareShow = true;
      },
      shareConfig(){
        var _this=this;
        if (this.$route.query.shop_owner) {
          this.shop_owner = this.$route.query.shop_owner;
          this.share_time=this.$route.query.t;
        } else {
          this.shop_owner = localStorage.getItem('invite_code');
          this.share_time=new Date().Format('yyyy-MM-dd hh:mm');
        }
        sessionStorage.setItem('shop_owner',this.shop_owner);
        /*分享start*/
        var UrlAttr = (decodeURIComponent(location.href)).split('#');
        //从这里分享出去的肯定是自己的店铺，所有货主和邀请人都是自己的邀请码
        var param = '/main/shop_giftContent?id=' + _this.id + '&shop_owner=' + _this.shop_owner + '&t=' + _this.share_time;
        var link = config.redirect_url + "?host=" + encodeURIComponent(UrlAttr[0]) + "&param=" + encodeURIComponent(param);
        _this.wxutils.wxShare('91云店店主邀请你抢购超值开店礼包', '还等什么快来抢购吧~', link, _this.src);
        _this.$dialog.loading.close();
        /*end*/
      },
      //获取商品详情
      getDetail() {
        var _this = this;
        this.$dialog.loading.open('');
        get_giftbag_detail({'gift_id': this.id}).then(function (res) {
          console.log('res==', res);
          var data = res.data.data;//商品详情数据
          _this.goodsName = data.gift_name;
          _this.original_price = data.price;
          data.goods_detail.forEach(function (item) {
            _this.sliderImgs.push(item.pics[0])
          });
          _this.len = _this.sliderImgs.length;
          _this.optionsArr = data.goods_detail;
          _this.store = data.store;
          _this.stock = _this.store;

          //_this.pic_materials = data.pic_materials;
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
          _this.$dialog.loading.close();

        }).catch(function (err) {
          console.log(err);
        })
      },
      //获取商品详情
      getContent() {
        var _this = this;
        this.$dialog.loading.open('');
        get_web_gift({'gift_id': this.id}).then(function (res) {
          //console.log(res);
          _this.goodsContent = res.data.data.content;
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
      },
      //子组件发射事件遮罩层关闭coverClose
      coverClose(bool) {
        //bool为子组件通过自定义事件close穿过来的值
        this.isShowSize = false;
      },
      //立即购买
      buyNow() {
        if(this.hasMatch){
          var goodChoosed = {};
          goodChoosed.pic =  this.choosed.pics;
          goodChoosed.goodsName = this.goodsName;
          goodChoosed.names = this.choosed.names;
          goodChoosed.count = this.count;
          goodChoosed.goods_id = this.choosed.goods_id;
          goodChoosed.integral = this.choosed.integral;
          goodChoosed.price_id = this.choosed.price_id;
          goodChoosed.price = this.choosed.original_price;
          sessionStorage.setItem('goodChoosed', JSON.stringify(goodChoosed));
          this.$router.push('/main/gift_order_create');
        }else{
          this.$dialog.toast({
            mes: this.pleaseChooseTip,
            timeout: 1000
          });
        }

      }
    },
    components: {
      'cover': Cover
    }
  }
</script>
<style scoped="true">
  @import "../../../static/css/quill.snow.css";
  @import "../../../static/css/classify/goods_desc.css";
  .desc-container{
    padding-top:0;
  }

  .goods {
    margin-right: 0;
  }
  .sell,.buy-now-bt {
    width: 100%;
  }
  .size-div{
    border-bottom: 0.14rem solid #eee;
  }
</style>
