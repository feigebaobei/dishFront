<template>
  <div class="edit">
    <Card>
      <Form :model="dishOptions" :label-width="80" :rules="ruleValidate" ref="form">
        <form-item label="菜品" prop="name">
          <Input v-model="dishOptions.name" placeholder="请输入"/>
        </form-item>
        <form-item label="说明" prop="description">
          <Input v-model="dishOptions.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."/>
        </form-item>
        <form-item label="口味" prop="taste">
          <Select v-model="dishOptions.taste" placeholder="请选择">
            <Option v-for="(item, index) in dishOptions.tasteList" :key="index" :value="item.value">{{item.label}}</Option>
          </Select>
        </form-item>
        <form-item label="价格" prop="price">
          <Input v-model="dishOptions.price" placeholder="请输入"/>
        </form-item>
        <form-item label="配料" prop="compose">
          <Input v-model="dishOptions.compose" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."/>
        </form-item>
        <form-item label="状态" prop="status">
          <RadioGroup v-model="dishOptions.status">
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
import config from '@/assets/lib/config'
export default {
  // props: {},
  data () {
    return {
      dishId: this.$route.query.id,
      dishOptions: {
        imgs: [],
        name: '',
        description: '',
        taste: '',
        tasteList: config.tasteList,
        price: '',
        compose: '',
        status: ''
      },
      ruleValidate: {
        name: [
          {required: true, message: '请输入菜名', trigger: 'change'}
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
    init () {
      this.getDishDetail()
    },
    getDishDetail () {
      api.detailDish(this.dishId).then(res => {
        this.dishOptions.imgs = res.data.data.imgs
        this.dishOptions.name = res.data.data.name
        this.dishOptions.description = res.data.data.description
        this.dishOptions.taste = res.data.data.taste
        this.dishOptions.price = String(Number(res.data.data.price) / 100)
        this.dishOptions.compose = res.data.data.compose
        this.dishOptions.status = res.data.data.status
      }).catch(err => {
        console.log(err)
      })
    },
    submit () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          api.editDish(this.dishId, {
            name: this.dishOptions.name,
            description: this.dishOptions.description,
            price: this.dishOptions.price
          }).then(res => {
            console.log(res)
            Message.success('Success!')
            this.init()
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
    this.init()
  }
}
</script>

<style scoped="" lang="stylus">
@import '~@/assets/stylus/basic.styl'
  .edit
    // color: #333
</style>
