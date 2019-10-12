<template>
  <div class="comment">
    <!-- 导航 -->
    <!-- <head-nav :name="dataUserInfo.name" :loginStatus="!!dataUserInfo.name"></head-nav> -->
    <head-nav></head-nav>
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
    <!-- comment -->
    <section class="comment" v-if="dataComment.myComments.length">
      <header class="title">
        <h1>我的评论</h1>
      </header>
      <article class="myCommentBox">
        <comment-card class="myCommentItem" v-for="(item, index) in dataComment.myComments" :key="index" :videoRating="item.videoRating" :odourRating="item.odourRating" :tasteRating="item.tasteRating" :content="item.content" :author="item.author" :createdAt="item.createdAt" :updatedAt="item.updatedAt" :hasOperateBox="true" @edit="gotoEditComment(item)" @delete="gotoDeleteComment(item)"></comment-card>
      </article>
    </section>
    <!-- comment current -->
    <section class="commentCurrent">
      <header class="title">
        <h1>当前评论</h1>
      </header>
      <article>
        <div class="feelBox">
          <span>视觉</span>
          <grade-start v-model="dataComment.video" :clickable="true"></grade-start>
        </div>
        <div class="feelBox">
          <span>嗅觉</span>
          <grade-start v-model="dataComment.odour" :clickable="true"></grade-start>
        </div>
        <div class="feelBox">
          <span>味觉</span>
          <grade-start v-model="dataComment.taste" :clickable="true"></grade-start>
        </div>
        <Form :model="dataComment" :rules="ruleValidate" ref="form">
          <form-item prop="content" style="margin-bottom: 5px;">
            <Input v-model="dataComment.content" type="textarea" :autosize="{minRows: 4,maxRows: 6}" placeholder="请输入..." />
          </form-item>
          <form-item style="margin-bottom: 5px;">
            <Button type="primary" @click="submit">提交</Button>
            <Button type="default" @click="resetForm">重置</Button>
          </form-item>
        </Form>
      </article>
    </section>
    <!-- comment list -->
    <section class="commentList" v-if="dataComment.otherComments.length">
      <header class="title">
        <h1>他人评论</h1>
      </header>
      <article>
        <div class="commentListBox">
          <header>
            <h2>好评</h2>
          </header>
          <comment-card class="myCommentItem" v-for="(item, index) in compCommentsGood" :key="index" :videoRating="item.videoRating" :odourRating="item.odourRating" :tasteRating="item.tasteRating" :content="item.content" :author="item.author" :createdAt="item.createdAt" :updatedAt="item.updatedAt"></comment-card>
          <!-- <comment-list :data="dataComment.good"></comment-list> -->
        </div>
        <div class="commentListBox">
          <header>
            <h2>中评</h2>
          </header>
          <comment-card class="myCommentItem" v-for="(item, index) in compCommentsMiddle" :key="index" :videoRating="item.videoRating" :odourRating="item.odourRating" :tasteRating="item.tasteRating" :content="item.content" :author="item.author" :createdAt="item.createdAt" :updatedAt="item.updatedAt"></comment-card>
          <!-- <comment-list :data="dataComment.middle"></comment-list> -->
        </div>
        <div class="commentListBox">
          <header>
            <h2>差评</h2>
          </header>
          <comment-card class="myCommentItem" v-for="(item, index) in compCommentsWorse" :key="index" :videoRating="item.videoRating" :odourRating="item.odourRating" :tasteRating="item.tasteRating" :content="item.content" :author="item.author" :createdAt="item.createdAt" :updatedAt="item.updatedAt"></comment-card>
          <!-- <comment-list :data="dataComment.worse"></comment-list> -->
        </div>
      </article>
    </section>
    <!-- page -->
  </div>
</template>

<script>
// import comp from '@/components/common/comp.vue'
import api from '@/assets/lib/api'
import util from '@/assets/lib/util'
import commentList from '@/components/common/commentList/index.vue'
import commentCard from '@/components/common/commentList/commentCard.vue'
import gradeStart from '@/components/common/gradeStart/index.vue'
import headNav from '@/components/headNav.vue'
import {Form, FormItem, Input, Button} from 'iview'
export default {
  // props: {},
  // name: '',
  data () {
    return {
      dishId: this.$route.query.dishId || '',
      // dataUserInfo: {
      //   name: '54545'
      // },
      banner: {
        imgUrl: '',
        description: '',
        compose: ''
      },
      dataComment: {
        myComments: [],
        status: 'add',
        commentId: '',
        video: 0,
        odour: 0,
        taste: 0,
        content: '',
        otherComments: []
      },
      ruleValidate: {
        content: {required: true, message: '请输入评论', trigger: 'change'}
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
    },
    // 差评 |9| 中评 |12| 好评
    compCommentsGood () {
      return this.dataComment.otherComments.filter((item) => {
        return item.videoRating + item.odourRating + item.tasteRating > 12
      })
    },
    compCommentsMiddle () {
      return this.dataComment.otherComments.filter((item) => {
        return item.videoRating + item.odourRating + item.tasteRating > 9 && item.videoRating + item.odourRating + item.tasteRating <= 12
      })
    },
    compCommentsWorse () {
      return this.dataComment.otherComments.filter((item) => {
        return item.videoRating + item.odourRating + item.tasteRating <= 9
      })
    }
  },
  components: {
    headNav,
    commentList,
    commentCard,
    gradeStart,
    Form,
    FormItem,
    Input,
    Button
  },
  methods: {
    init () {
      this.detailDish()
      // this.getCommentAll()
      this.getCommentSelf()
      this.getCommentOther()
    },
    // 菜品详情
    detailDish () {
      api.detailDish(this.dishId).then(res => {
        let {data} = res.data
        this.banner.imgUrl = `https://localhost:3443${data.imageBig.replace(/public(?=\/images\/)/, '')}`
        this.banner.description = data.description
        this.banner.compose = data.compose
      }).catch(err => {
        console.log(err)
      })
    },
    // 得到当前用户的评论
    getCommentSelf () {
      // api.getCommentSelf(this.dishId, {
      api.getCommentByDishId(this.dishId, {
        user: 'current'
      }).then(res => {
        let data = res.data.data
        this.dataComment.myComments = util.propComposeArray(data, 'comments').reduce((r, c) => {
          c.author = c.author[0].username
          c.createdAt = util.utcToString(c.createdAt)
          c.updatedAt = util.utcToString(c.updatedAt)
          // c.createdAt = util.utcToString(c.createdAt)
          r.push(c)
          return r
        }, [])
      }).catch(err => {
        console.log(err)
      })
    },
    // 得到非当前用户的评论
    getCommentOther () {
      // api.getCommentOther(this.dishId, {
      api.getCommentByDishId(this.dishId, {
        user: 'other'
      }).then(res => {
        console.log(res)
        let data = res.data.data
        this.dataComment.otherComments = util.propComposeArray(data, 'comments').reduce((r, c) => {
          c.author = c.author[0].username
          c.createdAt = util.utcToString(c.createdAt)
          c.updatedAt = util.utcToString(c.updatedAt)
          r.push(c)
          return r
        }, [])
      }).catch(err => {
        console.log(err)
      })
    },
    // 得到所有评论
    // getCommentAll () {
    //   api.getCommentByDishId(this.dishId, {
    //   }).then(res => {
    //     console.log(res)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (!this.dataComment.video || !this.dataComment.odour || !this.dataComment.taste) {
            this.$message({
              type: 'error',
              message: '请评价商品的星级'
            })
            return
          }
          switch (this.dataComment.status) {
            case 'add':
            default:
              api.addComment(
                this.dishId,
                {
                  videoRating: this.dataComment.video,
                  odourRating: this.dataComment.odour,
                  tasteRating: this.dataComment.taste,
                  content: this.dataComment.content
                }
              ).then(res => {
                // 更新我的评论
                this.dataComment.myComments = []
                this.getCommentSelf()
                // 清空当前评论
                this.resetForm()
              }).catch(err => {
                console.log(err)
              })
              break
            case 'edit':
              api.editComment(this.dishId, this.dataComment.commentId, {
                videoRating: this.dataComment.video,
                odourRating: this.dataComment.odour,
                tasteRating: this.dataComment.taste,
                content: this.dataComment.content
              }).then(res => {
                console.log(res)
                // 更新我的评论
                this.dataComment.myComments = []
                this.getCommentSelf()
                // 清空当前评论
                this.resetForm()                
              }).catch(err => {
                console.log(err)
              })
              break
          }
        }
      })
    },
    resetForm () {
      this.dataComment.video = 0
      this.dataComment.odour = 0
      this.dataComment.taste = 0
      this.$refs.form.resetFields()
      this.dataComment.status = 'add'
    },
    gotoEditComment (data) {
      console.log(data)
      this.dataComment.status = 'edit'
      // this.dataComment.status = 'add'
      this.dataComment.video = data.videoRating
      this.dataComment.odour = data.odourRating
      this.dataComment.taste = data.tasteRating
      this.dataComment.content = data.content
      this.dataComment.commentId = data._id
    },
    gotoDeleteComment (data) {
      console.log(data)
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
  .comment
    // color: #333

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
    .comment
    .commentCurrent
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

        .feelBox
          display: flex
          align-items: center
          margin-bottom: 5px

          span
            font-size: 18px

    .comment
      .myCommentBox
        display: flex
        flex-wrap: wrap
        justify-content: space-between

        .myCommentItem
          flex-basis: 495px
          flex-grow: 0
          flex-shrink: 0

    .commentList
      article
        display: flex
        justify-content: space-between
        padding-top: 8px

        .commentListBox
          margin-right: 10px
          flex-basis: 40%
          max-height: 700px
          overflow: auto

          &:last-child
            margin-right: 0

          header
            padding: 0 8px

</style>
