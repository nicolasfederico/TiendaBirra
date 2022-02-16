let codigoDescuento = document.querySelector('#input-CodigoDescuento')
let inputDescuento = document.querySelector('#input-descuento');
let preguntaTrivia = document.querySelector('#input-pregunta-trivia');
let respuestaTrivia = document.querySelector('#respuestaTrivia')
let btnGuardar = document.querySelector('#btn-guardar-descuentoTrivia')
let tablaDetalle = document.querySelector('#tablaDetalle')

btnGuardar.addEventListener ("click", async function(e){
    if (respuestaTrivia.value=="true"){
        respuestaTrivia = true;
    } else {
        respuestaTrivia = false;
    }
    let trivia={
        "pregunta": preguntaTrivia.value,
        "respuesta": respuestaTrivia,
        "id_codigo_descuento":codigoDescuento.value,
        "descuento": inputDescuento.value,
        "activo":true
    }
    crearTrivia(trivia)
    alert('Codigo cargado con exito')
    window.location.reload(); 
} )

async function crearTrivia(trivia){
    
    let response = await fetch('/trivia',{
        "method": "POST",
        "mode": 'cors',
        "headers": {
            'Content-Type': 'application/json',
        },
        "body": JSON.stringify(trivia)
    });
    let r = await response.json();
}

async function load(){
     try{
        
         let response = await fetch(`/trivia`);
         if(response.ok){
             let trivias = await response.json();
             let datos = "";
             for (let i=0; i<trivias.length; i++ ) {
                 datos =
                 `<tr>
                     <td>${trivias[i].pregunta}</td>
                     <td>${trivias[i].respuesta}</td>
                     <td>${trivias[i].codigoDescuento.id_codigo_descuento}</td>
                     <td>${trivias[i].codigoDescuento.descuento} %</td>
                     <td>${trivias[i].codigoDescuento.activo}</td>
                 </tr>`
                 tablaDetalle.innerHTML += datos
             }
         }
         else{
            tablaDetalle.innerHTML="<h1>Error - Failed URL!</h1>";
         }
     }
     catch(err){
        tablaDetalle.innerHTML = "<h1>"+ err.message+"</h1>"
     }
 }

load();