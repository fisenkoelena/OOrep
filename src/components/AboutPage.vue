<template>
  <main class="about-page">
    <section class="about-hero">
      <div class="about-hero__container">
        <div class="about-hero__image">
          <img
            src="../assets/logo/altlogo.svg"
            alt="О компании. Модель - ноги."
          />
        </div>
        <div class="about-hero__content">
          <h1 class="about-hero__title">О КОМПАНИИ</h1>
          <p class="about-hero__text">
            <span class="about-hero__brand">OutfitOn</span> - современный
            интернет магазин одежды, ориентированный на активную аудиторию
            Санкт-Петербурга. Бренд создан в 2025 году и развивается как
            платформа, объединяющая стиль, комфорт и доступность.
          </p>
          <p class="about-hero__text">
            Идея - предоставить покупателям удобный способ подбора одежды для
            повседневной жизни и работы. Магазин сочетает тенденции с
            практичностью и универсальностью вещей.
          </p>
        </div>
      </div>
    </section>

    <section class="about-block about-block--text-left">
      <div class="about-block__content">
        <h2 class="about-block__title">Концепция бренда</h2>
        <p class="about-block__text">
          Делаем акцент на формировании продуманного базового гардероба.
          Коллекции адаптируются под реальные потребности покупателей.
        </p>
        <p class="about-block__text">
          Каждая модель легко сочетаться с другими элементами гардероба. Это
          позволяет клиенту формировать разнообразные образы без лишних затрат.
        </p>
      </div>
      <div class="about-block__image">
        <img
          src="../assets/pageContent/model-ygirl.png"
          alt="Концепция. Модель - молодая девушка."
        />
      </div>
    </section>

    <section class="about-block about-block--text-right">
      <div class="about-block__image">
        <img
          src="../assets/pageContent/model-yguy.png"
          alt="Миссия. Модель - парень на стуле."
        />
      </div>
      <div class="about-block__content">
        <h2 class="about-block__title">Миссия проекта</h2>
        <p class="about-block__text">
          Помочь покупателям собрать стильный и удобный гардероб,
          соответствующий их индивидуальности и образу жизни.
        </p>
        <div class="mission-grid">
          <div class="mission-item">
            <div class="mission-item__icon">
              <div class="icon-circle">
                <img src="../assets/icons/icon-buy.svg" alt="Культура" />
              </div>
            </div>
            <p class="mission-item__text">осознанный выбора одежды</p>
          </div>
          <div class="mission-item">
            <div class="mission-item__icon">
              <div class="icon-circle">
                <img src="../assets/icons/icon-card.svg" alt="Мода" />
              </div>
            </div>
            <p class="mission-item__text">доступная модная среда</p>
          </div>
          <div class="mission-item">
            <div class="mission-item__icon">
              <div class="icon-circle">
                <img src="../assets/icons/icon-buy.svg" alt="Шопинг" />
              </div>
            </div>
            <p class="mission-item__text">комфортный онлайн-шопинга</p>
          </div>
          <div class="mission-item">
            <div class="mission-item__icon">
              <div class="icon-circle">
                <img src="../assets/icons/icon-edit.svg" alt="Поддержка" />
              </div>
            </div>
            <p class="mission-item__text">поддержка клиентов 24/7</p>
          </div>
        </div>
      </div>
    </section>

    <section class="about-block about-block--text-right">
      <div class="about-block__image">
        <img
          src="../assets/pageContent/model-igirl.png"
          alt="Ценности. Модель - заинтересованная девушка."
        />
      </div>
      <div class="about-block__content">
        <h2 class="about-block__title">Основные ценности</h2>
        <div class="values-grid">
          <div class="value-item">
            <span class="value-item__title">ИНДИВИДУАЛЬНОСТЬ.</span> Одежда -
            самовыражение. Ассортимент позволяет создавать свой стиль без
            привязки к шаблонам.
          </div>
          <div class="value-item">
            <span class="value-item__title">ДОСТУПНОСТЬ.</span> В магазине
            поддерживается оптимальное соотношение цены и качества, продукция
            доступна аудитории.
          </div>
          <div class="value-item">
            <span class="value-item__title">КОМФОРТ.</span> Приоритет отдаётся
            удобным фасонам, качественным материалам и износостойкости изделий.
          </div>
          <div class="value-item">
            <span class="value-item__title">ПРАКТИЧНОСТЬ.</span> Все модели
            подходят для активного ритма города и не требуют сложного ухода.
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.about-page {
  flex: 1;
  background-color: #f5f5f5;
}

.about-hero {
  background-color: #000000;
  color: #fff;
  width: 100%;
}

.about-hero__container {
  display: flex;
  align-items: center;
  gap: 45px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 90px 100px;
}

.about-hero__image {
  flex: 0 0 400px;
  border-radius: 16px;
  overflow: hidden;
}

.about-hero__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.about-hero__content {
  flex: 1;
}

.about-hero__title {
  font-size: 45px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 20px;
  line-height: 1.2;
}

.about-hero__text {
  font-size: 18px;
  color: #fff;
  line-height: 1.6;
  margin-bottom: 16px;
}

.about-hero__text:last-child {
  margin-bottom: 0;
}

.about-hero__brand {
  color: #68a61c;
  font-weight: 700;
}

.about-block {
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 60px 100px;
  max-width: 1200px;
  margin: 0 auto;
  border-top: 2px solid #e0e0e0;
}

.about-block:first-of-type {
  border-top: none;
}

.about-block--text-left {
  flex-direction: row;
}

.about-block--text-right {
  flex-direction: row-reverse;
}

.about-block__content {
  flex: 1;
}

.about-block__title {
  font-size: 35px;
  font-weight: 700;
  color: #222;
  margin-bottom: 25px;
}

.about-block__text {
  font-size: 18px;
  color: #555;
  line-height: 1.6;
  margin-bottom: 16px;
}

.about-block__text:last-child {
  margin-bottom: 0;
}

.about-block__image {
  flex: 0 0 400px;
  height: 500px;
  border-radius: 16px;
  overflow: hidden;
}

.about-block__image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.mission-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 24px;
}

.mission-item {
  background-color: #f9f9f9;
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  transition: box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8px 20px #0000000D;
}

.mission-item__icon {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}

.icon-circle {
  width: 48px;
  height: 48px;
  background-color: #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.icon-circle img {
  max-width: 60%;
  max-height: 60%;
  object-fit: contain;
}

.mission-item__text {
  font-size: 14px;
  color: #555;
  line-height: 1.4;
  margin: 0;
}

.values-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 24px;
}

.value-item {
  font-size: 16px;
  color: #555;
  line-height: 1.6;
  background-color: #f9f9f9;
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
}

.value-item__title {
  font-weight: 700;
  color: #222;
  display: block;
  margin-bottom: 8px;
  text-transform: uppercase;
}

@media (max-width: 1024px) {
  .about-hero__container {
    padding: 40px 40px;
  }
  .about-block {
    padding: 40px 40px;
  }
  .about-hero__title {
    font-size: 36px;
  }
  .about-hero__text {
    font-size: 16px;
  }
  .about-block__title {
    font-size: 30px;
  }
  .about-block__text,
  .value-item {
    font-size: 16px;
  }
  .about-block__image,
  .about-hero__image {
    flex-basis: 300px;
    height: 300px;
  }
}

@media (max-width: 768px) {
  .about-hero__container {
    padding: 30px 20px;
  }
  .about-block {
    padding: 30px 20px;
  }
  .about-hero {
    flex-direction: column;
    text-align: center;
  }
  .about-hero__container {
    flex-direction: column;
  }
  .about-hero__image {
    flex-basis: auto;
    width: 100%;
    max-width: 300px;
    height: 300px;
    margin: 0 auto;
  }
  .about-block {
    flex-direction: column !important;
    text-align: center;
  }
  .about-block__image {
    flex-basis: auto;
    width: 100%;
    max-width: 300px;
    height: 300px;
    margin: 0 auto;
  }
  .mission-grid,
  .values-grid {
    grid-template-columns: 1fr;
  }
  .values-grid {
    text-align: left;
  }
}
</style>
