<template>
  <ApexChart :options="options" :series="series" />
</template>

<script>
import ApexChart from 'vue3-apexcharts';

export default {
  name: 'PieChart',
  props: {
    options: Object,
    series: Array,
  },
  components: {
    ApexChart,
  },
};
</script>
