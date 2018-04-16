//Guardamos login en localStorage

function localStor() {
    let usuario=$('#inputUssuario').val();
    let password=$('#inputPassword').val();
    var paswordEncript2 = hex_md5(password);
    localStorage.setItem("user",usuario);
    localStorage.setItem("contraseña",paswordEncript2);
    $('#inputPassword').val(paswordEncript2);
    let prueba=$('#inputPassword').val();

    return;
}

