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
function crearTablaInputs(table, filas, columnas) {
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
                }
            } else {
                var td = document.createElement('td');
                tr.appendChild(td)
                if (j == 0) {
                    var inputZelda = crearInput('cabecera');
                    inputZelda.value = "A" + i;
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

// FUNCIÓN PARA OBTENER LOS NOMBRES DE LAS CABECERAS
function obtenerNombresCabeceras(filas, columnas) {
    let cabeceras = document.getElementsByClassName('cabecera');
    let matriz = [];

    matriz.push(new Array(columnas));
    for (let i = 0; i < columnas; i++) {
        matriz[0][i] = cabeceras[i].value;
    }
    matriz.push(new Array(filas));
    for (let i = 0; i < filas; i++) {
        matriz[1][i] = cabeceras[i + columnas].value;
    }
    return matriz;
}

// FUNCIÓN PARA CREAR TABLAS NORMALES
function crearTabla(filas, columnas, elementos, nombres) {
    let tabla = document.createElement('table');
    for (let i = 0; i < filas + 1; i++) {
        let fila = document.createElement('tr');
        tabla.appendChild(fila);
        for (let j = 0; j < columnas + 1; ++j) {
            let celda = document.createElement('td');
            celda.setAttribute('class', 'celda');
            fila.appendChild(celda);
            if (i == 0) {
                if (j != 0) {
                    celda.innerText = nombres[0][j - 1];
                }
            } else {
                if (j == 0) {
                    celda.innerText = nombres[1][i - 1];
                } else {
                    celda.innerText = elementos[i - 1][j - 1].x + ", " + elementos[i - 1][j - 1].y;
                }
            }
        }
    }
    return tabla;
}

//FUNCIÓN PARA IMPRIMIR MATRIZ EN CONSOLA
function imprimirMatriz(matriz) {
    for (let i = 0; i < matriz.length; i++) {
        let cadena = "";
        for (let j = 0; j < matriz[i].length; j++) {
            cadena += "[" + matriz[i][j].x + ", " + matriz[i][j].y + "], ";
        }
        console.log(cadena);
    }
    console.log("");
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
        inputsZeldas[i].value = elementos[Math.floor(i / elementos[0].length)][i % elementos[0].length].x + ", " + elementos[Math.floor(i / elementos[0].length)][i % elementos[0].length].y;
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

// FUNCIÓN PARA OBTENER LAS SOLUCIONES DE UN SISTEMA DE ECUACIONES
function eliminacionDeGauss(matriz) {
    let filas = matriz.length;
    let columnas = filas + 1;
    // SIMPLIFICACIÓN DE LA MATRIZ
    for (let i = 0; i < filas; i++) {
        let divisor = matriz[i][i];

        for (let j = 0; j < columnas; j++) {
            matriz[i][j] /= divisor;
        }

        for (let k = 0; k < filas; k++) {
            if (i !== k) {
                let inverso = -1 * matriz[k][i];

                for (let j = 0; j < columnas; j++) {
                    matriz[k][j] += matriz[i][j] * inverso;
                }
            }
        }
    }
    // BÚSQUEDA DE SOLUCIONES
    let soluciones = new Array(filas);
    for (let i = 0; i < filas; i++) {
        soluciones[i] = matriz[i][filas].toFixed(2);
    }
    return soluciones;
}

// OBTIENE LA MATRIZ DE UN JUGADOR A PARTIR DE LA MATRIZ MAESTRA
function generarMatrizJugador(elementos, jugador) {
    let dimension = elementos.length;
    // MATRIZ
    let matriz = new Array(dimension + 1);

    // ARREGLO DE SOLUCIONES
    let solucion = new Array(dimension + 1)

    // LLENADO DE LA MATRIZ
    for (let i = 0; i < matriz.length; i++)
        matriz[i] = new Array(dimension + 1);

    // SE EXTRAEN LOS DATOS Y SE LES MULTIPLICA POR -1
    for (let i = 0; i < dimension + 1; i++) {
        for (let j = 0; j < dimension + 1; j++) {
            if (i !== dimension) {
                if (j === dimension) matriz[i][j] = 1;
                else if (jugador === 'J1') matriz[i][j] = (elementos[i][j].x) * -1;
                else matriz[i][j] = (elementos[j][i].y) * -1;
            } else {
                if (j !== dimension) matriz[i][j] = 1;
                else matriz[i][j] = 0;
            }
        }
    }

    for (let i = 0; i < dimension + 1; i++) {
        if (i === dimension) solucion[i] = 1;
        else solucion[i] = 0;
    }
    return [matriz, solucion];
}

// FUNCIÓN PARA OBTENER LAS SOLUCIONES DE UN SISTEMA DE ECUACIONES
function eliminacionGausianaPro(matriz, solucion) {
    let EPSILON = 1e-10;
    let dimension = solucion.length;

    for (let pivote = 0; pivote < dimension; pivote++) {
        // ENCONTRAR EL PIVOTE FILA Y CAMBIAR
        let max = pivote;

        // SE BUSCA EL MAYOR VALOR PARA LA FILA
        for (let i = pivote + 1; i < dimension; i++) {
            if (Math.abs(matriz[i][pivote]) > Math.abs(matriz[max][pivote])) {
                max = i;
            }
        }

        let temp = matriz[pivote];
        matriz[pivote] = matriz[max];
        matriz[max] = temp;
        let t = solucion[pivote];
        solucion[pivote] = solucion[max];
        solucion[max] = t;

        // SINGULAR O CERCANAMENTE SINGULAR
        if (Math.abs(matriz[pivote][pivote]) <= EPSILON) {
            console.log("No hay solucion");
            return 0;
        }

        // pivot within A and b
        // PIVOTE ENTREN A Y B
        for (let i = pivote + 1; i < dimension; i++) {
            let alpha = matriz[i][pivote] / matriz[pivote][pivote];
            solucion[i] -= alpha * solucion[pivote];
            for (let j = pivote; j < dimension; j++) {
                matriz[i][j] -= alpha * matriz[pivote][j];
            }
        }
    }

    // back substitution
    let x = new Array(dimension);
    for (let i = dimension - 1; i >= 0; i--) {
        let sum = 0.0;
        for (let j = i + 1; j < dimension; j++) {
            sum += matriz[i][j] * x[j];
        }
        x[i] = ((solucion[i] - sum) / matriz[i][i]).toFixed(2);
    }
    return x;
}

// FUNCIÓN PARA GENERAR LOS BOTONES
function crearBotones(contenedorPrincipal) {
    // CONTENEDOR
    let buttonContenedor = document.createElement('div');
    buttonContenedor.setAttribute('id', 'btn-container');
    // RANDOM
    let buttonRandom = document.createElement('button');
    buttonRandom.setAttribute('id', 'btn-random');
    buttonRandom.textContent = "Generar valores Random";
    buttonContenedor.appendChild(buttonRandom);
    // BOTÓN DOMINADAS
    let buttonDominadas = document.createElement('button');
    buttonDominadas.setAttribute('id', 'btn-Nash-dominadas');
    buttonDominadas.textContent = "Estrategias dominadas";
    buttonContenedor.appendChild(buttonDominadas);
    // BOTÓN PURAS
    let buttonPura = document.createElement('button');
    buttonPura.setAttribute('id', 'btn-Nash-Pura');
    buttonPura.textContent = "Estrategias Puras";
    buttonContenedor.appendChild(buttonPura);
    // BOTÓN MIXTAS
    let buttonMixta = document.createElement('button');
    buttonMixta.setAttribute('id', 'btn-Nash-Mixta');
    buttonMixta.textContent = "Estrategia Mixta";
    buttonContenedor.appendChild(buttonMixta);
    // SE AGREGA AL CONTENEDOR PRINCIPAL
    contenedorPrincipal.appendChild(buttonContenedor);
}

function crearContenedorTexto(tipo, texto) {
    let contenedor = document.createElement(tipo);
    contenedor.innerText = texto;
    return contenedor;
}

// CUERPO DEL PROGRAMA
document.getElementById('Generar').addEventListener('click', e => {

    // SI HABÍA CONTENIDO EN LAS SOLUCIONES, SE ELIMINA
    document.getElementById('soluciones').innerHTML = "";

    if (TieneTabla) {
        document.getElementById('miTabla').remove();
        document.getElementById('btn-container').remove();
        TieneTabla = false;
    }

    if (!TieneTabla) {
        TieneTabla = true;
        // DECLARACIÓN Y DEFINICIÓN DE VARIABLES
        let contenedorPrincipal = document.getElementById('principal');
        let filas = parseInt(document.getElementById('filas').value);
        let columnas = parseInt(document.getElementById('columnas').value);

        /* SE GENERAN LOS BOTONES */
        crearBotones(contenedorPrincipal);

        /* SE CREA LA TABLA CON LOS INPUTS */
        let table = document.createElement('table');
        table.setAttribute('id', 'miTabla');
        crearTablaInputs(table, filas, columnas); // AGREGANDO INPUTS
        contenedorPrincipal.appendChild(table);
        table.addEventListener('keypress', (e) => {
            estilosInputs.quitarLosEstilos();
        }); // SI SE PRESIONA UN BOTÓN EN CUALQUIER INPUT, SE QUITAN LOS ESTILOS

        // LLAMADA AL EVENTO BOTÓN RANDOM
        document.querySelector('#btn-random').addEventListener('click', () => {
            // MATRIZ DE ELEMENTOS
            let elementos = generarRandoms(filas, columnas);

            // LLENADO DE LOS INPUTS DE LA TABLA
            llenarTabla(elementos, filas, columnas);

            // QUITAR ESTILOS ANTERIORES
            estilosInputs.quitarLosEstilos();
        });

        /* ===== SOLUCIÓN EN ESTRATEGIAS DOMINADAS ===== */
        document.querySelector('#btn-Nash-dominadas').addEventListener('click', () => {
            // SE OBTIENE EL CONTENEDOR EN DONDE SE COLOCARÁN LAS TABLAS SIMPLIFICADAS
            let contenedorDominadas = document.getElementById('soluciones');
            contenedorDominadas.innerHTML = '';

            // SE OBTIENEN LOS NOMBRES DE LAS CABECERAS
            let nombresCabeceras = obtenerNombresCabeceras(filas, columnas);

            //SE OBTIENEN LOS ELEMENTOS A PARTIR DE LA TABLA
            let elementos = obtenerTabla(table);
            let mayor, menor;
            let existeEliminacion;
            let turno = true;
            let paso = 0;
            let nombreEliminado = "";
            do {
                existeEliminacion = false;
                if (turno) {
                    let eliminados;
                    // SE ANALIZA EN FILAS
                    for (let i = 0; i < elementos.length; i++) {
                        for (let j = i; j < elementos.length; j++) {
                            mayor = 0;
                            menor = 0;
                            for (let k = 0; k < elementos[i].length; k++) {
                                if (elementos[i][k].x > elementos[j][k].x) {
                                    mayor++;
                                } else if (elementos[i][k].x < elementos[j][k].x) {
                                    menor++;
                                }
                            }
                            if (mayor === elementos[0].length || menor === elementos[0].length) {
                                existeEliminacion = true;
                                if (mayor > menor) eliminados = j;
                                else eliminados = i;
                                break;
                            }
                        }
                        if (existeEliminacion) break;
                    }
                    if (existeEliminacion) {
                        elementos.splice(eliminados, 1);
                        nombreEliminado = nombresCabeceras[1].splice(eliminados, 1);
                    }
                } else {
                    let eliminados;
                    // SE ANALIZA EN COLUMNAS
                    for (let i = 0; i < elementos[0].length; i++) {
                        for (let j = i; j < elementos[0].length; j++) {
                            mayor = 0;
                            menor = 0;
                            for (let k = 0; k < elementos.length; k++) {
                                if (elementos[k][i].y > elementos[k][j].y) {
                                    mayor++;
                                } else if (elementos[k][i].y < elementos[k][j].y) {
                                    menor++;
                                }
                            }
                            if (mayor === elementos.length || menor === elementos.length) {
                                existeEliminacion = true;
                                if (mayor > menor) eliminados = j;
                                else eliminados = i;
                                break;
                            }
                        }
                    }
                    if (existeEliminacion) {
                        for (let i = 0; i < elementos.length; i++) {
                            elementos[i].splice(eliminados, 1);
                        }
                        nombreEliminado = nombresCabeceras[0].splice(eliminados, 1);
                    }
                }
                if (existeEliminacion) {
                    // SE INVIERTE EL TURNO DEL JUGADOR
                    paso++;
                    if (paso === 1) {
                        contenedorDominadas.appendChild(crearContenedorTexto('h2', 'Estrategias Dominadas'));
                    }
                    turno = !turno;
                    let tablaTemp = crearTabla(elementos.length, elementos[0].length, elementos, nombresCabeceras);
                    tablaTemp.setAttribute('class', 'tablaDominada');
                    let texto = 'Paso ' + paso + ': Se elimina ' + ((turno) ? 'la columna' : 'la fila') + ' dominada ' + nombreEliminado;
                    contenedorDominadas.appendChild(crearContenedorTexto('p', texto))
                    contenedorDominadas.appendChild(tablaTemp);
                }
            } while (existeEliminacion);
            if (paso === 0 || (nombresCabeceras[0].length !== 1 && nombresCabeceras[1].length !== 1)) {
                contenedorDominadas.appendChild(crearContenedorTexto('h2', 'No hay solución en Estrategias Dominadas'));
            } else {
                let respuesta = 'Equilibrio de Nash en "Estrategias Dominadas" = {(' + nombresCabeceras[1][0] + ", " + nombresCabeceras[0][0] + ")}";
                contenedorDominadas.appendChild(crearContenedorTexto('p', respuesta));
            }
        });

        /* ===== SOLUCIÓN EN ESTRATEGIAS PURAS ===== */
        document.querySelector('#btn-Nash-Pura').addEventListener('click', () => {
            // DECLARACIÓN DE VARIABLES
            let estrategiasPuras = document.getElementById('soluciones');
            estrategiasPuras.innerHTML = "";
            let elementos = obtenerTabla(table);

            // QUITAR LOS ESTILOS A LA SOLUCIÓN ANTERIOR
            estilosInputs.quitarLosEstilos();

            // Buscamos el mayor valor por filas de "B", es decir, el mayor "y" de cada fila
            let marcasFila = "Elementos encontrados: ";
            for (let i = 0; i < elementos.length; i++) {
                let mayor = 0;
                for (let j = 0; j < elementos[i].length; j++) {
                    mayor = Math.max(mayor, elementos[i][j].y);
                }
                for (let j = 0; j < elementos[i].length; j++) {
                    if (mayor === elementos[i][j].y) {
                        elementos[i][j].rptaY = true;
                        marcasFila += elementos[i][j].y + ", ";
                    }
                }
            }
            marcasFila = marcasFila.slice(0, -2);

            // Buscamos el mayor valor por columnas de "A", es decir, el mayor "x" de cada columna
            let marcasColumna = "Elementos encontrados: ";
            for (let j = 0; j < elementos[0].length; j++) {
                let mayor = 0;
                for (let i = 0; i < elementos.length; i++) {
                    mayor = Math.max(mayor, elementos[i][j].x);
                }
                for (let i = 0; i < elementos.length; i++) {
                    if (mayor === elementos[i][j].x) {
                        elementos[i][j].rptaX = true;
                        marcasColumna += elementos[i][j].x + ", ";
                    }
                }
            }
            marcasColumna = marcasColumna.slice(0, -2);

            // Mostramos la respuesta si existe
            // Una respuesta existe si y solo si los elementos "X" e "Y" son los mayores en cada fila y columna a la vez
            let nombresDesiciones = document.getElementsByClassName('cabecera');

            // SE DECLARAN LOS CONTENEDORES DE LA SOLUCIÓN
            let marcasRespuesta = "Elementos encontrados: "
            let solucion = 'Equilibrio de Nash en "Estrategias Puras" = {';
            for (let i = 0; i < elementos.length; i++) {
                for (let j = 0; j < elementos[i].length; j++) {
                    // CONDICIÓN PARA QUE SEA UNA RESPUESTA
                    if (elementos[i][j].rptaX == true && elementos[i][j].rptaY == true) {
                        // MARCANDO LOS INPUTS QUE SON RESPUESTAS
                        estilosInputs.Seleccionados.push(i * elementos[i].length + j);

                        // ESTA PARTE DEL CÓDIGO, LA SOLUCIÓN TIENE EN SUS COMPONENTES EL NOMBRE DE LAS DESICIONES
                        solucion += "(" + nombresDesiciones[i + columnas].value + ", " + nombresDesiciones[j].value + "), ";

                        // SE SELECCIONAN LOS ELEMENTOS PARA MOSTRAR
                        marcasRespuesta += "(" + elementos[i][j].x + ", " + elementos[i][j].y + "), ";
                    } else {
                        // MARCANDO LOS INPUTS QUE NO SON RESPUESTAS
                        estilosInputs.NoSeleccionados.push(i * elementos[i].length + j);
                    }
                }
            }
            marcasRespuesta = marcasRespuesta.slice(0, -2);
            solucion = solucion.slice(0, -2);
            solucion += "}";

            if (solucion !== 'Equilibrio de Nash en "Estrategias Puras" =}') {
                estrategiasPuras.appendChild(crearContenedorTexto('h2', 'Estrategias Puras'));
                estrategiasPuras.appendChild(crearContenedorTexto('p', 'Paso 1: Se busca los mayores elementos "Y" de cada fila'));
                estrategiasPuras.appendChild(crearContenedorTexto('p', marcasFila));
                estrategiasPuras.appendChild(crearContenedorTexto('p', 'Paso 2: Se busca los mayores elementos "X" de cada columna'));;
                estrategiasPuras.appendChild(crearContenedorTexto('p', marcasColumna));
                estrategiasPuras.appendChild(crearContenedorTexto('p', 'Paso 3: Se seleccionan los elementos que cumplan con la condición de ser los mayores de su fila y columna'));;
                estrategiasPuras.appendChild(crearContenedorTexto('p', marcasRespuesta));
                estrategiasPuras.appendChild(crearContenedorTexto('p', solucion));
            } else
                estrategiasPuras.appendChild(crearContenedorTexto('h2', "No hay solución en Estrategias Puras"));

            // MARCAR LAS RESPUESTAS DE CON COLORES NEÓN
            estilosInputs.marcarRespuestas();
        });

        /* ===== SOLUCIÓN EN ESTRATEGIAS MIXTAS ===== */
        document.querySelector('#btn-Nash-Mixta').addEventListener('click', () => {
            // DECLARACIÓN DE VARIABLES
            let estrategiasMixtas = document.getElementById('soluciones')
            estrategiasMixtas.innerHTML = "";

            let elementos = obtenerTabla(table);
            let matrizJ1 = generarMatrizJugador(elementos, 'J1');
            let matrizJ2 = generarMatrizJugador(elementos, 'J2');

            let probJ1 = eliminacionGausianaPro(matrizJ1[0], matrizJ1[1]);
            let probJ2 = eliminacionGausianaPro(matrizJ2[0], matrizJ2[1]);

            let nombres = obtenerNombresCabeceras(filas, columnas);

            estrategiasMixtas.appendChild(crearContenedorTexto('h2', 'Estrategias Mixtas'));

            let solucion = 'Equilibrio de Nash en "Estrategias Mixtas" = {';
            for (let i = 0; i < probJ2.length - 1; i++) {
                solucion += probJ2[i] + " * " + nombres[1][i] + " + ";
            }
            solucion = solucion.slice(0, -3);
            solucion += ", ";

            for (let i = 0; i < probJ2.length - 1; i++) {
                solucion += probJ1[i] + " * " + nombres[0][i] + " + ";
            }
            solucion = solucion.slice(0, -3);

            solucion += "}";

            estrategiasMixtas.appendChild(crearContenedorTexto('p', solucion));
        });
    }
});