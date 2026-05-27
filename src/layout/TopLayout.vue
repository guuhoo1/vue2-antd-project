<template>
  <a-layout class="top-layout">
    <a-layout-header class="top-header">
      <div class="header-inner">
        <div class="logo-area">
          <a-icon type="dashboard" class="logo-icon" />
          <span class="logo-text">Admin Pro</span>
        </div>
        <app-header-menu />
        <div class="header-actions">
          <a-tooltip title="系统设置" placement="bottom">
            <a-button type="text" class="action-btn" @click="settingsVisible = true">
              <a-icon type="setting" />
            </a-button>
          </a-tooltip>
          <a-tooltip title="全屏" placement="bottom">
            <a-button type="text" class="action-btn" @click="toggleFullscreen">
              <a-icon :type="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" />
            </a-button>
          </a-tooltip>
          <a-dropdown placement="bottomRight">
            <div class="user-info">
              <a-avatar :size="32" icon="user" class="user-avatar" />
              <span class="user-name">管理员</span>
            </div>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-icon type="user" />
                <span>个人中心</span>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item @click="handleLogout">
                <a-icon type="logout" />
                <span>退出登录</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </div>
    </a-layout-header>
    <a-layout-content class="layout-content">
      <router-view />
    </a-layout-content>
    <app-footer />
    <settings-drawer :visible="settingsVisible" @close="settingsVisible = false" />
  </a-layout>
</template>

<script>
import { mapState } from 'vuex'
import AppHeaderMenu from './components/AppHeaderMenu.vue'
import AppFooter from './components/AppFooter.vue'
import SettingsDrawer from '../components/SettingsDrawer.vue'

export default {
  name: 'TopLayout',
  components: { AppHeaderMenu, AppFooter, SettingsDrawer },
  data() {
    return {
      isFullscreen: false,
      settingsVisible: false,
    }
  },
  computed: {
    ...mapState('app', ['collapsed']),
  },
  methods: {
    toggleFullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
        this.isFullscreen = true
      } else {
        document.exitFullscreen()
        this.isFullscreen = false
      }
    },
    handleLogout() {
      this.$confirm({
        title: '确认退出？',
        content: '确定要退出登录吗？',
        onOk: () => {
          this.$router.push('/login')
        },
      })
    },
  },
  mounted() {
    document.addEventListener('fullscreenchange', () => {
      this.isFullscreen = !!document.fullscreenElement
    })
  },
}
</script>

<style lang="less" scoped>
.top-layout {
  min-height: 100vh;
}

.top-header {
  height: 56px;
  padding: 0 16px;
  background: var(--header-bg);
  border-bottom: 1px solid var(--header-border);
  line-height: 56px;
  position: sticky;
  top: 0;
  z-index: 20;

  .header-inner {
    display: flex;
    align-items: center;
    height: 100%;
    max-width: 1400px;
    margin: 0 auto;
  }

  .logo-area {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-right: 24px;
    flex-shrink: 0;

    .logo-icon {
      font-size: 22px;
      color: var(--primary-color);
    }

    .logo-text {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-primary);
      white-space: nowrap;
    }
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-left: auto;
    flex-shrink: 0;
  }

  .action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    font-size: 18px;
    color: var(--text-secondary);
    border-radius: 50%;
    transition: all 0.2s;

    &:hover {
      color: var(--primary-color);
      background-color: var(--primary-1);
    }
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 12px;
    cursor: pointer;
    border-radius: 6px;
    height: 40px;
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--primary-1);
    }

    .user-avatar {
      background-color: var(--primary-color);
      flex-shrink: 0;
    }

    .user-name {
      font-size: 14px;
      color: var(--text-primary);
    }
  }
}

.layout-content {
  margin: 16px;
  min-height: calc(100vh - 56px - 48px - 32px);
}
</style>
