<template>
  <a-menu
    mode="horizontal"
    :selected-keys="selectedKeys"
    class="app-header-menu"
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
</template>

<script>
export default {
  name: 'AppHeaderMenu',
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
    selectedKeys() {
      const route = this.$route
      const matched = route.matched.filter((r) => r.path && r.path !== '/')
      return matched.map((r) => {
        const name = r.name || ''
        return name.toLowerCase()
      })
    },
  },
}
</script>

<style lang="less" scoped>
.app-header-menu {
  flex: 1;
  border-bottom: none;
  line-height: 55px;
  background: transparent;

  .ant-menu-item,
  .ant-menu-submenu {
    a {
      color: var(--text-secondary);
    }

    &:hover a {
      color: var(--primary-color-hover);
    }
  }

  .ant-menu-item-selected a {
    color: var(--primary-color);
  }
}
</style>
