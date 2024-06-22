<template>
  <div>
    <h1>Financial Dashboard</h1>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Balance</th>
          <th>Currency</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="position in positions" :key="position._id">
          <td>{{ position.name }}</td>
          <td>{{ position.balance }}</td>
          <td>{{ position.currency }}</td>
          <td>{{ position.type }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FinancialDashboard',
  data() {
    return {
      positions: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:3000/api/positions');
      this.positions = response.data;
    } catch (error) {
      console.error('Error fetching positions:', error);
    }
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}
</style>
