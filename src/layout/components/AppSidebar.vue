<template>
  <a-layout-sider
    v-model="currentCollapsed"
    :trigger="null"
    collapsible
    :width="200"
    :collapsed-width="80"
    theme="dark"
    class="app-sidebar"
  >
    <div class="logo" :class="{ collapsed: currentCollapsed }">
      <a-icon type="dashboard" class="logo-icon" />
      <span v-if="!currentCollapsed" class="logo-text">Admin Pro</span>
    </div>

    <a-menu
      theme="dark"
      mode="inline"
      :selected-keys="selectedKeys"
      :default-open-keys="defaultOpenKeys"
      :inline-collapsed="currentCollapsed"
    >
      <template v-for="item in menuItems">
        <a-menu-item v-if="!item.children" :key="item.key">
          <router-link :to="item.path">
            <a-icon :type="item.icon" />
            <span>{{ item.label }}</span>
          </router-link>
        </a-menu-item>
        <a-sub-menu v-else :key="item.key">
          <span slot="title">
            <a-icon :type="item.icon" />
            <span>{{ item.label }}</span>
          </span>
          <a-menu-item v-for="child in item.children" :key="child.key">
            <router-link :to="child.path">
              <span>{{ child.label }}</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'AppSidebar',
  data() {
    return {
      menuItems: [
        { key: 'dashboard', label: '仪表盘', icon: 'dashboard', path: '/dashboard' },
        {
          key: 'user',
          label: '用户管理',
          icon: 'user',
          children: [
            { key: 'user-list', label: '用户列表', path: '/user/list' },
            { key: 'permission', label: '权限管理', path: '/user/permission' },
            { key: 'role', label: '角色管理', path: '/user/role' },
          ],
        },
        {
          key: 'content',
          label: '内容管理',
          icon: 'file-text',
          children: [
            { key: 'article', label: '文章管理', path: '/content/article' },
            { key: 'category', label: '分类管理', path: '/content/category' },
          ],
        },
        {
          key: 'product',
          label: '商品管理',
          icon: 'shopping-cart',
          children: [
            { key: 'product-list', label: '商品列表', path: '/product/list' },
            { key: 'product-category', label: '商品分类', path: '/product/category' },
          ],
        },
        {
          key: 'analytics',
          label: '数据分析',
          icon: 'bar-chart',
          children: [
            { key: 'overview', label: '概览', path: '/analytics/overview' },
            { key: 'reports', label: '报表', path: '/analytics/reports' },
          ],
        },
        { key: 'settings', label: '系统设置', icon: 'setting', path: '/settings' },
      ],
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
    selectedKeys() {
      const route = this.$route
      const matched = route.matched.filter((r) => r.path && r.path !== '/')
      return matched.map((r) => {
        const name = r.name || ''
        return name.toLowerCase()
      })
    },
    defaultOpenKeys() {
      const route = this.$route
      const matched = route.matched.filter((r) => r.path && r.path !== '/')
      if (matched.length > 1) {
        const parent = matched[matched.length - 2]
        return parent.name ? [parent.name.toLowerCase()] : []
      }
      return []
    },
  },
  methods: {
    ...mapMutations('app', ['SET_COLLAPSED']),
  },
}
</script>

<style lang="less" scoped>
.app-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 20;
  overflow: auto;
  background: var(--sidebar-bg) !important;

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 56px;
    gap: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    &.collapsed {
      flex-direction: column;
      gap: 0;
    }

    .logo-icon {
      font-size: 24px;
      color: var(--primary-color);
    }

    .logo-text {
      font-size: 18px;
      font-weight: 600;
      color: #fff;
      white-space: nowrap;
    }
  }

  .ant-menu-dark {
    background: transparent !important;
  }
}
</style>
