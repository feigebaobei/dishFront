<template>
  <div class="commentList">
    <Card class="item" v-for="(item, index) in data" :key="index">
      <article :class="{extend: dataExtend}" @click="trigger">
        <p v-html="item.comment"></p>
      </article>
      <footer>
        <hr>
        <p>
          <span>作者：</span>
          <span v-html="item.author">作者：</span>
          <br>
          <span>下单时间：</span>
          <span v-html="item.createdAt"></span>
          <br>
          <span>评论时间：</span>
          <span v-html="item.updatedAt"></span>
        </p>
      </footer>
    </Card>
  </div>
</template>

<script>
// import comp from '@/components/common/comp.vue'
import { Card } from 'iview'
export default {
  props: {
    data: {
      type: Array,
      default () {
        return [
          // comment: {
          //   type: String,
          //   default: ''
          // },
          // author: {
          //   type: String,
          //   default: ''
          // },
          // createdAt: {
          //   type: String,
          //   default: ''
          // },
          // updatedAt: {
          //   type: String,
          //   default: ''
          // }
        ]
      }
    }
  },
  // name: '',
  data () {
    return {
      dataExtend: false
    }
  },
  // watch: {},
  // filters: {},
  // computed: {},
  components: {
    Card
  },
  methods: {
    // init () {}
    trigger () {
      console.log(234)
      this.dataExtend = !this.dataExtend
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
  .commentList
    // color: #333
    user-select: none

    .item
      margin-bottom: 5px

      article
        height: 120px
        overflow: hidden

      .extend
        min-height: 120px
        height: auto
        overflow: auto

      footer
        display: flex
        flex-wrap: wrap
        hr
          flex-basis: 100%
          margin: 5px 0

</style>
