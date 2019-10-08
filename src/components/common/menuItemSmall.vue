<template>
  <div class="menuItemSmall">
    <img :src="imgUrl" alt="" class="img">
    <div class="cont">
      <div class="second">
        <h6 class="title" v-html="name"></h6>
        <p class="price" v-html="compPrice"></p>
      </div>
      <div class="btBox">
        <span class="minus" v-if="Number(number) > 0" @click.stop="minus">-</span>
        <span class="number" v-if="Number(number) > 0" v-html="number"></span>
        <span class="add" @click.stop="add">+</span>
      </div>
    </div>
  </div>
</template>

<script>
// import comp from '@/components/common/comp.vue'
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
      type: String,
      default: ''
    },
    number: {
      type: [Number, String],
      default: ''
    }
  },
  // name: '',
  data () {
    return {
    }
  },
  // watch: {},
  // filters: {},
  computed: {
    compPrice () {
      let amount = Number(this.price) * Number(this.number)
      return this.hasCurrency ? `${this.currency}${amount.toFixed(2)}` : amount.toFixed(2)
    }
  },
  components: {
    // comp
  },
  methods: {
    // init () {}
    add () {
      this.$emit('add', this.id)
    },
    minus () {
      this.$emit('minus', this.id)
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
  .menuItemSmall
    display: flex
    padding: 3px
    user-select: none

    .img
      height: 50px;
      width: 66px;
      margin-right: 5px

    .cont
      flex-basis: 80%
      flex-grow: 1
      flex-shrink: 1
      display: flex

      .second
        flex-basis: 66%
        flex-grow: 1
        flex-shrink: 1
        max-width: 150px
        display: flex
        flex-direction: column
        justify-content: space-between

        .title
          font-size: 16px

        .price
          width: 80px

      .btBox
        flex-grow: 1
        flex-shrink: 1
        flex-basis: 34%
        min-width: 74px
        text-align: right

        .minus
          background: #4df
          color: #fff
          border-radius: 100px
          width: 20px
          height: 20px
          display: inline-block
          text-align: center
          font-size: 20px
          line-height: 20px
          cursor: pointer

        .number
          color: #333
          border-radius: 100px
          width: 20px
          height: 20px
          display: inline-block
          text-align: center
          font-size: 20px
          line-height: 20px

        .add
          background: #4df
          color: #fff
          border-radius: 100px
          width: 20px
          height: 20px
          display: inline-block
          text-align: center
          font-size: 20px
          line-height: 20px
          cursor: pointer

</style>
