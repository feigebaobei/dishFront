<template>
  <div class="commentCard">
    <Card class="item">
      <header class="gradeBox">
        <div class="gradeItem">
          <span class="text">视觉</span>
          <grade-start v-model="dataVideoRating"></grade-start>
        </div>
        <div class="gradeItem">
          <span class="text">嗅觉</span>
          <grade-start v-model="dataOdourRating"></grade-start>
        </div>
        <div class="gradeItem">
          <span class="text">味觉</span>
          <grade-start v-model="dataTasteRating"></grade-start>
        </div>
      </header>
      <article :class="{article: true, extend: dataExtend}" @click="trigger">
        <p v-html="content"></p>
      </article>
      <footer>
        <!-- <hr> -->
        <p>
          <span>作者：</span>
          <span v-html="author">作者：</span>
          <br>
          <span>下单时间：</span>
          <span v-html="createdAt"></span>
          <br>
          <span>评论时间：</span>
          <span v-html="updatedAt"></span>
        </p>
      </footer>
      <div class="opBox" v-if="hasOperateBox">
        <Button type="primary" @click="triggerEdit">编辑</Button>
        <Button type="primary" @click="triggerDelete">删除</Button>
      </div>
    </Card>
  </div>
</template>

<script>
// import comp from '@/components/common/comp.vue'
import { Card, Button } from 'iview'
import gradeStart from '@/components/common/gradeStart/index.vue'
export default {
  props: {
    videoRating: {
      type: Number,
      default: 0
    },
    odourRating: {
      type: Number,
      default: 0
    },
    tasteRating: {
      type: Number,
      default: 0
    },
    content: {
      type: String,
      default: ''
    },
    author: {
      type: String,
      default: ''
    },
    createdAt: {
      type: String,
      default: ''
    },
    updatedAt: {
      type: String,
      default: ''
    },
    hasOperateBox: {
      type: Boolean,
      default: false
    }
  },
  // name: '',
  data () {
    return {
      dataExtend: false,
      dataVideoRating: this.videoRating,
      dataOdourRating: this.odourRating,
      dataTasteRating: this.tasteRating
    }
  },
  // watch: {},
  // filters: {},
  // computed: {},
  components: {
    Card,
    gradeStart,
    Button
  },
  methods: {
    // init () {}
    trigger () {
      this.dataExtend = !this.dataExtend
    },
    triggerEdit () {
      if (this.hasOperateBox) {
        this.$emit('edit')
      }
    },
    triggerDelete () {
      if (this.hasOperateBox) {
        this.$emit('delete')
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
  .commentCard
    // color: #333

    .item
      margin-bottom: 5px

      .gradeBox

        .gradeItem
          display: flex
          align-items: center
          margin-bottom: 5px

      .article
        border: 1px solid #ccc
        border-radius: 5px
        height: 120px
        overflow: hidden
        padding: 5px
        margin-bottom: 5px

        p
          word-break: break-word

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
