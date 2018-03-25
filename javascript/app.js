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

        // inicio: GENERADOR DE ELEMENTOS ALEATORIOS
        var elementos = [];
        for (let i = 0; i < _tr.length - 1; ++i) {
            for (let j = 0; j < columnas; ++j) {
                var elemento = { x: Math.floor(Math.random() * 11), y: Math.floor(Math.random() * 11) };
                elementos.push(elemento);
            }
        }
        // Debug
        elementos.forEach(element => {
            console.log(element);
        });
        // fin: GENERADOR DE ELEMENTOS ALEATORIOS

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