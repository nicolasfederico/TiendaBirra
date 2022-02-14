let container = document.querySelector('#trivia-container')
async function loadTrivia(){
    try{
        let response = await fetch(`/trivia`);
        console.log(response);
        if(response.ok){
            let trivias = await response.json();
            console.log(trivias);
            container.innerHTML = "";
            let i= Math.floor((Math.random() * 5));
            console.log(i)
                container.innerHTML +=
                `<div>
                <p>${trivias[i].pregunta}</p>
                <button id="trivia-verdadero" >Verdadero</button>
                <button id="trivia-falso">Falso</button>
                </div>
                `
                let btnVerdadero = document.querySelector('#trivia-verdadero')
                let btnFalso = document.querySelector('#trivia-verdadero')
                let respuesta;
                btnVerdadero.addEventListener("click", function(e){
                    console.log(respuesta)
                    respuesta = true;
                    console.log(respuesta)
                })
                btnFalso.addEventListener("click", function(e){
                 respuesta = false;
                })
                console.log(respuesta)
                if(respuesta == trivias[i].respuesta){
                    console.log(`Ganaste un descuento, el codigo es: ${trivias[i].codigoDescuento.id_codigo_descuento}` )
                }else{
                    console.log('Mala suerte, perdiste')
                }
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

