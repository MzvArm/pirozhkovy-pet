

const searchInput = document.querySelector(".input")
const toggleSearch = document.querySelector(".products-from-search")
const productsFromSearch = document.querySelector(".products-from-search")
const productSearch = document.querySelectorAll(".product-name")
const searchArray = []


// Добавляем в пустой массив имя и id товаров

productSearch.forEach(item => {

    const productInfoSearch = {

        id: ("#" + item.getAttribute("id")),
        name: item.innerText
    }

    searchArray.push(productInfoSearch)
})

// Отслеживаем ввод через input

searchInput.addEventListener("input", () => {

    // Получаем значения input

    const input = searchInput.value.toLowerCase();
    productsFromSearch.innerHTML = ""

    // Создаём новый массив "отфильтрованных" товаров

    const filteredProducts = searchArray.filter(item => item.name.toLowerCase().includes(input))

    // Создаём "форму" и ссылку для каждого товара

    filteredProducts.forEach(product => {
        const li = document.createElement("li");
        const link = document.createElement("a");

        link.textContent = product.name
        link.href = product.id

        // Вкладываем теги друг в друга 

        li.appendChild(link)
        productsFromSearch.appendChild(li)
    })

    // Добавляем переключатель окна поиска

    if (input !== "" && filteredProducts.length > 0) {
        toggleSearch.classList.add("active-search")
    } else {
        toggleSearch.classList.remove("active-search")
    }

})

// Добавляем перенос в инпут и выключение окна поиска через клик вне инпута


document.addEventListener("click", (event) => {

    // Старая версия кода, оставил на всякий случай

    // if (!searchInput.contains(event.target) && !productsFromSearch.contains(event.target)) {
    //     toggleSearch.classList.remove("active-search")
    // }

    if (!searchInput.contains(event.target)) {

        // Если выбираем продукт - значение переносится в инпут
        if (productsFromSearch.contains(event.target)) {
            searchInput.value = event.target.innerText
        }

        toggleSearch.classList.remove("active-search")
    }

})

// Добавляем очистку хэша в URL при навигации

window.addEventListener("hashchange", () => {
    history.replaceState({}, "", location.pathname)
})

// Первоначальный вариант с таймером, оставил на всякий случай

// window.addEventListener("hashchange", () => {
//     setTimeout(() =>  {
//     history.replaceState({}, "", location.pathname)}, 2000)
// })

