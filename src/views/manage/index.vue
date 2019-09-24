<template>
  <div class="manage">
    <div class="menu">
      <!-- <router-link class="item" to="/welcome">欢迎</router-link> -->
      <!-- <router-link class="item" to="/manage/user">用户管理</router-link> -->
      <!-- <router-link class="item" to="/manage/menu">菜品管理</router-link> -->
      <!-- <linked-menu :menu="dataMenu"></linked-menu> -->
      <item v-for="(item, index) in dataMenu" :key="index" :imgUrl="item.imgUrl" :text="item.text" :route="item.route" :dirImg="item.dirImg" v-model="item.extend" :children="item.children"></item>
    </div>
    <div class="cont">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import linkedMenu from '@/components/common/linkedMenu/index'
import item from '@/components/common/linkedMenu/item'
export default {
  // props: {},
  data () {
    return {
      dataMenu: [
        {
          imgUrl: '',
          text: '用户管理',
          route: '/user', // 路由
          dirImg: '',
          extend: true,
          children: [
            {
              imgUrl: '',
              text: '用户管理-0',
              route: '/user/', // 路由
              dirImg: '',
              extend: false,
              children: []
            },
            {
              imgUrl: '',
              text: '用户管理-1',
              route: '/user/', // 路由
              dirImg: '',
              extend: false,
              children: []
            }
          ]
        },
        {
          imgUrl: '',
          text: '菜品管理',
          // route: '/manage/menu',
          route: '',
          dirImg: '',
          extend: true,
          children: [
            {
              imgUrl: '',
              text: '新建菜品',
              route: '/manage/menu/add',
              dirImg: '',
              extend: false,
              children: []
            },
            {
              imgUrl: '',
              text: '查询菜品',
              route: '/manage/menu/query',
              dirImg: '',
              extend: false,
              children: []
            },
            {
              imgUrl: '',
              text: '编辑菜品',
              route: '/manage/menu/edit',
              dirImg: '',
              extend: false,
              children: []
            }
          ]
        }
      ]
    }
  },
  // watch: {},
  // filters: {},
  // computed {},
  components: {
    linkedMenu,
    item
  },
  methods: {
    // init () {}
  },
  created () {},
  mounted () {
    // init()
  }
}
</script>

<style scoped="" lang="stylus">
@import '~@/assets/stylus/basic.styl'

.manage
  display: flex

  .menu
    flex-basis: 200px
    flex-grow: 0
    flex-shrink: 0
    display: flex
    flex-direction: column
    max-height: 100vh
    overflow: auto

    // .item
      // background: #ccddff
      // height: 48px
      // flex-shrink: 0
      // display: flex
      // align-items: center
      // padding: 0 10px

  .cont
    flex-grow: 1
    flex-shrink: 1

</style>
