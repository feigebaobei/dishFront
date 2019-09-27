<template>
  <div class="add">
    <Card>
      <!-- 三个图片。大图：用于菜品详情的banner。中图：用于菜品列表。小图：用于在购物车显示 -->
      <Form class="form" :model="menu" :label-width="80" :rules="ruleValidate" ref="form">
        <!-- <form-item prop="">
          <p>upload img</p>
        </form-item> -->
        <form-item label="名称" prop="name">
          <Input v-model="menu.name" placeholder="请输入"/>
        </form-item>
        <form-item label="说明" prop="description">
          <Input v-model="menu.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."/>
        </form-item>
        <form-item label="口味" prop="taste">
          <Select v-model="menu.taste" placeholder="请选择">
            <Option value="0.1">轻度酸</Option>
            <Option value="0.2">中度酸</Option>
            <Option value="0.3">重度酸</Option>
            <Option value="1.1">轻度甜</Option>
            <Option value="1.2">中度甜</Option>
            <Option value="1.3">重度甜</Option>
            <Option value="2.1">轻度苦</Option>
            <Option value="2.2">中度苦</Option>
            <Option value="2.3">重度苦</Option>
            <Option value="3.1">轻度辣</Option>
            <Option value="3.2">中度辣</Option>
            <Option value="3.3">重度辣</Option>
            <Option value="4.1">轻度咸</Option>
            <Option value="4.2">中度咸</Option>
            <Option value="4.3">重度咸</Option>
          </Select>
        </form-item>
        <form-item label="价格" prop="price">
          <Input v-model="menu.price" placeholder="请输入"/>
        </form-item>
        <form-item label="配料" prop="compose">
          <Input v-model="menu.compose" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."/>
        </form-item>
        <form-item label="状态" prop="status">
          <RadioGroup v-model="menu.status">
            <Radio label="1">上架</Radio>
            <Radio label="0">下架</Radio>
          </RadioGroup>
        </form-item>
        <form-item>
          <Button type="primary" @click="submit">提交</Button>
          <Button type="default" @click="resetForm">重置</Button>
        </form-item>
      </Form>
    </Card>
  </div>
</template>

<script>
import { Card, Form, FormItem, Input, Select, Option, Button, RadioGroup, Radio, Message } from 'iview'
import api from '@/assets/lib/api'
export default {
  // props: {},
  data () {
    return {
      menu: {
        name: '',
        description: '',
        taste: '',
        price: '',
        compose: '',
        status: ''
      },
      ruleValidate: {
        name: [
          {required: true, message: '请输入名称', trigger: 'change'}
        ],
        description: [
          {required: true, message: '请输入说明', trigger: 'change'}
        ],
        taste: [
          {required: true, message: '请选择状态', trigger: 'change'}
        ],
        price: [
          {required: true, message: '请输入价格', trigger: 'change'}
        ],
        compose: [
          {required: true, message: '请输入配料', trigger: 'change'}
        ],
        status: [
          {required: true, message: '请选择状态', trigger: 'change'}
        ]
      }
    }
  },
  // watch: {},
  // filters: {},
  // computed {},
  components: {
    Card,
    Form,
    FormItem,
    Input,
    Select,
    Option,
    Button,
    RadioGroup,
    Radio
  },
  methods: {
    // init () {}
    submit () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          api.addDish({
            name: this.menu.name,
            description: this.menu.description,
            price: this.menu.price
          }).then(res => {
            console.log(res)
            Message.success('Success!')
          }).catch(err => {
            console.log(err)
            Message.error('fail!')
          })
        } else {
          Message.error('fail!')
        }
      })
    },
    resetForm () {
      this.$refs['form'].resetFields()
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
  .add
    // color: #333
    .form
      width: 600px
</style>
