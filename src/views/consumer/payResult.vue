<template>
  <div class="payResult">
    <!-- {{dataResult}} -->
    <div class="success" v-if="dataResult">
      <img :src="dataImgSuccess" alt="">
      <p>支付成功</p>
      <div class="opBox">
        <Button type="primary" @click="gotoMarket">再逛逛</Button>
        <Button type="primary" @click="gotoOrderList">查看订单</Button>
      </div>
    </div>
    <div class="fail" v-else>
      <img :src="dataImgFail" alt="">
      <p>支付失败</p>
      <div class="opBox">
        <Button type="primary" @click="gotoMarket">再试试</Button>
      </div>
    </div>

  </div>
</template>

<script>
// import comp from '@/components/common/comp.vue'
import picMap from '@/assets/lib/picMap'
import {Button} from 'iview'
export default {
  // props: {},
  // name: '',
  data () {
    return {
      dataImgSuccess: picMap.pic.success.x1,
      dataImgFail: picMap.pic.fail.x1,
      dataResult: this.$route.query.result === 'true'
    }
  },
  // watch: {},
  // filters: {},
  // computed {},
  components: {
    // comp
    Button
  },
  methods: {
    // init () {}
    gotoMarket () {
      this.$router.push({
        path: '/consumer'
      })
    },
    gotoOrderList () {
      this.$router.push({
        path: '/consumer/orderList'
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
  .payResult
    display: flex
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    justify-content: center
    flex-direction: column
    align-items: center

    .success
    .fail
      display: flex
      flex-direction: column
      height: 350px
      width: 200px

      img
        margin-bottom: 40px

      p
        font-size: 36px
        text-align: center
        margin-bottom: 15px

      .opBox
        display: flex
        justify-content: space-around

</style>
