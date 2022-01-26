let nav = document.querySelector('nav');
usuarioEnCache = JSON.parse(window.localStorage.getItem("usuario"));



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


let nombreUsuario = document.querySelector('#nombre-usuario')

if (usuarioEnCache) {
    nombreUsuario.innerHTML =(`${usuarioEnCache.nombre}`)
}


let cerrarSesion = document.querySelector('#cerrar-sesion');

cerrarSesion.addEventListener("click", function (e) {
    window.localStorage.clear()
    window.location.href="http://localhost:3000"

})