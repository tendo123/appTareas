document.getElementById("formTarea").addEventListener('submit',saveTarea);

function saveTarea(e){

	let  titulo =document.getElementById('title').value;
	let descripcion = document.getElementById('descripcion').value;

	//Crear un objeto donde guarde los datos que nos llega del formulario
	const tarea = {
		titulo,
		descripcion
	}

	if(localStorage.getItem('tareas') == null){
		// crear un arreglo vacio.
		let tareas = [];
		// llenar el arreglo usando el push() enviandole la tarea nueva;
		tareas.push(tarea);
		// Almacenar en el localStorage y convertirlo a un formado de string
		localStorage.setItem('tareas', JSON.stringify(tareas));
	}else{
		// En caso de existir tareas tendremos que obtenerlas
		let tareas = JSON.parse(localStorage.getItem('tareas'));
		// llenarlas
		tareas.push(tarea);
		// Volver a almancenarlas
		localStorage.setItem('tareas', JSON.stringify(tareas));
	}

	// usando el localStorage : almacenar en memoria
	// setItem() : almacenar datos , nombre_almacenar y valor
	// JSON.stringify() : metodo para convertir un objeto a un string
	// Tecnicamente estamos creando un arreglo y ir actualizandolo
	//localStorage.setItem("tareas", JSON.stringify(tarea));

	// convertimos a un JSON
	//console.log(JSON.parse(localStorage.getItem("tareas")));


	//Invocamos la funcion para obtener las tareas para que se actualicen
	getTareas();

	//Resetear el formulario
	document.getElementById('formTarea').reset();

	//cancelar el envio del formulario.
	e.preventDefault();
}


function getTareas(){

	let tareas = JSON.parse(localStorage.getItem('tareas'));
	let VerTareas = document.getElementById('tareas');

	// Limpiamos
	VerTareas.innerHTML = '';

	for (var i = 0; i < tareas.length; i++) {

	// Obtener los datos individuales
	let titulo = tareas[i].titulo;
	let descripcion = tareas[i].descripcion;
		
	VerTareas.innerHTML += `<div class="card mb-4">
				<div class="card-body">
					<p>${titulo} - ${descripcion}</p>
					<a class="btn btn-danger" onclick="deleteTarea('${titulo}')">DELETE</a>
				</div>
			</div>`	

	}
}

function deleteTarea(titulo){
	let tareas = JSON.parse(localStorage.getItem('tareas'));
	for(let i = 0; i < tareas.length; i++){
		if(tareas[i].titulo == titulo){
			// splice() ->enviamos el indice y la cantidad de elementos
			// osea 1 elemento y esto retira el registro
			tareas.splice(i , 1);
		}
	}

	// Nuevamente insertamos los datos para que se actualice
	localStorage.setItem('tareas' , JSON.stringify(tareas));
	getTareas();

}


getTareas();