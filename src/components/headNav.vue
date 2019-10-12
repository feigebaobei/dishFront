<template>
  <div class="headNav">
    <div class="hnLeft">
      <span v-html="getUserName"></span>
      <span v-if="!!getUserName && mPosition()">购物车</span>
      <span v-if="!!getUserName && mPosition()" @click="gotoHistoryOrder">历史订单</span>
      <span @click="gotoIndex">首页</span>
    </div>
    <div class="hnRight">
      <span v-html="compLogin" @click="trigger"></span>
    </div>
  </div>
</template>

<script>
// import comp from '@/components/common/comp.vue'
import { mapGetters, mapActions } from 'vuex'
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
    ...mapGetters(['getUserName']),
    compLogin () {
      // return this.loginStatus ? '登出' : '登录'
      return this.getUserName ? '登出' : '登录'
    }
  },
  components: {
    // comp
  },
  methods: {
    // init () {}
    ...mapActions(['updateToken', 'updateUser']),
    gotoHistoryOrder () {
      this.$router.push({
        path: '/consumer/orderList',
        query: {
        }
      })
    },
    gotoIndex () {
      this.$router.push({
        path: '/index'
      })
    },
    trigger () {
      // console.log(this.getUserName)
      // this.updateToken({token: ''})
      if (this.getUserName) { // 点击登出
        this.updateToken({token: ''})
        this.updateUser({username: ''})
        this.$router.push({
          path: '/index'
        })
      } else {
        this.$router.push({
          path: '/login'
        })
      }
    },
    mPosition () { //
      return /^\/consumer\/?/.test(this.$route.path)
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
        cursor: pointer
        user-select: none

    .hnRight
      flex-grow: 1
      flex-shrink: 1
      flex-basis: 20%
      text-align: right

      span
        cursor: pointer
        user-select: none

</style>
