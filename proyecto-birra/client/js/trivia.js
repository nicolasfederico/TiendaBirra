let container = document.querySelector('#trivia-container')
async function loadTrivia(){
    try{
        let response = await fetch(`/trivia`);
        if(response.ok){
            let trivias = await response.json();
            container.innerHTML = "";
            let i= Math.floor((Math.random() * (trivias.length)));
                container.innerHTML +=
                `<div class="card card-trivia " style="width: 20rem">
                    <div class="card-body"> 
                    <p class="card-text" style="text-align:center">${trivias[i].pregunta}</p>
                    <div class="d-flex justify-content-center"> 
                    <button class="btn boton-agregar" id="trivia-verdadero" >Verdadero</button>
                    <button class="btn boton-agregar" id="trivia-falso">Falso</button>
                    </div>
                    </div>
                </div>
                `
                let btnVerdadero = document.querySelector('#trivia-verdadero')
                let btnFalso = document.querySelector('#trivia-falso')
                let respuestaCorrecta = trivias[i].respuesta;
                let codigoDescuento = trivias[i].codigoDescuento.id_codigo_descuento

                btnVerdadero.addEventListener("click", function(e)  {
                    let respuesta = true;
                   darRespuesta(respuesta,respuestaCorrecta,codigoDescuento);
                })
                btnFalso.addEventListener("click", function(e){
                    let respuesta = false;
                    darRespuesta(respuesta,respuestaCorrecta,codigoDescuento);
                })
        }
        else{
            container.innerHTML="<h1>Error - Failed URL!</h1>";
        }
    }
    catch(err){
        container.innerHTML = "<h1>"+ err.message+"</h1>"
    }
}

loadTrivia()

function darRespuesta(respuesta,respuestaCorrecta,codigoDescuento){
    if(respuesta == respuestaCorrecta){
        alert(`Ganaste un descuento, el codigo es: ${codigoDescuento}` )
    }else{
        alert('Mala suerte, perdiste')
        window.location.href="http://localhost:3000/#"
    }
}
