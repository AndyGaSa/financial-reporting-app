import { createRouter, createWebHistory } from 'vue-router';
import FinancialDashboard from '../views/FinancialDashboard.vue';

const routes = [
  {
    path: '/',
    name: 'FinancialDashboard',
    component: FinancialDashboard,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
