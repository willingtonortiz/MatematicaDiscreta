window.onload = function () {
    openModal();
}

var openModal = function () {
    var links = document.getElementsByClassName('item-link');
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', e => {
            document.getElementsByClassName(e.target.textContent)[0].classList.add('change');
            var icon_close = document.getElementsByClassName('icon-close')
            for (var j = 0; j < icon_close.length; j++) {
                icon_close[j].addEventListener('click',f=>{
                    f.target.parentElement.classList.remove('change');                    
                })
            }

        })
    }
}
