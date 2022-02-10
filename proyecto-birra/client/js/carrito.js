let datosCarrito = document.querySelector('#datosCarrito')
let detalles = [];
let params = [];

let totalCarrito = document.querySelector('#totalCarrito')
let error = document.querySelector('#error')



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
            console.log(response.ok)
            let t = await response.json()
            detalles = t            
            datosCarrito.innerHTML = "";
            totalCarrito.innerHTML = "";
            for (let i=0; i<=detalles.length; i++) {
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
        else {
            container.innerHTML = "<h1> Error - Failed URL!</h1>";
        }
    }
    catch (err) {
        container.innerHTML = "<h1>"+ err.message+ "error</h1>";
    };
}



loadCarrito ();

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
        let idCarrito = params["index"];
        if (response.ok) {
            let t = await response.json()
            detalles = t
            /* console.log("alcohol:"+ t[0].producto.alcohol ) */
            
            datosCarrito.innerHTML = "";
            totalCarrito.innerHTML = "";
            //producto cantidad precio
            

            for (let i=0; i<=detalles.length; i++) {
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
        else
        container.innerHTML = "<h1> Error - Failed URL!</h1>";
    }
    catch (err) {
        container.innerHTML = "<h1>"+ err.message+ "error</h1>";
    };

    

    

}

