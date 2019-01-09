<template>
   <div>
        <Card>
            <div class="search-con search-con-top">
            <div class="searchdiv">
                <!-- <Button @click="batchRemove" type="error">批量删除</Button> -->
                <RadioGroup v-model="radioValue" type="button" size="large">
                   <Radio label="">显示所有</Radio>
                   <Radio label="1">显示启用</Radio>
                   <Radio label="0">显示未启用</Radio>
                </RadioGroup>
                <Input  clearable placeholder="输入产品名搜索" class="search-input" v-model="searchName"/>
                <Select v-model="selectValue" placement="bottom" placeholder="选择产品类型搜索" style="width:200px; margin-left:2px">
                  <Option v-for="item in selectList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
                <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="search"/>&nbsp;&nbsp;搜索</Button>
            </div>
            <div class="loaddiv">
                <Button @click="handleAdd" class="" type="primary"><Icon type="search"/>添加产品</Button>
            </div>
         </div>
          <Table border :columns="columns7" :data="data6" @on-selection-change="onSelectionChange"></Table>
          <div class="page"><Page :total="dataCount" show-sizer @on-change="onChange" @on-page-size-change="onPageSizeChange"/></div>
       </Card>
   </div>
</template>

<script>
import axios from '@/libs/api.request'
export default {
  data () {
    return {
      searchName: '',
      selectValue: '',
      radioValue: '',
      // 站点
      site_id: 1,
      selectList: [],
      // 初始化信息总条数
      dataCount: 0,
      // 每页显示多少条
      pageSize: 10,
      // 当前页码
      nowPage: 1,
      data6: [],
      columns7: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '产品',
          key: 'name',
          render: (h, params) => {
            return h('div', [
              h('img', {
                attrs: {
                  src: params.row.index_thum_path, style: 'width: 40px;height: 40px;float: left;'
                }
              }),
              h('a', {
                style: {
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    alert('click产品名')
                  }
                }
              }, params.row.name)
            ])
          }
        },
        {
          title: '库存',
          key: 'num',
          width: 150
        },
        {
          title: '类型',
          key: 'product_type_name',
          width: 150
        },
        {
          title: 'Action',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.row.id)
                  }
                }
              }, '删除')
            ])
          }
        }
      ]
    }
  },
  methods: {
    handleAdd () {
      this.$router.push({
        name: 'add_products'
      })
    },
    remove (id) {
      console.log(id)
      this.$Modal.confirm({
        title: '确认删除',
        onOk: () => {
          this.removeAjax(id)
        },
        onCancel: () => {
        }
      })
    },
    removeAjax (id) {
      axios.request({
        url: '/admin/product/destory',
        method: 'delete',
        params: {
          id
        }
      }).then(res => {
        console.log('remove', res)
        this.tableListReq()
        res.data.code === 10 ? this.$Message.success('删除成功') : this.$Message.success(res.data.msg)
      }).catch(() => {
        this.$Message.error('删除失败')
      })
    },
    handleSearch () {
      console.log(this.searchName, this.selectValue, this.radioValue)
      this.tableListReq()
    },
    onPageSizeChange (sizepage) {
      this.pageSize = sizepage
      this.nowPage = 1
      this.tableListReq()
    },
    onChange (page) {
      this.nowPage = page
      this.tableListReq()
    },
    // 选中行发生变化时传入说有选中行的数据
    onSelectionChange (selection) {
    //   this.selectedArr = []
    //   selection.forEach(item => {
    //     this.selectedArr.push(item.id)
    //   })
    //   console.log('selected', this.selectedArr)
    },
    tableListReq () {
    //   this.selectedArr = [] // 多选行id清空
      const data = {}
      data.page = this.nowPage
      data.per_page = this.pageSize
      data.site_id = this.site_id
      data.search = this.searchName ? this.searchName : null
      data.type = this.selectValue ? this.selectValue : null
      data.status = this.radioValue ? this.radioValue : null
      axios.request({
        url: '/admin/product/index',
        method: 'get',
        params: data
      }).then(res => {
        console.log('获取getlist成功', res)
        this.data6 = res.data.data.data.data
        this.dataCount = res.data.data.data.total
      }).catch(err => {
        console.log(err)
        console.log('获取getlist错误')
      })
    },
    selectListReq () {
      axios.request({
        url: '/admin/product_type/all',
        method: 'get'
      }).then(res => {
        // console.log('获取selectlist成功', res)
        this.selectList = res.data.data.data
        this.selectList.unshift({ id: '', name: '全部' })
      })
    }
  },
  created () {
    this.tableListReq()
    this.selectListReq()
  }
}
</script>
<style lang="less" scoped>
.search-con{
  padding: 10px 0;
  height: 50px;
  .searchdiv{
      float: left;
  }
  .loaddiv{
      float: right;
  }
  .search{
    &-col{
      display: inline-block;
      width: 200px;
    }
    &-input{
      display: inline-block;
      width: 200px;
      margin-left: 10px;
    }
    &-btn{
      margin-left: 2px;
    }
  }
}
.page{
    height: 30px;
    ul {
         float: right;
         margin-top: 10px;
    }
}
</style>
