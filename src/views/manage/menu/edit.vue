<template>
  <div class="edit">
    <Card>
      <!-- 三个图片。大图：用于菜品详情的banner。中图：用于菜品列表。小图：用于在购物车显示 -->
      <Form class="form" :model="dishOptions" :label-width="80" :rules="ruleValidate" ref="form" entype="multipart/form-data">
        <div class="imgBox">
          <show-img ref="imgVueBig" :previewSize="'big'" :imgUrl="dishOptions.imageBig" @getImg="getImgBig"></show-img>
          <p>一般用于大图。如：banner。</p>
        </div>
        <div class="imgBox">
          <show-img ref="imgVueMiddle" :previewSize="'middle'" :imgUrl="dishOptions.imageMiddle" @getImg="getImgMiddle"></show-img>
          <p>一般用于中图。如：列表图</p>
        </div>
        <div class="imgBox">
          <show-img ref="imgVueSmall" :previewSize="'small'" :imgUrl="dishOptions.imageSmall" @getImg="getImgSmall"></show-img>
          <p>一般用于小图。如：缩略图</p>
        </div>
        <form-item label="名称" prop="name">
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
        <form-item label="是否删除" prop="delete">
          <RadioGroup v-model="dishOptions.delete">
            <Radio label="0">否</Radio>
            <Radio label="1">是</Radio>
          </RadioGroup>
        </form-item>
        <form-item label="种类" prop="category">
          <Select v-model="dishOptions.category" placeholder="请选择">
            <Option v-for="(item, index) in dishOptions.categoryList" :key="index" :value="item.value">{{item.label}}</Option>
          </Select>
        </form-item>
        <form-item label="菜系" prop="series">
          <Select v-model="dishOptions.series" placeholder="请选择">
            <Option v-for="(item, index) in dishOptions.seriesList" :key="index" :value="item.value">{{item.label}}</Option>
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
import showImg from '@/components/common/showImg'
import config from '@/assets/lib/config'
export default {
  // props: {},
  data () {
    return {
      dishId: this.$route.query.id,
      dishOptions: {
        imageBig: '',
        imageMiddle: '',
        imageSmall: '',
        imageBigFile: '',
        imageMiddleFile: '',
        imageSmallFile: '',
        name: '',
        description: '',
        taste: 0,
        tasteList: config.tasteList,
        price: '',
        category: 0,
        categoryList: config.categoryList,
        compose: '',
        status: '',
        series: 0,
        seriesList: config.seriesList
      },
      ruleValidate: {
        name: [
          {required: true, message: '请输入菜名', trigger: 'change'}
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
    init () {
      this.getDishDetail()
    },
    getDishDetail () {
      api.detailDish(this.dishId).then(res => {
        // this.dishOptions.imgs = res.data.data.imgs
        this.dishOptions.imageBig = `https://localhost:3443${res.data.data.imageBig.replace(/public(?=\/images)/, '')}`
        this.dishOptions.imageMiddle = `https://localhost:3443${res.data.data.imageMiddle.replace(/public(?=\/images)/, '')}`
        this.dishOptions.imageSmall = `https://localhost:3443${res.data.data.imageSmall.replace(/public(?=\/images)/, '')}`
        this.dishOptions.name = res.data.data.name
        this.dishOptions.description = res.data.data.description
        this.dishOptions.price = String(Number(res.data.data.price) / 100)
        this.dishOptions.taste = res.data.data.taste
        // this.dishOptions.taste = String(res.data.data.taste)
        this.dishOptions.compose = res.data.data.compose
        this.dishOptions.status = res.data.data.status ? '1' : '0'
        this.dishOptions.delete = res.data.data.delete ? '1' : '0'
        this.dishOptions.category = res.data.data.category
        this.dishOptions.series = res.data.data.series
      }).catch(err => {
        console.log(err)
      })
    },
    submit () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          var fd = new FormData()
          fd.append('imageBig', this.dishOptions.imageBigFile)
          fd.append('imageMiddle', this.dishOptions.imageMiddleFile)
          fd.append('imageSmall', this.dishOptions.imageSmallFile)
          fd.append('name', this.dishOptions.name)
          fd.append('description', this.dishOptions.description)
          fd.append('price', this.dishOptions.price)
          fd.append('taste', this.dishOptions.taste)
          fd.append('compose', this.dishOptions.compose)
          fd.append('status', this.dishOptions.status)
          fd.append('category', this.dishOptions.category)
          fd.append('series', this.dishOptions.series)

          api.editDish(this.dishId, fd).then(res => {
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
    },
    getImgBig (img) {
      this.dishOptions.imageBigFile = img
    },
    getImgMiddle (img) {
      this.dishOptions.imageMiddleFile = img
    },
    getImgSmall (img) {
      this.dishOptions.imageSmallFile = img
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
    .form
      width: 600px

    .imgBox
      display: inline-block
      margin-right: 16px
      margin-bottom: 16px
</style>
