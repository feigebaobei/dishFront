<template>
  <div class="basicBox">
    <p v-html="text"></p>
  </div>
</template>

<script>
// import comp from '@/components/common/comp.vue'
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  name: 'Test',
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
    // this.init()
  }
}
</script>

<style scoped="" lang="stylus">
@import '~@/assets/stylus/basic.styl'
  .basicBox
    color: red
</style>
