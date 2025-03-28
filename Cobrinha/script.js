const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const size = 30;

const snake = [
    {x: 300, y: 300}
];

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

    moveSnake();
    drawSnake();

   loopid = setInterval(() => {  /*Função que executa a cada 300ms*/
        gameloop();
    }, 300)
    
} 

const drawGrid = () 




//gameloop();

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




