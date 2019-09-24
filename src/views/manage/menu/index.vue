<template>
  <div class="menu">
    <router-view></router-view>
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
  .menu
    // color: #333
</style>
