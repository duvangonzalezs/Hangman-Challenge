
/****************************************************
*
*                    GLOBAL VARIABLES               *
*
******************************************************/
var gameStatus = false;
var iniciarJuego = document.querySelector("#iniciar-juego");
var nuevaPalabra = document.querySelector("#input-nueva-palabra");
var cargarPalabra = document.querySelector("#nueva-palabra");


var listaPalabras = ["CASA","PERRO","ARBOL","CONEJO","PROGRAMACION","BICICLETA","ALEMANIA"];

var arrayCajas = [];
var letrasTecleadas = [];
var arrayPalabra;
var coordenada = 450;
var contador = 50;
var fallos = 0;
var aciertos = 0;
var coordenada2 = 450;
var contador2 = 50;
/****************************************************
*                                                   *
*                  FUNCIONES-PALABRAS               *
*                                                   *
*****************************************************/


function palabraAleatoria(){
    var aleatorio = Math.floor(Math.random()*(listaPalabras.length));
    var seleccionPalabra = listaPalabras[aleatorio];
    var palabraDeletreada = seleccionPalabra.split('');
    console.log(palabraDeletreada);
    return palabraDeletreada;
}

function añadirPalabra(palabra){
    listaPalabras.push(palabra);
}


/****************************************************
*                                                   *
*                  FUNCIONES-CAJAS                  *
*                                                   *
*****************************************************/

function crearCaja(inx){
    var caja = document.createElement("div");
    caja.setAttribute("class","espacios");
    caja.id = inx;
    //Pasar de entero a string
    caja.appendChild(document.createTextNode("")); 
    document.body.appendChild(caja);
    arrayCajas.push(caja);
}

function ubicarCaja(inx){
    coordenada = coordenada + contador;
    arrayCajas[inx].style.position = "absolute";
    arrayCajas[inx].style.top = "430px";
    arrayCajas[inx].style.left = `${coordenada}px`;   
}

/****************************************************
*                                                   *
*                  FUNCIONES-TECLAS                  *
*                                                   *
*****************************************************/
function comprobarLetras(arrayPalabra,letra){

    //comprobamos que la letra no se haya usado antes
    if( letrasTecleadas.indexOf(letra)!=-1 ){
        console.log("primera")
        return 0;
    }
    letrasTecleadas.push(letra);
    //Comprobamos que la letra exista

    if(arrayPalabra.indexOf(letra)==-1){
        console.log("segunda")
        listaErrores(letra);
        return [];
    }
    //Obtenemos las posiciones
    var arrayOuts=[];
    for(i=0;i<arrayPalabra.length;++i){
        if(arrayPalabra[i]==letra){
            console.log(i,arrayPalabra[i],);
            arrayOuts.push(i);
        }
    }
    return arrayOuts;
}
function listaErrores(tecla){
    var teclaUsada = document.createElement("div");
    teclaUsada.setAttribute("class","usadas");
    //Pasar de entero a string
    teclaUsada.appendChild(document.createTextNode(`${tecla}`));
    coordenada2 = coordenada2 + contador2;
    teclaUsada.style.position = "absolute";
    teclaUsada.style.top = "550px";
    teclaUsada.style.left = `${coordenada2}px`;
    document.body.appendChild(teclaUsada);
}
//---------------MAIN---------------//
function letraTeclado(teclado){
    var tecla = teclado.keyCode || teclado.which;
    if(tecla > 64 && tecla < 91){
        letra = teclado.key.toUpperCase();
        console.log(letra);
        
        var resultado = comprobarLetras(arrayPalabra,letra);
        if(typeof(resultado) == 'object' && resultado.length == 0){
            console.log("No esta la letra");
            if(fallos<9){
                if(fallos == 0){
                    barraPrincipal();
                    ++fallos;
                }
                else if(fallos == 1){
                    barraLateral();
                    ++fallos;
                }
                else if(fallos == 2){
                    lineaVertical();
                    ++fallos;
                }
                else if(fallos == 3){
                    cabeza();
                    ++fallos;
                }
                else if(fallos == 4){
                    cuerpo();
                    ++fallos;
                }
                else if(fallos == 5){
                    piernaDerecha();
                    ++fallos;
                }
                else if(fallos == 6){
                    piernaIzquierda();
                    ++fallos;
                }
                else if(fallos == 7){
                    brazoIzquierdo();
                    ++fallos;
                }
                else if(fallos == 8){
                    brazoDerecho();
                    setTimeout(function(){
                        alert("GAME OVER!!!");
                        reset();
                    },100)
                }
            }
            return;
        }
        else if(typeof(resultado) == 'number' && resultado == 0){
            alert("La letra "+letra+" ya ha sido utilizada");
            return
        }
        console.log("ACERTASTE");
        console.log(resultado);
        resultado.forEach((posicion)=>{
            arrayCajas[posicion].textContent = arrayPalabra[posicion];
            aciertos++;
        })
        if(aciertos == arrayPalabra.length){
            setTimeout(function(){
                alert("¡FELICITACIONES, GANASTE!");
                reset();
            },100)
        }
        
    }
}


/****************************************************
*                                                   *
*                  FUNCION SETUP                     *
*                                                   *
*****************************************************/
cargarPalabra.addEventListener("click",function(){
    console.log(nuevaPalabra.value.toUpperCase());
    listaPalabras.push(nuevaPalabra.value.toUpperCase());
    nuevaPalabra.value = '';
    if(gameStatus == true){
        window.addEventListener("keydown", letraTeclado);
    }
})
nuevaPalabra.addEventListener("click",function(event){
    event.preventDefault();
    if(gameStatus == true){
        window.removeEventListener("keydown", letraTeclado);
    }
})

iniciarJuego.addEventListener("click",function(event){
    event.preventDefault();
    gameStatus = true;
    arrayPalabra= palabraAleatoria();
    
    for (let index = 0; index < arrayPalabra.length; index++) {
        crearCaja(index);
        ubicarCaja(index);
    }    
    window.addEventListener("keydown", letraTeclado);
    //console.log(arrayPalabra)  
});


/****************************************************
*                                                   *
*                  FUNCION RESET                    *
*                                                   *
*****************************************************/
function reset(){
    arrayCajas = [];
    letrasTecleadas = [];
    arrayPalabra=[];
    coordenada = 450;
    contador = 50;
    fallos = 0;
    aciertos = 0;
    coordenada2 = 450;
    contador2 = 50;

    resetCanvas();
    baseAhorcado();
    document.querySelectorAll('.espacios').forEach((caja)=>caja.remove());
    document.querySelectorAll('.usadas').forEach((usada)=>usada.remove());
    window.addEventListener("keydown", letraTeclado);
}