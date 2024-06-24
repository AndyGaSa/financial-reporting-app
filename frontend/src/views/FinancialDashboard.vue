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
h1 {
  text-align: center;
}

.content-area {
  width: 100%;
  height: 100%;
}

@media (min-width: 768px) {
  .chart {
    width: 50%;
  }
}
</style>
