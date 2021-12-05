let nav = document.querySelector('nav');

window.addEventListener('scroll', function(){
    if (window.pageYOffset > 200){
        nav.classList.add('nav-scroll-color', 'shadow');
    }else {
        nav.classList.remove('nav-scroll-color', 'shadow')
    }
});

let btnTienda = document.querySelector('#btn-tienda');

btnTienda.addEventListener ('click', function(e){
    window.location.href="http://localhost:3000/tienda.html#"
})