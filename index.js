document.getElementById('edit').disabled=true;
document.getElementById('cancel').disabled=true;
document.getElementById('posicionLabel').disabled=true;
let editBtn = document.getElementById('edit');
let cancelBtn = document.getElementById('cancel');
let guardarBtn = document.getElementById('save');//OBTENGO LOS ELEMENTO BOTON
let listaLibros =[];
///AGREGO EL EVENTO AL PRECIONAR EL BOTON Y CREO LA FUNCION QUE ES LO QUE SE HARA CUANDO SE PRECIONE EL BOTON
guardarBtn.addEventListener("click", function(){
    //console.log("guardado");

    let nombre = document.getElementById('nombre');//OBTENGO LOS ELEMENTOS Y LOS GUARDO EN SUS VARIABLES
    let precio = document.getElementById('precio');
    let autor = document.getElementById('autor');
    let posicion = document.getElementById('posicionLabel');
    //console.log(nombre, precio, autor);
    if(nombre.value == "" || precio.value== "" || autor.value== "")
    {
        alert("TODOS LOS CAMPOS SON REQUERIDOS");
    }else
    {
        listaLibros.push({
            
            nombre: nombre.value, // EL value OBTENGO EL VALOR DEL ELEMENTO 
            precio: precio.value,
            autor: autor.value 
        });       
        creacionTabla();//MANDA LLAMAR LA FUNCION Y SE ACTUALIZA CADA VEZ QUE SE CREA UN NUEVO LIBRO      
        //console.log(listaLibros);
        limpiar();
        
    }
});

function creacionTabla(){
    document.querySelector('#listaLibrosTabla tbody').innerHTML = "";//SE LIMPIA LA LISTA PARA QUE NO SE DUPLIQUEN CADA VES QUE SE GUARDAN
        listaLibros.forEach((libro,index)=>{ //CON EL forEach NOS AYUDA A RECORRER LOS ARRAY, LO ALMACENO EN LIBRO Y INDEX DONDE ESTA
            //console.log(libro);
            console.log(index);
            var tabla = document.querySelector('#listaLibrosTabla tbody');//SELECCIONAMOS DONDE VAMOS A CREAR LA TABLA
            var row = tabla.insertRow(); //SE CREA LA FILA 
            var nombrecel = row.insertCell(0);//SE CREA LAS CELDAS 
            var autorcel = row.insertCell(1);
            var preciocel = row.insertCell(2);
            var accionesl = row.insertCell(3);
            
            nombrecel.innerHTML = libro.nombre;// LE PASO A nombrecel.innerHTML LOS PARAMETROS DE LIBRO QUE SE VISUALIZARON EN HTML
            autorcel.innerHTML = libro.autor;
            preciocel.innerHTML = libro.precio;
            var editarBtn = document.createElement('button');//SE CREARA EL BOTON PARA EDITAR DENTRO DEL FORMULARIO
            editarBtn.innerHTML = 'EDITAR';// LE PONGO EL NOMBRE AL BOTON
            editarBtn.addEventListener("click", function(){editar(index);});//SE CREA EL EVENTO click Y PASO UNA FUNCION ANONIMA Y DESPUES SE LANSA LA FUNCION editar Y SE LE PASA index PARA SABER DONDE ESTA
            accionesl.appendChild (editarBtn);//SE LANSA EL BOTON EN LA TABLA
            var eliminatBtn = document.createElement('button');
            eliminatBtn.innerHTML = 'ELIMINAR';
            //eliminarBtn.addEventListener("click", function(){eliminar(index);});
            eliminatBtn.addEventListener("click", function(){eliminar(index);});
            accionesl.appendChild (eliminatBtn);
        });
   
};
function eliminar(index){
    console.log("eliminado")
    listaLibros.splice(index,1);
    creacionTabla();
};




function editar(index){
    
    document.getElementById('save').disabled=true;// DESACTIVO EL BOTON CAPTURAR 
    document.getElementById('edit').disabled=false;// SE ACTIVA EL BOTON CANCELAR
    document.getElementById('cancel').disabled=false;// SE ACTIVA EL BOTON CANCELAR
    console.log("editado ", index);
    var edicion = listaLibros[index];
    let nombre = document.getElementById('nombre');//OBTENGO LOS ELEMENTOS Y LOS GUARDO EN SUS VARIABLES
    let precio = document.getElementById('precio');
    let autor = document.getElementById('autor');
    
        nombre.value = edicion.nombre;//LE ASIGNARE EL VALOR OBTENIDO DEL INDEX POR CADA CAMPO Y 
        precio.value = edicion.precio;
        autor.value = edicion.autor;
        let posicion = document.getElementById('posicionLabel');

        posicion.value = index;
        
        editBtn.addEventListener('click', ()=>{
            console.log('aqui');
            let nombre = document.getElementById('nombre');//OBTENGO LOS ELEMENTOS Y LOS GUARDO EN SUS VARIABLES
            let precio = document.getElementById('precio');
            let autor = document.getElementById('autor');
            let posicion = document.getElementById('posicionLabel');
            var confirmacion = confirm('ESTA SEGURO DE EDITAR');
            
            if(confirmacion == true){
                if(nombre.value == "" || precio.value== "" || autor.value== "")
                {
                   console.log('entro al vacio'); 
                }else
                {
                    listaLibros[posicion.value].nombre = nombre.value;
                    listaLibros[posicion.value].autor = autor.value;
                    listaLibros[posicion.value].precio = precio.value;
                    creacionTabla();
                    limpiar();
                    posicion.value = '';
                    document.getElementById('edit').disabled=true;
                    document.getElementById('cancel').disabled=true;
                    document.getElementById('save').disabled=false;
                }
            }else{
                limpiar();
                    posicion.value = '';
                    document.getElementById('edit').disabled=true;
                    document.getElementById('cancel').disabled=true;
                    document.getElementById('save').disabled=false;
            }       
        });    
};

function limpiar(){
        nombre.value = '';
        precio.value = '';
        autor.value ='';
        
};

cancelBtn.addEventListener('click', function(){
    document.getElementById('edit').disabled=true;
    document.getElementById('cancel').disabled=true;
    limpiar();

} );