import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './routers'
import store from '@/store'
import iView from 'iview'
import { setToken, getToken, setTitle } from '@/libs/util'
// import config from '@/config'
// const { homeName } = config

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history'
})
const LOGIN_PAGE_NAME = 'login'

// const turnTo = (to, access, next) => {
//   if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
//   else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
// }
// const rules = {
//   error_401: true,
//   error_500: true,
//   settings: true,
//   files: true,
//   all_site: true,
//   add_site: true,
//   product: true,
//   all_products: true,
//   add_products: true,
//   edit_products: true
// }
// const getAccesRouterList = (routerMap, rules) => {
//   return routerMap.filter(item => {
//     if (rules[item.name]) {
//       if (item.children) { item.children = getAccesRouterList(item.children, rules) }
//       return true
//     } else return false
//   })
// }
// const concatRoutes = (rules) => {
//   let routerList = []
//   // if (Object.entries(rules).every(item => item[1])) {
//   //   routerList = routerMap
//   // } else {
//   routerList = getAccesRouterList(routerMap, rules)
//   // }
//   const accessRouters = routerList.concat(routes)
//   store.state.app.accessRouters = accessRouters
//   console.log('routes', routes, 'routerList', routerList, 'accessRouters', accessRouters)
//   return routerList
// }

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getToken()
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  // } else if (token && to.name === LOGIN_PAGE_NAME) {
  //   // 已登录且要跳转的页面是登录页
  //   next({
  //     name: homeName // 跳转到homeName页
  //   })
  // } else if (token && to.name === 'home') {
  //   console.log('home来了')
  //   // concatRoutes(rules)
  //   next()
  } else {
    if (store.state.user.hasGetInfo) {
      // turnTo(to, store.state.user.access, next)
      next()
      console.log('登录跳')
    } else {
      console.log('没登录跳', router)
      // const routerList = concatRoutes(rules)
      // console.log('routerList', routerList)
      // router.addRoutes(routerList)
      // next()
      // concatRoutes(rules)
      // next({ ...to, replace: true })
      store.dispatch('getUserInfo').then(user => {
        // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
        // turnTo(to, user.access, next)
        console.log('getUserInfodatas', user)
        next({ path: to.path })
      }).catch(() => {
        setToken('')
        next({
          name: 'login'
        })
      })
    }
  }
})

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
