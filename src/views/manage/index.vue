<template>
  <div class="manage">
    <div class="menu">
      <!-- <router-link class="item" to="/welcome">欢迎</router-link> -->
      <router-link class="item" to="/manage/user">用户管理</router-link>
      <router-link class="item" to="/manage/menu">菜品管理</router-link>
    </div>
    <div class="cont">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import comp from '@/components/common/comp.vue'
export default {
  // props: {},
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

.manage
  display: flex

  .menu
    flex-basis: 200px
    flex-grow: 0
    flex-shrink: 0
    display: flex
    flex-direction: column
    max-height: 100vh
    overflow: auto

    .item
      background: #ccddff
      height: 48px
      flex-shrink: 0
      display: flex
      align-items: center
      padding: 0 10px

  .cont
    flex-grow: 1
    flex-shrink: 1

</style>
