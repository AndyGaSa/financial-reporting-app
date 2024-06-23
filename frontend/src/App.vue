<template>
  <div id="app" class="dark">
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

body.dark {
  background-color: #1e1e1e;
  color: white;
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
  background: #333;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.charts .chart {
  background: #333;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  width: 100%;
}

.chart h2 {
  color: white;
}

@media (min-width: 768px) {
  .chart {
    width: 48%;
  }
}
</style>
