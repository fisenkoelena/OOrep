import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "./composables/useAuth";

import HomePage from "./components/HomePage.vue";
import ProductsPage from "./components/ProductsPage.vue";
import LoginPage from "./components/LoginPage.vue";
import SignupPage from "./components/SignupPage.vue";
import ProfilePage from "./components/ProfilePage.vue";
import PaymentPage from "./components/PaymentPage.vue";
import DeliveryPage from "./components/DeliveryPage.vue";
import DeliveryCourier from "./components/DeliveryCourier.vue";
import DeliveryShop from "./components/DeliveryShop.vue";
import PublicOffer from "./components/PublicOffer.vue";
import UserAgreement from "./components/UserAgreement.vue";
import PrivacyPolicy from "./components/PrivacyPolicy.vue";
import AboutPage from "./components/AboutPage.vue";
import NotFound from "./components/NotFound.vue";
import ProductPage from "./components/ProductPage.vue";
import ProductDescription from "./components/ProductDescription.vue";
import ProductReviews from "./components/ProductReviews.vue";
import ProductDetails from "./components/ProductDetails.vue";
import CheckoutPage from "./components/CheckoutPage.vue";
import AdminPanel from "./components/AdminPanel.vue";
import AdminProductList from "./components/AdminProductList.vue";
import AdminProductNew from "./components/AdminProductNew.vue";
import AdminProductEdit from "./components/AdminProductEdit.vue";
import FavoritesPage from "./components/FavoritesPage.vue";
import CartPage from "./components/CartPage.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/login", name: "Login", component: LoginPage },
  { path: "/signup", name: "Signup", component: SignupPage },
  {
    path: "/profile",
    name: "Profile",
    component: ProfilePage,
    meta: { requiresAuth: true },
  },
  { path: "/payment", name: "Payment", component: PaymentPage },
  {
    path: "/delivery",
    component: DeliveryPage,
    children: [
      { path: "", redirect: { name: "DeliveryCourier" } },
      { path: "courier", component: DeliveryCourier, name: "DeliveryCourier" },
      { path: "shop", component: DeliveryShop, name: "DeliveryShop" },
    ],
  },
  { path: "/offer", name: "PublicOffer", component: PublicOffer },
  { path: "/agreement", name: "UserAgreement", component: UserAgreement },
  { path: "/privacy", name: "PrivacyPolicy", component: PrivacyPolicy },
  { path: "/about", name: "About", component: AboutPage },
  { path: "/products/:category?", name: "Products", component: ProductsPage },
  {
    path: "/product/:sku",
    component: ProductPage,
    children: [
      { path: "", redirect: { name: "ProductDescription" } },
      {
        path: "description",
        component: ProductDescription,
        name: "ProductDescription",
      },
      { path: "reviews", component: ProductReviews, name: "ProductReviews" },
      { path: "details", component: ProductDetails, name: "ProductDetails" },
    ],
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: FavoritesPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/cart",
    name: "Cart",
    component: CartPage,
    meta: { requiresAuth: true },
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  {
    path: "/checkout",
    name: "Checkout",
    component: CheckoutPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin",
    component: AdminPanel,
    meta: { requiresAdmin: true },
    children: [
      { path: "", redirect: { name: "AdminProductList" } },
      {
        path: "products",
        component: AdminProductList,
        name: "AdminProductList",
      },
      { path: "new", component: AdminProductNew, name: "AdminProductNew" },
      {
        path: "edit/:id",
        component: AdminProductEdit,
        name: "AdminProductEdit",
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory('/OOrep/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const { isAuthenticated, isAdmin } = useAuth();
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: "Login" });
  } else if (to.meta.requiresAdmin && !isAdmin.value) {
    next({ name: "Home" });
  } else {
    next();
  }
});
