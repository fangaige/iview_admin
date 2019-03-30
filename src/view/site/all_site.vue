<template>
   <div>
        <Card>
            <div class="search-con search-con-top">
            <div class="searchdiv">
                <Input  clearable placeholder="输入站点ID" class="search-input" v-model="searchName"/>
                <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="search"/>&nbsp;&nbsp;搜索</Button>
            </div>
            <div class="loaddiv">
                <Button @click="handleAdd" class="" type="primary"><Icon type="search"/>添加站点</Button>
            </div>
         </div>
          <Table border :columns="columns" :data="data6"></Table>
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
      // 初始化信息总条数
      dataCount: 0,
      // 每页显示多少条
      pageSize: 10,
      // 当前页码
      nowPage: 1,
      data6: [],
      columns: [
        {
          title: '站点名称',
          key: 'name',
          fixed: 'left',
          width: 100,
          render: (h, params) => {
            return h('div', [
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
          title: '标题',
          key: 'title',
          fixed: 'left',
          width: 100
        },
        {
          title: '是否打开',
          key: 'is_open',
          width: 100
        },
        {
          title: '锁站提示',
          key: 'lock_prompt',
          width: 100
        },
        {
          title: '密匙',
          key: 'secret',
          width: 100
        },
        {
          title: '隐蔽地区',
          key: 'shield_area',
          width: 100
        },
        {
          title: '隐蔽IP',
          key: 'shield_ip',
          width: 100
        },
        {
          title: '选用模板',
          key: 'theme',
          width: 100
        },
        {
          title: '邮箱',
          key: 'email',
          width: 100
        },
        {
          title: '订单前缀',
          key: 'order_prefix',
          width: 100
        },
        {
          title: '货币类型',
          key: 'currency_id',
          width: 100
        },
        {
          title: 'FB像素',
          key: 'fb_pix',
          width: 100
        },
        {
          title: 'GOOGLE像素',
          key: 'google_pix',
          width: 100
        },
        {
          title: '时差',
          key: 'time_difference',
          width: 100
        },
        {
          title: '支付方式',
          key: 'payment_ids',
          width: 100
        },
        {
          title: '表单数据插入',
          key: 'fill_checkout_info',
          width: 100
        },
        {
          title: '延时订单发送通知时间',
          key: 'abandoned_checkout_email_time_delay',
          width: 100
        },
        {
          title: 'Action',
          key: 'action',
          fixed: 'right',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.setSite(params.row)
                  }
                }
              }, '选择此站'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.editProducts(params.row)
                  }
                }
              }, '编辑产品')
            ])
          }
        }
      ]
    }
  },
  methods: {
    handleAdd () {
      this.$router.push({
        name: 'add_site'
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
    editProducts (data) {
    //   this.$router.push({
    //     name: 'edit_products',
    //     params: { productsId: data.id }
    //   })
    },
    handleSearch () {
      console.log(this.searchName)
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
    tableListReq () {
      const data = {}
      data.page = this.nowPage
      data.limit = this.pageSize
      data.simple = 1
      axios.request({
        url: '/admin/site/index',
        method: 'get',
        params: data
      }).then(res => {
        console.log('获取getlist成功', res)
        this.data6 = res.data.data.data
        this.dataCount = res.data.data.total
      })
    },
    setSite (data) {
      this.$store.state.app.siteId = data.id
      console.log(data)
    }
  },
  created () {
    this.tableListReq()
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
