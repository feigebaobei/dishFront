<template>
  <div class="headNav">
    <div class="hnLeft">
      <span v-html="name"></span>
      <span>购物车</span>
      <span>历史订单</span>
    </div>
    <div class="hnRight">
      <span v-html="compLogin"></span>
    </div>
  </div>
</template>

<script>
// import comp from '@/components/common/comp.vue'
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    loginStatus: {
      type: Boolean,
      default: false
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
    compLogin () {
      return this.loginStatus ? '登出' : '登录'
    }
  },
  components: {
    // comp
  },
  methods: {
    // init () {}
  },
  created () {},
  mounted () {
    // this.init()
  }
}
</script>

<style scoped="" lang="stylus">
@import '~@/assets/stylus/basic.styl'
  .headNav
    background: $bgColor
    display: flex
    height: 40px
    align-items: center
    padding: 0 20%

    .hnLeft
      flex-grow: 1
      flex-shrink: 1
      flex-basis: 80%

      span
        margin-right: 15px

    .hnRight
      flex-grow: 1
      flex-shrink: 1
      flex-basis: 20%
      text-align: right

</style>
