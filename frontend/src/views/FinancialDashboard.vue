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
  background-color: #eff4f7;
  color: #000;
  height: 100%;
}

.content-area {
  padding: 20px;
}

.main {
  max-width: 1200px;
  margin: auto;
}

.sparkboxes .box {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  color: #000;
}

.charts .chart {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  width: 100%;
  color: #000;
}

.chart h2 {
  color: #000;
}

@media (min-width: 768px) {
  .chart {
    width: 48%;
  }
}
</style>
