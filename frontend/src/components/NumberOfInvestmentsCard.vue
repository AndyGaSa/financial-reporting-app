<template>
  <div class="investment-card">
    <h2>{{ numberOfInvestments }}</h2>
    <p>Number of Investments</p>
  </div>
</template>

<script>
export default {
  name: 'NumberOfInvestmentsCard',
  props: {
    numberOfInvestments: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.investment-card {
  background: #333;
  padding: 20px;
  border-radius: 10px;
  color: white;
  text-align: center;
  margin-bottom: 20px;
}
</style>
