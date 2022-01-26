let email = document.querySelector("#emailLogin");
let password = document.querySelector("#passwordLogin");
let btnInicioSesion = document.querySelector("#btn-inicioSesion");




let usuario;
let datosLocales=window.localStorage;
let usuarioEnCache;

btnInicioSesion.addEventListener("click", async function(e){
    try{ 
        email = email.value;
        password = password.value;  
        let response = await fetch(`usuario/login/${email}/${password}`);
        console.log(response);
        
        if(response.ok){
            usuario = await response.json();
            console.log(usuario.nombre);
            datosLocales.setItem("usuario",JSON.stringify(usuario))   
            window.location.href="http://localhost:3000"    
        }
        else{
            console.log('no funciona')
        }
    }
    catch(err){
        console.log('no funciona')
    }
    
})



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




