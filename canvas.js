var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d");

//Dibujando la base
function baseAhorcado(){
    pincel.fillStyle="black";
    pincel.beginPath();
    pincel.moveTo(250,250);
    pincel.lineTo(150,300);
    pincel.lineTo(350,300);
    pincel.fill();

    pincel.fillStyle="white";
    pincel.beginPath();
    pincel.moveTo(250,255);
    pincel.lineTo(170,295);
    pincel.lineTo(330,295);
    pincel.fill();
}

baseAhorcado();

//Dibujando el palo principal
function barraPrincipal(){
    pincel.fillStyle = "black";
    pincel.fillRect(248,5,5,251);
}

//Dibujando la linea lateral
function barraLateral(){
    pincel.fillStyle = "black";
    pincel.fillRect(248,5,150,5);
}

//Linea vertical
function lineaVertical(){
    pincel.fillStyle = "black";
    pincel.fillRect(398,5,5,50);
}

//Cabeza
function cabeza(){
    pincel.fillStyle = "black";
    pincel.beginPath();
    pincel.arc(400, 80, 30, 0, 2*Math.PI);
    pincel.fill();
    pincel.fillStyle = "white";
    pincel.beginPath();
    pincel.arc(400, 80, 25, 0, 2*Math.PI);
    pincel.fill();
}

//Cuerpo
function cuerpo(){
    pincel.fillStyle = "black";
    pincel.fillRect(398,105,5,80);
}

//Pata derecha
function piernaDerecha(){
    pincel.fillStyle="black";
    pincel.beginPath();
    pincel.lineWidth = 5;
    pincel.moveTo(350,220);
    pincel.lineTo(401,184);
    pincel.stroke();
}

//Pata izquierda
function piernaIzquierda(){
    pincel.fillStyle="black";
    pincel.beginPath();
    pincel.lineWidth = 5;
    pincel.moveTo(401,184);
    pincel.lineTo(450,220);
    pincel.stroke();
}
//Brazo izquierdo
function brazoIzquierdo(){
    pincel.fillStyle="black";
    pincel.beginPath();
    pincel.lineWidth = 5;
    pincel.moveTo(400,130);
    pincel.lineTo(440,100);
    pincel.stroke();
}
//Brazo derecho
function brazoDerecho(){
    pincel.fillStyle="black";
    pincel.beginPath();
    pincel.lineWidth = 5;
    pincel.moveTo(400,130);
    pincel.lineTo(360,100);
    pincel.stroke();
}

function resetCanvas(){
    var canvas = document.getElementById('ahorcado');
    var contexto = canvas.getContext('2d');
    contexto.clearRect(0, 0, canvas.width, canvas.height);
}

    



