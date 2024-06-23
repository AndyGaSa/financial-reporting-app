<template>
  <div class="box">
    <ApexChart :options="options" :series="series" />
    <div class="title">{{ title }}</div>
    <div class="subtitle">{{ subtitle }}</div>
  </div>
</template>

<script>
import ApexChart from 'vue3-apexcharts';

export default {
  name: 'SparklineCard',
  props: {
    options: Object,
    series: Array,
    title: String,
    subtitle: String,
  },
  components: {
    ApexChart,
  },
};
</script>

<style scoped>
.box {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  color: #000;
}
.title {
  font-size: 24px;
}
.subtitle {
  font-size: 14px;
}
</style>
