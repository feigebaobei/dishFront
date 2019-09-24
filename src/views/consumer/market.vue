<template>
  <div class="market">
    <!-- 筛选条件 -->
      <!-- 味道,地域等 -->
    <!-- 菜品列表 -->
    <menu-item :name="'sfda'" :price="'234'" :tip="'tip'"></menu-item>
    <menu-item :name="'sfda'" :price="'234'" :tip="'tip'"></menu-item>
    <!-- 已选列表 -->
  </div>
</template>

<script>
import menuItem from '@/components/common/menuItem.vue'
export default {
  data () {
    return {
    }
  },
  // watch: {},
  // filters: {},
  // computed {},
  components: {
    menuItem
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
  .market
    color: #333
</style>
