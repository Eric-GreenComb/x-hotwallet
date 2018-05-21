<template>
  <keep-alive>
    <div class="container bg-container withdraw-container" :style="'min-height:'+minHeight">
      <p class="ti row bgf">提现金额</p>
      <div class="money row bgf">
        <span class="sign">￥</span>
        <input type="number" class="money-input" v-model="money" placeholder="输入提现金额">
      </div>
      <p class="ti row bgf disf ti1"><span class="warn" v-if="moneyOver">金额已超过可提现余额</span><span
        v-else>{{'可提现金额￥' + bonus}}</span><span class="blue-text" @click="withdrawAll">全部提现</span></p>
      <div class="bgf row type-div disf">
        <input type="radio" name="type" v-model="typeValue" value="card" id="card" class="disn">
        <input type="radio" name="type" v-model="typeValue" value="ali" id="alipay" class="disn">
        <label for="card">
          <i class="icon iconfont" :class="[typeValue=='card'?'icon-iconfontxuanzhong':'icon-weixuanzhong-01']"></i>
          <span>提现到储蓄卡</span>
        </label>
        <label for="alipay">
          <i class="icon iconfont " :class="[typeValue=='ali'?'icon-iconfontxuanzhong':'icon-weixuanzhong-01']"></i>
          <span>提现到支付宝</span>
        </label>
      </div>
      <p class="row bgf tip-p" v-if="typeValue=='card'"><span>姓名：</span><span>{{ic_name}}</span><span
        class="span-block">只能提现到本人银行卡</span></p>
      <p class="row bgf tip-p" v-if="typeValue=='ali'"><span>姓名：</span><span>{{ic_name}}</span></p>
      <div class="money row bgf">
        <input type="number" class="money-input" v-model="card" placeholder="输入银行卡号" v-if="typeValue=='card'">
        <input type="text" class="money-input" v-model="alicount" placeholder="输入支付宝账号" v-if="typeValue=='ali'">
      </div>
      <div class="bgf disf row choose-bank-p" v-if="typeValue=='card'" @click="chooseBank">
        <span>选择银行</span>
        <div><img :src="pic_name" class="bank-pic" alt=""> <span
          class="bank-name">{{bank_name}}</span><i class="icon iconfont icon-youjiantou"></i></div>
      </div>
      <button class="withdraw-btn commit-btn" v-if="canCommit" @click="withdraw">确认提现</button>
      <button class="withdraw-btn" v-else>确认提现</button>
      <p class="notice row"><span>每月18号和29号为提现日</span></p>
      <p class="row record"><router-link to="/main/withdraw_desc">提现记录？</router-link></p>

    </div>
  </keep-alive>
</template>

<script>
  import {
    getPersonWithdraw_cashList,
    getPerson_homepageInfo,
    applyforWithdraw_cash,
    getPersonInfo
  } from '../../api/index'

  export default {
    data() {
      return {
        minHeight: '',
        money: '',
        typeValue: 'card',
        card: '',
        alicount: '',
        ic_name: '',
        pic_name: '',
        bank_name: '',
        bonus: '',
        bank_id: '',
        canCommit: false,
        moneyOver: false

      }
    },
    mounted() {
      this.$dialog.loading.close();
      this.minHeight = localStorage.getItem('minHeight');
      this.getPersonBouns();
      this.getPersonName();
      this.getLastType();
    },
    watch: {
      //输入金额
      money(n, o) {
        //输入不为空的时候
        if (n != '') {
          //如果提现输入金额大于可提现余额
          if (Number(n) > Number(this.bonus)) {
            this.moneyOver = true;
            this.canCommit = false;//不能提交
            return;
          } else {
            this.moneyOver = false;
            this.canCommit = true;//可以提交
          }
          //提现类型为储蓄卡时
          if (this.typeValue == 'card') {
            if (this.card != '' && this.bank_id != '') {
              this.canCommit = true;
            } else {
              this.canCommit = false;
            }
          } else {
            //提现类型为支付宝时
            if (this.alicount != '') {
              this.canCommit = true;
            } else {
              this.canCommit = false;
            }
          }
        } else {
          //输入为空的时候，不能提交
          this.moneyOver = false;
          this.canCommit = false;
        }
      },
      //储蓄卡号
      card(n, o) {
        if (this.typeValue == 'card') {
          //储蓄卡号不为空时
          if (n != '') {
            if (this.money != '' && this.bank_id != '') {
              this.canCommit = true;
            } else {
              this.canCommit = false;
            }
          } else {
            this.canCommit = false;
          }
        }

      },
      //支付宝账户
      alicount(n, o) {
        if (this.typeValue == 'ali') {
          if (n != '') {
            if (this.money != '') {
              this.canCommit = true;
            } else {
              this.canCommit = false;
            }
          } else {
            this.canCommit = false;
          }
        }
      },
      typeValue(n,o){
        //提现类型为储蓄卡时
        if (this.typeValue == 'card') {
          if (this.card != '' && this.bank_id != '' && this.money!='' && Number(this.money)<=Number(this.bonus)) {
            this.canCommit = true;
          } else {
            this.canCommit = false;
          }
        } else {
          //提现类型为支付宝时
          if (this.alicount != ''&& this.money!='' && Number(this.money)<=Number(this.bonus)) {
            this.canCommit = true;
          } else {
            this.canCommit = false;
          }
        }
      }
    },
    methods: {
      //获取用户余额
      getPersonBouns() {
        var _this = this;
        getPerson_homepageInfo({'invite_code': localStorage.getItem('invite_code')}).then(function (res) {
          //console.log(res.data.data);
          var data = res.data.data;
          _this.bonus = data.bonus_enable;
        }).catch(function (err) {
          console.log(err);
        })
      },
      //获取用户姓名
      getPersonName() {
        var _this = this;
        getPersonInfo({'token': localStorage.getItem('token')}).then(function (res) {
          var data = res.data.data;
          _this.ic_name = data.name;
        }).catch(function (err) {
          console.log(err);
        })
      },

      //获取我的上次提现账号列表
      getLastType() {
        var _this = this;
        this.$dialog.loading.open('');
        getPersonWithdraw_cashList({'token': localStorage.getItem('token')}).then(function (res) {
          //console.log(res.data.data[0]);
          var data = res.data.data;
          data.forEach(function (item) {
            if (item.type == 'ali') {
              _this.alicount = item.ic_number;
              _this.pic_name = '';
              _this.bank_name = '';
              _this.bank_id = 0;
            } else {
              _this.card = item.ic_number;
              _this.pic_name = item.pic_name;
              _this.bank_name = item.bank_name;
              _this.bank_id = item.id;
            }
          });
          if (sessionStorage.getItem('withdrawInfo')) {
            var withdrawInfo = JSON.parse(sessionStorage.getItem('withdrawInfo'));
            _this.money = withdrawInfo.money;
            _this.typeValue = withdrawInfo.typeValue;
            _this.card = withdrawInfo.card;
            _this.alicount = withdrawInfo.alicount;
            _this.pic_name = withdrawInfo.pic_name;
            _this.bank_name = withdrawInfo.bank_name;
            if (sessionStorage.getItem('bankInfo')) {
              var bankInfo = JSON.parse(sessionStorage.getItem('bankInfo'));
              _this.pic_name = bankInfo.pic_name;
              _this.bank_name = bankInfo.bank_name;
              _this.bank_id = bankInfo.id;
            }
            ;
          }

          _this.$dialog.loading.close();
        }).catch(function (err) {
          console.log(err);
        })
      },
      //全部提现
      withdrawAll() {
        this.money = this.bonus;
      },
      //选择银行
      chooseBank() {
        var withdrawInfo = {
          money: this.money,
          typeValue: this.typeValue,
          card: this.card,
          alicount: this.alicount,
          ic_name: this.ic_name,
          pic_name: this.pic_name,
          bank_name: this.bank_name,
          bonus: this.bonus,
        };
        sessionStorage.setItem('withdrawInfo', JSON.stringify(withdrawInfo));
        this.$router.push({
          path: '/main/bank_list',
          query: {redirect: '/main/withdraw'}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        });

      },
      //提现
      withdraw() {
        var _this=this;
        var obj = {
          token: localStorage.getItem('token'),
          ic_name: this.ic_name,
          ic_number: '',
          type: this.typeValue,
          money: this.money,
          bank_id: '0',
        };
        if (this.typeValue == 'ali') {
          obj.ic_number = this.alicount;
        } else {
          obj.ic_number = this.card;
          obj.bank_id = this.bank_id;
        }
       /* if(this.money==0){
          this.$dialog.toast({
            mes: '请输入有效的金额',
            timeout: 1000
          });
          return;
        }*/
        applyforWithdraw_cash(obj).then(function (res) {
          sessionStorage.removeItem('withdrawInfo');
          sessionStorage.removeItem('bankInfo');
          if(res.data.errcode==0){
            //提现成功后跳到提现成功的页面
            if(_this.typeValue=='card'){
              var len=_this.card.length;
              var obj={
                money:_this.money,
                type:_this.typeValue,
                card:_this.card.substr(len-4,4),
                bank_name:_this.bank_name
              };
              sessionStorage.setItem('recordInfo',JSON.stringify(obj));
            }else{
              var len=_this.alicount.length;
              var num=len-7;
              var s='';
              for (var i=0;i<num;i++){
                s+='*';
              }
              var alicount=_this.alicount.substr(0,3)+s+_this.alicount.substr(len-4,4);
              var obj={
                money:_this.money,
                type:_this.typeValue,
                alicount:alicount
              };
              sessionStorage.setItem('recordInfo',JSON.stringify(obj));
            }
            setTimeout(function () {
              _this.$router.push('/main/withdraw_complete');
            },1500)
          }else{
            _this.$dialog.toast({
              mes: res.data.errdesc,
              timeout: 1000
            });
          }
        }).catch(function (err) {
          console.log(err);
        })

      }
    }

  }
</script>
<style scoped="true">
  @import "../../../static/css/shop/withdraw.css";

</style>
