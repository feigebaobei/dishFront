<template>
  <div class="query">
    <Card>
      <!-- 筛选条件 -->
      <Form class="form" :model="selectOptions" :label-width="80" ref="form">
        <form-item label="菜名" prop="name">
          <Input v-model="selectOptions.name" placeholder="请输入"/>
        </form-item>
        <!-- <form-item label="种类" prop="name">
          <Input v-model="selectOptions.name" placeholder="请输入"/>
        </form-item> -->
        <form-item label="口味" prop="taste">
          <Select v-model="selectOptions.taste" multiple>
            <Option v-for="item in selectOptions.tasteList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </form-item>
        <form-item>
          <Button type="primary" @click="submit">查询</Button>
          <Button type="default" @click="reset">重置</Button>
          <button-vue type="default" @click="reset">重置</button-vue>
        </form-item>
      </Form>
      <!-- 筛选结果 -->
      <!-- <Table border :columns="table.columns" :data="table.data">
      </Table> -->
      <Table :data="table.data" border>
        <table-column label="菜名" prop="name"></table-column>
        <table-column label="价格" prop="price"></table-column>
        <table-column label="状态" prop="status"></table-column>
        <table-column label="操作" fixed="right">
          <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据，用法参考 demo。 -->
          <template slot-scope="scope">
            <Button @click="edit(scope.row._id)" type="primary" size="small">编辑</Button>
          </template>
        </table-column>
      </Table>
    </Card>
  </div>
</template>

<script>
// import { Card, Form, FormItem, Input, Select, Option, Button, Table } from 'iview'
// iview的table不能正确渲染button.所以使用element的table
import { Card, Form, FormItem, Input, Select, Option } from 'iview'
import { Button, Table, TableColumn } from 'element-ui'
import qs from 'qs'
import api from '@/assets/lib/api'
export default {
  // props: {},
  data () {
    return {
      selectOptions: {
        name: '',
        taste: [],
        tasteList: [
          {
            value: '0.1',
            label: '轻度酸'
          },
          {
            value: '0.2',
            label: '中度酸'
          },
          {
            value: '0.3',
            label: '重度酸'
          },
          {
            value: '1.1',
            label: '轻度甜'
          },
          {
            value: '1.2',
            label: '中度甜'
          },
          {
            value: '1.3',
            label: '重度甜'
          },
          {
            value: '2.1',
            label: '轻度苦'
          },
          {
            value: '2.2',
            label: '中度苦'
          },
          {
            value: '2.3',
            label: '重度苦'
          },
          {
            value: '3.1',
            label: '轻度辣'
          },
          {
            value: '3.2',
            label: '中度辣'
          },
          {
            value: '3.3',
            label: '重度辣'
          },
          {
            value: '4.1',
            label: '轻度咸'
          },
          {
            value: '4.2',
            label: '中度咸'
          },
          {
            value: '4.3',
            label: '重度咸'
          }
        ]
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
    // Button,
    // Table,
    buttonVue: Button,
    // 下面是使用element的组件
    Button,
    Table,
    TableColumn
    // buttonVue
  },
  methods: {
    // init () {}
    submit () {
      let data = {
        name: this.selectOptions.name,
        taste: this.selectOptions.taste
      }
      // api.queryDish(qs.stringify(data)).then(res => {
      api.queryDish({params: data}).then(res => {
        if (res.data.result) {
          this.table.data = res.data.data
        } else {
          throw new Error(res.data.message || 'data error')
        }
      }).catch(err => {
        console.log(err)
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
    // color: #333
</style>
