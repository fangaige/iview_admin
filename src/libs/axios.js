import axios from 'axios'
import store from '@/store'
import router from '@/router'
// import { Spin } from 'iview'
const addErrorLog = errorInfo => {
  const { statusText, status, request: { responseURL } } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      // 请求头里加上token
      if (store.state.user.token) {
        config.headers['Authorization'] = store.state.user.token
      }
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data, status } = res
      // 判断一下响应中是否有 token，如果有就直接使用此 token 替换掉本地的 token。你可以根据你的业务需求自己编写更新 token 的逻辑
      let token = res.headers.authorization
      if (token) {
        store.state.commit('setToken', token)
      }

      return { data, status }
    }, error => {
      console.log('error', error)
      this.destroy(url)
      // // 错误日志功能
      // let errorInfo = error.response
      // if (!errorInfo) {
      //   const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
      //   errorInfo = {
      //     statusText,
      //     status,
      //     request: { responseURL: config.url }
      //   }
      // }
      // addErrorLog(errorInfo)
      // 如果相响应状态401那么重新登陆
      if (error.response.status === 401) {
        router.push({
          name: 'login'
        })
        store.state.commit('setToken', '') 
        console.log('store.state.user.token', store.state.user.token)
      }

      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
