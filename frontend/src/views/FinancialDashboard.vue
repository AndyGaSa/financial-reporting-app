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
  width: 100%;
}

h1 {
  text-align: center;
}

.content-area {
  padding: 10px;
}

@media (min-width: 768px) {
  .chart {
    width: 48%;
  }
}
</style>
