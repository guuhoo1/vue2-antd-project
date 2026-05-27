<template>
  <div class="dashboard">
    <div class="page-header">
      <h2 class="page-title">仪表盘</h2>
    </div>

    <a-row :gutter="16" class="stat-cards">
      <a-col :xs="12" :lg="6" v-for="stat in statistics" :key="stat.label">
        <a-card class="stat-card" :body-style="{ padding: '20px' }">
          <div class="stat-content">
            <div class="stat-info">
              <span class="stat-label">{{ stat.label }}</span>
              <span class="stat-value">{{ stat.value }}</span>
            </div>
            <div class="stat-icon" :style="{ backgroundColor: stat.bg }">
              <a-icon :type="stat.icon" />
            </div>
          </div>
          <div class="stat-footer">
            <span :style="{ color: stat.trend >= 0 ? 'var(--success-color)' : 'var(--error-color)' }">
              <a-icon :type="stat.trend >= 0 ? 'arrow-up' : 'arrow-down'" />
              {{ Math.abs(stat.trend) }}%
            </span>
            <span class="stat-compare">较上周</span>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="16" class="chart-section">
      <a-col :span="24" :lg="14">
        <a-card title="销售趋势" class="chart-card">
          <div class="chart-placeholder">
            <a-icon type="bar-chart" />
            <p>趋势图展示区域</p>
            <span class="chart-hint">可接入 ECharts</span>
          </div>
        </a-card>
      </a-col>
      <a-col :span="24" :lg="10">
        <a-card title="用户分布" class="chart-card">
          <div class="chart-placeholder">
            <a-icon type="pie-chart" />
            <p>分布图展示区域</p>
            <span class="chart-hint">可接入 ECharts</span>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <a-card title="最近订单" class="table-card">
      <a-table
        :columns="tableColumns"
        :data-source="tableData"
        :pagination="false"
        size="middle"
        row-key="id"
      >
        <span slot="status" slot-scope="status">
          <a-tag :color="status === 'completed' ? 'green' : status === 'pending' ? 'orange' : 'blue'">
            {{ status === 'completed' ? '已完成' : status === 'pending' ? '进行中' : '待处理' }}
          </a-tag>
        </span>
      </a-table>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  data() {
    return {
      statistics: [
        { label: '总用户数', value: '8,846', icon: 'user', trend: 12.5, bg: 'var(--primary-1)' },
        { label: '总订单数', value: '9,280', icon: 'shopping-cart', trend: 8.2, bg: '#fff7e6' },
        { label: '总收益', value: '¥84,820', icon: 'dollar', trend: -3.1, bg: '#f6ffed' },
        { label: '活跃用户', value: '2,408', icon: 'rise', trend: 15.6, bg: '#fff0f6' },
      ],
      tableColumns: [
        { title: '订单号', dataIndex: 'id', key: 'id' },
        { title: '客户', dataIndex: 'customer', key: 'customer' },
        { title: '金额', dataIndex: 'amount', key: 'amount' },
        { title: '状态', dataIndex: 'status', key: 'status', scopedSlots: { customRender: 'status' } },
        { title: '时间', dataIndex: 'time', key: 'time' },
      ],
      tableData: [
        { id: 'ORD-001', customer: '张三', amount: '¥1,280', status: 'completed', time: '2026-05-27 09:30' },
        { id: 'ORD-002', customer: '李四', amount: '¥3,560', status: 'pending', time: '2026-05-27 10:15' },
        { id: 'ORD-003', customer: '王五', amount: '¥820', status: 'completed', time: '2026-05-27 11:00' },
        { id: 'ORD-004', customer: '赵六', amount: '¥2,150', status: 'processing', time: '2026-05-27 11:45' },
        { id: 'ORD-005', customer: '孙七', amount: '¥4,900', status: 'completed', time: '2026-05-27 13:20' },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.dashboard {
  .page-header {
    margin-bottom: 24px;

    .page-title {
      font-size: 20px;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }

    .page-subtitle {
      font-size: 14px;
      color: var(--text-secondary);
      margin: 4px 0 0;
    }
  }

  .stat-cards {
    margin-bottom: 16px;

    .stat-card {
      margin-bottom: 16px;
      border-radius: 8px;

      .stat-content {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        .stat-info {
          display: flex;
          flex-direction: column;
          gap: 8px;

          .stat-label {
            font-size: 14px;
            color: var(--text-secondary);
          }

          .stat-value {
            font-size: 28px;
            font-weight: 600;
            color: var(--text-primary);
            line-height: 1.2;
          }
        }

        .stat-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          font-size: 24px;
          color: var(--primary-color);
        }
      }

      .stat-footer {
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px solid var(--border-color-light);
        font-size: 13px;

        span {
          margin-right: 8px;
        }

        .stat-compare {
          color: var(--text-placeholder);
        }
      }
    }
  }

  .chart-section {
    margin-bottom: 16px;

    .chart-card {
      margin-bottom: 16px;
      border-radius: 8px;

      .chart-placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 260px;
        color: var(--text-placeholder);

        .anticon {
          font-size: 48px;
          margin-bottom: 16px;
          color: var(--primary-3);
        }

        p {
          font-size: 16px;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }

        .chart-hint {
          font-size: 12px;
        }
      }
    }
  }

  .table-card {
    border-radius: 8px;
    margin-bottom: 16px;
  }
}
</style>
