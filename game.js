let canvaSize;
let elementSize;
const playerPosition = {
    x: undefined,
    y: undefined
}

const playerPositionWin = {
    x: undefined,
    y: undefined
}
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

window.addEventListener('load', setResizeCanvas);
// Evento que sucede cuando haces mas garde o pequeña la pantalla.
window.addEventListener('resize', setResizeCanvas);
btnUp.addEventListener('click', moveUp);
window.addEventListener('keydown', moveByKeys);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function setResizeCanvas(){
    if (window.innerHeight > window.innerWidth) {
        canvaSize = window.innerWidth * 0.8;
    } else {
        canvaSize = window.innerHeight * 0.8;
    }
    // Se recalcula el size del canvas cada que se haga un resize.
    canvas.setAttribute('width', canvaSize);
    canvas.setAttribute('height', canvaSize);
    // Se obtiene el tamaño de la bomba.
     elementSize = (canvaSize / 10) - 1;
     startGame();
}
function clearPlayer() {
    game.clearRect(0, 0, canvaSize, canvaSize);
}
function movePlayer() {
    if (win()) {
        game.fillText(emojis['WIN'], playerPosition.x, playerPosition.y);
    } else {
        game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);   
    }
}
function startGame() {
    // Se cambia el tamaño de las bombas.
    game.font = elementSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[0];
    const mapRow = map.trim().split('\n');
    const mapRowCols = mapRow.map(row => row.trim().split(''));
    mapRowCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col];
            const posX = elementSize * (colIndex + 1);
            const posY = elementSize * (rowIndex + 1);

            if (col === 'O' && playerPosition.x === undefined) {
                playerPosition.x = posX;
                playerPosition.y = posY;    
            }
            if (col === 'I') {
                playerPositionWin.x = posX;
                playerPositionWin.y = posY;
            }
            game.fillText(emoji, posX, posY); 
        });
    });
    movePlayer();
}
function moveByKeys(event) {   
    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowDown') moveDown();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight') moveRight();
}
function moveUp() {
        if (playerPosition.y - elementSize < elementSize) {
            console.log('OUT--UP');
        }else {
            clearPlayer();
            playerPosition.y -= elementSize;
            setResizeCanvas();  
        } 
}
function moveLeft() {
    if (playerPosition.x - elementSize < elementSize) {
        console.log('OUT--LEFT');        
    } else {
        clearPlayer();
        playerPosition.x -= elementSize;
        setResizeCanvas();        
    }
}
function moveRight() {
    if (playerPosition.x + elementSize > canvaSize) {
        console.log('OUT-RIGHT');        
    } else {
        clearPlayer();
        playerPosition.x += elementSize;
        setResizeCanvas();        
    }
}
function moveDown() {
    if (playerPosition.y + elementSize > canvaSize) {
        console.log('Out--Down');
    } else {
        clearPlayer();
        playerPosition.y += elementSize;
        setResizeCanvas();        
    }
}
function win() {
    const giftCollisionX = playerPosition.x.toFixed(3) == playerPositionWin.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3) == playerPositionWin.y.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY;
    if (giftCollision) {
        console.log('Subiste de nivel');
      return giftCollision; 
    } else {
        console.log(playerPosition.y);
        console.log(playerPositionWin.y);   
        return giftCollision;
    }
}