<template>
    <div>
        <Row>
            <i-col span="10" offset="4">
                <Button @click="handleAdd" type="default"><Icon type="ios-arrow-back" />所有产品</Button>
            </i-col>
        </Row>
        <Row class="mt-20">
            <i-col span="10" offset="4">
                <div class="addproduct">添加产品</div>
            </i-col>
            <i-col span="8">
                <ButtonGroup class="fr">
                    <Button @click="handleAdd">取消</Button>
                    <Button type="primary" @click="save">保存</Button>
                </ButtonGroup>
            </i-col>
        </Row>
        <Row class="mt-20">
            <Form ref="formVild" :model="formInline" :rules="ruleInline">
            <i-col span="12" offset="4">
                <Card class="mt-10">
                    <Row>
                        <i-col span="12"><div>产品名称</div>
                            <FormItem prop="name">
                               <Input v-model="formInline.name" placeholder="请填写产品名称" style="width: 90%"/>
                            </FormItem>
                        </i-col>
                        <i-col span="12"><div>产品英文名称</div>
                            <FormItem prop="english_name">
                               <Input v-model="formInline.english_name" placeholder="请填写产品英文名称" style="width: 90%"/>
                            </FormItem>
                        </i-col>
                    </Row>
                    <div>描述</div>
                    <editor ref="editor" @on-change="handleChange"/>
                </Card>
                <Card class="mt-10">
                      <div><strong>图片</strong> <Button class="fr" @click="selectImg" type="default">选择图片</Button></div>
                          <div class="demo-upload-list" v-for="item in fileSelectedArr" :key="item.id+'fileSelectedImg'">
                            <img :src="item.thum_path">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView(item.path)"></Icon>
                                <Icon type="ios-trash-outline" @click.native="handleRemove(item.id)"></Icon>
                            </div>
                      </div>
                </Card>
                <Modal :z-index="10002" title="View Image" v-model="modal2">
                    <img :src="imgPath" v-if="modal2" style="width: 90%">
                </Modal>
                <Modal
                :z-index="10002"
                 ok-text="确认选择"
                 width="1000px"
                 v-model="modal1"
                 title="请勾选你要的图片"
                 @on-ok="ok">
                    <files ref="files"></files>
                </Modal>
                <Card class="mt-10">
                    <div><strong>价格</strong></div>
                    <Row>
                        <i-col span="12"><div>价格</div>
                            <FormItem prop="price">
                               <i-input v-model="formInline.price" placeholder="请填写产品价格" style="width: 90%">
                               <span slot="prepend">$</span>
                               </i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="12"><div>原价</div>
                            <FormItem prop="original_price">
                               <i-input v-model="formInline.original_price" placeholder="请填写产品原价" style="width: 90%">
                                   <span slot="prepend">$</span>
                               </i-input>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="12"><div>成本价</div>
                            <FormItem prop="cost_price">
                               <i-input v-model="formInline.cost_price" placeholder="请填写产品成本价" style="width: 90%">
                                   <span slot="prepend">$</span>
                               </i-input>
                            </FormItem>
                        </i-col>
                    </Row>
                </Card>
                <Card class="mt-10">
                    <div><strong>库存</strong></div>
                    <Row>
                        <i-col span="12"><div>SKU</div>
                            <FormItem prop="sku">
                               <i-input v-model="formInline.sku" placeholder="请填写产品价格" style="width: 90%">
                               </i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="12"><div>条形码（ISBN，UPC，GTIN等）</div>
                            <FormItem prop="bar_code">
                               <i-input v-model="formInline.bar_code" placeholder="请填写产品原价" style="width: 90%">
                               </i-input>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="12"><div>库存数量</div>
                            <FormItem prop="num">
                               <i-input v-model="formInline.num" placeholder="请填写产品成本价" style="width: 90%">
                               </i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="12"><div>&nbsp;</div>
                            <FormItem prop="is_reduce_invenory">
                                <Checkbox v-model="formInline.is_reduce_invenory" true-value="1" false-value="0" size="large" @on-change="change">下单是否减库存</Checkbox>
                            </FormItem>
                        </i-col>
                    </Row>
                </Card>
                <Card class="mt-10">
                    <div><strong>运输</strong></div>
                    <Row>
                        <i-col span="12">
                            <FormItem prop="is_physical_product">
                                <Checkbox v-model="formInline.is_physical_product" true-value="1" false-value="0" size="large" @on-change="change">是否是物理产品</Checkbox>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="12"><div>重量</div>
                            <FormItem prop="weight">
                                <i-input v-model="formInline.weight" placeholder="请填写产品价格" style="width: 90%">
                                <span slot="prepend">公斤</span>
                                </i-input>
                            </FormItem>
                        </i-col>
                    </Row>

                </Card>
                <Card class="mt-10">
                    <div><strong>属性</strong></div>
                    <template v-for="(item, index) in formInline.attribute_options">
                    <Card class="mt-5" :key="'attribute_options'+index">
                    <Row>
                        <i-col span="12">
                            <FormItem :prop="'attr' + index " label="属性名：">
                                 <Select v-model="item.attribute" placement="bottom" placeholder="选择属性名" style="width:60%; margin-left:2px">
                                       <Option v-for="item in attrSelectList" :value="item.id" :key="item.id">{{ item.name }}&nbsp;&nbsp;{{ item.english_name }}</Option>
                                 </Select>
                            </FormItem>
                        </i-col>
                        <i-col span="12">
                               <Button class="fr" @click="removeAttrSelect(index)" type="error">删除</Button>
                               <Button class="fr" @click="addAttrValue(index)" type="default">添加属性值</Button>
                        </i-col>
                    </Row>
                    <Row v-for="(item, inde) in item.values" :key="'values'+inde">
                        <i-col span="12">
                            <FormItem label="属性值：" :prop="'inputChina' + inde ">
                                 <Input v-model="item.attribute_value" @on-blur="addproduct(item.attribute_value)" placeholder="请填写属性值" style="width: 60%"/>
                            </FormItem>
                        </i-col>
                        <i-col span="12" :prop="'inputEnglish' + inde">
                            <FormItem label="英文属性值：">
                                 <Input v-model="item.attribute_english_value" placeholder="请填写英文属性值" style="width: 60%"/>
                                 <Button class="fr" type="dashed" @click="removeAttVal(index, inde)"><Icon type="ios-trash" size="16"/></Button>
                            </FormItem>
                        </i-col>
                    </Row>
                    </Card>
                    </template>
                    <Row class="mt-10">
                        <i-col span="12">
                            <Button v-if="formInline.attribute_options.length <4" type="dashed" @click="addAttrSelect" icon="md-add">给产品添加属性</Button>
                        </i-col>
                    </Row>
                    <div class="mt-10"><strong>产品种类：</strong></div>
                    <Row class="mt-10">
                        <i-col span="6">种类</i-col><i-col span="3">价格</i-col><i-col span="6">SKU</i-col><i-col span="6">条码</i-col><i-col span="3">库存</i-col>
                    </Row>
                    <Row class="mt-10" v-for="(item, index) in formInline.product_attributes" :key="'product_attributes'+index">
                        <i-col span="6"><span v-for="(item, index) in item.attributes" :key="'attributes'+index">{{item.value}}&nbsp;&nbsp;</span></i-col>
                        <i-col span="3">
                            <FormItem :prop="'price' + index ">
                                 <Input  v-model="item.price" placeholder="请填写价格" size="small" style="width: 90%"/>
                            </FormItem></i-col>
                        <i-col span="6">
                            <FormItem :prop="'SKU' + index ">
                                 <Input  v-model="item.sku" placeholder="请填写SKU" size="small" style="width: 90%"/>
                            </FormItem>
                        </i-col>
                        <i-col span="6">
                            <FormItem :prop="'bar_code' + index ">
                                 <Input  v-model="item.bar_code" placeholder="请填写条形码" size="small" style="width: 90%"/>
                            </FormItem>
                        </i-col>
                        <i-col span="3">
                            <FormItem :prop="'num' + index ">
                                 <Input  v-model="item.num" placeholder="请填写库存" size="small" style="width: 90%"/>
                            </FormItem>
                        </i-col>
                    </Row>
                </Card>
            </i-col>

            <i-col span="5" offset="1">
                <Card class="mt-10">
                   <div><strong>标签</strong>
                   <Button type="dashed" @click="addAttrModal" icon="md-add" class="fr">添加标签</Button>
                   </div>
                    <template v-for="(item, index) in tagList">
                       <span :key="index"><Tag closable @on-close="tagClose" :name="item.id">{{item.name}}</Tag></span>
                    </template>
                </Card>
                <Card class="mt-10">
                    <div><strong>组织</strong></div>
                    <Row><div>产品类别</div>
                        <FormItem prop="type">
                             <Select v-model="formInline.type" placement="bottom" placeholder="选择产品类型搜索" style="width:90%; margin-left:2px">
                               <Option v-for="item in selectList" :value="item.id.toString()" :key="item.id + 'type'">{{ item.name }}</Option>
                             </Select>
                        </FormItem>
                    </Row>
                    <Row><div>供货商地址</div>
                        <FormItem prop="supplier_url">
                            <i-input v-model="formInline.supplier_url" placeholder="请填写供货商地址" style="width: 90%">
                            </i-input>
                        </FormItem>
                    </Row>
                    <Row><div>供货商联系人</div>
                        <FormItem prop="supplier_contact">
                            <i-input v-model="formInline.supplier_contact" placeholder="请填写供货商地址" style="width: 90%">
                            </i-input>
                        </FormItem>
                    </Row>
                    <Row><div>供货商备注</div>
                        <FormItem prop="supplier_remark">
                            <i-input v-model="formInline.supplier_remark" placeholder="请填写供货商地址" style="width: 90%">
                            </i-input>
                        </FormItem>
                    </Row>
                    <Row><div>集合</div>
                        <FormItem prop="product_collections">
                             <Select v-model="formInline.product_collections" multiple placement="bottom" placeholder="选择产品类型搜索" style="width:90%; margin-left:2px">
                               <Option v-for="item in colleSelectList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                             </Select>
                        </FormItem>
                    </Row>
                    <Row>
                        <div>&nbsp;</div>
                            <FormItem prop="status">
                                <Checkbox v-model="formInline.status" true-value="1" false-value="0" size="large" >产品状态(勾选为启用)</Checkbox>
                            </FormItem>
                    </Row>

                </Card>
                    <Modal
                    :z-index="10002"
                    ok-text="确认选择"
                    v-model="modal3"
                    title="请选择标签"
                    @on-ok="tagModalOk">
                      <div>
                        <Input  clearable placeholder="输入标签名" style="width: 40%; margin-right: 20px" v-model="tagValue"/>
                        <Button @click="addTagRqu" class="search-btn" type="primary"><Icon type="search"/>&nbsp;&nbsp;添加标签名</Button>
                      </div>
                      <Table border :columns="columns7" :data="data6" @on-selection-change="onSelectionChange"></Table>
                   </Modal>
            </i-col>
        </Form>
        </Row>
    </div>
</template>
<script>
import Editor from '_c/editor'
import axios from '@/libs/api.request'
import files from '@/view/files/files.vue'
export default {
  components: {
    Editor,
    files
  },
  data () {
    return {
      site_id: 1,
      attrSelectList: [],
      colleSelectList: [],
      selectList: [],
      formInline: {
        name: '',
        english_name: '',
        price: '',
        original_price: '',
        cost_price: '',
        sku: '',
        bar_code: '',
        num: '',
        is_reduce_invenory: '1',
        is_physical_product: '1',
        status: '1',
        weight: '',
        type: '',
        supplier_url: '',
        supplier_contact: '',
        supplier_remark: '',
        collection_id: '0', // 暂时没用
        product_collections: [],
        description: '',
        attribute_options: [{ attribute: 1, values: [{ attribute_value: '', attribute_english_value: '' }] }],
        product_attributes: []
      },
      ruleInline: {
        name: [
          { required: true, message: '请填写产品名', trigger: 'blur' }
        ],
        english_name: [
          { required: true, message: '请填写产品英文名', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请填写产品价格', trigger: 'blur' }
        ],
        original_price: [
          { required: true, message: '请填写产品原价', trigger: 'blur' }
        ],
        cost_price: [
          { required: true, message: '请填写产品成本价', trigger: 'blur' }
        ],
        num: [
          { required: true, message: '请填写产品库存', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '请填写产品重量', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择产品类型', trigger: 'change' }
        ],
        sku: [
          { required: true, message: '请选择产品sku', trigger: 'blur' }
        ],
        bar_code: [
          { required: true, message: '请选择产品条形码', trigger: 'blur' }
        ]
      },
      modal1: false,
      modal2: false,
      modal3: false,
      imgPath: '',
      tagValue: '',
      fileSelectedArr: [],
      columns7: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '标签',
          key: 'name'
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
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.tagRemove(params.row.id)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      data6: [],
      seleTagList: [],
      tagList: []
    }
  },
  methods: {
    handleAdd () {
      this.$Modal.confirm({
        title: 'Title',
        content: '<p>还未保存确认退出？</p>',
        onOk: () => {
          this.$router.push({
            name: 'all_products'
          })
        },
        onCancel: () => {
        }
      })
    },
    addObj (id, val) {
      console.log('niubinibi')
      const addobj1 = {}
      addobj1.key = id
      addobj1.value = val
      return addobj1
    },
    addproduct (val) {
      console.log('添加product', val)
      if (!val) return
      let dataArr = this.formInline.attribute_options
      let attrArr = this.formInline.product_attributes
      let obj1 = dataArr[0] || null
      let obj2 = dataArr[1] || null
      let obj3 = dataArr[2] || null
      let obj4 = dataArr[3] || null
      let obj5 = dataArr[4] || null
      attrArr.splice(0, attrArr.length) // 每次都清空所有属性
      console.log(obj1, obj2, obj3, obj4, obj5)
      obj1.values.forEach((item, index) => {
        let pushArr = { attributes: [], price: '0.00', sku: '', bar_code: '', num: '0' }
        const obj1Id = obj1.attribute
        const obj1Val = item.attribute_value
        if (!obj2) {
          if (obj1Val) {
            pushArr.attributes.push(this.addObj(obj1Id, obj1Val))
            attrArr.push(pushArr)
          }
        } else {
          obj2.values.forEach((item, index) => {
            let pushArr = { attributes: [], price: '0.00', sku: '', bar_code: '', num: '0' }
            const obj2Id = obj2.attribute
            const obj2Val = item.attribute_value
            if (!obj3) {
              if (obj1Val && obj2Val) {
                pushArr.attributes.push(this.addObj(obj1Id, obj1Val))
                pushArr.attributes.push(this.addObj(obj2Id, obj2Val))
                attrArr.push(pushArr)
              }
            } else {
              obj3.values.forEach((item, index) => {
                let pushArr = { attributes: [], price: '0.00', sku: '', bar_code: '', num: '0' }
                const obj3Id = obj3.attribute
                const obj3Val = item.attribute_value
                if (!obj4) {
                  if (obj1Val && obj2Val && obj3Val) {
                    pushArr.attributes.push(this.addObj(obj1Id, obj1Val))
                    pushArr.attributes.push(this.addObj(obj2Id, obj2Val))
                    pushArr.attributes.push(this.addObj(obj3Id, obj3Val))
                    attrArr.push(pushArr)
                  }
                } else {
                  obj4.values.forEach((item, index) => {
                    let pushArr = { attributes: [], price: '0.00', sku: '', bar_code: '', num: '0' }
                    const obj4Id = obj4.attribute
                    const obj4Val = item.attribute_value
                    if (!obj5) {
                      if (obj1Val && obj2Val && obj3Val && obj4Val) {
                        pushArr.attributes.push(this.addObj(obj1Id, obj1Val))
                        pushArr.attributes.push(this.addObj(obj2Id, obj2Val))
                        pushArr.attributes.push(this.addObj(obj3Id, obj3Val))
                        pushArr.attributes.push(this.addObj(obj4Id, obj4Val))
                        attrArr.push(pushArr)
                      }
                    }
                  })
                }
              })
            }
          })
        }
      })
      console.log(attrArr)
    },
    addAttrValue (index) {
      this.formInline.attribute_options[index].values.push({ attribute_value: '', attribute_english_value: '' })
      console.log(index)
    },
    removeAttVal (index, inde) {
      if (this.formInline.attribute_options[index].values.length === 1) {
        this.removeAttrSelect(index)
      } else {
        this.formInline.attribute_options[index].values.splice(inde, 1)
        if (this.formInline.attribute_options[index].values.every(item => !item.attribute_value)) {
          this.removeAttrSelect(index)// 如果remove过后的数组中value每个都是空那就删了这个select
        } else {
          this.addproduct('iloveyou')// 随便输入字符串更新笛卡尔积
        }
      }
    },
    removeAttrSelect (index) {
      this.formInline.attribute_options.splice(index, 1)
      this.addproduct('iloveyou')// 随便输入字符串更新笛卡尔积
    },
    // 添加属性
    addAttrSelect () {
      this.formInline.attribute_options.push({ attribute: 1, values: [{ attribute_value: '', attribute_english_value: '' }] })
    },
    // 集合下拉框
    attrSelectListReq () {
      axios.request({
        url: '/admin/attribute/all',
        method: 'get'
      }).then(res => {
        console.log('获取selectlist成功', res)
        this.attrSelectList = res.data.data.data
        // this.selectList.unshift({ id: '', name: '全部' })
      })
    },
    // 分类下拉框
    selectListReq () {
      axios.request({
        url: '/admin/product_type/all',
        method: 'get'
      }).then(res => {
        // console.log('获取selectlist成功', res)
        this.selectList = res.data.data.data
        // this.selectList.unshift({ id: '', name: '全部' })
      })
    },
    // 集合下拉框
    colleSelectListReq () {
      axios.request({
        url: '/admin/collection/index',
        method: 'get'
      }).then(res => {
        console.log('获取集合selectlist成功', res)
        this.colleSelectList = res.data.data.data
        // this.selectList.unshift({ id: '', name: '全部' })
      })
    },
    change () {
      console.log(this.formInline)
    },
    // 富文本编辑变化
    handleChange (html, text) {
      console.log(html, text)
      this.formInline.description = html
    },
    handleView (name) {
      this.imgPath = name
      this.modal2 = true
    },
    handleRemove (id) {
      let idIndex = null
      this.fileSelectedArr.forEach((item, index) => {
        if (item.id === id) { idIndex = index }
      })
      this.fileSelectedArr.splice(idIndex, 1)
      console.log('handleRemove', this.fileSelectedArr)
    },
    selectImg () {
      this.modal1 = true
    },
    addAttrModal () {
      this.modal3 = true
      this.tagListReq()
    },
    tagListReq () {
      axios.request({
        url: '/admin/tag/index',
        method: 'get',
        params: {
          id: this.site_id
        }
      }).then(res => {
        console.log('获取taglist成功', res)
        this.data6 = res.data.data.data.data
      })
    },
    addTagRqu () {
      axios.request({
        url: '/admin/tag/add',
        method: 'post',
        data: {
          site_id: this.site_id,
          name: this.tagValue
        }
      }).then(res => {
        this.tagListReq()
        this.$Message.success(res.data.msg)
      })
    },
    tagRemove (id) {
      axios.request({
        url: '/admin/tag/delete',
        method: 'delete',
        params: {
          id
        }
      }).then(res => {
        console.log('获取taglist成功', res)
        this.$Message.success(res.data.msg)
        this.tagListReq()
      })
    },
    ok () {
      this.$refs.files.selectedObj.forEach(element => {
        if (!this.fileSelectedArr.some(item => item.id === element.id)) {
          this.fileSelectedArr.push(element)
        }
      })
      console.log('fileSelectedArr', this.fileSelectedArr)
    },
    onSelectionChange (selection) {
      console.log(selection)
      this.seleTagList = selection
    //   this.selectedArr = []
    //   this.selectedObj = selection
    //   selection.forEach(item => {
    //     this.selectedArr.push(item.id)
    //   })
    //   console.log('selected', this.selectedArr)
    },
    tagModalOk () {
      this.seleTagList.forEach(element => {
        if (!this.tagList.some(item => item.id === element.id)) {
          this.tagList.push(element)
        }
      })
      console.log('tagList', this.tagList)
    },
    tagClose (e, id) {
      console.log(id)
      this.tagList.forEach((item, index) => {
        if (id === item.id) { this.tagList.splice(index, 1) }
      })
    },
    save () {
      this.$refs['formVild'].validate((valid) => {
        if (valid) {
          this.formInline.site_id = this.site_id
          // 处理标签请求内容
          let tagArr = []
          this.tagList.forEach(element => {
            tagArr.push(element.id)
          })
          this.formInline.product_tags = tagArr
          if (this.formInline.product_tags.length < 1) { this.$Message.error('至少添加一个标签!'); return }
          // 处理集合ids增加两个字段
          let datasCollections = []
          this.formInline.product_collections.forEach((item, index) => {
            const obj = { collection_id: '', remark: '', sort: 0 }
            obj.collection_id = item
            datasCollections.push(obj)
          })
          this.formInline.product_collections = datasCollections
          if (this.formInline.product_collections.length < 1) { this.$Message.error('至少选择一个集合!'); return }
          // 产品描述不能为空验证；
          if (!this.formInline.description) { this.$Message.error('请填写产品描述!'); return }
          // 处理产品资源；产品图片；
          this.fileSelectedArr.forEach((item, index) => {
            const obj = { resource_id: '', is_index: '', sort: 0 }
            obj.resource_id = item.id
            index === 0 ? obj.is_index = 1 : obj.is_index = 0
            obj.sort = index + 1
            this.fileSelectedArr[index] = obj
          })
          this.formInline.product_resources = this.fileSelectedArr
          // 这几个字段转成json attribute_options product_attributes product_resources product_tags product_collections
          let sendData = {}
          sendData = JSON.parse(JSON.stringify(this.formInline)) // 深拷贝
          sendData.attribute_options = JSON.stringify(this.formInline.attribute_options)
          sendData.product_attributes = JSON.stringify(this.formInline.product_attributes)
          sendData.product_resources = JSON.stringify(this.formInline.product_resources)
          sendData.product_tags = JSON.stringify(this.formInline.product_tags)
          sendData.product_collections = JSON.stringify(this.formInline.product_collections)
          console.log(sendData, this.formInline)
          axios.request({
            url: '/admin/product/add',
            method: 'post',
            data: sendData
          }).then(res => {
            this.$Message.success(res.data.msg)
            if (res.data.code === 10) {
              this.$router.push({
                name: 'all_products'
              })
            }
          })
          // console.log(this.formInline)
        } else {
          this.$Message.error('您有必填项未填!')
        }
      })
    }
  },
  mounted () {
    this.selectListReq()
    this.colleSelectListReq()
    this.attrSelectListReq()
  }
}
</script>
<style lang="less" scoped>
  .addproduct {
      font-size: 24px
  }
  .mt-20 {
      margin-top: 20px
  }
  .mt-10 {
      margin-top: 10px
  }
.mt-5 {
      margin-top: 5px
  }
  .fr {
      float: right;
  }
  .borderTop {
      border-top: 1px solid #ddd;
  }
  .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 90%;
        height: 90%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
