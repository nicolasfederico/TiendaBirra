let datosCarrito = document.querySelector('#datosCarrito')
let detalles = [];
let params = [];

let totalCarrito = document.querySelector('#totalCarrito')



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
        let params = processParams();
        let response = await fetch (`/detalle-carrito/${params["index"]}`);
        if (response.ok) {
            let t = await response.json()
            detalles = t
            /* console.log("alcohol:"+ t[0].producto.alcohol ) */
            
            datosCarrito.innerHTML = "";
            totalCarrito.innerHTML = "";
            //producto cantidad precio

            for (let i=0; i<=detalles.length; i++) {
                let nombre = detalles[i].producto.nombre;
                let cantidad = detalles[i].cantidad;
                let precio = detalles[i].producto.precio;
                let subtotal = (cantidad*precio)

                datosCarrito.innerHTML+=`
                <tr>
                <td>${nombre}</td>
                <td><input value="${cantidad}" id="inputCantidad" onChange="putSubtotal(${inputCantidad.value},${precio})"></input></td>
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



function putCantidad (cantidad,precio) {
    let inputCantidad=document.querySelector("#inputCantidad");
    subtotal = (cantidad*precio);
    return subtotal;    
}

loadCarrito ();

