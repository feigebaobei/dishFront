<template>
  <div class="orderItem">
    <Card class="card">
      <header>
        <p>
          <span>下单时间：</span>
          <span v-html="data.createdAt"></span>
        </p>
      </header>
      <article>
        <menu-item-middle class="item" v-for="(item, index) in data.dishes" :key="index" :imgUrl="`https://localhost:3443${item.dish.imageMiddle.replace(/public(?=\/images\/)/, '')}`" :name="item.dish.name" :price="item.dish.price" :amount="item.amount" :id="item.dish._id" @gotoComment="gotoComment"></menu-item-middle>
      </article>
      <footer>
        <p>
          <span>共计：</span>
          <span v-html="'￥' + (Number(data.totalPrice) / 100).toFixed(2)"></span>
        </p>
      </footer>
    </Card>
  </div>
</template>

<script>
// import comp from '@/components/common/comp.vue'
import { Card } from 'iview'
import menuItemMiddle from '@/components/common/menuItemMiddle.vue'
export default {
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  // name: '',
  data () {
    return {
    }
  },
  // watch: {},
  // filters: {},
  // computed: {},
  components: {
    Card,
    menuItemMiddle
  },
  methods: {
    // init () {}
    gotoComment (id) {
      this.$emit('gotoComment', id)
      // this.$router.push({})
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
  .orderItem
    // color: #333

    article
      max-height: 318px
      overflow: auto

      .item
        margin-bottom: 5px

        &:last-child
          margin-bottom: 0

</style>
