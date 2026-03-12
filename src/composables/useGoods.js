import { ref } from "vue";

const STORAGE_KEY = "app_goods";

const defaultGoods = [
  {
    id: 1,
    sku: "SKU001",
    name: "Футболка черная с мелким принтом",
    price: 890,
    oldPrice: 1290,
    discount: "-31%",
    rating: 4.5,
    image: "product1.jpg",
    category: "t-shirts",
    onSale: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Классическая футболка из мягкого хлопка с оригинальным принтом. Подходит для повседневной носки.",
    details: "Состав: 100% хлопок. Стирка при 30°C. Производство: Россия.",
    reviews: [
      { id: 101, userName: "Мухамед", rating: 5, text: "Мне очень нравится эта футболка! Дизайн уникальный, а ткань приятная на ощупь. Как коллега-дизайнер, я ценю внимание к деталям. Она стала моей любимой одеждой", date: "2026-04-14T10:00:00.000Z" },
      { id: 102, userName: "Даниил", rating: 4, text: "Эта футболка просто необходима каждому, кто ценит хороший дизайн. Минималистичный, но в то же время стильный узор привлекает внимание, а посадка по фигуре идеальная. Я вижу дизайнерский подход в каждом элементе этой футболки", date: "2026-04-10T12:30:00.000Z" },
      { id: 103, userName: "Серафим", rating: 4, text: "В этой футболке сочетаются комфорт и креативность. Ткань мягкая, а дизайн красноречиво говорит о мастерстве дизайнера. Я люблю силу и прочность, которая создается мной строго как к дизайну, так и к моде", date: "2026-04-01T09:15:00.000Z" },
    ],
  },
  {
    id: 2,
    sku: "SKU002",
    name: "Джинсы светлые скини",
    price: 2490,
    oldPrice: 3290,
    discount: "-24%",
    rating: 4.7,
    image: "product2.jpg",
    category: "jeans",
    onSale: true,
    sizes: ["S", "M", "L"],
    description: "Узкие джинсы светлого оттенка. Идеально сочетаются с любой обувью.",
    details: "Состав: 98% хлопок, 2% эластан. Машинная стирка при 30°C.",
    reviews: [],
  },
  {
    id: 3,
    sku: "SKU003",
    name: "Рубашка клетчатая",
    price: 1590,
    oldPrice: 2190,
    discount: "-27%",
    rating: 4.8,
    image: "product3.jpg",
    category: "shirts",
    onSale: true,
    sizes: ["M", "L", "XL"],
    description: "Клетчатая рубашка свободного кроя из мягкой ткани. Подходит для создания casual-образов.",
    details: "Состав: 100% хлопок. Стирка при 30°C.",
    reviews: [],
  },
  {
    id: 4,
    sku: "SKU004",
    name: "Футболка в полоску",
    price: 790,
    oldPrice: 1190,
    discount: "-34%",
    rating: 4.2,
    image: "product4.jpg",
    category: "t-shirts",
    onSale: true,
    sizes: ["S", "M", "L"],
    description: "Футболка в классическую полоску из дышащего хлопка. Отличный выбор для лета.",
    details: "Состав: 100% хлопок. Производство: Россия.",
    reviews: [],
  },
  {
    id: 5,
    sku: "SKU005",
    name: "Рубашка в полоску",
    price: 1790,
    oldPrice: 2390,
    discount: "-25%",
    rating: 4.3,
    image: "product5.jpg",
    category: "shirts",
    onSale: true,
    sizes: ["M", "L", "XL"],
    description: "Рубашка с тонкой полоской из качественного хлопка. Идеальна для офиса и прогулок.",
    details: "Состав: 100% хлопок. Машинная стирка.",
    reviews: [],
  },
  {
    id: 6,
    sku: "SKU006",
    name: "Футболка кураж",
    price: 990,
    oldPrice: 1490,
    discount: "-34%",
    rating: 4.6,
    image: "product6.jpg",
    category: "t-shirts",
    onSale: true,
    sizes: ["XS", "S", "M"],
    description: "Футболка с ярким графическим принтом из плотного хлопка. Подчеркнет вашу индивидуальность.",
    details: "Состав: 100% хлопок. Стирка при 30°C.",
    reviews: [],
  },
  {
    id: 7,
    sku: "SKU007",
    name: "Шорты бермуды",
    price: 1190,
    oldPrice: 1690,
    discount: "-30%",
    rating: 4.4,
    image: "product7.jpg",
    category: "shorts",
    onSale: true,
    sizes: ["S", "M", "L"],
    description: "Удобные бермуды из натурального хлопка. Подходят для активного отдыха.",
    details: "Состав: 100% хлопок. Машинная стирка.",
    reviews: [],
  },
  {
    id: 8,
    sku: "SKU008",
    name: "Джинсы темные скини",
    price: 2990,
    oldPrice: 3990,
    discount: "-25%",
    rating: 4.9,
    image: "product8.jpg",
    category: "jeans",
    onSale: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Темные узкие джинсы с эффектом потертости. Отлично сидят по фигуре.",
    details: "Состав: 98% хлопок, 2% эластан. Стирка при 30°C.",
    reviews: [],
  },
  {
    id: 9,
    sku: "SKU009",
    name: "Шорты свободные голубые",
    price: 990,
    oldPrice: 1390,
    discount: "-29%",
    rating: 4.1,
    image: "product9.jpg",
    category: "shorts",
    onSale: true,
    sizes: ["M", "L", "XL"],
    description: "Свободные шорты из мягкого денима. Идеальны для жаркой погоды.",
    details: "Состав: 100% хлопок.",
    reviews: [],
  },
  {
    id: 10,
    sku: "SKU010",
    name: "Шорты джинсовые светлые до колена",
    price: 1790,
    oldPrice: 1790,
    discount: null,
    rating: 4.2,
    image: "product10.jpg",
    category: "shorts",
    onSale: false,
    sizes: ["S", "M", "L", "XL"],
    description: "Классические джинсовые шорты средней длины. Универсальный вариант.",
    details: "Состав: 100% хлопок.",
    reviews: [],
  },
  {
    id: 11,
    sku: "SKU011",
    name: "Шорты короткие с подворотами",
    price: 1490,
    oldPrice: 1490,
    discount: null,
    rating: 4.3,
    image: "product11.jpg",
    category: "shorts",
    onSale: false,
    sizes: ["S", "M", "L"],
    description: "Короткие шорты с подворотами для стильного летнего образа.",
    details: "Состав: 100% хлопок.",
    reviews: [],
  },
  {
    id: 12,
    sku: "SKU012",
    name: "Джинсы клеш",
    price: 3590,
    oldPrice: 3590,
    discount: null,
    rating: 4.6,
    image: "product12.jpg",
    category: "jeans",
    onSale: false,
    sizes: ["S", "M", "L", "XL"],
    description: "Модные джинсы клеш из плотного денима. Добавят ретро-шарма.",
    details: "Состав: 98% хлопок, 2% эластан.",
    reviews: [],
  },
  {
    id: 13,
    sku: "SKU013",
    name: "Кроссовки Nike черно-белые",
    price: 5490,
    oldPrice: 5490,
    discount: null,
    rating: 4.7,
    image: "product13.jpg",
    category: "sneakers",
    onSale: false,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Стильные кроссовки Nike в черно-белой расцветке. Подойдут для спорта и повседневной носки.",
    details: "Материал: текстиль, резина.",
    reviews: [],
  },
  {
    id: 14,
    sku: "SKU014",
    name: "Кроссовки Nike белые",
    price: 5890,
    oldPrice: 5890,
    discount: null,
    rating: 4.8,
    image: "product14.jpg",
    category: "sneakers",
    onSale: false,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Классические белые кроссовки Nike. Универсальная модель на каждый день.",
    details: "Материал: кожа, текстиль.",
    reviews: [],
  },
  {
    id: 15,
    sku: "SKU015",
    name: "Черный свитшот",
    price: 2490,
    oldPrice: 2490,
    discount: null,
    rating: 4.4,
    image: "product15.jpg",
    category: "sweatshirts",
    onSale: false,
    sizes: ["S", "M", "L", "XL"],
    description: "Черный свитшот с принтом SpongeBob. Теплый и уютный.",
    details: "Состав: 80% хлопок, 20% полиэстер.",
    reviews: [],
  },
  {
    id: 16,
    sku: "SKU016",
    name: "Коричневый свитшот графичный",
    price: 2690,
    oldPrice: 2690,
    discount: null,
    rating: 4.5,
    image: "product16.jpg",
    category: "sweatshirts",
    onSale: false,
    sizes: ["S", "M", "L", "XL"],
    description: "Свитшот коричневого цвета с графичным дизайном. Мягкий и комфортный.",
    details: "Состав: 80% хлопок, 20% полиэстер.",
    reviews: [],
  },
];

function initGoods() {
  const goods = localStorage.getItem(STORAGE_KEY);
  if (!goods) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultGoods));
  }
}
initGoods();

const goodsList = ref(JSON.parse(localStorage.getItem(STORAGE_KEY)) || []);

export function useGoods() {
  const getAll = () => goodsList.value;

  const findById = (id) => goodsList.value.find((g) => g.id === id);

  const findBySku = (sku) => goodsList.value.find((g) => g.sku === sku);

  const add = (newGood) => {
    const newId = Math.max(...goodsList.value.map((g) => g.id), 0) + 1;
    const sku = `SKU${String(newId).padStart(3, '0')}`;
    const good = { id: newId, sku, ...newGood };
    goodsList.value.push(good);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goodsList.value));
  };

  const update = (id, updatedData) => {
    const index = goodsList.value.findIndex((g) => g.id === id);
    if (index !== -1) {
      goodsList.value[index] = { ...goodsList.value[index], ...updatedData };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(goodsList.value));
    }
  };

  const remove = (id) => {
    goodsList.value = goodsList.value.filter((g) => g.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goodsList.value));
  };

  return {
    goodsList,
    getAll,
    findById,
    findBySku,
    add,
    update,
    remove,
  };
}
