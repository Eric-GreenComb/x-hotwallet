<template>
  <div class="container order-desc-container" :style="'min-height:'+minHeight">
    <div class="status-div" v-if="desc.state=='paying'">
      <img src="../../../static/img/order/order-desc-bg.png" class="bg-img" alt="">
      <div class="status-content">
        <i class="icon iconfont icon-daifukuan1"></i>
        <div>
          <p class="status">待付款</p>
          <p class="time">
            <yd-countdown :time="payEndTime" done-text="交易关闭">
              <span>剩 </span><span>{%h}</span><span>小时</span><span>{%m}</span><span>分</span><span>{%s}</span><span>秒</span><span>自动关闭</span>
            </yd-countdown>
          </p>
        </div>
      </div>
    </div>

    <div class="status-div" v-if="desc.state=='confirming'">
      <img src="../../../static/img/order/order-desc-bg.png" class="bg-img" alt="">
      <div class="status-content">
        <i class="icon iconfont icon-shalou"></i>
        <span class="status">拼单还未成功</span>
      </div>
    </div>
    <div class="status-div" v-if="desc.state=='payed'">
      <img src="../../../static/img/order/order-desc-bg.png" class="bg-img" alt="">
      <div class="status-content">
        <i class="icon iconfont icon-daifahuo1"></i>
        <span class="status">待发货</span>
      </div>
    </div>
    <div class="status-div" v-if="desc.state=='dispatch'">
      <img src="../../../static/img/order/order-desc-bg.png" class="bg-img" alt="">
      <div class="status-content">
        <i class="icon iconfont icon-yifahuo1"></i>
        <span class="status">待收货</span>
      </div>
    </div>
    <div class="status-div" v-if="desc.state=='commenting'">
      <img src="../../../static/img/order/order-desc-bg.png" class="bg-img" alt="">
      <div class="status-content">
        <i class="icon iconfont icon-jinakangbaoicons17"></i>
        <span class="status">待评价</span>
      </div>
    </div>
    <div class="status-div" v-if="desc.state=='completed'">
      <img src="../../../static/img/order/order-desc-bg.png" class="bg-img" alt="">
      <div class="status-content">
        <span v-if="desc.cancle_return=='normal'">交易完成</span>
        <span v-if="desc.cancle_return=='cancle'">交易取消</span>
        <span v-if="desc.cancle_return=='return'">已退货</span>
        <span v-if="desc.cancle_return=='invalid'">交易关闭</span>
        <!--<i class="icon iconfont icon-jinakangbaoicons17"></i>-->

      </div>
    </div>
    <div class="status-div" v-if="desc.state=='returning'">
      <img src="../../../static/img/order/order-desc-bg.png" class="bg-img" alt="">
      <div class="status-content">
        <!--<i class="icon iconfont icon-jinakangbaoicons17"></i>-->
        <span>处理中</span>
      </div>
    </div>


    <div class="address disf" v-if="desc.user_name!=null">
      <span class="icon-span"><i class="icon iconfont icon-shouhuodizhi"></i></span>
      <div>
        <p>
          <span class="name">{{desc.user_name}}</span>
          <span class="mobile">{{desc.mobile}}</span>
        </p>
        <p class="address-msg"><span>地址：</span><span>{{desc.simple_adress + ' ' + desc.detail_adress}}</span></p>
      </div>
    </div>
    <!--拼团才有-->
    <div class="row rest-num" v-if="desc.state=='confirming'">
      <p>
        <span>仅剩</span><span class="person-num">{{remainNum}}</span><span>个名额，</span>
        <yd-countdown :time="groupEndTime" done-text="已结束">
          <span>剩余 </span><span>{%h}</span><span>:</span><span>{%m}</span><span>:</span><span>{%s}</span>
        </yd-countdown>
      </p>
      <ul class="header-ul" style="padding: 0 0.2rem;">
        <li class="header-li" v-for="(item,index) in groupMember">
          <img :src="item.head_pic" class="header" alt="">
          <span class="identity" v-if="index==0">团长</span>
        </li>
        <li class="header-li" v-for="n in Number(remainNum)">
          <span>?</span>
        </li>
      </ul>
    </div>
    <div class="row disf">
      <span>商品信息</span>
      <router-link to="/main/connect"><i class="icon iconfont icon-kefu"></i><span>联系客服</span></router-link>
    </div>
    <div class="good-msg disf" v-for="item in desc.goods"><!--@click="checkGoodsDesc(desc.type,item.id)"-->
      <img :src="item.pic" class="good-pic" alt="">
      <div class="good-center pa">
        <p class="good-name">{{item.goods_name}}</p>
        <p class="size">{{item.pvs_name}}</p>
      </div>
      <div class="good-right pa">
        <p>{{'￥' + item.price}}</p>
        <p class="num"><span>x</span><span>{{item.number}}</span></p>
      </div>

    </div>
    <p class="btn-p" v-if="desc.state=='payed'||desc.state=='dispatch'"><span class="btn"
                                                                              @click="returnApply()">退款</span></p>

    <div class="bor"></div>
    <div class="quan disf bgf" v-if="desc.state=='paying'">
      <span>优惠券</span>
      <div v-if="hasChoosedVoucher">
        <p @click="useVoucher()">
          <span>{{'满' + choosedVoucher.limit_price + '-' + choosedVoucher.price_value + '券'}}</span>
          <i class="icon iconfont icon-youjiantou right-icon1"></i>
        </p>
      </div>
      <div v-else>
        <p v-if="suitCount==0"><span class="nouse">暂无可用</span></p>
        <p v-if="suitCount>0" @click="useVoucher()">
          <span>{{suitCount + '张可用'}}</span>
          <i class="icon iconfont icon-youjiantou right-icon1"></i></p>
      </div>

    </div>
    <div class="box box-pri">
      <p class="box-p disf"><span class="gray">商品金额</span><span class="gray">{{'￥' + desc.total_price}}</span></p>
      <div class="box-p disf yun" v-if="desc.state!='paying'&&Number(desc.voucher_price)>0">
        <span class="gray">优惠券</span>
        <span class="gray">{{'￥' + desc.voucher_price}}</span>
      </div>
      <div class="box-p disf yun" v-if="desc.state=='paying'&&hasChoosedVoucher">
        <span class="gray">优惠券</span>
        <span class="gray">{{'-￥' + choosedVoucher.price_value}}</span>
      </div>

      <!--
            <p class="box-p disf yun"><span class="gray">运费</span><span class="gray">￥0.00</span></p>
      -->
    </div>
    <div class="box box-real">
      <p class="box-p disf" v-if="desc.state=='paying'">
        <span class="real-text">实付款</span>
        <span class="real-pri">{{'￥' + shouldPay}}</span>
      </p>
      <p class="box-p disf" v-else>
        <span class="real-text">实付款</span>
        <span class="real-pri">{{'￥' + (Number(desc.total_price) - Number(desc.voucher_price))}}</span>
      </p>
    </div>
    <div v-if="desc.state=='paying'">
      <div class="quan disf bgf pay_type" v-if="isVip==1">
        <span>支付方式</span>
        <div @click="choose_pay_type('wei')" v-if="pay_type=='wei'">
          <img src="../../../static/img/order/wx-pay.png" class="icon-logo icon-logo1" alt="">
          <span class="type">微信支付</span>
          <i class="icon iconfont icon-youjiantou right-icon1"></i>
        </div>
        <div @click="choose_pay_type('other')" v-if="pay_type=='other'">
          <img src="../../../static/img/order/account-pay.png" class="icon-logo" alt="">
          <span class="type">账户余额</span>
          <i class="icon iconfont icon-youjiantou right-icon1"></i>
        </div>
      </div>
      <p class="disf row bgf account-money" v-if="pay_type=='other'">
        <span>账户余额</span>
        <span class="total-price">{{'￥' + accountMoney}}</span>
      </p>
    </div>


    <div class="order-num">
      <p><span>订单编号：</span><span id="data">{{desc.order_number}}</span></p>
      <div v-if="desc.state=='paying'">
        <p><span>下单时间：</span><span>{{desc.creat_time}}</span></p>
      </div>
      <div v-else>
        <p><span>下单时间：</span><span>{{desc.creat_time}}</span></p>
        <p><span>付款时间：</span><span>{{desc.pay_time}}</span></p>
        <p>
          <span>支付方式：</span>
          <span v-if="desc.pay_type=='wei'">微信</span>
          <span v-if="desc.pay_type=='other'">账户余额</span>
        </p>
      </div>

      <button class="copy" data-clipboard-text="200813215234654" @click="copyOrderNum">复制</button>
    </div>
    <div class="bottom-div" v-if="desc.state=='paying'">
      <!--普通商品待付款--取消订单--付款-->
      <span class="btn" @click="cancelOrder(item.id)">取消订单</span>
      <span class="btn btn-red normal-p" @click="toPay()">付款</span>
    </div>
    <!--    <div class="bottom-div" v-if="desc.state=='payed'">
          &lt;!&ndash;待收货&ndash;&gt;
          <span class="btn">提醒发货</span>
        </div>-->
    <div class="bottom-div" v-if="desc.state=='dispatch'">
      <!--待收货-->
      <span class="btn" @click="checkLogistics(item)">查看物流</span>
      <span class="btn btn-red" @click="confirmReceive(desc.id)">确认收货</span>
    </div>
    <div class="bottom-div" v-if="desc.state=='commenting'">
      <!--交易成功-->
      <span class="btn btn-red" @click="comment(item.id)">去评价</span>
    </div>
    <div class="bottom-div" v-if="desc.state=='confirming'">
      <!--拼单还未成功-->
      <span class="btn btn-red btn1" @click="shareShow=true">邀请好友拼单</span>
    </div>
    <div class="bottom-div" v-if="desc.state=='completed'">
      <!--交易完成-->
      <span class="btn btn-red btn1" @click="deleteOrder(item.id)">删除订单</span>
    </div>


    <div class="sell-cover" :style="'height:'+minHeight" @click="shareShow=false" v-if="shareShow">
      <img src="../../../static/img/click-share.png" class="click-share" alt="">
    </div>
    <cover :isShowSize="isShowComment" :closeByZhao="true" @coverClose="coverClose">
      <div class="star-box">
        <p class="comment-tip-p"><span class="cancel" @click="coverClose">取消</span><span class="ok"
                                                                                         @click="submitComment">确定</span>
        </p>
        <p class="star-ti">请您对此次购物评分~</p>

        <div class="star-div">

          <i class="icon iconfont icon-xingxing  defaultClass" id="icon0" @click="commentStar($event,0)"></i>
          <i class="icon iconfont icon-xingxing  defaultClass" id="icon1" @click="commentStar($event,1)"></i>
          <i class="icon iconfont icon-xingxing  defaultClass" id="icon2" @click="commentStar($event,2)"></i>
          <i class="icon iconfont icon-xingxing  defaultClass" id="icon3" @click="commentStar($event,3)"></i>
          <i class="icon iconfont icon-xingxing  defaultClass" id="icon4" @click="commentStar($event,4)"></i>
        </div>
      </div>
    </cover>

  </div>
</template>

<script>
  import {
    get_order_detail,
    get_suit_count,
    getPersonInfo,
    pay_order,
    get_realgrouporer,
    confirm_receive,
    delete_order,
    cancle_order,
    upload_order_comment
  } from '../../api/index'
  import config from '../../api/config'
  import Cover from '../common_components/cover.vue'


  export default {
    data() {
      return {
        minHeight: '',
        hasChoosedVoucher: false,
        suitCount: 0,
        total: 0,
        shouldPay: 0,//应付金额
        choosedVoucher: {},//付款时选择的优惠券信息
        voucher_id: 0,//优惠券id，未付款时需要
        desc: {},//订单信息
        isVip: 0,//是不是店长
        pay_type: 'wei',//付款方式
        accountMoney: 0,//账户余额
        payEndTime: '',//付款结束时间
        groupEndTime: '',//拼团结束时间
        remainNum: 0,//拼团剩余人数
        groupMember: [],//拼团的团员信息
        groupChief: '',//团长邀请码
        shareShow: false,//分享
        group_id: 0,//拼团的id
        isShowComment: false,
        commentId: '',
        score: 0,
      }
    },
    created() {
      this.$dialog.loading.close();
      this.order_id = this.$route.params.order_id;
      this.isVip = localStorage.getItem('isVip');
      if (sessionStorage.getItem('pay_type')) {
        this.pay_type = sessionStorage.getItem('pay_type');
      }
      if (this.pay_type == 'other') {
        this.getAccount();
      }
      this.getDetail();
    },
    mounted() {
      //获取可用屏幕高度
      this.minHeight = localStorage.getItem('minHeight');
    },
    methods: {
      //子组件发射事件遮罩层关闭coverClose
      coverClose(bool) {
        //bool为子组件通过自定义事件close穿过来的值
        this.isShowComment = false;
        this.changeAllStarGray();
      },
      //评价框
      comment(id) {
        this.isShowComment = true;
        this.commentId = id;
      },
      //星星点击事件
      commentStar(event, index) {
        //console.log(event,index);
        //console.log(event.target.className);
        this.score = Number(index) + 1;
        for (var i = 0; i < 5; i++) {
          var icon = document.getElementById('icon' + i);
          if (i == index) {
            if (icon.className.match(new RegExp("(\\s|^)" + 'defaultClass' + "(\\s|$)"))) {
              icon.className = icon.className.replace(new RegExp("(\\s|^)" + 'defaultClass' + "(\\s|$)"), " choosedClass");
            }
          } else if (i < index) {
            if (icon.className.match(new RegExp("(\\s|^)" + 'defaultClass' + "(\\s|$)"))) {
              icon.className = icon.className.replace(new RegExp("(\\s|^)" + 'defaultClass' + "(\\s|$)"), " choosedClass");
            }
          } else if (i > index) {
            if (icon.className.match(new RegExp("(\\s|^)" + 'choosedClass' + "(\\s|$)"))) {
              icon.className = icon.className.replace(new RegExp("(\\s|^)" + 'choosedClass' + "(\\s|$)"), " defaultClass");
            }
          }

        }
      },
      //提交评价
      submitComment() {
        var _this = this;
        var obj = {
          'order_id': this.commentId,
          'token': localStorage.getItem('token'),
          'score': this.score,
        };
        upload_order_comment(obj).then(function (res) {
          console.log(res);
          if (res.data.errcode == 0) {
            _this.isShowComment = false;
            _this.changeAllStarGray();
            _this.$dialog.toast({
              mes: '发表成功',
              timeout: 1000
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
      },
      //获取订单详情
      getDetail() {
        this.$dialog.loading.open('');
        var _this = this;
        get_order_detail({'token': localStorage.getItem('token'), 'order_id': this.order_id}).then(function (res) {
          //console.log('des==', res);
          var data = res.data.data;
          _this.desc = data;
          _this.total = data.total_price;
          _this.groupChief = data.invite_code;
          _this.$dialog.loading.close();
          if (data.state == 'paying') {
            _this.payEndTime = _this.computeEndTime(data.creat_time, data.out_time).Format('yyyy/MM/dd hh:mm:ss');
            //获取可用优惠券的数量
            var obj = {
              token: localStorage.getItem('token'),
              order_price: data.total_price
            };
            get_suit_count(obj).then(function (res) {
              _this.suitCount = res.data.data.count;
            }).catch(function (err) {
              console.log(err);
            })

          }
          if (sessionStorage.getItem('choosedVoucher')) {
            _this.hasChoosedVoucher = true;
            _this.choosedVoucher = JSON.parse(sessionStorage.getItem('choosedVoucher'));
            _this.voucher_id = _this.choosedVoucher.id;
            _this.shouldPay = Number(_this.total) - _this.choosedVoucher.price_value;
          } else {
            _this.hasChoosedVoucher = false;
            _this.voucher_id = 0;
            _this.choosedVoucher = {};
            _this.shouldPay = Number(_this.total);
          }
          if (data.state == 'confirming') {
            _this.group_id = data.group_id;
            get_realgrouporer({'order_id': _this.order_id}).then(function (res) {
              var data = res.data.data;
              _this.groupEndTime = data.group.end_time;
              _this.remainNum = Number(data.group.start_quantity) - Number(data.users.length);
              _this.groupMember = data.users;
            }).catch(function (err) {
              console.log(err);
            });
            //自定义分享start--分享时带上团长的邀请码
            var UrlAttr = (decodeURIComponent(location.href)).split('#');
            var groupInviter = _this.groupChief;
            var param = '/main/grounp_desc/' + _this.group_id + '?groupInviter=' + groupInviter;
            var link = config.redirect_url + "?host=" + encodeURIComponent(UrlAttr[0]) + "&param=" + encodeURIComponent(param);
            _this.wxutils.wxShare(data.goods[0].goods_name, data.goods[0].goods_name, link, data.goods[0].pic);
            //end
          }

        }).catch(function (err) {
          console.log(err);
        })
      },
      //复制订单号
      copyOrderNum() {
        var _this = this;
        var copyDOM = document.querySelector('#data');  //要复制文字的节点
        var range = document.createRange();
        // 选中需要复制的节点
        range.selectNode(copyDOM);
        // 执行选中元素
        window.getSelection().addRange(range);
        // 执行 copy 操作
        var successful = document.execCommand('copy');
        try {
          var msg = successful ? 'successful' : 'unsuccessful';
          _this.$dialog.toast({
            mes: '订单号已复制成功',
            timeout: 1500
          });
        } catch (err) {
          _this.$dialog.toast({
            mes: '复制未成功',
            timeout: 1500
          });
        }
        // 移除选中的元素
        window.getSelection().removeAllRanges();
      },
      //选择可用优惠券
      useVoucher() {
        this.$router.push({
          path: '/main/order_create_voucher/' + this.total,
          query: {back: '/main/order_desc/' + this.order_id}
        })
      },
      //选择付款方式
      choose_pay_type(type) {
        this.$router.push('/main/pay/' + type + '?back=/main/order_desc/' + this.order_id);
      },
      //获取账户余额
      getAccount() {
        var _this = this;
        getPersonInfo({'token': localStorage.getItem('token')}).then(function (res) {
          //console.log('getAccount==', res);
          _this.accountMoney = res.data.data.bonus_enable;
        }).catch(function (err) {
          console.log(err);
        })
      },
      //查看商品详情
      checkGoodsDesc(type, id) {
        var _this = this;
        switch (type) {
          case 'normal':
            this.$router.push(
              {
                path: '/main/goods_desc',
                query: {
                  'id': id
                }
              });
            break;//普通订单
          case 'scare':
            this.$router.push('/main/timing_desc/' + id);
            break;//抢购订单
          case 'group':
            this.$router.push('/main/grounp_desc/' + id);
            break;//团购订单
        }
      },
      //付款
      toPay() {
        var _this = this;
        var obj = {
          token: localStorage.getItem('token'),
          order_id: this.order_id,
          pay_type: this.pay_type,
          voucher_id: this.voucher_id,
        };
        pay_order(obj).then(function (res) {
          console.log('pay', res);
          if (res.data.errcode == 0) {
            _this.$dialog.toast({
              mes: '支付成功',
              timeout: 1000,
              icon: 'success'
            });
            sessionStorage.removeItem('choosedVoucher');
            sessionStorage.removeItem('pay_type');
            setTimeout(function () {
              _this.$router.push('/main/pay_success/' + res.data.data.order_id);
            }, 1300)
          } else {
            _this.$dialog.toast({
              mes: res.data.errdesc,
              timeout: 1000
            });
          }
        }).catch(function (err) {
          console.log(err);
        })
      },
      //计算付款结束时间
      computeEndTime(time, during) {
        var now = new Date(time);
        now.setHours(now.getHours() + Number(during));
        return now;
      },
      //退款申请
      returnApply() {
        this.$router.push('/main/refund/' + this.order_id)
      },
      //确认收货
      confirmReceive(id) {
        var _this = this;
        confirm_receive({'token': localStorage.getItem('token'), 'order_id': id}).then(function (res) {
          console.log('res==', res);
          if (res.data.errcode == 0) {
            _this.$dialog.toast({
              mes: '确认收货成功',
              timeout: 1000,
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
      },
      //查看物流
      checkLogistics(item) {
        this.$router.push({
          name: 'logistics_desc',
          params: {
            order_id: item.id,
            orderCode: item.order_number,
            shipperCode: item.shipperCode,
            logisticCode: item.logisticCode
          }
        })
      },
      //删除订单
      deleteOrder(id) {
        var _this = this;
        delete_order({'token': localStorage.getItem('token'), 'order_id': id}).then(function (res) {
          if (res.data.errcode == 0) {
            _this.$dialog.toast({
              mes: '删除成功',
              timeout: 1000,
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
      },
      //取消订单
      cancelOrder(id) {
        var _this = this;
        cancle_order({'token': localStorage.getItem('token'), 'order_id': id}).then(function (res) {
          if (res.data.errcode == 0) {
            _this.$dialog.toast({
              mes: '取消成功',
              timeout: 1000,
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
      },
    },
    components: {
      'cover': Cover
    },
  }
</script>
<style scoped="true">
  @import "../../../static/css/order/order_desc.css";


</style>
