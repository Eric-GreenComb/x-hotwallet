<template>
  <div class="container con base-container" :style="'min-height: '+minHeight">
    <yd-navbar title="请选择收货服务站" :fixed="true" fontsize="0.36rem" color="#2f2f2f" height="1rem">
      <router-link to="/" slot="left">
        <yd-navbar-back-icon color="#2f2f2f"></yd-navbar-back-icon>
      </router-link>
      <i class="icon iconfont icon-sousuo" slot="right"></i>
    </yd-navbar>
    <div class="disf dw">
      <span>附近的服务站</span>
      <p class="position"><i class="icon iconfont icon-sousuo"></i><span class="my-position">我的位置</span></p>
    </div>
    <template v-for="(item,index) in baselist">
      <input type="radio" name="base" :id="item.id" :value="item.id" v-model="baseId" class="disn"/>
      <label :for="item.id" v-if="baseId==index" class="active disf">
        <div class="msg">
          <p class="tit disf"><span>{{item.name}}</span><span class="distance">{{item.distance + 'm'}}</span></p>
          <p class="address">{{'地址：' + item.address}}</p>
          <p class="tel">{{'电话：' + item.tel}}</p>
        </div>
      </label>
      <label :for="item.id" v-else="" class="label disf">
        <div class="msg">
          <p class="tit disf"><span>{{item.name}}</span><span class="distance">{{item.distance + 'm'}}</span></p>
          <p class="address">{{'地址：' + item.address}}</p>
          <p class="tel">{{'电话：' + item.tel}}</p>
        </div>
      </label>
      <div class="line-bor"></div>
    </template>
    <div class="submit-box">
      <button class="submit">确定</button>
    </div>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        minHeight: '',
        baseId: '0',
        baselist: [
          {id: 0, name: '收货站1', distance: '55', address: '北京市  朝阳区  望京SOHOT3 B座  1001', tel: '13203145201'},
          {id: 1, name: '收货站2', distance: '55', address: '北京市  朝阳区  望京SOHOT3 B座  1001', tel: '13203145202'},
          {id: 2, name: '收货站3', distance: '55', address: '北京市  朝阳区  望京SOHOT3 B座  1001', tel: '13203145203'},
          {id: 3, name: '收货站4', distance: '55', address: '北京市  朝阳区  望京SOHOT3 B座  1001', tel: '13203145204'},
        ]
      }
    },
    mounted() {
      this.$dialog.loading.close();

      this.minHeight = localStorage.getItem('minHeight');
      console.log(this.minHeight);
      //console.log(this.$parent._data.minHeight);
    }
  }
</script>
<style scoped="true">
  @import "../../../static/css/my/choose_base.css";
</style>
