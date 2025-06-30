const pixelScale = 20; // px
const amountOfSnakes = 3;
const snakes = []; // scale, color, lookingTo, positions, score, fruit, nextFrameAddBodyPosition
const fruits = []; // adress, position
const initialSnakeScale = 2; // +head
const initialOrientation = "up"; // not finished
const fruitsPosibles = ["img/Fruits/apple.png","img/Fruits/banana.png",
                "img/Fruits/eggplant.png","img/Fruits/greenApple.png",
                "img/Fruits/kiwi.png", "img/Fruits/mango.png",
                "img/Fruits/orange.png", "img/Fruits/pawpaw.png",
                "img/Fruits/pear.png", "img/Fruits/pineapple.png",
                "img/Fruits/strawberry.png", "img/Fruits/watermelon.png"]; // not finished
const tickTime = 250; // miliseconds
const screen = document.getElementById("screen");
const pointsPerKill = 1000;
const pointsPerEat = 100;
const randomMap = false
const screenWidth = screen.clientWidth;
const screenHeight = screen.clientHeight;
const totalPixels = screenHeight * screenWidth;

function getEmptySpaces(){
    let empty = [];
    let doNotAdd = false;
    for(let i = 0; i < totalPixels/pixelScale; i=i+pixelScale){
        doNotAdd = false;
        xScale = i%screenWidth;
        yScale = Math.floor(i/screenHeight) * pixelScale;
        for(let x = 0; x < snakes.length; x++){
            for(let z = 0; z < snakes[x].position.length; z++){
                if (snakes[x].position[z][0] == xScale && snakes[x].position[z][1] == yScale){
                    doNotAdd = true;
                };
            };
        };
        for(let x = 0; x < fruits.length; x++){
            if(fruits[x][1][0] == xScale && fruits[x][1][1] == yScale){
                doNotAdd = true;
            };
        };
        if (!doNotAdd){
            empty.push([xScale, yScale]);
        };
    };
    return empty;
};

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
    // Snakes
    for (let i = 0; i < amountOfSnakes; i++) { // create snake and show them
        let snakeColor = 360/amountOfSnakes*(i+1); // custom color different for each snake
        
        let positions, headPositionX, headPositionY;
        if (randomMap == false){
            [headPositionX,headPositionY] = initialSnakeHeadPosition(i);
            positions = [[headPositionX,headPositionY]];

            drawSnakeHead(headPositionX,headPositionY,snakeColor,"up"); // draw head

            for (let x = 0; x < initialSnakeScale; x++){ // positions of bodyparts
                let bodyPartPositionY = headPositionY+pixelScale*(x+1);
                positions.push([headPositionX,bodyPartPositionY]);
                drawSnakeBody(headPositionX,bodyPartPositionY,snakeColor);
            };
        }else{
            randomSnakeHeadPosition();
        };

        const thisSnake = { // build the snake
            scale:initialSnakeScale,
            color:snakeColor,
            orientation: initialOrientation,
            position:positions,
            score:0,
            fruit: i,
            name: fruitsPosibles[i],
            shortName: fruitsPosibles[i].split("img/Fruits/")[1].split(".png")[0],
            nextFrameAddBody: false
        };
        snakes.push(thisSnake); // put it in the array
    }
    console.log("Snakes created:", snakes);

    // Fruits
    for (let i = 0; i < amountOfSnakes; i++){ // create fruits and show them
        spaces = getEmptySpaces();
        let random = Math.floor(Math.random() * (spaces.length-1));
        fruits.push([fruitsPosibles[i], spaces[random]]);
        drawFruit(fruits[i][0], fruits[i][1][0], fruits[i][1][1]);
    };
};
function snakeVision(snake){
    
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

function drawFruit(address,posX,posY){
    const fr = document.createElement("img");
    fr.className = "img";

    fr.src = address;
    fr.style.width = pixelScale + "px";

    fr.style.left = posX + "px";
    fr.style.top = posY + "px";

    screen.appendChild(fr);
};

function snakeMovement(){ // moves every snake to the direction the snake has in snake.orientation 
    for(let i = 0; i<snakes.length; i++){
        lookTo = snakes[i].orientation;
        let positions = snakes[i].position
        for(let x = positions.length-1; x>0; x--){
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
    while(toKill.length > 0){
        snakes.splice(toKill[toKill.length-1],1); // kills the snake
        toKill.splice(toKill.length-1,1); // takes off the dead snake
    };
};

function snakeDeaths(diedSnakesInTick){ // death: out of borders, touching his own body, touching another snake, touching fruit
    // death
    const toKill = new Set(); // sets dont repeat the elements
    for(let i = 0; i < snakes.length; i++){ //out of borders
        if (snakes[i].position[0][0] > screenWidth || snakes[i].position[0][0] < 0 || snakes[i].position[0][1] > screenHeight || snakes[i].position[0][1] < 0){
            toKill.add(i);
            diedSnakesInTick.push(snakes[i]);
        };
    };
    for(let i = 0; i < snakes.length; i++){ // touching his own body
        for(let x = 1; x < snakes[i].scale; x++){
            if (snakes[i].position[0][0] == snakes[i].position[x][0] && snakes[i].position[0][1] == snakes[i].position[x][1]){
                toKill.add(i);
                diedSnakesInTick.push(snakes[i]);
            };
        };
    };
    for(let i = 0; i < snakes.length; i++){ // touching another snake
        for(let x = i+1; x < snakes.length; x++){
            if(snakes[i].position[0][0] == snakes[x].position[0][0] && snakes[i].position[0][1] == snakes[x].position[0][1]){ // head colisions
                toKill.add(i);
                toKill.add(x);
                diedSnakesInTick.push(snakes[i]);
                diedSnakesInTick.push(snakes[x]);
            };
            for(let z = 1; z <= snakes[x].scale; z++){ // head with other snake
                if(snakes[i].position[0][0] == snakes[x].position[z][0] && snakes[i].position[0][1] == snakes[x].position[z][1]){
                    toKill.add(i);
                    diedSnakesInTick.push(snakes[i]);
                    snakes[x].score += pointsPerKill; // points for killing a snake
                };
            };
        };
    };
    for(let i = 0; i < snakes.length; i++){ // head with wrong fruit
        for(let x = 0; x < fruits.length; x++){
            if(snakes[i].position[0][0] == fruits[x][1][0] && snakes[i].position[0][1] == fruits[x][1][1]){ // head and fruit colision
                if(snakes[i].name != fruits[x][0]){ // if it is not its fruit it die
                    toKill.add(i);
                    diedSnakesInTick.push(snakes[i]);
                }
            };
        };
    };
    return [...toKill]; // return deaths in array
};
function snakeEating(){ // spawn fruits, score and snake scale
    for(let i = 0; i < snakes.length; i++){
        if (snakes[i].nextFrameAddBody != false){
            snakes[i].scale +=1;
            snakes[i].position.push(snakes[i].nextFrameAddBody);
            snakes[i].nextFrameAddBody = false;
        }
        if(snakes[i].position[0][0] == fruits[snakes[i].fruit][1][0] && snakes[i].position[0][1] == fruits[snakes[i].fruit][1][1]){
            let spaces = getEmptySpaces();
            let random = Math.floor(Math.random() * (spaces.length-1));
            fruits[snakes[i].fruit].pop();
            fruits[snakes[i].fruit].push(spaces[random]);
            snakes[i].score += pointsPerEat;
            snakes[i].nextFrameAddBody = [snakes[i].position[snakes[i].position.length-1][0],snakes[i].position[snakes[i].position.length-1][1]];
        };
    };
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
        drawSnakeHead(snakes[i].position[0][0],snakes[i].position[0][1],snakes[i].color,snakes[i].orientation);
        for(let x = 1; x <= snakes[i].scale; x++){
            drawSnakeBody(snakes[i].position[x][0],snakes[i].position[x][1],snakes[i].color);
        };
    };
    for (let i = 0; i < fruits.length; i++){
        drawFruit(fruits[i][0], fruits[i][1][0], fruits[i][1][1]);
    };

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