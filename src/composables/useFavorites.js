import { ref, computed } from 'vue';

const STORAGE_KEY = 'app_favorites';

const loadFavorites = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const favorites = ref(loadFavorites());

const saveFavorites = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites.value));
};

export function useFavorites() {
  const addItem = (item) => {
    // Проверим, есть ли уже такой товар (по sku и size)
    const exists = favorites.value.find(f => f.sku === item.sku && f.size === item.size);
    if (!exists) {
      // Добавляем в начало массива
      favorites.value.unshift({ ...item, id: Date.now() });
      saveFavorites();
    }
  };

  const removeItem = (itemId) => {
    favorites.value = favorites.value.filter(f => f.id !== itemId);
    saveFavorites();
  };

  const clearFavorites = () => {
    favorites.value = [];
    saveFavorites();
  };

  return {
    favorites: computed(() => favorites.value),
    addItem,
    removeItem,
    clearFavorites,
  };
}