<template>
  <apexchart :options="options" :series="series" />
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';

export default {
  name: 'SparklineChart',
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    options: Object,
    series: Array,
  },
};
</script>

<style scoped>
.apexcharts-tooltip {
  background: #333;
  color: white;
}

.apexcharts-title-text,
.apexcharts-subtitle-text {
  fill: white !important;
}
</style>
