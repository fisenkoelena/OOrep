<template>
  <footer class="footer">
    <section class="footer__container">
      <section class="footer__brand">
        <router-link to="/" class="footer__logo">
          <img src="../assets/logo/logo.svg" alt="OUTFITON" />
        </router-link>
        <p class="footer__delivery">
          Быстрая доставка по всей России. Мы включаем стиль в твою жизнь.
        </p>
        <div class="footer__socials">
          <a href="#" class="social-link" aria-label="Telegram">
            <img src="../assets/icons/icon-telegram.svg" alt="Telegram" />
          </a>
          <a href="#" class="social-link" aria-label="VK">
            <img src="../assets/icons/icon-vk.svg" alt="VK" />
          </a>
        </div>
      </section>

      <nav class="footer__nav">
        <div class="footer__column">
          <h4 class="footer__title">Покупателю</h4>
          <ul class="footer__list">
            <li>
              <router-link to="/payment" class="footer__link"
                >Оплата</router-link
              >
            </li>
            <li>
              <router-link to="/delivery/courier" class="footer__link"
                >Доставка</router-link
              >
            </li>
          </ul>
        </div>
        <div class="footer__column">
          <h4 class="footer__title">
            <router-link to="/about" class="footer__link"
              >О компании</router-link
            >
          </h4>
          <ul class="footer__list">
            <li>
              <router-link to="/offer" class="footer__link"
                >Публичная оферта</router-link
              >
            </li>
            <li>
              <router-link to="/agreement" class="footer__link"
                >Пользовательское соглашение</router-link
              >
            </li>
            <li>
              <router-link to="/privacy" class="footer__link"
                >Политика конфиденциальности</router-link
              >
            </li>
          </ul>
        </div>
      </nav>
    </section>

    <div class="footer__copyright">OutfitOn © 2025-2026</div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #e6e6e680;
  padding: 90px 100px 0;
}

.footer__container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto 45px;
  gap: 40px;
}

.footer__brand {
  flex: 1;
  min-width: 250px;
}

.footer__logo {
  display: inline-block;
  margin-bottom: 16px;
}

.footer__logo img {
  display: block;
  width: 200px;
  height: 150px;
  object-fit: contain;
}

.footer__delivery {
  margin-bottom: 20px;
  max-width: 250px;
  font-size: 14px;
  color: #606060;
}

.footer__socials {
  display: flex;
  gap: 10px;
}

.social-link {
  display: inline-block;
  width: 30px;
  height: 30px;
}

.social-link img {
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.footer__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 60px;
}

.footer__column {
  min-width: 150px;
}

.footer__title {
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #000000;
}

.footer__list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.footer__list li {
  margin-bottom: 8px;
}

.footer__link {
  text-decoration: none;
  font-size: 14px;
  color: #606060;
  transition: color 0.2s;
}

.footer__link:hover {
  color: #68a61c;
  opacity: 1;
}

.footer__copyright {
  max-width: 1200px;
  border-top: 1px solid #ccc;
  text-align: center;
  font-size: 14px;
  color: #606060;
  margin: 0 auto;
  padding: 45px 0;
}

@media (max-width: 1024px) {
  .footer {
    padding: 45px 40px 0;
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 45px 20px 0;
  }
  .footer__container {
    margin-bottom: 30px;
  }
  .footer__nav {
    gap: 30px;
  }
}

@media (max-width: 480px) {
  .footer__container {
    margin-bottom: 20px;
    flex-direction: column;
  }
  .footer__nav {
    flex-direction: column;
    gap: 20px;
  }
  .social-link {
    width: 36px;
    height: 36px;
  }
  .footer__copyright {
    padding: 30px 0;
  }

  .footer__logo img {
    max-width: 100px;
    max-height: 65px;
    width: auto;
    height: auto;
  }

  .social-link {
    width: 20px;
    height: 20px;
  }
}
</style>
