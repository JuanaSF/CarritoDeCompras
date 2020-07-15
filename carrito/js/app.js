//-------------------- Variables ---------------------

const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const botonVaciarCarrito = document.getElementById('vaciar-carrito');



//-------------------- EventsListeners ------------------

cargarEnventListeners();

function cargarEnventListeners() {

    //Se ejecuta cuando se preciona agregar al carrito
    cursos.addEventListener('click', comprarCurso);

    //Cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Al vaciar el carrito
    botonVaciarCarrito.addEventListener('click', vaciarCarrito);

    //Al cargar el documento, muestra elementos del localStorage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

//-------------------- Funciones ------------------------

//funncion que añade al curso al carrito
function comprarCurso(e) {
    e.preventDefault();

    //Delegation para agregar al carrito
    if (e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        //Envia el curso para leer sus datos
        leerDatosCurso(curso);
    }
}

//Lee los datos del curso
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoCurso);
}

//Muestra el curso seleccionado en el carrito
function insertarCarrito(curso) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}
            ">X</a>
        </td>
    `;
    listaCursos.appendChild(row);
    guardarCursoLocalStorage(curso);
}

//Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
    }
}

//Elimina todos los cursos del carrito en el DOM
function vaciarCarrito(e) {
    e.preventDefault();

    //mientras la lista de cursos tenga 'hijos'
    while (listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild);
    }
}

//Almacena cursos en el carrito al local storage
function guardarCursoLocalStorage(curso) {
    let cursos;
    //Toma el valor de un arreglo con datos de localStorage o vacio
    cursos = obtenerCursosLocalStorage();

    //El curso seleccionado se agrega al arreglo
    cursos.push(curso);

    //Se sobreescribe el arreglo con el nuevo curso
    localStorage.setItem('cursos', JSON.stringify(cursos));
}

function obtenerCursosLocalStorage() {
    let cursosLS;

    //se comprueba si hay algo en el local storage
    if (localStorage.getItem('cursos') === null) {
        cursosLS = [];
    } else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
}

//Imprime los cursos almacenados en el local storage
function leerLocalStorage(e) {
    e.preventDefault();

    let cursosLS;
    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function (curso) {
        //Construir el template
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}
            ">X</a>
        </td>
        `;
        listaCursos.appendChild(row);
    });
}