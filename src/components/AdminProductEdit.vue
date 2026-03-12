<script setup>
import { useRoute } from "vue-router";
import AdminProductForm from "./AdminProductForm.vue";

const route = useRoute();
</script>

<template>
  <AdminProductForm :isEdit="true" :productId="Number(route.params.id)" />
</template>
