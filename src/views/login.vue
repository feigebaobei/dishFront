<template>
  <div class="login bgImg1">
    <Form class="form" :model="userInfo" :label-width="80" :rules="ruleValidate" ref="form">
      <form-item label="账号" prop="username">
        <Input v-model="userInfo.username" type="text" placeholder="请输入账号" @on-keyup.enter="submit"/>
      </form-item>
      <form-item label="密码" prop="password">
        <Input v-model="userInfo.password" type="password" placeholder="请输入密码"/>
      </form-item>
      <form-item>
        <Button type="primary" @click="submit">提交</Button>
        <Button type="default" @click="resetForm">重置</Button>
      </form-item>
    </Form>
  </div>
</template>

<script>
import { Form, FormItem, Input, Button } from 'iview'
import api from '@/assets/lib/api'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      url: this.$route.query.url,
      userInfo: {
        username: 'second',
        password: 'password'
      },
      ruleValidate: {
        username: [
          {required: true, message: '请输入正确的账号', trigger: 'change'}
        ],
        password: [
          {required: true, message: '请输入正确的密码', trigger: 'change'}
        ]
      }
    }
  },
  // watch: {},
  // filters: {},
  // computed {},
  components: {
    Form,
    FormItem,
    Input,
    Button
  },
  methods: {
    // init () {}
    ...mapActions(['updateToken', 'updateUser']),
    submit () {
      // api.login({
      //   username: this.userInfo.username,
      //   password: this.userInfo.password
      // })
      api.login(`username=${this.userInfo.username}&password=${this.userInfo.password}`)
        .then(res => {
          let token = res.data.data.token
          this.updateToken({token: token})
          this.updateUser(res.data.data.user)
          // console.log('token', this.$store.state.user.token)
          if (this.url) {
            let urlDecode = decodeURIComponent(this.url)
            if (/^http/.test(urlDecode)) {
              location.replace(urlDecode)
            } else {
              this.$router.replace({
                path: urlDecode
              })
            }
          } else {
            this.$router.go(-1)
          }
        }).catch(err => {
          console.log(err)
        })
    },
    test () {
      console.log('234')
    },
    resetForm () {
      this.$refs.form.resetFields()
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
  .login
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    display: flex
    align-items: center
    justify-content: center

    .form
      background-color: $bgColor
      color: #fff
      border-radius: 8px
      flex-basis: 300px
      padding: 18px
      padding-left: 0

</style>
