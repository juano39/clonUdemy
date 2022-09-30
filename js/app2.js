// Variables

const listaCursos = document.querySelector('#lista-cursos');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const borraCurso = document.querySelector('#lista-carrito');
const carrito = document.querySelector('#carrito #vaciar-carrito');
let informacionCurso = [];


// Function de eventListener
misEVent();
function misEVent() {

    // Event selecionado
    listaCursos.addEventListener('click', IdentificarCurso);

    // eliminar un curso 
    borraCurso.addEventListener('click', eliminarCurso);

    // vaciar Carrito 
    carrito.addEventListener('click', () => {
        limpiarHTML()
        informacionCurso = [];
    })
}

// fuction 

function IdentificarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {

        const cursoSelecionado = e.target.parentElement.parentElement;
        datosCurso(cursoSelecionado);
    }
}

function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const idCurso = e.target.getAttribute('data-id');
        informacionCurso = informacionCurso.filter(curso => curso.id !== idCurso)
        console.log(idCurso);

        cursoHTML()
        
    }

}

function datosCurso(curso){

    const infoCurso = {
        imagen:     curso.querySelector('img').src,
        titulo:     curso.querySelector('h4').textContent,
        precio:     curso.querySelector('p span').textContent,
        id:         curso.querySelector('a').getAttribute('data-id'),
        cantidad:   1
    }

    const existe = informacionCurso.some(curso => curso.id === infoCurso.id)

    if (existe) {
        informacionCurso.map(curso => curso.id === infoCurso.id ? curso.cantidad++: curso)
    }else {

        informacionCurso = [...informacionCurso, infoCurso];
    }
    // console.log(existe);


    // console.log(informacionCurso);
    cursoHTML(informacionCurso);

}

function cursoHTML(){
    // limpiar HTML
    limpiarHTML();

    // console.log(informacionCurso);
    informacionCurso.map(curso => {
        const row = document.createElement('tr');
        const {imagen, titulo, precio, cantidad, id} = curso;

        row.innerHTML = `
            <td><img src='${imagen}' width='100'></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href='#' class='borrar-curso' data-id='${id}'>X</a></td>
        `;

        listaCarrito.appendChild(row);

        console.log(listaCarrito);
    })
}

function limpiarHTML(){
    while (listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild)
        
    }
};