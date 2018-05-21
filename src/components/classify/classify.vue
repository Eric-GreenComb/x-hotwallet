<template>
  <div class="container classify-container">
    <div class="disf top">
      <div class="disf input-box">
        <i class="icon iconfont icon-sousuo"></i>
        <input type="text" @click="toSearch" class="sousuo-input" placeholder="请输入关键字搜索">
      </div>
      <span>取消</span>
    </div>
      <footer-tab :index="1"></footer-tab>
  </div>
</template>

<script>
  import FooterTab from '../common_components/footer_tab.vue'
  import {getgoods_classify, get_top_banner} from '../../api/index'
  export default {
    data() {
      return {
        //当前选中类别
        activeIndex: 0,
        bannerIndex: 0,
        list: [],
        //轮播图
        items:[],
        bannerList: [],
      }
    },
    created() {
      this.$dialog.loading.close();
      this.getClassify();
      this.getBanner();
    },
    methods: {

    },
    components: {
      'footer-tab': FooterTab
    }


  }
</script>
<style scoped="true">
  html {
    background: #fff;
  }

  .classify-container {
    padding-bottom: 1.2rem;
  }

  .top {
    padding: 0 0.26rem;
    width: 100%;
    height: 0.9rem;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #e5e5e5;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
  }

  .icon-sousuo {
    margin: 0 0.17rem 0 0.32rem;
  }

  .input-box {
    width: 86%;
    height: 0.6rem;
    background-color: #f2f2f2;
    border-radius: 4px;
    align-items: center;
    padding: 0.15rem 0;
    color: #a4a4a4;
  }

  .sousuo-input {
    width: 80%;
  }

  .icon-gouwuche {
    margin: 0 0.25rem 0 0.15rem;
    font-size: 0.46rem;
    color: #2f2f2f;
  }

  .xiaoxi-box {
    padding-top: 0.08rem;
  }

  .icon-xiaoxi {
    font-size: 0.40rem;
    color: #2f2f2f;
  }

  /*轮播图*/
  .swiper-container {
    width: 6.90rem;
    height: 2.50rem;
    margin-top: 1rem;

  }

  .swiper-slide .banner-pic {
    width: 100%;
    height: 100%;
  }

  .pagination-ul {
    display: flex;
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    bottom: 0.15rem;
    z-index: 100;
  }

  .pagination {
    margin: 0.05rem;
    width: 0.12rem;
    height: 0.12rem;
    border-radius: 50%;
    background-color: #fff;
    opacity: 0.5;
    display: inline-block;
  }

  .pagination.activePagination {
    background-color: #fff;
    opacity: 1;
  }

  /*end*/

  .banner-pic {
    width: 100%;
  }

  .pagination {
    margin: 0.05rem;
    width: 0.12rem;
    height: 0.12rem;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    opacity: 0.5;
    display: inline-block;
  }

  .pagination.activePagination {
    background-color: #fff;
  }

  .classify-ul {
    padding: 0.23rem;
    display: flex;
    flex-wrap: wrap;
  }

  .classify-li {
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.35rem 0;
  }

  .classify-pic {
    width: 1.10rem;
    height: 1.10rem;
    margin-bottom: 0.25rem;
    border-radius: 50%;
  }

</style>
