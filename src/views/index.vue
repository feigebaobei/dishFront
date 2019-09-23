<template>
  <div class="basic bgImg1">
    <div class="box">
      <div class="left">
        <span>我要订餐</span>
      </div>
      <div class="right">
        <span>后台管理</span>
      </div>
    </div>
  </div>
</template>

<script>
// import comp from '@/components/common/comp.vue'
export default {
  data () {
    return {
    }
  },
  // watch: {},
  // filters: {},
  // computed {},
  components: {
    // comp
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

  .basic
    color: red
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    display: flex
    align-items: center
    justify-content: center

    .box
      display: flex
      height: 200px
      width: 100%
      justify-content: center
      align-items: center

      .left,
      .right
        background-color: $background-color
        color: #fff
        border-radius: 8px
        margin: 0 8px
        height: inherit
        display: flex
        justify-content: center
        align-items: center
        flex-basis: 300px
        font-size: 36px
        cursor: pointer

</style>
