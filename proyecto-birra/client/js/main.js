let nav = document.querySelector('nav');
let iconoCarrito = document.querySelector('#iconoCarrito')
let crearCuponTrivia = document.querySelector('#crearCuponTrivia')
let cargarProducto = document.querySelector('#cargarProducto')
let iniciarSesion = document.querySelector('#link-iniciarSesion')


usuarioEnCache = JSON.parse(window.localStorage.getItem("usuario"));



window.addEventListener('scroll', function(){
    if (window.pageYOffset > 200){
        nav.classList.add('nav-scroll-color', 'shadow');
    }else {
        nav.classList.remove('nav-scroll-color', 'shadow')
    }
});

let btnTienda = document.querySelector('#btn-tienda');
if (btnTienda) {
    btnTienda.addEventListener ('click', function(e){
        window.location.href="http://localhost:3000/tienda.html#"
    })
}


let btnJuego = document.querySelector('#btn-juego');
if (btnJuego) {
    btnJuego.addEventListener ('click', function(e){
        window.location.href="http://localhost:3000/trivia.html#"
    })
}

let btnConseguila = document.querySelector('#btn-conseguila');
if (btnConseguila) {
    btnConseguila.addEventListener ('click', function(e){
        window.location.href="http://localhost:3000/tienda.html#"
    })
}

let linkIniciaSesion = document.querySelector('#link-iniciarSesion');
if (linkIniciaSesion) {
    linkIniciaSesion.addEventListener ('click', function(e){
        window.location.href="http://localhost:3000/login.html#"
    })
}

let linkCrearTrivia = document.querySelector('crearCuponTrivia')
if (linkCrearTrivia) {
    linkCrearTrivia.addEventListener ('click', function(e){
        window.location.href="http://localhost:3000/triviaCupon.html#"
    })
}


let nombreUsuario = document.querySelector('#nombre-usuario')

if (usuarioEnCache) {
    nombreUsuario.innerHTML =(`Hola, ${usuarioEnCache.nombre}!`)
}


let cerrarSesion = document.querySelector('#cerrar-sesion');

cerrarSesion.addEventListener("click", function (e) {
    window.localStorage.clear()
    window.location.href="http://localhost:3000"

})

iconoCarrito.addEventListener("click", async function (e){


    let response = await fetch (`/usuario/get/carrito/${usuarioEnCache.idUSUARIO}`)

    if (response.ok) {
        let t = await response.json();
        idCarrito = t
        window.location.href=`http://localhost:3000/carrito.html?index=${idCarrito}`
    } 

})

function validacionCategoriaUsuario(){
    if(usuarioEnCache){    
        cerrarSesion.classList.remove('ocultar-usuario')
        iniciarSesion.classList.add('ocultar-usuario')
        if(usuarioEnCache.admin == true){
            crearCuponTrivia.classList.remove('ocultar-usuario')
            cargarProducto.classList.remove('ocultar-usuario')
     }
     
    } else {
 //Espacio para opciones inversas
    }

}



function verificacionEdad (){
    if (!usuarioEnCache) {
        if (!window.sessionStorage .getItem("Edad")) {
            $(function() {
                $('#modalVerifacionEdad').modal('show');
        });
        let btnMayorEdad = document.querySelector ('#btn-mayorEdad')
        let btnMenorEdad = document.querySelector ('#btn-menorEdad')    
        btnMayorEdad.addEventListener ('click', esMayor)
        btnMenorEdad.addEventListener("click", esMenor)
        function esMayor() {
                window.sessionStorage.setItem("Edad",true)
            }
        function esMenor (){
                window.location.href = "http://google.com"
            }
        }
    }
}



verificacionEdad();
validacionCategoriaUsuario();
