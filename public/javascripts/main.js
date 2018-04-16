// ocultar menu con es scroll


$(function (){
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
           $('#menu').addClass("normal");
            //$('#menu').fadeOut(1000);
        } else {
            $("#menu").removeClass("normal");
            //$('#menu').fadeIn(1000);
        }
    });
});


// Añadimos efecto al scroll de los links , para que el movimiento sea mas suave
$("a").on('click', function(event) {

    // El hash lo que hace es leer el atributo HREF de 'a' y si encuentra alguna '#'
    // coge el elemento que empieza por '#'
    if (this.hash !== "") {
        // Previene el comportamiento "natural" de los enlaces
        event.preventDefault();

        // Guardamos el hash
        var hash = this.hash;

        // Usamos la funcion animate de JQuery para hacer que el scroll sea mas suave
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 1000, function(){

            // Modifica la URL cuando acaba el Scroll (ver url)
            window.location.hash = hash;
        });
    } // End if
});

// Mostrar y esconder añadir destino

$('#altaDest').click(function () {
    // $('#formCrearDest').slideToggle(2000);
    // $('#formCrearDest').delay(2000).slideToggle(1000);
    $('#formCrearDest').fadeIn(1000);
});

$('#nvoDestClose').click(function () {
    //$('#formCrearDest').slideToggle(2000);
    //$('#formCrearDest').delay(2000).slideToggle(1000);
    $('#formCrearDest').fadeOut(1000);

});