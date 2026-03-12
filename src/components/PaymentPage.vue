<template>
  <main class="payment-page">
    <div class="payment-container">
      <h1 class="payment-title">Оплата</h1>

      <section class="payment-block payment-block--text-left">
        <div class="payment-block__content">
          <p class="payment-text">
            В интернет магазине OutfitOn вы можете оплатить заказ онлайн или
            наличными при получении. Для курьерской доставки обязательна
            предоплата на сайте - так вы сможете примерить вещи и оформить
            возврат только того, что не подошло.
          </p>
          <p class="payment-text">
            Мы используем защищённые каналы передачи данных, поэтому ваши
            платёжные данные надёжно защищены. Никаких комиссий - только сумма
            заказа.
          </p>
        </div>
        <div class="payment-block__image">
          <img
            src="../assets/pageContent/payment-safe.svg"
            alt="Безопасная оплата"
          />
        </div>
      </section>

      <section class="payment-block payment-block--text-right">
        <div class="payment-block__image">
          <img src="../assets/pageContent/payment-cash.svg" alt="Наличные" />
        </div>
        <div class="payment-block__content">
          <h2 class="payment-block__title">Наличные</h2>
          <p class="payment-text">
            Оплатить наличными можно при покупке в наших розничных магазинах.
            Для онлайн заказов с курьерской доставкой этот способ недоступен, но
            вы можете воспользоваться картой или СБП.
          </p>
        </div>
      </section>

      <section class="payment-block payment-block--text-left">
        <div class="payment-block__content">
          <h2 class="payment-block__title">Система быстрых платежей</h2>
          <p class="payment-text">
            В розничных магазинах OutfitOn доступна оплата через СБП. Просто
            отсканируйте QR код на кассе с помощью мобильного приложения вашего
            банка и подтвердите платеж. Карта не нужна.
          </p>
          <p class="payment-text">
            Сервис работает для дебетовых карт любых российских банков.
            Мгновенное зачисление, никаких дополнительных комиссий.
          </p>
        </div>
        <div class="payment-block__image">
          <img src="../assets/pageContent/payment-qr.svg" alt="QR-код СБП" />
        </div>
      </section>

      <section class="payment-block payment-block--text-right">
        <div class="payment-block__image">
          <img
            src="../assets/pageContent/payment-card.svg"
            alt="Банковская карта"
          />
        </div>
        <div class="payment-block__content">
          <h2 class="payment-block__title">Банковская карта</h2>
          <p class="payment-text">
            Оплатить заказ на сайте можно любой картой Visa, MasterCard или Мир.
            Для этого потребуется ввести:
          </p>
          <ul class="payment-list">
            <li>Номер карты (16 цифр на лицевой стороне);</li>
            <li>Срок действия (ММ/ГГ);</li>
            <li>Имя держателя (как на карте);</li>
            <li>CVC/CVV (3 цифры на обороте).</li>
          </ul>
          <p class="payment-text">
            После подтверждения платежа деньги списываются сразу, а заказ
            передаётся в сборку. Вы всегда можете отследить статус в личном
            кабинете.
          </p>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.payment-page {
  flex: 1;
  background-color: #f5f5f5;
  padding: 60px 100px;
}

.payment-container {
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 24px;
  padding: 60px 40px;
  box-shadow: 0 4px 12px #0000000d;
}

.payment-title {
  font-size: 48px;
  font-weight: 700;
  color: #222;
  text-align: center;
  margin-bottom: 60px;
}

.payment-block {
  display: flex;
  align-items: center;
  gap: 40px;
  margin-bottom: 60px;
}

.payment-block:last-child {
  margin-bottom: 0;
}

.payment-block__content {
  flex: 1;
}

.payment-block__title {
  font-size: 28px;
  font-weight: 600;
  color: #222;
  margin-bottom: 16px;
}

.payment-text {
  font-size: 16px;
  color: #555;
  line-height: 1.6;
  margin-bottom: 16px;
}

.payment-text:last-child {
  margin-bottom: 0;
}

.payment-list {
  margin: 16px 0 0;
  padding-left: 20px;
  color: #555;
  font-size: 16px;
  line-height: 1.6;
}

.payment-list li {
  margin-bottom: 8px;
}

.payment-block__image {
  flex: 0 0 300px;
  height: 200px;
  background-color: #f0f0f0;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.payment-block__image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.payment-block--text-right {
  flex-direction: row-reverse;
}

@media (max-width: 1024px) {
  .payment-page {
    padding: 40px 40px;
  }
  .payment-container {
    padding: 40px 30px;
  }
}

@media (max-width: 768px) {
  .payment-page {
    padding: 20px;
  }
  .payment-title {
    font-size: 36px;
    margin-bottom: 40px;
  }
  .payment-block {
    flex-direction: column !important;
    gap: 20px;
  }
  .payment-block__image {
    flex: 0 0 auto;
    width: 100%;
    max-width: 300px;
    height: 180px;
  }
  .payment-block__title {
    font-size: 24px;
  }
}
</style>
