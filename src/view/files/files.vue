<template>
   <div>
       <Card>
         <div class="search-con search-con-top">
            <div class="searchdiv">
                <Button @click="batchRemove" type="error">批量删除</Button>
                <Input  clearable placeholder="输入关键字搜索" class="search-input" v-model="searchValue"/>
                <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="search"/>&nbsp;&nbsp;搜索</Button>
            </div>
            <div class="loaddiv">
                <Upload :show-upload-list="false" multiple :format="uploadFormat" :on-format-error="onFormatError" :on-success="uploadSuccess" :on-error="onError" :before-upload="beforeUpload" :data="uploadData" :headers="uploadheaders"  :action="actionurl">
                <Button icon="ios-cloud-upload-outline">Upload files</Button>
                </Upload>
            </div>
         </div>
          <Table border :columns="columns7" :data="data6" max-height="650" @on-selection-change="onSelectionChange"></Table>
          <div class="page"><Page :total="dataCount" show-sizer @on-change="onChange" @on-page-size-change="onPageSizeChange"/></div>
       </Card>
   </div>
</template>
<script>
// import { tableListInit, pageoOnChange } from '@/libs/util'
import axios from '@/libs/api.request'
import config from '@/config'
export default {
  data () {
    return {
      // 选中的行id
      selectedArr: [],
      // upload额外数据
      uploadData: {
        site_id: 1
      },
      // upload文件格式限制
      uploadFormat: [
        'jpg', 'jpeg', 'png', 'mp4', 'gif', 'xls', 'xlsx'
      ],
      // 文件上传请求头里加上token；
      uploadheaders: {
        'Authorization': this.$store.state.user.token
      },
      // 初始化信息总条数
      dataCount: 0,
      // 每页显示多少条
      pageSize: 10,
      // 当前页码
      nowPage: 1,
      data6: [],
      searchValue: '',
      columns7: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '文件',
          key: 'thum_path',
          width: 300,
          render: (h, params) => {
            return h('div', [
              h('img', {
                attrs: {
                  src: params.row.thum_path, style: 'width: 40px;height: 40px;float: left;'
                }
              }),
              h('a', {
                style: {
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, params.row.name)
            ])
          }
        },
        {
          title: 'URL',
          key: 'path'
        },
        {
          title: '大小',
          key: 'size',
          width: 150
        },
        {
          title: 'Action',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, 'View'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, 'Delete')
            ])
          }
        }
      ]
    }
  },
  computed: {
    actionurl () {
      let actionurl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
      actionurl += '/admin/resource/upload'
      return actionurl
    }
  },
  methods: {
    // 选中行发生变化时传入说有选中行的数据
    onSelectionChange (selection) {
      this.selectedArr = []
      selection.forEach(item => {
        this.selectedArr.push(item.id)
      })
      console.log('selected', this.selectedArr)
    },
    show (index) {
      this.$Message.destroy()
      this.$Message.info({
        content: `<img src="${this.data6[index].path}">`,
        closable: true,
        duration: 10
      })
      //  this.$Modal.confirm({
      //      render: (h) => {
      //          return h('img',{
      //              attrs :{
      //                  src: this.data6[index].path
      //                  }
      //          })
      //      }
      //  })
    },
    remove (index) {
      this.$Modal.confirm({
        title: '确认删除',
        onOk: () => {
          this.removeAjax(index)
        },
        onCancel: () => {
        }
      })
    },
    removeAjax (index) {
      axios.request({
        url: '/admin/resource/del_file_by_id',
        method: 'delete',
        params: {
          id: this.data6[index].id
        }
      }).then(res => {
        console.log('remove', res)
        this.tableListReq(this.nowPage, this.pageSize)
        res.data.code === 10 ? this.$Message.success('删除成功') : this.$Message.success(res.data.msg)
      }).catch(err => {
        console.log(err)
        this.$Message.error('删除失败')
      })
    },
    batchRemove () {
      if (this.selectedArr.length > 0) {
        console.log('this.selectedArr', this.selectedArr)
        this.$Modal.confirm({
          title: '确认删除',
          onOk: () => {
            this.batchRemoveAjax()
          },
          onCancel: () => {
          }
        })
      } else {
        this.$Message.error('请至少选择一条')
      }
    },
    batchRemoveAjax () {
      axios.request({
        url: '/admin/resource/del_file_by_ids',
        method: 'delete',
        params: {
          ids: JSON.stringify(this.selectedArr)
        }
      }).then(res => {
        console.log('remove', res)
        this.tableListReq(this.nowPage, this.pageSize)
        res.data.code === 10 ? this.$Message.success('删除成功') : this.$Message.success(res.data.msg)
      }).catch(err => {
        console.log(err)
        this.$Message.error('删除失败')
      })
    },
    handleSearch () {
      this.nowPage = 1
      this.tableListReq(this.nowPage, this.pageSize, this.searchValue)
    },
    onChange (page) {
      this.nowPage = page
      this.tableListReq(this.nowPage, this.pageSize)
    },
    onPageSizeChange (sizepage) {
      this.pageSize = sizepage
      this.nowPage = 1
      this.tableListReq(this.nowPage, this.pageSize)
    },
    uploadSuccess (response, file, fileList) {
      console.log(response, file, fileList)
      if (response.code === 10) {
        this.$Notice.success({
          title: '文件上传成功',
          desc: `${file.name}上传成功`
        })
        this.nowPage = 1 // 回到第一页；
        this.tableListReq(this.nowPage, this.pageSize)
      } else {
        this.$Notice.error({
          title: '文件上传失败',
          desc: `${file.name}${file.response.msg}`
        })
      }
    },
    beforeUpload (e) {
      console.log('beforeUpload', e)
      //  this.uploadsubmit(e);
      //  return false;
    },
    onError (response, file, fileList) {
      this.$Notice.error({
        title: '文件上传失败',
        desc: `${file.name}上传失败`
      })
    },
    onFormatError (file) {
      this.$Notice.warning({ title: '文件格式错误', desc: '请选择正确文件格式：jpg,jpeg,png,mp4,gif,xls,xlsx' })
    },
    tableListReq (nowPage, pageSize, name = null, cate_id = null, site_id = null) {
      this.selectedArr = [] // 多选行id清空
      axios.request({
        url: 'admin/resource/get_file_list',
        method: 'get',
        params: {
          page: nowPage,
          limit: pageSize,
          cate_id,
          site_id,
          name
        }
      }).then(res => {
        console.log('getlist', res)
        this.data6 = res.data.data.data
        this.dataCount = res.data.data.total
      }).catch(err => {
        console.log(err)
        console.log('getlist错误')
      })
    }
  },
  created () {
    //    this.data6 = tableListInit(this.dataAax,this.pageSize);
    //    this.dataCount= this.dataAax.length;
    this.tableListReq(this.nowPage, this.pageSize)
  }

}
</script>
<style lang="less" scoped >
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
