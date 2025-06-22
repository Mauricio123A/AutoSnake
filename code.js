const pixelScale = 20; // px
const amountOfSnakes = 4;
const snakes = []; // scale, color, lookingTo, positions, score
const initialSnakeScale = 2; // +head
const tickTime = 500; // miliseconds
const screen = document.getElementById("screen");
const pointsPerKill = 1000;
const randomMap = false
const screenWidth = screen.clientWidth;
const screenHeight = screen.clientHeight;

function initialSnakeHeadPosition(i){
    let headPositionX = (screenWidth/amountOfSnakes)*i;
    headPositionX = headPositionX + (screenWidth/amountOfSnakes)/2; // margin
    headPositionX = headPositionX - headPositionX%pixelScale; // floor to pixelScale

    let headPositionY = (screenHeight/2-pixelScale*Math.floor(initialSnakeScale/2));
    headPositionY = headPositionY - headPositionY%pixelScale; // floor to pixelScale 
    return [headPositionX,headPositionY];
}
function randomSnakeHeadPosition(){
    
};
function buildSnakes(){
    for (let i = 0; i < amountOfSnakes; i++) {
        let color = 360/amountOfSnakes*(i+1); // custom color different for each snake
        
        let position;
        if (randomMap == false){
            position = [initialSnakeHeadPosition(i)];
            headPositionX = position[0][0];
            headPositionY = position[0][1];
        }else{
            randomSnakeHeadPosition();
        };

        drawSnakeHead(headPositionX,headPositionY,color,"up"); // drawhead
        for (let x = 0; x < initialSnakeScale; x++){
            let bodyPartPositionY = headPositionY+pixelScale*(x+1);
            position.push([headPositionX,bodyPartPositionY]);
            drawSnakeBody(headPositionX,bodyPartPositionY,color);
        };
        snakes.push([initialSnakeScale,color,"up",position,0]);
    }
    console.log("Snakes created:", snakes);
};

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
};

function drawSnakeBody(posX,posY,color){
    const bPart = document.createElement("img");
    bPart.className = "img";

    bPart.src = "img/bodyPart.png";
    bPart.style.width = pixelScale + "px";

    bPart.style.left = posX + "px";
    bPart.style.top = posY + "px";

    bPart.style.filter = "hue-rotate("+color+"deg)";

    screen.appendChild(bPart);
};

function snakeMovement(){
    for(let i = 0; i<snakes.length; i++){
        lookTo = snakes[i][2]
        let positions = snakes[i][3]
        for(let x = snakes[i][3].length-1; x>0; x--){
            positions[x] = [...positions[x-1]]
        }
        switch (lookTo){
        case "up":
            positions[0][1] = positions[0][1]-pixelScale
        break;
        case "right":
            positions[0][0] = positions[0][0]+pixelScale
        break;
        case "down":
            positions[0][1] = positions[0][1]+pixelScale
        break;
        case "left":
            positions[0][0] = positions[0][0]-pixelScale
        break;
        }

    }
};

function snakeDied(toKill){ // kills a provided array of snakes
    let x = 0;
    for(let i = 0; i < toKill.length; i++){
        snakes.splice(toKill[i-x],1); // kills the snake
        toKill.splice(i,1) // takes off the dead snake
        i=-1;
        x++;
    };
};

function snakeDeaths(diedSnakesInTick){ // death: out of borders, touching his own body, touching another snake
    // death
    const toKill = new Set(); // sets dont repeat the elements
    for(let i = 0; i < snakes.length; i++){ //out of borders
        if (snakes[i][3][0][0] > screenWidth || snakes[i][3][0][0] < 0 || snakes[i][3][0][1] > screenHeight || snakes[i][3][0][1] < 0){
            toKill.add(i);
            diedSnakesInTick.push(snakes[i]);
        };
    };
    for(let i = 0; i < snakes.length; i++){ // touching his own body
        for(let x = 1; x < snakes[i][0]; x++){
            if (snakes[i][3][0][0] == snakes[i][3][x][0] && snakes[i][3][0][1] == snakes[i][3][x][1]){
                toKill.add(i);
                diedSnakesInTick.push(snakes[i]);
            };
        };
    };
    for(let i = 0; i < snakes.length; i++){ // touching another snake
        for(let x = i+1; x < snakes.length; x++){
            if(snakes[i][3][0][0] == snakes[x][3][0][0] && snakes[i][3][0][1] == snakes[x][3][0][1]){ // head colisions
                toKill.add(i);
                toKill.add(x);
                diedSnakesInTick.push(snakes[i]);
                diedSnakesInTick.push(snakes[x]);
            };
            for(let z = 1; z <= snakes[x][0]; z++){ // head with other snake
                if(snakes[i][3][0][0] == snakes[x][3][z][0] && snakes[i][3][0][1] == snakes[x][3][z][1]){
                    toKill.add(i);
                    diedSnakesInTick.push(snakes[i]);
                    snakes[x][4] += pointsPerKill; // points for killing a snake
                };
            };
        };
    };
    return [...toKill]; // return deaths in array
};
function snakeEating(){ // spawn fruits, score and snake scale

};
function snakeMind(){ // control the snake

};
function winComprobation(){ // last snake wins

};
function gameEjecution(){ // main control
    snakeMovement();

    let diedSnakesInTick = []; // manage deaths
    snakeDied(snakeDeaths(diedSnakesInTick));

    snakeEating();

    snakeMind();

    //Draw frame
    screen.innerHTML = "";
    for(let i = 0; i < snakes.length; i++){
        drawSnakeHead(snakes[i][3][0][0],snakes[i][3][0][1],snakes[i][1],snakes[i][2])
        for(let x = 1; x <= snakes[i][0]; x++){
            drawSnakeBody(snakes[i][3][x][0],snakes[i][3][x][1],snakes[i][1])
        }
    }

    //end the game
    winComprobation() // if game ended, this brokes the interval
    diedSnakesInTick = [];
    //clearInterval(ejecution)
};
function playSimulation(){
    buildSnakes(); // prepare snakes
    ejecution = setInterval(gameEjecution, tickTime); // ejecution every tick
}
playSimulation();