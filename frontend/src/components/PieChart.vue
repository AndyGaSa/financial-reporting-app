<template>
  <div id="pie-chart">
    <apexchart type="pie" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';

export default {
  name: 'PieChart',
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    options: {
      type: Object,
      required: true,
    },
    series: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
#pie-chart {
  background: #333;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}
</style>
