<template>
  <div class="menuItem" @click.stop="triggerAll">
    <img :src="dataImg" alt="">
    <div class="cont">
      <h2 class="name" v-html="name"></h2>
      <div class="second">
        <p class="price" v-html="`${hasCurrency ? currency  : ''}${price}`"></p>
        <p class="bgBox">
          <span class="minus" v-if="number > 0" @click.stop="minus">-</span>
          <span class="number" v-if="number > 0" v-html="number"></span>
          <span class="add" @click.stop="add">+</span>
        </p>
      </div>
      <p class="tip" v-html="tip"></p>
    </div>
  </div>
</template>

<script>
import picMap from '@/assets/lib/picMap.js'
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    imgUrl: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    hasCurrency: {
      type: Boolean,
      default: true
    },
    currency: {
      type: String,
      default: '￥'
    },
    price: {
      type: [String, Number],
      default: ''
    },
    number: {
      type: [Number],
      default: 0
    },
    tip: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      dataImg: this.imgUrl || picMap.pic.default.x1
    }
  },
  // watch: {},
  // filters: {},
  // computed {},
  components: {
  },
  methods: {
    // init () {}
    triggerAll () {
      this.$emit('triggerAll')
    },
    minus () {
      this.$emit('minus', this.id)
    },
    add () {
      this.$emit('add', this.id)
    }
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
    user-select: none

    img
      height: 160px
      width: 213px // 为使图片统一大小，可能会发生图片变形。

    .cont
      display: flex
      flex-direction: column
      justify-content: space-between
      padding: 6px 10px

      .name
        color: $emphasizeColor
        font-size: 40px

      .second
        .price
          color: $trademarkColor
          font-size: 38px
          display: inline-block
          width: 200px

        .bgBox
          display: inline-block
          width: 120px
          text-align: right

          .minus
          .number
          .add
            border-radius: 100px
            color: #fff
            background: #44ddff
            width: 26px
            height: 26px
            font-size: 26px
            line-height: 26px
            display: inline-block
            justify-content: center
            text-align: center
            cursor: pointer

          .minus
          .number
            margin-right: 10px

          .number
            color: #333
            background: none

      .tip
        color: $assistColor
        font-size: 20px
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        max-width: 680px

</style>
