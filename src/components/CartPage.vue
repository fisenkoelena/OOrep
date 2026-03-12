<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
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
const { cart, updateQuantity, removeItem, totalSum, deliveryCost } = useCart();

const total = computed(() => totalSum());

function getProductImage(imageName) {
  return imageMap[imageName] || product1;
}

function increaseQuantity(item) {
  updateQuantity(item.id, item.quantity + 1);
}

function decreaseQuantity(item) {
  if (item.quantity > 1) {
    updateQuantity(item.id, item.quantity - 1);
  } else {
    removeItem(item.id);
  }
}

function removeItemFromCart(item) {
  removeItem(item.id);
}

function goToProduct(sku) {
  router.push(`/product/${sku}`);
}

function goToCheckout() {
  router.push("/checkout");
}
</script>

<template>
  <main class="cart-page">
    <div class="cart-container">
      <h1 class="cart-title">Корзина</h1>
      <div class="breadcrumbs">
        <router-link to="/products">Магазин</router-link> &gt;
        <span>Корзина</span>
      </div>

      <div class="cart-content">
        <div class="cart-items" v-if="cart.length">
          <div v-for="item in cart" :key="item.id" class="cart-item">
            <div class="item-image" @click="goToProduct(item.sku)">
              <img :src="getProductImage(item.image)" :alt="item.name" />
            </div>
            <div class="item-info">
              <h3 class="item-name" @click="goToProduct(item.sku)">
                {{ item.name }}
              </h3>
              <p class="item-size">Размер: {{ item.size }}</p>
              <p class="item-sku">Артикул: {{ item.sku }}</p>
              <p class="item-price">{{ item.price }} ₽</p>
            </div>
            <div class="item-quantity">
              <div class="quantity-control">
                <button class="qty-btn" @click="decreaseQuantity(item)">
                  −
                </button>
                <span class="qty-value">{{ item.quantity }}</span>
                <button class="qty-btn" @click="increaseQuantity(item)">
                  +
                </button>
              </div>
            </div>
            <button class="item-remove" @click="removeItemFromCart(item)">
              <img src="../assets/icons/icon-trash.svg" alt="Удалить" />
            </button>
          </div>
        </div>
        <div v-else class="cart-empty">
          <p>Корзина пуста</p>
          <router-link to="/products" class="btn"
            >Перейти в магазин</router-link
          >
        </div>

        <div class="cart-summary" v-if="cart.length">
          <h2 class="summary-title">Сумма заказа</h2>
          <div class="summary-row">
            <span>Сумма</span>
            <span>{{ total }} ₽</span>
          </div>
          <div class="summary-row">
            <span>Доставка</span>
            <span>{{ deliveryCost }} ₽</span>
          </div>
          <div class="summary-total">
            <span>Всего</span>
            <span>{{ total + deliveryCost }} ₽</span>
          </div>
          <button class="checkout-btn" @click="goToCheckout">К оплате</button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.cart-page {
  flex: 1;
  background-color: #f5f5f5;
  padding: 40px 100px;
}

.cart-container {
  max-width: 1200px;
  margin: 0 auto;
}

.cart-title {
  font-size: 36px;
  font-weight: 700;
  color: #000;
  margin-bottom: 12px;
}

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

.cart-content {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.cart-items {
  flex: 1;
  background-color: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 24px;
  padding: 30px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 30px 0;
}
.cart-item:first-child {
  padding-top: 0;
}
.cart-item:last-child {
  padding-bottom: 0;
}
.cart-item + .cart-item {
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

.item-quantity {
  margin-left: auto;
}
.quantity-control {
  width: 100px;
  height: 36px;
  background-color: #f0f0f0;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
}
.qty-btn {
  font-size: 16px;
  color: #333;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 5px;
}
.qty-value {
  font-size: 14px;
  font-weight: 500;
  color: #000;
}

.item-remove {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 20px;
}
.item-remove img {
  width: 22px;
  height: 22px;
  transition: opacity 0.2s;
}
.item-remove img:hover {
  opacity: 0.8;
}

.cart-empty {
  flex: 1;
  background-color: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 24px;
  padding: 60px;
  text-align: center;
}
.cart-empty p {
  font-size: 18px;
  color: #555;
  margin-bottom: 20px;
}
.cart-empty .btn {
  display: inline-block;
  padding: 12px 30px;
  background-color: #000;
  color: #fff;
  text-decoration: none;
  border-radius: 60px;
  font-weight: 600;
  transition: background-color 0.2s;
}
.cart-empty .btn:hover {
  background-color: #68a61c;
}

.cart-summary {
  width: 360px;
  background-color: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 24px;
  padding: 30px;
}
.summary-title {
  font-size: 20px;
  font-weight: 600;
  color: #222;
  margin-bottom: 20px;
}
.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
}
.summary-total {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 700;
  color: #000;
  margin: 20px 0;
}
.checkout-btn {
  width: 100%;
  height: 48px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 60px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}
.checkout-btn:hover {
  background-color: #68a61c;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px #00000026;
}

@media (max-width: 1024px) {
  .cart-page {
    padding: 40px 40px;
  }
  .cart-content {
    flex-direction: column;
  }
  .cart-summary {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .cart-item {
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
  .item-quantity {
    margin-left: 0;
  }
}
</style>
