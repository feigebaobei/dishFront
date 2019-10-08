<template>
  <div class="payResult">{{dataResult}}</div>
</template>

<script>
// import comp from '@/components/common/comp.vue'
export default {
  // props: {},
  // name: '',
  data () {
    return {
      dataResult: this.$route.query.result
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
    // this.init()
  }
}
</script>

<style scoped="" lang="stylus">
@import '~@/assets/stylus/basic.styl'
  .payResult
    // color: #333
</style>
