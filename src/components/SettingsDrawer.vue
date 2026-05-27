<template>
  <a-drawer
    title="系统设置"
    placement="right"
    :visible="visible"
    :width="340"
    @close="onClose"
    :mask-style="{ background: 'rgba(0, 0, 0, 0.15)' }"
  >
    <div class="drawer-body">
      <div class="setting-section">
        <h3 class="section-title">布局模式</h3>
        <div class="layout-picker">
          <div
            v-for="item in layoutOptions"
            :key="item.key"
            class="layout-item"
            :class="{ active: currentLayout === item.key }"
            @click="handleLayoutChange(item.key)"
          >
            <div class="layout-preview" :class="'preview-' + item.key">
              <div class="preview-header"></div>
              <div class="preview-body">
                <div v-if="item.key !== 'top'" class="preview-sidebar"></div>
                <div class="preview-content">
                  <div class="preview-line"></div>
                  <div class="preview-line short"></div>
                </div>
              </div>
            </div>
            <span class="layout-label">{{ item.label }}</span>
          </div>
        </div>
      </div>

      <a-divider class="section-divider" />

      <div class="setting-section">
        <h3 class="section-title">主题色</h3>
        <div class="theme-grid">
          <div
            v-for="item in themeList"
            :key="item.key"
            class="theme-item"
            :class="{ active: currentTheme === item.key }"
            @click="handleThemeChange(item.key)"
          >
            <span class="theme-color" :style="{ backgroundColor: item.color }">
              <a-icon v-if="currentTheme === item.key" type="check" />
            </span>
            <span class="theme-label">{{ item.label }}</span>
          </div>
        </div>
      </div>

      <a-divider class="section-divider" />

      <div class="setting-section">
        <h3 class="section-title">侧边栏</h3>
        <div class="setting-row">
          <div class="setting-info">
            <span class="setting-name">折叠侧边栏</span>
            <span class="setting-desc">收起侧边栏以获取更大的内容区域</span>
          </div>
          <a-switch :checked="collapsed" @change="handleCollapsedChange" />
        </div>
      </div>
    </div>
  </a-drawer>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getThemeList, applyTheme } from '../utils/theme'

export default {
  name: 'SettingsDrawer',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      layoutOptions: [
        { key: 'sidebar', label: '侧边栏' },
        { key: 'top', label: '顶部导航' },
        { key: 'mixed', label: '混合' },
      ],
      themeList: getThemeList(),
    }
  },
  computed: {
    ...mapState('app', ['layoutMode', 'theme', 'collapsed']),
    currentLayout() {
      return this.layoutMode
    },
    currentTheme() {
      return this.theme
    },
  },
  methods: {
    ...mapActions('app', ['setLayoutMode', 'setTheme', 'setCollapsed']),
    onClose() {
      this.$emit('close')
    },
    handleLayoutChange(key) {
      this.setLayoutMode(key)
    },
    handleThemeChange(key) {
      this.setTheme(key)
      applyTheme(key)
    },
    handleCollapsedChange(checked) {
      this.setCollapsed(checked)
    },
  },
}
</script>

<style lang="less" scoped>
.drawer-body {
  padding: 0 4px;
}

.setting-section {
  .section-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 16px;
  }
}

.section-divider {
  margin: 20px 0;
}

.layout-picker {
  display: flex;
  gap: 12px;

  .layout-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    padding: 8px;
    border: 2px solid var(--border-color-light);
    border-radius: 8px;
    transition: all 0.2s;
    flex: 1;

    &:hover {
      border-color: var(--primary-color-hover);
    }

    &.active {
      border-color: var(--primary-color);
      background-color: var(--primary-1);
    }

    .layout-preview {
      width: 100%;
      height: 64px;
      background: var(--bg-page);
      border-radius: 4px;
      overflow: hidden;
      border: 1px solid var(--border-color-light);

      .preview-header {
        height: 14px;
        background: var(--header-bg);
        border-bottom: 1px solid var(--header-border);
      }

      .preview-body {
        display: flex;
        height: calc(100% - 14px);

        .preview-sidebar {
          width: 28px;
          background: var(--sidebar-bg);
          flex-shrink: 0;
        }

        .preview-content {
          flex: 1;
          padding: 5px 6px;
          display: flex;
          flex-direction: column;
          gap: 3px;

          .preview-line {
            height: 3px;
            background: var(--primary-2);
            border-radius: 2px;

            &.short {
              width: 60%;
            }
          }
        }
      }

      &.preview-top .preview-body .preview-sidebar {
        display: none;
      }
    }

    .layout-label {
      font-size: 12px;
      color: var(--text-primary);
      font-weight: 500;
    }
  }
}

.theme-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;

  .theme-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 6px 0;
    cursor: pointer;
    border-radius: 6px;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f5f5f5;
    }

    &.active {
      background-color: var(--primary-1);
    }

    .theme-color {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      color: #fff;
      font-size: 14px;
    }

    .theme-label {
      font-size: 11px;
      color: var(--text-secondary);
    }
  }
}

.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .setting-info {
    display: flex;
    flex-direction: column;
    gap: 2px;

    .setting-name {
      font-size: 14px;
      font-weight: 500;
      color: var(--text-primary);
    }

    .setting-desc {
      font-size: 12px;
      color: var(--text-secondary);
    }
  }
}
</style>
