let nombreProducto = document.querySelector ("#nombreProducto");
let marcaProducto = document.querySelector("#marcaProducto");
let precioProducto = document.querySelector("#precioProducto");
let alcoholProducto = document.querySelector("#alcoholProducto");
let ibuProducto = document.querySelector ("#ibuProducto");
let colorProducto =document.querySelector ("#colorProducto");
let stockProducto =document.querySelector("#stockProducto");
let imagenProducto = document.querySelector("#imagenProducto");

let btnCargarProducto = document.querySelector("#btn-cargarProducto");

btnCargarProducto.addEventListener ("click", ()=> {
    let producto={
        "nombre": nombreProducto.value,
        "marca": marcaProducto.value,
        "precio": precioProducto.value,
        "alcohol": alcoholProducto.value,
        "ibu": ibuProducto.value,
        "color": colorProducto.value,
        "stock": stockProducto.value,
        "imagen": `../img/tienda/${imagenProducto.value}`
    };
    crear (producto)
} )

async function crear(producto){
        
    let response = await fetch("/producto",{
        "method": "POST",
        "mode": 'cors',
        "headers": {
            'Content-Type': 'application/json',
        },
        "body": JSON.stringify(producto)
    });
    let r = await response.json();
}