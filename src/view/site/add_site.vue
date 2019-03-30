<template>
    <div>
        <Row>
            <i-col span="10" offset="4">
                <Button @click="handleAdd" type="default"><Icon type="ios-arrow-back" />所有站点</Button>
            </i-col>
        </Row>
        <Row class="mt-20">
            <i-col span="10" offset="4">
                <div class="addproduct">添加站点</div>
            </i-col>
            <i-col span="8">
                <ButtonGroup class="fr">
                    <Button @click="handleAdd">取消</Button>
                    <Button type="primary" @click="save">保存</Button>
                </ButtonGroup>
            </i-col>
        </Row>
        <Row class="mt-20">
            <i-col span="12" offset="4">
                <Card class="mt-10">
                    <Form :model="formInline" label-position="right" :label-width="100" :rules="ruleInline" ref="formVild">
                    <Row>
                        <i-col span="12">
                            <FormItem prop="name" label="站点名称">
                               <Input v-model="formInline.name" placeholder="请填写站点名称"/>
                            </FormItem>
                        </i-col>
                        <i-col span="12">
                            <FormItem prop="title" label="站点标题">
                               <Input v-model="formInline.title" placeholder="请填写站点标题"/>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="12">
                            <FormItem prop="lock_prompt" label="锁站提示">
                               <Input v-model="formInline.lock_prompt" placeholder="请填写提示内容"/>
                            </FormItem>
                        </i-col>
                        <i-col span="12">
                            <FormItem prop="abandoned_checkout_email_time_delay" label="用户放弃结账邮件发送延时">
                               <Input v-model="formInline.abandoned_checkout_email_time_delay" placeholder="请填写发送延时"/>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="12">
                            <FormItem prop="email" label="email">
                               <Input v-model="formInline.email" placeholder="请填写email"/>
                            </FormItem>
                        </i-col>
                        <i-col span="12">
                            <FormItem prop="order_prefix" label="订单前缀">
                               <Input v-model="formInline.order_prefix" placeholder="请填写订单前缀"/>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="12">
                        <FormItem prop="theme" label="主题">
                             <Select v-model="formInline.theme" placement="bottom" placeholder="选择产品类型搜索" style="width:90%; margin-left:2px">
                               <Option v-for="item in selectList" :value="item.id" :key="item.id + 'theme'">{{ item.name }}</Option>
                             </Select>
                        </FormItem>
                        </i-col>
                        <i-col span="12">
                        <FormItem prop="currency_id" label="货币">
                             <Select v-model="formInline.currency_id" placement="bottom" placeholder="选择产品类型搜索" style="width:90%; margin-left:2px">
                               <Option v-for="item in currencyList" :value="item.id.toString()" :key="item.id + 'currency'">{{ item.name }}</Option>
                             </Select>
                        </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="12">
                            <FormItem prop="secret" label="密匙">
                               <Input v-model="formInline.secret" placeholder="请填写时差"/>
                            </FormItem>
                        </i-col>
                        <i-col span="12">
                            <FormItem prop="time_difference" label="时差">
                               <Input v-model="formInline.time_difference" placeholder="请填写时差"/>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="12">
                        <FormItem prop="payment_ids" label="支付方式">
                             <Select multiple v-model="formInline.payment_ids" placement="bottom" placeholder="选择主题" style="width:90%; margin-left:2px">
                               <Option v-for="item in paymentList" :value="item.id" :key="item.id + 'payment'">{{ item.name }}</Option>
                             </Select>
                        </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="12">
                             <RadioGroup v-model="formInline.fill_checkout_info" type="button" size="large" class="fr">
                                <Radio label="0">自动填充</Radio>
                                <Radio label="1">填充部分信息</Radio>
                                <Radio label="2">用户手动填写</Radio>
                             </RadioGroup>
                        </i-col>
                        <i-col span="12">
                            <FormItem prop="is_open">
                                <Checkbox v-model="formInline.is_open" true-value="1" false-value="0" size="large">是否开启</Checkbox>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="12">
                            <FormItem prop="google_pix" label="google像素">
                               <Input v-model="formInline.google_pix" placeholder="请填写google像素"/>
                            </FormItem>
                        </i-col>
                        <i-col span="12">
                            <FormItem prop="fb_pix" label="fb像素">
                               <Input v-model="formInline.fb_pix" placeholder="请填写fb像素"/>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="12">
                            <FormItem prop="shield_area" label="屏蔽地区字段">
                               <Input v-model="formInline.shield_area" placeholder="屏蔽地区字段,以;为间隔"/>
                            </FormItem>
                        </i-col>
                        <i-col span="12">
                            <FormItem prop="shield_ip" label="屏蔽ip字段">
                               <Input v-model="formInline.shield_ip" placeholder="屏蔽ip字段,以;为间隔"/>
                            </FormItem>
                        </i-col>
                    </Row>
                    </Form>
                </Card>
            </i-col>
        </Row>
    </div>
</template>
<script>
import axios from '@/libs/api.request'
export default {
  data () {
    return {
      paymentList: [
        {
          id: 1,
          name: '支付宝'
        },
        {
          id: 2,
          name: '微信'
        }
      ],
      selectList: [
        {
          id: '1',
          name: '主题一'
        }
      ],
      currencyList: [],
      formInline: {
        name: '',
        title: '',
        secret: '',
        is_open: '1',
        lock_prompt: '',
        theme: '',
        currency_id: '',
        email: '',
        order_prefix: '',
        time_difference: '',
        fill_checkout_info: '0',
        abandoned_checkout_email_time_delay: '',
        fb_pix: '',
        google_pix: '',
        shield_area: '',
        shield_ip: '',
        payment_ids: []
      },
      ruleInline: {
        name: [
          { required: true, message: '请填写站点名', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请填写站点标题', trigger: 'blur' }
        ],
        lock_prompt: [
          { required: true, message: '请填写锁站提示', trigger: 'blur' }
        ],
        secret: [
          { required: true, message: '请填写站点密钥', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请填写站点通知邮箱', trigger: 'blur' }
        ],
        order_prefix: [
          { required: true, message: '请填写订单前缀', trigger: 'blur' }
        ],
        time_difference: [
          { required: true, message: '请填写时差', trigger: 'blur' }
        ],
        abandoned_checkout_email_time_delay: [
          { required: true, message: '请填写用户放弃结账邮件发送延时', trigger: 'blur' }
        ],
        theme: [
          { required: true, message: '请选择主题', trigger: 'change' }
        ],
        currency_id: [
          { required: true, message: '请选择货币类型', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleAdd () {
      this.$Modal.confirm({
        title: 'Title',
        content: '<p>还未保存确认退出？</p>',
        onOk: () => {
          this.$router.push({
            name: 'all_site'
          })
        },
        onCancel: () => {
        }
      })
    },
    save () {
      this.$refs['formVild'].validate((valid) => {
        if (valid) {
          console.log(this.formInline)
          let sendDates = {}
          sendDates = JSON.parse(JSON.stringify(this.formInline))
          sendDates.payment_ids = this.formInline.payment_ids.join(',')
          axios.request({
            url: '/admin/site/site_add',
            method: 'post',
            data: sendDates
          }).then(res => {
            this.$Message.success(res.data.msg)
            // if (res.data.code === 10) {
            //   this.$router.push({
            //     name: 'all_site'
            //   })
            // }
          })
        }
      })
    },
    // 分类下拉框
    selectListReq () {
      axios.request({
        url: '/admin/site/currency_list?page=1',
        method: 'get'
      }).then(res => {
        this.currencyList = res.data.data.data
      })
    }
  },
  mounted () {
    this.selectListReq()
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
