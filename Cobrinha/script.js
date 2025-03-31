const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); /*Cria o contexto 2d do canvas*/

const size = 30;

const snake = [
    {x: 300, y: 300}
];

const audio = new Audio("../assets/assets_audio.mp3")

const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max- min) + min);
}

const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size); /*Gera um número aleatório entre 0 e 570*/
    return Math.round(number / size) * size; /*Arredonda o número para o múltiplo mais próximo de 30*/
}

const randomcollor = () => {
    const red = randomNumber(0, 255);
    const green = randomNumber(0, 255); 
    const blue = randomNumber(0, 255);

    return `rgb(${red}, ${green}, ${blue})`;
}

const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: randomcollor(),
}

let direction;
let loopid;



const drawSnake = () => {
    ctx.fillStyle = "#ddd"
    
    snake.forEach((position, index) => {

        if(index === snake.length -1) {
            ctx.fillStyle = 'white';
        }

        ctx.fillRect(position.x, position.y, size, size);

    })
}

const moveSnake = () => {
    if(!direction) return;
    
    
    const head = snake[snake.length - 1];
    /* snake.at(-1) Pega a última posição do array*/


    if(direction == "right") {
        snake.push({x: head.x + size, y: head.y });
    
    } if (direction == "left") {
        snake.push({x: head.x - size, y: head.y})
    } if (direction == "down") {
        snake.push({x: head.x, y: head.y + size})
    } if (direction == "up") {
        snake.push({x: head.x, y: head.y - size})
    }


snake.shift(); /*Remove a primeira posição do array*/
}
   
const gameloop = () => {
    clearInterval(loopid); /*Limpa o interval*/


    ctx.clearRect(0,0 , 600, 600); /*Limpa o canvas*/
    drawGrid();
    drawfood();
    moveSnake();
    drawSnake();
    checkeat();

   loopid = setInterval(() => {  /*Função que executa a cada 300ms*/
        gameloop();
    }, 300)
    
} 

const drawGrid = () => { /* função que desenha a linha no canvas*/
    ctx.lineWidth = 1; /*Espessura da linha*/
    ctx.strokeStyle = "#191919"; /*Cor da linha*/

    for( let i = 30; i< canvas.width; i+=30) {

    ctx.beginPath(); /*Inicia o caminho uma vez*/
    ctx.lineTo(i,0)
    ctx.lineTo(i,600) /*y varia de 0 a 600 e o x é o i*/
    ctx.stroke(); /*Desenha a linha*/

    ctx.beginPath(); 
    ctx.lineTo(0,i)
    ctx.lineTo(600,i) 
    ctx.stroke();
    }

}

const drawfood = () => {
    const {x, y, color} = food; /*Desestruturação do objeto food*/
    
    ctx.shadowColor = color;
    ctx.shadowBlur = 20; /*Desfoque da sombra*/
    ctx.fillStyle = food.color; 
    ctx.fillRect(x, y , size, size);
    ctx.shadowBlur = 0;
}

const checkeat = () => {
    
    const head = snake[snake.length - 1];
 
    if(head.x == food.x && head.y == food.y) {
       snake.push(head);
       audio.play();

      let x = randomPosition();
      let y = randomPosition();

                while (snake. find((position) => position.x == x && position.y == y )) {
                x = randomPosition();
                y = randomPosition();
                }
       food.x = x;
       food.y = y;
       food.color = randomcollor();
    }
    
}   


document.addEventListener("keydown", ({key}) => {
    if (key == "ArrowRight" && direction != "left") {
        direction = "right"
    }
    if (key == "ArrowLeft" && direction != "right") {
        direction = "left"
    }
    if (key == "ArrowUp" && direction != "down") {
        direction = "up"
    }
    if (key == "ArrowDown" && direction != "up") {
        direction = "down"
    }


} )

gameloop();


