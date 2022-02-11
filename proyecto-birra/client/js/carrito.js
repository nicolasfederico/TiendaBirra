let datosCarrito = document.querySelector('#datosCarrito')
let detalles = [];
let params = [];
let usuarioEnCache = JSON.parse(window.localStorage.getItem("usuario"));

let totalCarrito = document.querySelector('#totalCarrito')
let error = document.querySelector('#error')

let btnCrearFactura = document.querySelector('#btn-crearFactura')


function processParams(){
    let paramstr = window.location.search.substr(1);
    let paramarr = paramstr.split("&");
    for (let i = 0; i<paramarr.length; i++){
        let tmparr =paramarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params
}

async function loadCarrito(){
    try {
        
        let total =0;
        let idCarrito = processParams()["index"];

        let response = await fetch (`/detalle-carrito/${idCarrito}`);
        
        if (response.ok) {
            cargarDatosTabla(response);
        }
        else {
            error.innerHTML = "<h1> Error - Failed URL!</h1>";
        }
    }
    catch (err) {
        error.innerHTML = "<h1>"+ err.message+ "error</h1>";
    };
}

async function cambiarCantidad(i,idProducto,idCarrito){
    let cantidad = document.querySelector(`#inputCantidad-${i}`)
    console.log (idCarrito)
    console.log (idProducto)
    let cantidadEnInput = cantidad.value;
    console.log (cantidadEnInput)
   
    try {
        let detalleCarrito={
            "id_producto": idProducto,
            "cantidad": cantidadEnInput,
        }
        let response = await fetch (`/detalle-carrito/${idCarrito}/${idProducto}`,{
              'method': 'PUT',
              'headers': {'Content-Type': 'application/json',
          },
          body: JSON.stringify(detalleCarrito)
      });
      if (response.ok) {
         loadCarrito();
      } else{
          alert("error");
      }
  } catch (error) {
      alert("error y capturado en el catch");
  }

    datosCarrito.innerHTML = "";

    try {
        let total =0;
        let params = processParams();
        let response = await fetch (`/detalle-carrito/${params["index"]}`);
        
        if (response.ok) {
            cargarDatosTabla(response)
        }
        else
        error.innerHTML = "<h1> Error - Failed URL!</h1>";
    }
    catch (err) {
        error.innerHTML = "<h1>"+ err.message+ "error</h1>";
    };

}

async function cargarDatosTabla (response){
    let total =0;
    let idCarrito = params["index"];
    let t = await response.json()
    detalles = t            
    datosCarrito.innerHTML = "";
    totalCarrito.innerHTML = "";
    for (let i=0; i<detalles.length; i++) {
        let nombre = detalles[i].producto.nombre;
        let idProducto = detalles[i].producto.id_producto;
        let cantidad = detalles[i].cantidad;
        let precio = detalles[i].producto.precio;
        let subtotal = (cantidad*precio)

        datosCarrito.innerHTML+=`
        <tr>
        <td>${nombre}</td>
        <td><input value="${cantidad}" id="inputCantidad-${i}" onChange="cambiarCantidad(${i},${idProducto},${idCarrito})"></input></td>
        <td>${precio}</td>
        <td id="subtotal">${precio*cantidad}</td>
        </tr>`

        totalCarrito.innerHTML = "";
        totalCarrito.innerHTML +=`
        El total es: ${total+=subtotal}`
    }            
}


loadCarrito ();

btnCrearFactura.addEventListener("click", crearFacturaConDetalles())

async function crearFacturaConDetalles (){
    try {
    
    let total =0;
    let idCarrito = processParams()["index"];

    let response = await fetch (`/detalle-carrito/${idCarrito}`);
    console.log(response)
    if (response.ok){
        let detalles = await response.json()
        for (let i=0; i<detalles.length; i++){
            let precio = detalles[i].producto.precio;
            let cantidad = detalles[i].cantidad;
            let subtotal = (cantidad*precio)
            total+=subtotal;
        }
        let factura = {
            "total": total,
            "usuario": usuarioEnCache.idUSUARIO
        }

        let responseFactura = await fetch("/factura",{
            "method": "POST",
            "mode": 'cors',
            "headers": {
                'Content-Type': 'application/json',
            },
            "body": JSON.stringify(factura)
        });
        console.log (factura);

    }
    else {
        error.innerHTML = "<h1> Error - Failed URL!</h1>";
    }
}
catch (err) {
    error.innerHTML = "<h1>"+ err.message+ "error</h1>";
};
}











async function crearFactura(){

}



/* btnRegistro.addEventListener ("click", async function(e){
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
} )
 */

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