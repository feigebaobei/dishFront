<template>
  <div class="menuItem">
    <img :src="dataImg" alt="">
    <div class="cont">
      <h2 class="name" v-html="name"></h2>
      <p class="price" v-html="price"></p>
      <p class="tip" v-html="tip"></p>
    </div>
  </div>
</template>

<script>
import picMap from '@/assets/lib/picMap.js'
export default {
  props: {
    imgUrl: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    price: {
      type: [String, Number],
      default: ''
    },
    tip: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      dataImg: picMap.pic.default.x1
    }
  },
  // watch: {},
  // filters: {},
  // computed {},
  components: {
  },
  methods: {
    // init () {}
  },
  created () {},
  mounted () {
    // init()
  }
}
</script>

<style scoped="" lang="stylus">
@import '~@/assets/stylus/basic.styl'
  .menuItem
    display: flex
    // background: $bgColor
    background: $bgEmphasizeColor
    margin: 10px 8px

    img
      height: 160px

    .cont
      display: flex
      flex-direction: column
      justify-content: space-between
      padding: 6px 10px

      .name
        color: $emphasizeColor
        font-size: 40px

      .price
        color: $trademarkColor
        font-size: 38px

      .tip
        color: $assistColor
        font-size: 20px
</style>
