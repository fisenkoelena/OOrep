<template>
  <main class="admin-page">
    <div class="admin-container">
      <h1 class="admin-title">ПАНЕЛЬ АДМИНИСТРАТОРА</h1>
      <nav class="admin-nav">
        <router-link
          to="/admin/products"
          class="admin-nav__link"
          active-class="active"
          >Список товаров</router-link
        >
        <router-link
          to="/admin/new"
          class="admin-nav__link"
          active-class="active"
          >Добавить товар</router-link
        >
      </nav>
      <div class="admin-content">
        <router-view />
      </div>
    </div>
  </main>
</template>

<style scoped>
.admin-page {
  flex: 1;
  background-color: #f5f5f5;
  padding: 40px 100px;
}
.admin-container {
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  padding: 40px;
  box-shadow: 0 4px 12px #0000000d;
}
.admin-title {
  font-size: 30px;
  font-weight: 700;
  color: #222;
  margin-bottom: 30px;
  text-align: center;
}
.admin-nav {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 10px;
}
.admin-nav__link {
  font-size: 16px;
  font-weight: 500;
  color: #777;
  text-decoration: none;
  padding: 8px 0;
  transition: color 0.2s;
}
.admin-nav__link:hover {
  color: #68a61c;
}
.admin-nav__link.active {
  color: #000;
  border-bottom: 2px solid #000;
  margin-bottom: -10px;
}
.admin-content {
  min-height: 400px;
}
</style>
