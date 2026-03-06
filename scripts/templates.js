function getHeadlineTemplate(i) {
    return `
    <div class="category_header">
        <img src="${myDishes[i].categoryImg}" alt="${myDishes[i].category}">
        <h2>${myDishes[i].categoryHeadline}</h2>
    </div>
    `;
}

function getDishTemplate(i, j) {
    return `
    <div class="dishes_container">
        <div class="dish_img_left">
            <img src="${myDishes[i].dishes[j].img}" alt="${myDishes[i].dishes[j].name}">
        </div>
        <div class="dish_description">
            <h3>${myDishes[i].dishes[j].name}</h3>
            <p>${myDishes[i].dishes[j].description}</p>
        </div>
        <div class="price_and_button">
            <span><strong>${myDishes[i].dishes[j].price.toFixed(2)} €</strong></span>
            <button onclick="addToCart(${i}, ${j})">Add</button>
        </div>
    </div>
    `;
}

function getBasketItemTemplate(i) {
    let minusOrTrash = basketAmounts[i] === 1 ?
        '<img src="./assets/icons/deleteOrange.svg" alt="Delete-Button">' : '-';
    return `
        <div class="cart_item">
            <div class="cart_item_info">
                <span>${basketAmounts[i]} x ${basketNames[i]}</span>
                <img src="./assets/icons/deleteBlack.svg" class="delete_all_icon" 
                onclick="changeAmount(${i}, -${basketAmounts[i]})" alt="Delete-Button">
            </div>
            <div class="cart_item_actions">
            <div class="cart_item_change_amount">
                <button onclick="changeAmount(${i}, -1)">${minusOrTrash}</button>
                <button onclick="changeAmount(${i}, 1)">+</button>
            </div>
                <span>${(basketPrices[i] * basketAmounts[i]).toFixed(2)} €</span>
            </div>
        </div>
    `;
}

function getBasketTotalTemplate(totalPrice) {
    return `
    <hr>
        <div class="cart_total">
            <span>Total </span>
            <span><strong>${totalPrice.toFixed(2)} €</strong></span>
        </div>
        <button class="checkout_button" onclick="checkout()">Buy now (${totalPrice.toFixed(2)} €)</button>
    `;
}

function getMobileNavTemplate(cartIcon, totalItems) {
    let amountInCircle = "";
    if (totalItems > 0) {
        amountInCircle = `<span class="mobile_cart_badge">${totalItems}</span>`;
    }

    return `
        <div class="nav_item">
            <img src="./assets/icons/mobile_nav_home_white.svg" alt="Home Icon">
            <span>Home</span>
        </div>
        <div class="nav_item">
            <img src="./assets/icons/mobile_nav_person_white.svg" alt="Account Icon">
            <span>Profile</span>
        </div>
        <div class="nav_item">
            <img src="./assets/icons/mobile_nav_takeout_dining_white.svg" alt="Takeout Icon">
            <span>Takeout</span>
        </div>
        <div class="nav_item" onclick="toggleBasket()">
            <div class="icon_wrapper">
                <img src="${cartIcon}" alt="Cart Icon">
                ${amountInCircle}
            </div>
            <span>Cart</span>

        </div>
        `
}