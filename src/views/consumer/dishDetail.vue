<template>
  <div class="dishDetail">
    <!-- 导航 -->
    <head-nav :name="dataUserInfo.name" :loginStatus="!!dataUserInfo.name"></head-nav>
    <!-- banner -->
    <div class="bannerBox" :style="compBannerImg">
    </div>
    <!-- description -->
    <section class="descriptionBox">
      <header class="title">
        <h1>简介</h1>
      </header>
      <article>
        <p v-html="banner.description"></p>
      </article>
    </section>
    <!-- compose -->
    <section class="composeBox">
      <header class="title">
        <h1>配料</h1>
      </header>
      <article>
        <p v-html="banner.compose"></p>
      </article>
    </section>
    <!-- comment list -->
    <section class="commentList">
      <header class="title">
        <h1>评论</h1>
      </header>
      <article>
        <div class="commentListBox">
          <header>
            <h2>好评</h2>
          </header>
          <comment-list :data="dataComment.good"></comment-list>
        </div>
        <div class="commentListBox">
          <header>
            <h2>中评</h2>
          </header>
          <comment-list :data="dataComment.middle"></comment-list>
        </div>
        <div class="commentListBox">
          <header>
            <h2>差评</h2>
          </header>
          <comment-list :data="dataComment.worse"></comment-list>
        </div>
      </article>
    </section>
    <!-- page -->
  </div>
</template>

<script>
// import comp from '@/components/common/comp.vue'
// import picMap from '@/assets/lib/picMap'
import api from '@/assets/lib/api'
import commentList from '@/components/common/commentList.vue'
import headNav from '@/components/headNav.vue'
export default {
  // props: {},
  // name: '',
  data () {
    return {
      dishId: this.$route.query.dishId || '',
      dataUserInfo: {
        name: '54545'
      },
      banner: {
        imgUrl: '',
        description: '',
        compose: ''
      },
      dataComment: {
        good: [
          {
            comment: '三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词',
            author: '枯干****',
            createdAt: '2019/09/08 12:34:56',
            updatedAt: '2019/09/08 12:34:56'
          },
          {
            comment: '三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词',
            author: '枯干****',
            createdAt: '2019/09/08 12:34:56',
            updatedAt: '2019/09/08 12:34:56'
          },
          {
            comment: '三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词',
            author: '枯干****',
            createdAt: '2019/09/08 12:34:56',
            updatedAt: '2019/09/08 12:34:56'
          }
        ],
        middle: [
          {
            comment: '三年学英语分册词三年级级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词',
            author: '枯干****',
            createdAt: '2019/09/08 12:34:56',
            updatedAt: '2019/09/08 12:34:56'
          },
          {
            comment: '三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词',
            author: '枯干****',
            createdAt: '2019/09/08 12:34:56',
            updatedAt: '2019/09/08 12:34:56'
          },
          {
            comment: '三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词',
            author: '枯干****',
            createdAt: '2019/09/08 12:34:56',
            updatedAt: '2019/09/08 12:34:56'
          }
        ],
        worse: [
          {
            comment: '三年级英语笑话:小学英语分册词三年级英语笑笑话:小学英语分册词三年级英语笑笑话:小学英语分册词三年级英语笑笑话:小学英语分册词三年级英语笑笑话:小学英语分册词三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词',
            author: '枯干****',
            createdAt: '2019/09/08 12:34:56',
            updatedAt: '2019/09/08 12:34:56'
          },
          {
            comment: '三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词',
            author: '枯干****',
            createdAt: '2019/09/08 12:34:56',
            updatedAt: '2019/09/08 12:34:56'
          },
          {
            comment: '三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词三年级英语笑话:小学英语分册词',
            author: '枯干****',
            createdAt: '2019/09/08 12:34:56',
            updatedAt: '2019/09/08 12:34:56'
          }
        ]
      }
    }
  },
  // watch: {},
  // filters: {},
  computed: {
    compBannerImg () {
      return {
        backgroundImage: `url(${this.banner.imgUrl})`
      }
    }
  },
  components: {
    headNav,
    commentList
  },
  methods: {
    init () {
      this.detailDish()
    },
    detailDish () {
      api.detailDish(this.dishId).then(res => {
        console.log(res)
        let {data} = res.data
        this.banner.imgUrl = `https://localhost:3443${data.imageBig.replace(/public(?=\/images\/)/, '')}`
        this.banner.description = data.description
        this.banner.compose = data.compose
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {},
  mounted () {
    this.init()
  }
}
</script>

<style scoped="" lang="stylus">
@import '~@/assets/stylus/basic.styl'
  .dishDetail

    .bannerBox
      background-position: center
      background-repeat: no-repeat
      background-size: cover
      height: 420px
      max-width: 1000px
      margin: 0 auto
      margin-top: 5px

    .descriptionBox
    .composeBox
    .commentList
    .page
      max-width: 1000px
      margin: 0 auto
      margin-top: 5px

      .title
        background: $bgColor

      article
        p
          font-size: 20px
          margin-top: 3px

    .commentList
      article
        display: flex
        justify-content: space-between
        padding-top: 8px

        .commentListBox
          margin-right: 10px
          flex-basis: 40%

          &:last-child
            margin-right: 0

          header
            padding: 0 8px

</style>
