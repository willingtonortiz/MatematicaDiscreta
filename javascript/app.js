var body = document.getElementById('body');
var TieneTabla = false;

document.getElementById('Generar').addEventListener('click', e => {
    if (TieneTabla) {
        document.getElementById('tabla').remove();
        TieneTabla = false;
    }
    e.target.setAttribute('disabled', 'disabled');

    if (!TieneTabla) {
        TieneTabla = true;
        var filas = parseInt(document.getElementById('filas').value);
        var columnas = parseInt(document.getElementById('columnas').value);
        var table = document.createElement('table');
        table.setAttribute('id', 'tabla');
        body.appendChild(table);
        for (let i = 0; i < filas + 1; i++) {
            var tr = document.createElement('tr');
            table.appendChild(tr);
        }
        var _tr = document.getElementsByTagName('tr');

        console.log('filas: ' + filas);
        console.log('columnas: ' + columnas);

        // inicio: GENERADOR DE ELEMENTOS ALEATORIOS
        var elementos = new Array(filas);
        for (let i = 0; i < filas; ++i) {
            elementos[i] = new Array(columnas);
        }
        for (let i = 0; i < filas; ++i) {
            for (let j = 0; j < columnas; ++j) {
                var elemento = { x: Math.floor(Math.random() * 11), y: Math.floor(Math.random() * 11) };
                elementos[i][j] = elemento;
            }
        }
        console.log(elementos);
        // fin: GENERADOR DE ELEMENTOS ALEATORIOS
        // inicio: ENCONTRAR EQUILIBRIO DE NASH EN ESTRATEGIA PURA
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
                if (mayorFila < elementos[i][j].y)
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
                if (mayorColumna < elementos[i][j].x)
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
                if (elementos[i][j].y == mayoresFila[i])
                    console.log('indice fila: ' + j);
            }
        }
        // Recorrer por filas
        for (let j = 0; j < columnas; ++j) {
            for (let i = 0; i < filas; ++i) {
                if (elementos[i][j].x == mayoresColumna[j])
                    console.log('indice columna: ' + i);
            }
        }
        // ----fin: ENCONTRAR RESPUESTA
        // fin: ENCONTRAR EQUILIBRIO DE NASH EN ESTRATEGIA PURA

        for (let i = 0; i < _tr.length; ++i) {
            for (let j = 0; j < columnas + 1; ++j) {
                if (i == 0) {
                    var th = document.createElement('th');
                    _tr[i].appendChild(th);
                    if (j != 0) {
                        th.textContent = "Opcion " + j;
                    }
                    else {
                        th.textContent = "\t\t";
                    }
                }
                else {
                    var td = document.createElement('td');
                    _tr[i].appendChild(td)
                    if (j == 0) {
                        td.textContent = "Opcion " + i;
                    }
                }
            }
        }
    }
})