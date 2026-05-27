<template>
  <div id="app">
    <component :is="layoutComponent">
      <router-view />
    </component>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SidebarLayout from './layout/SidebarLayout.vue'
import TopLayout from './layout/TopLayout.vue'
import MixedLayout from './layout/MixedLayout.vue'

const layoutMap = {
  sidebar: SidebarLayout,
  top: TopLayout,
  mixed: MixedLayout,
}

export default {
  name: 'App',
  computed: {
    ...mapState('app', ['layoutMode']),
    layoutComponent() {
      const route = this.$route
      if (route.meta && route.meta.noLayout) {
        return 'router-view'
      }
      return layoutMap[this.layoutMode] || SidebarLayout
    },
  },
}
</script>

<style lang="less">
@import './styles/global.less';
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Segoe UI',
      'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
  }
}
</style>
