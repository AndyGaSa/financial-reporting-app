<template>
  <div id="dashboard">
    <div class="content-area">
      <h1>Financial Dashboard</h1>
      <div class="main">
        <FinancialDashboardData
          v-slot="{
            totalInvestedAmount,
            numberOfInvestments,
            rateOfReturn,
            spark1Options,
            spark1Series,
            spark2Options,
            spark2Series,
            spark3Options,
            spark3Series,
            lineChartOptions,
            lineChartData,
            barChartOptions,
            barChartData,
            pieChartOptions,
            pieChartData,
            scatterChartOptions,
            scatterChartData,
          }"
        >
          <div class="row sparkboxes mt-4 mb-4">
            <div class="col-md-4">
              <SparklineCard
                :options="spark1Options"
                :series="spark1Series"
                :title="
                  totalInvestedAmount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })
                "
                subtitle="Total Invested Amount"
              />
            </div>
            <div class="col-md-4">
              <SparklineCard
                :options="spark2Options"
                :series="spark2Series"
                :title="numberOfInvestments.toString()"
                subtitle="Number of Investments"
              />
            </div>
            <div class="col-md-4">
              <SparklineCard
                :options="spark3Options"
                :series="spark3Series"
                :title="rateOfReturn.toFixed(2) + '%'"
                subtitle="Rate of Return"
              />
            </div>
          </div>
          <div class="row mt-5 mb-4">
            <div class="col-md-6">
              <h2>Balance Distribution by Investment Type</h2>
              <BarChart :options="barChartOptions" :series="barChartData" />
            </div>
            <div class="col-md-6">
              <h2>Balance Distribution by Currency</h2>
              <PieChart :options="pieChartOptions" :series="pieChartData" />
            </div>
          </div>
          <div class="row mt-4 mb-4">
            <div class="col-md-6">
              <h2>Market Value vs. Exchange Rate</h2>
              <ScatterChart
                :options="scatterChartOptions"
                :series="scatterChartData"
              />
            </div>
            <div class="col-md-6">
              <h2>Accumulated Balance Over Years</h2>
              <LineChart :options="lineChartOptions" :series="lineChartData" />
            </div>
          </div>
        </FinancialDashboardData>
      </div>
    </div>
  </div>
</template>

<script>
import FinancialDashboardData from '@/components/FinancialDashboardData.vue';
import SparklineCard from '@/components/SparklineCard.vue';
import BarChart from '@/components/BarChart.vue';
import PieChart from '@/components/PieChart.vue';
import LineChart from '@/components/LineChart.vue';
import ScatterChart from '@/components/ScatterChart.vue';

export default {
  name: 'FinancialDashboard',
  components: {
    FinancialDashboardData,
    SparklineCard,
    BarChart,
    PieChart,
    LineChart,
    ScatterChart,
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
