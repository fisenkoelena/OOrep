<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";

const router = useRouter();
const { login } = useAuth();

const form = reactive({
  username: "",
  password: "",
});

const errors = ref({});

function clearError(field) {
  delete errors.value[field];
}

function handleLogin() {
  errors.value = {};

  if (!form.username.trim()) {
    errors.value.username = "Введите логин";
  }
  if (!form.password.trim()) {
    errors.value.password = "Введите пароль";
  }

  if (Object.keys(errors.value).length) return;

  const success = login(form.username, form.password);
  if (success) {
    router.push("/profile");
  } else {
    errors.value.general = "Неверный логин или пароль";
  }
}
</script>

<template>
  <main class="login-page">
    <div class="login-container">
      <div class="left-column">
        <div class="left-header">
          <router-link to="/" class="logo-link">
            <img src="../assets/logo/altlogo.svg" class="logo" alt="OUTFITON" />
          </router-link>
        </div>
        <h1 class="slogan">
          Войди в режим <span class="slogan-accent">стиля</span>
        </h1>
        <router-link to="/signup" class="register-btn"
          >Зарегистрироваться</router-link
        >
      </div>

      <div class="right-column">
        <h2 class="right-title">Вход</h2>
        <form @submit.prevent="handleLogin">
          <div class="field">
            <label for="username">Логин</label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              placeholder="Введите логин"
              @input="clearError('username')" name="username"
              autocomplete="username"
            />
            <span v-if="errors.username" class="error">{{
              errors.username
            }}</span>
          </div>

          <div class="field">
            <label for="password">Пароль</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              placeholder="Введите пароль"
              @input="clearError('password')" name="password"
              autocomplete="password"
            />
            <span v-if="errors.password" class="error">{{
              errors.password
            }}</span>
          </div>

          <div v-if="errors.general" class="error general">
            {{ errors.general }}
          </div>

          <button type="submit" class="login-btn">Войти</button>
        </form>
      </div>
    </div>
  </main>
</template>

<style scoped>
.login-page {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 40px 20px;
}

.login-container {
  display: flex;
  width: 100%;
  max-width: 1000px;
  min-height: 600px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 30px #0000001A;
}

.left-column {
  flex: 1;
  background-color: #000;
  color: #fff;
  padding: 40px 40px 40px;
  display: flex;
  flex-direction: column;
}

.left-header {
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
  margin-bottom: 30px;
  max-width: 500px;
  text-transform: uppercase;
}

.slogan-accent {
  color: #68a61c;
  display: inline;
  font-size: 55px;
  text-transform: uppercase;
}

.register-btn {
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

.register-btn:hover {
  background-color: transparent;
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px #FFFFFF26;
}

.right-column {
  flex: 1;
  background-color: #fff;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.right-title {
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

.login-btn {
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

.login-btn:hover {
  background-color: #489925;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px #00000026;
}

@media (max-width: 992px) {
  .left-column,
  .right-column {
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
  .right-title {
    font-size: 32px;
  }
}

@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
    min-height: auto;
  }
  .left-column,
  .right-column {
    padding: 30px 20px;
  }
  .left-header {
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
  .register-btn {
    align-self: stretch;
    text-align: center;
  }
  .right-title {
    font-size: 30px;
    margin-bottom: 30px;
  }
  .login-btn {
    padding: 16px 20px;
  }
}

@media (max-width: 480px) {
  .login-page {
    padding: 20px 10px;
  }
  .left-column,
  .right-column {
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
  .register-btn {
    padding: 10px 24px;
    font-size: 14px;
  }
  .right-title {
    font-size: 26px;
  }
  label {
    font-size: 13px;
  }
  input {
    padding: 12px 16px;
  }
  .login-btn {
    padding: 14px 20px;
    font-size: 15px;
  }
}
</style>
