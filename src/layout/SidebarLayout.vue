<template>
  <a-layout class="sidebar-layout">
    <app-sidebar />
    <a-layout class="main-layout" :style="{ marginLeft: collapsed ? '80px' : '200px' }">
      <app-header />
      <a-layout-content class="layout-content">
        <router-view />
      </a-layout-content>
      <app-footer />
    </a-layout>
  </a-layout>
</template>

<script>
import { mapState } from 'vuex'
import AppSidebar from './components/AppSidebar.vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'SidebarLayout',
  components: { AppSidebar, AppHeader, AppFooter },
  computed: {
    ...mapState('app', ['collapsed']),
  },
}
</script>

<style lang="less" scoped>
.sidebar-layout {
  min-height: 100vh;

  .main-layout {
    min-height: 100vh;
    transition: margin-left 0.2s;
    background: var(--bg-page);
  }

  .layout-content {
    margin: 16px;
    min-height: calc(100vh - 56px - 48px - 32px);
  }
}
</style>
