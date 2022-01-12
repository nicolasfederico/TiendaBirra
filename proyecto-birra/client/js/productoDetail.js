let params = [];
let postComment = []
let container = document.getElementById('use-ajax')
let nodoTablaDetail = document.getElementById('tablaDetalle')


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