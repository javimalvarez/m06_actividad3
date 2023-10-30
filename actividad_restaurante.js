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
console.log(plato1.getHTML());

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
    //Se recorre el array platosDisponibles para recuperar todos los objetos Plato
    for (let i = 0; i < platosDisponibles.length; i++) {
        //Aplicamos getHTML al objeto Plato para poder mostrar la información en pantalla
        let plato = platosDisponibles[i].getHTML() + "<br>";
        document.getElementById("listaPlatos").innerHTML += "<option value=" + i + ">" + platosDisponibles[i].nombre + "</option>"
        //Con cada iteración se añade la información de los platos recuperador a infoPlatos
        infoPlatos += plato;
    }
    /*Variable que contiene información del elemento en el documento HTML 
    donde se va a mostrar la información de los platos*/
    let contenedor = document.getElementById("platos");
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
    //Se recupera todos los menús del array menusDisponibles y se almacenan los datos en infoMenus
    for (let key in menusDisponibles) {
        infoMenus += menusDisponibles[key].getHTML() + "<br>";
    }
    /*Variable que contiene información del elemento en el documento HTML 
    donde se va a mostrar la información de los menús*/
    let contenedor = document.getElementById("menus");
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
    //Se añade el nuevo objeto Plato a platosDisponibles
    platosDisponibles.push(nuevoPlato);
    alert("Se ha añadido " + nuevoPlato.nombre + " como nuevo plato disponible");
    //Se añade información del nuevo plato al formulario incluido en el documento HTML
    document.getElementById("selectPlatos").innerHTML += '<option value="nuevoPlato">' + nombre + '</option>';
    document.getElementById("listaPlatos").innerHTML += '<option value="nuevoPlato">' + nombre + '</option>';
    //Actualiza la información de los platos en pantalla al usuario
    mostrarPlatos();
}

//Se configura botón btnAgregarPlato para añadir plato a lista de platos disponibles
let agregar = document.getElementById("btnAgregarPlato");
agregar.addEventListener("click", añadirPlatoLista);

//Borra un objeto plato de platosDisponibles
function borrarPlatoLista() {
    let selectPlatos = document.getElementById("selectPlatos");
    /*Recupera la posición del plato dentro del select
    se resta 1 a la posición recuparada porque tenemos
    un option no seleccionable*/
    let posPlato = selectPlatos.selectedIndex - 1;
    /*Se aplica la función splice a platosDisponibles para indicar la posición del elemento 
    y cuantos elementos queremos eliminar*/
    platosDisponibles.splice(posPlato, 1);
    //Actualiza la información de los platos en pantalla al usuario
    mostrarPlatos();
}

//Se configura botón btnEliminar para eliminar plato del array platosDisponibles
let borrar = document.getElementById("btnEliminar");
borrar.addEventListener("click", borrarPlatoLista);

//Añade un objeto tipo Menu a menusDisponibles
function añadirMenu() {
    //Variable que almacena el nombre que ha incluido en el formulario el usuario para el menú
    let nombre = document.getElementById("nombreMenu").value;
    alert("Se añade al inventario el menu " + nombre);
    //Se crea un nuevo objeto Menu con el nombre facilitado por el usuario
    const nuevoMenu = new Menu(nombre);
    //Se añade el nuevo menú creado al array menusDisponibles
    menusDisponibles["menuNuevo"] = nuevoMenu;
    document.getElementById("menus").innerHTML = "";
    //Añade el nuevo menú al select listaMenus 
    document.getElementById("listaMenus").innerHTML += "<option value=" + nuevoMenu + ">" + nombre + "</option>";
    //Actualiza la información de los menús en pantalla al usuario
    mostrarMenus();
}

//Se configura botón btnAgregarMenu para añadir menú
let añadir = document.getElementById("btnAgregarMenu");
añadir.addEventListener("click", añadirMenu);

function anadirPlatoMenu() {
    //Variable que almacena el selector de platos
    let listaPlatos = document.getElementById("listaPlatos");
    let posPlato = listaPlatos.selectedIndex - 1;
    let plato = platosDisponibles[posPlato];
    console.log(plato);
    //Variable que almacena el valor elegido en el select de la lista de menús
    const menuValue = document.getElementById("listaMenus").value;
    menusDisponibles[menuValue].añadirPlato(plato);
    alert("Se añadio el plato " + plato + " al menú " + menuValue);
    mostrarMenus();
}

//Se configura botón btnAgregarPlatoMenu para que añada un plato al menú seleccionado
let añadirEnMenu = document.getElementById("btnAgregarPlatoMenu");
añadirEnMenu.addEventListener("click", anadirPlatoMenu);

//Mensaje de bienvenida y acciones botones de la barra de menú
function bienvenida() {
    let nombre = prompt('Estás accediendo al inventario, indica tu nombre: ');
    alert("Hola " + nombre);
}
function borrarPantalla() {
    document.getElementById("platos").innerHTML = "";
    document.getElementById("menus").innerHTML = "";
}
document.getElementById("consultarPlatos").addEventListener("click", mostrarPlatos);
document.getElementById("consultarMenus").addEventListener("click", mostrarMenus);
//El botón borrarPantalla llama la función borrarPantalla para eliminar toda la info de los platos y menús que aparecen en pantalla
document.getElementById("borrarPantalla").addEventListener("click", borrarPantalla);

