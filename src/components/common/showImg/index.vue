<template>
  <!-- 得到图片数据时，请使用this.$refs.xxx.dataImg -->
  <div class="showImg">
    <div class="box" @click="trigger" v-show="!!!dataImg" :style="compStyle"></div>
    <img crossOrigin="Anonymous" :class="{preview: true, big: previewSize === 'big', middle: previewSize === 'middle', small: previewSize === 'small'}" :src="dataImg" alt="" v-show="!!dataImg" @click="trigger" ref="imgBox">
    <input type="file" class="none" ref="input" @change="changeFile">
    <!-- <canvas ref="can"></canvas> -->
  </div>
</template>

<script>
// import comp from '@/components/common/comp.vue'
export default {
  props: {
    value: {
      type: Object,
      default () {}
    },
    imgUrl: {
      type: String,
      default: ''
    },
    previewSize: {
      type: String,
      default: 'big',
      validator: (value) => {
        return ['big', 'middle', 'small'].some(item => {
          return item === value
        })
      }
    }
    // previewW: {
    //   type: String,
    //   default: '200px'
    // },
    // previewH: {
    //   type: String,
    //   default: '200px'
    // }
  },
  // name: '',
  data () {
    return {
      dataImg: this.imgUrl
    }
  },
  watch: {
    imgUrl (value) {
      this.dataImg = value
      if (this.dataImg) {
        let img = this.$refs.imgBox
        img.onload = () => {
          let canvas = document.createElement('canvas')
          canvas.width = img.naturalWidth
          canvas.height = img.naturalHeight
          let context = canvas.getContext('2d')
          context.drawImage(img, 0, 0, canvas.width, canvas.height)
          canvas.toBlob((blob) => {
            let file = new File([blob], String(Math.floor(Math.random() * 1000000)) + '.' + blob.type.split('/')[1], {type: blob.type, lastModified: new Date()})
            this.$emit('getImg', file)
          })
        }
      }
    }
  },
  // filters: {},
  computed: {
    compStyle () {
      let res = null
      switch (this.previewSize) {
        case 'big':
        default:
          res = {
            width: '200px',
            height: '200px'
          }
          break
        case 'middle':
          res = {
            width: '150px',
            height: '150px'
          }
          break
        case 'small':
          res = {
            width: '100px',
            height: '100px'
          }
          break
      }
      return res
    }
  },
  components: {
    // comp
  },
  methods: {
    // init () {}
    trigger () {
      let input = this.$refs.input
      input.click()
    },
    changeFile () {
      let input = this.$refs.input
      let file = input.files[0]
      // 同步父子组件间的数据
      this.$emit('getImg', file)
      // 异步显示图片
      let fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      // fileReader.readAsBinaryString(file)
      fileReader.onload = (e) => {
        // e: ProgressEvent 事件的处理程序
        // e.target 这里是FileReader对象
        let res = e.target.result
        this.dataImg = res
        // this.$emit('getImg', this.dataImg)
      }
    }
  },
  created () {},
  mounted () {
    // this.init()
  }
}
</script>

<style scoped="" lang="stylus">
@import '~@/assets/stylus/basic.styl'
  .showImg
    font-size: 0

    .box
      width: 200px
      height: 200px
      background: #999

    .preview
      // width: 200px
      // height: 200px
      border: 1px solid #ddd

    .big
      width: 200px
      height: 200px

    .middle
      width: 150px
      height: 150px

    .small
      width: 100px
      height: 100px

    .none
      display: none
</style>
