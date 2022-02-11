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



btnCrearFactura.addEventListener("click", async function(e){

try {
    console.log("factura creada")
    let idUsuario = usuarioEnCache.idUSUARIO
    let response = await fetch(`/factura/${idUsuario}`,{
        "method": "POST",
        "mode": 'cors',
        "headers": {
            'Content-Type': 'application/json',
        },
    })


    await fetch(`/detalle-carrito/${idUsuario}`,{
        "method": "DELETE",
        "mode": 'cors',
        "headers": {
            'Content-Type': 'application/json',
        },
    })

    alert ("Compra realizada con éxito")

    window.location.href="http://localhost:3000/"    


} catch (error) {
    alert ("No se pudo realizar la compra")
}


})