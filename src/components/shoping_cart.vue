<template>
  <div class="container" :style="'min-height: '+minHeight">
    <div class="shopping-container" :style="'min-height: '+minHeight" v-if="list.length>0||invalid.length>0">
      <!--购物车列表-->
      <ul class="shopcart-list" v-if="list.length>0">
        <li class="disf goods-list" v-for="(item,index) in list">
          <input type="checkbox" :id="'li'+item.id" class="disn" :value="item" v-model="checkedNames">
          <label :for="'li'+item.id" class="i-span">
            <i class="icon iconfont  icon-weixuanzhong-01" :id="'status-'+item.id"></i>
            <!--<span class="i-span"><i class="icon iconfont  icon-iconfontxuanzhong"></i></span>-->
          </label>
          <!--<div class="goods" :style="'background-image:url('+item.pic+')'"></div>-->
          <div class="goods">
            <!--此处需要更改-->
            <img :src="item.pic" class="goods-pic" alt="">
          </div>
          <div class="goods-msg">
            <div class="goods-name">
              <div class="integral-div"><span class="integral-span">{{'积分' + item.price.integral}}</span></div>
              <span>{{item.goods_name}}</span></div>
            <p class="goods-size">{{item.price.pvs_name}}</p>
            <div class="goods-price disf">
              <div v-if="item.type=='normal'">
                <span>{{'￥' + item.price.original_price}}</span>
              </div>
              <div v-else>
                <span>{{'￥' + item.price.promotion_price}}</span>
                <span class="nouse_price">{{'￥' + item.price.original_price}}</span>
              </div>
              <table class="right count-div">
                <tr>
                  <td class="common-discount" @click="updateNumber(item,'0')" v-if="item.number>1">-</td>
                  <td class="common-discount common-disabled" v-else>-</td>
                  <td class="common-num">{{item.number}}</td>
                  <td class="common-add" @click="updateNumber(item,'1')">+</td>
                </tr>
                <i class="icon iconfont icon-shanchu" @click="deleteGoods(item.id,'删除成功')"></i>
              </table>
            </div>

          </div>

        </li>
      </ul>
      <ul class="timeout-goods-ul" v-if="invalid.length>0">
        <li>
          <p class="disf sxp"><span>{{'已失效商品' + invalid.length + '件'}}</span><span class="red-text"
                                                                                   @click="deleteOutInvalid">清空失效商品</span>
          </p>
        </li>
        <li class="disf goods-list" v-for="item in invalid">
          <!--<div class="goods" :style="'background-image:url('+item.pic+')'"></div>-->
          <div class="disf span-div">
            <span class="text-span">失效</span>
          </div>
          <!--此处需要更改-->
          <div class="goods">
            <img :src="item.pic" class="goods-pic" alt="">
          </div>
          <div class="goods-msg1">
            <p class="goods-name out-good-name">{{item.goods_name}}</p>
            <p class="goods-tip">{{item.invalid_dis}}</p>
          </div>
        </li>
      </ul>
      <!--底部button-->
      <div class="disf total" v-if="list.length>0">
        <div class="hj-btn disf">
          <div class="hj"><span>合计： </span><span class="money">{{'￥ ' + totalPrice}}</span></div>
          <div class="lr"><span>积分累计： </span><span class="">{{'￥ ' + totalIntegral}}</span></div>
        </div>
        <span class="pay" @click="pay()">{{'结算(' + totalNumber + ')'}}</span>
      </div>
    </div>
    <div class="no-list-div" v-if="list.length==0&&invalid.length==0">
      <img src="../../static/img/my/shopping_cart_nolist.png" class="no-list-pic" alt="">
      <p class="texac no-text">购物车竟然是空的</p>
    </div>


  </div>
</template>

<script>
  import LoadMore from './common_components/loadmore.vue';
  import {
    getmy_shopping_cart,
    add_shopping_cart,
    update_goodsnumber,
    delete_shopCart
  } from '../api/index'

  export default {
    data() {
      return {
        //  上拉加载数据
        minHeight: 0,
        scrollTop: 0,
        containerHeight: 0,
        loading: false,
        allLoaded: false,
        bottomText: '上拉加载更多...',
        bottomStatus: '',
        pageNo: 1,
        totalPage: 1,
        id: 0,
        isVip: 1,
        list: [],
        checkedNames: [],
        totalNumber: 0,
        totalPrice: 0,
        totalIntegral: 0,
        totalProfit: 0,
        params: {
          token: ''
        },
        invalid: []
      }
    },
    watch: {
      checkedNames: {
        handler(n, o) {
          console.log('n', n);
          var _this = this;
          this.totalNumber = n.length;
          this.totalPrice = 0;
          this.totalIntegral = 0;
          //切换选中时类
          this.list.forEach(function (li) {
            var classList = document.getElementById('status-' + li.id).getAttribute("class");
            classList = classList.replace("icon-iconfontxuanzhong", "icon-weixuanzhong-01");
            document.getElementById('status-' + li.id).setAttribute("class", classList);
          });
          n.forEach(function (item) {
            var classList = document.getElementById('status-' + item.id).getAttribute("class");
            classList = classList.replace("icon-weixuanzhong-01", "icon-iconfontxuanzhong");
            document.getElementById('status-' + item.id).setAttribute("class", classList);
            _this.totalPrice += Number(item.price.original_price) * Number(item.number);
            _this.totalIntegral += Number(item.price.integral) * Number(item.number);
          })
        },
        deep: true
      }
    },
    mounted() {
      this.$dialog.loading.close();
      this.minHeight = localStorage.getItem('minHeight');
      this.params.token = localStorage.getItem('token');
      this.getCartList();
    },
    methods: {
      //更新购物车中商品数量
      updateNumber(item, type) {
        var obj = {
          number: Number(item.number),
          token: localStorage.getItem('token'),
          id: item.id
        };
        var _this = this;
        if (type == 0) {
          obj.number--;
        } else {
          obj.number++;
        }
        update_goodsnumber(obj).then(function (res) {
          console.log(res);
          if (res.data.errcode == 1) {
            _this.$dialog.toast({
              mes: res.data.errdesc,
              timeout: 1500
            });
          } else {
            _this.checkedNames.forEach(function (checkItem, index) {
              if (checkItem.id == item.id) {
                _this.checkedNames[index].number = Number(obj.number);
              }

            })
            _this.getCartList();
          }
        }).catch(function (err) {
          console.log(err);
        })
      },
      //获取购物车列表
      getCartList() {
        var _this = this;
        this.$dialog.loading.open('加载中...');
        getmy_shopping_cart(this.params).then(function (res) {
          console.log(res);
          var effective = res.data.data.effective;
          var invalid = res.data.data.invalid;
          _this.list = effective;
          _this.invalid = invalid;
          _this.$dialog.loading.close();
        }).catch(function (err) {
          console.log(err);
        })
      },
      //结算
      pay() {
        var cartGoodsChoosed = {};
        cartGoodsChoosed.goods = this.checkedNames;
        cartGoodsChoosed.total_price = this.totalPrice;
        cartGoodsChoosed.total_integral = this.totalIntegral;
        sessionStorage.setItem('cartGoodsChoosed', JSON.stringify(cartGoodsChoosed));
        this.$router.push('/main/cart_order_create');
      },
      deleteGoods(id, describle) {
        var obj = {
          'token': localStorage.getItem('token'),
          'id': id
        };
        var _this = this;
        delete_shopCart(obj).then(function (res) {
          console.log(res);
          if (res.data.errcode == 0) {
            _this.$dialog.toast({
              mes: describle,
              timeout: 1000
            });
            _this.getCartList();
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
      //清空已失效
      deleteOutInvalid() {
        var idArr = [];
        this.invalid.forEach(function (item) {
          idArr.push(item.id);
        });
        var idStr = idArr.join(',');
        this.deleteGoods(idStr, '已清空');
      }
    }
  }
</script>
<style scoped>
  @import "../../static/css/shopping_cart/shopping_cart.css";

</style>
