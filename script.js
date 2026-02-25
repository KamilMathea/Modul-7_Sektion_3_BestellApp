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