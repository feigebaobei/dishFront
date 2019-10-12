<template>
  <div class="menuBox">
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
  .menuBox
    // color: #333
</style>
