<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useGoods } from "../composables/useGoods";

const props = defineProps({
  isEdit: { type: Boolean, default: false },
  productId: { type: Number, default: null },
});

const router = useRouter();
const { add, update, findById } = useGoods();

const availableSizes = ["XS", "S", "M", "L", "XL"];

const form = reactive({
  name: "",
  price: null,
  oldPrice: null,
  discount: "",
  rating: null,
  category: "",
  onSale: false,
  sizes: [],
  description: "",
  details: "",
  image: "",
});

const discountPercent = ref(0);
const errors = ref({});

onMounted(() => {
  if (props.isEdit && props.productId) {
    const product = findById(props.productId);
    if (product) {
      form.name = product.name || "";
      form.price = product.price || null;
      form.oldPrice = product.oldPrice || null;
      form.discount = product.discount || "";
      if (
        form.discount &&
        form.discount.startsWith("-") &&
        form.discount.endsWith("%")
      ) {
        discountPercent.value = parseInt(form.discount.slice(1, -1)) || 0;
      } else {
        discountPercent.value = 0;
      }
      form.rating = product.rating || null;
      form.category = product.category || "";
      form.onSale = product.onSale || false;
      form.sizes = product.sizes || [];
      form.description = product.description || "";
      form.details = product.details || "";
      form.image = product.image || "";
    } else {
      router.push("/admin/products");
    }
  }
});

function updateOldPrice() {
  if (form.price && discountPercent.value > 0) {
    form.oldPrice = Math.round(
      (form.price * (100 + discountPercent.value)) / 100,
    );
    form.discount = `-${discountPercent.value}%`;
  } else {
    form.oldPrice = form.price;
    form.discount = "";
  }
}

function clearError(field) {
  delete errors.value[field];
}

function validate() {
  errors.value = {};
  if (!form.name.trim()) errors.value.name = "Введите название";
  if (!form.price || form.price <= 0)
    errors.value.price = "Введите корректную цену";
  if (!form.rating || form.rating < 0 || form.rating > 5)
    errors.value.rating = "Рейтинг должен быть от 0 до 5";
  if (!form.category) errors.value.category = "Выберите категорию";
  if (!form.image) errors.value.image = "Выберите изображение";
  return Object.keys(errors.value).length === 0;
}

function handleSubmit() {
  if (!validate()) return;

  const productData = {
    ...form,
    sizes: form.sizes,
  };

  if (props.isEdit) {
    update(props.productId, productData);
  } else {
    add(productData);
  }
  router.push("/admin/products");
}
</script>

<template>
  <div class="admin-form">
    <h2 class="form-title">
      {{ isEdit ? "Редактировать товар" : "Добавить товар" }}
    </h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-field">
        <label for="name">Название</label>
        <input
          id="name"
          type="text"
          v-model="form.name"
          placeholder="Введите название"
          @input="clearError('name')"
          name="name"
          autocomplete="text"
        />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>
      </div>

      <div class="form-row">
        <div class="form-field" style="flex: 1">
          <label for="price">Цена (новая)</label>
          <input
            id="price"
            type="number"
            v-model.number="form.price"
            placeholder="Введите цену"
            @input="
              clearError('price');
              updateOldPrice();
            "
            name="price"
            autocomplete="off"
          />
          <span v-if="errors.price" class="error">{{ errors.price }}</span>
        </div>
        <div class="form-field" style="flex: 1">
          <label for="discountPercent">Скидка %</label>
          <input
            id="discountPercent"
            type="number"
            v-model.number="discountPercent"
            min="0"
            max="100"
            step="1"
            placeholder="0"
            @input="updateOldPrice"
            name="discountPercent"
            autocomplete="off"
          />
        </div>
      </div>

      <div class="form-field" v-if="form.oldPrice">
        <label for="oldPrice">Старая цена (авто)</label>
        <input
          id="oldPrice"
          type="number"
          v-model.number="form.oldPrice"
          readonly
          disabled
          class="readonly"
          name="oldPrice"
          autocomplete="off"
        />
      </div>

      <div class="form-field">
        <label for="rating">Рейтинг (0-5)</label>
        <input
          id="rating"
          type="number"
          step="0.1"
          v-model.number="form.rating"
          placeholder="Введите рейтинг"
          @input="clearError('rating')"
          name="rating"
          autocomplete="off"
        />
        <span v-if="errors.rating" class="error">{{ errors.rating }}</span>
      </div>

      <div class="form-field">
        <label for="category">Категория</label>
        <select
          id="category"
          v-model="form.category"
          @change="clearError('category')"
          name="category"
          autocomplete="off"
        >
          <option value="" disabled>Выберите категорию</option>
          <option value="t-shirts">Футболки</option>
          <option value="shirts">Рубашки</option>
          <option value="shorts">Шорты</option>
          <option value="jeans">Джинсы</option>
          <option value="sneakers">Кроссовки</option>
          <option value="sweatshirts">Свитшоты</option>
        </select>
        <span v-if="errors.category" class="error">{{ errors.category }}</span>
      </div>

      <div class="form-field checkbox">
        <label for="onSale">
          <input
            id="onSale"
            type="checkbox"
            v-model="form.onSale"
            name="onSale"
            autocomplete="off"
          />
          Распродажа (onSale)
        </label>
      </div>

      <div class="form-field">
        <label>Размеры</label>
        <div class="sizes-checkboxes">
          <label
            v-for="size in availableSizes"
            :key="size"
            :for="'size-' + size"
            class="size-checkbox"
          >
            <input
              :id="'size-' + size"
              type="checkbox"
              :value="size"
              v-model="form.sizes"
              name="sizes"
              autocomplete="off"
            />
            {{ size }}
          </label>
        </div>
      </div>

      <div class="form-field">
        <label for="description">Описание</label>
        <textarea
          id="description"
          v-model="form.description"
          placeholder="Введите описание"
          rows="3"
          name="description"
          autocomplete="off"
        ></textarea>
      </div>

      <div class="form-field">
        <label for="details">Детали (доп. информация)</label>
        <textarea
          id="details"
          v-model="form.details"
          placeholder="Введите детали"
          rows="2"
          name="details"
          autocomplete="off"
        ></textarea>
      </div>

      <div class="form-field">
        <label for="image">Изображение</label>
        <select
          id="image"
          v-model="form.image"
          @change="clearError('image')"
          name="image"
          autocomplete="off"
        >
          <option value="" disabled>Выберите изображение</option>
          <option value="product1.jpg">product1.jpg</option>
          <option value="product2.jpg">product2.jpg</option>
        </select>
        <span v-if="errors.image" class="error">{{ errors.image }}</span>
      </div>

      <div v-if="errors.general" class="error general">
        {{ errors.general }}
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">
          {{ isEdit ? "Сохранить" : "Добавить" }}
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          @click="$router.push('/admin/products')"
        >
          Отмена
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.admin-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px 0;
}
.form-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
  text-align: center;
}
.form-row {
  display: flex;
  gap: 20px;
}
.form-field {
  margin-bottom: 20px;
}
.form-field label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}
.form-field input,
.form-field select,
.form-field textarea {
  width: 100%;
  padding: 10px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 40px;
  font-size: 14px;
  transition: border-color 0.2s;
  box-sizing: border-box;
}
.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus {
  outline: none;
  border-color: #68a61c;
}
.form-field textarea {
  border-radius: 20px;
  resize: vertical;
}
.form-field input[type="checkbox"] {
  width: auto;
  height: auto;
  margin-right: 8px;
}
.form-field.checkbox label {
  display: flex;
  align-items: center;
  font-weight: normal;
}
.readonly {
  background-color: #f5f5f5;
  cursor: not-allowed;
}
.sizes-checkboxes {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 20px;
}
.size-checkbox {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
}
.size-checkbox input {
  width: auto;
  margin: 0;
}
.error {
  display: block;
  margin-top: 5px;
  font-size: 12px;
  color: #ff4757;
}
.error.general {
  text-align: center;
  margin-bottom: 15px;
}
.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}
.btn {
  padding: 10px 25px;
  border: 2px solid #ffffff;
  background-color: #000000;
  border-radius: 60px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: #ffffff;
  transition: all 0.2s;
  text-decoration: none;
  border: none;
}
.btn:hover {
  background-color: #68a61c;
  border-color: #68a61c;
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px #00000026;
}
.btn-secondary {
  background-color: #fff;
  color: #000;
  border: 2px solid #e0e0e0;
}
.btn-secondary:hover {
  background-color: #f5f5f5;
  color: #000;
}
</style>
