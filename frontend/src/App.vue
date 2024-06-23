<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.min.css';
@import '~font-awesome/css/font-awesome.min.css';

body.light {
  background-color: #fff;
  color: #000;
  font-family: 'Titillium Web', sans-serif;
}

.content-area {
  padding: 20px;
}

.main {
  max-width: 1200px;
  margin: auto;
}

.sparkboxes .box {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.charts .chart {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  width: 100%;
  color: #000;
}

.chart h2 {
  color: #000;
}

@media (min-width: 768px) {
  .chart {
    width: 48%;
  }
}
</style>
