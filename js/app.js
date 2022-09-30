// variables
const carrito     = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas un curso en agregar
    listaCursos.addEventListener('click', agregarCurso);

    //Eliminar curso carrito
    carrito.addEventListener('click', eliminarCurso);

    //vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
    })
}
//function
function agregarCurso(e){
    e.preventDefault()
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
        

    }
}
//Eliminar un Curso del carrito
function eliminarCurso(e){
        if (e.target.classList.contains('corrar-curso')){
            const cursoId = e.target.getAttribute('data-id');

            //Eiminar del arreglo de articulosCarrito por el data-id
            articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)

            carritoHTML();
        }
}
//lee el contenido del HTML que le dimos click
function leerDatosCurso(curso){
    const infoCruso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    //Revisa si un elemento ay existe en el carrito
const existe = articulosCarrito.some(curso => curso.id === infoCruso.id);
if(existe){
    //actializamos la cantidad
    const cursos = articulosCarrito.map(curso => {
        if(curso.id === infoCruso.id){
                curso.cantidad++;
                return curso; //retorna el objecto actualizado
        } else {
            return curso;// retorna los objetos que o son actualizados 
        }
    });
    articulosCarrito = [...cursos];
} else {
     // agrega elementos al arreglo de carrito
     articulosCarrito = [...articulosCarrito , infoCruso];
}
   
    carritoHTML(articulosCarrito);
}

// muetsra el carrito de compras en el HTML

function carritoHTML(){

    // eleminar elementos del HTML
    limpiarHTML()

    // Impriir el curso en el carrito
    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        const {imagen, titulo, precio, cantidad, id} = curso;
        row.innerHTML = `
            <td><img src="${imagen}"  width="100px"> </td>
            <td>${titulo}</td>   
            <td>${precio}</td>     
            <td> ${cantidad}</td>
            <td><a href="" class="borrar-curso" data-id="${id}">X</a></td>
        `

        contenedorCarrito.appendChild(row);

    })

}

function limpiarHTML(){
//forma no recomendada
    // contenedorCarrito.innerHTML = '';

    //Forma Recomendada

     while(contenedorCarrito.firstChild){
         contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
}