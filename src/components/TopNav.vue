<script setup>
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";

const router = useRouter();
const { isAuthenticated, isAdmin } = useAuth();

function goToAdmin() {
  router.push('/admin');
}

function goToLogin() {
  router.push("/login");
}
function goToSignup() {
  router.push("/signup");
}
function goToFavorites() {
  router.push("/favorites");
}
function goToCart() {
  router.push("/cart");
}
function goToProfile() {
  router.push("/profile");
}
</script>

<template>
  <header class="topnav">
    <router-link to="/" class="topnav__logo">
      <img src="../assets/logo/logo-main.svg" alt="OUTFITON" />
    </router-link>

    <nav class="topnav__nav">
      <router-link to="/products" class="topnav__link">Магазин</router-link>
      <router-link to="/products/sale" class="topnav__link">Распродажа</router-link>
      <router-link to="/about" class="topnav__link">О компании</router-link>
    </nav>

    <div class="topnav__search-wrapper">
      <img
        src="../assets/icons/icon-search.svg"
        class="search-icon"
        alt="Поиск"
      />
      <input type="text" placeholder="Поиск" class="search-input" name="search" autocomplete="search"/>
    </div>

    <div v-if="!isAuthenticated" class="topnav__actions">
      <button class="btn" @click="goToLogin">ВХОД</button>
      <button class="btn" @click="goToSignup">РЕГИСТРАЦИЯ</button>
    </div>

    <div v-else class="topnav__icons">
      <button v-if="isAdmin" class="icon-btn" @click="goToAdmin">
        <img src="../assets/icons/icon-settings.svg" alt="Админ" />
      </button>      
      <button class="icon-btn" @click="goToFavorites">
        <img src="../assets/icons/icon-heart.svg" alt="Избранное" />
      </button>
      <button class="icon-btn" @click="goToCart">
        <img src="../assets/icons/icon-cart.svg" alt="Корзина" />
      </button>
      <button class="icon-btn" @click="goToProfile">
        <img src="../assets/icons/icon-profile.svg" alt="Профиль" />
      </button>
    </div>
  </header>
</template>

<style scoped>
.topnav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 100px;
  background-color: #ffffff;
  border-bottom: 1.5px solid #e0e0e0;
  flex-wrap: wrap;
  gap: 30px;
}

.topnav__logo img {
  display: block;
  width: 200px;
  height: 150px;
  object-fit: contain;
}

.topnav__nav {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}

.topnav__link {
  font-size: 16px;
  color: #000000;
  text-decoration: none;
  transition: color 0.2s;
}

.topnav__link:hover {
  color: #68a61c;
}

.topnav__search-wrapper {
  position: relative;
  flex: 0 1 auto;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  opacity: 0.6;
  pointer-events: none;
}

.search-input {
  padding: 12px 16px 12px 48px;
  border: 2px solid #f0f0f0;
  border-radius: 60px;
  font-size: 14px;
  color: #000000;
  background-color: #f0f0f0;
  transition: border-color 0.2s;
  width: 250px;
}

.search-input:focus {
  outline: none;
}

.search-input::placeholder {
  color: #909090;
}

.topnav__actions {
  display: flex;
  gap: 12px;
}

.topnav__icons {
  display: flex;
  gap: 16px;
  align-items: center;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.icon-btn:hover {
  background-color: #f0f0f0;
}

.icon-btn img {
  width: 24px;
  height: 24px;
  display: block;
}

.btn {
  padding: 12px 24px;
  border: 2px solid #ffffff;
  background-color: #000000;
  border-radius: 60px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  color: #ffffff;
}

.btn:hover {
  background-color: #68a61c;
  border-color: #68a61c;
  color: #ffffff;
}

@media (max-width: 1200px) {
  .topnav {
    padding: 10px 40px;
  }
}

@media (max-width: 992px) {
  .topnav {
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
    padding: 10px 40px;
  }

  .topnav__logo {
    text-align: center;
  }

  .topnav__nav {
    justify-content: center;
  }

  .topnav__search-wrapper {
    width: 100%;
  }

  .search-input {
    width: 100%;
  }

  .topnav__actions,
  .topnav__icons {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .topnav {
    padding: 10px 20px;
  }

  .topnav__nav {
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .topnav__nav {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .btn {
    padding: 10px 20px;
  }
}
</style>
