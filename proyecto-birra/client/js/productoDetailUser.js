let params = [];
let container = document.querySelector('#container')
let usuarioEnCache = JSON.parse(window.localStorage.getItem("usuario"));
if (!usuarioEnCache) {
    alert ("Debe estar logueado para poder ver esta sección")
    window.location.href="http://localhost:3000/tienda.html"  
}
let idUsuario = usuarioEnCache.idUSUARIO;

//let agregarProducto = agregarProducto = document.querySelector("#agregarProducto")


function processParams(){
    let paramstr = window.location.search.substring(1);
    let paramarr = paramstr.split("&");
    for (let i = 0; i<paramarr.length; i++){
        let tmparr =paramarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params
}

load()
async function load(){
   // let container = document.querySelector("#use-ajax");
    try{
        let params = processParams();
        console.log(params);
        let response = await fetch(`/producto/${params["index"]}`);
        console.log(response);
        if(response.ok){
            let producto = await response.json();
            console.log(producto);

            
            let datos = "";
                datos =
                `<div class="card" style="width: 30rem;">
                    <img src="${producto.imagen}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">${producto.precio}</p>
                            <p class="card-text"><small class="text-muted">${producto.alcohol}</small></p>
                        </div>
                        <div style="margin: 2%;">
                        <label>Cantidad:<input type="number" id="input_cantidad"></label>
                        <p style="margin: 2%;">Stock: ${producto.stock}</p>
                        </div>
                        <button class="btn boton-agregar" id="agregarProducto" onClick="crearDetalleCarrito()">Agregar producto</button>   
                </div>`
                container.innerHTML = datos 

                
        }
        else{
            container.innerHTML="<h1>Error - Failed URL!</h1>";
        }
    }
    catch(err){
        container.innerHTML = "<h1>"+ err.message+"</h1>"
    }
}


// agregarProducto.addEventListener("click", function(e){
//     let idProducto = processParams()
//     crearDetalleCarrito(idProducto)
// })

function crearDetalleCarrito(){
    let cantidad = document.querySelector("#input_cantidad")
    let idProducto = processParams()
    console.log(processParams())
    let cantidadValue = cantidad.value
    
    let detalle = {
        "id_producto": idProducto["index"],
        "cantidad": cantidadValue
    }

    console.log (detalle)
    postDetalle(detalle,idUsuario)
}

// function crearInstancia(idProducto){
//     let cantidadValue = cantidad.value
//     let detalle = {
//         "id_producto": idProducto,
//         "cantidad": cantidadValue
//     }
//     postDetalle(detalle)
// }

async function postDetalle(detalle,idUsuario){

    let response = await fetch(`/detalle-carrito/${idUsuario}`,{
        "method": "POST",
        "mode": 'cors',
        "headers": {
            'Content-Type': 'application/json',
        },
        "body": JSON.stringify(detalle)
    });
    if (response.ok) {
        alert ('Producto agregado con exito')
        window.location.href="http://localhost:3000/tienda.html#"
    }
    let r = await response.json();
}