<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useGoods } from "../composables/useGoods";
import { useAuth } from "../composables/useAuth";

const route = useRoute();
const router = useRouter();
const { findBySku, update } = useGoods();
const { isAuthenticated, activeUser } = useAuth();

const sku = route.params.sku;
const product = findBySku(sku);

const reviews = ref(product?.reviews || []);

const pageSize = 3;
const currentPage = ref(1);
const displayedReviews = computed(() =>
  reviews.value.slice(0, currentPage.value * pageSize),
);
const hasMore = computed(
  () => reviews.value.length > displayedReviews.value.length,
);

const showForm = ref(false);
const newReview = ref({
  rating: 5,
  text: "",
});

function formatDate(dateString) {
  const d = new Date(dateString);
  return d.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function loadMore() {
  currentPage.value++;
}

function handleWriteReview() {
  if (!isAuthenticated.value) {
    router.push("/signup");
    return;
  }
  showForm.value = true;
}

function closeForm() {
  showForm.value = false;
  newReview.value = { rating: 5, text: "" };
}

function submitReview() {
  if (!newReview.value.text.trim()) {
    alert("Пожалуйста, напишите текст отзыва");
    return;
  }

  const review = {
    id: Date.now(),
    userId: activeUser.value?.username,
    userName:
      activeUser.value?.name || activeUser.value?.username || "Пользователь",
    rating: newReview.value.rating,
    text: newReview.value.text,
    date: new Date().toISOString(),
  };

  reviews.value.unshift(review);
  update(product.id, { reviews: reviews.value });

  closeForm();
}
</script>

<template>
  <div class="product-reviews">
    <div class="reviews-header">
      <h3 class="reviews-title">Все отзывы</h3>
      <button class="write-review-btn" @click="handleWriteReview">
        Написать отзыв
      </button>
    </div>

    <div v-if="!reviews.length" class="no-reviews">
      Пока нет отзывов. Будьте первым!
    </div>

    <div class="reviews-list">
      <div
        v-for="review in displayedReviews"
        :key="review.id"
        class="review-card"
      >
        <div class="review-rating">
          <span class="stars">
            <span
              class="stars-filled"
              :style="{ width: (review.rating / 5) * 100 + '%' }"
              >★★★★★</span
            >
            <span class="stars-empty">★★★★★</span>
          </span>
        </div>
        <div class="review-author">{{ review.userName }}</div>
        <p class="review-text">{{ review.text }}</p>
        <div class="review-date">{{ formatDate(review.date) }}</div>
      </div>
    </div>

    <div v-if="hasMore" class="more-btn-wrapper">
      <button class="btn-more" @click="loadMore">Ещё</button>
    </div>

    <Teleport to="body">
      <div v-if="showForm" class="review-modal-overlay" @click.self="closeForm">
        <div class="review-modal">
          <h4 class="modal-title">Написать отзыв</h4>
          <div class="rating-select">
            <span class="rating-label">Ваша оценка:</span>
            <div class="stars-input">
              <span
                v-for="star in 5"
                :key="star"
                @click="newReview.rating = star"
                :class="{ active: star <= newReview.rating }"
                >★</span
              >
            </div>
          </div>
          <textarea
            v-model="newReview.text"
            placeholder="Поделитесь впечатлениями о товаре..."
            rows="5"
          ></textarea>
          <div class="modal-actions">
            <button class="btn-submit" @click="submitReview">Отправить</button>
            <button class="btn-cancel" @click="closeForm">Отмена</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.product-reviews {
  padding: 20px 0;
}

.reviews-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 30px;
}

.reviews-title {
  font-size: 22px;
  font-weight: 600;
  color: #222;
  margin: 0;
}

.write-review-btn {
  padding: 10px 24px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.write-review-btn:hover {
  background-color: #68a61c;
}

.no-reviews {
  text-align: center;
  padding: 40px;
  color: #777;
  font-size: 16px;
  border: 2px dashed #e0e0e0;
  border-radius: 16px;
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.review-card {
  background-color: #fff;
  border: 2px solid #eee;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 2px 8px #00000005;
  overflow-wrap: break-word;
  word-wrap: break-word;
  max-width: 100%;
}

.review-rating {
  margin-bottom: 8px;
}

.stars {
  position: relative;
  display: inline-block;
  font-size: 16px;
  letter-spacing: 2px;
  line-height: 1;
  width: fit-content;
}

.stars-empty {
  color: #e0e0e0;
  white-space: nowrap;
}

.stars-filled {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  white-space: nowrap;
  color: #f5b301;
  pointer-events: none;
}

.review-author {
  font-weight: 600;
  font-size: 16px;
  color: #222;
  margin-bottom: 8px;
}

.review-text {
  font-size: 14px;
  color: #555;
  line-height: 1.5;
  margin-bottom: 16px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  max-width: 100%;
}

.review-date {
  font-size: 12px;
  color: #999;
}

.more-btn-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.btn-more {
  padding: 12px 40px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 60px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-more:hover {
  background-color: #68a61c;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px #00000026;
}

.review-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000080;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.review-modal {
  background-color: #fff;
  border-radius: 24px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 40px #00000033;
}

.modal-title {
  font-size: 24px;
  font-weight: 600;
  color: #222;
  margin-bottom: 20px;
  text-align: center;
}

.rating-select {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.rating-label {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.stars-input {
  display: flex;
  gap: 4px;
  font-size: 24px;
  color: #ccc;
  cursor: pointer;
}

.stars-input span {
  transition: color 0.2s;
}

.stars-input span.active {
  color: #f5b301;
}

textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  font-size: 14px;
  margin-bottom: 20px;
  resize: vertical;
  font-family: inherit;
  box-sizing: border-box;
}

textarea:focus {
  outline: none;
  border-color: #68a61c;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn-submit,
.btn-cancel {
  padding: 10px 24px;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-submit {
  background-color: #000;
  color: #fff;
}

.btn-submit:hover {
  background-color: #68a61c;
}

.btn-cancel {
  background-color: #fff;
  color: #333;
  border: 2px solid #e0e0e0;
}

.btn-cancel:hover {
  background-color: #f5f5f5;
}

@media (max-width: 768px) {
  .reviews-header {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  .write-review-btn {
    width: 100%;
  }
  .review-modal {
    padding: 20px;
  }
  .rating-select {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
