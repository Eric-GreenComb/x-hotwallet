<template>
  <div class="container logistics-container" :style="'min-height:'+minHeight">
    <div class="goods-msg disf">
      <img class="goods-pic" :src="pic" alt="">
      <div>
        <p class="state">{{state}}</p>
        <p class="delivery"><span>{{shipper_name}}</span><span>：</span><span>{{params.logisticCode}}</span></p>
      </div>
    </div>
    <div class="address disf">
      <i class="icon iconfont icon-location"></i>
      <div>
        <span>[收货地址]</span><span>{{address}}</span>
      </div>
    </div>
    <p class="ti">物流跟踪</p>
    <div class="logistics-box">
      <yd-timeline>
        <yd-timeline-item v-for="(item,index) in list" :key="index">
          <p>{{item.AcceptStation}}</p>
          <p class="time-p">{{item.AcceptTime}}</p>
        </yd-timeline-item>
      </yd-timeline>
    </div>


  </div>


</template>

<script>
  import {get_order_detail,getOrderTracesByJson} from '../../api/index'
  export default {
    data() {
      return {
        minHeight: '',
        params:{
          orderCode:'',
          shipperCode:'',
          logisticCode:''
        },
        order_id:'',
        list:[],
        pic:'',
        address:'',
        state:'',
        shipper_name:''
      }
    },
    created() {
      this.minHeight = localStorage.getItem('minHeight');
      this.order_id=this.$route.params.order_id;
      this.params.orderCode=this.$route.params.orderCode;
      this.params.shipperCode=this.$route.params.shipperCode;
      this.params.logisticCode=this.$route.params.logisticCode;
      this.getDesc();
    },
    mounted(){
      this.getLogistic();
    },
    methods:{
      getDesc(){
        var _this=this;
        get_order_detail({'token': localStorage.getItem('token'), 'order_id': this.order_id}).then(function (res) {
          console.log('res---',res);
          var data=res.data.data;
          _this.address=' '+data.simple_adress+' '+data.detail_adress;
          _this.pic=data.goods[0].pic;
          _this.shipper_name=data.shipper_name;
        }).catch(function (err) {
          console.log(err);
        })
      },
      //获取物流列表
      getLogistic(){
        var _this=this;
        this.$dialog.loading.open('');
        getOrderTracesByJson(this.params).then(function (res) {
          _this.list=res.data.data.traces.reverse();
          setTimeout(function () {
            var icon=document.getElementsByClassName('yd-timeline-item')[0].getElementsByClassName('yd-timeline-icon')[0];
            icon.style.backgroundColor=' #b81f23';
            _this.$dialog.loading.close();
          },200);
          var state=res.data.data.state;
          switch (state){
            case '2':_this.state='运输中';break;
            case '3':_this.state='已签收';break;
            case '4':_this.state='包裹异常';break;
          }
        }).catch(function (err) {
          console.log(err);
        })
      }
    }
  }
</script>
<style scoped="true">
  @import "../../../static/css/order/logistics_desc.css";
  .yd-timeline-item:first-child>.yd-timeline-icon {
    background-color: #b81f23!important;
    width: 10px;
    height: 10px;
  }

</style>
