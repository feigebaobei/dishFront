<template>
  <div class="index bgImg1">
    <div class="box">
      <div class="left" @click="goto('consumer')">
        <span>我要订餐</span>
      </div>
      <div class="right a b" @click="goto('manage')" ref="manage">
        <span>后台管理</span>
      </div>
    </div>
  </div>
</template>

<script>
// import comp from '@/components/common/comp.vue'
import api from '@/assets/lib/api'
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
    goto (path) {
      // 是否登录
      // 是 进入相应页面
      // 否 去登录页面
      if (!this.$refs.manage.classList.value.split(' ').includes('wait')) {
        this.$refs.manage.classList.add('wait')
        api.isLogin().then(res => {
          this.$refs.manage.classList.remove('wait')
          console.log(res)
          this.$router.push({
            path: '/' + path
          })
        }).catch(err => {
          this.$refs.manage.classList.remove('wait')
          console.log(err)
          this.$router.push({
            path: '/login',
            query: {
              url: this.opUrl(`/${path}`)
            }
          })
        })
      }
    },
    opUrl (str) {
      return encodeURIComponent(str)
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

  .index
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
        background-color: $bgColor
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
