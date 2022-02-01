let nombreRegistro = document.querySelector("#nombreRegistro");
let apellidoRegistro = document.querySelector("#apellidoRegistro");
let dniRegistro = document.querySelector("#dniRegistro");
let direccionRegistro = document.querySelector("#direccionRegistro");
let mailRegistro = document.querySelector("#mailRegistro");
let telRegistro= document.querySelector("#telRegistro");
let passwordRegistro= document.querySelector("#passwordRegistro");

let btnRegistro = document.querySelector("#btn-registro");



btnRegistro.addEventListener ("click", function(e){
    let user={
        "nombre":nombreRegistro.value,
        "apellido": apellidoRegistro.value,
        "dni":dniRegistro.value,
        "direccion": direccionRegistro.value,
        "mail": mailRegistro.value,
        "admin": false,
        "telefono": telRegistro.value,
        "password": passwordRegistro.value
    };
    crear (user)
    let idUsuario = getUsuarioId(mailRegistro.value);
    let userCarrito = {
        "idUSUARIO": idUsuario
    }
    crearCarrito(userCarrito)
} )

async function crear(user){
    
    let response = await fetch("/usuario",{
        "method": "POST",
        "mode": 'cors',
        "headers": {
            'Content-Type': 'application/json',
        },
        "body": JSON.stringify(user)
    });
    let r = await response.json();
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

async function getUsuarioId(mail){
    try {
        let response = await fetch (`/usuario/get/${mail}`);
        if (response.ok) {
            let t = await response
            return t;
        }  
    } 
    catch (err) {
        container.innerHTML = "<h1>"+ err.message+ "error</h1>";
    }
}