var body = document.getElementById('body');
var TieneTabla = false;

document.getElementById('Generar').addEventListener('click', e => {
    if (TieneTabla) {
        document.getElementById('miTabla').remove();
        document.getElementById('btn-random').remove();
        document.getElementById('btn-Nash').remove();
        TieneTabla = false;
    }
    // e.target.setAttribute('disabled', 'disabled');

    if (!TieneTabla) {
        TieneTabla = true;
        // Declaración y definición de variables
        var filas = parseInt(document.getElementById('filas').value);
        var columnas = parseInt(document.getElementById('columnas').value);
        // Se crea la tabla de contenidos
        var table = document.createElement('table');
        var buttonRandom = document.createElement('button');
        var buttonNash =  document.createElement('button');

        buttonRandom.setAttribute('id','btn-random');
        buttonRandom.textContent = "Generar valores Random";
        body.appendChild(buttonRandom);

        buttonNash.setAttribute('id','btn-Nash');
        buttonNash.textContent ="INVOCO A NASH!!";
        body.appendChild(buttonNash);

        // Se le agrega a la tabla un ID
        table.setAttribute('id', 'miTabla');

        // Se agrega la tabla al body
        body.appendChild(table);

        for (let i = 0; i < filas + 1; i++) {
            var tr = document.createElement('tr');
            table.appendChild(tr);
            for (let j = 0; j < columnas + 1; ++j) {
                if (i == 0) {
                    var th = document.createElement('th');
                    tr.appendChild(th);
                    if (j != 0) {
                        th.textContent = "Opcion " + j;
                    }
                }
                else {
                    var td = document.createElement('td');
                    tr.appendChild(td)
                    if (j == 0) {
                        td.textContent = "Opcion " + i;
                    }
                    else{
                        var inputZelda  =document.createElement('input');
                        inputZelda.setAttribute('id','td-'+i+'-'+j);
                        inputZelda.setAttribute('class','zelda-input');
                        inputZelda.setAttribute('placeholder','Ingrese los valores');
                        inputZelda.setAttribute('type','text');
                        td.appendChild(inputZelda);
                    }
                }
            }
        }
        // console.log('filas: ' + filas);
        // console.log('columnas: ' + columnas);

        buttonRandom.addEventListener('click', e => {
            /* ===== inicio: GENERADOR DE ELEMENTOS ALEATORIOS ===== */

            // Se crea una matriz con los datos
            // Primero se crea el arreglo de columnas

            var elementos = new Array(filas);
            var _inputsZeldas=  document.getElementsByClassName('zelda-inṕut');
            for(var i =0; i<_inputsZeldas.length; i++)
            {
                _inputsZeldas[i].remove();
            }
            for (let i = 0; i < filas; ++i) {
                // Luego se crea el arreglo para cada columna
                elementos[i] = new Array(columnas);
                // Después se generan los x e y random
                for (let j = 0; j < columnas; ++j) {
                    var elemento = {
                        x: Math.floor(Math.random() * 11),
                        y: Math.floor(Math.random() * 11)
                    };
                    elementos[i][j] = elemento;
                    // console.log("elemento[" + i + "][" + j + "] = " + elemento.x + ", " + elemento.y);

                }
            }
            /* ===== fin: GENERADOR DE ELEMENTOS ALEATORIOS ===== */

            /* ===== inicio: llenar la tabla ===== */
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
            /* ===== fin: llenar la tabla ===== */

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
    }
})


