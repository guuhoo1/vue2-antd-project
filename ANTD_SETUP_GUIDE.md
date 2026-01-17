# Ant Design Vue 1.7.8 项目初始化指南

## 已完成的配置

### 1. package.json 已更新
- ✅ 添加了 `ant-design-vue@1.7.8`
- ✅ 添加了 `babel-plugin-import@^1.13.6`（用于按需引入）

### 2. babel.config.js 已配置
- ✅ 配置了 babel-plugin-import 插件
- ✅ 设置自动按需引入样式

### 3. main.js 已初始化
- ✅ 提供了组件使用示例（注释形式）

## 后续步骤

### 1. 安装依赖
```bash
npm install
# 或
yarn install
```

### 2. 在 main.js 中按需引入组件

示例：引入 Button 和 Form 组件
```javascript
import Vue from 'vue'
import App from './App.vue'
import { Button, Form, FormItem, Input } from 'ant-design-vue'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

new Vue({
  render: h => h(App),
}).$mount('#app')
```

### 3. 常用组件引入列表

```javascript
import { 
  Button,           // 按钮
  Form,             // 表单
  FormItem,         // 表单项
  Input,            // 输入框
  Select,           // 选择器
  Table,            // 表格
  Layout,           // 布局
  Menu,             // 菜单
  Pagination,       // 分页
  Message,          // 消息提示
  Modal,            // 弹窗
  DatePicker,       // 日期选择
  TimePicker,       // 时间选择
  Row,              // 行
  Col,              // 列
  Card,             // 卡片
  Tag,              // 标签
  Icon,             // 图标
  Spin,             // 加载
  Tooltip,          // 提示框
  Popover           // 气泡框
} from 'ant-design-vue'
```

### 4. 在 Vue 组件中使用

**模板中：**
```vue
<template>
  <a-button type="primary">按钮</a-button>
</template>
```

**访问 Message：**
```javascript
this.$message.success('成功提示')
this.$message.error('错误提示')
this.$message.warning('警告提示')
this.$message.info('信息提示')
```

## 按需引入原理

babel-plugin-import 插件会自动：
1. 将 `import { Button } from 'ant-design-vue'` 转换为 `import Button from 'ant-design-vue/es/button'`
2. 自动引入相关样式文件
3. 减少打包体积

## 启动项目

配置完成后运行：
```bash
npm run serve
# 或
yarn serve
```

## 版本信息

- ant-design-vue: 1.7.8
- Vue: 2.6.14
- Node.js: 需要 >=10.0.0
