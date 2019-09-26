<template>
  <div class="manage">
    <Sider class="menu">
      <Menu :active-name="activeName" theme="dark" width="auto" :open-names="openNames" @on-select="slMenu">
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
      activeName: '',
      openNames: [] // ['1']
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
    init () {
      this.opMenu() // 显示当前路由对应的菜单
    },
    opMenu () {
      console.log(this.$route)
      let {path} = this.$route
      this.activeName = path
    },
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
    this.init()
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
