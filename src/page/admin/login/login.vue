<template>
  <div class="login_page fillcontain" :style="{'height':height}">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <div class="manage_tip">
          <p>elm后台管理系统</p>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      showLogin: false,
      height: '0rem'
    }
  },
  mounted () {
    this.showLogin = true
    // if (!this.adminInfo.id) {
    //  			this.getAdminData()
    //  		}
  },
  computed: {
    // ...mapState(['adminInfo']),
  },
  methods: {
    // ...mapActions(['getAdminData']),
    async submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await login({user_name: this.loginForm.username, password: this.loginForm.password})
          if (res.status === 0) {
            this.$toast(res.msg)
            this.$router.push('manage')
          } else {
            this.$toast(res.msg)
          }
        } else {
          this.$toast('用户名或密码错误')
          return false
        }
      })
    }
  },
  watch: {

  }
}
</script>

<style lang="stylus" scoped>
  .login_page
    background-color #324057
    height 100%
    .ss
     height 100%
    .form_contianer
      width 20rem
      height 13.125rem
      position absolute
      top 50%
      left 50%
      margin-top -20rem/2
      margin-left -13.125rem/2
      padding 25px
      border-radius 5px
      text-align center
      background-color #fff
      .manage_tip
        position absolute
        width 100%
        top -100px
        left 0
      .submit_btn
        width 100%
        font-size 16px
  >>>.tip
    font-size 12px
    color red
  >>>.form-fade-enter-active, .form-fade-leave-active
    transition all 1s
  >>>.form-fade-enter, .form-fade-leave-active
    transform translate3d(0, -50px, 0)
    opacity 0
</style>
