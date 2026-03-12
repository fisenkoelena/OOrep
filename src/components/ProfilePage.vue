<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";

const router = useRouter();
const { activeUser, updateUser, deleteUser, logout } = useAuth();

const user = ref(null);
const isEditing = ref(false);
const showDeleteConfirm = ref(false);
const showLogoutConfirm = ref(false);
const errors = ref({});

const editForm = reactive({
  surname: "",
  name: "",
  email: "",
  phone: "",
  birthdate: "",
  newPassword: "",
});

onMounted(() => {
  if (!activeUser.value) {
    router.push("/login");
    return;
  }
  user.value = activeUser.value;
  editForm.surname = user.value.surname || "";
  editForm.name = user.value.name || "";
  editForm.email = user.value.email || "";
  editForm.phone = user.value.phone || "";
  editForm.birthdate = user.value.birthdate || "";
});

function formatPhone() {
  let digits = editForm.phone.replace(/\D/g, "");
  if (digits.startsWith("8")) digits = "7" + digits.slice(1);
  if (digits && !digits.startsWith("7")) digits = "7" + digits;
  digits = digits.slice(0, 11);
  let formatted = "+7";
  if (digits.length > 1) formatted += " (" + digits.slice(1, 4);
  if (digits.length >= 4) formatted += ") " + digits.slice(4, 7);
  if (digits.length >= 7) formatted += "-" + digits.slice(7, 9);
  if (digits.length >= 9) formatted += "-" + digits.slice(9, 11);
  editForm.phone = formatted;
}

function clearError(field) {
  delete errors.value[field];
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone() {
  if (!editForm.phone) return true;
  const phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
  return phonePattern.test(editForm.phone);
}

function startEditing() {
  isEditing.value = true;
  errors.value = {};
}

function cancelEdit() {
  isEditing.value = false;
  editForm.surname = user.value.surname || "";
  editForm.name = user.value.name || "";
  editForm.email = user.value.email || "";
  editForm.phone = user.value.phone || "";
  editForm.birthdate = user.value.birthdate || "";
  editForm.newPassword = "";
  errors.value = {};
}

function saveChanges() {
  errors.value = {};

  if (!editForm.surname.trim()) {
    errors.value.surname = "Введите фамилию";
  } else if (editForm.surname.trim().length < 2) {
    errors.value.surname = "Фамилия должна содержать минимум 2 символа";
  }

  if (!editForm.name.trim()) {
    errors.value.name = "Введите имя";
  } else if (editForm.name.trim().length < 2) {
    errors.value.name = "Имя должно содержать минимум 2 символа";
  }

  if (!editForm.email.trim()) {
    errors.value.email = "Введите email";
  } else if (!validateEmail(editForm.email.trim())) {
    errors.value.email = "Введите корректный email";
  }

  if (editForm.phone && !validatePhone()) {
    errors.value.phone = "Введите корректный номер телефона";
  }

  if (editForm.birthdate) {
    const birthDate = new Date(editForm.birthdate);
    const now = new Date();
    if (birthDate > now) {
      errors.value.birthdate = "Дата рождения не может быть в будущем";
    } else {
      const age = now.getFullYear() - birthDate.getFullYear();
      if (age > 120) {
        errors.value.birthdate = "Введите корректную дату рождения";
      }
    }
  }

  if (editForm.newPassword && editForm.newPassword.length < 6) {
    errors.value.newPassword = "Пароль должен содержать минимум 6 символов";
  }

  if (Object.keys(errors.value).length) return;

  const updatedUser = {
    ...user.value,
    surname: editForm.surname.trim(),
    name: editForm.name.trim(),
    email: editForm.email.trim(),
    phone: editForm.phone || "",
    birthdate: editForm.birthdate || "",
  };

  if (editForm.newPassword) {
    updatedUser.password = editForm.newPassword.trim();
  }

  updateUser(updatedUser);
  user.value = updatedUser;
  isEditing.value = false;
  editForm.newPassword = "";
}

function confirmDelete() {
  showDeleteConfirm.value = true;
}

function cancelDelete() {
  showDeleteConfirm.value = false;
}

function deleteAccount() {
  deleteUser(user.value.username);
  logout();
  router.push("/");
}

function confirmLogout() {
  showLogoutConfirm.value = true;
}

function cancelLogout() {
  showLogoutConfirm.value = false;
}

function logoutConfirmed() {
  logout();
  router.push("/");
}
</script>

<template>
  <main class="profile-page">
    <div class="profile-container">
      <div class="profile-left">
        <div class="avatar-large">
          <img
            src="../assets/pageContent/avatar-placeholder.svg"
            alt="Avatar"
          />
        </div>
        <div class="profile-left-actions">
          <button class="btn btn-primary btn-left" @click="confirmLogout">
            <img
              src="../assets/icons/icon-exit.svg"
              class="btn-icon"
              alt="exit"
            />
            Выйти
          </button>
          <button class="btn btn-danger btn-left" @click="confirmDelete">
            <img
              src="../assets/icons/icon-trash.svg"
              class="btn-icon"
              alt="trash"
            />
            Удалить
          </button>
        </div>
      </div>

      <div class="profile-right">
        <div class="profile-right-header">
          <h1 class="profile-title">ЛИЧНЫЙ КАБИНЕТ</h1>
          <button
            v-if="!isEditing"
            class="btn btn-primary btn-edit"
            @click="startEditing"
          >
            <img
              src="../assets/icons/icon-edit.svg"
              class="btn-icon"
              alt="edit"
            />
            Редактировать
          </button>
        </div>

        <div v-if="!isEditing" class="profile-view">
          <div class="info-field">
            <label>Логин</label>
            <div class="field-disabled">{{ user?.username }}</div>
          </div>
          <div class="info-field">
            <label>Фамилия</label>
            <div class="field-disabled">{{ user?.surname || "—" }}</div>
          </div>
          <div class="info-field">
            <label>Имя</label>
            <div class="field-disabled">{{ user?.name || "—" }}</div>
          </div>
          <div class="info-field">
            <label>Email</label>
            <div class="field-disabled">{{ user?.email }}</div>
          </div>
          <div class="info-field">
            <label>Телефон</label>
            <div class="field-disabled">{{ user?.phone || "—" }}</div>
          </div>
          <div class="info-field">
            <label>Дата рождения</label>
            <div class="field-disabled">{{ user?.birthdate || "—" }}</div>
          </div>
        </div>

        <div v-else class="profile-edit">
          <form @submit.prevent="saveChanges">
            <div class="field">
              <label for="surname">Фамилия</label>
              <input
                id="surname"
                v-model="editForm.surname"
                type="text"
                placeholder="Введите фамилию"
                @input="clearError('surname')"
                name="surname"
                autocomplete="family-name"
              />
              <span v-if="errors.surname" class="error">{{
                errors.surname
              }}</span>
            </div>

            <div class="field">
              <label for="name">Имя</label>
              <input
                id="name"
                v-model="editForm.name"
                type="text"
                placeholder="Введите имя"
                @input="clearError('name')"
                name="name"
                autocomplete="given-name"
              />
              <span v-if="errors.name" class="error">{{ errors.name }}</span>
            </div>

            <div class="field">
              <label for="email">Email</label>
              <input
                id="email"
                v-model="editForm.email"
                type="text"
                placeholder="example@mail.ru"
                @input="clearError('email')"
                name="email"
                autocomplete="email"
              />
              <span v-if="errors.email" class="error">{{ errors.email }}</span>
            </div>

            <div class="field">
              <label for="phone">Телефон</label>
              <input
                id="phone"
                v-model="editForm.phone"
                type="text"
                placeholder="+7 (___) ___-__-__"
                @input="formatPhone"
                name="phone"
                autocomplete="phone"
              />
              <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
            </div>

            <div class="field">
              <label for="birthdate">Дата рождения</label>
              <input
                id="birthdate"
                v-model="editForm.birthdate"
                type="date"
                @input="clearError('birthdate')"
                name="birthdate"
                autocomplete="birthdate"
              />
              <span v-if="errors.birthdate" class="error">{{
                errors.birthdate
              }}</span>
            </div>

            <div class="field">
              <label for="newPassword"
                >Новый пароль (если хотите сменить)</label
              >
              <input
                id="newPassword"
                v-model="editForm.newPassword"
                type="password"
                placeholder="Введите новый пароль"
                @input="clearError('newPassword')"
                name="newpassword"
                autocomplete="newpassword"
              />
              <span v-if="errors.newPassword" class="error">{{
                errors.newPassword
              }}</span>
            </div>

            <div v-if="errors.general" class="error general">
              {{ errors.general }}
            </div>

            <div class="edit-actions">
              <button type="submit" class="btn btn-primary">Сохранить</button>
              <button
                type="button"
                class="btn btn-secondary"
                @click="cancelEdit"
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div v-if="showDeleteConfirm" class="delete-confirm">
      <p>Вы уверены, что хотите удалить аккаунт? Это действие необратимо.</p>
      <div class="delete-actions">
        <button class="btn btn-danger" @click="deleteAccount">
          Да, удалить
        </button>
        <button class="btn btn-secondary" @click="cancelDelete">Отмена</button>
      </div>
    </div>

    <div v-if="showLogoutConfirm" class="logout-confirm">
      <p>Вы уверены, что хотите выйти из аккаунта?</p>
      <div class="logout-actions">
        <button class="btn btn-primary" @click="logoutConfirmed">
          Да, выйти
        </button>
        <button class="btn btn-secondary" @click="cancelLogout">Отмена</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.profile-page {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 40px 100px;
}

.profile-container {
  display: flex;
  gap: 40px;
  max-width: 1200px;
  width: 100%;
  background-color: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 4px 12px #0000000d;
}

.profile-left {
  flex: 0 0 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.avatar-large {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #e0e0e0;
}

.avatar-large img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-left-actions {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn-left {
  width: 100%;
}

.profile-right {
  flex: 1;
  min-width: 0;
}

.profile-right-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 16px;
}

.profile-title {
  font-size: 32px;
  font-weight: 700;
  color: #222;
  margin: 0;
}

.btn-edit {
  min-width: 150px;
}

.info-field {
  margin-bottom: 20px;
}

.info-field label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
}

.field-disabled {
  width: 100%;
  padding: 14px 18px;
  border: 2px solid #e0e0e0;
  border-radius: 40px;
  font-size: 14px;
  background-color: #f5f5f5;
  color: #333;
  box-sizing: border-box;
  min-height: 48px;
}

.profile-edit .field {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 14px 18px;
  border: 2px solid #e0e0e0;
  border-radius: 40px;
  font-size: 14px;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #68a61c;
}

input::placeholder {
  color: #aaa;
}

.error {
  display: block;
  margin-top: 6px;
  font-size: 12px;
  color: #ff4757;
}

.error.general {
  text-align: center;
  margin-bottom: 16px;
}

.edit-actions {
  display: flex;
  gap: 16px;
  margin-top: 20px;
}

.edit-actions .btn {
  flex: 1;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border: 2px solid #ffffff;
  background-color: #000000;
  border-radius: 60px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: #ffffff;
  transition: all 0.2s;
  text-decoration: none;
  box-sizing: border-box;
}

.btn:hover {
  background-color: #68a61c;
  border-color: #68a61c;
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px #00000026;
}

.btn-danger:hover {
  background-color: #ff4757;
  border-color: #ff4757;
}

.btn-danger img {
  width: 20px;
  height: 20px;
  filter: brightness(0) invert(1);
}

.btn-secondary {
  background-color: #fff;
  color: #000;
  border-color: #e0e0e0;
}

.btn-secondary:hover {
  background-color: #000000;
  border-color: #000000;
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px #0000001a;
}

.btn-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: transparent;
}

.delete-confirm,
.logout-confirm {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 400px;
  width: 90%;
  background-color: #fff;
  border: 2px solid #ff4757;
  border-radius: 24px;
  padding: 30px;
  box-shadow: 0 10px 30px #00000033;
  z-index: 1000;
  text-align: center;
}

.logout-confirm {
  border-color: #68a61c;
}

.delete-confirm p,
.logout-confirm p {
  font-size: 16px;
  color: #333;
  margin-bottom: 30px;
}

.delete-actions,
.logout-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.delete-actions .btn,
.logout-actions .btn {
  flex: 1;
  min-width: 120px;
}

@media (max-width: 1024px) {
  .profile-page {
    padding: 40px 40px;
  }
  .profile-container {
    padding: 30px;
  }
  .profile-left {
    flex-basis: 220px;
  }
  .avatar-large {
    width: 120px;
    height: 120px;
  }
}

@media (max-width: 768px) {
  .profile-page {
    padding: 20px;
  }
  .profile-container {
    flex-direction: column;
    padding: 30px 20px;
  }
  .profile-left {
    flex-basis: auto;
    width: 100%;
    align-items: center;
  }
  .profile-right-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .btn-edit {
    width: 100%;
  }
  .delete-actions,
  .logout-actions {
    flex-direction: column;
  }
}
</style>
