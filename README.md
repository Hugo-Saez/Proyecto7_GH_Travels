# Proyecto7_GH_Travels

# Actividad_7
### 7º Actividad semanal. Gestionando sesiones con passport, paginación con handlebars e inicio del carrito de la compra.
Bueno cada vez tenemos más visitas ya es hora de dar un paso más e integrar un carrito de compra para que puedan adquirir los viajes de forma online, pero para ello primero debemos dar una vuelta a nuestro proyecto, y mejorar la gestión de las sesiones así como poder paginar nuestros tablas de datos.

---

## Condiciones
Generamos un carrito de la compra que almacenará la selección de los viajes en la sesión de la instancia, el proceso consiste:
1º El usuario debe seleccionar el viaje  desde un botón en cada una de las vistas de descripción del viaje que índicará añadir al carrito de la compra.
2º Tendremos un nuevo icono de compra donde una vez pulsado aparecerá una nueva vista con el viaje  o viajes seleccionados, en esta vista aparecera  el precio y donde prodrá seleccionar el número de personas que aplicará, 
El precio total y el precio con iva, indicando el iva que se aplica.

## Características
* Se utilizará NPM para la instalación de dependencias.
* El proyecto debe estar subido en un contendor en vagrant, y debe cumplir las siguientes condiciones:
  * Debe disponer de un vagrantfile y un archivo .sh donde se encuentren todos los scripts necesarios para construir el contenedor y nuestra aplicacion se autoejecute.
  * El contendor debe tener abierto el puerto 80 y apuntara internamente al puerto 3000 donde tenemos apuntado nuestro servidor de node.js
  * El contendor debe disponer un mysql instalado con la tabla descrita anteriormente.
  * Dentro del package.json debemos disponer la tarea production debe llamar al módulo forever y arrancar la maquina.
  * Debemos generar una nueva carpeta en nuestra estructura denominada log, donde se almacenará un log de los posibles errores que se produzcan en la aplicación.
  * Se utilizará nodemailer para el envio de los emails de los diferentes procesos.
  * Se utilizará Multer para las subidas de archivos al servidor.
  * Se utilizará sequelize para gestionar todas las entidades de nuestro proyecto como ORM del mismo.
  * Las vistas con las tablas dispondrán de paginación.
  * La gestión de sesiones se realizará mediante passport.
