<template>
  <a-form-model ref="loginFormModel" :model="loginForm" :rules="rules" @keyup.enter.native="submitForm">
    <a-form-model-item prop="username">
      <a-input autocomplete="new-password" v-model="loginForm.username" placeholder="请输入用户名">
        <a-icon slot="suffix" type="user" />
      </a-input>
    </a-form-model-item>
    <a-form-model-item prop="password">
      <a-input-password autocomplete="new-password" v-model="loginForm.password" placeholder="请输入密码">
      </a-input-password>
    </a-form-model-item>
    <a-form-model-item>
      <a-button type="primary" :loading="loading" @click="submitForm" block>登录</a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
export default {
  name: 'LoginForm',
  props: ['onSubmit', 'logging', 'loading'],
  data() {
    const checkUsername = (rule, value, callback) => {
      if (value.length < 1) {
        return callback(new Error('请输入正确的用户名'))
      }
      callback()
    }
    const checkPassword = (rule, value, callback) => {
      if (value.length < 6) {
        return callback(new Error('请输入正确的密码'))
      }
      callback()
    }
    return {
      loginForm: {
        username: undefined,
        password: undefined,
      },
      rules: {
        username: [{ validator: checkUsername, trigger: 'blur' }],
        password: [{ validator: checkPassword, trigger: 'blur' }],
      },
    }
  },
  methods: {
    submitForm() {
      this.$refs.loginFormModel.validate((valid) => {
        if (valid) {
          this.$emit('onSubmit', this.loginForm)
        }
      })
    },
  },
}
</script>
