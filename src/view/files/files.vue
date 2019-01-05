<template>
   <div>
       <Card>
         <div class="search-con search-con-top">
            <div class="searchdiv">
                <Input  clearable placeholder="输入关键字搜索" class="search-input" v-model="searchValue"/>
                <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="search"/>&nbsp;&nbsp;搜索</Button>
            </div>
            <div class="loaddiv">
                <Upload :show-upload-list="false" :on-success="uploadSuccess" :before-upload="beforeUpload" :data="uploadData" :headers="uploadheaders"  action="http://herbmaster.com/admin/resource/upload">
                <Button icon="ios-cloud-upload-outline">Upload files</Button>
                </Upload>
            </div>
         </div>
          <Table border :columns="columns7" :data="data6" max-height="650"></Table>
          <div class="page"><Page :total="dataCount" show-sizer @on-change="onChange" @on-page-size-change="onPageSizeChange"/></div>
       </Card>
   </div>
</template>
<script>
import { tableListInit, pageoOnChange } from '@/libs/util'
import axios from '@/libs/api.request'
export default {
  data () {
    return {
      uploadData: {
        site_id: 1
      },
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
          title: '文件',
          key: 'thum_path',
          width: 150,
          render: (h, params) => {
            return h('div', [
              h('img', {
                attrs: {
                  src: params.row.thum_path, style: 'width: 40px;height: 40px;cursor: pointer;'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              })
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
      ],
      dataAax: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          img: 'assets/imges/logo.jpg'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park'
        }, {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          img: 'assets/imges/logo.jpg'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park'
        }, {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          img: 'assets/imges/logo.jpg'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park'
        }, {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          img: 'assets/imges/logo.jpg'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park'
        }, {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          img: 'assets/imges/logo.jpg'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park'
        }, {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          img: 'assets/imges/logo.jpg'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park'
        }

      ]
    }
  },
  methods: {
    show (index) {
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
      axios.request({
        url: 'admin/resource/del_file_by_id',
        method: 'delete',
        params: {
          id: this.data6[index].id
        }
      }).then(res => {
        console.log('remove', res)
        this.tableListReq(this.nowPage, this.pageSize)
        res.data.code === 10 ? this.$Message.success('删除成功') : this.$Message.success(res.data.msg)
      }).catch(err => {
        reject(err)
        this.$Message.error('删除失败')
      })
    },
    handleSearch () {
      alert('click')
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
    },
    beforeUpload (e) {
      console.log('beforeUpload', e)
      //  this.uploadsubmit(e);
      //  return false;
    },
    tableListReq (nowPage, pageSize, cate_id = null, site_id = null) {
      axios.request({
        url: 'admin/resource/get_file_list',
        method: 'get',
        params: {
          page: nowPage,
          limit: pageSize,
          cate_id,
          site_id
        }
      }).then(res => {
        console.log('getlist', res)
        this.data6 = res.data.data.data
        this.dataCount = res.data.data.total
      }).catch(err => {
        reject(err)
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
      margin-left: 2px;
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
