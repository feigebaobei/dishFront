<template>
  <div class="gradeStart">
    <span @click="triggerEmpty"></span>
    <img v-for="(index) in 5" :key="index" :src="compImgUrl(index)" alt="" @click="trigger(index) ">
  </div>
</template>

<script>
// import comp from '@/components/common/comp.vue'
import picMap from '@/assets/lib/picMap'
export default {
  props: {
    value: {
      type: Number,
      default: 0,
      validator: function (v) {
        return v <= 5
      }
    },
    clickable: {
      type: Boolean,
      default: false
    }
  },
  // name: '',
  data () {
    return {
      imgColorUrl: picMap.icon.start.x1,
      imgGreyUrl: picMap.icon.startGrey.x1
    }
  },
  // watch: {},
  // filters: {},
  computed: {
    compImgUrl (index) {
      return (index) => {
        return index <= this.value ? this.imgColorUrl : this.imgGreyUrl
      }
    }
  },
  components: {
    // comp
  },
  methods: {
    // init () {}
    triggerEmpty () {
      if (this.clickable) {
        this.$emit('input', 0)
      }
    },
    trigger (index) {
      if (this.clickable) {
        this.$emit('input', index)
      }
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
  .gradeStart
    display: flex

    span
      flex-basis: 5px
      flex-grow: 0
      flex-shrink: 0
      cursor: pointer

    img
      margin-right: 5px
      cursor: pointer

      &:last-child
        margin-right: 0

</style>
