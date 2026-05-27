# Vue2 + Ant Design Vue 项目改造计划

## 改造目标

基于 `claude.md` 设计规范，将当前 Vue 2 后台管理系统改造为**支持 3 种布局模式 + 多种主题色切换**的企业级模板。

### 核心需求
1. **三种常规布局模式**：侧边栏布局、顶部导航布局、混合布局
2. **多种主题色切换**：支持动态切换主色（≥6 种预设色）
3. **遵循设计规范**：扁平化、现代简洁、统一间距/字体/颜色体系
4. **Vue 2 兼容**：将 claude.md 中 Vue 3 方案适配为 Vue 2 可用

---

## 技术难点与解决方案

### 难点 1：Ant Design Vue 1.x 无法在运行时动态切换 Less 主题变量
- **问题**：Ant Design Vue 1.x 的 Less 变量在编译时已确定，无法运行时修改
- **方案**：采用 **CSS Variables（CSS 自定义属性）** 方案
  - 定义主题色 CSS 变量体系，挂载到 `:root`
  - 编写 Ant Design 组件样式覆盖层，引用这些 CSS 变量
  - 切换主题时通过 JS 更新 `document.documentElement.style.setProperty()`
  - 主题偏好存入 `localStorage`，持久化

### 难点 2：三种布局模式需要动态切换且互不影响
- **问题**：布局切换不能导致页面状态丢失
- **方案**：布局抽象为高阶组件，使用 `<router-view>` 嵌套
  - 创建 3 个独立布局组件（SidebarLayout、TopLayout、MixedLayout）
  - Vuex 管理布局模式，`localStorage` 持久化
  - 布局组件作为路由的父级容器，页面组件作为子路由

### 难点 3：Tailwind CSS 集成到 Vue CLI 5 项目
- **问题**：需要安装并配置 Tailwind，且限制仅用于布局属性
- **方案**：安装 Tailwind CSS v3，通过 `postcss.config.js` 集成
  - 配置 `tailwind.config.js` 限制生成的工具类范围
  - 或使用 `@apply` 指令在 Less 中调用 Tailwind 布局类

### 难点 4：无状态管理，项目结构需要重构
- **问题**：当前只有 2 个页面，无 Vuex，扩展性差
- **方案**：引入 Vuex 3.x + 模块化 store，重构项目目录

---

## 改造计划（分步执行）

### 阶段一：基础设施搭建

#### 步骤 1.1 - 安装新依赖
- `vuex` (^3.6.2) — 状态管理
- `tailwindcss` (^3.x) — 布局工具（仅用于 margin/padding/flex/grid）
- `postcss` + `autoprefixer` — Tailwind 所需

#### 步骤 1.2 - 配置 Tailwind CSS
- 创建 `tailwind.config.js`，`purge` 配置指向 src 文件
- 创建 `postcss.config.js`，注册 tailwindcss 插件
- 在 `main.js` 中引入 Tailwind 基础样式（仅保留布局类）

#### 步骤 1.3 - 配置 Vuex 状态管理
- 创建 `src/store/index.js` — 组装所有模块
- 创建 `src/store/modules/app.js` — 应用状态（布局模式、主题色、侧边栏折叠状态）
- 创建 `src/store/modules/user.js` — 用户状态（用户信息、登录状态）
- 在 `main.js` 中注册 Vuex

#### 步骤 1.4 - 创建全局样式体系
- 创建 `src/styles/variables.less` — Less 变量（间距、字体、颜色规范围栏中的值）
- 创建 `src/styles/theme.css` — CSS 变量定义与主题色预设
- 创建 `src/styles/global.less` — 全局样式重置与公共类

---

### 阶段二：主题色系统实现

#### 步骤 2.1 - 定义主题色预设
预设 8 种主题色（参考 Ant Design 色板）：

| 主题名 | 主色 | 应用 |
|--------|------|------|
| `blue` | `#1677FF` | 默认品牌蓝 |
| `volcano` | `#FA541C` | 火山红 |
| `orange` | `#FA8C16` | 活力橙 |
| `gold` | `#FADB14` | 金色 |
| `green` | `#52C41A` | 翠绿 |
| `cyan` | `#13C2C2` | 青色 |
| `purple` | `#722ED1` | 典雅紫 |
| `magenta` | `#EB2F96` | 品红 |

每个主题定义完整的 CSS 变量体系（主色、悬浮色、点击色、背景色、边框色等）。

#### 步骤 2.2 - 实现主题切换机制
- 编写 `src/utils/theme.js` — 主题切换工具函数
  - `applyTheme(themeName)` — 切换 CSS 变量
  - `getThemeList()` — 返回主题列表
  - `initTheme()` — 从 localStorage 恢复主题
- 编写 Ant Design 组件样式覆盖（`src/styles/antd-overrides.less`）
  - 按钮、表格、菜单、标签、输入框等常用组件
  - 使用 CSS 变量覆盖默认颜色

#### 步骤 2.3 - 主题选择器 UI 组件
- 创建 `src/components/ThemePicker.vue`
  - 展示色块网格，点击选择主题
- 放置位置：Header 右侧用户下拉菜单附近

---

### 阶段三：三种布局模式实现

#### 步骤 3.1 - 创建布局组件目录结构
```
src/layout/
├── components/
│   ├── AppHeader.vue       # 通用头部（所有布局复用）
│   ├── AppSidebar.vue      # 通用侧边栏（侧边栏/混合布局复用）
│   ├── AppHeaderMenu.vue   # 顶部导航菜单（顶部/混合布局复用）
│   └── AppFooter.vue       # 通用页脚
├── SidebarLayout.vue       # 布局一：标准侧边栏（当前样式改造）
├── TopLayout.vue           # 布局二：顶部导航
└── MixedLayout.vue         # 布局三：混合布局
```

#### 步骤 3.2 - 通用组件开发
- **AppHeader.vue**：
  - 高度 56px，固定顶部
  - 左侧：布局切换按钮 / 侧边栏折叠按钮（根据布局模式决定）
  - 中间：面包屑导航
  - 右侧：主题选择器 + 全屏按钮 + 用户下拉菜单
- **AppSidebar.vue**：
  - 宽度 200px，折叠宽度 80px（遵循规范）
  - Logo 区域 + 导航菜单
  - 支持 `collapsed` 状态受控
- **AppHeaderMenu.vue**：
  - 顶部水平导航菜单
  - 支持多级菜单
  - 配合侧边栏使用（混合模式）

#### 步骤 3.3 - 三种布局实现
- **SidebarLayout.vue**（侧边栏布局）：
  ```
  +----------------------+
  | Header (56px)        |
  +----------+-----------+
  | Sidebar  | Content   |
  | (200px)  |           |
  +----------+-----------+
  | Footer               |
  +----------------------+
  ```
- **TopLayout.vue**（顶部导航布局）：
  ```
  +----------------------+
  | Header + Top Menu    |
  +----------------------+
  | Content              |
  |                      |
  +----------------------+
  | Footer               |
  +----------------------+
  ```
- **MixedLayout.vue**（混合布局）：
  ```
  +----------------------+
  | Header + Top Menu    |
  +----------+-----------+
  | Sidebar  | Content   |
  | (折叠80px)|           |
  +----------+-----------+
  | Footer               |
  +----------------------+
  ```

#### 步骤 3.4 - 布局切换机制
- Vuex `app.js` 中管理 `layoutMode` 状态
- App.vue 根据 `layoutMode` 动态渲染对应布局组件
- 布局切换按钮放在 Header 右侧，使用 `a-tooltip` 提示

---

### 阶段四：路由重构与页面改造

#### 步骤 4.1 - 路由配置重构
- 将现有扁平路由改为嵌套路由，布局组件作为父路由
- 添加路由懒加载（`() => import(...)`）
- 添加路由守卫（登录判断）

新路由结构：
```js
// 公开路由（无布局）
/login -> Login.vue

// 后台路由（嵌套在布局内）
/ -> 重定向到 /dashboard
/dashboard -> Dashboard.vue
/user/list -> UserList.vue
/user/permission -> Permission.vue
/user/role -> Role.vue
/settings -> Settings.vue
```

#### 步骤 4.2 - 现有页面改造（适配新设计规范）
- **App.vue**：改为动态布局容器
- **Dashboard.vue**：移除硬编码布局，改为纯内容页面，适配 CSS 变量主题
- **Login.vue**：按规范调整颜色/间距/字体
- 删除未使用的 `HelloWorld.vue`

#### 步骤 4.3 - 按规范调整样式
- 颜色：使用 CSS 变量替代硬编码颜色
- 间距：采用 8px 体系（规范第 4 节）
- 字体：按规范设置 20px/16px/14px/12px 层级
- 背景色：`#F5F7FA` 页面背景，`#FFFFFF` 卡片背景
- 圆角：8px 卡片圆角
- 去除渐变（规范第 10 节禁止事项）

---

### 阶段五：布局选择器与设置页面

#### 步骤 5.1 - 布局模式选择器
- 创建小部件展示 3 种布局预览图
- 点击即时切换布局
- 位置：Header 右侧或设置页面

#### 步骤 5.2 - 系统设置页面（新增）
- 创建 `src/views/Settings.vue`
- 功能：
  - 主题色选择（8 种预设）
  - 布局模式选择（3 种）
  - 侧边栏折叠状态
  - 设置持久化到 localStorage

---

## 文件变更清单

### 新增文件（共约 18 个）
```
src/
├── layout/
│   ├── components/
│   │   ├── AppHeader.vue
│   │   ├── AppSidebar.vue
│   │   ├── AppHeaderMenu.vue
│   │   └── AppFooter.vue
│   ├── SidebarLayout.vue
│   ├── TopLayout.vue
│   └── MixedLayout.vue
├── store/
│   ├── index.js
│   └── modules/
│       ├── app.js
│       └── user.js
├── styles/
│   ├── variables.less
│   ├── theme.css
│   ├── global.less
│   └── antd-overrides.less
├── utils/
│   └── theme.js
├── components/
│   └── ThemePicker.vue
├── views/
│   ├── Settings.vue
│   └── ... (新增业务页面按需添加)
├── tailwind.config.js
└── postcss.config.js
```

### 修改文件（共约 6 个）
```
src/main.js               — 注册 Vuex、全局样式、Tailwind
src/App.vue               — 改为动态布局容器
src/router/index.js       — 重构为嵌套路由 + 懒加载 + 路由守卫
src/views/Dashboard.vue   — 移除硬编码布局，适配 CSS 变量
src/views/Login.vue       — 按规范调整样式
vue.config.js             — 更新 Less 变量配置
```

### 删除文件（共约 1 个）
```
src/components/HelloWorld.vue   — 脚手架示例，未使用
```

---

## 需要确认的问题

1. **主题切换技术方案确认**：CSS Variables 覆盖方案 vs 多 CSS 文件主题方案？
   - 推荐 CSS Variables：轻量、无额外构建步骤、切换顺滑
2. **预设主题色数量**：8 种是否足够？是否需要自定义主题色功能？
3. **布局模式**：侧边栏 / 顶部导航 / 混合，3 种是否满足需求？
4. **状态管理**：使用 Vuex（Vue 2 原生支持）vs 尝试安装 Pinia（需额外适配）
   - 推荐 Vuex：稳定可靠，与 Vue 2 完美兼容
5. **Tailwind CSS**：是否需要安装，还是仅使用规范中定义的手写布局类？
   - 安装 Tailwind 但限制使用范围（仅布局）
