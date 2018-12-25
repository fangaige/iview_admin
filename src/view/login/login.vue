<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit" @on-img-click="imgClick"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'

export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo',
      'captcha',
    ]),
    handleSubmit ({ userName, password, captcha }) {

  console.log("name,password",userName, password,captcha,this.$store.state.user.catKey)
      this.handleLogin({ userName, password ,captcha}).then(res => {
        console.log("res",res,{userName, password,captcha})
        if(res.data.code === 10){
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          })
        })
        } else{
          this.$Message.error(res.data.msg);
        }

      }).catch(err=>{console.log(err)})
    },
    imgClick(){
         this.captcha().then(res => {
      console.log('captcha',this.$store.state.user.catKey)
      console.log('captchaimg',this.$store.state.user.captchaImg)
    })
    }
  },
  mounted(){
    this.captcha().then(res => {
      console.log('captcha',this.$store.state.user.catKey)
      console.log('captchaimg',this.$store.state.user.captchaImg)
    })
  }
}
</script>

<style>

</style>
