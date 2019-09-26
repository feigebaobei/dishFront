<template>
  <div class="manage">
    <Sider class="menu">
      <Menu active-name="0-0" theme="dark" width="auto" :open-names="openNames" @on-select="slMenu">
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>用户管理
          </template>
          <menu-item name="manage/user/create">新建用户</menu-item>
          <menu-item name="manage/user/query">查询用户</menu-item>
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-keypad"></Icon>菜品管理
          </template>
          <menu-item name="/manage/menu/add">新建菜品</menu-item>
          <menu-item name="/manage/menu/query" @on-select="gotoPage('/menu/query')">查询菜品</menu-item>
        </Submenu>
      </Menu>
    </Sider>
    <Layout class="contBox">
      <!-- <Header></Header> -->
      <Content class="cont">
        <!-- <Breadcrumb class="breadCrumb">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Components</BreadcrumbItem>
          <BreadcrumbItem>Layout</BreadcrumbItem>
        </Breadcrumb> -->
        <router-view></router-view>
      </Content>
    </Layout>
  </div>
</template>

<script>
import linkedMenu from '@/components/common/linkedMenu/index'
import item from '@/components/common/linkedMenu/item'
import api from '@/assets/lib/api'
import { Layout, Sider, Menu, Submenu, Icon, MenuItem, Content, Breadcrumb, BreadcrumbItem } from 'iview'
export default {
  // props: {},
  data () {
    return {
      isCollapsed: false,
      openNames: [], // ['1']
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
    item,
    Layout,
    Sider,
    Menu,
    Submenu,
    Icon,
    MenuItem,
    Content,
    Breadcrumb,
    BreadcrumbItem
  },
  methods: {
    // init () {}
    gotoPage (path) {
      console.log(path)
    },
    slMenu (name) {
      console.log(name)
      this.$router.push({
        path: name
      })
    },
    sendCookie () {
      api.testCookie()
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

.manage
  display: flex

  .menu
    // flex-basis: 200px
    // flex-grow: 0
    // flex-shrink: 0
    // display: flex
    // flex-direction: column
    // max-height: 100vh
    // overflow: auto
    position: fixed
    height: 100vh
    left: 0
    overflow: auto

    // .item
      // background: #ccddff
      // height: 48px
      // flex-shrink: 0
      // display: flex
      // align-items: center
      // padding: 0 10px

  .contBox
    margin-left: 200px

    .cont
      padding: 16px

      .breadCrumb
        margin: 16px 0

</style>
