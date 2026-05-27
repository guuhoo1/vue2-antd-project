# 后台管理系统 UI 设计规范（Vue3 + Ant Design Vue）

## 1. 设计理念

* 扁平化设计（Flat Design）
* 现代简洁（Minimal & Clean）
* 高可读性 + 高信息密度
* 强调留白与对齐

参考风格：

* Ant Design Pro
* Notion
* Linear

---

## 2. 技术栈

* Vue 3（Composition API）
* Vite
* Ant Design Vue
* Pinia
* Vue Router
* Tailwind CSS（仅用于布局与间距）

---

## 3. 颜色规范（Color System）

### 主色（Primary）

* `#1677FF`（品牌主色）
* 用于：按钮、链接、高亮元素

### 状态色

* 成功：`#52C41A`
* 警告：`#FAAD14`
* 错误：`#FF4D4F`

### 文本颜色

* 主文本：`#1F1F1F`
* 次文本：`#595959`
* 占位文本：`#BFBFBF`

### 背景色

* 页面背景：`#F5F7FA`
* 卡片背景：`#FFFFFF`

---

## 4. 间距规范（Spacing System）

采用 **8px 设计体系**

| 名称 | 值    |
| -- | ---- |
| xs | 4px  |
| sm | 8px  |
| md | 16px |
| lg | 24px |
| xl | 32px |

### Tailwind 示例

```html
<div class="p-4 m-4 gap-4"></div>
```

---

## 5. 字体规范（Typography）

| 类型   | 大小   | 权重  |
| ---- | ---- | --- |
| 页面标题 | 20px | 600 |
| 模块标题 | 16px | 500 |
| 正文   | 14px | 400 |
| 辅助文字 | 12px | 400 |

字体建议：

* 系统字体：`-apple-system, BlinkMacSystemFont`
* 中文：`PingFang SC`
* 英文：`Inter`

---

## 6. 布局规范（Layout）

### 标准后台结构

```
+----------------------+
| Header              |
+----------+----------+
| Sidebar  | Content  |
|          |          |
+----------+----------+
```

### Sidebar

* 宽度：200px
* 折叠宽度：80px

### Header

* 高度：56px
* 固定顶部

### Content

* 内边距：16px ~ 24px

---

## 7. 组件规范

### 按钮（Button）

* 主按钮：Primary
* 次按钮：Default
* 危险按钮：Danger

### 表格（Table）

* 使用 Ant Design Table
* 表头加粗
* 行 hover 高亮

### 表单（Form）

* Label 左对齐
* 表单项间距：16px

### 卡片（Card）

* 圆角：8px
* 阴影：轻微（避免过度）

---

## 8. 响应式设计

| 设备 | 方案             |
| -- | -------------- |
| PC | 标准布局           |
| 平板 | Sidebar 可折叠    |
| 手机 | Sidebar Drawer |

---

## 9. 交互规范

* Hover 必须有反馈
* 操作必须有 Loading 状态
* 删除操作需二次确认
* 表单提交有成功/失败提示

---

## 10. 禁止事项（避免 AI 风格）

❌ 过度渐变
❌ 花哨阴影
❌ 多主题混用
❌ 间距不统一
❌ 组件风格不一致

---

## 11. 技术约束

* Tailwind：只用于布局（margin / padding / flex）
* Ant Design：负责 UI 组件
* 不重复造组件
* 保持全局设计一致

---

## 12. 项目结构建议

```
src/
 ├── layout/        # 布局
 ├── views/         # 页面
 ├── components/    # 公共组件
 ├── store/         # Pinia
 ├── router/        # 路由
 ├── utils/         # 工具函数
 └── styles/        # 全局样式
```

---

## 13. Prompt（用于生成项目）

```text
你是一名资深前端架构师 + UI设计师，请基于 Vue3 + Vite + Ant Design Vue + Pinia + Tailwind CSS 创建一个企业级后台管理系统模板。

要求：
1. 扁平化设计，现代简洁风格
2. 避免 AI 风格（不要复杂渐变和浮夸阴影）
3. 使用统一设计规范（颜色 / 间距 / 字体）
4. 标准后台布局（Sidebar + Header + Content）
5. 支持响应式设计
6. Tailwind 仅用于布局
7. 组件统一使用 Ant Design Vue
8. 包含页面：
   - 登录页
   - Dashboard
   - 用户管理
   - 系统设置

输出：
- 项目结构
- 核心代码（Layout / 页面）
- 状态管理（Pinia）
- 路由设计
- 可扩展架构
```

---

## 14. 总结

目标：

* 统一（Consistency）
* 简洁（Simplicity）
* 可扩展（Scalability）
* 企业级（Professional）

该规范适用于所有后台管理系统开发。
