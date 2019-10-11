<template>
  <div class="test">
    <p>test</p>
    <article class="user">
      <p>token: {{getToken}}</p>
      <button @click="ut">设置token</button>
    </article>
    <article class="order">
      <p>shoppingCar: {{getShoppingCar}}</p>
      <button @click="us">设置shoppingCar</button>
    </article>
    <article class="dish">
      <p></p>
    </article>
  </div>
</template>

<script>
// import comp from '@/components/common/comp.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  // props: {},
  // name: '',
  data () {
    return {
      // dataAge: this.$store.state.user.age,
      // dataToken: this.$store.state.user.token
    }
  },
  // watch: {},
  // filters: {},
  computed: {
    ...mapGetters({
      // compGetAge: 'getAge',
      getToken: 'getToken',
      getShoppingCar: 'getShoppingCar'
    })
  },
  components: {
    // comp
  },
  methods: {
    // init () {}
    ...mapActions(['updateToken', 'allData', 'updateShoppingCar']),
    ut () {
      this.updateToken({token: new Date()})
    },
    us () {
      this.updateShoppingCar({shoppingCar: [{dish: 'new dish', amount: 3}]})
    }
  },
  created () {},
  mounted () {
    // console.log(sm)
    console.log(this)
    // console.log(this.updateToken('5466432sa'))
    // console.log(this.allData())
    // this.init()
  }
}
</script>

<style scoped="" lang="stylus">
@import '~@/assets/stylus/basic.styl'
  .test
    // color: #333

    .user
    .order
    .dish
      border: 1px solid #333
      margin-bottom: 5px

</style>
