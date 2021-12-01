
let productos = [];

async function load() {
    let container = document.querySelector("#app");
    container.innerHTML = "<h1> Loading...</h1>";
    try {
        let response = await fetch ("js/productos.json");
        if (response.ok) {
            let t = await response.json();
            //let v = JSON.stringify(t);
            productos = t.productos;
            container.innerHTML = "";
            for (let i=0; i<productos.length; i++){
               container.innerHTML+= `<div class="col">
                <div class="card h-100">
                  <img src="../img/02.jpg" class="card-img-top  imagen-tienda" alt="...">
                  <div class="card-body">
                    <h5 class="card-title"> "Nombre:"${productos[i].producto}</h5>
                    <p class="card-text">${productos[i].precio}</p>
                    <p class="card-text">${productos[i].cantidad}</p>
                    <p class="card-text">${productos[i].graduacionalc}</p>
                    <p class="card-text">${productos[i].ibu}</p>
                    <p class="card-text">${productos[i].color}</p>
                    <p class="card-text">${productos[i].maltas}</p>
                    <p class="card-text">${productos[i].lupulos}</p>
                    </div>
                    </div>
                  </div>`
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