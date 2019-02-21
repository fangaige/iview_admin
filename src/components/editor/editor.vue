<template>
  <div class="editor-wrapper">
    <div style="width: 100%;height: 25px;"><Button @click="selectResouce" size="small" type="primary" icon="ios-cloud-upload-outline" style="float: right">插入资源</Button></div>
      <Modal
       :z-index="10002"
       ok-text="确认选择"
       width="1000px"
       v-model="modal1"
       title="请勾选你要的图片"
       @on-ok="ok">
          <files ref="files"></files>
      </Modal>
    <div :id="editorId"></div>
  </div>
</template>

<script>
import Editor from 'wangeditor'
import 'wangeditor/release/wangEditor.min.css'
import files from '@/view/files/files.vue'
// import { oneOf } from '@/libs/tools'
export default {
  components: {
    files
  },
  name: 'Editor',
  data () {
    return {
      modal1: false
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    /**
     * 绑定的值的类型, enum: ['html', 'text']
     */
    // valueType: {
    //   type: String,
    //   default: 'html',
    //   validator: (val) => {
    //     return oneOf(val, ['html', 'text'])
    //   }
    // },
    /**
     * @description 设置change事件触发时间间隔
     */
    changeInterval: {
      type: Number,
      default: 200
    }
    /**
     * @description 是否开启本地存储
     */
    // cache: {
    //   type: Boolean,
    //   default: true
    // }
  },
  computed: {
    editorId () {
      return `editor${this._uid}`
    }
  },
  methods: {
    setHtml (val) {
      this.editor.txt.html(val)
    },
    selectResouce () {
      this.modal1 = true
      this.$refs.files.cancelSelect() // 取消复选框勾选内容
    },
    ok () {
      this.$refs.files.selectedObj.forEach(element => {
        let addHtml = ''
        if (element.type === 'mp4') {
          addHtml = '<p><video controls="" preload="auto" src="' + element.path + '" data-setup="{}" autoplay="autoplay"><source src="' + element.path + '" type="video/mp4"></video></p>'
        } else {
          addHtml = '<img style="font-size: 14px; max-width: 100%;" src="' + element.path + '">'
        }
        this.editor.txt.append(addHtml)
      })
      this.editor.change()
    }
  },
  mounted () {
    this.editor = new Editor(`#${this.editorId}`)
    this.editor.customConfig.onchange = (html) => {
      let text = this.editor.txt.text()
      // if (this.cache) localStorage.editorCache = html
      // this.$emit('input', this.valueType === 'html' ? html : text)
      this.$emit('on-change', html, text)
    }
    // this.editor.customConfig.onchangeTimeout = this.changeInterval
    // create这个方法一定要在所有配置项之后调用
    this.editor.create()
    // 如果本地有存储加载本地存储内容
    // let html = this.value || localStorage.editorCache
    // if (html) this.editor.txt.html(html)
  }
}
</script>

<style lang="less">
// .editor-wrapper *{
//   z-index: 100 !important;
// }
</style>
