//Arrays globales
var platosDisponibles = [];
var menusDisponibles = {};

//Objeto tipo plato
class Plato {
    nombre;
    descripcion;
    precio;

    //Crea un objeto tipo Plato
    constructor(nombre, descripcion, precio) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
    }

    //Función que pasa toda la información de los atributos de un objeto Plato a formato HTML
    getHTML() {
        return `<div class="plato"><h3>${this.nombre}</h3><p>${this.descripcion}</p><span class="precio">Precio: ${this.precio}€</span></div>`;
    }
}

//Se crea un nuevo objeto tipo plato con los atributos correspondientes 
const plato1 = new Plato("Hamburguesa", "Deliciosa hamburguesa con carne jugosa y queso derretido", 10);
/*Se aplica la función getHTML para mostrar en cosola la información 
que visualiza en el usuario en el documento HTML*/
//console.log(plato1.getHTML());

//Objeto tipo Menu
class Menu {
    nombre;
    listaPlatos = [];

    //Crea un objeto tipo Menu
    constructor(nombre) {
        this.nombre = nombre;
    }

    /*Función que permite añadir un nuevo plato a un objeto Menu
    y almacenarlo en listaPlatos*/
    añadirPlato(plato) {
        this.listaPlatos.push(plato);
    }

    //Función que pasa toda la información de los atributos de un objeto Menu a formato HTML
    getHTML() {
        //Variable que almacena la información de los distintos tipos de platos del menú
        let platosMenu = "";
        /*Se recupera de los distintos platos del array listaPlatos 
        y se aplica la función getHTML del objeto Plato para
        poder mostrar la información al usuario por pantalla*/
        if (this.listaPlatos.length != 0) {
            for (let i = 0; i < this.listaPlatos.length; i++) {
                let plato = this.listaPlatos[i].getHTML();
                platosMenu += plato;
            }
        }
        else {
            platosMenu += "Este menú no contiene ningún plato<br>";
        }
        //Devuelve la información recuperada en formato HTML
        return `<div class="menu"><h3>${this.nombre}</h3><div class="platos">${platosMenu}</div></div><br>`;
    }
}

//Se crea nuevo objeto tipo Menu y se añade objeto tipo Plato
const menu1 = new Menu("Menú Especial");
menu1.añadirPlato(plato1);

//Se muestra por consola la información que vería el usuario por pantalla respecto el objeto menu1
console.log(menu1.getHTML());

//Se añade a platosDisponibles plato1 y un nuevo objeto Plato que se ha denominado plato2
const plato2 = new Plato("Pizza Chicago", "Pizza estilo Chicago con pepperoni y nuestra exclusiva mezcla de quesos", 15);
platosDisponibles.push(plato1, plato2);

//Muestra la información de los distintos platos almacenados en platosDisponibles
function mostrarPlatos() {
    //Variable infoPlatos va almacenar la información recuperada desde listaPlatos
    let infoPlatos = "";
    //Se recorre el array platosDisponibles para recuperar todos los objetos Plato y se añaden a los elementos select del formulario
    document.getElementById("selectPlatos").innerHTML = '<option value="">Seleccionar un plato</option>';
    document.getElementById("listaPlatos").innerHTML = '<option value="">Seleccionar un plato</option>';
    for (let i = 0; i < platosDisponibles.length; i++) {
        //Aplicamos getHTML al objeto Plato para poder mostrar la información en pantalla
        let plato = platosDisponibles[i].getHTML() + "<br>";
        //Se añaden  los platos disponibles en ambos select
        document.getElementById("selectPlatos").innerHTML += "<option value=" + i + ">" + platosDisponibles[i].nombre + "</option>";
        document.getElementById("listaPlatos").innerHTML += "<option value=" + i + ">" + platosDisponibles[i].nombre + "</option>";
        //Con cada iteración se añade la información de los platos recuperador a infoPlatos
        infoPlatos += plato;
    }
    /*Variable que contiene información del elemento en el documento HTML 
    donde se va a mostrar la información de los platos*/
    const contenedor = document.getElementById("platos");
    //Borra la información del elemento HTML seleccionado en caso de que exista información
    contenedor.innerHTML = "";
    //Muestra por pantalla al usuario la información almacenada en infoPlatos
    contenedor.innerHTML += infoPlatos;
}

//Añade menu1 al array menusDisponibles con la clave menu1
menusDisponibles["menu1"] = menu1;

//Muestra la información de los distintos menús almacenados en menusDisponibles
function mostrarMenus() {
    let infoMenus = "";
    //Elimina la información del select listaMenus
    document.getElementById("listaMenus").innerHTML = '<option value="">Seleccionar un menú</option>';
    //Se recupera todos los menús del array menusDisponibles y se almacenan los datos en infoMenus
    for (let key in menusDisponibles) {
        infoMenus += menusDisponibles[key].getHTML() + "<br>";
        //Se añade información desde el array menusDisponibles al select listaMenus
        document.getElementById("listaMenus").innerHTML += "<option value=" + key + ">" + menusDisponibles[key].nombre + "</option>";
    }
    /*Variable que contiene información del elemento en el documento HTML 
    donde se va a mostrar la información de los menús*/
    const contenedor = document.getElementById("menus");
    //Borra la información del elemento HTML seleccionado en caso de que exista información
    contenedor.innerHTML = "";
    //Muestra por pantalla al usuario la información almacenada en infoMenus
    contenedor.innerHTML += infoMenus;
}

//Añade platos a platosDisponibles
function añadirPlatoLista() {
    //Valores recuperados desde el formulario
    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = document.getElementById("precio").value;
    //Se crea un objeto tipo Plato con los valores recuperados del formulario
    const nuevoPlato = new Plato(nombre, descripcion, precio);
    //Se solicita confirmación para cambiar configuración del array platosDisponibles
    let respuesta = window.confirm("Confirma si deseas añadir el plato " + nombre + " a la lista de platos disponibles");
    if (respuesta == true) {
        //Se añade el nuevo objeto Plato a platosDisponibles
        platosDisponibles.push(nuevoPlato);
        alert("Se ha añadido " + nuevoPlato.nombre + " como nuevo plato disponible");
        //Se añade información del nuevo plato al formulario incluido en el documento HTML
        document.getElementById("selectPlatos").innerHTML += '<option value="nuevoPlato">' + nombre + '</option>';
        document.getElementById("listaPlatos").innerHTML += '<option value="nuevoPlato">' + nombre + '</option>';
        //Actualiza la información de los platos en pantalla al usuario
        mostrarPlatos();
    }
}

//Se configura botón btnAgregarPlato para añadir plato a lista de platos disponibles
const añadirNuevoPlato = document.getElementById("btnAgregarPlato");
añadirNuevoPlato.addEventListener("click", añadirPlatoLista);

//Borra un objeto plato de platosDisponibles
function borrarPlatoLista() {
    const selectPlatos = document.getElementById("selectPlatos");
    /*Recupera la posición del plato dentro del select
    se resta 1 a la posición recuparada porque tenemos
    un option no seleccionable*/
    const posPlato = selectPlatos.selectedIndex - 1;
    let respuesta = window.confirm("Confirma si deseas eliminar el plato " + platosDisponibles[posPlato].nombre);
    /*Se aplica la función splice a platosDisponibles para indicar la posición del elemento 
    y cuantos elementos queremos eliminar*/
    if (respuesta == true) {
        platosDisponibles.splice(posPlato, 1);
    }
    //Actualiza la información de los platos en pantalla al usuario\
    mostrarPlatos();
}

//Se configura botón btnEliminar para eliminar plato del array platosDisponibles
const borrarPlato = document.getElementById("btnEliminar");
borrarPlato.addEventListener("click", borrarPlatoLista);

//Añade un objeto tipo Menu a menusDisponibles
function añadirMenu() {
    //Variable que almacena el nombre que ha incluido en el formulario el usuario para el menú
    let nombre = document.getElementById("nombreMenu").value;
    //Se crea un nuevo objeto Menu con el nombre facilitado por el usuario
    const nuevoMenu = new Menu(nombre);
    //Se pide confirmación al usuario para añadir un nuevo menú
    let respuesta = window.confirm("Confirma que quieres añadir el menú " + nombre + " a la lista de menús disponibles");
    if (respuesta == true) {
        //Se añade el nuevo menú creado al array menusDisponibles
        menusDisponibles["nuevoMenu"] = nuevoMenu;
        alert("Añadido nuevo menú " + nombre + " a la lista de menús disponibles");
        //Añade el nuevo menú al select listaMenus 
        document.getElementById("listaMenus").innerHTML += '<option value="nuevoMenu">' + nombre + '</option>';
        /*Se elimina información existente mostrada al usuario y 
        se actualiza la información de los menús en pantalla al usuario*/
        mostrarMenus();
    }
}

//Se configura botón btnAgregarMenu para añadir menú
const añadirNuevoMenu = document.getElementById("btnAgregarMenu");
añadirNuevoMenu.addEventListener("click", añadirMenu);

function añadirPlatoMenu() {
    //Variable que almacena el selector de platos
    const listaPlatos = document.getElementById("listaPlatos");
    const posPlato = listaPlatos.selectedIndex - 1;
    const plato = platosDisponibles[posPlato];
    //Variable que almacena el valor elegido en el select de la lista de menús
    const menuValue = document.getElementById("listaMenus").value;
    //Se solicita confirmación para cambiar la configuración del menú
    let respuesta = window.confirm("Confirma si quieres añadir el plato " + plato.nombre + " al menú " + menusDisponibles[menuValue].nombre);
    if (respuesta == true) {
        //Se verifica si el plato está incluido o no dentro del menú, si no está incluido se añade al menú
        if (!menusDisponibles[menuValue].listaPlatos.includes(plato, 0)) {
            menusDisponibles[menuValue].añadirPlato(plato);
            alert("Se ha añadido el plato " + plato.nombre + " al menú " + menusDisponibles[menuValue].nombre);
            mostrarMenus();
        }
        else {
            alert("El menú ya cuenta con el plato " + plato.nombre + ", elige otro plato para incluir en el menú");
        }
    }
}

//Se configura botón btnAgregarPlatoMenu para que añada un plato al menú seleccionado
const añadirEnMenu = document.getElementById("btnAgregarPlatoMenu");
añadirEnMenu.addEventListener("click", añadirPlatoMenu);

//Mensaje de bienvenida y acciones botones de la barra de menú
function bienvenida() {
    let nombre = prompt('Estás accediendo al inventario, indica tu nombre: ');
    alert("Hola " + nombre + " estás accediendo al sistema de gestión de restaurantes Linkia FP");
}
function borrarPantalla() {
    document.getElementById("platos").innerHTML = "";
    document.getElementById("menus").innerHTML = "";
}
document.getElementById("consultarPlatos").addEventListener("click", mostrarPlatos);
document.getElementById("consultarMenus").addEventListener("click", mostrarMenus);
//El botón borrarPantalla llama la función borrarPantalla para eliminar toda la info de los platos y menús que aparecen en pantalla
document.getElementById("borrarPantalla").addEventListener("click", borrarPantalla);

