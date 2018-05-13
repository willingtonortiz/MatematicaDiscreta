var body = document.getElementById('body');
var TieneTabla = false;
var deleteTarget = false;
var targetSize = 0;
var arrElementoSeleccionados = [];
var arrElementoNoSeleccionados =[];
var firstCallBtnPura = false;
// Funcion para que cada vez que recargue la pagina los valores de los inputs desaparezcan
function reloadValueInput() {
    document.getElementById('filas').value = "";
    document.getElementById('columnas').value = "";
}
// Llamada al evento ReloadValueInput();
reloadValueInput();

// Clase para cada elemento random
class CElemento {
    constructor(x, y) {
        this.x = x || Math.floor(Math.random() * 11);
        this.y = y || Math.floor(Math.random() * 11);
        if (x == 0) this.x = 0;
        if (y == 0) this.y = 0;
        this.rptaX = false;
        this.rptaY = false;
    }
}

// Función para crear tablas
function crearTabla(table, filas, columnas) {
    for (let i = 0; i < filas + 1; i++) {
        var tr = document.createElement('tr');
        table.appendChild(tr);
        for (let j = 0; j < columnas + 1; ++j) {
            if (i == 0) {
                var th = document.createElement('th');
                tr.appendChild(th);
                if (j != 0) {
                    th.textContent = "B" + j;
                }
            } else {
                var td = document.createElement('td');
                tr.appendChild(td)
                if (j == 0) {
                    td.textContent = "A" + i;
                } else {
                    var inputZelda = document.createElement('input');
                    inputZelda.setAttribute('id', 'td-' + i + '-' + j);
                    inputZelda.setAttribute('class', 'zelda-input');
                    inputZelda.setAttribute('type', 'text');
                    td.appendChild(inputZelda);
                }
            }
        }
    }
}

// Función llenar los imputs con número random
function inputsRandom(elementos) {
    var inputsZeldas = document.getElementsByClassName('zelda-input');
    for (var i = 0; i < inputsZeldas.length; i++) {
        inputsZeldas[i].value = elementos[Math.floor(i / elementos[0].length)][i % elementos.length].x + ", " + elementos[Math.floor(i / elementos[0].length)][i % elementos.length].y;

    }
}




function getPositionOfINputs(x) {
    // Definicion de los inputs
    var targetInput = document.getElementsByClassName('zelda-input');
    // Arreglo para almacenar los valores de x 
    // Por ejemplo el inpuit numero 4 y 5 , asi entre otros valores
    var auxArr = [];
    // Vacenado Array
    auxArr.length=0;

    //Almacenando los valores x en el auxArr
    for (var i = 0; i < targetInput.length; i++) {
        if (i == x) {            
            // console.log(x);
            auxArr.push(x);
        }
    }
    // Usando los variables del array para anexar al index de los inputs
    // ---- y añadirle los colores
    for( var j = 0; j<auxArr.length;j++){
        // console.log('Los valores del auxArr: '+(auxArr[j] + 1));
        targetInput[auxArr[j]].classList.add('selected');
    }       
    


}
function unselectedInputs(elx){
    var _unObjetiveInput = document.getElementsByClassName('zelda-input');
    var auxArr_NoSeleccionados  = [];
    //Vaceando Array
    auxArr_NoSeleccionados.length  =0;
    for( var i = 0; i<_unObjetiveInput.length;i++){
        if(i == elx){
            auxArr_NoSeleccionados.push(i);
        }
    }
    for( var j = 0; j<auxArr_NoSeleccionados.length;j++){
        // console.log('Los valores del auxArr_NoSeleccionados: '+ (auxArr_NoSeleccionados[j]+1));
        _unObjetiveInput[auxArr_NoSeleccionados[j]].classList.add('unselected');
    }
}


// Función para generar elementos aleatorios
function generarRandoms(filas, columnas) {
    // Se crea una matriz con los datos
    // Primero se crea el arreglo de columnas
    var elementos = [];
    for (let i = 0; i < filas; ++i) {
        // Luego se crea el arreglo para cada columna
        elementos[i] = [];

        // Después se generan los x e y random
        for (let j = 0; j < columnas; ++j) {
            elementos[i][j] = new CElemento();
        }
    }
    return elementos;
}

// Función para llenar la tabla con los elementos otorgados
function llenarTabla(elementos, filas, columnas) {
    // Obtener una referencia a la tabla
    var miTabla = document.getElementById('miTabla');
    // Obtener todas las filas de la tabla
    var tablaFilas = miTabla.getElementsByTagName('tr');
    // Se inicializa en "1" porque la primera fila no se cuenta
    for (let i = 1; i < filas + 1; i++) {
        // Se obtiene una referencia a las celdas que se encuentren en dicha fila
        var tablaColumnas = tablaFilas[i].getElementsByTagName('td');
        // Se inicializa en "1" porque la primera columna no se cuenta
        for (let j = 1; j < columnas + 1; j++) {
            //  console.log(elementos[i - 1][j - 1].x + ", " + elementos[i - 1][j - 1].y);
            // Se agrega el contenido a cada una de las celdas
            tablaColumnas[j].textContent = elementos[i - 1][j - 1].x + ", " + elementos[i - 1][j - 1].y;
        }
    }
}

// Función para leer la tabla y generar una matriz de ella
function obtenerTabla(tabla) {
    let filas = tabla.getElementsByTagName("tr");
    var elementos = [];
    for (let i = 1; i < filas.length; i++) {
        let columnas = filas[i].getElementsByTagName("td");
        elementos.push([]);
        for (let j = 1; j < columnas.length; j++) {
            let valor = columnas[j].getElementsByTagName("input")[0].value;
            valor = valor.split(",");
            elementos[i - 1].push(new CElemento(parseInt(valor[0]), parseInt(valor[1])));
        }
    }
    return elementos;
}

document.getElementById('Generar').addEventListener('click', e => {
    if (TieneTabla) {
        document.getElementById('miTabla').remove();
        document.getElementById('btn-container').remove();
        // document.getElementById('btn-random').remove();
        // document.getElementById('btn-Nash-Pura').remove();
        // document.getElementById('btn-Nash-Mixta').remove();
        // document.getElementById('divFather').remove();
        TieneTabla = false;
    }

    if (!TieneTabla) {
        TieneTabla = true;
        // Declaración y definición de variables
        let contenedor = document.getElementById("tablas");
        let respuestas = document.getElementById("respuestas");
        var filas = parseInt(document.getElementById('filas').value);
        var columnas = parseInt(document.getElementById('columnas').value);

        // Se crea la tabla de contenidos y los botones
        var table = document.createElement('table');
        var buttonContenedor = document.createElement('div');
        var buttonRandom = document.createElement('button');
        var buttonNashPura = document.createElement('button');
        var buttonNashMixta = document.createElement('button');

        // Se genera el contenedor para los botones
        buttonContenedor.setAttribute('id','btn-container');

        // Se genera el boton para valores random
        buttonRandom.setAttribute('id', 'btn-random');
        buttonRandom.textContent = "Generar valores Random";
        buttonContenedor.appendChild(buttonRandom);

        // Se genera el boton para hacer las estrategias Puras
        buttonNashPura.setAttribute('id', 'btn-Nash-Pura');
        buttonNashPura.textContent = "Estrategias Puras";
        buttonContenedor.appendChild(buttonNashPura);

        // Se genera el boton para hacer las estrategias mixtas

        buttonNashMixta.setAttribute('id', 'btn-Nash-Mixta');
        buttonNashMixta.textContent = 'Estrategia Mixta';
        buttonContenedor.appendChild(buttonNashMixta);

        contenedor.appendChild(buttonContenedor);
        // Se gerera la tabla
        table.setAttribute('id', 'miTabla');
        contenedor.appendChild(table);
        // Se crea la tabla
        crearTabla(table, filas, columnas);

        var xmZeldaInput = document.getElementsByClassName('zelda-input');
        
        // Quitar los estilos al momento de modificar algun input 
        for(var q =0; q<xmZeldaInput.length;q++){
            xmZeldaInput[q].addEventListener('keypress',e=>{
                if(firstCallBtnPura){
                    for( var i=0; i<arrElementoSeleccionados.length;i++){
                        // console.log('Elementos Seleccionados anterior: '+  arrElementoSeleccionados[i]);
                        xmZeldaInput[arrElementoSeleccionados[i]-1].classList.remove('selected');
                    }
                    for( var j=0; j<arrElementoNoSeleccionados.length;j++){
                        xmZeldaInput[arrElementoNoSeleccionados[j] - 1].classList.remove('unselected');
                    }
                }
            })
        }

        // Se genera el contenedor para las respuestas
        respuestas.setAttribute('id', 'respuestas');
        respuestas.appendChild(document.createElement("p"));

        buttonRandom.addEventListener('click', e => {

            /* ===== inicio: GENERADOR DE ELEMENTOS ALEATORIOS ===== */
            var elementos = generarRandoms(filas, columnas);
            var __ZeldaInputs = document.getElementsByClassName('zelda-input');
            /* ===== fin: GENERADOR DE ELEMENTOS ALEATORIOS ===== */

            /* ===== inicio: llenar la tabla ===== */
            // llenarTabla(elementos, filas, columnas);
            /* ===== fin: llenar la tabla ===== */
            if(firstCallBtnPura){
                console.log('Segunda vez que generas valores');
                for( var i=0; i<arrElementoSeleccionados.length;i++){
                        __ZeldaInputs[arrElementoSeleccionados[i]-1].classList.remove('selected');
                }
                for( var j=0; j<arrElementoNoSeleccionados.length;j++){
                    __ZeldaInputs[arrElementoNoSeleccionados[j] - 1].classList.remove('unselected');
                }
            }
            inputsRandom(elementos);
            
            //Borrar los elementos seleccionados anteriormente
  

            /* ===== inicio: ENCONTRAR EQUILIBRIO DE NASH EN ESTRATEGIA PURA ===== */
            var mayoresFila = [];
            var mayoresColumna = [];
            var mayorFila;
            var mayorColumna;
            // ----inicio: SUBRAYAR
            // Recorrer por columnas
            for (let i = 0; i < filas; ++i) {
                for (let j = 0; j < columnas; ++j) {
                    if (j == 0)
                        mayorFila = elementos[i][j].y;
                    else if (mayorFila < elementos[i][j].y)
                        mayorFila = elementos[i][j].y;
                }
                mayoresFila.push(mayorFila);
            }
            //   console.log('filas: ' + mayoresFila);

            // Recorrer por filas
            for (let j = 0; j < columnas; ++j) {
                for (let i = 0; i < filas; ++i) {
                    if (i == 0)
                        mayorColumna = elementos[i][j].x;
                    else if (mayorColumna < elementos[i][j].x)
                        mayorColumna = elementos[i][j].x;
                }
                mayoresColumna.push(mayorColumna);
            }
            //  console.log('columnas: ' + mayoresColumna);
            // ----fin: SUBRAYAR
            // ----inicio: ENCONTRAR RESPUESTA
            // Recorrer por columnas
            for (let i = 0; i < filas; ++i) {
                for (let j = 0; j < columnas; ++j) {
                    if (elementos[i][j].y == mayoresFila[i]) {
                        //  console.log('indice fila: ' + j);
                        break;
                    }
                }
            }
            // Recorrer por filas
            for (let j = 0; j < columnas; ++j) {
                for (let i = 0; i < filas; ++i) {
                    if (elementos[i][j].x == mayoresColumna[j]) {
                        // console.log('indice columna: ' + i);
                        break;
                    }
                }
            }
            // ----fin: ENCONTRAR RESPUESTA
            /* ===== fin: ENCONTRAR EQUILIBRIO DE NASH EN ESTRATEGIA PURA ===== */
        })
        // Llamada de evento Estrategia Pura
        buttonNashPura.addEventListener('click', () => {
            firstCallBtnPura = true;
            arrElementoSeleccionados.length = 0;
            arrElementoNoSeleccionados.length = 0;
            // Primero, extraemos los valores de los imput;
            // ObtenerTabla devolverá una matriz cuadrada hecha conformada por CElemento;
            let elementos = obtenerTabla(table);
            var _x;
            var _y;
            //Borra el target 
            

            // Buscamos el mayor valor por filas de "B", es decir, el mayor "y" de cada fila
            // Y su propiedad "seleccionado" la cambiamos por true.
            for (let i = 0; i < elementos.length; i++) {
                let mayor = 0;
                for (let j = 0; j < elementos[i].length; j++) {
                    mayor = Math.max(mayor, elementos[i][j].y);

                }
                for (let j = 0; j < elementos[i].length; j++) {
                    if (mayor == elementos[i][j].y)
                        elementos[i][j].rptaY = true;
                    x = i;

                }
            }

            // Buscamos el mayor valor por columnas de "A", es decir, el mayor "x" de cada columna
            // Y su propiedad "seleccionado" la cambiamos por true.
            for (let i = 0; i < elementos.length; i++) {
                let mayor = 0;
                for (let j = 0; j < elementos[i].length; j++) {
                    mayor = Math.max(mayor, elementos[j][i].x);
                }
                for (let j = 0; j < elementos[i].length; j++) {
                    if (mayor == elementos[j][i].x)
                        elementos[j][i].rptaX = true;
                    y = i;
                }
            }
            // Mostramos la respuesta si existe
            // Una respuesta existe si y solo si los elementos "X" e "Y" son los mayores en cada fila y columna a la vez

            let solucion = "ENEP = {";
            for (let i = 0; i < elementos.length; i++) {
                for (let j = 0; j < elementos.length; j++) {                               //Condicional para mostrar el target 
                    if (elementos[i][j].rptaX == true && elementos[i][j].rptaY == true) {
                        // algoritmo para hallar el indice del del arreglo               
                        _x = i;
                        _y = j;
                        var total = _x * (elementos.length) + (_y + 1);
                        // getPositionOfINputs(total - 1);
                        arrElementoSeleccionados.push(total);

                        // deleteTarget = true;
                        solucion += "(A" + (i + 1) + ", B" + (j + 1) + "), ";
                    }
                    else{
                        _x = i;
                        _y = j;
                        total = _x * (elementos.length) + (_y+1);
                        arrElementoNoSeleccionados.push(total);
                    }

                }
            }
            
            for(var k =0; k<arrElementoSeleccionados.length;k++){
                
                getPositionOfINputs(arrElementoSeleccionados[k] - 1);
            }

            for( var j = 0; j<arrElementoNoSeleccionados.length;j++){
                unselectedInputs(arrElementoNoSeleccionados[j] - 1);
            }


            solucion = solucion.slice(0, -2);
            solucion += "}";
            if (solucion !== "ENEP =}")
                respuestas.firstElementChild.innerText = solucion;
            else
                respuestas.firstElementChild.innerText = "No hay respuesta en estrategias puras";

        });


    }
})
