

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

async function existeCarrito(idUsuario){
    try{
        let response = await fetch(`user/carrito/${idUsuario}`);
        if(response.ok){
            return  response;
        }else{
            console.log('no funciona')
        }
    }
    catch(err){
        console.log('no funciona catch')
    }
}

async function crearCarrito(userCarrito){
    let response = await fetch("/carrito",{
        "method": "POST",
        "mode": 'cors',
        "headers": {
            'Content-Type': 'application/json',
        },
        "body": JSON.stringify(userCarrito)
    });
    let r = await response.json();
}


if (usuarioEnCache) {
    nombreUsuario.innerHTML =(`${usuarioEnCache.nombre}`)
    if(!existeCarrito(usuarioEnCache.idUSUARIO)){
        let carrito = {
            'idUSUARIO' : usuarioEnCache.idUSUARIO
        }
        crearCarrito(carrito)
    
    }
}




let cerrarSesion = document.querySelector('#cerrar-sesion');

cerrarSesion.addEventListener("click", function (e) {
    window.localStorage.clear()
    window.location.href="http://localhost:3000"

})