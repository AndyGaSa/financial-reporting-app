<template>
  <div id="bar-chart">
    <apexchart type="bar" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';

export default {
  name: 'BarChart',
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
#bar-chart {
  background: #333;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}
</style>
