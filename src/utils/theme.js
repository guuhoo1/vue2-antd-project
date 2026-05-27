const themeList = [
  { key: 'blue', label: '默认蓝', color: '#1677ff' },
  { key: 'volcano', label: '火山红', color: '#fa541c' },
  { key: 'orange', label: '活力橙', color: '#fa8c16' },
  { key: 'gold', label: '金色', color: '#fadb14' },
  { key: 'green', label: '翠绿', color: '#52c41a' },
  { key: 'cyan', label: '青色', color: '#13c2c2' },
  { key: 'purple', label: '典雅紫', color: '#722ed1' },
  { key: 'magenta', label: '品红', color: '#eb2f96' },
]

function applyTheme(themeKey) {
  const root = document.documentElement
  root.className = themeKey === 'blue' ? '' : 'theme-' + themeKey
}

function getThemeList() {
  return themeList
}

function initTheme(savedTheme) {
  const theme = savedTheme || localStorage.getItem('theme') || 'blue'
  applyTheme(theme)
  return theme
}

export { applyTheme, getThemeList, initTheme }
