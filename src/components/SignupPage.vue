<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';

const router = useRouter();
const { register } = useAuth();

const form = reactive({
  username: '',
  email: '',
  phone: '',
  password: '',
});

const errors = ref({});

function clearError(field) {
  delete errors.value[field];
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function formatPhone() {
  let digits = form.phone.replace(/\D/g, '');
  if (digits.startsWith('8')) digits = '7' + digits.slice(1);
  if (digits && !digits.startsWith('7')) digits = '7' + digits;
  digits = digits.slice(0, 11);
  let formatted = '+7';
  if (digits.length > 1) formatted += ' (' + digits.slice(1, 4);
  if (digits.length >= 4) formatted += ') ' + digits.slice(4, 7);
  if (digits.length >= 7) formatted += '-' + digits.slice(7, 9);
  if (digits.length >= 9) formatted += '-' + digits.slice(9, 11);
  form.phone = formatted;
}

function validatePhone() {
  if (!form.phone) return true;
  const phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
  return phonePattern.test(form.phone);
}

function handleSignup() {
  errors.value = {};

  if (!form.username.trim()) {
    errors.value.username = 'Введите логин';
  } else if (form.username.trim().length < 3) {
    errors.value.username = 'Логин должен содержать минимум 3 символа';
  }

  if (!form.email.trim()) {
    errors.value.email = 'Введите email';
  } else if (!validateEmail(form.email.trim())) {
    errors.value.email = 'Введите корректный email';
  }

  if (form.phone && !validatePhone()) {
    errors.value.phone = 'Введите корректный номер телефона';
  }

  if (!form.password.trim()) {
    errors.value.password = 'Введите пароль';
  } else if (form.password.trim().length < 6) {
    errors.value.password = 'Пароль должен содержать минимум 6 символов';
  }

  if (Object.keys(errors.value).length) return;

  const users = JSON.parse(localStorage.getItem('app_users')) || [];
  const existingUser = users.find(u => u.username === form.username.trim());
  if (existingUser) {
    errors.value.username = 'Пользователь с таким логином уже существует';
    return;
  }

  const newUser = {
    username: form.username.trim(),
    email: form.email.trim(),
    phone: form.phone,
    password: form.password.trim(),
    name: '',
    birthdate: '',
    createdAt: new Date().toISOString(),
    isAdmin: false,
  };

  register(newUser);
  router.push('/profile');
}
</script>

<template>
  <main class="signup-page">
    <div class="signup-container">
      <div class="form-column">
        <h2 class="form-title">Регистрация</h2>
        <form @submit.prevent="handleSignup" novalidate>
          <div class="field">
            <label for="username">Логин</label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              placeholder="Введите логин"
              @input="clearError('username')"
              name="username"
              autocomplete="username"
            />
            <span v-if="errors.username" class="error">{{ errors.username }}</span>
          </div>

          <div class="field">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="text"
              placeholder="example@mail.ru"
              @input="clearError('email')"
              name="email"
              autocomplete="email"
            />
            <span v-if="errors.email" class="error">{{ errors.email }}</span>
          </div>

          <div class="field">
            <label for="phone">Телефон</label>
            <input
              id="phone"
              v-model="form.phone"
              type="text"
              placeholder="+7 (___) ___-__-__"
              @input="formatPhone"
              name="phone"
              autocomplete="phone"
            />
            <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
          </div>

          <div class="field">
            <label for="password">Пароль</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              placeholder="Введите пароль"
              @input="clearError('password')"
              name="password"
              autocomplete="password"
            />
            <span v-if="errors.password" class="error">{{ errors.password }}</span>
          </div>

          <div v-if="errors.general" class="error general">{{ errors.general }}</div>

          <button type="submit" class="signup-btn">Зарегистрироваться</button>
        </form>
      </div>

      <div class="promo-column">
        <div class="promo-header">
          <router-link to="/" class="logo-link">
            <img src="../assets/logo/altlogo.svg" class="logo" alt="OUTFITON"/>
          </router-link>
        </div>
        <h1 class="slogan">
          Открой свой <span class="slogan-accent">стиль</span>
        </h1>
        <router-link to="/login" class="login-btn-promo">Войти</router-link>
      </div>
    </div>
  </main>
</template>

<style scoped>
.signup-page {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 40px 20px;
}

.signup-container {
  display: flex;
  width: 100%;
  max-width: 1000px;
  min-height: 600px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 30px #0000001a;
}

.form-column {
  flex: 1;
  background-color: #fff;
  padding: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-title {
  font-size: 36px;
  font-weight: 700;
  color: #222;
  margin-bottom: 40px;
  text-align: center;
  text-transform: uppercase;
}

.field {
  margin-bottom: 24px;
}

label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 14px 18px;
  border: 2px solid #e0e0e0;
  border-radius: 40px;
  font-size: 14px;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #68a61c;
}

input::placeholder {
  color: #aaa;
}

.error {
  display: block;
  margin-top: 6px;
  font-size: 12px;
  color: #ff4757;
}

.error.general {
  text-align: center;
  margin-bottom: 16px;
}

.signup-btn {
  width: 100%;
  padding: 14px 20px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 40px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 20px;
}

.signup-btn:hover {
  background-color: #489925;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px #00000026;
}

.promo-column {
  flex: 1;
  background-color: #000;
  color: #fff;
  padding: 40px;
  display: flex;
  flex-direction: column;
}

.promo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-link {
  display: inline-block;
}

.logo {
  display: block;
  width: 250px;
  height: 250px;
  object-fit: contain;
}

.slogan {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 45px;
  max-width: 500px;
  text-transform: uppercase;
}

.slogan-accent {
  color: #68a61c;
  font-size: 55px;
  display: inline;
}

.login-btn-promo {
  display: inline-block;
  padding: 12px 32px;
  background-color: #fff;
  color: #000;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  border-radius: 40px;
  transition: all 0.3s;
  width: 100%;
  border: 2px solid #fff;
  text-align: center;
}

.login-btn-promo:hover {
  background-color: transparent;
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px #ffffff26;
}

@media (max-width: 992px) {
  .form-column,
  .promo-column {
    padding: 30px;
  }
  .logo {
    width: 200px;
    height: 200px;
  }
  .slogan {
    font-size: 40px;
    max-width: 400px;
  }
  .slogan-accent {
    font-size: 48px;
  }
  .form-title {
    font-size: 32px;
  }
}

@media (max-width: 768px) {
  .signup-container {
    flex-direction: column;
    min-height: auto;
  }
  .form-column,
  .promo-column {
    padding: 30px 20px;
  }
  .promo-header {
    margin-bottom: 40px;
  }
  .logo {
    width: 150px;
    height: 150px;
  }
  .slogan {
    font-size: 36px;
    max-width: 100%;
  }
  .slogan-accent {
    font-size: 44px;
  }
  .login-btn-promo {
    align-self: stretch;
    text-align: center;
  }
  .form-title {
    font-size: 30px;
    margin-bottom: 30px;
  }
  .signup-btn {
    padding: 16px 20px;
  }
}

@media (max-width: 480px) {
  .signup-page {
    padding: 20px 10px;
  }
  .form-column,
  .promo-column {
    padding: 20px;
  }
  .logo {
    width: 120px;
    height: 120px;
  }
  .slogan {
    font-size: 28px;
    margin-bottom: 20px;
  }
  .slogan-accent {
    font-size: 36px;
  }
  .login-btn-promo {
    padding: 10px 24px;
    font-size: 14px;
  }
  .form-title {
    font-size: 26px;
  }
  label {
    font-size: 13px;
  }
  input {
    padding: 12px 16px;
  }
  .signup-btn {
    padding: 14px 20px;
    font-size: 15px;
  }
}
</style>