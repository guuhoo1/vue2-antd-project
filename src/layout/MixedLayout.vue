<template>
  <a-layout class="mixed-layout">
    <a-layout-header class="mixed-header">
      <div class="header-inner">
        <div class="logo-area">
          <a-icon type="dashboard" class="logo-icon" />
          <span class="logo-text">Admin Pro</span>
        </div>
        <div class="top-menu">
          <div
            v-for="item in topMenuItems"
            :key="item.key"
            class="top-menu-item"
            :class="{ active: activeParent === item.key }"
            @click="handleTopMenuClick(item)"
          >
            <a-icon :type="item.icon" />
            <span>{{ item.label }}</span>
          </div>
        </div>
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
    <a-layout class="main-area">
      <a-layout-sider
        v-model="currentCollapsed"
        :trigger="null"
        collapsible
        :width="200"
        :collapsed-width="80"
        theme="dark"
        class="mixed-sidebar"
      >
        <div class="sidebar-header">
          <span class="sidebar-title">{{ sidebarTitle }}</span>
        </div>
        <a-menu
          v-if="sidebarItems.length > 0"
          theme="dark"
          mode="inline"
          :selected-keys="selectedKeys"
          :inline-collapsed="currentCollapsed"
        >
          <a-menu-item v-for="item in sidebarItems" :key="item.key">
            <router-link :to="item.path">
              <a-icon :type="item.icon" />
              <span>{{ item.label }}</span>
            </router-link>
          </a-menu-item>
        </a-menu>
        <div v-else class="sidebar-empty">
          <a-icon type="dashboard" />
          <span>仪表盘</span>
        </div>
      </a-layout-sider>
      <a-layout class="content-area">
        <a-layout-content class="layout-content">
          <router-view />
        </a-layout-content>
        <app-footer />
      </a-layout>
    </a-layout>
    <settings-drawer :visible="settingsVisible" @close="settingsVisible = false" />
  </a-layout>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import AppFooter from './components/AppFooter.vue'
import SettingsDrawer from '../components/SettingsDrawer.vue'

const menuConfig = [
  { key: 'dashboard', label: '仪表盘', icon: 'dashboard', path: '/dashboard' },
  {
    key: 'user',
    label: '用户管理',
    icon: 'user',
    children: [
      { key: 'user-list', label: '用户列表', icon: 'team', path: '/user/list' },
      { key: 'permission', label: '权限管理', icon: 'safety', path: '/user/permission' },
      { key: 'role', label: '角色管理', icon: 'audit', path: '/user/role' },
    ],
  },
  {
    key: 'content',
    label: '内容管理',
    icon: 'file-text',
    children: [
      { key: 'article', label: '文章管理', icon: 'file', path: '/content/article' },
      { key: 'category', label: '分类管理', icon: 'tags', path: '/content/category' },
    ],
  },
  {
    key: 'product',
    label: '商品管理',
    icon: 'shopping-cart',
    children: [
      { key: 'product-list', label: '商品列表', icon: 'shop', path: '/product/list' },
      { key: 'product-category', label: '商品分类', icon: 'appstore', path: '/product/category' },
    ],
  },
  {
    key: 'analytics',
    label: '数据分析',
    icon: 'bar-chart',
    children: [
      { key: 'overview', label: '概览', icon: 'line-chart', path: '/analytics/overview' },
      { key: 'reports', label: '报表', icon: 'file-text', path: '/analytics/reports' },
    ],
  },
  { key: 'settings', label: '系统设置', icon: 'setting', path: '/settings' },
]

export default {
  name: 'MixedLayout',
  components: { AppFooter, SettingsDrawer },
  data() {
    return {
      isFullscreen: false,
      settingsVisible: false,
      activeParent: 'dashboard',
    }
  },
  computed: {
    ...mapState('app', ['collapsed']),
    currentCollapsed: {
      get() {
        return this.collapsed
      },
      set(val) {
        this.SET_COLLAPSED(val)
      },
    },
    topMenuItems() {
      return menuConfig.map((item) => ({
        key: item.key,
        label: item.label,
        icon: item.icon,
        path: item.path,
        hasChildren: !!item.children,
      }))
    },
    sidebarItems() {
      const parent = menuConfig.find((item) => item.key === this.activeParent)
      if (parent && parent.children) {
        return parent.children
      }
      return []
    },
    sidebarTitle() {
      const parent = menuConfig.find((item) => item.key === this.activeParent)
      return parent ? parent.label : ''
    },
    selectedKeys() {
      const route = this.$route
      const matched = route.matched.filter((r) => r.path && r.path !== '/')
      return matched.map((r) => {
        const name = r.name || ''
        return name.toLowerCase()
      })
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        const matched = route.matched.filter((r) => r.path && r.path !== '/')
        if (matched.length > 0) {
          const routeName = matched[matched.length - 1].name || ''
          const name = routeName.toLowerCase()
          for (const item of menuConfig) {
            if (item.children) {
              const match = item.children.find((c) => c.key === name)
              if (match) {
                this.activeParent = item.key
                return
              }
            }
            if (item.path && route.path.startsWith(item.path) && item.key === name) {
              this.activeParent = item.key
              return
            }
          }
        }
      },
    },
  },
  methods: {
    ...mapActions('app', ['toggleCollapsed']),
    ...mapMutations('app', ['SET_COLLAPSED']),
    handleTopMenuClick(item) {
      const config = menuConfig.find((c) => c.key === item.key)
      this.activeParent = item.key
      if (config && config.children && config.children.length > 0) {
        this.$router.push(config.children[0].path).catch(() => {})
      } else if (config && config.path) {
        this.$router.push(config.path).catch(() => {})
      }
    },
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
.mixed-layout {
  min-height: 100vh;
}

.mixed-header {
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
  }

  .logo-area {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-right: 16px;
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

  .top-menu {
    display: flex;
    align-items: center;
    flex: 1;
    gap: 2px;
    overflow-x: auto;

    .top-menu-item {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 0 14px;
      height: 56px;
      font-size: 14px;
      color: var(--text-secondary);
      cursor: pointer;
      white-space: nowrap;
      border-bottom: 2px solid transparent;
      transition: all 0.2s;

      .anticon {
        font-size: 16px;
      }

      &:hover {
        color: var(--primary-color-hover);
        background-color: var(--primary-1);
      }

      &.active {
        color: var(--primary-color);
        border-bottom-color: var(--primary-color);
        font-weight: 500;
      }
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

.main-area {
  flex: 1;
  background: var(--bg-page);
}

.mixed-sidebar {
  background: var(--sidebar-bg) !important;
  overflow: auto;

  .ant-menu-dark {
    background: transparent !important;
  }

  .sidebar-header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    .sidebar-title {
      font-size: 13px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.65);
      letter-spacing: 1px;
    }
  }

  .sidebar-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 40px 0;
    color: rgba(255, 255, 255, 0.35);

    .anticon {
      font-size: 32px;
    }

    span {
      font-size: 14px;
    }
  }
}

.content-area {
  background: var(--bg-page);
}

.layout-content {
  margin: 16px;
  min-height: calc(100vh - 56px - 48px - 32px);
}
</style>
