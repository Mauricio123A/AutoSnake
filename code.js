const pixelScale = 20; // px
const amountOfSnakes = 4;
const snakes = []; // scale, color, positions
const initialSnakeScale = 3; // +head
const tickTime = 500; // miliseconds
const screen = document.getElementById("screen");
const screenWidth = screen.clientWidth;
const screenHeight = screen.clientHeight;

function buildSnakes(){
    for (let i = 0; i < amountOfSnakes; i++) {
        let color = 360/amountOfSnakes*(i+1);
        let headPositionX = (screenWidth/amountOfSnakes)*i
        headPositionX = headPositionX + (screenWidth/amountOfSnakes)/2 // margin
        headPositionX = headPositionX - headPositionX%20 // floor to pixelScale
        let headPositionY = (screenHeight/2-pixelScale*Math.floor(initialSnakeScale/2))
        headPositionY = headPositionY + headPositionY%20 // floor to pixelScale
        let position = [[headPositionX,headPositionY]];
        drawSnakeHead(headPositionX,headPositionY,color);
        for (let x = 0; x < initialSnakeScale; x++){
            let bodyPartPositionY = headPositionY+pixelScale*(x+1);
            position.push([headPositionX,bodyPartPositionY]);
            drawSnakeBody(headPositionX,bodyPartPositionY,color);
        };
        snakes.push([initialSnakeScale,color,position]);
    }
    console.log("Snakes created:", snakes);
}
function drawSnakeHead(posX,posY,color,lookTo){
    const head = document.createElement("img")
    head.className = "img";

    head.src = "img/head.png";
    head.style.width = pixelScale + "px";

    head.style.left = posX + "px";
    head.style.top = posY + "px";

    head.style.filter = "hue-rotate("+color+"deg)";
    
    switch (lookTo){
        case "right":
            lookTo = "90deg"
        break;
        case "up":
            lookTo = "0deg"
        break;
        case "down":
            lookTo = "180deg"
        break;
        case "left":
            lookTo = "270deg"
        break;
    }
    head.style.rotate = lookTo;

    screen.appendChild(head);
}
function drawSnakeBody(posX,posY,color){
    const bPart = document.createElement("img")
    bPart.className = "img";

    bPart.src = "img/bodyPart.png";
    bPart.style.width = pixelScale + "px";

    bPart.style.left = posX + "px";
    bPart.style.top = posY + "px";

    bPart.style.filter = "hue-rotate("+color+"deg)";

    screen.appendChild(bPart);
}
buildSnakes();