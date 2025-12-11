const basketdata = JSON.parse(localStorage.getItem("basket")) || [];

const basketdaitem = document.getElementById("basket-items");

function showbasket() {
    basketdaitem.innerHTML = "";

    if (basketdata.length === 0) {
        basketdaitem.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center; padding:40px;">
                    <p style="font-size:18px; color:#666;">Your basket is empty.</p>
                    <a href="index.html">
                        <a href ='./index.html'><button class="continue-shopping" style="color:blue; background:black; text-decoration:none;">
                           continue shopping
                        </button></a>
                    </a>
                </td>
            </tr>
        `;
        return;
    }

    basketdata.map((item, index) => {
        basketdaitem.innerHTML += `
            <tr>
                <td>
                    <div class="item-info">
                        <img src="${item.image}" alt="${item.title}" class="item-image"/>
                        <span class="item-title">${item.title}</span>
                    </div>
                </td>
                <td>$${item.price}</td>
                <td>
                    <div class="quantity-controls"> 
                        <button class="quantity-btn" onclick="decrament(${item.id})">−</button>
                        <span>${item.count}</span>
                        <button class="quantity-btn" onclick="incrament(${item.id})">+</button> 
                    </div>
                </td>
                <td>$${item.price * item.count}.00</td>
                <td>
                    <button class="remove-btn" onclick="removeItem(${index})">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3m5 0H6"
                            ></path>
                        </svg>
                    </button>
                </td>
            </tr>
        `;
    });

    countTotalPrice();
}


function incrament(id) {
    basketdata.map((item) => {
        if (item.id === id) {
            item.count++;
        }
    });
    localStorage.setItem("basket", JSON.stringify(basketdata));
    showbasket();
}

function decrament(id) {
    basketdata.map((item) => {
        if (item.id === id && item.count > 0) {
            item.count--;
        }
    });
    localStorage.setItem("basket", JSON.stringify(basketdata));
    showbasket();
}

function removeItem(index) {
    basketdata.splice(index, 1);
    localStorage.setItem("basket", JSON.stringify(basketdata));
    showbasket();
    countTotalPrice();
}

function countTotalPrice() {
    const subtotal = basketdata.reduce((total, item) => total + item.price * item.count, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("tax").textContent = `$${tax.toFixed(2)}`;
    document.getElementById("total").textContent = `$${total.toFixed(2)}`;
}

showbasket();

