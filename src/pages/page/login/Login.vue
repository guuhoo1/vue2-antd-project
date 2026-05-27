<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <div class="logo-area">
          <a-icon type="dashboard" class="logo-icon" />
          <h1 class="brand-name">Admin Pro</h1>
        </div>
        <p class="brand-desc">欢迎回来，请输入您的帐户信息</p>
      </div>

      <login-form
        @onSubmit="onSubmit"
        :loading="loading"
        ref="loginForm"
      />

      <div class="footer-text">
        <p>&copy; 2026 Admin Pro. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/services/user'
import { setAuthorization } from '@/utils/ajax/request'
import { mapMutations } from 'vuex'
import LoginForm from './LoginForm.vue'

export default {
  name: 'PageLogin',
  components: { LoginForm },
  data() {
    return {
      loading: false,
      loginRes: {},
    }
  },
  methods: {
    ...mapMutations('account', ['setUser', 'setPermissions', 'setRoles', 'setS4Pid', 'setRoutesConfig']),
    async onSubmit(loginForm) {
      if (this.loading) return
      this.loading = true
      try {
        const loginRes = await login(loginForm)
        setAuthorization({ token: loginRes.token })
        this.$router.push({ path: '/' })
      } catch (e) {
        this.$message.error('登录失败，请检查用户名和密码')
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="less" scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--bg-page);
  padding: 24px;
}

.login-card {
  width: 400px;
  max-width: 100%;
  padding: 40px 32px 24px;
  background: var(--bg-card);
  border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;

  .logo-area {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 8px;

    .logo-icon {
      font-size: 32px;
      color: var(--primary-color);
    }

    .brand-name {
      font-size: 24px;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }
  }

  .brand-desc {
    font-size: 14px;
    color: var(--text-secondary);
    margin: 0;
  }
}

.footer-text {
  margin-top: 24px;
  text-align: center;

  p {
    font-size: 12px;
    color: var(--text-placeholder);
    margin: 0;
  }
}
</style>
