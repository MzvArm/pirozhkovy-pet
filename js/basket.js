// Обёртка в корзине, куда будут добавляться товары

const orderWrapper = document.querySelector(".order-wrapper");


// Отслеживаем клик на странице

window.addEventListener("click", function (event) {

    // Проверяем, что клик был совершён по кнопке "В корзину"
    if (event.target.hasAttribute("data-in-basket")) {

        // Находим карточку с товаром, внутри которой был совершён клик
        const productItem = event.target.closest(".product-item")

        // Собираем данные товара и записываем в объект

        const productInfo = {
            id: productItem.dataset.id,
            imgSrc: productItem.querySelector(".product-img").getAttribute("src"),
            title: productItem.querySelector(".product-name").innerText,
            weight: productItem.querySelector(".product-weight").innerText,
            calories: productItem.querySelector(".product-calories").innerText,
            counter: productItem.querySelector("[data-counter]").innerText,
            price: productItem.querySelector(".product-price").innerText,
        }

        // Проверяем есть ли уже такой товар в корзине



        const itemInBasket = orderWrapper.querySelector(`[data-id="${productInfo.id}"]`)

        // Если товар в корзине - складываем значения счётчиков

        if (itemInBasket) {
            const counterInBasket = itemInBasket.querySelector("[data-counter]");
            counterInBasket.textContent = parseInt(counterInBasket.textContent) + parseInt(productInfo.counter);

            // Если счётчик == 0 - не добавляем в корзину

        }

        // Отключено условие, т.к. убрал возможность поставить 0 в этом счётчике

        // else if (productInfo.counter === 0){

        // }
        else {

            // В остальных случаях данные товара подставляем в шаблон для отображения в корзине


            const orderItemHTML = `<div class="order-item" data-id="${productInfo.id}">
            <div class="order-item-description">
            <div>
              <img class="small-item-img" src=${productInfo.imgSrc} width="40" alt="">
            </div>
            <div class="order-item-title">${productInfo.title}</div>
            <div class="order-item-info">${productInfo.weight} / ${productInfo.calories}</div>
            </div>
            <div class="counter-and-price">
            <div class="counter order-counter">
              <div class="counter-control" data-action="minus">-</div>
              <div class="counter-current" data-counter>${productInfo.counter}</div>
              <div class="counter-control" data-action="plus">+</div>
            </div>
            <div class="order-item-price">${productInfo.price}</div>
            </div>
          </div>
          `

            orderWrapper.insertAdjacentHTML("beforeend", orderItemHTML)
        }

        // Сбрасываем счётчик товара на "1"

        productItem.querySelector("[data-counter]").innerText = "1"

        // Проверка и переключение статуса корзины

        toggleEmptyBasket()

        // Пересчёт итоговой суммы

        calcTotalSum()

    }
})





// Добавляем переключатель надписи "Корзина пуста"

function toggleEmptyBasket() {

    const orderWrapper = document.querySelector(".order-wrapper");
    const emptyBasket = document.querySelector(".basket-empty")

    if (orderWrapper.children.length > 1) {
        emptyBasket.classList.add("none")

    } else {
        emptyBasket.classList.remove("none")

    }
}
