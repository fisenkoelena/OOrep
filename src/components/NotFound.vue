<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function goHome() {
  router.push("/");
}
</script>

<template>
  <main class="not-found">
    <div class="not-found__container">
      <h1 class="not-found__title">Ой, кажется страница пропала...</h1>
      
      <div class="not-found__digits">
        <span class="not-found__digit">4</span>
        <img src="../assets/404.svg"  class="not-found__image" alt="404"/>
        <span class="not-found__digit">4</span>
      </div>

      <p class="not-found__message">
        Мы уже начали работать над проблемой!<br />Не волнуйтесь, со страницей
        все будет хорошо
      </p>
      <button class="btn not-found__button" @click="goHome">
        Вернуться на главную
      </button>
    </div>
  </main>
</template>

<style scoped>
.not-found {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 90px 20px;
}

.not-found__container {
  max-width: 800px;
  width: 100%;
  text-align: center;
}

.not-found__title {
  font-size: 36px;
  font-weight: 700;
  color: #222;
  margin-bottom: 30px;
  line-height: 1.2;
}

.not-found__digits {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}

.not-found__digit {
  font-size: 300px;
  font-weight: 700;
  color: #68a61c;
  line-height: 1;
  user-select: none;
}

.not-found__image {
  width: 250px;
  height: 400px;
  object-fit: contain;
  max-width: 100%;
  display: block;
}

.not-found__message {
  font-size: 18px;
  color: #555;
  margin-bottom: 40px;
  line-height: 1.6;
}

.not-found__button {
  display: inline-block;
  padding: 14px 40px;
  font-size: 16px;
  width: auto;
  min-width: 250px;
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
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn:hover {
  background-color: #68a61c;
  border-color: #68a61c;
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px #00000026;
}

@media (max-width: 768px) {
  .not-found__title {
    font-size: 28px;
  }
  .not-found__digit {
    font-size: 150px;
  }
  .not-found__image {
    width: 200px;
    height: 200px;
  }
  .not-found__message {
    font-size: 16px;
  }
  .not-found__digits {
    gap: 10px;
  }
}
</style>
