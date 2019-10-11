<template>
  <div class="orderList">
    <!-- <p>orderList</p> -->
    <!-- 导航 -->
    <!-- <head-nav :name="dataUserInfo.name" :loginStatus="!!dataUserInfo.name"></head-nav> -->
    <head-nav></head-nav>
    <!-- 订单列表 -->
    <div class="orderBox">
      <order-item class="item" v-for="(item, index) in dataOrderList" :key="index" :data="item" @gotoComment="gotoComment"></order-item>
    </div>
    <!-- 累加载 -->
    <infinite-loading @infinite="getHistoryOrder" ref="infiniteLoading">
      <div style="height: 36px; color: #999" slot="spinner">---正在加载---</div>
      <div style="height: 36px; color: #999" slot="no-more">---我也是有底线的---</div>
      <div style="height: 36px; color: #999" slot="no-results">---没有数据---</div>
    </infinite-loading>
  </div>
</template>

<script>
import headNav from '@/components/headNav.vue'
import orderItem from '@/components/common/orderItem/index.vue'
import infiniteLoading from 'vue-infinite-loading'
import api from '@/assets/lib/api'
export default {
  // props: {},
  // name: '',
  data () {
    return {
      // dataUserInfo: {
      //   name: '54545'
      // },
      dataSelOptions: {
        page: 0,
        size: 10
      },
      dataOrderList: []
    }
  },
  // watch: {},
  // filters: {},
  // computed {},
  components: {
    headNav,
    orderItem,
    infiniteLoading
  },
  methods: {
    // init () {
    //   this.getHistoryOrder()
    // },
    getHistoryOrder ($state) {
      api.getHistoryOrder({
        page: this.dataSelOptions.page,
        size: this.dataSelOptions.size
      }).then(res => {
        console.log(res)
        let data = res.data.data
        if (data.length) {
          this.dataOrderList = this.dataOrderList.concat(data)
          if (data.length < this.dataSelOptions.size) {
            $state.complete()
          } else {
            // this.dataOrderList = this.dataOrderList.concat(data)
            this.dataSelOptions.page++
            $state.loaded()
          }
        } else {
          $state.complete()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    gotoComment (id) {
      console.log(id)
      this.$router.push({
        path: '/consumer/comment',
        query: {
          dishId: id
        }
      })
    }
  },
  created () {},
  mounted () {
    // this.init()
  }
}
</script>

<style scoped="" lang="stylus">
@import '~@/assets/stylus/basic.styl'
  .orderList

    .orderBox
      max-width: 1000px
      margin: 0 auto
      display: flex
      flex-wrap: wrap
      justify-content: space-between

      .item
        flex-basis: 495px
        margin-bottom: 10px

        &:nth-child(2n)
          margin-right: 0

</style>
