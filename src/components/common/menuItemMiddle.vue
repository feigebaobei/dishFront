<template>
  <div class="menuItemMiddle">
    <img :src="imgUrl" alt="">
    <div class="second">
      <h3 v-html="name"></h3>
      <p v-html="compPrice"></p>
    </div>
    <div class="third">
      <span v-html="compAmount"></span>
    </div>
    <div class="third">
      <Button type="default" @click="trigger">评论</Button>
    </div>
  </div>
</template>

<script>
// import comp from '@/components/common/comp.vue'
import { Button } from 'iview'
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
    price: {
      type: [String, Number],
      default: 0
    },
    amount: {
      type: [String, Number],
      default: 0
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
      return '￥' + (Number(this.price) / 100).toFixed(2)
    },
    compAmount () {
      return `x ${this.amount}`
    }
  },
  components: {
    Button
  },
  methods: {
    // init () {}
    trigger () {
      this.$emit('gotoComment', this.id)
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
  .menuItemMiddle
    display: flex
    flex-wrap: nowrap

    img
      height: 100px
      width: 132px
      flex-basic: 100px
      flex-grow: 0
      flex-shrink: 0
      margin-right: 10px

    .second
      flex-basis: 70%
      margin-right: 10px

      h3
        font-size: 26px

      p
        font-size: 20px

    .third
      flex-basis: 30%
      font-size: 22px
      margin-right: 10px

</style>
