const el = document.querySelector("#wrapper") // находим и инициализируем "обертку"

let isResizing = false;

el.addEventListener("mousedown", mousedown) // добавляем обработчик событий и передаем функцию

function mousedown(e) { // создаем функцию отвечающую за движение мышью

  window.addEventListener("mousemove", mousemove)// обработчик + вызов функции
  // "вешаем" window чтобы не слетал курсор при резком перемещении

  window.addEventListener("mouseup", mouseup) // обработчик + вызов функции
  // то же самое

  let prevX = e.clientX // передаем в переменную координату по X, на которой произошло событие
  let prevY = e.clientY // передаем в переменную координату по Y, на которой произошло событие

  function mousemove(e) {
    if (!isResizing) {
      let newX = prevX - e.clientX // инициализируем новую позицию по X
      let newY = prevY - e.clientY // инициализируем новую позицию по Y

      const rect = el.getBoundingClientRect() // возвращает размер элемента и его позицию относительно viewport

      el.style.left = rect.left - newX + "px" // перемещение влево-вправо 
      el.style.top = rect.top - newY + "px" // перемещение вверх-вниз

      prevX = e.clientX;
      prevY = e.clientY;
    }
  }

  function mouseup() {
    window.removeEventListener("mousemove", mousemove)
    // убираем обработчик, чтобы отпустить элемент после того, как нет нажатия по мыши
    window.removeEventListener("mouseup", mouseup)
    // то же самое
  }
}

const resizers = document.querySelectorAll(".resize") // изменение размера
let currentResizer

for (let resizer of resizers) {
  resizer.addEventListener("mousedown", mousedown)

  function mousedown(e) {
    currentResizer = e.target
    isResizing = true

    let prevX = e.clientX
    let prevY = e.clientY

    window.addEventListener("mousemove", mousemove)
    window.addEventListener("mouseup", mouseup)

    function mousemove(e) {
      const rect = el.getBoundingClientRect()

      if (currentResizer.classList.contains("se")) { 
        el.style.width = rect.width - (prevX - e.clientX) + "px"
        el.style.height = rect.height - (prevY - e.clientY) + "px"
      } else if (currentResizer.classList.contains("sw")) {
        el.style.width = rect.width + (prevX - e.clientX) + "px"
        el.style.height = rect.height - (prevY - e.clientY) + "px"
        el.style.left = rect.left - (prevX - e.clientX) + "px"
      } else if (currentResizer.classList.contains("ne")) {
        el.style.width = rect.width - (prevX - e.clientX) + "px"
        el.style.height = rect.height + (prevY - e.clientY) + "px"
        el.style.top = rect.top - (prevY - e.clientY) + "px"
      } else {
        el.style.width = rect.width + (prevX - e.clientX) + "px"
        el.style.height = rect.height + (prevY - e.clientY) + "px"
        el.style.top = rect.top - (prevY - e.clientY) + "px"
        el.style.left = rect.left - (prevX - e.clientX) + "px"
      }

      prevX = e.clientX
      prevY = e.clientY
    }

    function mouseup() {
      window.removeEventListener("mousemove", mousemove)
      window.removeEventListener("mouseup", mouseup)
      isResizing = false
    }
  }
}