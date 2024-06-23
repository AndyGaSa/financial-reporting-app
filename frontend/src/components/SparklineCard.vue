<template>
  <div class="sparkline-card">
    <SparklineChart :options="options" :series="series" />
    <div class="title">{{ title }}</div>
    <div class="subtitle">{{ subtitle }}</div>
  </div>
</template>

<script>
import SparklineChart from '@/components/SparklineChart.vue';

export default {
  name: 'SparklineCard',
  components: {
    SparklineChart,
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
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.sparkline-card {
  background: #333;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;
}
.title {
  font-size: 24px;
  color: #fff;
}
.subtitle {
  font-size: 14px;
  color: #ccc;
}
</style>
