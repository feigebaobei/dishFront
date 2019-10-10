<template>
  <div class="commentList">
    <!-- <Card class="item" v-for="(item, index) in data" :key="index">
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
    </Card> -->
    <comment-card v-for="(item, index) in data" :key="index"></comment-card>
  </div>
</template>

<script>
// import comp from '@/components/common/comp.vue'
// import { Card } from 'iview'
import commentCard from './commentCard.vue'
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
    commentCard
  },
  methods: {
    // init () {}
    trigger () {
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

</style>
