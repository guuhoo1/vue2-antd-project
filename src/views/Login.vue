<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <div class="logo-area">
          <a-icon type="dashboard" class="logo-icon" />
          <h1 class="brand-name">Admin Pro</h1>
        </div>
        <p class="brand-desc">现代化企业级管理系统</p>
      </div>

      <a-form :form="form" class="login-form" @submit="handleLogin">
        <a-form-item>
          <a-input
            v-decorator="['username', { rules: [{ required: true, message: '请输入用户名或邮箱' }] }]"
            placeholder="用户名或邮箱"
            size="large"
          >
            <a-icon type="user" slot="prefix" />
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-input
            v-decorator="['password', { rules: [{ required: true, message: '请输入密码' }] }]"
            type="password"
            placeholder="密码"
            size="large"
          >
            <a-icon type="lock" slot="prefix" />
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-row type="flex" justify="space-between" align="middle">
            <a-checkbox default-checked>记住我</a-checkbox>
            <a class="forgot-link">忘记密码？</a>
          </a-row>
        </a-form-item>

        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            block
            size="large"
            :loading="loading"
            class="login-btn"
          >
            {{ loading ? '登录中...' : '登 录' }}
          </a-button>
        </a-form-item>

        <div class="register-link">
          还没有账户？
          <a @click="handleSignup">立即注册</a>
        </div>
      </a-form>

      <div class="social-login">
        <div class="divider">
          <span>其他方式登录</span>
        </div>
        <div class="social-icons">
          <a-tooltip title="微信">
            <div class="social-icon wechat">
              <a-icon type="wechat" />
            </div>
          </a-tooltip>
          <a-tooltip title="支付宝">
            <div class="social-icon alipay">
              <a-icon type="alipay-circle" />
            </div>
          </a-tooltip>
          <a-tooltip title="GitHub">
            <div class="social-icon github">
              <a-icon type="github" />
            </div>
          </a-tooltip>
        </div>
      </div>

      <div class="footer-text">
        <p>&copy; 2026 Admin Pro. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      form: this.$form.createForm(this),
      loading: false,
    }
  },
  methods: {
    handleLogin(e) {
      e.preventDefault()
      this.form.validateFields((err) => {
        if (!err) {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            localStorage.setItem('token', 'mock-token-' + Date.now())
            this.$message.success('登录成功！')
            this.$router.push('/dashboard')
          }, 1500)
        }
      })
    },
    handleSignup() {
      this.$message.info('注册功能开发中...')
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

.login-form {
  .ant-input {
    height: 44px;
    border-radius: 6px;
  }

  .forgot-link {
    font-size: 13px;
  }

  .login-btn {
    height: 44px;
    border-radius: 6px;
    font-size: 16px;
  }
}

.register-link {
  text-align: center;
  font-size: 14px;
  color: var(--text-secondary);

  a {
    font-weight: 500;
  }
}

.social-login {
  margin-top: 24px;

  .divider {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
    color: var(--text-placeholder);
    font-size: 13px;

    &::before,
    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background-color: var(--border-color-light);
    }
  }

  .social-icons {
    display: flex;
    justify-content: center;
    gap: 16px;

    .social-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid var(--border-color-light);
      font-size: 20px;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        &.wechat { color: #07c160; border-color: #07c160; }
        &.alipay { color: #1677ff; border-color: #1677ff; }
        &.github { color: #1f1f1f; border-color: #1f1f1f; }
      }
    }
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
