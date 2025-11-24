const productForCalc = document.querySelectorAll(".product-item")
const calcItems = document.querySelector(".calc-items")

// Перебираем все товары и достаём из них данные

productForCalc.forEach(function (item) {
    const productInfo = {
        imgSrc: item.querySelector(".product-img").getAttribute("src"),
        title: item.querySelector(".product-name").innerText,
        weight: item.querySelector(".product-weight").innerText,
        calories: item.querySelector(".product-calories").innerText,
        counter: item.querySelector("[data-counter]").innerText,
        price: item.querySelector(".product-price").innerText,
    }

    // Подставляем данные из каждого товара в шаблон

    const calcItemHTML = `<div class="calc-item">
            <div class="calc-item-description">
            <div class="calc-item-img">
              <img src=${productInfo.imgSrc} width="40" alt="" class="small-item-img">
            </div>
            <div class="calc-item-title">${productInfo.title}</div>
            <div class="calc-item-info">

            <div class="calc-item-weight">${productInfo.weight} </div>
             / 
            <div class="calc-item-calories">${productInfo.calories}</div>
            </div>
            </div>
            <div class="counter-and-price">
            <div class="counter calc-counter">
              <div class="counter-control" data-action="minus">-</div>
              <div class="counter-current" data-counter>0</div>
              <div class="counter-control" data-action="plus">+</div>
            </div>
            <div class="calc-item-price">${productInfo.price}</div>
            </div>
          </div>
          `

    //   Добавляем каждый товар в калькулятор

    calcItems.insertAdjacentHTML("beforeend", calcItemHTML)

})

function calcTotal() {
    const weightItems = calcItems.querySelectorAll(".calc-item-weight")
    const totalWeight = document.querySelector(".total-weight")
    const totalCalories = document.querySelector(".total-calories")

    let totalW = 0
    let totalC = 0

    // Обходим все элементы со значением веса в калькуляторе

    weightItems.forEach(function (item) {

        // Находим количество товара

        const amount = item.closest(".calc-item").querySelector("[data-counter]")

        // Находим значение калорий в товаре

        const calcInfo = item.closest(".calc-item-info")
        const calorieItems = calcInfo.querySelector(".calc-item-calories")

        // Добавляем вес и калории товара в общие значения

        totalW += parseInt(item.textContent) * parseInt(amount.textContent)
        totalC += parseInt(calorieItems.textContent) * parseInt(amount.textContent)

    })

    // Отобразим общие значения

    totalWeight.textContent = totalW
    totalCalories.textContent = totalC
}

