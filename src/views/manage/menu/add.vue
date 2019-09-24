<template>
  <div class="add">
    <!-- 三个图片。大图：用于菜品详情的banner。中图：用于菜品列表。小图：用于在购物车显示 -->
    <Form :model="menu" :label-width="80" :rules="ruleValidate" ref="form">
      <!-- <form-item prop="">
        <p>upload img</p>
      </form-item> -->
      <form-item label="名称" prop="name">
        <Input v-model="menu.name" placeholder="请输入"/>
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
        <radio-group v-model="menu.status">
          <Radio label="true">上架</Radio>
          <Radio label="false">下架</Radio>
        </radio-group>
      </form-item>
      <form-item>
        <Button type="primary">提交</Button>
        <Button type="default" @click="resetForm">重置</Button>
      </form-item>
    </Form>
  </div>
</template>

<script>
import { Form, FormItem, Input, Select, Option, Button, RadioGroup, Radio } from 'iview'
export default {
  // props: {},
  data () {
    return {
      menu: {
        name: '',
        taste: '',
        price: '',
        compose: '',
        status: ''
      },
      ruleValidate: {
        name: [
          {required: true, message: '请输入名称', trigger: 'change'}
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
</style>
