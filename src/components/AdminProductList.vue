<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useGoods } from "../composables/useGoods";

const router = useRouter();
const { goodsList, remove } = useGoods();

const showDeleteModal = ref(false);
const productToDelete = ref(null);

function editProduct(id) {
  router.push(`/admin/edit/${id}`);
}

function confirmDelete(product) {
  productToDelete.value = product;
  showDeleteModal.value = true;
}

function closeDeleteModal() {
  showDeleteModal.value = false;
  productToDelete.value = null;
}

function deleteProduct() {
  if (productToDelete.value) {
    remove(productToDelete.value.id);
    closeDeleteModal();
  }
}
</script>

<template>
  <div class="admin-product-list">
    <h2 class="list-title">Список товаров</h2>
    <table class="product-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>SKU</th>
          <th>Название</th>
          <th>Категория</th>
          <th>Цена</th>
          <th>Распродажа</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in goodsList" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.sku }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.price }} ₽</td>
          <td>{{ product.onSale ? "Да" : "Нет" }}</td>
          <td>
            <button class="btn-edit" @click="editProduct(product.id)">
              <img src="../assets/icons/icon-settings.svg" alt="Edit" />
            </button>
            <button class="btn-delete" @click="confirmDelete(product)">
              <img src="../assets/icons/icon-trash.svg" alt="Delete" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <Teleport to="body">
      <div
        v-if="showDeleteModal"
        class="modal-overlay"
        @click.self="closeDeleteModal"
      >
        <div class="modal-content">
          <h3>Удалить товар</h3>
          <p>
            Вы уверены, что хотите удалить товар "{{ productToDelete?.name }}"?
          </p>
          <div class="modal-actions">
            <button class="btn btn-primary" @click="deleteProduct">
              Удалить
            </button>
            <button class="btn btn-secondary" @click="closeDeleteModal">
              Отмена
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.admin-product-list {
  padding: 20px 0;
}
.list-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
}
.product-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  overflow: hidden;
}
.product-table th,
.product-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}
.product-table th {
  background-color: #f9f9f9;
  font-weight: 600;
}
.product-table td {
  color: #333;
}
.btn-edit,
.btn-delete {
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 8px;
  padding: 4px;
  transition: opacity 0.2s;
}
.btn-edit:hover,
.btn-delete:hover {
  opacity: 0.7;
}
.btn-edit img,
.btn-delete img {
  width: 18px;
  height: 18px;
  display: block;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000080;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background-color: #fff;
  border-radius: 24px;
  padding: 30px;
  max-width: 400px;
  width: 90%;
  text-align: center;
}
.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 20px;
}
.btn {
  padding: 10px 24px;
  border-radius: 40px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}
.btn-primary {
  background-color: #000;
  color: #fff;
}
.btn-primary:hover {
  background-color: #ff4757;
}
.btn-secondary {
  background-color: #fff;
  color: #333;
  border: 2px solid #e0e0e0;
}
.btn-secondary:hover {
  color: #f5f5f5;
  background-color: #000000;
}
</style>
