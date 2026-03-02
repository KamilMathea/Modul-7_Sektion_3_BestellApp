let basketNames = [];
let basketPrices = [];
let basketAmounts = [];

function init() {
    renderMenuContent();
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
    cartContent.innerHTML = "";
    let totalPrice = 0;

    for (let i = 0; i < basketNames.length; i++) {
        cartContent.innerHTML += getBasketItemTemplate(i);
        totalPrice += basketPrices[i] * basketAmounts[i];
    }

    document.getElementById("basket_footer").innerHTML = getBasketTotalTemplate(totalPrice);
}