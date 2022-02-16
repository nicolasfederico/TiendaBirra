let codigoDescuento = document.querySelector('#input-CodigoDescuento')
let inputDescuento = document.querySelector('#input-descuento');
let preguntaTrivia = document.querySelector('#input-pregunta-trivia');
let respuestaTrivia = document.querySelector('#respuestaTrivia')
let btnGuardar = document.querySelector('#btn-guardar-descuentoTrivia')

btnGuardar.addEventListener ("click", async function(e){
    let trivia={
        "pregunta": preguntaTrivia.value,
        "respuesta": respuestaTrivia.value,
        "id_codigo_descuento":codigoDescuento.value,
        "descuento": inputDescuento.value,
        "activo":true
    }
    crearTrivia(trivia)
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


