const alfabeto = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const entradaOriginal = document.getElementById('entrada-original');
const cifrador = document.getElementById('cifrador');
const rango = document.getElementById('rango');
const resultado = document.getElementById('resultado');

const shifMessage = () => { 
    const palabraArray = [...entradaOriginal.value.toUpperCase()];
    printChar(0, palabraArray);
}

const printChar = (currentLetterIndex, palabraArray) => {
    if (palabraArray.length === currentLetterIndex) return;
    entradaOriginal.value = entradaOriginal.value.substring(1)
    const spanChar = document.createElement("span");
    resultado.appendChild(spanChar);
    animateChar(spanChar)
    .then(()=> {
        const charSinCodificar = palabraArray[currentLetterIndex];
        spanChar.innerHTML = alfabeto.includes(charSinCodificar) ?
            alfabeto[(alfabeto.indexOf(charSinCodificar) + parseInt(rango.value)) % alfabeto.length] :
            charSinCodificar
        printChar(currentLetterIndex + 1, palabraArray);
    });
   
}

const animateChar = spanChar => {
    let cambiosDeLetra = 0;
    return new Promise(resolve => {
        const intervalo = setInterval(()=>{
            spanChar.innerHTML = alfabeto[Math.floor(Math.random()*alfabeto.length)];
            cambiosDeLetra++;
            if(cambiosDeLetra ===4){
                clearInterval(intervalo);
                resolve();
            }
        },50);
    });
}

const submit = e => {
    e.preventDefault();
    resultado.innerHTML = '';
    shifMessage()
}

cifrador.onsubmit = submit;
