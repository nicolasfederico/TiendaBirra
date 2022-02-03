let params = [];
let container = document.getElementById('use-ajax')
let nodoTablaDetail = document.getElementById('tablaDetalle')

let btnBorrarProducto = document.querySelector("#btnBorrarProducto")
btnBorrarProducto.addEventListener("click", borrarProducto)

let btnPutProducto = document.querySelector("#btnModificarProducto")
btnPutProducto.addEventListener("click",modificarPost)


let nombreProducto = document.querySelector("#nombreProducto");
let marcaProducto = document.querySelector("#marcaProducto");
let precioProducto = document.querySelector("#precioProducto");
let alcoholProducto = document.querySelector("#alcoholProducto");
let ibuProducto = document.querySelector("#ibuProducto");
let colorProducto = document.querySelector("#colorProducto");
let stockProducto= document.querySelector("#stockProducto");


function processParams(){
    let paramstr = window.location.search.substr(1);
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
                `<tr>
                    <td>${producto.id_producto}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.marca}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.alcohol}</td>
                    <td>${producto.ibu}</td>
                    <td>${producto.color}</td>
                    <td>${producto.stock}</td>
                </tr>`
                nodoTablaDetail.innerHTML = datos
            
        }
        else{
            container.innerHTML="<h1>Error - Failed URL!</h1>";
        }
    }
    catch(err){
        container.innerHTML = "<h1>"+ err.message+"</h1>"
    }
}


async function borrarProducto(){
    try{
        let params = processParams();
        let response = await fetch(`/producto/${params["index"]}`,{
            "method":'DELETE',
            "headers": {
                "Content-Type": "application/json"
            }
        });
        if(response.ok){  
            window.location.href="http://localhost:3000/tienda.html#"
        }else{
            alert( "error  en lectura del servidor");
        }
        
    }catch(error){
        alert("error  en conexion con servidor");
  
    }

}

async function modificarPost(){
    try {
        let producto={
            "nombre": nombreProducto.value,
            "marca": marcaProducto.value,
            "precio": precioProducto.value,
            "alcohol": alcoholProducto.value,
            "ibu": ibuProducto.value,
            "color": colorProducto.value,
            "stock": stockProducto.value,
      }
      let response = await fetch (`/producto/${params["index"]}`,{
              'method': 'PUT',
              'headers': {'Content-Type': 'application/json',
          },
          body: JSON.stringify(producto)
      });
      if (response.ok) {
          load();
         // actualizarPost();
      } else{
          alert("error");
      }
  } catch (error) {
      alert("error y capturado en el catch");
  }
}




