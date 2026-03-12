let basketNames = [];
let basketPrices = [];
let basketAmounts = [];

function init() {
    renderMenuContent();
    renderCartContent();
    renderMobileNav();
}

function renderMenuContent() {
    let content = document.getElementById("menu_content");
    content.innerHTML = "";
    for (let i = 0; i < myDishes.length; i++) {
        content.innerHTML += getHeadlineTemplate(i);
        for (let j = 0; j < myDishes[i].dishes.length; j++) {
            content.innerHTML += getDishTemplate(i, j);
        }
    }
}

function addToCart(i, j) {
    let dishName = myDishes[i].dishes[j].name;
    let dishPrice = myDishes[i].dishes[j].price;
    for (let k = 0; k < basketNames.length; k++) {
        if (basketNames[k] === dishName) {
            basketAmounts[k]++;
            updateOnlyBasketValues(k);
            return;
        }
    }
    basketNames.push(dishName);
    basketPrices.push(dishPrice);
    basketAmounts.push(1);
    renderCartContent();
}

function renderCartContent() {
    let cartContent = document.getElementById("basket_items");
    let cartFooter = document.getElementById("basket_footer");
    if (basketNames.length === 0) {
        cartContent.innerHTML = "<p>Your basket is empty</p>";
        cartFooter.innerHTML = "";
    } else {
        cartContent.innerHTML = "";
        for (let i = 0; i < basketNames.length; i++) {
            let symbol = getMinusOrTrash(i);
            cartContent.innerHTML += getBasketItemTemplate(i, symbol);
        }
        cartFooter.innerHTML = getBasketTotalTemplate(calculateTotalPrice());
    }
    renderMobileNav();
}

function calculateTotalPrice() {
    let totalPrice = 0;
    for (let i = 0; i < basketPrices.length; i++) {
        totalPrice += basketPrices[i] * basketAmounts[i];
    }
    return totalPrice;
}

function getMinusOrTrash(i) {
    if (basketAmounts[i] === 1) {
        return '<img src="./assets/icons/deleteOrange.svg" alt="Delete-Button">';
    } else {
        return '-';
    }
}

function renderMobileNav() {
    let mobileNav = document.getElementById("mobile_nav");
    let totalItems = 0;
    for (let i = 0; i < basketAmounts.length; i++) {
        totalItems += basketAmounts[i];
    }
    let cartIcon = totalItems > 0 
        ? `./assets/icons/mobile_nav_shopping_cart_orange.svg` 
        : `./assets/icons/mobile_nav_shopping_cart_white.svg`;
    
    let amountInCircle = "";
    if (totalItems > 0) {
        amountInCircle = `<span id="mobile-badge" class="mobile_cart_badge">${totalItems}</span>`;
    }
    mobileNav.innerHTML = getMobileNavTemplate(cartIcon, amountInCircle);
}

function updateNavBadgeOnly() {
    let totalItems = 0;
    for (let i = 0; i < basketAmounts.length; i++) {
        totalItems += basketAmounts[i];
    }
    let badgeElement = document.getElementById('mobile-badge');
    let iconElement = document.getElementById('mobile-cart-icon-img');

    if (badgeElement) {
        badgeElement.innerText = totalItems;
    } else if (totalItems > 0) {
        renderMobileNav();
    }

    if (iconElement) {
        iconElement.src = totalItems > 0 
            ? `./assets/icons/mobile_nav_shopping_cart_orange.svg` 
            : `./assets/icons/mobile_nav_shopping_cart_white.svg`;
    }
}

function updateOnlyBasketValues(i) {
    document.getElementById(`basket-item-amount-${i}`).innerText = `${basketAmounts[i]} x ${basketNames[i]}`;
    let linePrice = (basketPrices[i] * basketAmounts[i]).toFixed(2);
    document.getElementById(`basket-item-price-${i}`).innerText = `${linePrice} €`;
    document.getElementById(`minus-button-${i}`).innerHTML = getMinusOrTrash(i);
    let total = calculateTotalPrice().toFixed(2);
    document.getElementById('final-total-price').innerText = `${total} €`;
    document.getElementById('buy-button-text').innerText = `Buy now (${total} €)`;
    updateNavBadgeOnly();
}

function changeAmount(i, change) {
    basketAmounts[i] += change;
    if (basketAmounts[i] <= 0) {
        basketAmounts.splice(i, 1);
        basketNames.splice(i, 1);
        basketPrices.splice(i, 1);
        renderCartContent();
    } else {
        updateOnlyBasketValues(i);
    }
}

function toggleBasket() {
    let basket = document.getElementById("basket_wrapper");
    basket.classList.toggle('show_basket');
}

function checkout() {
    basketNames = [];
    basketPrices = [];
    basketAmounts = [];
    renderCartContent();
    toggleBasket();
    let successMessage = document.getElementById('order_success');
    successMessage.classList.remove('d-none');
    setTimeout(function () {
        successMessage.classList.add('d-none');
    }, 3000);
}

function closeSuccessMessage() {
    document.getElementById('order_success').classList.add('d-none');
}