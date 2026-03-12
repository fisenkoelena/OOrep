<script setup>
import { useRouter } from "vue-router";
import { useFavorites } from "../composables/useFavorites";
import { useCart } from "../composables/useCart";

import product1 from "../assets/products/product1.jpg";
import product2 from "../assets/products/product2.jpg";
import product3 from "../assets/products/product3.jpg";
import product4 from "../assets/products/product4.jpg";
import product5 from "../assets/products/product5.jpg";
import product6 from "../assets/products/product6.jpg";
import product7 from "../assets/products/product7.jpg";
import product8 from "../assets/products/product8.jpg";
import product9 from "../assets/products/product9.jpg";
import product10 from "../assets/products/product10.jpg";
import product11 from "../assets/products/product11.jpg";
import product12 from "../assets/products/product12.jpg";
import product13 from "../assets/products/product13.jpg";
import product14 from "../assets/products/product14.jpg";
import product15 from "../assets/products/product15.jpg";
import product16 from "../assets/products/product16.jpg";

const imageMap = {
  "product1.jpg": product1,
  "product2.jpg": product2,
  "product3.jpg": product3,
  "product4.jpg": product4,
  "product5.jpg": product5,
  "product6.jpg": product6,
  "product7.jpg": product7,
  "product8.jpg": product8,
  "product9.jpg": product9,
  "product10.jpg": product10,
  "product11.jpg": product11,
  "product12.jpg": product12,
  "product13.jpg": product13,
  "product14.jpg": product14,
  "product15.jpg": product15,
  "product16.jpg": product16,
};

const router = useRouter();
const { favorites, removeItem } = useFavorites();
const { addItem } = useCart();

function getProductImage(imageName) {
  return imageMap[imageName] || product1;
}

function goToProduct(sku) {
  router.push(`/product/${sku}`);
}

function removeFromFavorites(item) {
  removeItem(item.id);
}

function addToCart(item) {
  addItem({
    sku: item.sku,
    name: item.name,
    price: item.price,
    size: item.size || null,
    quantity: 1,
    image: item.image,
  });
  router.push("/cart");
}
</script>

<template>
  <main class="favorites-page">
    <div class="favorites-container">
      <h1 class="favorites-title">Избранное</h1>
      <div class="breadcrumbs">
        <router-link to="/products">Магазин</router-link> &gt;
        <span>Избранное</span>
      </div>
      <div class="favorites-content">
        <div class="favorites-items" v-if="favorites.length">
          <div v-for="item in favorites" :key="item.id" class="favorite-item">
            <div class="item-image" @click="goToProduct(item.sku)">
              <img :src="getProductImage(item.image)" :alt="item.name" />
            </div>
            <div class="item-info">
              <h3 class="item-name" @click="goToProduct(item.sku)">
                {{ item.name }}
              </h3>
              <p class="item-size">Размер: {{ item.size || "—" }}</p>
              <p class="item-sku">Артикул: {{ item.sku }}</p>
              <p class="item-price">{{ item.price }} ₽</p>
            </div>
            <div class="item-actions">
              <button class="cart-btn" @click.stop="addToCart(item)">
                <img src="../assets/icons/icon-cart.svg" alt="В корзину" />
              </button>
              <button class="item-remove" @click="removeFromFavorites(item)">
                <img src="../assets/icons/icon-trash.svg" alt="Удалить" />
              </button>
            </div>
          </div>
        </div>
        <div v-else class="favorites-empty">
          <p>В избранном пока пусто</p>
          <router-link to="/products" class="btn"
            >Перейти в магазин</router-link
          >
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.breadcrumbs {
  font-size: 14px;
  color: #888;
  margin-bottom: 40px;
}
.breadcrumbs a {
  color: #888;
  text-decoration: none;
  transition: color 0.2s;
}
.breadcrumbs a:hover {
  color: #68a61c;
}
.favorites-page {
  flex: 1;
  background-color: #f5f5f5;
  padding: 40px 100px;
}

.favorites-container {
  max-width: 1200px;
  margin: 0 auto;
}

.favorites-title {
  font-size: 36px;
  font-weight: 700;
  color: #000;
  margin-bottom: 12px;
}

.favorites-content {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.favorites-items {
  flex: 1;
  background-color: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 24px;
  padding: 30px;
}

.favorite-item {
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 30px 0;
}
.favorite-item:first-child {
  padding-top: 0;
}
.favorite-item:last-child {
  padding-bottom: 0;
}
.favorite-item + .favorite-item {
  border-top: 2px solid #e0e0e0;
}

.item-image {
  width: 140px;
  height: 140px;
  background-color: #f2f2f2;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.2s;
}
.item-image:hover {
  opacity: 0.8;
}
.item-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.item-info {
  flex: 1;
  min-width: 200px;
}
.item-name {
  font-size: 22px;
  font-weight: 600;
  color: #111;
  margin-bottom: 6px;
  cursor: pointer;
  transition: color 0.2s;
}
.item-name:hover {
  color: #68a61c;
}
.item-size,
.item-sku {
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}
.item-sku {
  color: #777;
  margin-bottom: 12px;
}
.item-price {
  font-size: 20px;
  font-weight: 700;
  color: #000;
}

.item-actions {
  display: flex;
  gap: 12px;
  margin-left: auto;
  align-items: center;
}

.cart-btn {
  min-width: 180px;
  height: 40px;
  background-color: #000;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cart-btn img {
  width: 20px;
  height: 20px;
  filter: brightness(0) invert(1);
}
.cart-btn:hover {
  background-color: #68a61c;
}

.item-remove {
  background: none;
  border: none;
  cursor: pointer;
}
.item-remove img {
  width: 22px;
  height: 22px;
  transition: opacity 0.2s;
}
.item-remove img:hover {
  opacity: 0.8;
}

.favorites-empty {
  flex: 1;
  background-color: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 24px;
  padding: 60px;
  text-align: center;
}
.favorites-empty p {
  font-size: 18px;
  color: #555;
  margin-bottom: 20px;
}
.favorites-empty .btn {
  display: inline-block;
  padding: 12px 30px;
  background-color: #000;
  color: #fff;
  text-decoration: none;
  border-radius: 60px;
  font-weight: 600;
  transition: background-color 0.2s;
}
.favorites-empty .btn:hover {
  background-color: #68a61c;
}

@media (max-width: 1024px) {
  .favorites-page {
    padding: 40px 40px;
  }
  .favorites-content {
    flex-direction: column;
  }
}
@media (max-width: 768px) {
  .favorite-item {
    flex-wrap: wrap;
    gap: 20px;
  }
  .item-image {
    width: 100px;
    height: 100px;
  }
  .item-info {
    min-width: 150px;
  }
  .item-actions {
    margin-left: 0;
  }
}
</style>
