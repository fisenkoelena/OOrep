<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useGoods } from "../composables/useGoods";

const route = useRoute();
const { findBySku } = useGoods();
const product = computed(() => findBySku(route.params.sku));
</script>

<template>
  <div class="product-details-tab">
    <p>{{ product?.details || "Дополнительная информация отсутствует." }}</p>
  </div>
</template>

<style scoped>
.product-details-tab {
  padding: 20px 0;
  font-size: 15px;
  color: #555;
  line-height: 1.6;
}
</style>
