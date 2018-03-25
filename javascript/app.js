var body = document.getElementById('body');
var TieneTabla = false;
document.getElementById('Generar').addEventListener('click', e => {

    
    if (TieneTabla) {
        document.getElementById('tabla').remove();
        TieneTabla=false;
    }

    if(!TieneTabla){
        TieneTabla=true;
        var filas = parseInt(document.getElementById('filas').value);
        var columnas = parseInt(document.getElementById('columnas').value);
        var table = document.createElement('table');
        table.setAttribute('id', 'tabla');
        body.appendChild(table);
        for (var i = 0; i < filas + 1; i++) {
            var tr = document.createElement('tr');
            table.appendChild(tr);
        }
        var _tr = document.getElementsByTagName('tr');
        for (var i = 0; i < _tr.length; i++){
            for (var j = 0; j < columnas + 1; j++){
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