
let fovData = JSON.parse(localStorage.getItem("favorites")) || [];
const fovDataItem = document.getElementById("fovorite-items"); // <tbody> element


function showFov() {
    fovDataItem.innerHTML = "";

    if (fovData.length === 0) {
        fovDataItem.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center; padding:40px;">
                    <p style="font-size:18px; color:#666;">Your favorite list is empty.</p>
                    <a href="index.html">
                        <button class="continue-shopping" style="color:blue; background:black; text-decoration:none;">
                           Continue Shopping
                        </button>
                    </a>
                </td>
            </tr>
        `;
        updateFavoriteBadge();
        updateTotalPrice(0);
        return;
    }

    fovData.forEach((item, index) => {
        fovDataItem.innerHTML += `
            <tr>
                <td>
                    <div class="item-info">
                        <img src="${item.image}" alt="${item.title}" class="item-image"/>
                        <span class="item-title">${item.title}</span>
                    </div>
                </td>
                <td>${item.currency || '$'}${item.price}</td>
                <td>${item.currency || '$'}${(item.price * (item.count || 1)).toFixed(2)}</td>
                <td>
                    <button class="remove-btn" onclick="removeItem(${index})">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#EA3323"><path d="M480-209q-50-42-108-92.5T264-407q-50-55-83-111.5T148-627q0-79.13 53.44-133.06Q254.87-814 333-814q35.28 0 67.14 12T458-769l-59 243h123l-43 315 131-415H488l53-169q19.18-9 40.39-14 21.2-5 43.61-5 78.13 0 131.56 53.94Q810-706.13 810-627q0 54-36 113.5T686-397q-52 57-108 105.5T480-209Zm-13-29 33-268H377l61-256q-24-14-50.92-23-26.93-9-54.08-9-69.77 0-117.39 48.11Q168-697.77 168-627q0 40 21 82t60 90q39 48 94 101t124 116Zm41-7q135-130 208.5-218T790-627q0-70.77-47.61-118.89Q694.77-794 625-794q-17 0-34 4.5t-33 9.5l-44 134h121L508-245Zm127-401ZM377-506Z"/></svg>
                    </button>
                </td>
            </tr>
        `;
    });

    countTotalPrice();
    updateFavoriteBadge();
}


function removeItem(index) {
    fovData.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(fovData)); 
    showFov();
}






function updateTotalPrice(total) {
    const totalElement = document.getElementById("total-price");
    if (totalElement) {
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
}

function updateFavoriteBadge() {
    const favBadge = document.querySelector('.badge');
    if (favBadge) {
        favBadge.textContent = fovData.length;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    showFov();
});
