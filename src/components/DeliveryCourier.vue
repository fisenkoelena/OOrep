<template>
  <div class="delivery-courier">
    <section class="delivery-section delivery-section--highlight">
      <div class="delivery-section__content">
        <p class="delivery-text delivery-text--large">
          Бесплатная доставка при выкупе заказа от 3000 ₽ после применения всех
          скидок.
        </p>
        <p class="delivery-text">
          Если после списания бонусов сумма к оплате меньше 3000 ₽, доставка
          становится платной.
        </p>
      </div>
      <div class="delivery-section__icon">
        <div class="icon-placeholder">
          <img src="../assets/icons/icon-buy.svg" alt="buy" />
        </div>
      </div>
    </section>

    <section class="delivery-features">
      <div class="delivery-feature">
        <div class="delivery-feature__icon">
          <div class="icon-placeholder">
            <img src="../assets/icons/icon-card.svg" alt="card" />
          </div>
        </div>
        <h3 class="delivery-feature__title">499 ₽</h3>
        <p class="delivery-feature__desc">Стоимость доставки</p>
      </div>
      <div class="delivery-feature">
        <div class="delivery-feature__icon">
          <div class="icon-placeholder">
            <img src="../assets/icons/icon-calendar.svg" alt="calendar" />
          </div>
        </div>
        <h3 class="delivery-feature__title">от 1 дня</h3>
        <p class="delivery-feature__desc">Сроки доставки</p>
      </div>
      <div class="delivery-feature">
        <div class="delivery-feature__icon">
          <div class="icon-placeholder">
            <img src="../assets/icons/icon-half.svg" alt="half" />
          </div>
        </div>
        <h3 class="delivery-feature__title">Неполный</h3>
        <p class="delivery-feature__desc">Отказ от заказа</p>
      </div>
    </section>

    <section class="delivery-info-grid">
      <div class="delivery-info-card">
        <div class="delivery-info-card__icon">
          <div class="icon-placeholder">
            <img src="../assets/icons/icon-card.svg" alt="card" />
          </div>
        </div>
        <h4 class="delivery-info-card__title">Способы оплаты</h4>
        <p class="delivery-info-card__text">
          Наличными или банковской картой курьеру.
        </p>
      </div>
      <div class="delivery-info-card">
        <div class="delivery-info-card__icon">
          <div class="icon-placeholder">
            <img src="../assets/icons/icon-edit.svg" alt="edit" />
          </div>
        </div>
        <h4 class="delivery-info-card__title">Бесконтактное получение</h4>
        <p class="delivery-info-card__text">При онлайн оплате на сайте.</p>
      </div>
      <div class="delivery-info-card">
        <div class="delivery-info-card__icon">
          <div class="icon-placeholder">
            <img src="../assets/icons/icon-buy.svg" alt="buy" />
          </div>
        </div>
        <h4 class="delivery-info-card__title">Оплата доставки и товаров</h4>
        <p class="delivery-info-card__text">
          Перед оплатой нужно проверить внешний вид товара и упаковки,
          комплектность заказа, наличие этикеток.
        </p>
      </div>
      <div class="delivery-info-card">
        <div class="delivery-info-card__icon">
          <div class="icon-placeholder">
            <img src="../assets/icons/icon-card.svg" alt="card" />
          </div>
        </div>
        <h4 class="delivery-info-card__title">При полном отказе</h4>
        <p class="delivery-info-card__text">
          Необходимо оплатить услугу доставки.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.delivery-courier {
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

.delivery-section--highlight {
  background-color: #f9f9f9;
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  padding: 30px;
  display: flex;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
}

.delivery-section__content {
  flex: 1;
  min-width: 250px;
}

.delivery-text--large {
  font-size: 20px;
  font-weight: 600;
  color: #222;
  margin-bottom: 12px;
}

.delivery-text {
  font-size: 16px;
  color: #555;
  line-height: 1.6;
}

.delivery-section__icon .icon-placeholder {
  width: 60px;
  height: 60px;
  border-radius: 12px;
}

.delivery-features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.delivery-feature {
  background-color: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  padding: 24px 20px;
  text-align: center;
  transition: box-shadow 0.2s;
  box-shadow: 0 8px 20px #0000000d;
}

.delivery-feature__icon {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.delivery-feature__title {
  font-size: 28px;
  font-weight: 700;
  color: #222;
  margin-bottom: 8px;
}

.delivery-feature__desc {
  font-size: 14px;
  color: #666;
}

.delivery-info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.delivery-info-card {
  background-color: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  transition: box-shadow 0.2s;
  box-shadow: 0 8px 20px #0000000d;
}

.delivery-info-card__icon .icon-placeholder {
  width: 48px;
  height: 48px;
  border-radius: 12px;
}

.delivery-info-card__title {
  font-size: 20px;
  font-weight: 600;
  color: #222;
  margin: 0;
}

.delivery-info-card__text {
  font-size: 14px;
  color: #555;
  line-height: 1.5;
  margin: 0;
}

@media (max-width: 768px) {
  .delivery-features {
    grid-template-columns: 1fr;
  }
  .delivery-info-grid {
    grid-template-columns: 1fr;
  }
  .delivery-section--highlight {
    flex-direction: column;
    text-align: center;
  }
}
</style>
