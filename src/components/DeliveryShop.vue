<template>
  <div class="delivery-shop">
    <section class="delivery-shop__hero">
      <div class="delivery-shop__content">
        <p class="delivery-shop__slogan">Быстро, просто, выгодно</p>
        <p class="delivery-shop__text">
          Посмотри онлайн и забери в ближайшем магазине OutfitOn в удобное
          время!
        </p>
        <p class="delivery-shop__text">
          Оцени комфортный онлайн шопинг: всего пара кликов, и понравившиеся
          вещи будут ждать тебя в магазине.
        </p>
      </div>
      <div class="delivery-shop__icon">
        <div class="icon-placeholder icon-placeholder--large">
          <img src="../assets/icons/icon-calendar.svg" alt="calendar" />
        </div>
      </div>
    </section>

    <section class="delivery-shop__features">
      <div class="delivery-feature-card">
        <div class="delivery-feature-card__icon">
          <div class="icon-placeholder">
            <img src="../assets/icons/icon-buy.svg" alt="buy" />
          </div>
        </div>
        <h4 class="delivery-feature-card__title">Проверка</h4>
        <p class="delivery-feature-card__text">Мониторинг товаров в магазине</p>
      </div>
      <div class="delivery-feature-card">
        <div class="delivery-feature-card__icon">
          <div class="icon-placeholder">
            <img src="../assets/icons/icon-edit.svg" alt="edit" />
          </div>
        </div>
        <h4 class="delivery-feature-card__title">Примерка</h4>
        <p class="delivery-feature-card__text">
          Можно примерить перед покупкой
        </p>
      </div>
      <div class="delivery-feature-card">
        <div class="delivery-feature-card__icon">
          <div class="icon-placeholder">
            <img src="../assets/icons/icon-calendar.svg" alt="calendar" />
          </div>
        </div>
        <h4 class="delivery-feature-card__title">7 дней</h4>
        <p class="delivery-feature-card__text">Бронь заказа в магазине</p>
      </div>
    </section>

    <section class="delivery-shop__info">
      <div class="delivery-info-block">
        <h3 class="delivery-info-block__title">Как это работает?</h3>
        <ol class="delivery-info-block__list">
          <li>Оформляете заказ на сайте с доставкой в магазин</li>
          <li>
            Получаете уведомление, когда заказ поступит в выбранный магазин
          </li>
          <li>Приходите, примеряете и оплачиваете только то, что подошло</li>
        </ol>
      </div>
      <div class="delivery-info-block">
        <h3 class="delivery-info-block__title">Оплата</h3>
        <p class="delivery-info-block__text">
          Оплатить можно онлайн при оформлении или на месте - картой или
          наличными.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.delivery-shop {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.icon-placeholder {
  width: 40px;
  height: 40px;
  background-color: #68a61c;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.icon-placeholder img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.icon-placeholder--large {
  width: 60px;
  height: 60px;
  border-radius: 12px;
}

.delivery-shop__hero {
  background-color: #f9f9f9;
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  padding: 40px;
  display: flex;
  align-items: center;
  gap: 40px;
  flex-wrap: wrap;
}

.delivery-shop__content {
  flex: 1;
  min-width: 250px;
}

.delivery-shop__slogan {
  font-size: 28px;
  font-weight: 700;
  color: #222;
  margin-bottom: 16px;
}

.delivery-shop__text {
  font-size: 16px;
  color: #555;
  line-height: 1.6;
  margin-bottom: 12px;
}

.delivery-shop__text:last-child {
  margin-bottom: 0;
}

.delivery-shop__features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.delivery-feature-card {
  background-color: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  padding: 24px 20px;
  text-align: center;
  transition: box-shadow 0.2s;
  box-shadow: 0 8px 20px #0000000d;
}

.delivery-feature-card__icon {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.delivery-feature-card__title {
  font-size: 20px;
  font-weight: 600;
  color: #222;
  margin-bottom: 8px;
}

.delivery-feature-card__text {
  font-size: 14px;
  color: #666;
}

.delivery-shop__info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.delivery-info-block {
  background-color: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  padding: 24px;
}

.delivery-info-block__title {
  font-size: 20px;
  font-weight: 600;
  color: #222;
  margin-bottom: 16px;
}

.delivery-info-block__list {
  padding-left: 20px;
  color: #555;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}

.delivery-info-block__list li {
  margin-bottom: 8px;
}

.delivery-info-block__text {
  font-size: 14px;
  color: #555;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .delivery-shop__hero {
    flex-direction: column;
    text-align: center;
  }
  .delivery-shop__features {
    grid-template-columns: 1fr;
  }
  .delivery-shop__info {
    grid-template-columns: 1fr;
  }
}
</style>
