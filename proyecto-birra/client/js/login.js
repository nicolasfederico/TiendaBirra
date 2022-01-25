let email = document.querySelector("#emailLogin");
let password = document.querySelector("#passwordLogin");
let btnInicioSesion = document.querySelector("#btn-inicioSesion");
let nombreUsuario = document.querySelector('#nombre-usuario')



let usuario;

btnInicioSesion.addEventListener("click", async ()=>{
    try{ 
        email = email.value;
        password = password.value;
        console.log(email); 
        console.log(password);    
        let response = await fetch(`usuario/login/${email}/${password}`);
        console.log(response);
        
        if(response.ok){
            usuario = await response.json();
            console.log(usuario);
            nombreUsuario.innerHTML(usuario.nombre)
            // alert('logueado con exito');
            
        }
        else{
            console.log('no funciona')
        }
    }
    catch(err){
        console.log('no funciona')
    }


    
    
})
    

function cargarNombre(usuario){
    console.log('un texto')
    nombreUsuario.innerHTML(usuario)
    
}


/* async function cargarUsuario(mail,password) {
    try{ 
        email = email.value;
        password = password.value;
        console.log(email); 
        console.log(password);    
        let response = await fetch(`usuario/login/${mail}/${password}`);
        console.log(response);
        
        if(response.ok){
            usuario = await response.json();
            console.log(usuario);
            alert('logueado con exito')
        }
        else{
            console.log('no funciona')
        }
    }
    catch(err){
        console.log('no funciona')
    }
} */


function verificarUsuario(usuario) {

}

