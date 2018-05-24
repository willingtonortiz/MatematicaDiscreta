// CLASE PARA CADA ELEMENTO DEL INPUT
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

// CLASE QUE LE DA LOS ESTILOS A LOS INPUTS
class CEstilos {
    constructor() {
        this.Seleccionados = [];
        this.NoSeleccionados = [];
    }
    // AGREGAR los estilos al momento de modificar algun input
    marcarRespuestas() {
        let inputs = document.getElementsByClassName('zelda-input');
        for (var i = 0; i < this.Seleccionados.length; i++) {
            inputs[this.Seleccionados[i]].classList.add('selected');
        }
        for (var i = 0; i < this.NoSeleccionados.length; i++) {
            inputs[this.NoSeleccionados[i]].classList.add('unselected');
        }
    }
    // Quitar los estilos al momento de modificar algun input
    quitarLosEstilos() {
        let inputs = document.getElementsByClassName('zelda-input');
        while (this.Seleccionados.length > 0) {
            inputs[this.Seleccionados[0]].classList.remove('selected');
            this.Seleccionados.shift();
        }
        while (this.NoSeleccionados.length > 0) {
            inputs[this.NoSeleccionados[0]].classList.remove('unselected');
            this.NoSeleccionados.shift();
        }
    }
}

// SE DECLARAN VARIABLES GLOBALES
var TieneTabla = false;
var estilosInputs = new CEstilos();

// LOS INPUTS DEBEN ESTAR VACIOS CUANDO SE REINICIE EL NAVEGADOR
document.getElementById('filas').value = "";
document.getElementById('columnas').value = "";

// FUNCIÓN PARA CREAR TABLAS
function crearTabla(table, filas, columnas) {
    for (let i = 0; i < filas + 1; i++) {
        var tr = document.createElement('tr');
        table.appendChild(tr);
        for (let j = 0; j < columnas + 1; ++j) {
            if (i == 0) {
                var th = document.createElement('th');
                tr.appendChild(th);
                if (j != 0) {
                    // SE CREA UN INPUT
                    var inputZelda = crearInput('cabecera');
                    inputZelda.value = "A" + j;
                    th.appendChild(inputZelda);
                    llenadoAutomatico(inputZelda, j, 'primero');
                }
            }
            else {
                var td = document.createElement('td');
                tr.appendChild(td)
                if (j == 0) {
                    var inputZelda = crearInput('cabecera');
                    inputZelda.value = "A" + i;
                    llenadoAutomatico(inputZelda, i, 'segundo')
                    td.appendChild(inputZelda);
                } else {
                    // CREANDO CADA INPUT
                    var inputZelda = crearInput('zelda-input');
                    inputZelda.setAttribute('id', 'td-' + i + '-' + j);
                    td.appendChild(inputZelda);
                }
            }
        }
    }
}

function llenadoAutomatico(input, indice, tipo) {
    input.addEventListener('keyup', () => {
        let elementos = document.getElementsByClassName('cabecera');
        let cambiado;
        if (tipo === 'primero') cambiado = elementos[indice - 1 + elementos.length / 2];
        else cambiado = elementos[indice - 1];
        cambiado.value = input.value;
    });
}

// FUNCIÓN PARA CREAR UN INPUT CON LOS ATRIBUTOS SETEADOS
function crearInput(tipo) {
    var inputTemp = document.createElement('input');
    inputTemp.setAttribute('type', 'text');
    inputTemp.setAttribute('class', tipo);
    return inputTemp;
}

// FUNCIÓN PARA LLENAR LOS INPUTS CON NÚMEROS RANDOM
function llenarTabla(elementos) {
    var inputsZeldas = document.getElementsByClassName('zelda-input');
    for (var i = 0; i < inputsZeldas.length; i++) {
        inputsZeldas[i].value = elementos[Math.floor(i / elementos[0].length)][i % elementos.length].x + ", " + elementos[Math.floor(i / elementos[0].length)][i % elementos.length].y;
    }
}

// FUNCIÓN PARA GENERAR ELEMENTOS RANDOM
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

// FUNCIÓN PARA GENERAR UNA MATRIZ A PARTIR DE LA TABLA
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

// CUERPO DEL PROGRAMA
document.getElementById('Generar').addEventListener('click', e => {
    if (TieneTabla) {
        document.getElementById('miTabla').remove();
        document.getElementById('btn-container').remove();
        TieneTabla = false;
    }

    if (!TieneTabla) {
        TieneTabla = true;
        // DECLARACIÓN Y DEFINICIÓN DE VARIABLES
        let contenedor = document.getElementById("tablas");
        let respuestas = document.getElementById("respuestas");
        var filas = parseInt(document.getElementById('filas').value);
        var columnas = parseInt(document.getElementById('columnas').value);

        // SE CREA LA TABLA DE CONTENIDOS Y LOS BOTONES
        var table = document.createElement('table');
        var buttonContenedor = document.createElement('div');
        var buttonRandom = document.createElement('button');
        var buttonNashPura = document.createElement('button');
        var buttonNashMixta = document.createElement('button');

        // SE GENERA EL CONTENEDOR PARA LOS BOTONES
        buttonContenedor.setAttribute('id', 'btn-container');

        // SE GENERA EL BOTÓN PARA VALORES RANDOM
        buttonRandom.setAttribute('id', 'btn-random');
        buttonRandom.textContent = "Generar valores Random";
        buttonContenedor.appendChild(buttonRandom);

        // SE GENERA EL BOTÓN PARA HACER LAS ESTRATEGIAS PURAS
        buttonNashPura.setAttribute('id', 'btn-Nash-Pura');
        buttonNashPura.textContent = "Estrategias Puras";
        buttonContenedor.appendChild(buttonNashPura);

        // SE GENERA EL BOTÓN PARA HACER LAS ESTRATEGIAS MIXAS

        buttonNashMixta.setAttribute('id', 'btn-Nash-Mixta');
        buttonNashMixta.textContent = "Estrategia Mixta";
        buttonContenedor.appendChild(buttonNashMixta);

        contenedor.appendChild(buttonContenedor);
        // SE GENERA LA TABLA
        table.setAttribute('id', 'miTabla');
        contenedor.appendChild(table);

        // SE CREA LA TABLA
        crearTabla(table, filas, columnas);

        // SI SE PRESIONA UN BOTÓN EN CUALQUIER INPUT, SE QUITAN LOS ESTILOS
        table.addEventListener('keypress', (e) => {
            estilosInputs.quitarLosEstilos();
        });

        // SE GENERA EL CONTENEDOR PARA LAS RESPUESTAS
        respuestas.setAttribute('id', 'respuestas');
        respuestas.appendChild(document.createElement("p"));

        buttonRandom.addEventListener('click', e => {
            // MATRIZ DE ELEMENTOS
            var elementos = generarRandoms(filas, columnas);

            // LLENADO DE TABLAS
            llenarTabla(elementos, filas, columnas);

            // QUITAR ESTILOS ANTERIORES
            estilosInputs.quitarLosEstilos();
        })

        // Llamada de evento Estrategia Pura
        buttonNashPura.addEventListener('click', () => {
            // QUITAR LOS ESTILOS A LA SOLUCIÓN ANTERIOR
            estilosInputs.quitarLosEstilos();

            // ObtenerTabla devolverá una matriz conformada por CElemento;
            let elementos = obtenerTabla(table);

            // Buscamos el mayor valor por filas de "B", es decir, el mayor "y" de cada fila
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

            let nombresDesiciones = document.getElementsByClassName('cabecera');

            let solucion = "ENEP = {";
            for (let i = 0; i < elementos.length; i++) {
                for (let j = 0; j < elementos[i].length; j++) {
                    // CONDICIÓN PARA QUE SEA UNA RESPUESTA
                    if (elementos[i][j].rptaX == true && elementos[i][j].rptaY == true) {
                        // MARCANDO LOS INPUTS QUE SON RESPUESTAS
                        estilosInputs.Seleccionados.push(i * elementos[i].length + j);

                        // ESTA PARTE DEL CÓDIGO, LA SOLUCIÓN TIENE EN SUS COMPONENTES EL NOMBRE DE LAS DESICIONES
                        solucion += "(" + nombresDesiciones[i + nombresDesiciones.length / 2].value + ", " + nombresDesiciones[j].value + "), ";
                        // SOLUCIÓN ANTIGUA
                        // solucion += "(A" + (i + 1) + ", B" + (j + 1) + "), ";
                    }
                    else {
                        // MARCANDO LOS INPUTS QUE NO SON RESPUESTAS
                        estilosInputs.NoSeleccionados.push(i * elementos[i].length + j);
                    }
                }
            }
            solucion = solucion.slice(0, -2);
            solucion += "}";

            if (solucion !== "ENEP =}")
                respuestas.firstElementChild.innerText = solucion;
            else
                respuestas.firstElementChild.innerText = "No hay respuesta en estrategias puras";

            // MARCAR LAS RESPUESTAS DE CON COLORES NEÓN
            estilosInputs.marcarRespuestas();
        });
    }
})