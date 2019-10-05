<template>
  <div class="add">
    <Card>
      <!-- 三个图片。大图：用于菜品详情的banner。中图：用于菜品列表。小图：用于在购物车显示 -->
      <Form class="form" :model="menu" :label-width="80" :rules="ruleValidate" ref="form" entype="multipart/form-data">
        <div class="imgBox">
          <show-img ref="imgVueBig" :previewSize="'big'" @getImg="getImgBig"></show-img>
          <p>一般用于大图。如：banner。</p>
        </div>
        <div class="imgBox">
          <show-img ref="imgVueMiddle" :previewSize="'middle'" @getImg="getImgMiddle"></show-img>
          <p>一般用于中图。如：列表图</p>
        </div>
        <div class="imgBox">
          <show-img ref="imgVueSmall" :previewSize="'small'" @getImg="getImgSmall"></show-img>
          <p>一般用于小图。如：缩略图</p>
        </div>
        <form-item label="名称" prop="name">
          <Input v-model="menu.name" placeholder="请输入"/>
        </form-item>
        <form-item label="说明" prop="description">
          <Input v-model="menu.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."/>
        </form-item>
        <form-item label="口味" prop="taste">
          <Select v-model="menu.taste" placeholder="请选择">
            <Option v-for="(item, index) in menu.tasteList" :key="index" :value="item.value">{{item.label}}</Option>
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
        <form-item label="种类" prop="category">
          <Select v-model="menu.category" placeholder="请选择">
            <Option v-for="(item, index) in menu.categoryList" :key="index" :value="item.value">{{item.label}}</Option>
          </Select>
        </form-item>
        <form-item label="菜系" prop="series">
          <Select v-model="menu.series" placeholder="请选择">
            <Option v-for="(item, index) in menu.seriesList" :key="index" :value="item.value">{{item.label}}</Option>
          </Select>
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
import showImg from '@/components/common/showImg'
export default {
  // props: {},
  data () {
    return {
      menu: {
        // name: '',
        // imageBig: {},
        // imageMiddle: {},
        // imageSmall: {},
        // description: '',
        // taste: '',
        // tasteList: config.tasteList,
        // price: '',
        // category: '',
        // categoryList: config.categoryList,
        // compose: '',
        // status: '',
        // series: '',
        // seriesList: config.seriesList

        // name: '234',
        name: `${String(Math.floor(Math.random() * 100000))}`,
        imageBig: 'sdf',
        imageMiddle: 'fg',
        imageSmall: 'rhd',
        imageTest: 'imageTest',
        description: 'we',
        taste: 100,
        tasteList: config.tasteList,
        price: '12.36',
        category: 100,
        categoryList: config.categoryList,
        compose: 'dfse',
        status: '1',
        series: 100,
        seriesList: config.seriesList
      },
      ruleValidate: {
        name: [
          {required: true, message: '请输入名称', trigger: 'change'}
        ],
        description: [
          {required: true, message: '请输入说明', trigger: 'change'}
        ],
        taste: [
          {
            required: true,
            validator: (rule, value, cb) => {
              if (value) {
                cb()
              } else {
                cb(new Error('请选择口味'))
              }
            },
            trigger: 'change'
          }
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
    Radio,
    showImg
  },
  methods: {
    // init () {}
    submit () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          let fd = new FormData()
          fd.append('imageBig', this.menu.imageBig)
          fd.append('imageMiddle', this.menu.imageMiddle)
          fd.append('imageSmall', this.menu.imageSmall)
          fd.append('name', this.menu.name)
          fd.append('description', this.menu.description)
          fd.append('price', this.menu.price)
          fd.append('taste', this.menu.taste)
          fd.append('compose', this.menu.compose)
          fd.append('status', this.menu.status)
          fd.append('category', this.menu.category)
          fd.append('series', this.menu.series)
          api.addDish(
            fd,
            // Content-Type 不需要设置.会自动设置
            {
              // headers: {
              //   'Content-Type': 'multipart/form-data'
              // }
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
    },
    mImgUrl () {

    },
    getImgBig (img) {
      // this.menu.images[0] = img
      this.menu.imageBig = img
    },
    getImgMiddle (img) {
      // this.menu.images[1] = img
      this.menu.imageMiddle = img
    },
    getImgSmall (img) {
      // this.menu.images[2] = img
      this.menu.imageSmall = img
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

    .imgBox
      display: inline-block
      margin-right: 16px
      margin-bottom: 16px

</style>
