import { ref, computed } from 'vue';

const STORAGE_KEY = 'app_cart';

const loadCart = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const cart = ref(loadCart());

const saveCart = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart.value));
};

export function useCart() {
  const addItem = (item) => {
    const existing = cart.value.find(
      (i) => i.sku === item.sku && i.size === item.size
    );
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      // Добавляем новый товар в начало массива
      cart.value.unshift({ ...item, id: Date.now() });
    }
    saveCart();
  };

  const removeItem = (itemId) => {
    cart.value = cart.value.filter((item) => item.id !== itemId);
    saveCart();
  };

  const updateQuantity = (itemId, newQuantity) => {
    const item = cart.value.find((i) => i.id === itemId);
    if (item) {
      if (newQuantity <= 0) {
        removeItem(itemId);
      } else {
        item.quantity = newQuantity;
        saveCart();
      }
    }
  };

  const clearCart = () => {
    cart.value = [];
    saveCart();
  };

  const totalSum = () => {
    return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const deliveryCost = computed(() => {
    const sum = totalSum();
    return sum >= 3000 ? 0 : 499;
  });

  return {
    cart: computed(() => cart.value),
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalSum,
    deliveryCost,
  };
}