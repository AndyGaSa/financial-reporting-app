<template>
  <div class="dashboard-data">
    <div class="row sparkboxes mt-4 mb-4">
      <div class="col-md-4">
        <SparklineCard
          v-if="spark1Options.chart"
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
        <NumberOfInvestmentsCard :numberOfInvestments="numberOfInvestments" />
      </div>
      <div class="col-md-4">
        <SparklineCard
          v-if="spark3Options.chart"
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
        <BarChart
          v-if="barChartOptions.chart"
          :options="barChartOptions"
          :series="barChartData"
        />
      </div>
      <div class="col-md-6">
        <h2>Balance Distribution by Currency</h2>
        <PieChart
          v-if="pieChartOptions.chart"
          :options="pieChartOptions"
          :series="pieChartData"
        />
      </div>
    </div>
    <div class="row mt-4 mb-4">
      <div class="col-md-6">
        <h2>Market Value vs. Exchange Rate</h2>
        <ScatterChart
          v-if="scatterChartOptions.chart"
          :options="scatterChartOptions"
          :series="scatterChartData"
        />
      </div>
      <div class="col-md-6">
        <h2>Accumulated Balance Over Years</h2>
        <LineChart
          v-if="lineChartOptions.chart"
          :options="lineChartOptions"
          :series="lineChartData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import SparklineCard from '@/components/SparklineCard.vue';
import BarChart from '@/components/BarChart.vue';
import PieChart from '@/components/PieChart.vue';
import LineChart from '@/components/LineChart.vue';
import ScatterChart from '@/components/ScatterChart.vue';
import NumberOfInvestmentsCard from '@/components/NumberOfInvestmentsCard.vue';
import {
  calculateTotalInvestedAmount,
  calculateNumberOfInvestments,
  calculateRateOfReturn,
  accumulateBalancesByYear,
  balanceDistributionByType,
  balanceDistributionByCurrency,
  marketValueVsExchangeRate,
} from '@/utils.js';

export default {
  name: 'FinancialDashboardData',
  components: {
    SparklineCard,
    BarChart,
    PieChart,
    LineChart,
    ScatterChart,
    NumberOfInvestmentsCard,
  },
  setup() {
    const totalInvestedAmount = ref(0);
    const numberOfInvestments = ref(0);
    const rateOfReturn = ref(0);

    const spark1Options = ref({ chart: null });
    const spark1Series = ref([]);
    const spark3Options = ref({ chart: null });
    const spark3Series = ref([]);
    const lineChartOptions = ref({ chart: null });
    const lineChartData = ref([]);
    const barChartOptions = ref({ chart: null });
    const barChartData = ref([]);
    const pieChartOptions = ref({ chart: null });
    const pieChartData = ref([]);
    const scatterChartOptions = ref({ chart: null });
    const scatterChartData = ref([]);

    onMounted(async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/positions');
        const positions = response.data;

        totalInvestedAmount.value = calculateTotalInvestedAmount(positions);
        numberOfInvestments.value = calculateNumberOfInvestments(positions);
        rateOfReturn.value = calculateRateOfReturn(positions);

        const sparklineDataCost = positions.map((position) => position.cost);
        const sparklineDataReturn = positions.map(
          (position) => position.accrued_interest
        );

        spark1Series.value = [{ data: sparklineDataCost }];
        spark1Options.value = {
          chart: {
            type: 'area',
            height: 160,
            sparkline: { enabled: true },
          },
          stroke: { curve: 'straight' },
          fill: { opacity: 0.3 },
          yaxis: { min: 0 },
          colors: ['#DCE6EC'],
        };

        spark3Series.value = [{ data: sparklineDataReturn }];
        spark3Options.value = {
          chart: {
            type: 'area',
            height: 160,
            sparkline: { enabled: true },
          },
          stroke: { curve: 'straight' },
          fill: { opacity: 0.3 },
          yaxis: { min: 0 },
          colors: ['#DCE6EC'],
        };

        const accumulatedBalances = accumulateBalancesByYear(positions);
        const lineChartCategories = Object.keys(accumulatedBalances);
        const lineChartValues = Object.values(accumulatedBalances);

        lineChartData.value = [
          {
            name: 'Accumulated Balance',
            data: lineChartValues,
          },
        ];
        lineChartOptions.value = {
          chart: {
            type: 'line',
          },
          xaxis: {
            categories: lineChartCategories,
          },
          title: {
            text: 'Accumulated Balance Over Years',
            align: 'center',
            style: { color: '#000' },
          },
        };

        const typeBalances = balanceDistributionByType(positions);
        const barChartCategories = Object.keys(typeBalances);
        const barChartValues = Object.values(typeBalances);

        barChartData.value = [
          {
            name: 'Balance',
            data: barChartValues,
          },
        ];
        barChartOptions.value = {
          chart: {
            type: 'bar',
          },
          xaxis: {
            categories: barChartCategories,
          },
          title: {
            text: 'Balance Distribution by Investment Type',
            align: 'center',
            style: { color: '#000' },
          },
        };

        const currencyBalances = balanceDistributionByCurrency(positions);
        const pieChartSeries = Object.values(currencyBalances);
        const pieChartLabels = Object.keys(currencyBalances);

        pieChartData.value = pieChartSeries;
        pieChartOptions.value = {
          chart: {
            type: 'pie',
          },
          labels: pieChartLabels,
          title: {
            text: 'Balance Distribution by Currency',
            align: 'center',
            style: { color: '#000' },
          },
        };

        scatterChartData.value = [
          {
            name: 'Market Value',
            data: marketValueVsExchangeRate(positions),
          },
        ];
        scatterChartOptions.value = {
          chart: {
            type: 'scatter',
          },
          xaxis: {
            categories: positions.map((position) => position.type),
          },
          title: {
            text: 'Market Value vs. Exchange Rate',
            align: 'center',
            style: { color: '#000' },
          },
        };
      } catch (error) {
        console.error('Error fetching positions:', error);
      }
    });

    return {
      totalInvestedAmount,
      numberOfInvestments,
      rateOfReturn,
      spark1Options,
      spark1Series,
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
    };
  },
};
</script>

<style scoped>
.dashboard-data {
  color: #000;
}
</style>
