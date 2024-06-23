<template>
  <div id="sparkline-chart">
    <apexchart type="area" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';

export default {
  name: 'SparklineChart',
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
#sparkline-chart {
  background: #333;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}
</style>
