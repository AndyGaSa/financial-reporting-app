import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueApexCharts from 'vue3-apexcharts';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faDollarSign,
  faChartLine,
  faSyncAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faDollarSign, faChartLine, faSyncAlt);

createApp(App)
  .use(router)
  .use(VueApexCharts)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
