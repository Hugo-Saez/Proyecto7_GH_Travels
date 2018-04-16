

// comprobamos que la clave introducida y la repetida sean las mismas

function comprobar(event) {
    //alert("entro");
    $('.alert-danger').remove();

    let password1=$('#registPassword').val();
    let password2=$('#registPassword2').val();
    //alert(password1+password2);

        if(password1!=password2){
            //alert('Claves erroneas');
            $('.formReg').append('<div class="alert alert-danger">\n'+
            '<strong>Error!</strong>Las contraseñas no coinciden.\n'+
            '</div>');
            event.preventDefault();
        }
        else{
            password1 = hex_md5(password1);
            //alert(password1);
            $('#registPassword').val(password1);
            return;
        }
}

