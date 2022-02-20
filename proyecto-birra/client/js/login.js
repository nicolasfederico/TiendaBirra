let btnInicioSesion = document.querySelector("#btn-inicioSesion");
let usuario;
let datosLocales=window.localStorage;
let usuarioEnCache;
let btnLoginConfirm = document.querySelector("#btn-LoginConfirm")

btnInicioSesion.addEventListener("click", async function(e){
    try{ 
        let email = document.querySelector("#emailLogin");
        let password = document.querySelector("#passwordLogin");
        email = email.value;
        password = password.value;  
        let response = await fetch(`usuario/login/${email}/${password}`);        
        if(response.ok){
            usuario = await response.json();
            datosLocales.setItem("usuario",JSON.stringify(usuario))   
            usuarioEnCache = JSON.parse(window.localStorage.getItem("usuario")); 
            $(function() {
                $('#modalMensajeBienvenida').modal('show');
            });  
            btnLoginConfirm.addEventListener("click", function (e){
                window.location.href="http://localhost:3000" 
            })
        }
        else{
            console.log('no funciona')
        }
    }
    catch(err){
        $(function() {
            $('#modalPasswordIncorrecto').modal('show');
        });        
    }
})