<template>
  <div class="login bgImg1">
    <Form class="form" :model="userInfo" :label-width="80" :rules="ruleValidate" ref="form">
      <form-item label="账号" prop="username">
        <Input v-model="userInfo.username" type="text" placeholder="请输入账号"/>
      </form-item>
      <form-item label="密码" prop="password">
        <Input v-model="userInfo.password" type="password" placeholder="请输入密码"/>
      </form-item>
      <form-item>
        <Button type="primary" @click="submit">提交</Button>
        <Button type="primary" @click="root">root</Button>
        <Button type="primary" @click="sendCookie">send cookie</Button>
        <Button type="default" @click="resetForm">重置</Button>
      </form-item>
    </Form>
  </div>
</template>

<script>
import { Form, FormItem, Input, Button } from 'iview'
import api from '@/assets/lib/api'
// import axios from 'axios'
export default {
  data () {
    return {
      userInfo: {
        username: 'first',
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
    submit () {
      // 使用axios
      // axios({
      //   url: 'https://localhost:3443/users/login',
      //   method: 'post',
      //   withCredentials: true,
      //   data: {
      //     username: this.userInfo.username,
      //     password: this.userInfo.password
      //   }
      // }).then(res => {
      //   console.log(res)
      // }).catch(err => {
      //   console.log(err)
      // })
      // return
      // 使用axios
      api.login({
        username: this.userInfo.username,
        password: this.userInfo.password
      }).then(res => {
        console.log(res)
        this.$router.push({
          path: '/manage'
        })
      }).catch(err => {
        console.log(err)
      })
    },
    root () {
      api.root().then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    sendCookie () {
      api.cookie().then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
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
