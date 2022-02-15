let codigoDescuento = document.querySelector('#input-CodigoDescuento')
let inputDescuento = document.querySelector('#input-descuento');
let preguntaTrivia = document.querySelector('#input-pregunta-trivia');
let respuestaTrivia = document.querySelector('#respuestaTrivia')
// let respuestaTriviaFalse = document.querySelector('#input-frespuesta-trivia');
// let respuestaTriviaTrue = document.querySelector('#input-vrespuesta-trivia');
let btnGuardar = document.querySelector('#btn-guardar-descuentoTrivia')

btnGuardar.addEventListener ("click", async function(e){
    let descuento={
        "id_codigo_descuento":codigoDescuento.value,
        "descuento": inputDescuento.value,
        "activo":true
    }
    console.log(respuestaTrivia.value)
    let trivia= {
        "pregunta": preguntaTrivia.value,
        "respuesta": respuestaTrivia.value,
        "id_codigo_descuento": codigoDescuento.value
    }
    
    crearDescuento (descuento)
    crearTrivia(trivia)
} )


async function crearDescuento(descuento){
    
    let response = await fetch('/codigo-descuento',{
        "method": "POST",
        "mode": 'cors',
        "headers": {
            'Content-Type': 'application/json',
        },
        "body": JSON.stringify(descuento)
    });
    let r = await response.json();
}

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


