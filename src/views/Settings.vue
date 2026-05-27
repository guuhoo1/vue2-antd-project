<template>
  <div class="settings">
    <div class="page-header">
      <h2 class="page-title">系统设置</h2>
    </div>

    <a-card title="布局模式" class="settings-card">
      <p class="settings-desc">选择您偏好的后台布局模式</p>
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
    </a-card>

    <a-card title="主题色" class="settings-card">
      <p class="settings-desc">选择系统主色</p>
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
    </a-card>

    <a-card title="侧边栏" class="settings-card">
      <a-row type="flex" align="middle" justify="space-between">
        <div>
          <p class="settings-item-title">折叠侧边栏</p>
          <p class="settings-item-desc">收起侧边栏以获取更大的内容区域</p>
        </div>
        <a-switch :checked="collapsed" @change="handleCollapsedChange" />
      </a-row>
    </a-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getThemeList, applyTheme } from '../utils/theme'

export default {
  name: 'PageSettings',
  data() {
    return {
      layoutOptions: [
        { key: 'sidebar', label: '侧边栏布局', icon: 'menu-fold' },
        { key: 'top', label: '顶部导航布局', icon: 'menu-unfold' },
        { key: 'mixed', label: '混合布局', icon: 'appstore' },
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
    ...mapActions('app', ['setLayoutMode', 'setTheme', 'toggleCollapsed']),
    ...mapActions('app', ['setCollapsed']),
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
.settings {
  max-width: 900px;

  .page-header {
    margin-bottom: 24px;

    .page-title {
      font-size: 20px;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }
  }

  .settings-card {
    margin-bottom: 16px;
    border-radius: 8px;

    .settings-desc {
      font-size: 14px;
      color: var(--text-secondary);
      margin-bottom: 20px;
    }

    .settings-item-title {
      font-size: 14px;
      font-weight: 500;
      color: var(--text-primary);
      margin: 0 0 4px;
    }

    .settings-item-desc {
      font-size: 13px;
      color: var(--text-secondary);
      margin: 0;
    }
  }

  .layout-picker {
    display: flex;
    gap: 16px;

    .layout-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      padding: 12px;
      border: 2px solid var(--border-color-light);
      border-radius: 8px;
      transition: all 0.2s;

      &:hover {
        border-color: var(--primary-color-hover);
      }

      &.active {
        border-color: var(--primary-color);
        background-color: var(--primary-1);
      }

      .layout-preview {
        width: 120px;
        height: 80px;
        background: var(--bg-page);
        border-radius: 4px;
        overflow: hidden;
        border: 1px solid var(--border-color-light);

        .preview-header {
          height: 16px;
          background: var(--header-bg);
          border-bottom: 1px solid var(--header-border);
        }

        .preview-body {
          display: flex;
          height: calc(100% - 16px);

          .preview-sidebar {
            width: 32px;
            background: var(--sidebar-bg);
            flex-shrink: 0;
          }

          .preview-content {
            flex: 1;
            padding: 6px 8px;
            display: flex;
            flex-direction: column;
            gap: 4px;

            .preview-line {
              height: 4px;
              background: var(--primary-2);
              border-radius: 2px;

              &.short {
                width: 60%;
              }
            }
          }
        }

        &.preview-top {
          .preview-body .preview-sidebar {
            display: none;
          }
        }
      }

      .layout-label {
        font-size: 13px;
        color: var(--text-primary);
        font-weight: 500;
      }
    }
  }

  .theme-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;

    .theme-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      cursor: pointer;
      border: 2px solid transparent;
      border-radius: 8px;
      transition: all 0.2s;

      &:hover {
        border-color: var(--border-color);
      }

      &.active {
        border-color: var(--primary-color);
        background-color: var(--primary-1);
      }

      .theme-color {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        color: #fff;
        font-size: 16px;
      }

      .theme-label {
        font-size: 12px;
        color: var(--text-secondary);
      }
    }
  }
}
</style>
