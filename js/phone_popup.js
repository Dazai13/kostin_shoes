const phoneButton = document.querySelector('.phone__call')
const phonePopup = document.querySelector('.phone__call-popup')
const phoneClose = document.querySelector('.phone__close-icon')
phoneButton.addEventListener('click', ()=>{
    phonePopup.classList.toggle('active');
})
phoneClose.addEventListener('click', ()=>{
    phonePopup.classList.remove('active')
})