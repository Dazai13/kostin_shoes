document.addEventListener('DOMContentLoaded', function(){
    const popupComment=document.querySelector('.popup__comment')
    const popupBtnComment=document.querySelector('.comment__btn')
    const popupCloseComment=document.querySelector('.popup__comment-icon')
    popupBtnComment.addEventListener('click', ()=>{
        popupComment.classList.toggle('active')
    })
    popupCloseComment.addEventListener('click', ()=>{
        popupComment.classList.remove('active')
    })
});