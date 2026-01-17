<template>
  <a-layout class="dashboard-layout">
    <a-layout-sider
      v-model="collapsed"
      :trigger="null"
      collapsible
      width="256"
      theme="dark"
      class="sidebar"
    >
      <div class="logo">
        <a-icon v-if="!collapsed" type="dashboard" class="logo-icon" />
        <span v-if="!collapsed" class="logo-text">Admin</span>
      </div>

      <a-menu
        theme="dark"
        mode="inline"
        :default-selected-keys="['1']"
        :default-open-keys="['sub1']"
        :inline-collapsed="collapsed"
      >
        <a-menu-item key="1">
          <a-icon type="dashboard" />
          <span>仪表盘</span>
        </a-menu-item>

        <a-sub-menu key="sub1">
          <span slot="title">
            <a-icon type="user" />
            <span>用户管理</span>
          </span>
          <a-menu-item key="2">用户列表</a-menu-item>
          <a-menu-item key="3">权限管理</a-menu-item>
          <a-menu-item key="4">角色管理</a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="sub2">
          <span slot="title">
            <a-icon type="file" />
            <span>内容管理</span>
          </span>
          <a-menu-item key="5">文章列表</a-menu-item>
          <a-menu-item key="6">分类管理</a-menu-item>
          <a-menu-item key="7">标签管理</a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="sub3">
          <span slot="title">
            <a-icon type="shopping-cart" />
            <span>商品管理</span>
          </span>
          <a-menu-item key="8">商品列表</a-menu-item>
          <a-menu-item key="9">分类管理</a-menu-item>
          <a-menu-item key="10">库存管理</a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="sub4">
          <span slot="title">
            <a-icon type="bar-chart" />
            <span>数据分析</span>
          </span>
          <a-menu-item key="11">销售数据</a-menu-item>
          <a-menu-item key="12">用户数据</a-menu-item>
          <a-menu-item key="13">流量分析</a-menu-item>
        </a-sub-menu>

        <a-menu-item key="14">
          <a-icon type="setting" />
          <span>系统设置</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout class="main-layout">
      <a-layout-header class="header">
        <a-icon
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          class="trigger"
          @click="collapsed = !collapsed"
        />

        <div class="header-right">
          <a-dropdown>
            <a slot="overlay">
              <a-menu>
                <a-menu-item key="0">
                  <a href="#">个人资料</a>
                </a-menu-item>
                <a-menu-item key="1">
                  <a href="#">设置</a>
                </a-menu-item>
                <a-divider />
                <a-menu-item key="2" @click="handleLogout">
                  <a href="#">退出登录</a>
                </a-menu-item>
              </a-menu>
            </a>
            <a-button type="link" size="large">
              <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              <span class="user-name">张三</span>
            </a-button>
          </a-dropdown>
        </div>
      </a-layout-header>

      <a-layout-content class="content">
        <div class="breadcrumb">
          <a-breadcrumb>
            <a-breadcrumb-item href="/">首页</a-breadcrumb-item>
            <a-breadcrumb-item>仪表盘</a-breadcrumb-item>
          </a-breadcrumb>
        </div>

        <div class="content-inner">
          <a-row :gutter="[24, 24]">
            <a-col :xs="24" :sm="12" :lg="6">
              <div class="stat-card card-blue">
                <div class="stat-content">
                  <div class="stat-info">
                    <p class="stat-label">总用户数</p>
                    <p class="stat-value">8,846</p>
                  </div>
                  <a-icon type="user" class="stat-icon" />
                </div>
                <div class="stat-footer">
                  <span class="stat-trend">
                    <a-icon type="arrow-up" />
                    12% 增长
                  </span>
                </div>
              </div>
            </a-col>

            <a-col :xs="24" :sm="12" :lg="6">
              <div class="stat-card card-green">
                <div class="stat-content">
                  <div class="stat-info">
                    <p class="stat-label">总订单数</p>
                    <p class="stat-value">9,280</p>
                  </div>
                  <a-icon type="shopping-cart" class="stat-icon" />
                </div>
                <div class="stat-footer">
                  <span class="stat-trend">
                    <a-icon type="arrow-up" />
                    8% 增长
                  </span>
                </div>
              </div>
            </a-col>

            <a-col :xs="24" :sm="12" :lg="6">
              <div class="stat-card card-orange">
                <div class="stat-content">
                  <div class="stat-info">
                    <p class="stat-label">总收益</p>
                    <p class="stat-value">¥84,820</p>
                  </div>
                  <a-icon type="dollar" class="stat-icon" />
                </div>
                <div class="stat-footer">
                  <span class="stat-trend">
                    <a-icon type="arrow-up" />
                    15% 增长
                  </span>
                </div>
              </div>
            </a-col>

            <a-col :xs="24" :sm="12" :lg="6">
              <div class="stat-card card-red">
                <div class="stat-content">
                  <div class="stat-info">
                    <p class="stat-label">活跃用户</p>
                    <p class="stat-value">2,408</p>
                  </div>
                  <a-icon type="fire" class="stat-icon" />
                </div>
                <div class="stat-footer">
                  <span class="stat-trend">
                    <a-icon type="arrow-up" />
                    5% 增长
                  </span>
                </div>
              </div>
            </a-col>
          </a-row>

          <a-row :gutter="[24, 24]" style="margin-top: 24px">
            <a-col :xs="24" :lg="14">
              <a-card class="chart-card" :bordered="false">
                <div slot="title" class="card-title">
                  <a-icon type="bar-chart" />
                  <span>销售趋势</span>
                </div>
                <div class="chart-placeholder">
                  <p>📊 销售数据可视化图表</p>
                  <p style="font-size: 12px; color: #999">（支持接入 ECharts）</p>
                </div>
              </a-card>
            </a-col>

            <a-col :xs="24" :lg="10">
              <a-card class="chart-card" :bordered="false">
                <div slot="title" class="card-title">
                  <a-icon type="pie-chart" />
                  <span>用户分布</span>
                </div>
                <div class="chart-placeholder">
                  <p>🎯 用户分布数据</p>
                  <p style="font-size: 12px; color: #999">（支持接入 ECharts）</p>
                </div>
              </a-card>
            </a-col>
          </a-row>

          <a-row :gutter="[24, 24]" style="margin-top: 24px">
            <a-col :xs="24">
              <a-card class="chart-card" :bordered="false">
                <div slot="title" class="card-title">
                  <a-icon type="unordered-list" />
                  <span>最近订单</span>
                </div>
                <a-table
                  :columns="tableColumns"
                  :data-source="tableData"
                  :pagination="{ pageSize: 5 }"
                  size="middle"
                  :scroll="{ x: 800 }"
                >
                  <span slot="status" slot-scope="text" :class="`status-${text}`">
                    <a-icon :type="text === '已完成' ? 'check-circle' : 'clock-circle'" />
                    {{ text }}
                  </span>
                </a-table>
              </a-card>
            </a-col>
          </a-row>
        </div>
      </a-layout-content>

      <a-layout-footer class="footer">
        <p>&copy; 2026 Admin Dashboard System. All rights reserved.</p>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  name: 'AdminDashboard',
  data() {
    return {
      collapsed: false,
      tableColumns: [
        {
          title: '订单号',
          dataIndex: 'orderNo',
          key: 'orderNo',
          width: 150
        },
        {
          title: '客户',
          dataIndex: 'customer',
          key: 'customer',
          width: 120
        },
        {
          title: '金额',
          dataIndex: 'amount',
          key: 'amount',
          width: 100
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' },
          width: 100
        },
        {
          title: '时间',
          dataIndex: 'time',
          key: 'time',
          width: 150
        }
      ],
      tableData: [
        {
          key: '1',
          orderNo: 'ORD20260117001',
          customer: '张三',
          amount: '¥1,250',
          status: '已完成',
          time: '2026-01-17 10:20'
        },
        {
          key: '2',
          orderNo: 'ORD20260117002',
          customer: '李四',
          amount: '¥3,600',
          status: '已完成',
          time: '2026-01-17 09:15'
        },
        {
          key: '3',
          orderNo: 'ORD20260117003',
          customer: '王五',
          amount: '¥2,800',
          status: '进行中',
          time: '2026-01-17 08:45'
        },
        {
          key: '4',
          orderNo: 'ORD20260117004',
          customer: '赵六',
          amount: '¥920',
          status: '已完成',
          time: '2026-01-17 07:30'
        },
        {
          key: '5',
          orderNo: 'ORD20260117005',
          customer: '孙七',
          amount: '¥5,200',
          status: '已完成',
          time: '2026-01-17 06:20'
        }
      ]
    }
  },
  methods: {
    handleLogout() {
      this.$message.success('已退出登录')
      this.$router.push('/login')
    }
  }
}
</script>


<style lang="less" scoped>
.dashboard-layout {
  min-height: 100vh;
  background: linear-gradient(120deg, #f6faff 0%, #e9f0fb 100%);

  .sidebar {
    box-shadow: 2px 0 16px rgba(0, 21, 41, 0.08);
    background: linear-gradient(180deg, #001529 60%, #1890ff 100%);
    border-right: none;

    .logo {
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: 2px;
      background: linear-gradient(90deg, #001529 60%, #1890ff 100%);
      border-bottom: 1px solid rgba(255,255,255,0.08);

      .logo-icon {
        font-size: 28px;
        margin-right: 10px;
        animation: spin 16s linear infinite;
      }
      .logo-text {
        margin-left: 8px;
        font-size: 20px;
        font-weight: 600;
        letter-spacing: 1px;
      }
    }

    ::v-deep .ant-menu {
      background: transparent;
      border-right: none;
      font-size: 16px;
      .ant-menu-item,
      .ant-menu-submenu {
        border-radius: 6px;
        margin: 0 8px;
        transition: background 0.3s;
        &:hover {
          background: rgba(24, 144, 255, 0.12);
        }
      }
      .ant-menu-item-selected {
        background: linear-gradient(90deg, #1890ff 60%, #52c41a 100%) !important;
        color: #fff !important;
        box-shadow: 0 2px 8px rgba(24, 144, 255, 0.08);
      }
    }
  }

  .main-layout {
    flex: 1;

    .header {
      background: #fff;
      padding: 0 32px;
      box-shadow: 0 2px 12px rgba(24, 144, 255, 0.08);
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #f0f0f0;

      .trigger {
        font-size: 20px;
        line-height: 64px;
        cursor: pointer;
        transition: all 0.3s;
        color: #1890ff;
        &:hover {
          color: #52c41a;
          transform: scale(1.12);
        }
      }

      .header-right {
        display: flex;
        align-items: center;
        gap: 8px;
        ::v-deep .ant-btn {
          border: none;
          background: transparent;
          padding: 0 12px;
          &:hover {
            background: #f0f5ff;
          }
        }
        .user-name {
          margin-left: 8px;
          font-size: 15px;
          color: #333;
          font-weight: 600;
        }
      }
    }

    .content {
      background: transparent;
      padding: 32px 32px 0 32px;
      min-height: calc(100vh - 128px);

      .breadcrumb {
        margin-bottom: 24px;
        ::v-deep .ant-breadcrumb-link {
          color: #888;
          &:hover {
            color: #1890ff;
          }
        }
      }

      .content-inner {
        .stat-card {
          border-radius: 18px;
          border: none;
          box-shadow: 0 4px 24px rgba(24, 144, 255, 0.08);
          padding: 28px 24px 18px 24px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s;
          background: #fff;
          margin-bottom: 8px;
          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, transparent, rgba(24, 144, 255, 0.06));
            pointer-events: none;
          }
          &:hover {
            transform: translateY(-6px) scale(1.02);
            box-shadow: 0 12px 32px rgba(24, 144, 255, 0.16);
          }
          .stat-content {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 12px;
            .stat-info {
              .stat-label {
                margin: 0;
                font-size: 14px;
                color: #888;
                font-weight: 500;
              }
              .stat-value {
                margin: 8px 0 0 0;
                font-size: 32px;
                font-weight: 800;
                color: #222;
                letter-spacing: 1px;
              }
            }
            .stat-icon {
              font-size: 36px;
              opacity: 0.9;
              filter: drop-shadow(0 2px 8px rgba(24, 144, 255, 0.12));
            }
          }
          .stat-footer {
            .stat-trend {
              display: inline-flex;
              align-items: center;
              gap: 4px;
              font-size: 13px;
              font-weight: 600;
              color: #1890ff;
            }
          }
          &.card-blue {
            background: linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%);
            border-left: 5px solid #1890ff;
            .stat-icon { color: #1890ff; }
            .stat-trend { color: #1890ff; }
          }
          &.card-green {
            background: linear-gradient(135deg, #f6ffed 0%, #b7eb8f 100%);
            border-left: 5px solid #52c41a;
            .stat-icon { color: #52c41a; }
            .stat-trend { color: #52c41a; }
          }
          &.card-orange {
            background: linear-gradient(135deg, #fff7e6 0%, #ffd591 100%);
            border-left: 5px solid #faad14;
            .stat-icon { color: #faad14; }
            .stat-trend { color: #faad14; }
          }
          &.card-red {
            background: linear-gradient(135deg, #fff1f0 0%, #ffccc7 100%);
            border-left: 5px solid #f5222d;
            .stat-icon { color: #f5222d; }
            .stat-trend { color: #f5222d; }
          }
        }

        .chart-card {
          border-radius: 18px;
          border: none;
          box-shadow: 0 4px 24px rgba(24, 144, 255, 0.08);
          transition: all 0.3s;
          background: #fff;
          &:hover {
            box-shadow: 0 12px 32px rgba(24, 144, 255, 0.16);
          }
          ::v-deep .ant-card-head {
            border-bottom: 1px solid #f0f0f0;
            padding: 18px 24px;
            .card-title {
              display: flex;
              align-items: center;
              gap: 10px;
              font-weight: 700;
              color: #222;
              .anticon {
                color: #1890ff;
                font-size: 18px;
              }
            }
          }
          ::v-deep .ant-card-body {
            padding: 24px;
          }
          .chart-placeholder {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 300px;
            background: linear-gradient(135deg, #f5f7fa 0%, #f0f2f5 100%);
            border-radius: 10px;
            color: #888;
            p {
              margin: 0;
              font-size: 15px;
              font-weight: 600;
              &:first-child {
                font-size: 42px;
                margin-bottom: 10px;
              }
            }
          }
          ::v-deep .ant-table {
            .ant-table-thead > tr > th {
              background: #f0f5ff;
              font-weight: 700;
              color: #222;
              border-bottom: 2px solid #e6f7ff;
            }
            .ant-table-row {
              &:hover > td {
                background: #e6f7ff;
              }
            }
            .status-已完成 {
              color: #52c41a;
              font-weight: 700;
            }
            .status-进行中 {
              color: #faad14;
              font-weight: 700;
            }
          }
        }
      }
    }

    .footer {
      background: transparent;
      text-align: center;
      padding: 24px 0 16px 0;
      margin-top: 32px;
      p {
        margin: 0;
        color: #bbb;
        font-size: 14px;
      }
    }
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 900px) {
  .dashboard-layout {
    .main-layout {
      .content {
        padding: 16px 4px 0 4px;
      }
      .content-inner {
        .stat-card {
          .stat-content {
            .stat-value { font-size: 22px; }
          }
        }
      }
    }
  }
}
</style>
