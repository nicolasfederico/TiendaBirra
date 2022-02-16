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
                 let idCodigoDescuento = trivias[i].codigoDescuento.id_codigo_descuento;
                 let respuestaPregunta = trivias[i].respuesta;
                 let estado = trivias[i].codigoDescuento.activo;
                if (estado == true){ 
                    estado = "Activo"}
                    else {
                        estado = "Inactivo"
                }
                if (respuestaPregunta == true){
                     respuestaPregunta = "Verdadero"; 
                    }else {
                        respuestaPregunta = "Falso"
                    }
                 datos =
                 `<tr>
                     <td>${trivias[i].pregunta}</td>
                     <td>${respuestaPregunta}</td>
                     <td>${idCodigoDescuento}</td>
                     <td>${trivias[i].codigoDescuento.descuento} %</td>
                     <td id="activo-${i}">${estado} <button id="btnCambiarEstado-${i}" onClick="cambiarEstado(${trivias[i].codigoDescuento.activo},'${idCodigoDescuento}')">Cambiar estado</button></td>
                     
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



async function cambiarEstado(estado,idDescuento){
    estado = !estado;
    try {
        let codigoDescuento={
            "activo": estado
        }
        let response = await fetch (`/codigo-descuento/${idDescuento}`,{
              'method': 'PUT',
              'headers': {'Content-Type': 'application/json',
          },
          body: JSON.stringify(codigoDescuento)
      });
      if (response.ok) {
         window.location.reload();
      } else{
        alert("error");
      }
  } catch (error) {
      alert("error y capturado en el catch");
  }


}

load();