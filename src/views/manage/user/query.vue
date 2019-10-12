<template>
  <div class="query">
    <Card>
      <!-- 筛选条件 -->
      <Form class="form" :model="dataSelOptions" :label-width="80" ref="form">
        <form-item label="用户名" prop="username">
          <Input v-model="dataSelOptions.username" placeholder="请输入"/>
        </form-item>
        <form-item>
          <Button type="primary" @click="submit">提交</Button>
          <Button type="default" @click="reset">重置</Button>
        </form-item>
      </Form>
      <!-- 筛选结果 -->
      <Table :data="dataTable.data" border>
        <table-column label="用户名" prop="username"></table-column>
        <table-column label="firstname" prop="firstname"></table-column>
        <table-column label="lastname" prop="lastname"></table-column>
        <table-column label="是否是管理员" prop="admin"></table-column>
        <table-column label="操作" fixed="right" min-width="150px">
          <template slot-scope="scope">
            <Button type="primary" @click="editFn(scope.row._id)">编辑</Button>
            <Button type="default" @click="deleteFn(scope.row._id)">删除</Button>
          </template>
        </table-column>
      </Table>
      <!-- page -->
      <Page class="page" :page-size-opts="dataSelOptions.pageSizeList" :total="dataSelOptions.total" size="small" show-elevator show-sizer @on-change="changePageNumber" @on-page-size-change="changePageSize"></Page>
    </Card>
  </div>
</template>

<script>
// import comp from '@/components/common/comp.vue'
import { Card, Form, FormItem, Input, Button, Page } from 'iview'
import { Table, TableColumn } from 'element-ui'
import api from '@/assets/lib/api'
export default {
  // props: {},
  // name: '',
  data () {
    return {
      dataSelOptions: {
        username: '',
        pageSizeList: [1, 2, 5, 10, 20],
        pageSize: 10,
        pageNumber: 1,
        total: 0
      },
      dataTable: {
        data: [
          // {
          //   username: ''
          // }
        ]
      }
    }
  },
  // watch: {},
  // filters: {},
  // computed: {},
  components: {
    Card,
    Form,
    FormItem,
    Input,
    Button,
    Table,
    TableColumn,
    Page
  },
  methods: {
    // init () {}
    submit (bool = true) {
      if (bool) {
        this.dataSelOptions.pageNumber = 1
      }
      api.queryUser({
        username: this.dataSelOptions.username,
        page: this.dataSelOptions.pageNumber - 1,
        size: this.dataSelOptions.pageSize
      }).then(res => {
        let {data} = res.data
        this.dataTable.data = data.users.reduce((r, c) => {
          c.admin = c.admin ? '是' : '否'
          r.push(c)
          return r
        }, [])
        this.dataSelOptions.total = data.amount
      }).catch(err => {
        console.log(err)
      })
    },
    reset () {
      this.$refs.form.resetFields()
    },
    changePageNumber (n) {
      console.log('changePageNumber')
      this.dataSelOptions.pageNumber = n
      this.submit(false)
    },
    changePageSize (size) {
      console.log('changePageSize')
      this.dataSelOptions.pageSize = size
      this.submit()
    },
    editFn (id) {
      this.$router.push({
        path: '/manage/user/edit',
        query: {
          userId: id
        }
      })
    },
    deleteFn (id) {
      this.$confirm('删除用户后无法恢复', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteUser(id).then(res => {
          // console.log(res)
          this.submit()
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
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
  .query
    // color: #333
</style>
