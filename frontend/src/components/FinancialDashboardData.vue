<template>
  <div>
    <slot
      :totalInvestedAmount="totalInvestedAmount"
      :numberOfInvestments="numberOfInvestments"
      :rateOfReturn="rateOfReturn"
      :spark1Options="spark1Options"
      :spark1Series="spark1Series"
      :spark2Options="spark2Options"
      :spark2Series="spark2Series"
      :spark3Options="spark3Options"
      :spark3Series="spark3Series"
      :lineChartOptions="lineChartOptions"
      :lineChartData="lineChartData"
      :barChartOptions="barChartOptions"
      :barChartData="barChartData"
      :pieChartOptions="pieChartOptions"
      :pieChartData="pieChartData"
      :scatterChartOptions="scatterChartOptions"
      :scatterChartData="scatterChartData"
    ></slot>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
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
  setup() {
    const totalInvestedAmount = ref(0);
    const numberOfInvestments = ref(0);
    const rateOfReturn = ref(0);

    const spark1Options = ref({});
    const spark1Series = ref([]);
    const spark2Options = ref({});
    const spark2Series = ref([]);
    const spark3Options = ref({});
    const spark3Series = ref([]);
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

        const sparklineData = positions.map((position) => position.balance);

        spark1Series.value = [{ data: sparklineData }];
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
          title: {
            text: totalInvestedAmount.value.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            }),
            offsetX: 0,
            style: { fontSize: '24px' },
          },
          subtitle: {
            text: 'Total Invested Amount',
            offsetX: 0,
            style: { fontSize: '14px' },
          },
        };

        spark2Series.value = [{ data: sparklineData }];
        spark2Options.value = {
          chart: {
            type: 'area',
            height: 160,
            sparkline: { enabled: true },
          },
          stroke: { curve: 'straight' },
          fill: { opacity: 0.3 },
          yaxis: { min: 0 },
          colors: ['#DCE6EC'],
          title: {
            text: numberOfInvestments.value.toString(),
            offsetX: 0,
            style: { fontSize: '24px' },
          },
          subtitle: {
            text: 'Number of Investments',
            offsetX: 0,
            style: { fontSize: '14px' },
          },
        };

        spark3Series.value = [{ data: sparklineData }];
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
          title: {
            text: rateOfReturn.value.toFixed(2) + '%',
            offsetX: 0,
            style: { fontSize: '24px' },
          },
          subtitle: {
            text: 'Rate of Return',
            offsetX: 0,
            style: { fontSize: '14px' },
          },
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
            foreColor: '#fff',
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
            foreColor: '#fff',
          },
          xaxis: {
            categories: barChartCategories,
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
            foreColor: '#fff',
          },
          labels: pieChartLabels,
          title: {
            text: 'Balance Distribution by Currency',
            align: 'center',
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
            foreColor: '#fff',
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
      }
    });

    return {
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
    };
  },
};
</script>
