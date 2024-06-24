<template>
  <div class="dashboard-data">
    <LoadingSpinner v-if="loading" />
    <div v-else>
      <div class="row sparkboxes mt-4 mb-4">
        <div class="col-md-4">
          <SummaryCard
            :value="totalInvestedAmountFormatted"
            label="Total Invested Amount"
            :icon="['fas', 'dollar-sign']"
          />
        </div>
        <div class="col-md-4">
          <SummaryCard
            :value="numberOfInvestments"
            label="Number of Investments"
            :icon="['fas', 'chart-line']"
          />
        </div>
        <div class="col-md-4">
          <SummaryCard
            :value="rateOfReturnFormatted"
            label="Rate of Return"
            :icon="['fas', 'sync-alt']"
          />
        </div>
      </div>
      <div class="row mt-5 mb-4">
        <div class="col-md-6">
          <div class="chart-container">
            <BarChart :options="barChartOptions" :series="barChartData" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="chart-container">
            <PieChart :options="pieChartOptions" :series="pieChartData" />
          </div>
        </div>
      </div>
      <div class="row mt-4 mb-4">
        <div class="col-md-6">
          <div class="chart-container">
            <ScatterChart
              :options="scatterChartOptions"
              :series="scatterChartData"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="chart-container">
            <LineChart :options="lineChartOptions" :series="lineChartData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import SummaryCard from '@/components/SummaryCard.vue';
import BarChart from '@/components/BarChart.vue';
import PieChart from '@/components/PieChart.vue';
import LineChart from '@/components/LineChart.vue';
import ScatterChart from '@/components/ScatterChart.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
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
    SummaryCard,
    BarChart,
    PieChart,
    LineChart,
    ScatterChart,
    LoadingSpinner,
  },
  setup() {
    const totalInvestedAmount = ref(0);
    const numberOfInvestments = ref(0);
    const rateOfReturn = ref(0);
    const totalInvestedAmountFormatted = ref('');
    const rateOfReturnFormatted = ref('');
    const loading = ref(true);

    const lineChartOptions = ref({});
    const lineChartData = ref([]);
    const barChartOptions = ref({});
    const barChartData = ref([]);
    const pieChartOptions = ref({});
    const pieChartData = ref([]);
    const scatterChartOptions = ref({});
    const scatterChartData = ref([]);

    onMounted(async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/positions');
        const positions = response.data;

        totalInvestedAmount.value = calculateTotalInvestedAmount(positions);
        numberOfInvestments.value = calculateNumberOfInvestments(positions);
        rateOfReturn.value = calculateRateOfReturn(positions);

        totalInvestedAmountFormatted.value =
          totalInvestedAmount.value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          });
        rateOfReturnFormatted.value = rateOfReturn.value.toFixed(2) + '%';

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
            foreColor: '#333',
            toolbar: {
              show: false,
            },
          },
          xaxis: {
            categories: lineChartCategories,
          },
          title: {
            text: 'Accumulated Balance Over Years',
            align: 'center',
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
            foreColor: '#333',
          },
          xaxis: {
            categories: barChartCategories,
          },
          yaxis: {
            labels: {
              formatter: function (value) {
                return value >= 1000000
                  ? `${(value / 1000000).toFixed(1)}M`
                  : `${(value / 1000).toFixed(1)}K`;
              },
            },
          },
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return val >= 1000000
                ? `${(val / 1000000).toFixed(1)}M`
                : `${(val / 1000).toFixed(1)}K`;
            },
            style: {
              fontSize: '12px',
              colors: ['#304758'],
            },
          },
          title: {
            text: 'Balance Distribution by Investment Type',
            align: 'center',
          },
        };

        const currencyBalances = balanceDistributionByCurrency(positions);
        const pieChartSeries = Object.values(currencyBalances);
        const pieChartLabels = Object.keys(currencyBalances);

        pieChartData.value = pieChartSeries;
        pieChartOptions.value = {
          chart: {
            type: 'pie',
            foreColor: '#333',
          },
          labels: pieChartLabels,
          title: {
            text: 'Balance Distribution by Currency',
            align: 'center',
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 300,
                },
                legend: {
                  position: 'bottom',
                },
              },
            },
          ],
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
            foreColor: '#333',
            toolbar: {
              show: false,
            },
          },
          xaxis: {
            categories: positions.map((position) => position.type),
          },
          title: {
            text: 'Market Value vs. Exchange Rate',
            align: 'center',
          },
        };
      } catch (error) {
        console.error('Error fetching positions:', error);
      } finally {
        loading.value = false;
      }
    });

    return {
      totalInvestedAmountFormatted,
      numberOfInvestments,
      rateOfReturnFormatted,
      lineChartOptions,
      lineChartData,
      barChartOptions,
      barChartData,
      pieChartOptions,
      pieChartData,
      scatterChartOptions,
      scatterChartData,
      loading,
    };
  },
};
</script>

<style scoped>
.dashboard-data {
  color: #333;
  padding: 0 20%;
}

.row {
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
}

.chart-container {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-height: 100%;
  align-content: center;
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

.chart-container h2 {
  color: #333;
}
</style>
