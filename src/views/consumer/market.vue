<template>
  <div class="market">
    <!-- 导航 -->
    <head-nav :name="dataUserInfo.name" :loginStatus="!!dataUserInfo.name"></head-nav>
    <div class="cont">
      <!-- 筛选条件 -->
        <!-- 味道,地域等 -->
      <Form :class="{form: true, shrink: dataSelOpt.shrink}" :model="dataSelOpt" :label-width="80" :rules="ruleValidate" ref="form">
        <!-- 名称 味道 价格 菜系 -->
        <form-item class="none" label="名称" prop="name">
          <Input v-model="dataSelOpt.name"/>
        </form-item>
        <form-item label="味道" prop="taste">
          <Select v-model="dataSelOpt.taste" placeholder="请选择" multiple>
            <Option v-for="(item, index) in dataSelOpt.tasteList" :key="index" :value="item.value">{{item.label}}</Option>
          </Select>
        </form-item>
        <form-item class="none" label="价格" prop="priceMin" style="width: 45%; display: inline-block;">
          <Input v-model="dataSelOpt.priceMin" placeholder="请输入最小价格"/>
        </form-item>
        <form-item class="none" prop="priceMax" style="width: 45%; display: inline-block;">
          <Input v-model="dataSelOpt.priceMax" placeholder="请输入最大价格"/>
        </form-item>
        <form-item class="none" label="菜系" prop="series">
          <Select v-model="dataSelOpt.series" placeholder="请选择" multiple>
            <Option v-for="(item, index) in dataSelOpt.seriesList" :key="index" :value="item.value">{{item.label}}</Option>
          </Select>
        </form-item>
        <form-item class="none" label="种类" prop="category">
          <Select v-model="dataSelOpt.category" placeholder="请选择" multiple>
            <Option v-for="(item, index) in dataSelOpt.categoryList" :key="index" :value="item.value">{{item.label}}</Option>
          </Select>
        </form-item>
        <form-item>
          <Button type="primary" @click="submit">查询</Button>
          <Button type="default" @click="reset">重置</Button>
        </form-item>
        <div :class="{handle: true, over: dataSelOpt.handleOver}" @click="handleFormShrink" @mouseover="handleOpacity('dataSelOpt')" @mouseout="handleOpacity('dataSelOpt')">
          <span :style="compDirDb"></span>
        </div>
      </Form>
      <!-- 菜品列表 -->
      <menu-item v-for="(item, index) in dataDish" :key="index" :id="item.id" :name="item.name" :imgUrl="item.imgUrl" :price="`${opPrice(item.price)}`" :number="item.number" :tip="item.compose" @triggerAll="gotoDetail(item.id)" @minus="minus(item.id)" @add="add"></menu-item>
    </div>
    <!-- 已选列表 -->
    <infinite-loading @infinite="getDish" ref="infiniteLoading">
      <div style="height: 36px; color: #999" slot="spinner">---正在加载---</div>
      <div style="height: 36px; color: #999" slot="no-more">---我也是有底线的---</div>
      <div style="height: 36px; color: #999" slot="no-results">---没有数据---</div>
    </infinite-loading>
    <!-- 购物车 -->
    <div class="shoppingCarBox">
      <div :class="{min: true, over: dataSCBox.over}" v-if="!dataSCBox.extend" @click="openSC" @mouseover="handleOpacity('dataSCBox')" @mouseout="handleOpacity('dataSCBox')">
        <img :src="dataSCBox.scImgUrl" alt="">
      </div>
      <section class="max" v-else>
        <header>
          <h3 class="title">已选商品</h3>
          <img :src="dataSCBox.scCloseImgUrl" alt="" class="close" @click="closeSC">
        </header>
        <article>
          <menu-item-small v-for="(item, index) in compSelDataDish" :key="index" :id="item.id" :imgUrl="item.imgUrl" :name="item.name" :price="`${opPrice(item.price)}`" :number="item.number" @add="addSC" @minus="minusSC"></menu-item-small>
        </article>
        <footer>
          <p>
            <span>共计：</span>
            <span v-html="`￥${compAmount}`"></span>
          </p>
          <Button type="default" class="clear" @click="clearSC">清空</Button>
          <Button type="primary" @click="submitOrder">去支付</Button>
        </footer>
      </section>
    </div>
  </div>
</template>

<script>
import {Form, FormItem, Input, Select, Option, Button} from 'iview'
import menuItem from '@/components/common/menuItem.vue'
import menuItemSmall from '@/components/common/menuItemSmall.vue'
import headNav from '@/components/headNav.vue'
import infiniteLoading from 'vue-infinite-loading'
import api from '@/assets/lib/api'
import config from '@/assets/lib/config'
import picMap from '@/assets/lib/picMap'
export default {
  data () {
    return {
      dataSelOpt: {
        name: '',
        taste: '',
        tasteList: config.tasteList,
        priceMin: '',
        priceMax: '',
        series: '',
        seriesList: config.seriesList,
        category: '',
        categoryList: config.categoryList,
        pageNumber: 0,
        pageSize: 10,
        shrink: true,
        directionDouble: picMap.icon.directionDouble.x1,
        handleOver: false
      },
      ruleValidate: {
        name: [],
        taste: [],
        priceMin: [],
        priceMax: [],
        series: [],
        category: []
      },
      dataUserInfo: {
        name: '54545'
      },
      dataDish: [
        // {
        //   id: '',
        //   name: '',
        // imgUrl: '',
        //   price: '',
        //   compose: ''
        // }
      ],
      // dataShoppingCar: [
      //   {
      //     id: '5d98342a5564b61a284a1b97',
      //     number: 3
      //   }
      // ],
      dataSCBox: {
        scImgUrl: picMap.icon.shoppingCar.x1,
        scCloseImgUrl: picMap.icon.close.x1,
        over: false,
        extend: true
      }
    }
  },
  // watch: {},
  // filters: {
  // },
  computed: {
    compDirDb () {
      let o = {
        backgroundImage: `url(${picMap.icon.directionDouble.x1})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center'
      }
      if (this.dataSelOpt.shrink) {
        o.transform = 'rotate(90deg)'
      } else {
        o.transform = 'rotate(-90deg)'
      }
      return o
    },
    compSelDataDish () {
      return this.dataDish.filter(item => item.number > 0)
    },
    compAmount () {
      let n =this.compSelDataDish.reduce((r, c) => r += c.price * c.number, 0)
      return (n / 100).toFixed(2)
    }
  },
  components: {
    menuItem,
    menuItemSmall,
    headNav,
    infiniteLoading,
    Form,
    FormItem,
    Input,
    Select,
    Option,
    Button
  },
  methods: {
    // init () {
    //   // this.getDish()
    // },
    getDish ($state) {
      let data = {
        delete: 'false',
        page: this.dataSelOpt.pageNumber,
        size: this.dataSelOpt.pageSize
      }
      if (this.dataSelOpt.name) {
        data.name = this.dataSelOpt.name
      }
      if (this.dataSelOpt.taste) {
        data.taste = this.dataSelOpt.taste
      }
      api.queryDish(data).then((res) => {
        // console.log(res)
        let {amount, dishes} = res.data.data
        if (dishes.length) {
          if ((this.dataSelOpt.pageNumber) * this.dataSelOpt.pageSize <= amount) {
            this.dataDish = this.dataDish.concat(dishes.reduce((r, c) => {
              let o = {
                id: c._id,
                name: c.name,
                imgUrl: `https://localhost:3443${c.imageMiddle.replace(/public(?=\/images)/, '')}`,
                // price: `${this.opPrice(c.price)}`,
                price: c.price,
                compose: c.compose,
                // selected: false, // 是否选购
                number: 0 // 购买数量
              }
              r.push(o)
              return r
            }, []))
            this.dataSelOpt.pageNumber++
            $state.loaded()
          } else {
            $state.complete()
          }
        } else {
          $state.complete()
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    opPrice (price) {
      let i = Math.trunc(price / 100)
      let f = price - i * 100
      f = f < 10 ? `0${f}` : f
      return `${i}.${f}`
    },
    submit () {
      this.dataDish = []
      this.dataSelOpt.pageNumber = 0
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
    },
    reset () {
      this.$refs.form.resetFields()
    },
    handleFormShrink () {
      this.dataSelOpt.shrink = !this.dataSelOpt.shrink
    },
    handleOpacity (target) {
      // this[target]
      switch (target) {
        case 'dataSelOpt':
          this.dataSelOpt.handleOver = !this.dataSelOpt.handleOver
          break
        case 'dataSCBox':
          this.dataSCBox.over = !this.dataSCBox.over
          break
        default:
          break
      }
    },
    gotoDetail (id) {
      console.log(id)
      this.$router.push({
        path: '/consumer/dishDetail',
        params: {
          id: id
        }
      })
    },
    add (id) {
      let dish = this.dataDish.find(item => item.id === id)
      if (dish) {
        ++dish.number
      } else {
        this.$message({
          type: 'error',
          message: '没找到相应商品'
        })
      }
      // 应当使用同一份数据在多个地方渲染。这样才能保证在多个地方显示相同
      // if (dish) {
      //   let dishInCar = this.dataShoppingCar.find(item => item.id === id)
      //   if (dishInCar) {
      //     dishInCar.number++
      //   } else {
      //     this.dataShoppingCar.push(Object.assign({}, dish, {number: 1}))
      //   }
      // } else {
      //   this.$message({
      //     type: 'error',
      //     message: '没找到相应商品'
      //   })
      // }
    },
    minus (id) {
      let dish = this.dataDish.find(item => item.id === id)
      if (dish) {
        if (dish.number > 0) {
          --dish.number
        }
      } else {
        this.$message({
          type: 'error',
          message: '没找到相应商品'
        })
      }
    },
    // 打开购物车
    openSC () {
      this.dataSCBox.extend = true
      this.dataSCBox.over = false
    },
    // 打开购物车
    closeSC () {
      this.dataSCBox.extend = false
    },
    addSC (id) {
      console.log(id)
      this.add(id)
    },
    minusSC (id) {
      console.log('minusSC')
      this.minus(id)
    },
    clearSC () {
      this.compSelDataDish.map(item => {
        item.number = 0
      })
    },
    submitOrder () {
      let order = this.compSelDataDish.reduce((r, c) => {
        let o = {
          id: c.id,
          amount: c.number
        }
        r.push(o)
        return r
      }, [])
      api.payOrder({
        order: order
      }).then(res => {
        this.gotoPay(true)
      }).catch(err => {
        this.gotoPay(false)
      })
    },
    gotoPay (bool) {
      this.$router.push({
        path: '/consumer/payResult',
        query: {
          result: bool
        }
      })
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
  .market
    color: #333

    .cont
      max-width: 1000px
      margin: 0 auto

      .form
        margin-top: 20px
        background: #fff
        // overflow: hidden
        // position: relative

        .handle
          // position: absolute
          bottom: 0
          width: 100%
          display: flex
          align-items: center
          justify-content: center
          opacity: 0.5
          margin-top: -24px;

          span
            width: 20px
            height: 20px

        .over
          opacity: 1

      .shrink
        // height: 114px;

        .none
          display: none

    .shoppingCarBox
      position: fixed
      right: 30px
      bottom: 70px

      .min
        background: #f91
        font-size: 0
        border-radius: 100px
        opacity: 0.7

      .over
        opacity: 1

      .max
        background: #fff
        border-top-left-radius: 4px
        border-bottom-right-radius: 4px
        border-top-right-radius: 12px;
        border-bottom-left-radius: 12px;
        border: 2px solid #f91
        width: 300px
        height: 500px
        display: flex
        flex-direction: column

        header
          flex-grow: 0
          flex-shrink: 0
          display: flex
          align-items: center
          padding: 8px

          .title
            flex-grow: 1
            flex-shrink: 1
            flex-basis: 80%
            font-size: 20px

          .close
            flex-grow: 0
            flex-shrink: 0
            text-align: right
            width: 24px

        article
          flex-grow: 1
          flex-shrink: 1
          padding: 0 5px
          margin-bottom: 8px
          overflow-y: scroll

        footer
          flex-grow: 0
          flex-shrink: 0
          padding: 0 10px
          margin-bottom: 8px

          p
            margin: 8px
            font-size: 16px

          .clear
            margin-right: 5px

</style>
