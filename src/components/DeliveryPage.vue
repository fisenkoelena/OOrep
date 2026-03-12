<template>
  <main class="delivery-page">
    <div class="delivery-container">
      <h1 class="delivery-title">Доставка</h1>
      <nav class="delivery-tabs">
        <router-link
          to="/delivery/courier"
          class="delivery-tab"
          active-class="delivery-tab--active"
        >
          Курьер
        </router-link>
        <router-link
          to="/delivery/shop"
          class="delivery-tab"
          active-class="delivery-tab--active"
        >
          Магазин
        </router-link>
      </nav>
      <router-view />
    </div>
  </main>
</template>

<style scoped>
.delivery-page {
  flex: 1;
  background-color: #f5f5f5;
  padding: 60px 100px;
}

.delivery-container {
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 24px;
  padding: 60px 40px;
  box-shadow: 0 4px 12px #0000000d;
}

.delivery-title {
  font-size: 48px;
  font-weight: 700;
  color: #222;
  text-align: center;
  margin-bottom: 40px;
}

.delivery-tabs {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 40px;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 16px;
}

.delivery-tab {
  font-size: 24px;
  font-weight: 600;
  color: #666;
  text-decoration: none;
  padding: 8px 0;
  position: relative;
  transition: color 0.2s;
}

.delivery-tab::after {
  content: "";
  position: absolute;
  bottom: -18px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: transparent;
  transition: background-color 0.2s;
}

.delivery-tab:hover {
  color: #68a61c;
}

.delivery-tab:hover::after {
  background-color: #68a61c;
}

.delivery-tab--active {
  color: #222;
}

.delivery-tab--active::after {
  background-color: #68a61c;
}

@media (max-width: 1024px) {
  .delivery-page {
    padding: 40px 40px;
  }
  .delivery-container {
    padding: 40px 30px;
  }
}

@media (max-width: 768px) {
  .delivery-page {
    padding: 20px;
  }
  .delivery-title {
    font-size: 36px;
  }
  .delivery-tabs {
    gap: 20px;
  }
  .delivery-tab {
    font-size: 20px;
  }
}
</style>
