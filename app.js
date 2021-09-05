document.getElementById("formTarea").addEventListener('submit',saveTarea);

function saveTarea(e){

	let  titulo =document.getElementById('title').value;
	let descripcion = document.getElementById('descripcion').value;
	
	const tarea = {
		titulo,
		descripcion
	}

	if(localStorage.getItem('tareas') == null){
		
		let tareas = [];
		
		tareas.push(tarea);
		
		localStorage.setItem('tareas', JSON.stringify(tareas));
	}else{
		
		let tareas = JSON.parse(localStorage.getItem('tareas'));
		
		tareas.push(tarea);
		
		localStorage.setItem('tareas', JSON.stringify(tareas));
	}


	getTareas();

	
	document.getElementById('formTarea').reset();

	
	e.preventDefault();
}


function getTareas(){

	let tareas = JSON.parse(localStorage.getItem('tareas'));
	let VerTareas = document.getElementById('tareas');


	VerTareas.innerHTML = '';

	for (var i = 0; i < tareas.length; i++) {


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
			
			tareas.splice(i , 1);
		}
	}


	localStorage.setItem('tareas' , JSON.stringify(tareas));
	getTareas();

}


getTareas();
