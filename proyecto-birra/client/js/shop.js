let productos = [];

async function load() {
    let container = document.querySelector("#app");
    container.innerHTML = "<h1> Loading...</h1>";
    let idProducto;
    try {
        let response = await fetch ("/producto");
        if (response.ok) {
            let t = await response.json();
            //let v = JSON.stringify(t);
            productos = t;
            container.innerHTML = "";
            let usuarioEnCache = JSON.parse(window.localStorage.getItem("usuario"));
            for (let i=0; i<productos.length; i++){
              idProducto = productos[i].id_producto;
               container.innerHTML+= `
               <div class="col">
                    <div class="card h-100">
                             <img src="${productos[i].imagen}" class="card-img-top  imagen-tienda" alt="..."> 
                        <div class="card-body">
                            <h5 class="card-title"> ${productos[i].nombre}</h5>
                            <p class="card-text"> ${productos[i].marca}</p>
                            <p class="card-precio"> $${productos[i].precio}</p>
                            <p class="card-text"> Alcohol: ${productos[i].alcohol}% -
                            IBU: ${productos[i].ibu} -
                            EBC: ${productos[i].color}</p>
                        </div>
                        <button class="btn boton-agregar" id="btn-agregar"><a href="/productoDetailUser.html?index=${idProducto}" class="link-btn--tienda" style="text-decoration: none; color:white;">Agregar al carrito</a></button>
                        <button class="btn boton-agregar ocultar-usuario" id="btn-modificar"><a href="/productoDetail.html?index=${idProducto}" style="text-decoration: none; color:white;" class="link-btn--tienda">Modificar el producto</a></button>
                    </div>
                </div>`

                if(usuarioEnCache){
                    let btnModificarTienda = document.querySelectorAll('#btn-modificar')
                    console.log(btnModificarTienda)
                    if(usuarioEnCache.admin == true){
                        for(let i = 0; i < btnModificarTienda.length; i++){
                            btnModificarTienda[i].classList.remove('ocultar-usuario')
                        }
                 }
                }
             
            }
            
        }
        else
            container.innerHTML = "<h1> Error - Failed URL!</h1>";
    }
    catch (err) {
        container.innerHTML = "<h1>"+ err.message+ "error</h1>";
    };
}

load ();