<template>
  <div id="dashboard">
    <div class="content-area">
      <h1>Financial Dashboard</h1>
      <FinancialDashboardData />
    </div>
  </div>
</template>

<script>
import FinancialDashboardData from '@/components/FinancialDashboardData.vue';

export default {
  name: 'FinancialDashboard',
  components: {
    FinancialDashboardData,
  },
};
</script>

<style scoped>
#dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1e1e1e;
  color: white;
}

.content-area {
  padding: 20px;
}

.main {
  max-width: 1200px;
  margin: auto;
}

.sparkboxes .box {
  background: #333;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.charts .chart {
  background: #333;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  width: 100%;
}

.chart h2 {
  color: white;
}

@media (min-width: 768px) {
  .chart {
    width: 48%;
  }
}
</style>
