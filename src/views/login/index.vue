<template>
  <div class="login" :style="'background-image:url(' + BackgroundImg + ');'">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      label-position="left"
      label-width="0px"
      class="login-form"
    >
      <h3 class="title">Blog 后台管理系统</h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          auto-complete="off"
          placeholder="账号"
        >
          <template #prefix>
            <svg-icon icon="user" class="el-input__icon input-icon"></svg-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          show-password
          auto-complete="off"
          placeholder="密码"
          @keyup.enter="handleLogin"
        >
          <template #prefix>
            <svg-icon
              icon="password"
              class="el-input__icon input-icon"
            ></svg-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter="handleLogin"
        >
          <template #prefix>
            <svg-icon
              icon="validCode"
              class="el-input__icon input-icon"
            ></svg-icon>
          </template>
        </el-input>
        <div class="login-code" id="v_container">
          <!-- 前端验证码给当前div加一个id作为容器，后端验证码用img来显示后端生成的img -->
          <!-- <img :src="codeUrl" @click="getCode" /> -->
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin: 0 0 25px 0">
        记住我
      </el-checkbox>
      <el-form-item style="width: 100%">
        <el-button
          @click="handleLogin"
          :loading="loading"
          type="primary"
          style="width: 100%"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import store from '@/store'
import { ref, reactive, toRefs, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Cookies from 'js-cookie'
import Config from '@/utils/website'
import '@/utils/verificationCode'
import BackgroundImg from '@/assets/images/background.jpeg'

const router = useRouter()
const route = useRoute()

const loginFormRef = ref()
const loginForm = ref({
  username: '',
  password: '',
  rememberMe: false,
  code: ''
})
const loginRules = ref({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  code: [{ required: true, trigger: 'change', message: '验证码不能为空' }]
})
// todo 验证码
const codeUrl = ref('')
const codeInfo = ref(null)
const loading = ref(false)

const generateCode = () => {
  codeInfo.value = new GVerify('v_container')
}

// 处理登录
const handleLogin = () => {
  loginFormRef.value.validate(valid => {
    if (valid) {
      if (!codeInfo.value.validate(loginForm.value.code)) {
        ElMessage.error('验证码错误!')
        return
      }
      loading.value = true
      // Cookie存储密码和记住我
      if (loginForm.value.rememberMe) {
        Cookies.set('username', loginForm.value.username, {
          expires: Config.passCookieExpires
        })
        Cookies.set('password', loginForm.value.password, {
          expires: Config.passCookieExpires
        })
        Cookies.set('rememberMe', loginForm.value.rememberMe, {
          expires: Config.passCookieExpires
        })
      } else {
        Cookies.remove('username')
        Cookies.remove('password')
        Cookies.remove('rememberMe')
      }

      store
        .dispatch('user/login', loginForm.value)
        .then(result => {
          const { token } = result
          if (token == undefined) {
            ElMessage.warning(result)
            codeInfo.value.refresh()
          } else {
            ElMessage.success('验证成功!')
            router.push({ path: route.query.redirect || '/' })
          }
          loading.value = false
        })
        .catch(error => {
          ElMessage.error('登录失败!')
          loading.value = false
          codeInfo.value.refresh()
          console.error('login:', error)
        })
    } else {
      console.log('error submit!!')
      loading.value = false
      codeInfo.value.refresh()
      return false
    }
  })
}

const getCookie = () => {
  const username = Cookies.get('username')
  let password = Cookies.get('password')
  const rememberMe = Cookies.get('rememberMe')
  loginForm.value.username =
    username === undefined ? loginForm.value.username : username
  loginForm.value.password =
    username === undefined ? loginForm.value.password : password
  loginForm.value.rememberMe =
    username === undefined ? false : Boolean(rememberMe)
}

onMounted(() => {
  getCookie()
  generateCode()
})
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-size: cover;
}
.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 385px;
  padding: 25px 25px 5px 25px;
  .title {
    margin: 0 auto 30px auto;
    text-align: center;
    color: #707070;
  }
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  display: inline-block;
  height: 38px;
  float: right;
  margin-left: 5px;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
</style>
