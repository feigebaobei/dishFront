<template>
  <div class="query">
    <Card>
      <!-- 筛选条件 -->
      <Form class="form" :model="selectOptions" :label-width="80" ref="form">
        <form-item label="菜名" prop="name">
          <Input v-model="selectOptions.name" placeholder="请输入"/>
        </form-item>
        <form-item label="口味" prop="taste">
          <Select v-model="selectOptions.taste" multiple>
            <Option v-for="item in selectOptions.tasteList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </form-item>
        <form-item label="是否删除" prop="delete">
          <RadioGroup v-model="selectOptions.delete">
            <Radio label="1">已删除</Radio>
            <Radio label="0">未删除</Radio>
          </RadioGroup>
        </form-item>
        <form-item>
          <Button type="primary" @click="submit(true)">查询</Button>
          <Button type="default" @click="reset">重置</Button>
        </form-item>
      </Form>
      <!-- 筛选结果 -->
      <!-- <Table border :columns="table.columns" :data="table.data">
      </Table> -->
      <Table :data="table.data" border>
        <table-column type="expand">
          <template slot-scope="props">
            <p>
              <span style="margin-right: 12px;">配料</span>
              <span v-html="props.row.compose"></span>
            </p>
            <p>
              <span style="margin-right: 12px;">说明</span>
              <span v-html="props.row.description"></span>
            </p>
          </template>
        </table-column>
        <table-column label="菜名" prop="name"></table-column>
        <table-column label="价格" prop="price"></table-column>
        <table-column label="菜系" prop="series"></table-column>
        <table-column label="分类" prop="category"></table-column>
        <table-column label="状态" prop="status">
          <template slot-scope="scope">
            <span v-html="scope.row.status ? '上架' : '下架'"></span>
          </template>
        </table-column>
        <!-- <table-column label="配料" prop="compose"></table-column> -->
        <table-column label="是否删除" prop="delete">
          <template slot-scope="scope">
            <span v-html="scope.row.delete ? '已删除' : '未删除'"></span>
          </template>
        </table-column>
        <!-- <table-column label="说明" prop="description"></table-column> -->
        <table-column label="imageBig" prop="imageBig"></table-column>
        <table-column label="imageMiddle" prop="imageMiddle"></table-column>
        <table-column label="imageSmall" prop="imageSmall"></table-column>
        <table-column label="创建时间" prop="createdAt"></table-column>
        <table-column label="最近更新时间" prop="updatedAt"></table-column>
        <table-column label="操作" fixed="right" min-width="150px">
          <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据，用法参考 demo。 -->
          <template slot-scope="scope">
            <Button @click="edit(scope.row._id)" type="primary" size="small">编辑</Button>
            <Button v-if="!scope.row.delete" @click="opDelete(scope.row._id)" type="primary" size="small">删除</Button>
          </template>
        </table-column>
      </Table>
      <!-- <Page :total="45" size="small" show-elevator show-sizer /> -->
      <Page class="page" :page-size-opts="selectOptions.pageSizeList" :total="table.page.total" size="small" show-elevator show-sizer @on-change="changePageNumber" @on-page-size-change="changePageSize" />
    </Card>
  </div>
</template>

<script>
// import { Card, Form, FormItem, Input, Select, Option, Button, Table } from 'iview'
// iview的table不能正确渲染button.所以使用element的table
import { Card, Form, FormItem, Input, Select, Option, Page, RadioGroup, Radio } from 'iview'
import { Button, Table, TableColumn } from 'element-ui'
import api from '@/assets/lib/api'
import config from '@/assets/lib/config'
export default {
  // props: {},
  data () {
    return {
      selectOptions: {
        name: '',
        taste: [],
        delete: '',
        tasteList: config.tasteList,
        pageNumber: 1,
        pageSize: 10,
        pageSizeList: [1, 2, 5, 10, 20]
      },
      table: {
        data: [
          // {
          //   name: '',
          //   taste: '',
          //   status: '',
          //   price: '',
          //   _id: '' // id
          // }
        ],
        page: {
          total: 0
        }
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
    // Button,
    // Table,
    // buttonVue: Button,
    Page,
    RadioGroup,
    Radio,
    // 下面是使用element的组件
    Button,
    Table,
    TableColumn
    // buttonVue
  },
  methods: {
    // init () {}
    mStatus (status) {
      return status ? '上架' : '下架'
    },
    submit (bool) {
      if (bool) {
        this.selectOptions.pageNumber = 1
      }
      let data = {
        name: this.selectOptions.name,
        taste: this.selectOptions.taste,
        // delete: this.selectOptions.delete === '1',
        page: this.selectOptions.pageNumber - 1,
        size: this.selectOptions.pageSize
      }
      if (this.selectOptions.delete !== '') {
        data.delete = this.selectOptions.delete === '1'
      }
      api.queryDish(data).then(res => {
        if (res.data.result) {
          this.table.data = res.data.data.dishes
          this.table.page.total = res.data.data.amount
        } else {
          throw new Error(res.data.message || 'data error')
        }
      }).catch(err => {
        console.log(err)
      }).finally(() => {

      })
    },
    reset () {
      this.$refs.form.resetFields()
    },
    edit (id) {
      this.$router.push({
        path: 'edit',
        query: {
          id: id
        }
      })
    },
    opDelete (id) {
      this.$confirm('是否删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteDish(id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    deleteDish (id) {
      api.deleteDish(id).then(res => {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        // console.log(res)
        this.submit(true)
      }).catch(err => {
        console.log(err)
        this.$message({
          type: 'success',
          message: '删除失败'
        })
      })
    },
    changePageNumber (n) {
      this.selectOptions.pageNumber = n
      this.submit(false)
    },
    changePageSize (size) {
      this.selectOptions.pageSize = size
      this.submit()
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
  .query

    .page
      margin-top: 16px;

</style>
