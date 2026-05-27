<template>
  <a-layout-header class="app-header" :class="{ 'header-sidebar': layoutMode !== 'top' }">
    <div class="header-left">
      <a-icon
        v-if="layoutMode === 'sidebar'"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        class="trigger"
        @click="toggleCollapsed"
      />
    </div>
    <div class="header-center">
      <a-breadcrumb>
        <a-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index">
          <router-link v-if="index < breadcrumbs.length - 1" :to="item.path">{{ item.name }}</router-link>
          <span v-else>{{ item.name }}</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="header-right">
      <a-tooltip title="系统设置" placement="bottom">
        <a-button type="text" class="header-action-btn" @click="settingsVisible = true">
          <a-icon type="setting" />
        </a-button>
      </a-tooltip>
      <a-tooltip title="全屏" placement="bottom">
        <a-button type="text" class="header-action-btn" @click="toggleFullscreen">
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
    <settings-drawer :visible="settingsVisible" @close="settingsVisible = false" />
  </a-layout-header>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SettingsDrawer from '../../components/SettingsDrawer.vue'

export default {
  name: 'AppHeader',
  components: { SettingsDrawer },
  data() {
    return {
      isFullscreen: false,
      settingsVisible: false,
    }
  },
  computed: {
    ...mapState('app', ['layoutMode', 'collapsed']),
    breadcrumbs() {
      const route = this.$route
      const matched = route.matched.filter((r) => r.path && r.path !== '/')
      return matched.map((r) => ({
        name: r.meta?.title || r.name || '',
        path: r.path,
      }))
    },
  },
  methods: {
    ...mapActions('app', ['toggleCollapsed']),
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
.app-header {
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 16px;
  background: var(--header-bg);
  border-bottom: 1px solid var(--header-border);
  line-height: 56px;
  z-index: 10;

  &.header-sidebar {
    position: sticky;
    top: 0;
  }

  .header-left {
    display: flex;
    align-items: center;
    min-width: 40px;

    .trigger {
      font-size: 18px;
      color: var(--text-secondary);
      cursor: pointer;
      transition: color 0.2s;

      &:hover {
        color: var(--primary-color);
      }
    }
  }

  .header-center {
    flex: 1;
    padding: 0 16px;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .header-action-btn {
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
</style>
