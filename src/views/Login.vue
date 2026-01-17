<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="login-left">
        <div class="gradient-bg"></div>
        <div class="content-box">
          <div class="icon-wrapper">
            <a-icon type="rocket" class="main-icon" />
          </div>
          <h1 class="title">Admin Pro</h1>
          <p class="subtitle">现代化企业级管理系统</p>
          <div class="features">
            <div class="feature-item">
              <a-icon type="check-circle" class="feature-icon" />
              <span>响应式设计</span>
            </div>
            <div class="feature-item">
              <a-icon type="check-circle" class="feature-icon" />
              <span>高性能应用</span>
            </div>
            <div class="feature-item">
              <a-icon type="check-circle" class="feature-icon" />
              <span>安全可靠</span>
            </div>
          </div>
        </div>
      </div>

      <div class="login-right">
        <div class="form-wrapper">
          <div class="form-header">
            <h2>欢迎回来</h2>
            <p>使用您的账户登录系统</p>
          </div>

          <a-form
            :form="form"
            class="login-form"
            @submit="handleLogin"
          >
            <a-form-item>
              <a-input
                v-decorator="['username', { rules: [{ required: true, message: '请输入用户名或邮箱' }] }]"
                placeholder="用户名或邮箱"
                size="large"
                class="form-input"
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
                class="form-input"
              >
                <a-icon type="lock" slot="prefix" />
              </a-input>
            </a-form-item>

            <div class="form-options">
              <a-checkbox v-decorator="['remember', { valuePropName: 'checked', initialValue: true }]">
                记住我
              </a-checkbox>
              <a href="#" class="forgot-password">忘记密码?</a>
            </div>

            <a-form-item>
              <a-button
                type="primary"
                html-type="submit"
                class="login-button"
                size="large"
                :loading="loading"
                block
              >
                {{ loading ? '登录中...' : '登录' }}
              </a-button>
            </a-form-item>

            <div class="form-footer">
              <span>还没有账户?</span>
              <a href="#" @click.prevent="handleSignup" class="signup-link">立即注册</a>
            </div>
          </a-form>

          <div class="divider">或使用以下方式登录</div>

          <div class="social-login">
            <a-button class="social-btn wechat">
              <a-icon type="wechat" />
            </a-button>
            <a-button class="social-btn alipay">
              <a-icon type="alipay" />
            </a-button>
            <a-button class="social-btn github">
              <a-icon type="github" />
            </a-button>
          </div>
        </div>

        <div class="bottom-info">
          <p>&copy; 2026 Admin Pro. All rights reserved.</p>
        </div>
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
      loading: false
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
            this.$message.success('登录成功！')
            this.$router.push('/dashboard')
          }, 1500)
        }
      })
    },
    handleSignup() {
      this.$message.info('注册功能开发中...')
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f5f7fa;

  .login-wrapper {
    display: flex;
    width: 100%;
    max-width: 1200px;
    height: 600px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    overflow: hidden;

    .login-left {
      flex: 1;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;

      .gradient-bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
          radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
      }

      .content-box {
        position: relative;
        z-index: 1;
        text-align: center;
        color: white;

        .icon-wrapper {
          margin-bottom: 24px;

          .main-icon {
            font-size: 64px;
            animation: float 3s ease-in-out infinite;
          }
        }

        .title {
          margin: 0;
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .subtitle {
          margin: 0;
          font-size: 14px;
          opacity: 0.9;
          margin-bottom: 40px;
        }

        .features {
          display: flex;
          flex-direction: column;
          gap: 12px;

          .feature-item {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 14px;
            opacity: 0.95;

            .feature-icon {
              font-size: 16px;
            }
          }
        }
      }

      @keyframes float {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-20px);
        }
      }
    }

    .login-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 40px 50px;
      justify-content: space-between;

      .form-wrapper {
        .form-header {
          margin-bottom: 40px;

          h2 {
            margin: 0 0 8px 0;
            font-size: 28px;
            font-weight: 700;
            color: #333;
          }

          p {
            margin: 0;
            font-size: 14px;
            color: #999;
          }
        }

        .login-form {
          .form-input {
            border-radius: 8px;
            border: 1px solid #e8e8e8;
            transition: all 0.3s;

            ::v-deep .ant-input {
              font-size: 14px;
              padding: 10px 15px;
            }

            &:hover {
              border-color: #667eea;
            }

            &:focus {
              border-color: #667eea;
              box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
            }
          }

          .ant-form-item {
            margin-bottom: 20px;
          }

          .form-options {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
            font-size: 13px;

            .forgot-password {
              color: #667eea;

              &:hover {
                color: #764ba2;
              }
            }
          }

          .login-button {
            width: 100%;
            height: 40px;
            font-size: 16px;
            font-weight: 600;
            border-radius: 8px;
            border: none;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            transition: all 0.3s;

            &:hover {
              opacity: 0.9;
              transform: translateY(-2px);
              box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
            }

            ::v-deep {
              .ant-btn {
                background: transparent;
              }
            }
          }

          .form-footer {
            text-align: center;
            font-size: 13px;
            margin-top: 20px;
            color: #666;

            .signup-link {
              color: #667eea;
              font-weight: 600;
              margin-left: 4px;

              &:hover {
                color: #764ba2;
              }
            }
          }
        }

        .divider {
          text-align: center;
          font-size: 12px;
          color: #999;
          margin: 24px 0;
          position: relative;

          &::before,
          &::after {
            content: '';
            position: absolute;
            top: 50%;
            width: calc(50% - 40px);
            height: 1px;
            background: #e8e8e8;
          }

          &::before {
            left: 0;
          }

          &::after {
            right: 0;
          }
        }

        .social-login {
          display: flex;
          gap: 12px;
          justify-content: center;

          .social-btn {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 1px solid #e8e8e8;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
            font-size: 18px;

            &:hover {
              border-color: #667eea;
              color: #667eea;
            }

            &.wechat:hover {
              background: #09b83e;
              color: white;
              border-color: #09b83e;
            }

            &.alipay:hover {
              background: #1890ff;
              color: white;
              border-color: #1890ff;
            }

            &.github:hover {
              background: #333;
              color: white;
              border-color: #333;
            }
          }
        }
      }

      .bottom-info {
        text-align: center;
        font-size: 12px;
        color: #ccc;

        p {
          margin: 0;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .login-container {
    .login-wrapper {
      flex-direction: column;
      height: auto;

      .login-left {
        height: 200px;

        .content-box {
          .title {
            font-size: 24px;
          }

          .features {
            display: none;
          }
        }
      }

      .login-right {
        padding: 30px 20px;

        .form-wrapper {
          .form-header {
            margin-bottom: 20px;

            h2 {
              font-size: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
