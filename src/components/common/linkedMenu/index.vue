<template>
  <div class="linkedMenu">
    <item v-for="(item, index) in firstItem" :key="index" :imgUrl="item.imgUrl" :text="item.text" :dirImg="item.dirImg" v-model="item.extend"></item>
  </div>
</template>

<script>
import item from './item.vue'
export default {
  props: {
    menu: {
      type: Array,
      default () {
        return [
          // {
          //   imgUrl: '',
          //   text: '',
          //   dirImg: '',
          //   extend: false,
          //   children: [{}]
          // }
        ]
      }
    }
  },
  data () {
    return {
      // 第一级的item
      // firstItem: [
      //   // {}
      // ],
      firstItem: this.menu,
      // 第二级的item
      secondItem: [
        // {}
      ]
    }
  },
  // watch: {},
  // filters: {},
  // computed {},
  components: {
    item
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
  .linkedMenu
    // color: #333
</style>
