const popupBtn = document.querySelectorAll('.request-popup')
const popupContent = document.querySelector('.popup__form')
const popupClose = document.querySelector('.form__popup-icon')
const body = document.querySelector('.body')
popupBtn.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        popupContent.classList.toggle('active')
        body.classList.toggle('no-scroll')
    })
})
popupClose.addEventListener('click', ()=>{
    popupContent.classList.remove('active')
    body.classList.remove('no-scroll')
})