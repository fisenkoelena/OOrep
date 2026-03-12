<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
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
const { getAll, findBySku } = useGoods();
const { isAuthenticated } = useAuth();
const { addItem } = useCart();

const allProducts = computed(() => {
  return getAll().map((item) => ({
    ...item,
    image: imageMap[item.image] || product1,
  }));
});

const categories = ref([
  { name: "Распродажа", path: "/products/sale" },
  { name: "Футболки", path: "/products/t-shirts" },
  { name: "Рубашки", path: "/products/shirts" },
  { name: "Шорты", path: "/products/shorts" },
  { name: "Джинсы", path: "/products/jeans" },
  { name: "Кроссовки", path: "/products/sneakers" },
  { name: "Свитшоты", path: "/products/sweatshirts" },
]);

const currentCategory = computed(() => route.params.category || null);

const filteredByCategory = computed(() => {
  if (!currentCategory.value) return allProducts.value;
  if (currentCategory.value === "sale") {
    return allProducts.value.filter((p) => p.onSale);
  }
  return allProducts.value.filter((p) => p.category === currentCategory.value);
});

const minPrice = computed(() =>
  Math.min(...allProducts.value.map((p) => p.price)),
);
const maxPrice = computed(() =>
  Math.max(...allProducts.value.map((p) => p.price)),
);
const priceMin = ref(minPrice.value);
const priceMax = ref(maxPrice.value);

function handlePriceMinInput() {
  if (priceMin.value > priceMax.value) priceMin.value = priceMax.value;
  if (priceMin.value < minPrice.value) priceMin.value = minPrice.value;
}
function handlePriceMaxInput() {
  if (priceMax.value < priceMin.value) priceMax.value = priceMin.value;
  if (priceMax.value > maxPrice.value) priceMax.value = maxPrice.value;
}
function handlePriceMinChange() {
  if (priceMin.value > priceMax.value) priceMin.value = priceMax.value;
}
function handlePriceMaxChange() {
  if (priceMax.value < priceMin.value) priceMax.value = priceMin.value;
}

const selectedSize = ref(null);

const sortOptions = [
  { value: "default", label: "Все товары" },
  { value: "price-asc", label: "Сначала дешёвые" },
  { value: "price-desc", label: "Сначала дорогие" },
  { value: "name-asc", label: "По названию (А-Я)" },
  { value: "name-desc", label: "По названию (Я-А)" },
];
const sortOption = ref("default");
const selectedSortLabel = computed(() => {
  const option = sortOptions.find((o) => o.value === sortOption.value);
  return option ? option.label : "Сортировка";
});

const isDropdownOpen = ref(false);
const selectRef = ref(null);
function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}
function selectSort(value) {
  sortOption.value = value;
  isDropdownOpen.value = false;
}
function handleClickOutside(event) {
  if (selectRef.value && !selectRef.value.contains(event.target)) {
    isDropdownOpen.value = false;
  }
}
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});
onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

const displayedProducts = computed(() => {
  let products = [...filteredByCategory.value];
  products = products.filter(
    (p) => p.price >= priceMin.value && p.price <= priceMax.value,
  );
  if (selectedSize.value) {
    products = products.filter(
      (p) => p.sizes && p.sizes.includes(selectedSize.value),
    );
  }
  switch (sortOption.value) {
    case "price-asc":
      products.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      products.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      products.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      products.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "default":
    default:
      break;
  }
  return products;
});

const pageTitle = computed(() => {
  if (!currentCategory.value) return "Магазин";
  if (currentCategory.value === "sale") return "Распродажа";
  const cat = categories.value.find(
    (c) => c.path === `/products/${currentCategory.value}`,
  );
  return cat ? cat.name : "Магазин";
});

function isActiveCategory(path) {
  return route.path === path;
}

function goToProduct(sku) {
  router.push(`/product/${sku}`);
}
function handleAddToCart(product) {
  if (!isAuthenticated.value) {
    router.push("/signup");
    return;
  }
  const size =
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : null;
  const original = findBySku(product.sku);
  addItem({
    sku: product.sku,
    name: product.name,
    price: product.price,
    size: size,
    quantity: 1,
    image: original.image,
  });
  router.push("/cart");
}

import { useFavorites } from "../composables/useFavorites";
const { addItem: addToFavorites } = useFavorites();

function goToFavorites(item) {
  if (!isAuthenticated.value) {
    router.push("/signup");
    return;
  }
  const original = findBySku(item.sku);
  addToFavorites({
    sku: item.sku,
    name: item.name,
    price: item.price,
    size: item.sizes && item.sizes.length > 0 ? item.sizes[0] : null,
    image: original.image,
  });
  router.push("/favorites");
}

const sizes = ["XS", "S", "M", "L", "XL"];
</script>

<template>
  <main class="catalog-page">
    <div class="catalog-container">
      <aside class="catalog-filters">
        <h3 class="filters-main-title">Фильтры</h3>
        <div class="filters-block">
          <ul class="filters-categories">
            <li
              v-for="cat in categories"
              :key="cat.path"
              class="filter-category"
              :class="{ 'filter-category--active': isActiveCategory(cat.path) }"
            >
              <router-link :to="cat.path">{{ cat.name }}</router-link>
              <span class="category-arrow">›</span>
            </li>
          </ul>
        </div>

        <div class="filters-block">
          <h4 class="filters-title">Цена</h4>
          <div class="price-range">
            <div class="price-inputs">
              <input
                type="number"
                v-model.number="priceMin"
                placeholder="от"
                class="price-input"
                min="0"
                @input="handlePriceMinInput"
                name="priceMin"
              />
              <span class="price-separator">—</span>
              <input
                type="number"
                v-model.number="priceMax"
                placeholder="до"
                class="price-input"
                min="0"
                @input="handlePriceMaxInput"
                name="priceMax"
              />
            </div>
            <div class="price-slider-container">
              <div class="slider-track"></div>
              <input
                type="range"
                v-model.number="priceMin"
                :min="minPrice"
                :max="maxPrice"
                step="10"
                class="slider slider-min"
                @input="handlePriceMinChange"
                name="PriceMin"
              />
              <input
                type="range"
                v-model.number="priceMax"
                :min="minPrice"
                :max="maxPrice"
                step="10"
                class="slider slider-max"
                @input="handlePriceMaxChange"
                name="PriceMax"
              />
            </div>
          </div>
        </div>

        <div class="filters-block">
          <h4 class="filters-title">Размер</h4>
          <div class="size-grid">
            <button
              v-for="size in sizes"
              :key="size"
              class="size-btn"
              :class="{ 'size-btn--active': selectedSize === size }"
              @click="selectedSize = selectedSize === size ? null : size"
            >
              {{ size }}
            </button>
          </div>
        </div>
      </aside>

      <section class="catalog-content">
        <div class="catalog-header">
          <div class="breadcrumbs">
            <router-link to="/">Главная</router-link> &gt;
            <router-link to="/products">Магазин</router-link>
            <span v-if="currentCategory"> &gt; {{ pageTitle }}</span>
          </div>
          <div
            class="custom-select"
            @click.stop="toggleDropdown"
            ref="selectRef"
          >
            <div class="custom-select__trigger">
              <span>{{ selectedSortLabel }}</span>
              <span class="custom-select__arrow">▼</span>
            </div>
            <div class="custom-select__options" v-if="isDropdownOpen">
              <div
                v-for="option in sortOptions"
                :key="option.value"
                class="custom-select__option"
                :class="{
                  'custom-select__option--active': sortOption === option.value,
                }"
                @click.stop="selectSort(option.value)"
              >
                {{ option.label }}
              </div>
            </div>
          </div>
        </div>

        <h2 class="catalog-title">{{ pageTitle }}</h2>

        <div class="products-grid">
          <div
            v-for="product in displayedProducts"
            :key="product.id"
            class="product-card"
            @click="goToProduct(product.sku)"
          >
            <div class="product-card__image">
              <img :src="product.image" :alt="product.name" />
            </div>
            <div class="product-card__info">
              <h3 class="product-card__title">{{ product.name }}</h3>
              <div class="product-card__rating">
                <div class="stars-wrapper">
                  <div
                    class="stars-filled"
                    :style="{ width: (product.rating / 5) * 100 + '%' }"
                  >
                    ★★★★★
                  </div>
                  <div class="stars-empty">★★★★★</div>
                </div>
                <span class="rating-value">{{ product.rating }}/5</span>
              </div>
              <div class="product-card__price">
                <span class="product-card__current">{{ product.price }} ₽</span>
                <span
                  v-if="product.oldPrice && product.oldPrice !== product.price"
                  class="product-card__old"
                  >{{ product.oldPrice }} ₽</span
                >
                <span v-if="product.discount" class="product-card__discount">{{
                  product.discount
                }}</span>
              </div>
              <div class="product-card__actions">
                <button
                  class="product-card__cart"
                  @click.stop="handleAddToCart(product)"
                >
                  <img src="../assets/icons/icon-cart.svg" alt="Корзина" />
                </button>
                <button
                  class="product-card__favorite"
                  @click.stop="goToFavorites(product)"
                >
                  <img src="../assets/icons/icon-heart.svg" alt="В избранное" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.catalog-page {
  flex: 1;
  background-color: #f5f5f5;
  padding: 40px 100px;
}

.catalog-container {
  display: flex;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.catalog-filters {
  flex: 0 0 280px;
  background-color: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 24px;
  padding: 24px 20px;
  height: fit-content;
}

.filters-main-title {
  font-size: 20px;
  font-weight: 700;
  color: #222;
  margin-bottom: 20px;
  text-transform: uppercase;
}

.filters-block {
  margin-bottom: 30px;
}

.filters-title {
  font-size: 16px;
  font-weight: 600;
  color: #222;
  margin-bottom: 12px;
}

.filters-categories {
  list-style: none;
  padding: 0;
  margin: 0;
}

.filter-category {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  transition: color 0.2s;
}

.filter-category a {
  text-decoration: none;
  color: inherit;
  flex: 1;
  font-size: 14px;
}

.filter-category:hover,
.filter-category:hover a {
  color: #68a61c;
}

.filter-category--active,
.filter-category--active a {
  color: #68a61c;
  font-weight: 600;
}

.category-arrow {
  font-size: 16px;
  color: #999;
}

.price-range {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.price-inputs {
  display: flex;
  align-items: center;
  gap: 8px;
}

.price-input {
  width: 70px;
  padding: 8px 10px;
  border: 2px solid #e0e0e0;
  border-radius: 40px;
  font-size: 14px;
  text-align: center;
}

.price-input:focus {
  outline: none;
  border-color: #68a61c;
}

.price-separator {
  color: #666;
}

.price-slider-container {
  position: relative;
  height: 20px;
  margin: 10px 0;
}

.slider-track {
  position: absolute;
  top: 8px;
  left: 0;
  right: 0;
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  z-index: 0;
}

.slider {
  position: absolute;
  width: 100%;
  height: 20px;
  background: transparent;
  appearance: none;
  pointer-events: none;
  z-index: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #000;
  cursor: pointer;
  pointer-events: auto;
  margin-top: -7px;
  box-shadow: 0 2px 4px #00000033;
  z-index: 2;
}

.slider-min {
  z-index: 2;
}
.slider-max {
  z-index: 3;
}

.size-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.size-btn {
  width: 44px;
  height: 44px;
  border: 2px solid #e0e0e0;
  background-color: #fff;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.size-btn:hover {
  border-color: #68a61c;
}

.size-btn--active {
  background-color: #000;
  color: #fff;
  border-color: #000;
}

.catalog-content {
  flex: 1;
}

.catalog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 16px;
}

.breadcrumbs {
  font-size: 14px;
  color: #888;
}

.breadcrumbs a {
  color: #888;
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumbs a:hover {
  color: #68a61c;
}

.custom-select {
  position: relative;
  width: 220px;
  background-color: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 40px;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
  color: #333;
  transition: border-color 0.2s;
}

.custom-select:hover {
  border-color: #68a61c;
}

.custom-select__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
}

.custom-select__arrow {
  font-size: 10px;
  color: #999;
  transition: transform 0.2s;
}

.custom-select__options {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 20px;
  overflow: hidden;
  z-index: 10;
  box-shadow: 0 4px 12px #0000001a;
}

.custom-select__option {
  padding: 10px 16px;
  transition:
    background-color 0.2s,
    color 0.2s;
}

.custom-select__option:hover {
  background-color: #f5f5f5;
  color: #68a61c;
}

.custom-select__option--active {
  color: #68a61c;
  font-weight: 600;
}

.catalog-title {
  font-size: 48px;
  font-weight: 700;
  color: #222;
  margin-bottom: 40px;
  text-transform: uppercase;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 40px;
}

.product-card {
  background-color: #fff;
  border: 2px solid #e6e6e6;
  border-radius: 16px;
  overflow: hidden;
  transition: box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.product-card:hover {
  box-shadow: 0 8px 24px #0000001a;
  border-color: #d0d0d0;
}

.product-card__image {
  background-color: #f5f5f5;
  padding-top: 100%;
  position: relative;
}

.product-card__image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-card__info {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.product-card__title {
  font-size: 16px;
  font-weight: 600;
  color: #222;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-card__rating {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stars-wrapper {
  position: relative;
  display: inline-block;
  font-size: 14px;
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
  color: #f5b342;
  pointer-events: none;
}

.rating-value {
  font-size: 14px;
  color: #666;
}

.product-card__price {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.product-card__current {
  font-size: 18px;
  font-weight: 700;
  color: #000;
}

.product-card__old {
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
}

.product-card__discount {
  background-color: #ff4757;
  color: #fff;
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
}

.product-card__actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  gap: 8px;
}

.product-card__cart {
  min-width: 180px;
  height: 40px;
  padding: 0 20px;
  background-color: #000;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.product-card__cart img {
  width: 20px;
  height: 20px;
  filter: brightness(0) invert(1);
}
.product-card__cart:hover {
  background-color: #68a61c;
}

.product-card__favorite {
  width: 40px;
  height: 40px;
  background-color: #000;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.product-card__favorite img {
  width: 20px;
  height: 20px;
  filter: brightness(0) invert(1);
}
.product-card__favorite:hover {
  background-color: #68a61c;
}

@media (max-width: 1024px) {
  .catalog-page {
    padding: 40px 40px;
  }
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .catalog-container {
    flex-direction: column;
  }
  .catalog-filters {
    flex-basis: auto;
  }
  .catalog-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .custom-select {
    width: 100%;
  }
  .products-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .catalog-page {
    padding: 20px;
  }
}
</style>
