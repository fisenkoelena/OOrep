import { ref, computed } from 'vue';

const STORAGE_KEY = 'app_users';
const ACTIVE_USER_KEY = 'active_user';

const defaultUsers = [
  {
    username: 'admin',
    password: 'admin',
    name: 'Admin',
    surname: '',          
    address: '',
    email: 'admin@example.com',
    phone: '',
    birthdate: '',
    createdAt: new Date().toISOString(),
    isAdmin: true,
  },
];

function initUsers() {
  const users = localStorage.getItem(STORAGE_KEY);
  if (!users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers));
  }
}
initUsers();

const usersList = ref(JSON.parse(localStorage.getItem(STORAGE_KEY)) || []);
const activeUser = ref(JSON.parse(localStorage.getItem(ACTIVE_USER_KEY)) || null);

export function useAuth() {
  const isAuthenticated = computed(() => activeUser.value !== null);
  const isAdmin = computed(() => activeUser.value?.isAdmin || false);

  function login(username, password) {
    const user = usersList.value.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      activeUser.value = { ...user };
      localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(activeUser.value));
      window.dispatchEvent(new Event('auth-update'));
      return true;
    }
    return false;
  }

  function logout() {
    activeUser.value = null;
    localStorage.removeItem(ACTIVE_USER_KEY);
    window.dispatchEvent(new Event('auth-update'));
  }

  function register(newUser) {
    const userWithDefaults = {
      surname: '',
      address: '',
      ...newUser
    };
    usersList.value.push(userWithDefaults);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usersList.value));
    activeUser.value = { ...userWithDefaults };
    localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(activeUser.value));
    window.dispatchEvent(new Event('auth-update'));
  }

  function updateUser(updatedUser) {
    const index = usersList.value.findIndex(u => u.username === updatedUser.username);
    if (index !== -1) {
      usersList.value[index] = { ...updatedUser };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(usersList.value));
      if (activeUser.value?.username === updatedUser.username) {
        activeUser.value = { ...updatedUser };
        localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(activeUser.value));
      }
      window.dispatchEvent(new Event('auth-update'));
    }
  }

  function deleteUser(username) {
    usersList.value = usersList.value.filter(u => u.username !== username);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usersList.value));
    if (activeUser.value?.username === username) {
      logout();
    }
  }

  return {
    usersList: computed(() => usersList.value),
    activeUser: computed(() => activeUser.value),
    isAuthenticated,
    isAdmin,
    login,
    logout,
    register,
    updateUser,
    deleteUser,
  };
}