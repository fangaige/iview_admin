<template>
   <div>
        <Card>
            <Row>
               <i-col span="24">
                  <Button @click="handleAdd" class="" type="primary"><Icon type="search"/>添加站点</Button>
               </i-col>
            </Row>
            <div class="search-con search-con-top">
            <div class="searchdiv">
                <RadioGroup v-model="radioValue" type="button" size="large">
                  <Radio label="">所有</Radio>
                   <Radio label="1">超级管理员</Radio>
                   <Radio label="0">不是超级管理员</Radio>
                </RadioGroup>
                <RadioGroup v-model="radioValueYong" type="button" size="large" style="margin-left: 10px">
                  <Radio label="">所有</Radio>
                   <Radio label="1">启用</Radio>
                   <Radio label="0">不启用</Radio>
                </RadioGroup>
                <label style="margin-left: 10px">选择管理员组</label>
                <Select v-model="adminGroup" placement="bottom" placeholder="选择站点搜索" style="width:200px; margin-left:2px">
                  <Option v-for="item in adminGroupList" :value="item.id" :key="item.id">{{ item.group_name }}</Option>
                </Select>
                <Input  clearable placeholder="输入关键字搜索" class="search-input" v-model="searchName"/>
                <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="search"/>&nbsp;&nbsp;搜索</Button>
            </div>
         </div>
         <div>
          <Table border :columns="columns" :data="data6"></Table>
          <div class="page"><Page :total="dataCount" show-sizer @on-change="onChange" @on-page-size-change="onPageSizeChange"/></div>
        </div>
       </Card>
   </div>
</template>

<script>
import axios from '@/libs/api.request'
export default {
  data () {
    return {
      adminGroupList: [],
      adminGroup: '',
      radioValueYong: '',
      radioValue: '',
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
          title: 'ID',
          key: 'id',
          width: 100
        },
        {
          title: '名称',
          key: 'username',
          width: 100
        },
        {
          title: '所属角色',
          key: 'show_name',
          width: 100
        },
        {
          title: '上次登录IP',
          key: 'admin_ip',
          width: 100
        },
        {
          title: '上次登录时间',
          key: 'updated_at',
          width: 100
        },
        {
          title: '是否超管',
          key: 'is_root',
          width: 100,
          render: (h, params) => {
            if (params.row.is_root === 1) {
              return h('span', '是')
            } else {
              return h('span', '否')
            }
          }
        },
        {
          title: 'Action',
          key: 'action',
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
      data.per_page = this.pageSize
      data.search = this.searchName
      data.is_root = this.radioValue
      data.admin_group = this.adminGroup
      axios.request({
        url: '/admin/admin/admins',
        method: 'get',
        params: data
      }).then(res => {
        console.log('获取getlist成功', res)
        this.data6 = res.data.data.data.data
        this.dataCount = res.data.data.data.total
      })
    },
    adminGroupListReq () {
      axios.request({
        url: '/admin/admin_group/all',
        method: 'get'
      }).then(res => {
        console.log('获取getlist成功', res)
        this.adminGroupList = res.data.data.data
      })
    },
    setSite (data) {
      this.$store.state.app.siteId = data.id
      console.log(data)
    }
  },
  created () {
    this.tableListReq()
    this.adminGroupListReq()
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
