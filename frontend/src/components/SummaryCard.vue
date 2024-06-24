<template>
  <div class="summary-card">
    <div class="icon">
      <font-awesome-icon :icon="icon" />
    </div>
    <div class="info">
      <h2>{{ value }}</h2>
      <p>{{ label }}</p>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'SummaryCard',
  components: {
    FontAwesomeIcon,
  },
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.summary-card {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 20px;
  justify-content: space-between;
  height: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.icon {
  margin-right: 10px;
}

.icon svg {
  width: 24px;
  height: 24px;
}

.info {
  text-align: left;
}

.info h2 {
  margin: 0;
  font-size: 24px;
}

.info p {
  margin: 0;
  font-size: 14px;
}
</style>
