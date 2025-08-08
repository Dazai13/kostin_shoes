document.addEventListener('DOMContentLoaded', function(){
    const popupComment=document.querySelector('.popup__comment')
    const body = document.querySelector('.body')
    const popupBtnComment=document.querySelector('.comment__btn')
    const popupCloseComment=document.querySelector('.popup__comment-icon')
    popupBtnComment.addEventListener('click', ()=>{
        popupComment.classList.toggle('active')
        body.classList.toggle('no-scroll')
    })
    popupCloseComment.addEventListener('click', ()=>{
        popupComment.classList.remove('active')
        body.classList.remove('no-scroll')
    })
});