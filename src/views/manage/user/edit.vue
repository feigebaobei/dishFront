<template>
  <div class="edit">
    <!-- <p>edit</p> -->
    <Card>
      <Form class="form" :model="dataUserInfo" :label-width="80" :rules="ruleValidate" ref="form">
        <form-item label="名称" prop="username">
          <Input v-model="dataUserInfo.username" placeholder="请输入"/>
        </form-item>
        <form-item label="firstname" prop="firstname">
          <Input v-model="dataUserInfo.firstname" placeholder="请输入" disabled/>
        </form-item>
        <form-item label="lastname" prop="lastname">
          <Input v-model="dataUserInfo.lastname" placeholder="请输入" disabled/>
        </form-item>
        <form-item label="管理员" prop="admin">
          <RadioGroup v-model="dataUserInfo.admin">
            <Radio label="1">是</Radio>
            <Radio label="0">否</Radio>
          </RadioGroup>
        </form-item>
        <form-item>
          <Button type="primary" @click="submit">提交</Button>
          <Button type="default" @click="reset">重置</Button>
        </form-item>
      </Form>
    </Card>
  </div>
</template>

<script>
// import comp from '@/components/common/comp.vue'
import { Card, Form, FormItem, Input, Button, RadioGroup, Radio } from 'iview'
import api from '@/assets/lib/api'
export default {
  // props: {},
  // name: '',
  data () {
    return {
      dataUserInfo: {
        userId: this.$route.query.userId,
        username: '',
        firstname: '',
        lastname: '',
        admin: ''
      },
      ruleValidate: {
        username: [
          {required: true, message: '请输入名称', trigger: 'change'}
        ],
        admin: [
          {required: true, message: '请输入名称', trigger: 'change'}
        ]
      }
    }
  },
  // watch: {},
  // filters: {},
  computed: {
    compUsername: {
      set (v) {
        this.dataUserInfo.username = v
        this.dataUserInfo.firstname = v.split(' ')[0] || ''
        this.dataUserInfo.lastname = v.split(' ')[1] || ''
      },
      get () {
        return this.dataUserInfo.username
      }
    },
    compAdmin: {
      set (v) {
        v ? this.dataUserInfo.admin = '1' : this.dataUserInfo.admin = '0'
      },
      get () {
        return this.dataUserInfo.admin
      }
    }
  },
  components: {
    Card,
    Form,
    FormItem,
    Input,
    Button,
    RadioGroup,
    Radio
  },
  methods: {
    init () {
      this.getUserInfo()
    },
    getUserInfo () {
      api.queryUser(this.dataUserInfo.userId).then(res => {
        // console.log(res)
        let data = res.data.data
        this.compUsername = data.username
        this.compAdmin = data.admin
      }).catch(err => {
        console.log(err)
      })
    },
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          let fd = new FormData()
          fd.append('username', this.dataUserInfo.username)
          fd.append('admin', this.dataUserInfo.admin === '1')
          api.editUser(this.dataUserInfo.userId, fd)
        }
      })
    },
    reset () {}
  },
  created () {},
  mounted () {
    this.init()
  }
}
</script>

<style scoped="" lang="stylus">
@import '~@/assets/stylus/basic.styl'
  .edit
    // color: #333
</style>
