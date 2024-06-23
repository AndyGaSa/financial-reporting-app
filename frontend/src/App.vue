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

#app {
  background-color: #eff4f7;
}
body {
  background-color: #eff4f7;
  color: #000;
  font-family: 'Titillium Web', sans-serif;
}

.content-area {
  padding: 10px;
  background-color: #eff4f7;
}

.main {
  margin: auto;
  background-color: #eff4f7;
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
