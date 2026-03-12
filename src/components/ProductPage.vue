<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useGoods } from "../composables/useGoods";
import { useAuth } from "../composables/useAuth";
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

const route = useRoute();
const router = useRouter();
const { findBySku } = useGoods();
const { isAuthenticated } = useAuth();
const { addItem } = useCart();

const product = ref(null);
const selectedSize = ref(null);
const quantity = ref(1);

const allSizes = ["XS", "S", "M", "L", "XL"];

const productImage = computed(() => {
  if (!product.value) return "";
  return imageMap[product.value.image] || product1;
});

const categoryName = computed(() => {
  if (!product.value) return "";
  const map = {
    "t-shirts": "Футболки",
    shirts: "Рубашки",
    shorts: "Шорты",
    jeans: "Джинсы",
    sneakers: "Кроссовки",
    sweatshirts: "Свитшоты",
  };
  return map[product.value.category] || product.value.category;
});

onMounted(() => {
  const sku = route.params.sku;
  const found = findBySku(sku);
  if (found) {
    product.value = { ...found };
    if (found.sizes && found.sizes.length > 0) {
      selectedSize.value = found.sizes[0];
    }
  } else {
    router.push("/404");
  }
});

function incrementQty() {
  quantity.value++;
}
function decrementQty() {
  if (quantity.value > 1) quantity.value--;
}

function handleAddToCart() {
  if (!isAuthenticated.value) {
    router.push("/signup");
    return;
  }
  if (!selectedSize.value) {
    return;
  }

  addItem({
    sku: product.value.sku,
    name: product.value.name,
    price: product.value.price,
    size: selectedSize.value,
    quantity: quantity.value,
    image: product.value.image,
  });

  router.push("/cart");
}

import { useFavorites } from "../composables/useFavorites";
const { addItem: addToFavorites } = useFavorites();

function goToFavorites() {
  if (!isAuthenticated.value) {
    router.push("/signup");
    return;
  }
  const original = findBySku(product.value.sku);
  addToFavorites({
    sku: product.value.sku,
    name: product.value.name,
    price: product.value.price,
    size: selectedSize.value,
    image: original.image,
  });
  router.push("/favorites");
}
</script>

<template>
  <main class="product-page">
    <div class="product-container">
      <div class="breadcrumbs">
        <router-link to="/">Главная</router-link> &gt;
        <router-link to="/products">Магазин</router-link> &gt;
        <router-link :to="`/products/${product?.category}`">{{
          categoryName
        }}</router-link>
      </div>

      <div class="product-card" v-if="product">
        <div class="product-gallery">
          <div class="product-image">
            <img :src="productImage" :alt="product.name" />
          </div>
        </div>

        <div class="product-info">
          <h1 class="product-title">{{ product.name }}</h1>

          <div class="product-meta">
            <div class="rating">
              <span class="stars">
                <span
                  class="stars-filled"
                  :style="{ width: (product.rating / 5) * 100 + '%' }"
                  >★★★★★</span
                >
                <span class="stars-empty">★★★★★</span>
              </span>
              <span class="rating-value">{{ product.rating }}/5</span>
            </div>
            <span class="sku">Артикул: {{ product.sku }}</span>
          </div>

          <div class="product-price">
            <span class="current-price">{{ product.price }} ₽</span>
            <span
              v-if="product.oldPrice && product.oldPrice !== product.price"
              class="old-price"
              >{{ product.oldPrice }} ₽</span
            >
            <span v-if="product.discount" class="discount-badge">{{
              product.discount
            }}</span>
          </div>

          <p class="product-description">{{ product.description }}</p>

          <div class="size-selector">
            <h4 class="selector-title">Размер:</h4>
            <div class="size-buttons">
              <button
                v-for="size in allSizes"
                :key="size"
                class="size-btn"
                :class="{
                  disabled: !product.sizes.includes(size),
                  active: selectedSize === size,
                }"
                :disabled="!product.sizes.includes(size)"
                @click="selectedSize = size"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <div class="purchase">
            <div class="quantity-selector">
              <button class="qty-btn" @click="decrementQty">−</button>
              <span class="qty-value">{{ quantity }}</span>
              <button class="qty-btn" @click="incrementQty">+</button>
            </div>
            <button class="add-to-cart" @click="handleAddToCart">
              Добавить в корзину
            </button>
            <button class="favorite-btn" @click="goToFavorites">
              <img src="../assets/icons/icon-heart.svg" alt="В избранное" />
            </button>
          </div>
        </div>
      </div>

      <div class="tabs-section" v-if="product">
        <nav class="tabs-nav">
          <router-link
            :to="{ name: 'ProductDescription', params: { sku: product.sku } }"
            class="tab"
            active-class="active"
            >Описание</router-link
          >
          <router-link
            :to="{ name: 'ProductDetails', params: { sku: product.sku } }"
            class="tab"
            active-class="active"
            >Детали</router-link
          >
          <router-link
            :to="{ name: 'ProductReviews', params: { sku: product.sku } }"
            class="tab"
            active-class="active"
            >Отзывы</router-link
          >
        </nav>

        <div class="tab-content">
          <router-view />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.product-page {
  flex: 1;
  background-color: #f5f5f5;
  padding: 40px 100px;
}

.product-container {
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 4px 12px #0000000d;
}

.breadcrumbs {
  font-size: 14px;
  color: #888;
  margin-bottom: 30px;
}
.breadcrumbs a {
  color: #888;
  text-decoration: none;
  transition: color 0.2s;
}
.breadcrumbs a:hover {
  color: #68a61c;
}

.product-card {
  display: flex;
  gap: 60px;
  flex-wrap: wrap;
}

.product-gallery {
  flex: 1 1 400px;
  max-width: 500px;
  background-color: #f2f2f2;
  border-radius: 24px;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image img {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
}

.product-info {
  flex: 1 1 300px;
}

.product-title {
  font-size: 32px;
  font-weight: 700;
  color: #111;
  margin-bottom: 16px;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  color: #777;
  font-size: 14px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 8px;
}
.stars {
  position: relative;
  display: inline-block;
  font-size: 16px;
  letter-spacing: 2px;
  line-height: 1;
  width: fit-content;
}
.stars-empty {
  color: #e0e0e0;
  white-space: nowrap;
}
.stars-filled {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  white-space: nowrap;
  color: #f5b301;
  pointer-events: none;
}
.rating-value {
  color: #666;
}
.sku {
  color: #999;
}

.product-price {
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.current-price {
  font-size: 26px;
  font-weight: 700;
  color: #000;
}
.old-price {
  font-size: 16px;
  color: #aaa;
  text-decoration: line-through;
}
.discount-badge {
  background-color: #ff4757;
  color: #fff;
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
}

.product-description {
  font-size: 15px;
  color: #666;
  line-height: 1.5;
  max-width: 400px;
  margin-bottom: 30px;
}

.size-selector {
  margin-bottom: 30px;
}
.selector-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}
.size-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.size-btn {
  height: 40px;
  padding: 0 18px;
  border: 2px solid #e0e0e0;
  background: #fff;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}
.size-btn:hover:not(:disabled) {
  border-color: #68a61c;
}
.size-btn.active {
  background-color: #000;
  color: #fff;
  border-color: #000;
}
.size-btn.disabled,
.size-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  border-color: #e0e0e0;
  background-color: #f5f5f5;
}

.purchase {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}
.quantity-selector {
  display: flex;
  align-items: center;
  height: 44px;
  border: 2px solid #e0e0e0;
  border-radius: 40px;
  overflow: hidden;
  width: 120px;
}
.qty-btn {
  width: 36px;
  height: 44px;
  background: #fff;
  border: none;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.qty-btn:hover {
  background-color: #f5f5f5;
}
.qty-value {
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
}
.add-to-cart {
  height: 48px;
  padding: 0 32px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 60px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.add-to-cart:hover {
  background-color: #68a61c;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px #00000026;
}
.favorite-btn {
  width: 48px;
  height: 48px;
  background-color: #000;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.favorite-btn img {
  width: 24px;
  height: 24px;
  filter: brightness(0) invert(1);
}
.favorite-btn:hover {
  background-color: #68a61c;
}

.tabs-section {
  margin-top: 60px;
}
.tabs-nav {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 8px;
}
.tab {
  font-size: 16px;
  font-weight: 500;
  color: #777;
  text-decoration: none;
  padding: 8px 0;
  transition: color 0.2s;
}
.tab:hover {
  color: #68a61c;
}
.tab.active {
  color: #000;
  border-bottom: 2px solid #000;
  margin-bottom: -10px;
}
.tab-content {
  min-height: 200px;
}

@media (max-width: 1024px) {
  .product-page {
    padding: 40px 40px;
  }
  .product-card {
    gap: 30px;
  }
}
@media (max-width: 768px) {
  .product-card {
    flex-direction: column;
  }
  .product-gallery {
    max-width: 100%;
  }
  .purchase {
    flex-direction: column;
    align-items: stretch;
  }
  .quantity-selector {
    width: 100%;
  }
  .favorite-btn {
    width: 100%;
    border-radius: 40px;
  }
}
</style>
