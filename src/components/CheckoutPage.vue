<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useCart } from "../composables/useCart";
import { useAuth } from "../composables/useAuth";

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
const { cart, totalSum, deliveryCost, clearCart } = useCart();
const { activeUser, isAuthenticated } = useAuth();

const total = computed(() => totalSum());

const form = ref({
  name: "",
  surname: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  address: "",
  zip: "",
  cardNumber: "",
  cardExpiry: "",
  cardCvv: "",
});

const errors = ref({});

const countryOptions = [
  { value: "RU", label: "Россия" },
  { value: "CR", label: "Крым" },
];

const citiesByCountry = {
  RU: [
    { value: "moscow", label: "Москва" },
    { value: "spb", label: "Санкт-Петербург" },
  ],
  CR: [
    { value: "evpatoria", label: "Евпатория" },
    { value: "yalta", label: "Ялта" },
  ],
};

const availableCities = computed(() => {
  if (!form.value.country) return [];
  return citiesByCountry[form.value.country] || [];
});

const selectedCountryLabel = computed(() => {
  const opt = countryOptions.find((o) => o.value === form.value.country);
  return opt ? opt.label : "Выберите страну";
});
const selectedCityLabel = computed(() => {
  const opt = availableCities.value.find((o) => o.value === form.value.city);
  return opt ? opt.label : "Выберите город";
});

const countryDropdownOpen = ref(false);
const cityDropdownOpen = ref(false);
const countrySelectRef = ref(null);
const citySelectRef = ref(null);

function toggleCountryDropdown() {
  countryDropdownOpen.value = !countryDropdownOpen.value;
  cityDropdownOpen.value = false;
}
function toggleCityDropdown() {
  cityDropdownOpen.value = !cityDropdownOpen.value;
  countryDropdownOpen.value = false;
}
function selectCountry(value) {
  form.value.country = value;
  form.value.city = "";
  countryDropdownOpen.value = false;
  clearError("country");
}
function selectCity(value) {
  form.value.city = value;
  cityDropdownOpen.value = false;
  clearError("city");
}
function handleClickOutside(event) {
  if (
    countrySelectRef.value &&
    !countrySelectRef.value.contains(event.target)
  ) {
    countryDropdownOpen.value = false;
  }
  if (citySelectRef.value && !citySelectRef.value.contains(event.target)) {
    cityDropdownOpen.value = false;
  }
}
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});
onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

function formatPhone() {
  let digits = form.value.phone.replace(/\D/g, "");
  if (digits.startsWith("8")) digits = "7" + digits.slice(1);
  if (digits && !digits.startsWith("7")) digits = "7" + digits;
  digits = digits.slice(0, 11);
  let formatted = "+7";
  if (digits.length > 1) formatted += " (" + digits.slice(1, 4);
  if (digits.length >= 4) formatted += ") " + digits.slice(4, 7);
  if (digits.length >= 7) formatted += "-" + digits.slice(7, 9);
  if (digits.length >= 9) formatted += "-" + digits.slice(9, 11);
  form.value.phone = formatted;
}

function formatZip() {
  form.value.zip = form.value.zip.replace(/\D/g, "").slice(0, 6);
}

function formatCardNumber() {
  let digits = form.value.cardNumber.replace(/\D/g, "").slice(0, 16);
  let formatted = "";
  for (let i = 0; i < digits.length; i++) {
    if (i > 0 && i % 4 === 0) formatted += " ";
    formatted += digits[i];
  }
  form.value.cardNumber = formatted;
}

function formatExpiry() {
  let digits = form.value.cardExpiry.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) {
    form.value.cardExpiry = digits.slice(0, 2) + "/" + digits.slice(2);
  } else {
    form.value.cardExpiry = digits;
  }
}

function formatCvv() {
  form.value.cardCvv = form.value.cardCvv.replace(/\D/g, "").slice(0, 3);
}

function clearError(field) {
  delete errors.value[field];
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone() {
  if (!form.value.phone) return true;
  const phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
  return phonePattern.test(form.value.phone);
}

function fillUserData() {
  if (isAuthenticated.value && activeUser.value) {
    form.value.name = activeUser.value.name || "";
    form.value.surname = activeUser.value.surname || "";
    form.value.email = activeUser.value.email || "";
    form.value.phone = activeUser.value.phone || "";
  }
}

function validate() {
  errors.value = {};

  if (!form.value.name.trim()) {
    errors.value.name = "Введите имя";
  } else if (form.value.name.trim().length < 2) {
    errors.value.name = "Имя должно содержать минимум 2 символа";
  }

  if (!form.value.surname.trim()) {
    errors.value.surname = "Введите фамилию";
  } else if (form.value.surname.trim().length < 2) {
    errors.value.surname = "Фамилия должна содержать минимум 2 символа";
  }

  if (!form.value.email.trim()) {
    errors.value.email = "Введите email";
  } else if (!validateEmail(form.value.email.trim())) {
    errors.value.email = "Введите корректный email";
  }

  if (!form.value.phone.trim()) {
    errors.value.phone = "Введите телефон";
  } else if (!validatePhone()) {
    errors.value.phone = "Введите корректный номер телефона";
  }

  if (!form.value.country) {
    errors.value.country = "Выберите страну";
  }

  if (!form.value.city) {
    errors.value.city = "Выберите город";
  }

  if (!form.value.address.trim()) {
    errors.value.address = "Введите адрес";
  } else if (form.value.address.trim().length < 5) {
    errors.value.address = "Адрес должен содержать минимум 5 символов";
  }

  if (!form.value.zip.trim()) {
    errors.value.zip = "Введите индекс";
  } else if (!/^\d{6}$/.test(form.value.zip)) {
    errors.value.zip = "Индекс должен состоять из 6 цифр";
  }

  const cardDigits = form.value.cardNumber.replace(/\s/g, "");
  if (!cardDigits) {
    errors.value.cardNumber = "Введите номер карты";
  } else if (!/^\d{16}$/.test(cardDigits)) {
    errors.value.cardNumber = "Номер карты должен содержать 16 цифр";
  }

  const expiryDigits = form.value.cardExpiry.replace(/\D/g, "");
  if (!expiryDigits) {
    errors.value.cardExpiry = "Введите срок действия";
  } else if (!/^\d{4}$/.test(expiryDigits)) {
    errors.value.cardExpiry = "Введите дату в формате ММ/ГГ";
  } else {
    const month = parseInt(expiryDigits.slice(0, 2), 10);
    const year = parseInt(expiryDigits.slice(2), 10);
    if (month < 1 || month > 12) {
      errors.value.cardExpiry = "Неверный месяц";
    } else {
      const now = new Date();
      const currentYear = now.getFullYear() % 100;
      const currentMonth = now.getMonth() + 1;
      if (
        year < currentYear ||
        (year === currentYear && month < currentMonth)
      ) {
        errors.value.cardExpiry = "Карта просрочена";
      }
    }
  }

  if (!form.value.cardCvv) {
    errors.value.cardCvv = "Введите CVV";
  } else if (!/^\d{3}$/.test(form.value.cardCvv)) {
    errors.value.cardCvv = "CVV должен состоять из 3 цифр";
  }

  return Object.keys(errors.value).length === 0;
}

function getProductImage(imageName) {
  return imageMap[imageName] || product1;
}

const showSuccessModal = ref(false);

function handlePayment() {
  if (!validate()) return;

  clearCart();

  showSuccessModal.value = true;
}

function closeSuccessModal() {
  showSuccessModal.value = false;
  router.push("/");
}

onMounted(() => {
  fillUserData();
});
</script>

<template>
  <main class="checkout-page">
    <div class="checkout-container">
      <h1 class="checkout-title">Оплата</h1>
      <div class="breadcrumbs">
        <router-link to="/products">Магазин</router-link> &gt;
        <router-link to="/cart">Корзина</router-link> &gt;
        <span>Оплата</span>
      </div>

      <div class="cart-items" v-if="cart.length">
        <div v-for="item in cart" :key="item.id" class="cart-item">
          <div class="item-image">
            <img :src="getProductImage(item.image)" :alt="item.name" />
          </div>
          <div class="item-info">
            <h3 class="item-name">{{ item.name }}</h3>
            <p class="item-size">Размер: {{ item.size }}</p>
            <p class="item-sku">Артикул: {{ item.sku }}</p>
            <p class="item-price">{{ item.price }} ₽</p>
          </div>
          <div class="item-quantity">
            <span class="item-quantity-label"
              >Количество: {{ item.quantity }}</span
            >
          </div>
        </div>
      </div>

      <div class="cart-summary" v-if="cart.length">
        <h2 class="summary-title">Сумма к оплате</h2>
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
      </div>

      <div class="checkout-forms" v-if="cart.length">
        <div class="checkout-left">
          <div class="form-card">
            <h2 class="form-card__title">Контактная информация</h2>
            <div class="form-field">
              <label>Имя</label>
              <input
                type="text"
                v-model="form.name"
                placeholder="Введите имя"
                @input="clearError('name')"
                name="name"
              />
              <span v-if="errors.name" class="error">{{ errors.name }}</span>
            </div>
            <div class="form-field">
              <label>Фамилия</label>
              <input
                type="text"
                v-model="form.surname"
                placeholder="Введите фамилию"
                @input="clearError('surname')"
                name="surname"
              />
              <span v-if="errors.surname" class="error">{{
                errors.surname
              }}</span>
            </div>
            <div class="form-field">
              <label>Email</label>
              <input
                type="email"
                v-model="form.email"
                placeholder="Введите email"
                @input="clearError('email')"
                name="email"
              />
              <span v-if="errors.email" class="error">{{ errors.email }}</span>
            </div>
            <div class="form-field">
              <label>Номер телефона</label>
              <input
                type="tel"
                v-model="form.phone"
                placeholder="+7 (___) ___-__-__"
                @input="formatPhone"
                name="phone"
              />
              <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
            </div>

            <div class="form-divider"></div>

            <h2 class="form-card__title">Детали доставки</h2>
            <div class="form-field">
              <label>Страна</label>
              <div
                class="custom-select"
                @click.stop="toggleCountryDropdown"
                ref="countrySelectRef"
              >
                <div class="custom-select__trigger">
                  <span>{{ selectedCountryLabel }}</span>
                  <span class="custom-select__arrow">▼</span>
                </div>
                <div class="custom-select__options" v-if="countryDropdownOpen">
                  <div
                    v-for="option in countryOptions"
                    :key="option.value"
                    class="custom-select__option"
                    :class="{
                      'custom-select__option--active':
                        form.country === option.value,
                    }"
                    @click.stop="selectCountry(option.value)"
                  >
                    {{ option.label }}
                  </div>
                </div>
              </div>
            </div>
            <div class="form-field">
              <label>Город</label>
              <div
                class="custom-select"
                @click.stop="toggleCityDropdown"
                ref="citySelectRef"
              >
                <div class="custom-select__trigger">
                  <span>{{ selectedCityLabel }}</span>
                  <span class="custom-select__arrow">▼</span>
                </div>
                <div class="custom-select__options" v-if="cityDropdownOpen">
                  <div
                    v-for="option in availableCities"
                    :key="option.value"
                    class="custom-select__option"
                    :class="{
                      'custom-select__option--active':
                        form.city === option.value,
                    }"
                    @click.stop="selectCity(option.value)"
                  >
                    {{ option.label }}
                  </div>
                </div>
              </div>
            </div>
            <div class="form-field">
              <label>Адрес</label>
              <input
                type="text"
                v-model="form.address"
                placeholder="Введите адрес"
                @input="clearError('address')"
                name="address"
              />
              <span v-if="errors.address" class="error">{{
                errors.address
              }}</span>
            </div>
            <div class="form-field">
              <label>Индекс</label>
              <input
                type="text"
                v-model="form.zip"
                placeholder="Введите индекс"
                maxlength="6"
                @input="formatZip"
                name="index"
              />
              <span v-if="errors.zip" class="error">{{ errors.zip }}</span>
            </div>
          </div>
        </div>

        <div class="checkout-right">
          <div class="form-card">
            <h2 class="form-card__title">Оплата картой</h2>
            <div class="form-field">
              <label>Номер карты</label>
              <input
                type="text"
                v-model="form.cardNumber"
                placeholder="Введите номер карты"
                maxlength="19"
                @input="formatCardNumber"
                name="cardNumber"
              />
              <span v-if="errors.cardNumber" class="error">{{
                errors.cardNumber
              }}</span>
            </div>
            <div class="form-row">
              <div class="form-field" style="flex: 1">
                <label>Срок действия</label>
                <input
                  type="text"
                  v-model="form.cardExpiry"
                  placeholder="MM/ГГ"
                  maxlength="5"
                  @input="formatExpiry"
                  name="expiryDate"
                />
                <span v-if="errors.cardExpiry" class="error">{{
                  errors.cardExpiry
                }}</span>
              </div>
              <div class="form-field" style="flex: 1">
                <label>CVV</label>
                <input
                  type="text"
                  v-model="form.cardCvv"
                  placeholder="PIN"
                  maxlength="3"
                  @input="formatCvv"
                  name="CVV"
                />
                <span v-if="errors.cardCvv" class="error">{{
                  errors.cardCvv
                }}</span>
              </div>
            </div>
            <p class="terms-text">
              Нажатием кнопки ниже Вы соглашаетесь на<br />
              <router-link to="/agreement">Условия и положения</router-link>
            </p>
            <button class="pay-btn" @click="handlePayment">Оплатить</button>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="showSuccessModal"
        class="modal-overlay"
        @click.self="closeSuccessModal"
      >
        <div class="modal-content">
          <h3 class="modal-title">Заказ оформлен!</h3>
          <p>
            Ваш заказ успешно отправлен в обработку. Мы свяжемся с вами в
            ближайшее время.
          </p>
          <button class="btn btn-primary" @click="closeSuccessModal">
            Закрыть
          </button>
        </div>
      </div>
    </Teleport>
  </main>
</template>

<style scoped>
.checkout-page {
  flex: 1;
  background-color: #f5f5f5;
  padding: 40px 100px;
}

.checkout-container {
  max-width: 1200px;
  margin: 0 auto;
}

.checkout-title {
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

.cart-items {
  width: 100%;
  background-color: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 24px;
  padding: 30px;
  margin-bottom: 40px;
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
.item-quantity-label {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.cart-summary {
  width: 100%;
  background-color: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 24px;
  padding: 30px;
  margin-bottom: 40px;
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
  margin: 20px 0 0;
}

.checkout-forms {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

.checkout-left {
  flex: 1 1 520px;
  min-width: 0;
}
.checkout-right {
  flex: 0 0 420px;
}

.form-card {
  background-color: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 24px;
  padding: 30px;
}

.form-card__title {
  font-size: 20px;
  font-weight: 600;
  color: #111;
  margin-bottom: 20px;
}

.form-field {
  margin-bottom: 20px;
}
.form-field label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
}
.form-field input,
.form-field select {
  width: 100%;
  height: 44px;
  padding: 0 16px;
  border: none;
  border-radius: 40px;
  background-color: #f2f2f2;
  font-size: 14px;
  color: #333;
  box-sizing: border-box;
}
.form-field input::placeholder,
.form-field select:invalid {
  color: #aaa;
}
.form-field input:focus,
.form-field select:focus {
  outline: none;
  background-color: #e8e8e8;
}

.custom-select {
  position: relative;
  width: 100%;
  background-color: #f2f2f2;
  border-radius: 40px;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
  color: #333;
}
.custom-select__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 44px;
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

.error {
  display: block;
  margin-top: 6px;
  font-size: 12px;
  color: #ff4757;
}

.form-divider {
  height: 1.5px;
  background-color: #e0e0e0;
  margin: 30px 0;
}

.form-row {
  display: flex;
  gap: 20px;
}

.terms-text {
  font-size: 12px;
  color: #777;
  margin-top: 16px;
  margin-bottom: 16px;
  line-height: 1.5;
}
.terms-text a {
  color: #3b82f6;
  text-decoration: none;
}
.terms-text a:hover {
  text-decoration: underline;
}

.pay-btn {
  width: 100%;
  height: 48px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 60px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.pay-btn:hover {
  background-color: #3e9441;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px #00000026;
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
  padding: 40px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 40px #00000033;
}
.modal-title {
  font-size: 24px;
  font-weight: 600;
  color: #222;
  margin-bottom: 16px;
}
.modal-content p {
  font-size: 16px;
  color: #555;
  margin-bottom: 24px;
}
.modal-content .btn {
  min-width: 120px;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  border: 2px solid #ffffff;
  background-color: #000000;
  border-radius: 60px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: #ffffff;
  transition: all 0.2s;
  text-decoration: none;
}
.btn:hover {
  background-color: #68a61c;
  border-color: #68a61c;
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px #00000026;
}
.btn-primary {
  background-color: #000;
  color: #fff;
  border: none;
}

@media (max-width: 1024px) {
  .checkout-page {
    padding: 40px 40px;
  }
  .checkout-forms {
    flex-direction: column;
  }
  .checkout-left,
  .checkout-right {
    width: 100%;
    flex: none;
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
