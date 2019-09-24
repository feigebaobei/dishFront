<template>
  <div class="item" @click.stop="tirgger">
    <div class="left">
      <img :src="imgUrl" alt="">
      <span v-html="text"></span>
    </div>
    <img :class="{direction: true, tf: value}" :src="dirImg" alt="" v-if="children.length">
    <items class="items" v-if="value && children.length" v-for="(item, index) in children" :key="index" :imgUrl="item.imgUrl" :text="item.text" :route="item.route" v-model="item.value"></items>
  </div>
</template>

<script>
import picMap from '@/assets/lib/picMap'
export default {
  props: {
    imgUrl: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    route: {
      type: String,
      default: '',
      required: true
    },
    value: {
      type: Boolean,
      default: false
    },
    children: {
      type: Array,
      default () {
        return []
      }
    }
  },
  name: 'items',
  data () {
    return {
      dirImg: picMap.icon.direction.x1
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
    tirgger () {
      this.$emit('input', !this.value)
      this.$router.push({
        path: this.route
      })
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
  .item
    display: flex
    justify-content: space-between
    align-items: center
    flex-wrap: wrap
    background: #cdf
    padding: 10px 0
    cursor: pointer
    user-select: none

    .left
      flex-grow: 1
      flex-shrink: 1

      img
        width: 28px
        margin-right: 8px

      span
        color: #333
        font-size: 24px

    .direction
      flex-grow: 0
      flex-shrink: 0
      width: 28px

    .items
      flex-basis: 100%;

    .tf
      transform: rotate(90deg)

</style>
