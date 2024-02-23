// Traemos las variables necesarias del HTML
const alfabeto = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const entradaOriginal = document.getElementById('entrada-original');
const cifrador = document.getElementById('cifrador');
const rango = document.getElementById('rango');
const resultado = document.getElementById('resultado');

//Con esta funcion transformamos los datos ingresados por el usuario a un array, ademas  de pasarlo a mayusculas para poder trabajar con el alfabeto que trajimos. Tambien llamamos a la funcion "imprimirLetra"
const cambiarMensage = () => { 
    const palabraArray = [...entradaOriginal.value.toUpperCase()];
    imprimirLetra(0, palabraArray);
}

//Esta funcion, toma los parametros "palabraArray" y la posición del array creado con el funcion "cambiarMensage". Para poder imprimir los valores codificados. 
const imprimirLetra = (letraActual, palabraArray) => {
    if (palabraArray.length === letraActual) return; //Esto sirve para que la funcion corte al acabarse los valores que tiene el array.
    entradaOriginal.value = entradaOriginal.value.substring(1) //Aqui usamos "substring(1)" para quitar el primer caracter para formar la animacion.
    const crearLetra = document.createElement("span");//Creamos una linea tipo span para hacer aparecer en "resultado".
    resultado.appendChild(crearLetra);//Ubica el "span" creado en resultado.
    animateChar(crearLetra)
    .then(()=> {
        const letraSinCodificar = palabraArray[letraActual];//Esta variable llama al array formado de la entrada "entradaOriginal" con una posición.
        crearLetra.innerHTML = alfabeto.includes(letraSinCodificar) ? 
            alfabeto[(alfabeto.indexOf(letraSinCodificar) + parseInt(rango.value)) % alfabeto.length] :
            letraSinCodificar//Esta es la parte del programa que se encarga de la codificacion del mensaje. Primero llenamos con un valor la variable "crearLetra". Para ello, tenemos un condional que nos pregunta si el caracter presentado está dentro del alfabeto que llamamos. Una vez corroborado, toma el valor de la posicion del array alfabeto, usando "indexOf" obtener dicha posicion y le suma el valor del rango para mover esa posicion. Tambien se usa "alfabeto.length" para que en el caso que se deba mover más allá del límite del array, este vuelva a iniciar. Por ultimo, si el caracter no se encuentra, lo dejamos pasar.  
            imprimirLetra(letraActual + 1, palabraArray);//Con esto, movemos un lugar en el array formado de la entrada, para repetir todo el proceso.
            
    });
   
}

const animateChar = crearLetra => {
    let cambiosDeLetra = 0;
    return new Promise(resolve => {
        const intervalo = setInterval(()=>{
            crearLetra.innerHTML = alfabeto[Math.floor(Math.random()*alfabeto.length)];
            cambiosDeLetra++;
            if(cambiosDeLetra ===5){
                clearInterval(intervalo);
                resolve();
            }
        },50);
    });
}
// Aqui la funcion "submit" no va a enviar el formulario(para ello usamos "e.preventDefault"), sino que va a borrar el resultado para poder mostrar otro. Tambien se llama a la función "cambiarMensage".

const submit = e => {
    e.preventDefault();
    resultado.innerHTML = '';
    cambiarMensage()
}
// Con esto al escuchar el enter llamamos a la funcion "submit".
cifrador.onsubmit = submit;
