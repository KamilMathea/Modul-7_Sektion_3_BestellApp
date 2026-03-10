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
            renderCartContent();
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
    }
    else {
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
    } 
    else {
        return '-';
    }
}

function changeAmount(i, change) {
    basketAmounts[i] += change;

    if (basketAmounts[i] <= 0) {
        basketAmounts.splice(i, 1);
        basketNames.splice(i, 1);
        basketPrices.splice(i, 1);
    }

    renderCartContent();
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

function renderMobileNav() {
    let mobileNav = document.getElementById("mobile_nav");
    let totalItems = 0;

    for (let i = 0; i < basketAmounts.length; i++) {
        totalItems += basketAmounts[i];
    }

    let cartIcon = totalItems > 0 
    ? `./assets/icons/mobile_nav_shopping_cart_orange.svg` 
    : `./assets/icons/mobile_nav_shopping_cart_white.svg`;

    mobileNav.innerHTML = getMobileNavTemplate(cartIcon, totalItems);
}

function toggleBasket() {
    let basket = document.getElementById("basket_wrapper");
    basket.classList.toggle('show_basket');
}