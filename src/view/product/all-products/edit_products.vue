<template>
    <div>
        <Row>
            <i-col span="10" offset="4">
                <Button @click="handleAdd" type="default"><Icon type="ios-arrow-back" />所有产品</Button>
            </i-col>
        </Row>
        <Row class="mt-20">
            <i-col span="10" offset="4">
                <div class="addproduct">编辑产品{{this.$router.params}}</div>
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
                    <editor ref="editor" @on-change="handleChange"></editor>
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
                    <div><strong>属性</strong><Button @click="showModal4" class="fr" size="small" type="primary">添加属性</Button></div>
                    <span v-for="(item, key, index) in attrval" :key="'attributeval'+index" >
                      <Tag v-for="(item, ind) in item.options" :key="'attrspan'+ind" :color="setColor(index)">{{item.attribute_value}}&nbsp;&nbsp;{{item.attribute_english_value}}</Tag >
                    </span>
                    <div><strong>变种</strong></div>
                    <Table border :columns="columns6" :data="data5"></Table>
                    <row><Button @click="addvariant" class="fr" size="small" type="primary">添加变种</Button></row>
                </Card>
                    <Modal
                    width="1000px"
                    v-model="modal5"
                    title="修改变种">
                      <div slot="footer">
                        <Button type="text" size="large" @click="modal5=false">取消</Button>
                        <Button type="primary" size="large" @click="variantModalOk">保存</Button>
                      </div>
                    <Card class="mt-10">
                      <Form ref="variantformVild" :model="editVariantData" :rules="variantruleInline">
                      <template v-for="(item, index) in editVariantData.attribute_list">
                      <div :key="'attribute_variant'+index">
                      <div><strong>{{item.attribute_list_has_attribute.name}}</strong></div>
                    <Row>
                        <i-col span="12">
                            <FormItem label="属性值：" :prop="'attribute_list.' + index + '.attribute_value'" :rules="{required: true, message: '请填写中文属性值', trigger: 'blur'}">
                                 <Input v-model="item.attribute_value" placeholder="请填写属性值" style="width: 60%"/>
                            </FormItem>
                        </i-col>
                        <i-col span="12">
                            <FormItem label="英文属性值：" :prop="'attribute_list.' + index + '.attribute_english_value'" :rules="{required: true, message: '请填写英文属性值', trigger: 'blur'}">
                                 <Input v-model="item.attribute_english_value" placeholder="请填写英文属性值" style="width: 60%"/>
                            </FormItem>
                        </i-col>
                    </Row>
                    </div>
                    </template>
                       <Row>
                        <i-col span="12"><div>价格</div>
                            <FormItem prop="price">
                               <i-input v-model="editVariantData.price" placeholder="请填写产品价格" style="width: 90%">
                               <span slot="prepend">$</span>
                               </i-input>
                            </FormItem>
                        </i-col>
                           <i-col span="12"><div>SKU</div>
                               <FormItem prop="sku">
                                  <i-input v-model="editVariantData.sku" placeholder="请填写SKU码" style="width: 90%">
                                  </i-input>
                               </FormItem>
                           </i-col>
                           <i-col span="12"><div>条形码（ISBN，UPC，GTIN等）</div>
                               <FormItem prop="bar_code">
                                  <i-input v-model="editVariantData.bar_code" placeholder="请填写条形码" style="width: 90%">
                                  </i-input>
                               </FormItem>
                           </i-col>
                           <i-col span="12"><div>库存数量</div>
                               <FormItem prop="num">
                                  <i-input v-model="editVariantData.num" placeholder="请填写产品成本价" style="width: 90%">
                                  </i-input>
                               </FormItem>
                           </i-col>
                       </Row>
                       </Form>
                    </Card>
                    </Modal>
                    <Modal
                    width="1000px"
                    v-model="modal6"
                    title="添加变种">
                      <div slot="footer">
                        <Button type="text" size="large" @click="modal6=false">取消</Button>
                        <Button type="primary" size="large" @click="addvariantModalOk">保存</Button>
                      </div>
                    <Card class="mt-10">
                      <Form ref="addvariantformVild" :model="addVariantData" :rules="variantruleInline">
                      <template v-for="(item, index) in addVariantData.attribute_list">
                      <div :key="'attribute_variant'+index">
                      <div><strong>{{item.attribute_list_has_attribute.name}}</strong></div>
                    <Row>
                        <i-col span="12">
                            <FormItem label="属性值：" :prop="'attribute_list.' + index + '.attribute_value'" :rules="{required: true, message: '请填写中文属性值', trigger: 'blur'}">
                                 <Input v-model="item.attribute_value" placeholder="请填写属性值" style="width: 60%"/>
                            </FormItem>
                        </i-col>
                        <i-col span="12">
                            <FormItem label="英文属性值：" :prop="'attribute_list.' + index + '.attribute_english_value'" :rules="{required: true, message: '请填写英文属性值', trigger: 'blur'}">
                                 <Input v-model="item.attribute_english_value" placeholder="请填写英文属性值" style="width: 60%"/>
                            </FormItem>
                        </i-col>
                    </Row>
                    </div>
                    </template>
                       <Row>
                        <i-col span="12"><div>价格</div>
                            <FormItem prop="price">
                               <i-input v-model="addVariantData.price" placeholder="请填写产品价格" style="width: 90%">
                               <span slot="prepend">$</span>
                               </i-input>
                            </FormItem>
                        </i-col>
                           <i-col span="12"><div>SKU</div>
                               <FormItem prop="sku">
                                  <i-input v-model="addVariantData.sku" placeholder="请填写SKU码" style="width: 90%">
                                  </i-input>
                               </FormItem>
                           </i-col>
                           <i-col span="12"><div>条形码（ISBN，UPC，GTIN等）</div>
                               <FormItem prop="bar_code">
                                  <i-input v-model="addVariantData.bar_code" placeholder="请填写条形码" style="width: 90%">
                                  </i-input>
                               </FormItem>
                           </i-col>
                           <i-col span="12"><div>库存数量</div>
                               <FormItem prop="num">
                                  <i-input v-model="addVariantData.num" placeholder="请填写产品成本价" style="width: 90%">
                                  </i-input>
                               </FormItem>
                           </i-col>
                       </Row>
                       </Form>
                    </Card>
                    </Modal>
                <Modal
                    width="1000px"
                    ok-text="保存"
                    v-model="modal4"
                    title="添加属性">
                       <div slot="footer">
                         <Button type="text" size="large" @click="modal4=false">取消</Button>
                         <Button type="primary" size="large" @click="attrModalOk">保存</Button>
                       </div>
                    <Tag type="dot" v-for="(item, key, index) in attrval" :color="setColor(index)" :key="'attributeval'+index" >
                      {{item.name}}&nbsp;&nbsp;{{item.english_name}}&nbsp;&nbsp;
                      <Tag v-for="(item, ind) in item.options" :key="'attrspan'+ind" :color="setColor(index)">{{item.attribute_value}}&nbsp;&nbsp;{{item.attribute_english_value}}</Tag >
                    </Tag>
                    <template v-for="(item, index) in attribute_options">
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
                            <Button v-if="attribute_options.length <4" type="dashed" @click="addAttrSelect" icon="md-add">给产品添加属性</Button>
                        </i-col>
                    </Row>
                </Modal>
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
                    <Row><div>供货商价格</div>
                        <FormItem prop="supplier_price">
                            <i-input v-model="formInline.supplier_price" placeholder="请填写供货商地址" style="width: 90%">
                            </i-input>
                        </FormItem>
                    </Row>
                    <Row><div>供货商数量</div>
                        <FormItem prop="supplier_num">
                            <i-input v-model="formInline.supplier_num" placeholder="请填写供货商地址" style="width: 90%">
                            </i-input>
                        </FormItem>
                    </Row>
                    <Row><div>供货商电话</div>
                        <FormItem prop="supplier_phone">
                            <i-input v-model="formInline.supplier_phone" placeholder="请填写供货商地址" style="width: 90%">
                            </i-input>
                        </FormItem>
                    </Row>
                    <!-- <Row><div>集合</div>
                        <FormItem prop="product_collections">
                             <Select v-model="formInline.product_collections" multiple placement="bottom" placeholder="选择产品类型搜索" style="width:90%; margin-left:2px">
                               <Option v-for="item in colleSelectList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                             </Select>
                        </FormItem>
                    </Row> -->
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
      site_id: null,
      supplierId: '',
      addVariantData: {},
      editVariantData: {},
      attribute_options: [],
      attrval: [],
      attrSelectList: [],
      colleSelectList: [],
      selectList: [],
      // datasCollections: [],
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
        supplier_price: '',
        supplier_num: '',
        supplier_phone: '',
        collection_id: '0', // 暂时没用
        // product_collections: [],
        description: ''
      },
      variantruleInline: {
        price: [
          { required: true, message: '请填写产品价格', trigger: 'blur' }
        ],
        num: [
          { required: true, message: '请填写产品库存', trigger: 'blur' }
        ],
        sku: [
          { required: true, message: '请选择产品sku', trigger: 'blur' }
        ],
        bar_code: [
          { required: true, message: '请选择产品条形码', trigger: 'blur' }
        ]
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
      modal4: false,
      modal5: false,
      modal6: false,
      imgPath: '',
      tagValue: '',
      fileSelectedArr: [],
      columns6: [
        {
          title: '种类',
          key: 'name',
          render: (h, params) => {
            let arr = []
            params.row.attribute_list.forEach(item => {
              arr.push(
                h('span', item.attribute_value))
            })
            return h('div', arr)
          }
        },
        {
          title: '价格',
          key: 'price'
        },
        {
          title: 'SKU',
          key: 'sku'
        },
        {
          title: '条码',
          key: 'bar_code'
        },
        {
          title: '库存',
          key: 'num'
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
                on: {
                  click: () => {
                    this.editVariant(params.row)
                  }
                }
              }, '编辑')
            ])
          }
        }
      ],
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
      data5: [],
      seleTagList: [],
      tagList: []
    }
  },
  methods: {
    addvariantModalOk () {
      this.$refs['addvariantformVild'].validate((valid) => {
        if (valid) {
          let datas = {}
          datas.product_id = this.addVariantData.product_id
          datas.price = this.addVariantData.price
          datas.sku = this.addVariantData.sku
          datas.bar_code = this.addVariantData.bar_code
          datas.num = this.addVariantData.num
          let obj = {}
          this.addVariantData.attribute_list.forEach(item => {
            let objs = {}
            objs.attribute_value = item.attribute_value
            objs.attribute_english_value = item.attribute_english_value
            obj[item.attribute_list_has_attribute.id] = objs
          })
          datas.attribute_list = JSON.stringify(obj)
          axios.request({
            url: '/admin/product/variant/add',
            method: 'post',
            data: datas
          }).then(res => {
            this.$Message.success(res.data.msg)
            this.modal6 = false
            this.defaultReq()
          })
        }
      })
    },
    addvariant () {
      this.addVariantData = JSON.parse(JSON.stringify(this.data5[0]))
      this.addVariantData.price = ''
      this.addVariantData.sku = ''
      this.addVariantData.bar_code = ''
      this.addVariantData.num = ''
      this.addVariantData.attribute_list.forEach(item => {
        item.attribute_value = ''
        item.attribute_english_value = ''
      })
      this.modal6 = true
    },
    variantModalOk () {
      this.$refs['variantformVild'].validate((valid) => {
        if (valid) {
          let datas = {}
          datas.id = this.editVariantData.id
          datas.price = this.editVariantData.price
          datas.sku = this.editVariantData.sku
          datas.bar_code = this.editVariantData.bar_code
          datas.num = this.editVariantData.num
          let obj = {}
          this.editVariantData.attribute_list.forEach(item => {
            let objs = {}
            objs.attribute_value = item.attribute_value
            objs.attribute_english_value = item.attribute_english_value
            obj[item.attribute_list_has_attribute.id] = objs
          })
          datas.attribute_list = JSON.stringify(obj)
          axios.request({
            url: '/admin/product/variant/edit',
            method: 'put',
            data: datas
          }).then(res => {
            this.$Message.success(res.data.msg)
            this.modal5 = false
            this.defaultReq()
          })
        }
      })
    },
    editVariant (datas) {
      console.log('editVariant', datas)
      this.editVariantData = JSON.parse(JSON.stringify(datas))
      this.editVariantData.num = JSON.parse(JSON.stringify(datas.num.toString()))
      this.modal5 = true
    },
    attrModalOk () {
      let falg = false // 判断是否有为空项
      this.attribute_options.forEach(item => {
        if (item.values.some(item => { return !item.attribute_value }) || item.values.some(item => { return !item.attribute_english_value })) {
          falg = true
        }
      })
      if (falg) {
        this.$Message.error('属性值请填写完整！')
      } else {
        console.log('attribute_options', this.attribute_options)
        axios.request({
          url: '/admin/product/option/add',
          method: 'post',
          data: {
            product_id: this.$route.params.productsId,
            attribute_options: JSON.stringify(this.attribute_options)
          }
        }).then(res => {
          this.modal4 = false
          this.$Message.success(res.data.msg)
          this.defaultReq()
        })
      }
    },
    setColor (index) {
      if (index === 0) {
        return 'primary'
      } else if (index === 1) {
        return 'success'
      } else if (index === 2) {
        return 'purple'
      } else if (index === 3) {
        return 'warning'
      } else if (index === 4) {
        return 'error'
      }
    },
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
      this.attribute_options[index].values.push({ attribute_value: '', attribute_english_value: '' })
    },
    removeAttVal (index, inde) {
      if (this.attribute_options[index].values.length === 1) {
        this.removeAttrSelect(index)
      } else {
        this.attribute_options[index].values.splice(inde, 1)
        if (this.attribute_options[index].values.every(item => !item.attribute_value)) {
          this.removeAttrSelect(index)// 如果remove过后的数组中value每个都是空那就删了这个select
        }
      }
    },
    removeAttrSelect (index) {
      this.attribute_options.splice(index, 1)
      // this.addproduct('iloveyou')// 随便输入字符串更新笛卡尔积
    },
    // 添加属性
    addAttrSelect () {
      this.attribute_options.push({ attribute: 1, values: [{ attribute_value: '', attribute_english_value: '' }] })
    },
    // 下拉框
    attrSelectListReq () {
      axios.request({
        url: '/admin/attribute/all',
        method: 'get'
      }).then(res => {
        this.attrSelectList = res.data.data.data
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
    // colleSelectListReq () {
    //   axios.request({
    //     url: '/admin/collection/index',
    //     method: 'get'
    //   }).then(res => {
    //     this.colleSelectList = res.data.data.data
    //     // this.selectList.unshift({ id: '', name: '全部' })
    //   })
    // },
    // 返回所有选项默认值
    defaultReq () {
      console.log(this.$route.params.productsId)

      axios.request({
        url: '/admin/product/info',
        method: 'get',
        params: {
          id: this.$route.params.productsId
        }
      }).then(res => {
        console.log('获取初始化数据成功', res)
        const defDatas = res.data.data.data
        this.site_id = defDatas.site_id
        this.formInline.name = defDatas.name
        this.formInline.english_name = defDatas.english_name
        this.$refs.editor.setHtml(defDatas.description)
        this.fileSelectedArr = defDatas.resources
        this.formInline.price = defDatas.price
        this.formInline.original_price = defDatas.original_price
        this.formInline.cost_price = defDatas.cost_price
        this.formInline.sku = defDatas.sku
        this.formInline.bar_code = defDatas.bar_code
        this.formInline.num = defDatas.num.toString()
        this.formInline.is_reduce_invenory = defDatas.is_reduce_invenory.toString()
        this.formInline.is_physical_product = defDatas.is_physical_product.toString()
        this.formInline.weight = defDatas.weight
        this.formInline.type = defDatas.type.toString()
        this.formInline.status = defDatas.status.toString()
        this.formInline.supplier_url = defDatas.suppliers[0].url
        this.formInline.supplier_contact = defDatas.suppliers[0].contact
        this.formInline.supplier_remark = defDatas.suppliers[0].remark
        this.formInline.supplier_price = defDatas.suppliers[0].price
        this.formInline.supplier_num = defDatas.suppliers[0].num
        this.formInline.supplier_phone = defDatas.suppliers[0].phone
        this.supplierId = defDatas.suppliers[0].id
        // 集合
        // defDatas.collections.forEach((item, index) => {
        //   this.formInline.product_collections.push(item.id)
        // })
        this.tagList = defDatas.tags
        this.attrval = defDatas.attribute_options
        this.data5 = defDatas.product_attributes
        console.log('this.formInline', this.formInline)

        console.log('获取ref', this.$refs.editor.modal1)
        // // this.selectList.unshift({ id: '', name: '全部' })
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
      let datasarr = [id]
      axios.request({
        url: '/admin/product/resources/delete',
        method: 'delete',
        data: {
          id: this.$route.params.productsId,
          product_resource_ids: JSON.stringify(datasarr)
        }
      }).then(res => {
        this.$Message.success(res.data.msg)
        this.defaultReq()
      })
    },
    selectImg () {
      this.modal1 = true
    },
    showModal4 () {
      this.modal4 = true
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
      let fileSelectedArrResource = []
      this.fileSelectedArr.forEach((item, index) => {
        const obj = { resource_id: '', is_index: '', sort: 0 }
        obj.resource_id = item.id
        index === 0 ? obj.is_index = 1 : obj.is_index = 0
        obj.sort = index + 1
        fileSelectedArrResource.push(obj)
      })
      axios.request({
        url: '/admin/product/resources/edit',
        method: 'put',
        data: {
          id: this.$route.params.productsId,
          product_resources: JSON.stringify(fileSelectedArrResource)
        }
      }).then(res => {
        this.$Message.success(res.data.msg)
        this.tagListReq()
      })
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
      let datas = []
      this.seleTagList.forEach(element => {
        if (!this.tagList.some(item => item.id === element.id)) {
          datas.push(element.id)
        }
      })
      axios.request({
        url: '/admin/product/tag/edit',
        method: 'put',
        data: {
          product_id: this.$route.params.productsId,
          product_tags: JSON.stringify(datas)
        }
      }).then(res => {
        this.$Message.success(res.data.msg)
        this.defaultReq()
      })
    },
    tagClose (e, id) {
      let datasarr = [id]
      axios.request({
        url: '/admin/product/tag/delete',
        method: 'delete',
        params: {
          product_id: this.$route.params.productsId,
          tag_ids: JSON.stringify(datasarr)
        }
      }).then(res => {
        this.$Message.success(res.data.msg)
        this.defaultReq()
      })
    },
    save () {
      this.$refs['formVild'].validate((valid) => {
        if (valid) {
          this.formInline.id = this.$route.params.productsId
          // 产品描述不能为空验证；
          if (!this.formInline.description) { this.$Message.error('请填写产品描述!'); return }
          // 这几个字段转成json attribute_options product_attributes product_resources product_tags product_collections
          let sendData = {}
          sendData = JSON.parse(JSON.stringify(this.formInline)) // 深拷贝
          // sendData.product_collections = JSON.stringify(this.datasCollections)
          console.log(sendData, this.formInline)
          axios.request({
            url: '/admin/product/edit',
            method: 'put',
            data: sendData
          }).then(res => {
            this.$Message.success(res.data.msg)
          })
          let arr = {}
          arr.supplier_id = this.supplierId
          arr.supplier_url = sendData.supplier_url
          arr.supplier_contact = sendData.supplier_contact
          arr.supplier_phone = sendData.supplier_phone
          arr.supplier_price = sendData.supplier_price
          arr.supplier_num = sendData.supplier_num
          arr.supplier_remark = sendData.supplier_remark
          axios.request({
            url: '/admin/supplier/edit',
            method: 'put',
            data: arr
          }).then(res => {
            this.$Message.success(res.data.msg)
          })
        } else {
          this.$Message.error('您有必填项未填!')
        }
      })
    }
  },
  mounted () {
    this.selectListReq()
    this.attrSelectListReq()
  },
  created () {
    this.defaultReq()
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
