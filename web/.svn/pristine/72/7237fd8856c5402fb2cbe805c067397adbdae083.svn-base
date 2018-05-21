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

    <div class="swiper-self-continer">
      <div class="swiper-container">
        <div class="swiper-wrapper">

        </div>
        <div class="len"><span>{{curPicIndex}}</span><span> / </span><span>{{len}}</span></div>
      </div>
    </div>
    <!--活动未开始-->
<!--    <div class="time disf" v-if="status.type==0">
      <div>拼团</div>
      <div><span class="to-text">{{status.notify}}</span></div>
    </div>-->
    <!--拼团中-->
    <div class="time disf">
      <div>拼团进行中</div>
      <div>
        <span class="to-text">距结束还剩</span>
        <yd-countdown slot="right" :time="activeinfo.end_time">
          <span class="time-box">{%h}</span><span class="break">:</span><span
          class="time-box">{%m}</span><span class="break">:</span><span class="time-box">{%s}</span>
        </yd-countdown>
      </div>
    </div>


    <div class="box">
      <div class="disf pri-div">
        <div class="disf goods-pri">
          <span class="sign">￥</span>
          <span class="goods-price">{{promotion_price}}</span>
          <span class="goods-price gray-price">{{'￥' + original_price}}</span>

        </div>
        <div class="condition">
          <span>此商品总共已拼</span><span>{{activeinfo.now_quantity}}</span><span>件  </span><span>{{activeinfo.start_quantity}}</span><span>人拼单</span>

        </div>
      </div>
      <p class="goods-name">{{goodsName}}</p>
      <!--<p class="stock"><span>库存</span><span>{{choosed.stock}}</span></p>-->
      <p class="jf"><span class="jf-text">积分</span><span class="get-jf">{{'购买可得' + integral + '积分'}}</span></p>
    </div>
    <div class="notice">
      <p class="notice-p">{{controls}}</p>
      <i class="icon iconfont icon-warning_icon"></i><span>用户提前支付，如未达开团条件，自动退款</span>
    </div>
    <div class="size-div" @click="showSizeCover">
      <div v-if="hasChoosed" class="flex1">
        <div v-if="hasMatch" class="disf choosed-size-div">
          <span class="nowarp">已选择：</span>
          <div class="flex1 choosed-size-name">
<!--            <span v-if="choosed.names.length>16">{{choosed.names.substr(0,16)+'...'}}</span>
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
      <div class="texac gap"><span class="line-gap"></span><span class="gap-text">详情</span><span class="line-gap"></span></div>
      <div v-html="goodsContent" class="ql-editor"></div>
    </div>
    <div id="material">
      <div class="texac gap"><span class="line-gap"></span><span class="gap-text">素材</span><span class="line-gap"></span></div>
      <div class="material-pic">
        <p class="material-text" v-if="share_text!=''">{{share_text}}</p>
        <img :src="pic" class="desc-pic" alt="" v-for="pic in pic_materials">
      </div>
    </div>
    <div class="buy">
      <span class="btn sell sell-btn" @click="showShare">邀请团友</span>
      <span class="btn buy-now warn-btn" @click="showSizeCover">参加团购</span>
    </div>
    <!--遮罩层-->
    <cover :isShowSize="isShowSize" @coverClose="coverClose">
      <!--已选商品信息-->
      <div class="choose-msg disf">
        <i class="icon iconfont icon-guanbi" @click="coverClose"></i>
        <div class="img-container">
          <img :src="sliderImgs[0]" alt="">
        </div>
        <div class="choosed-div" v-if="hasMatch">
          <p class="disf goods-pri">
            <span class="sign">￥</span>
            <span class="goods-price">{{choosed.promotion_price}}</span>
            <span class="goods-price gray-price">{{'￥' + choosed.original_price}}</span>
          </p>

          <p class="stock"><span>库存</span><span>{{choosed.stock}}</span></p>
          <p class="choosed-size choosed-name">
            <span>已选择：</span>
           <!-- <span v-if="choosed.names.length>28">{{choosed.names.substr(0,28)+'...'}}</span>
            <span v-else>{{choosed.names}}</span>-->
            <span>{{choosed.names}}</span>
            <span>，</span><span>{{count}}</span><span>件</span></p>
        </div>
        <div class="choosed-div" v-else>
          <p class="disf goods-pri">
            <span class="sign">￥</span>
            <span class="goods-price">{{promotion_price}}</span>
            <span class="goods-price gray-price">{{'￥' + original_price}}</span>
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
            <template v-for="value in item.values">
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
              class="common-add" @click="add" :class="{'common-disabled':addDisabled}">+
            </td>
          </tr>
        </table>
      </div>
      <div class="disf">
        <div class="bt buy-now-bt warn-btn noStock" v-if="stock==0">参加团购</div>
        <div class="bt buy-now-bt warn-btn " v-if="stock!=0" @click="goGroup">参加团购</div>
      </div>

    </cover>
    <div class="sell-cover" :style="'height:'+minHeight" @click="shareShow=false" v-if="shareShow">
      <img src="../../../static/img/click-share.png" class="click-share" alt="">
    </div>
  </div>
</template>

<script>
  import {
    getDetail_groupgoods,
    get_goods_content,
    add_shopping_cart,
    check_invitecode_effective
  } from './../../api/index'
  import Cover from '../common_components/cover.vue'
  import config from '../../api/config'

  export default {
    data() {
      return {
        from: '',
        to: 'goods',
        id: 0,//grounp_id
        goods_id: '',
        len: 0,
        curPicIndex: 1,
        isVip: 0,
        minHeight: '',
        clientWidth: '',
        isShowSize: false,//是否显示规格
        count: 1,//数量
        discountDisabled: true,
        addDisabled: false,
        sliderImgs: [],//轮播图
        optionsArr: [],//选项数组
        share_text:'',
        choosed: {},//选中的
        priceUnits: [],//所有规格价格库存信息
        goodsName: '',//商品名称
        integral: '',
        original_price: '',
        promotion_price: '',
        stock: 0,
        goodsType: '',
        activeinfo: {},//拼团时间信息
        status: {
          type: '',//0拼团未开始,1拼团进行中，2拼团到时间结束
          notify: '',//未开始时的提示文字（后台已控制，不会出现未开始和已结束的情况）
        },
        shareShow: false,//是否显示分享
        controls: '',
        overflow: 'auto',
        height: 'auto',
        userChoosed: [],
        pic_materials: [],
        goodsContent: '',
        hasChoosed: false,//已经选择规格，根据这个状态判断页面规格处文字显示
        hasMatch: false,//价格数组里是否有匹配的已选规格
        pleaseChooseTip: '',//规格弹出框处提示文字
        allChoosed: false,//是否选择了所有规格
        groupInviter: '',//团长的邀请码
        isFull:false,//是否满团
        inviter:''

      }
    },
    created() {
      this.$dialog.loading.close();
      this.isVip = localStorage.getItem('isVip');
      //窗口高度
      this.minHeight = localStorage.getItem('minHeight');
      this.clientWidth = localStorage.getItem('clientWidth');
      //上一个页面链接
      this.from = localStorage.getItem('from');
      //商品id
      this.id = this.$route.query.id;
      this.groupInviter = this.$route.query.groupInviter;
      this.inviter=this.$route.query.inviter;
      sessionStorage.setItem('inviter', this.inviter);

    },
    mounted() {
      var html=document.getElementsByTagName('html')[0];
      this.headerHeight=Number(html.style.fontSize.split('px')[0]);
      this.getDetail();
    },
    watch: {
      count(n, o) {
        if (n <= 1) {
          this.discountDisabled = true;
        } else {
          this.discountDisabled = false;
        }
        if (n >= parseInt(this.choosed.stock)) {
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
    methods: {
      //显示分享
      showShare() {
        this.shareShow = true;
      },
      //获取商品详情
      getDetail() {
        var _this = this;
        getDetail_groupgoods({'group_id': this.id}).then(function (res) {
          //console.log(res.data.data);
          var data = res.data.data;
          _this.goods_id = data.id;
          _this.getContent();
          _this.goodsName = data.goods_name;//商品名称
          _this.pic_materials = data.pic_materials;
          _this.goodsType = data.type;
          _this.sliderImgs = data.pics;//轮播图数组
          _this.share_text = data.share_text;//轮播图数组
          _this.len = data.pics.length;
          _this.stock=data.store;
          //显示当前轮播图页数配置
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
                //console.log(this.activeIndex);
                //轮播图循环播放时，用realIndex获取真实索引值
                _this.curPicIndex = Number(this.realIndex) + 1;
              }
            }
          });
          //轮播图配置end
          //所有规格数量的价格信息
          _this.priceUnits = data.priceUnits;
          _this.promotion_price = data.priceUnits[0].promotion_price;
          _this.original_price = data.priceUnits[0].original_price;
          _this.integral = data.priceUnits[0].integral;
          //所有规格选项数组
          _this.optionsArr = data.skuProps;
          //设置默认选择选项
          _this.optionsArr.forEach(function (item) {
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
          //团购状态判断
          var now = new Date();
          _this.activeinfo = data.activeinfo;
          var activeinfo = data.activeinfo;
          var start_time = activeinfo.start_time;//开团时间
          var end_time = activeinfo.end_time.replace(/-/g, "/");
          activeinfo.end_time=activeinfo.end_time.replace(/-/g, "/");
          var start_quantity = activeinfo.start_quantity;//开团数量
          //开团条件
          console.log('end_time',end_time.split(' ')[0]);
//          _this.controls = Number(end_time.split(' ')[0].split('-')[1]) + '.' + Number(end_time.split(' ')[0].split('-')[2]) + '日' + end_time.split(' ')[1].split(':')[0] + ':' + end_time.split(' ')[1].split(':')[1] + '前满' + start_quantity + '人开团';//开始时间大于现在，团购还没开始
          _this.controls = end_time.split(' ')[0] + '日' + end_time.split(' ')[1].split(':')[0] + ':' + end_time.split(' ')[1].split(':')[1] + '前满' + start_quantity + '人开团';//开始时间大于现在，团购还没开始
         /* if (_this.compareTime(start_time, now)) {
            _this.status.notify = Number(start_time.split(' ')[0].split('-')[1]) + '.' + Number(start_time.split(' ')[0].split('-')[2]) + '日' + start_time.split(' ')[1].split(':')[0] + ':' + start_time.split(' ')[1].split(':')[1] + '开团';//开始时间大于现在，团购还没开始
            _this.status.type = 0;//未开团
          } else if (_this.compareTime(now, start_time) && _this.compareTime(end_time, now)) {
            _this.status.type = 1;//活动进行中
          } else if (_this.compareTime(now, end_time)) {
            _this.status.type = 2;//活动结束
          }*/

          //滚动条滚动时触发
          window.onscroll = function () {
            var osTop = document.documentElement.scrollTop || document.body.scrollTop;
            //页面滚动实时获取滚动条位置
            var goodTop = 0;
            var descTop = Number(document.getElementById('desc-content').offsetTop)-_this.headerHeight;
            var materialTop = Number(document.getElementById('material').offsetTop)-_this.headerHeight;
            if (osTop < parseInt(descTop)) {
              _this.to = 'goods';
            } else if (osTop >= parseInt(descTop) && osTop < parseInt(materialTop)) {
              _this.to = 'desc';
            } else {
              _this.to = 'material';
            }
          };
          _this.scrollTo('goods');


          //状态判断结束
          _this.$dialog.loading.close();
          var invite_code;
          if (localStorage.getItem('invite_code')) {
            invite_code = localStorage.getItem('invite_code');
          } else {
            invite_code = '0';
          }
          var params = {
            'invite_code': _this.groupInviter,//链接上拼的邀请码
            'group_id': _this.id
          };
          //判断邀请码是否有效
          check_invitecode_effective(params).then(function (res) {
            var data = res.data.data;
            console.log('data',data);
            if (data == 'available') {
              //邀请码可用
              sessionStorage.setItem('groupInviter', _this.groupInviter);
              var UrlAttr = (decodeURIComponent(location.href)).split('#');
              var param = '/main/grounp_desc?id=' + _this.id + '&groupInviter=' + sessionStorage.getItem('groupInviter')+ '&inviter=' + invite_code;
              var link = config.redirect_url + "?host=" + encodeURIComponent(UrlAttr[0]) + "&param=" + encodeURIComponent(param);
              _this.wxutils.wxShare(_this.goodsName, _this.goodsName, link, _this.sliderImgs[0]);

            } else {
              if(data=='full'){
                _this.isFull=true;
              }
              _this.groupInviter = 0;
              sessionStorage.setItem('groupInviter', _this.groupInviter);
              var UrlAttr = (decodeURIComponent(location.href)).split('#');
              var param = '/main/grounp_desc?id=' + _this.id + '&groupInviter=' + localStorage.getItem('invite_code')+ '&inviter=' + invite_code;
              var link = config.redirect_url + "?host=" + encodeURIComponent(UrlAttr[0]) + "&param=" + encodeURIComponent(param);
              _this.wxutils.wxShare(_this.goodsName, _this.goodsName, link, _this.sliderImgs[0]);

            }



          }).catch(function (err) {
            console.log(err);
          })

        }).catch(function (err) {
          console.log(err);
        })
      },
      //比较时间大小
      compareTime(date1, date2) {
        var oDate1 = new Date(date1);
        var oDate2 = new Date(date2);
        if (oDate1.getTime() > oDate2.getTime()) {
          //第一个大
          return true;
        } else {
          //第二个大
          return false;
        }
      },
      //获取商品详情
      getContent() {
        var _this = this;
        this.$dialog.loading.open('');
        get_goods_content({'goods_id': this.goods_id}).then(function (res) {
          console.log(res);
          _this.goodsContent = res.data.data;
          setTimeout(function () {
            var imgArr = document.getElementById('desc-content').getElementsByTagName('img');
            for (var i = 0; i < imgArr.length; i++) {
              imgArr[i].style.width = '100%';
            }
          }, 200);
          _this.$dialog.loading.close();
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
        if (this.count < this.choosed.stock) {
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
        for (var i = 0; i < _this.priceUnits.length; i++) {
          if (_this.priceUnits[i].pvs == pvs) {
            _this.hasMatch = true;
            var item = _this.priceUnits[i];
            _this.choosed.integral = item.integral;
            _this.choosed.price_id = item.price_id;
            _this.choosed.names = item.names;
            _this.choosed.original_price = item.original_price;
            _this.choosed.promotion_price = item.promotion_price;
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
            _this.choosed.promotion_price = '';
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
          window.scrollTo(0,descTop-this.headerHeight);
        } else if (type == 'goods') {
          this.to = 'goods';
          window.scrollTo(0,0);
        } else if (type == 'material') {
          this.to = 'material';
          var top = document.getElementById('material').offsetTop;
          window.scrollTo(0,top-this.headerHeight);
        }
      },
      //加入购物车
      addToCart() {
        this.$dialog.loading.open();
        var _this = this;
        var obj = {
          goods_id: this.id,
          token: localStorage.getItem('token'),
          type: 'normal',
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
              timeout: 1000,
              icon: 'error'
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
      },
      //参加团购
      goGroup() {
        var goodChoosed = {};
        goodChoosed.pic = this.sliderImgs[0];
        goodChoosed.goodsName = this.goodsName;
        goodChoosed.names = this.choosed.names;
        goodChoosed.count = this.count;
        goodChoosed.goods_id = this.activeinfo.goods_id;
        goodChoosed.group_id = this.activeinfo.group_id;
        goodChoosed.integral = this.choosed.integral;
        goodChoosed.price_id = this.choosed.price_id;
        goodChoosed.price = this.choosed.promotion_price;
        goodChoosed.original_price = this.choosed.original_price;

        if(this.isFull){
          this.$dialog.confirm({
            title: '提示',
            mes: '该团已满员，是否重新发起拼单',
            opts: () => {
              if(this.allChoosed){
                sessionStorage.setItem('goodChoosed', JSON.stringify(goodChoosed));
                this.$router.push('/main/group_order_create/true');
              }else{
                this.$dialog.toast({
                  mes: this.pleaseChooseTip,
                  timeout: 1000
                });
              }
            }
          });
        }else{
          if(this.allChoosed){
            sessionStorage.setItem('goodChoosed', JSON.stringify(goodChoosed));
            this.$router.push('/main/group_order_create/false');
          }else{
            this.$dialog.toast({
              mes: this.pleaseChooseTip,
              timeout: 1000
            });
          }

        }

      }

    },
    components: {
      'cover': Cover
    },
    beforeRouteLeave(to, from, next) {
      window.onscroll=function () {
      };
      next();
    }
  }
</script>
<style scoped="true">
  @import "../../../static/css/quill.snow.css";
  @import "../../../static/css/classify/goods_desc.css";
  @import "../../../static/css/index/grounp_desc.css";
</style>
