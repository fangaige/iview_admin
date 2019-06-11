<template>
    <!-- <div>
      <Button @click="tiao">500</Button>
      <Button @click="hao">401</Button>
      <Button @click="lll">set</Button>
      <div>
        {{ $t('i18n-tip')}}
      </div>
    </div> -->
    <div class="layout">
    <Layout>
        <Sider ref="side1" hide-trigger collapsible :collapsed-width="0" v-model="isCollapsed">
            <Menu mode="vertical" theme="light" width="auto" active-name="1">
                <MenuItem name="1">
                    <Icon type="ios-paper" />
                    内容管理
                </MenuItem>
                <MenuItem name="2">
                    <Icon type="ios-people" />
                    用户管理
                </MenuItem>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="ios-stats" />
                        统计分析
                    </template>
                    <MenuGroup title="使用">
                        <MenuItem name="3-1">新增和启动</MenuItem>
                        <MenuItem name="3-2">活跃分析</MenuItem>
                        <MenuItem name="3-3">时段分析</MenuItem>
                    </MenuGroup>
                    <MenuGroup title="留存">
                        <MenuItem name="3-4">用户留存</MenuItem>
                        <MenuItem name="3-5">流失用户</MenuItem>
                    </MenuGroup>
                </Submenu>
                <MenuItem name="4">
                    <Icon type="ios-construct" />
                    综合设置
                </MenuItem>
            </Menu>
        </Sider>
        <Layout>
            <Header :style="{padding: 0}" class="layout-header-bar">
               <Icon v-if="isScreenWidth" @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
               <Row v-else type="flex" justify="center" align="middle" class="code-row-bg">
                   <i-col span="" style="background-color: pink">
                      <Menu mode="horizontal" theme="light" active-name="1">
                          <MenuItem name="1">
                              <Icon type="ios-paper" />
                              内容管理
                          </MenuItem>
                          <MenuItem name="2">
                              <Icon type="ios-people" />
                              用户管理
                          </MenuItem>
                          <Submenu name="3">
                              <template slot="title">
                                  <Icon type="ios-stats" />
                                  统计分析
                              </template>
                              <MenuGroup title="使用">
                                  <MenuItem name="3-1">新增和启动</MenuItem>
                                  <MenuItem name="3-2">活跃分析</MenuItem>
                                  <MenuItem name="3-3">时段分析</MenuItem>
                              </MenuGroup>
                              <MenuGroup title="留存">
                                  <MenuItem name="3-4">用户留存</MenuItem>
                                  <MenuItem name="3-5">流失用户</MenuItem>
                              </MenuGroup>
                          </Submenu>
                          <MenuItem name="4">
                              <Icon type="ios-construct" />
                              综合设置
                          </MenuItem>
                      </Menu>
                   </i-col>
               </Row>
            </Header>
            <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
              ContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContent
            </Content>
        </Layout>
    </Layout>
    </div>
</template>
<script>

export default {
  data () {
    return {
      isCollapsed: true,
      isScreenWidth: false,
      screenWidth: document.body.clientWidth
    }
  },
  computed: {
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ]
    },
    menuitemClasses () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  watch: {
    screenWidth (val) {
      this.screenWidth = val
      this.screenWidth >= 768 ? this.isScreenWidth = false : this.isScreenWidth = true
      console.log(val, this.isScreenWidth)
    }
  },
  methods: {
    collapsedSider () {
      this.$refs.side1.toggleCollapse()
    }
    // clientSize () {
    //   return document.body.offsetWidth >= 768 ? true : false
    // }
  },
  mounted () {
    console.log(document.body.clientWidth)
    // js监听窗口大小改变
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    }
    // 挂载先判断窗口大小
    document.body.clientWidth >= 768 ? this.isScreenWidth = false : this.isScreenWidth = true
  }
}
</script>
<style lang="less" scope>
 .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }

</style>
