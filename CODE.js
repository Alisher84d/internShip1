const bestSellers = document.getElementById("bestSellers");

let allData = {};

function createProductCard(product) {
 HTML =  `
    <div class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.title}">
        ${product.discount ? `<div class="discount-badge">${product.discount}%</div>` : ''}
      </div>
      <div class="product-name">${product.title}</div>
      <div class="product-price">${product.currency}${product.price}</div>
      <button class="buy-btn" data-id="${product.id}">Buy</button>
      <button class="fov-btn" data-id="${product.id}"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-417q42-38 66.5-62.5T585-521q14-17 18.5-30.5T608-580q0-29-20.5-50T538-651q-17 0-32.5 7T480-625q-10-12-25.5-19t-32.5-7q-29 0-49.5 21T352-580q0 15 4 28t18 30q14 17 39 42t67 63ZM252-198v-530q0-26 17-43t43-17h336q26 0 43 17t17 43v530l-228-98-228 98Zm28-44 200-86 200 86v-486q0-12-10-22t-22-10H312q-12 0-22 10t-10 22v486Zm0-518h400-400Z"/></svg></button>
    </div>
  `;
  return HTML
}


async function fetchProducts() {
  try {
    const response = await fetch('./db.json');
    if (!response.ok) throw new Error('internetni yoq');

    allData = await response.json();


    if (allData.students && allData.students.length > 0) {
      renderProducts(allData.students);
    } else {
  return;
    }

    setupCategoryFilter();
    updateBasketBadge();
    updateFavoriteBadge();

  } catch (error) {
    console.error(" Xato", error);
    
  }
}

function renderProducts(products) {
  if (!products || products.length === 0) {
    return;
  }

  bestSellers.innerHTML = products.map(createProductCard).join("");
  attachEventListeners(products);
}

function attachEventListeners(products) {
  document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const productId = parseInt(e.target.dataset.id);
      const product = products.find(p => p.id === productId);
      if (product && confirm(`"${product.title}" savatchaga qo'shilsinmi?`)) {
        addToBasket(product);
        updateBasketBadge();
      }
    });
  });

  document.querySelectorAll('.fov-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const productId = parseInt(e.target.dataset.id);
      const product = products.find(p => p.id === productId);
      if (product) {
        addToFavorite(product);
        alert(`"${product.title}" fovga qo'shildi!`);
        updateFavoriteBadge();
      }
    });
  });
}

function setupCategoryFilter() {
  const categoryItems = document.querySelectorAll('.category-list li');

  categoryItems.forEach((item, index) => {
    item.style.cursor = 'pointer';

    item.addEventListener('click', function () {
      categoryItems.forEach(li => li.classList.remove('active'));
      item.classList.add('active');

      let productsToShow = [];

      const categoryName = item.textContent.trim().toLowerCase();

      if (categoryName === 'students') {
        productsToShow = allData.students || [];
      } else if (categoryName === 'computers') {
        productsToShow = allData.computers || [];
      } else if (categoryName === 'electronics') {
        productsToShow = allData.electronics || [];
      } else if (categoryName === 'household goods') {
        productsToShow = allData.householdGoods || [];
      } else if (categoryName === "women's clothing") {
        productsToShow = allData.womensClothing || [];
      } else if (categoryName === "men's clothing") {
        productsToShow = allData.mensClothing || [];
      } else if (categoryName === 'children') {
        productsToShow = allData.children || [];
      } else if (categoryName === 'auto products') {
        productsToShow = allData.autoProducts || [];
      } else if (categoryName === 'beauty & health') {
        productsToShow = allData.beautyHealth || [];
      } else if (categoryName === 'sports & entertainment') {
        productsToShow = allData.sportsEntertainment || [];
      } else {
        productsToShow = [
          ...(allData.students || []),
          ...(allData.computers || []),
          ...(allData.electronics || []),
          ...(allData.householdGoods || []),
          ...(allData.womensClothing || []),
          ...(allData.mensClothing || []),
          ...(allData.children || []),
          ...(allData.autoProducts || []),
          ...(allData.beautyHealth || []),
          ...(allData.sportsEntertainment || [])
        ];
      }

      renderProducts(productsToShow);
    });
  });
}

function addToBasket(product) {
  let basket = JSON.parse(localStorage.getItem("basket")) || [];
  const existing = basket.find(item => item.id === product.id);
  if (existing) existing.count++;
  else basket.push({ ...product, count: 1 });
  localStorage.setItem("basket", JSON.stringify(basket));
}

function addToFavorite(product) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.find(item => item.id === product.id)) favorites.push(product);
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function updateBasketBadge() {
  const basket = JSON.parse(localStorage.getItem("basket")) || [];
  const totalItems = basket.reduce((sum, item) => sum + item.count, 0);
  const badge = document.querySelector('.header-icon span');
  if (badge) badge.textContent = totalItems;
}

function updateFavoriteBadge() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const favBadge = document.querySelector('.badge');
  if (favBadge) favBadge.textContent = favorites.length;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', fetchProducts);
} else {
  fetchProducts();
}