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

// Función que añade el curso al carrito
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
     console.log(obtenerCursosLocalStorage())
}

//Muestra el curso seleccionado en el carrito
function insertarCarrito(curso) {
     cursoExiste = existe(curso.id);

     console.log(cursoExiste);
     
     if(!cursoExiste){
     const row = document.createElement('tr');
     row.innerHTML = `
          <td>  
               <img src="${curso.imagen}" width=100>
          </td>
          <td>${curso.titulo}</td>
          <td>${curso.precio}</td>
          <td>
               <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
          </td>
     `;
     listaCursos.appendChild(row);
     guardarCursoLocalStorage(curso);
     }
}

//Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
     e.preventDefault();

     let curso,
        cursoId;
     if(e.target.classList.contains('borrar-curso') ) {
          e.target.parentElement.parentElement.remove();
          curso = e.target.parentElement.parentElement;
          cursoId = curso.querySelector('a').getAttribute('data-id');

     }
     eliminarCursoLocalStorage(cursoId);
}

//Elimina todos los cursos del carrito en el DOM
function vaciarCarrito() {

     while(listaCursos.firstChild) {
          listaCursos.removeChild(listaCursos.firstChild);
     }
     
     // Vaciar Local Storage
     vaciarLocalStorage();

     return false;
}

//Almacena cursos en el carrito al local storage

function guardarCursoLocalStorage(curso) {
    let cursos;
     //Toma el valor de un arreglo con datos de localStorage o vacio
    cursos = obtenerCursosLocalStorage();

    //El curso seleccionado se agrega al arreglo
    cursos.push(curso);

    //Se sobreescribe el arreglo con el nuevo curso
     localStorage.setItem('cursos', JSON.stringify(cursos) );
}


// Comprueba que haya elementos en Local Storage
function obtenerCursosLocalStorage() {
     let cursosLS;

     //se comprueba si hay algo en el local storage
     if(localStorage.getItem('cursos') === null) {
          cursosLS = [];
     } else {
          cursosLS = JSON.parse( localStorage.getItem('cursos') );
     }
     return cursosLS;

}

//Imprime los cursos almacenados en el local storage
function leerLocalStorage() {
    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function(curso){
        //Construir el template
        const row = document.createElement('tr');
        row.innerHTML = `
             <td>  
                  <img src="${curso.imagen}" width=100>
             </td>
             <td>${curso.titulo}</td>
             <td>${curso.precio}</td>
             <td>
                  <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
             </td>
        `;
        listaCursos.appendChild(row);

    });
}

// Elimina el curso por el ID en Local Storage
function eliminarCursoLocalStorage(curso) {
    let cursosLS;
    //Obtengo el arreglo de cursos
    cursosLS = obtenerCursosLocalStorage();
    //Se itera comparando el ID del curso borrado con los del LS
    cursosLS.forEach(function(cursoLS, index) {
        if(cursoLS.id === curso) {
            cursosLS.splice(index, 1);
        }
    });
    // Se añade el arreglo actual a storage
    localStorage.setItem('cursos', JSON.stringify(cursosLS) );
}

// Elimina todos los cursos de Local Storage
function vaciarLocalStorage() {
    localStorage.clear();
}

function existe(valor){
     let cursos;
     cursos = obtenerCursosLocalStorage();
     let salida = false;
     for(let i = 0; i<cursos.length; i++){
          console.log(cursos[i].id)
          if(cursos[i].id==valor){
               salida=true
          }
     }
     
     return salida;
}