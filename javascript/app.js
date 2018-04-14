var body = document.getElementById('body');
var TieneTabla = false;

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
            // console.log(elementos[i - 1][j - 1].x + ", " + elementos[i - 1][j - 1].y);
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
        document.getElementById('btn-random').remove();
        document.getElementById('btn-Nash').remove();
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
        var buttonRandom = document.createElement('button');
        var buttonNash = document.createElement('button');

        // Se genera el boton para valores random
        buttonRandom.setAttribute('id', 'btn-random');
        buttonRandom.textContent = "Generar valores Random";
        contenedor.appendChild(buttonRandom);

        // Se genera el boton para valores random
        buttonNash.setAttribute('id', 'btn-Nash');
        buttonNash.textContent = "Resolver";
        contenedor.appendChild(buttonNash);

        // Se gerera la tabla
        table.setAttribute('id', 'miTabla');
        contenedor.appendChild(table);
        // Se crea la tabla
        crearTabla(table, filas, columnas);

        // Se genera el contenedor para las respuestas
        respuestas.setAttribute('id', 'respuestas');
        respuestas.appendChild(document.createElement("p"));

        buttonRandom.addEventListener('click', e => {
            /* ===== inicio: GENERADOR DE ELEMENTOS ALEATORIOS ===== */
            var elementos = generarRandoms(filas, columnas);
            /* ===== fin: GENERADOR DE ELEMENTOS ALEATORIOS ===== */

            /* ===== inicio: llenar la tabla ===== */
            // llenarTabla(elementos, filas, columnas);
            /* ===== fin: llenar la tabla ===== */

            inputsRandom(elementos);

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
            console.log('filas: ' + mayoresFila);
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
            console.log('columnas: ' + mayoresColumna);
            // ----fin: SUBRAYAR
            // ----inicio: ENCONTRAR RESPUESTA
            // Recorrer por columnas
            for (let i = 0; i < filas; ++i) {
                for (let j = 0; j < columnas; ++j) {
                    if (elementos[i][j].y == mayoresFila[i]) {
                        console.log('indice fila: ' + j);
                        break;
                    }
                }
            }
            // Recorrer por filas
            for (let j = 0; j < columnas; ++j) {
                for (let i = 0; i < filas; ++i) {
                    if (elementos[i][j].x == mayoresColumna[j]) {
                        console.log('indice columna: ' + i);
                        break;
                    }
                }
            }
            // ----fin: ENCONTRAR RESPUESTA
            /* ===== fin: ENCONTRAR EQUILIBRIO DE NASH EN ESTRATEGIA PURA ===== */
        })
        buttonNash.addEventListener('click', () => {
            // Primero, extraemos los valores de los imput;
            // ObtenerTabla devolverá una matriz cuadrada hecha conformada por CElemento;
            let elementos = obtenerTabla(table);

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
                }
            }

            // Mostramos la respuesta si existe
            // Una respuesta existe si y solo si los elementos "X" e "Y" son los mayores en cada fila y columna a la vez

            let solucion = "ENEP = {";
            for (let i = 0; i < elementos.length; i++) {
                for (let j = 0; j < elementos.length; j++) {
                    if (elementos[i][j].rptaX == true && elementos[i][j].rptaY == true)
                        solucion += "(A" + (i + 1) + ", B" + (j + 1) + "), ";
                }
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