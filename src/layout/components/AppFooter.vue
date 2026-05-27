<template>
  <a-layout-footer class="app-footer">
    <p>&copy; 2026 Admin Pro. All rights reserved.</p>
  </a-layout-footer>
</template>

<script>
export default {
  name: 'AppFooter',
}
</script>

<style lang="less" scoped>
.app-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 0 16px;
  text-align: center;
  background: transparent;

  p {
    font-size: 12px;
    color: var(--text-placeholder);
    margin: 0;
  }
}
</style>
