<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useGoods } from "../composables/useGoods";
import { useAuth } from "../composables/useAuth";
import { useCart } from "../composables/useCart";
import { useFavorites } from "../composables/useFavorites";
const { addItem: addToFavorites } = useFavorites();

import product1 from "../assets/products/product1.jpg";
import product2 from "../assets/products/product2.jpg";
import product3 from "../assets/products/product3.jpg";
import product4 from "../assets/products/product4.jpg";
import product5 from "../assets/products/product5.jpg";
import product6 from "../assets/products/product6.jpg";
import product7 from "../assets/products/product7.jpg";
import product8 from "../assets/products/product8.jpg";

import shirtsImg from "../assets/bannerCategory/shirts.jpg";
import sneakersImg from "../assets/bannerCategory/sneakers.jpg";
import tshirtsImg from "../assets/bannerCategory/tshirt.jpg";
import jeansImg from "../assets/bannerCategory/jeans.jpg";

const imageMap = {
  "product1.jpg": product1,
  "product2.jpg": product2,
  "product3.jpg": product3,
  "product4.jpg": product4,
  "product5.jpg": product5,
  "product6.jpg": product6,
  "product7.jpg": product7,
  "product8.jpg": product8,
};

const router = useRouter();
const { getAll } = useGoods();
const { isAuthenticated } = useAuth();
const { addItem } = useCart();

const saleItems = computed(() =>
  getAll()
    .filter((item) => item.onSale)
    .slice(0, 8),
);

const newsletterEmail = ref("");
const newsletterSuccess = ref(false);
const newsletterError = ref("");

const brands = ["VERSACE", "ZARA", "Present&Simple", "Lime", "Calvin Klein"];

const categoryItems = ref([
  { name: "РУБАШКИ", image: shirtsImg, route: "/products/shirts" },
  { name: "КРОССОВКИ", image: sneakersImg, route: "/products/sneakers" },
  { name: "ФУТБОЛКИ", image: tshirtsImg, route: "/products/t-shirts" },
  { name: "ДЖИНСЫ", image: jeansImg, route: "/products/jeans" },
]);

function goToShop() {
  router.push("/products");
}
function goToCategory(category) {
  router.push(category.route);
}
function goToSale() {
  router.push("/products/sale");
}
function goToProduct(sku) {
  router.push(`/product/${sku}`);
}
function handleAddToCart(item) {
  if (!isAuthenticated.value) {
    router.push("/signup");
    return;
  }
  const size = item.sizes && item.sizes.length > 0 ? item.sizes[0] : null;
  addItem({
    sku: item.sku,
    name: item.name,
    price: item.price,
    size: size,
    quantity: 1,
    image: item.image,
  });
  router.push("/cart");
}
function goToFavorites(item) {
  if (!isAuthenticated.value) {
    router.push("/signup");
    return;
  }
  addToFavorites({
    sku: item.sku,
    name: item.name,
    price: item.price,
    size: item.sizes && item.sizes.length > 0 ? item.sizes[0] : null,
    image: item.image,
  });
  router.push("/favorites");
}

function handleNewsletterSubmit() {
  newsletterSuccess.value = false;
  newsletterError.value = "";

  if (!newsletterEmail.value.trim()) {
    newsletterError.value = "Введите email";
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(newsletterEmail.value.trim())) {
    newsletterError.value = "Введите корректный email";
    return;
  }

  newsletterSuccess.value = true;
  newsletterEmail.value = "";
  setTimeout(() => {
    newsletterSuccess.value = false;
  }, 5000);
}

function getProductImage(imageName) {
  return imageMap[imageName] || product1;
}
</script>

<template>
  <main class="home">
    <section class="hero">
      <div class="hero__content">
        <div class="hero__title">
          <span class="hero__title-line">Одежда, которая</span>
          <span class="hero__title-accent">Включает</span>
          <span class="hero__title-line">Твой стиль</span>
        </div>
        <p class="hero__subtitle">
          исследуй наш выбор брендовой одежды, чтобы подчеркнуть твой уникальный
          стиль, будь ON
        </p>
        <button class="btn hero__button" @click="goToShop">к покупкам</button>
        <div class="hero__stats">
          <div class="stat">
            <span class="stat__number">2,000+</span>
            <span class="stat__label">фирменной одежды</span>
          </div>
          <div class="stat__divider"></div>
          <div class="stat">
            <span class="stat__number">30,000+</span>
            <span class="stat__label">счастливых клиентов</span>
          </div>
        </div>
      </div>
      <div class="hero__image">
        <img src="../assets/pageContent/model.png" alt="Модель" />
      </div>
    </section>

    <section class="brands">
      <div class="brands__wrapper">
        <div class="brands__track">
          <div v-for="brand in brands" :key="brand" class="brand__item">
            {{ brand }}
          </div>
          <div
            v-for="brand in brands"
            :key="brand + '-dup'"
            class="brand__item"
          >
            {{ brand }}
          </div>
        </div>
      </div>
    </section>

    <section class="sale">
      <div class="container">
        <h2 class="section-title">Распродажа</h2>
        <div class="sale__grid">
          <div
            v-for="item in saleItems"
            :key="item.id"
            class="product-card"
            @click="goToProduct(item.sku)"
          >
            <div class="product-card__image">
              <img :src="getProductImage(item.image)" :alt="item.name" />
            </div>
            <div class="product-card__info">
              <h3 class="product-card__title">{{ item.name }}</h3>
              <div class="product-card__rating">
                <div class="stars-wrapper">
                  <div
                    class="stars-filled"
                    :style="{ width: (item.rating / 5) * 100 + '%' }"
                  >
                    ★★★★★
                  </div>
                  <div class="stars-empty">★★★★★</div>
                </div>
                <span class="rating-value">{{ item.rating }}/5</span>
              </div>
              <div class="product-card__price">
                <span class="product-card__current">{{ item.price }} ₽</span>
                <span class="product-card__old">{{ item.oldPrice }} ₽</span>
                <span class="product-card__discount">{{ item.discount }}</span>
              </div>
              <div class="product-card__actions">
                <button
                  class="product-card__cart"
                  @click.stop="handleAddToCart(item)"
                >
                  <img src="../assets/icons/icon-cart.svg" alt="Корзина" />
                </button>
                <button
                  class="product-card__favorite"
                  @click.stop="goToFavorites(item)"
                >
                  <img src="../assets/icons/icon-heart.svg" alt="В избранное" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="sale__button-wrapper">
          <button class="btn sale__button" @click="goToSale">
            Смотреть все
          </button>
        </div>
      </div>
    </section>

    <section class="categories">
      <div class="container">
        <div class="categories__grid">
          <div
            v-for="cat in categoryItems"
            :key="cat.name"
            class="category-card"
            @click="goToCategory(cat)"
          >
            <img
              :src="cat.image"
              :alt="cat.name"
              class="category-card__image"
            />
            <span class="category-card__title">{{ cat.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="newsletter">
      <div class="newsletter__inner">
        <h3 class="newsletter__title">
          Будь всегда в курсе наших последних предложений
        </h3>
        <div class="newsletter__form-wrapper">
          <div class="newsletter__input-wrapper">
            <img
              src="../assets/icons/icon-email.svg"
              class="newsletter__icon"
              alt="email"
            />
            <input
              type="email"
              v-model="newsletterEmail"
              placeholder="Введите почту"
              class="newsletter__input"
              @input="
                newsletterSuccess = false;
                newsletterError = '';
              "
              name="email"
              autocomplete="email"
            />
          </div>
          <div
            v-if="newsletterSuccess"
            class="newsletter__message newsletter__success"
          >
            Спасибо за подписку!
          </div>
          <div
            v-if="newsletterError"
            class="newsletter__message newsletter__error"
          >
            {{ newsletterError }}
          </div>
          <button class="newsletter__button" @click="handleNewsletterSubmit">
            подписаться на рассылку
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.home {
  width: 100%;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.hero {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  background: #e6e6e6;
  width: 100%;
  margin: 0;
  gap: 15px;
}
.hero__content {
  flex: 1;
  max-width: 600px;
  padding: 90px 0 90px 100px;
}
.hero__image {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0;
}
.hero__image img {
  max-width: 700px;
  max-height: 700px;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 24px;
}
.hero__title {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  text-transform: uppercase;
  gap: 4px;
}
.hero__title-line {
  font-size: 64px;
  font-weight: 700;
  color: #000000;
  line-height: 1.2;
  white-space: nowrap;
}
.hero__title-accent {
  font-size: 120px;
  font-weight: 700;
  color: #68a61c;
  line-height: 1;
  white-space: nowrap;
  text-transform: uppercase;
}
.hero__subtitle {
  font-size: 18px;
  color: #606060;
  margin-bottom: 24px;
  max-width: 500px;
}
.hero__button {
  margin-bottom: 32px;
}
.hero__stats {
  display: flex;
  align-items: center;
  gap: 24px;
}
.stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.stat__number {
  font-size: 36px;
  font-weight: 700;
  color: #000;
  line-height: 1;
}
.stat__label {
  font-size: 16px;
  color: #606060;
  line-height: 1.3;
}
.stat__divider {
  width: 2px;
  height: 40px;
  background-color: #ccc;
}

.brands {
  background-color: #000;
  height: 200px;
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 100%;
  margin: 0;
}
.brands__wrapper {
  width: 100%;
  overflow: hidden;
}
.brands__track {
  display: flex;
  gap: 60px;
  width: fit-content;
  animation: scroll 40s linear infinite;
}
.brand__item {
  font-size: 50px;
  font-weight: 400;
  color: #fff;
  white-space: nowrap;
  transition: opacity 0.2s;
}
.brand__item:hover {
  opacity: 1;
}
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.sale {
  margin: 90px 0;
}
.section-title {
  font-size: 60px;
  font-weight: 700;
  color: #000000;
  text-align: left;
  text-transform: uppercase;
  margin-bottom: 90px;
}
.sale__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 40px;
  gap: 24px;
}
.product-card {
  background: #fff;
  border: 2px solid #e6e6e6;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.3s;
}
.product-card:hover {
  box-shadow: 0 8px 24px #0000001a;
}
.product-card__image {
  position: relative;
  padding-top: 100%;
}
.product-card__image img {
  position: absolute;
  object-fit: cover;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.product-card__info {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.product-card__title {
  font-size: 20px;
  font-weight: 600;
  color: #000000;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
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
  gap: 12px;
  flex-wrap: wrap;
}
.product-card__current {
  font-size: 20px;
  font-weight: 600;
  color: #000;
}
.product-card__old {
  font-size: 16px;
  color: #999;
  text-decoration: line-through;
}
.product-card__discount {
  background-color: #ff4757;
  color: #fff;
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
}
.product-card__actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
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

.sale__button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.btn {
  padding: 12px 24px;
  border: 2px solid #ffffff;
  background-color: #000000;
  border-radius: 60px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: #ffffff;
  transition: all 0.2s;
}
.btn:hover {
  background-color: #68a61c;
  border-color: #68a61c;
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px #00000026;
}

.categories {
  background-color: #000;
  border-radius: 24px;
  max-width: 1200px;
  margin: 95px auto;
  padding: 45px 0px;
  box-sizing: border-box;
}
.categories__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 45px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.category-card {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 16px;
  cursor: pointer;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}
.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px #0000004d;
}
.category-card__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.category-card__title {
  position: absolute;
  bottom: 30px;
  left: 30px;
  color: #000;
  font-size: 64px;
  font-weight: 700;
  z-index: 2;
  text-shadow: 0 0 10px #ffffffcc;
  white-space: nowrap;
  transition: font-size 0.3s;
}
.category-card:hover .category-card__title {
  font-size: 70px;
}

.newsletter {
  background-color: #000;
  border-radius: 24px;
  max-width: 1200px;
  margin: 90px auto;
  padding: 60px;
  box-sizing: border-box;
}
.newsletter__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  gap: 95px;
  align-items: center;
  flex-wrap: wrap;
}
.newsletter__title {
  font-size: 40px;
  font-weight: 700;
  color: #fff;
  max-width: 650px;
  margin: 0;
  line-height: 1.2;
  text-transform: uppercase;
}
.newsletter__form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 320px;
  flex: 1;
  max-width: 400px;
}
.newsletter__input-wrapper {
  position: relative;
  width: 100%;
}
.newsletter__icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  opacity: 0.6;
  pointer-events: none;
}
.newsletter__input {
  width: 100%;
  padding: 16px 16px 16px 48px;
  border: 2px solid #ffffff;
  border-radius: 60px;
  font-size: 16px;
  color: #000000;
  background-color: #f0f0f0;
  transition: border-color 0.2s;
  box-sizing: border-box;
}
.newsletter__input:focus {
  outline: none;
}
.newsletter__input::placeholder {
  color: #aaa;
}
.newsletter__button {
  padding: 16px 32px;
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 40px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
}
.newsletter__button:hover {
  background-color: #68a61c;
  color: #fff;
  transform: translateY(-2px);
}
.newsletter__message {
  margin-left: 16px;
  font-size: 16px;
  text-align: left;
}
.newsletter__error {
  color: #ff4757;
}
.newsletter__success {
  color: #ffffff;
}

@media (max-width: 1200px) {
  .hero__content {
    padding-left: 40px;
  }
  .categories,
  .newsletter {
    margin: 45px 40px;
  }
}
@media (max-width: 1024px) {
  .hero {
    flex-direction: column;
    gap: 0;
  }
  .hero__content {
    max-width: 100%;
    text-align: center;
    padding: 90px 40px 0;
  }
  .hero__title {
    align-items: center;
  }
  .hero__subtitle {
    margin-left: auto;
    margin-right: auto;
  }
  .hero__stats {
    justify-content: center;
  }
  .hero__image {
    justify-content: center;
    padding: 0 40px 90px;
  }
  .hero__image img {
    max-height: 400px;
    max-width: 400px;
  }
  .sale {
    margin: 70px 0;
  }
  .section-title {
    font-size: 48px;
  }
  .sale__grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .category-card__title {
    font-size: 48px;
    bottom: 20px;
    left: 20px;
  }
  .category-card:hover .category-card__title {
    font-size: 54px;
  }
}
@media (max-width: 768px) {
  .hero__title-line {
    font-size: 48px;
  }
  .hero__title-accent {
    font-size: 80px;
  }
  .hero__stats {
    flex-direction: column;
    gap: 16px;
  }
  .stat__divider {
    display: none;
  }
  .brands {
    height: 150px;
  }
  .brand__item {
    font-size: 36px;
  }
  .brands__track {
    gap: 40px;
  }
  .sale {
    margin: 60px 0;
  }
  .section-title {
    font-size: 40px;
  }
  .categories {
    margin: 45px 20px;
    padding: 45px 0;
  }
  .categories__grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .category-card {
    height: 300px;
  }
  .category-card__title {
    font-size: 40px;
    bottom: 20px;
    left: 20px;
  }
  .category-card:hover .category-card__title {
    font-size: 46px;
  }
  .newsletter {
    margin: 45px 20px;
    padding: 40px 0;
  }
  .newsletter__inner {
    flex-direction: column;
    text-align: center;
    gap: 30px;
  }
  .newsletter__title {
    max-width: 100%;
  }
  .newsletter__form-wrapper {
    min-width: auto;
    width: 100%;
    max-width: 100%;
  }
}
@media (max-width: 480px) {
  .hero__content {
    padding: 60px 20px 0;
  }
  .hero__image {
    padding: 0 20px 60px;
  }
  .hero__title-line {
    font-size: 36px;
  }
  .hero__title-accent {
    font-size: 60px;
  }
  .hero__button {
    width: 100%;
    padding: 12px 30px;
  }
  .hero__image img {
    max-height: 300px;
    max-width: 300px;
  }
  .brands {
    height: 120px;
  }
  .brand__item {
    font-size: 28px;
  }
  .sale {
    margin: 45px 0;
  }
  .section-title {
    font-size: 32px;
  }
  .category-card {
    height: 250px;
  }
  .category-card__title {
    font-size: 32px;
    bottom: 15px;
    left: 15px;
  }
  .category-card:hover .category-card__title {
    font-size: 38px;
  }
  .newsletter {
    padding: 30px 0;
  }
  .newsletter__title {
    font-size: 32px;
  }
  .sale__grid {
    grid-template-columns: 1fr;
  }
}
</style>
