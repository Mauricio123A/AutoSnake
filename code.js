const pixelScale = 20; // px
const amountOfSnakes = 3;
const snakes = []; // scale, color, lookingTo, positions, score, fruit, nextFrameAddBodyPosition
const history = []; // snakes
const deathSnakes = []; // History of death
const fruits = []; // adress, position
const walls = [];
const initialSnakeScale = 2; // +head
const fruitsPosibles = ["img/Fruits/apple.png","img/Fruits/banana.png",
                "img/Fruits/eggplant.png","img/Fruits/greenApple.png",
                "img/Fruits/kiwi.png", "img/Fruits/mango.png",
                "img/Fruits/orange.png", "img/Fruits/pawpaw.png",
                "img/Fruits/pear.png", "img/Fruits/pineapple.png",
                "img/Fruits/strawberry.png", "img/Fruits/watermelon.png"];
const tickTime = 200; // miliseconds
const screen = document.getElementById("screen");
const ejecutionButton = document.getElementById("ejecutionControlButton");
const stopButton = document.getElementById("stopEjecutionButton");
const startButton = document.getElementById("startGameButton");
const winnerText = document.getElementById("winner");
const pointsPerKill = 1000;
const pointsPerEat = 100;

const useMaps = true;
const tiebreaker = true;
let initialOrientation = "up";
const randomOrientation = true; // only works with maps
const maps = [ // 25x x 25y
    [[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2],[14,2],[15,2],[16,2],[17,2],[18,2],[19,2],[20,2],[21,2],[22,2],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[14,3],[15,3],[16,3],[17,3],[18,3],[19,3],[20,3],[21,3],[22,3],[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],[14,6],[15,6],[16,6],[17,6],[18,6],[19,6],[20,6],[21,6],[22,6],[2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[8,7],[9,7],[10,7],[14,7],[15,7],[16,7],[17,7],[18,7],[19,7],[20,7],[21,7],[22,7],[2,10],[3,10],[4,10],[5,10],[6,10],[7,10],[8,10],[9,10],[10,10],[14,10],[15,10],[16,10],[17,10],[18,10],[19,10],[20,10],[21,10],[22,10],[2,11],[3,11],[4,11],[5,11],[6,11],[7,11],[8,11],[9,11],[10,11],[14,11],[15,11],[16,11],[17,11],[18,11],[19,11],[20,11],[21,11],[22,11],[2,12],[3,12],[4,12],[5,12],[6,12],[7,12],[8,12],[9,12],[10,12],[14,12],[15,12],[16,12],[17,12],[18,12],[19,12],[20,12],[21,12],[22,12],[2,13],[3,13],[4,13],[5,13],[6,13],[7,13],[8,13],[9,13],[10,13],[14,13],[15,13],[16,13],[17,13],[18,13],[19,13],[20,13],[21,13],[22,13],[2,14],[3,14],[4,14],[5,14],[6,14],[7,14],[8,14],[9,14],[10,14],[14,14],[15,14],[16,14],[17,14],[18,14],[19,14],[20,14],[21,14],[22,14],[2,17],[3,17],[4,17],[5,17],[6,17],[7,17],[8,17],[9,17],[10,17],[14,17],[15,17],[16,17],[17,17],[18,17],[19,17],[20,17],[21,17],[22,17],[2,18],[3,18],[4,18],[5,18],[6,18],[7,18],[8,18],[9,18],[10,18],[14,18],[15,18],[16,18],[17,18],[18,18],[19,18],[20,18],[21,18],[22,18],[2,21],[3,21],[4,21],[5,21],[6,21],[7,21],[8,21],[9,21],[10,21],[14,21],[15,21],[16,21],[17,21],[18,21],[19,21],[20,21],[21,21],[22,21],[2,22],[3,22],[4,22],[5,22],[6,22],[7,22],[8,22],[9,22],[10,22],[14,22],[15,22],[16,22],[17,22],[18,22],[19,22],[20,22],[21,22],[22,22]],
    [[2,2],[3,2],[6,2],[7,2],[10,2],[14,2],[17,2],[18,2],[21,2],[22,2],[2,3],[3,3],[6,3],[7,3],[10,3],[14,3],[17,3],[18,3],[21,3],[22,3],[2,6],[3,6],[6,6],[7,6],[10,6],[14,6],[17,6],[18,6],[21,6],[22,6],[2,7],[3,7],[6,7],[7,7],[10,7],[14,7],[17,7],[18,7],[21,7],[22,7],[2,10],[3,10],[6,10],[7,10],[10,10],[14,10],[17,10],[18,10],[21,10],[22,10],[12,12],[2,14],[3,14],[6,14],[7,14],[10,14],[14,14],[17,14],[18,14],[21,14],[22,14],[2,17],[3,17],[6,17],[7,17],[10,17],[14,17],[17,17],[18,17],[21,17],[22,17],[2,18],[3,18],[6,18],[7,18],[10,18],[14,18],[17,18],[18,18],[21,18],[22,18],[2,21],[3,21],[6,21],[7,21],[10,21],[14,21],[17,21],[18,21],[21,21],[22,21],[2,22],[3,22],[6,22],[7,22],[10,22],[14,22],[17,22],[18,22],[21,22],[22,22]],
    [[4,2],[5,2],[6,2],[11,2],[12,2],[13,2],[17,2],[18,2],[21,2],[22,2],[5,3],[6,3],[7,3],[10,3],[11,3],[12,3],[16,3],[17,3],[18,3],[19,3],[22,3],[2,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4],[15,4],[16,4],[17,4],[18,4],[19,4],[20,4],[2,5],[3,5],[7,5],[8,5],[9,5],[10,5],[14,5],[15,5],[16,5],[17,5],[18,5],[19,5],[20,5],[21,5],[2,6],[3,6],[4,6],[8,6],[9,6],[13,6],[14,6],[15,6],[21,6],[22,6],[2,7],[3,7],[4,7],[5,7],[12,7],[13,7],[14,7],[15,7],[21,7],[22,7],[2,8],[3,8],[4,8],[5,8],[6,8],[11,8],[12,8],[13,8],[14,8],[15,8],[18,8],[21,8],[22,8],[2,9],[3,9],[4,9],[5,9],[6,9],[7,9],[10,9],[11,9],[12,9],[13,9],[14,9],[15,9],[18,9],[21,9],[22,9],[2,10],[3,10],[6,10],[7,10],[10,10],[11,10],[14,10],[15,10],[18,10],[21,10],[22,10],[2,11],[3,11],[6,11],[7,11],[10,11],[11,11],[14,11],[15,11],[18,11],[21,11],[22,11],[2,12],[3,12],[6,12],[7,12],[10,12],[11,12],[14,12],[15,12],[18,12],[21,12],[22,12],[2,13],[3,13],[6,13],[7,13],[10,13],[11,13],[14,13],[15,13],[18,13],[21,13],[22,13],[2,14],[3,14],[6,14],[7,14],[10,14],[11,14],[14,14],[15,14],[18,14],[21,14],[22,14],[2,15],[3,15],[6,15],[7,15],[10,15],[11,15],[14,15],[15,15],[18,15],[21,15],[22,15],[2,16],[3,16],[6,16],[7,16],[10,16],[11,16],[14,16],[15,16],[18,16],[21,16],[22,16],[2,17],[3,17],[6,17],[7,17],[10,17],[11,17],[14,17],[15,17],[18,17],[21,17],[22,17],[2,18],[3,18],[6,18],[7,18],[10,18],[11,18],[14,18],[15,18],[18,18],[21,18],[22,18],[2,19],[3,19],[6,19],[7,19],[10,19],[11,19],[14,19],[15,19],[18,19],[21,19],[22,19],[2,20],[3,20],[6,20],[7,20],[10,20],[11,20],[14,20],[15,20],[18,20],[21,20],[22,20],[2,21],[3,21],[6,21],[7,21],[10,21],[11,21],[14,21],[15,21],[18,21],[21,21],[22,21],[2,22],[3,22],[6,22],[7,22],[10,22],[11,22],[14,22],[15,22],[18,22],[21,22],[22,22]],
    [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0],[12,0],[13,0],[14,0],[15,0],[16,0],[17,0],[18,0],[19,0],[20,0],[21,0],[22,0],[23,0],[24,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1],[11,1],[12,1],[13,1],[14,1],[15,1],[16,1],[17,1],[18,1],[19,1],[20,1],[21,1],[22,1],[23,1],[24,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[10,2],[11,2],[12,2],[13,2],[14,2],[15,2],[16,2],[17,2],[22,2],[23,2],[24,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[10,3],[11,3],[12,3],[13,3],[14,3],[15,3],[16,3],[17,3],[22,3],[23,3],[24,3],[0,4],[1,4],[2,4],[3,4],[12,4],[13,4],[14,4],[15,4],[24,4],[0,5],[1,5],[2,5],[3,5],[12,5],[13,5],[14,5],[15,5],[24,5],[0,19],[1,19],[10,19],[11,19],[12,19],[13,19],[22,19],[23,19],[24,19],[0,20],[1,20],[10,20],[11,20],[12,20],[13,20],[22,20],[23,20],[24,20],[0,21],[1,21],[2,21],[3,21],[8,21],[9,21],[10,21],[11,21],[12,21],[13,21],[14,21],[15,21],[20,21],[21,21],[22,21],[23,21],[24,21],[0,22],[1,22],[2,22],[3,22],[8,22],[9,22],[10,22],[11,22],[12,22],[13,22],[14,22],[15,22],[20,22],[21,22],[22,22],[23,22],[24,22],[0,23],[1,23],[2,23],[3,23],[4,23],[5,23],[6,23],[7,23],[8,23],[9,23],[10,23],[11,23],[12,23],[13,23],[14,23],[15,23],[16,23],[17,23],[18,23],[19,23],[20,23],[21,23],[22,23],[23,23],[24,23],[0,24],[1,24],[2,24],[3,24],[4,24],[5,24],[6,24],[7,24],[8,24],[9,24],[10,24],[11,24],[12,24],[13,24],[14,24],[15,24],[16,24],[17,24],[18,24],[19,24],[20,24],[21,24],[22,24],[23,24],[24,24]],
    [[0,0],[24,0],[1,1],[23,1],[2,2],[22,2],[3,3],[21,3],[4,4],[20,4],[5,5],[19,5],[6,6],[18,6],[7,7],[17,7],[8,8],[16,8],[9,9],[15,9],[12,11],[11,12],[12,12],[13,12],[12,13],[9,15],[15,15],[8,16],[16,16],[7,17],[17,17],[6,18],[18,18],[5,19],[19,19],[4,20],[20,20],[3,21],[21,21],[2,22],[22,22],[1,23],[23,23],[0,24],[24,24]],
    [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0],[12,0],[13,0],[14,0],[15,0],[16,0],[17,0],[18,0],[19,0],[20,0],[21,0],[22,0],[23,0],[24,0],[0,1],[24,1],[0,2],[24,2],[0,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[11,3],[12,3],[13,3],[14,3],[15,3],[16,3],[17,3],[18,3],[19,3],[20,3],[21,3],[24,3],[0,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4],[12,4],[13,4],[14,4],[15,4],[16,4],[17,4],[18,4],[19,4],[20,4],[21,4],[24,4],[0,5],[3,5],[4,5],[20,5],[21,5],[24,5],[0,6],[3,6],[4,6],[20,6],[21,6],[24,6],[0,7],[3,7],[4,7],[7,7],[8,7],[9,7],[10,7],[11,7],[12,7],[13,7],[14,7],[15,7],[16,7],[17,7],[20,7],[21,7],[24,7],[0,8],[3,8],[4,8],[7,8],[8,8],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[15,8],[16,8],[17,8],[20,8],[21,8],[24,8],[0,9],[3,9],[4,9],[7,9],[8,9],[16,9],[17,9],[20,9],[21,9],[24,9],[0,10],[3,10],[4,10],[7,10],[8,10],[16,10],[17,10],[20,10],[21,10],[24,10],[0,11],[3,11],[4,11],[7,11],[8,11],[11,11],[12,11],[16,11],[17,11],[20,11],[21,11],[24,11],[0,12],[3,12],[4,12],[7,12],[8,12],[11,12],[12,12],[13,12],[14,12],[15,12],[16,12],[17,12],[20,12],[21,12],[24,12],[0,13],[3,13],[4,13],[7,13],[8,13],[11,13],[12,13],[13,13],[14,13],[15,13],[16,13],[17,13],[20,13],[21,13],[24,13],[0,14],[3,14],[4,14],[7,14],[8,14],[20,14],[21,14],[24,14],[0,15],[3,15],[4,15],[7,15],[8,15],[20,15],[21,15],[24,15],[0,16],[3,16],[4,16],[7,16],[8,16],[9,16],[10,16],[11,16],[12,16],[13,16],[14,16],[15,16],[16,16],[17,16],[18,16],[19,16],[20,16],[21,16],[24,16],[0,17],[3,17],[4,17],[7,17],[8,17],[9,17],[10,17],[11,17],[12,17],[13,17],[14,17],[15,17],[16,17],[17,17],[18,17],[19,17],[20,17],[21,17],[24,17],[0,18],[3,18],[4,18],[24,18],[0,19],[3,19],[4,19],[24,19],[0,20],[3,20],[4,20],[5,20],[6,20],[7,20],[8,20],[9,20],[10,20],[11,20],[12,20],[13,20],[14,20],[15,20],[16,20],[17,20],[18,20],[19,20],[20,20],[21,20],[22,20],[23,20],[24,20],[0,21],[3,21],[4,21],[5,21],[6,21],[7,21],[8,21],[9,21],[10,21],[11,21],[12,21],[13,21],[14,21],[15,21],[16,21],[17,21],[18,21],[19,21],[20,21],[21,21],[22,21],[23,21],[24,21],[0,22],[0,23],[0,24],[1,24],[2,24],[3,24],[4,24],[5,24],[6,24],[7,24],[8,24],[9,24],[10,24],[11,24],[12,24],[13,24],[14,24],[15,24],[16,24],[17,24],[18,24],[19,24],[20,24],[21,24],[22,24],[23,24],[24,24]]
];

const screenWidth = screen.clientWidth;
const screenHeight = screen.clientHeight;
const totalPixels = screenHeight * screenWidth; 
let diedSnakesInTick = []; // manage deaths
let ejecution;
let paused = false;
let isRunning = false;
if(isRunning){
    stopButton.style.display = "block";
    startButton.style.display = "none";
    ejecutionButton.style.display = "block";
}else{
    stopButton.style.display = "none";
    startButton.style.display = "block";
    ejecutionButton.style.display = "none";
};


if(paused){
    ejecutionButton.children[0].src = "img/pause.png";
}else{
    ejecutionButton.children[0].src = "img/resume.png";
};


function getEmptySpaces(){
    let empty = [];
    let doNotAdd;
    for(let i = 0; i < totalPixels/pixelScale; i=i+pixelScale){
        doNotAdd = false;
        xScale = i%screenWidth;
        yScale = Math.floor(i/screenHeight) * pixelScale;
        for(let x = 0; x < snakes.length; x++){
            for(let z = 0; z < snakes[x].position.length; z++){
                if (snakes[x].position[z][0] == xScale && snakes[x].position[z][1] == yScale){
                    doNotAdd = true;
                    break;
                };
            };
        };
        for(let x = 0; x < fruits.length; x++){
            if(fruits[x][1][0] == xScale && fruits[x][1][1] == yScale){
                doNotAdd = true;
                break;
            };
        };
        for(let x = 0; x < walls.length; x++){
            if(walls[x][0] == xScale && walls[x][1] == yScale){
                doNotAdd = true;
                break;
            };
        }
        if(!doNotAdd){
            empty.push([xScale, yScale]);
        }
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
};

function randomSnakeHeadPosition(){
    spaces = getEmptySpaces();
    // disorder
    let random = 0;
    for(let i = 0; i < spaces.length; i++){
        random = Math.floor(Math.random()*spaces.length);
        [spaces[i],spaces[random]] = [spaces[random],spaces[i]];
    };

    if(randomOrientation){
        random = Math.floor(Math.random()*4);
        initialOrientation = ["up","down","left","right"][random];
    };

    if(initialOrientation == "up"){
        for(let i = 0; i < spaces.length; i++){
            let freeCompletely = 1;
            let spaceFree = [spaces[i][0],spaces[i][1]];
            let freeSpace = spaces.some(arr => JSON.stringify(arr) === JSON.stringify(spaceFree));
            if(freeSpace){
                for(let x = 1; x <= initialSnakeScale; x++){
                    spaceFree = [spaces[i][0],spaces[i][1]+(x*pixelScale)];
                    let free = spaces.some(arr => JSON.stringify(arr) === JSON.stringify(spaceFree));
                    if(!free){
                        freeCompletely = freeCompletely - 1;
                        break;
                    };
                };
                if(freeCompletely == 1){
                    return [spaces[i][0],spaces[i][1]];
                };
            };
        };
    }
    if(initialOrientation == "down"){
        for(let i = 0; i < spaces.length; i++){
            let freeCompletely = 1;
            let spaceFree = [spaces[i][0],spaces[i][1]];
            let freeSpace = spaces.some(arr => JSON.stringify(arr) === JSON.stringify(spaceFree));
            if(freeSpace){
                for(let x = 1; x <= initialSnakeScale; x++){
                    spaceFree = [spaces[i][0],spaces[i][1]-(x*pixelScale)];
                    let free = spaces.some(arr => JSON.stringify(arr) === JSON.stringify(spaceFree));
                    if(!free){
                        freeCompletely = freeCompletely - 1;
                        break;
                    };
                };
                if(freeCompletely == 1){
                    return [spaces[i][0],spaces[i][1]];
                };
            };
        };
    }
    if(initialOrientation == "left"){
        for(let i = 0; i < spaces.length; i++){
            let freeCompletely = 1;
            let spaceFree = [spaces[i][0],spaces[i][1]];
            let freeSpace = spaces.some(arr => JSON.stringify(arr) === JSON.stringify(spaceFree));
            if(freeSpace){
                for(let x = 1; x <= initialSnakeScale; x++){
                    spaceFree = [spaces[i][0]+(x*pixelScale),spaces[i][1]];
                    let free = spaces.some(arr => JSON.stringify(arr) === JSON.stringify(spaceFree));
                    if(!free){
                        freeCompletely = freeCompletely - 1;
                        break;
                    };
                };
                if(freeCompletely == 1){
                    return [spaces[i][0],spaces[i][1]];
                };
            };
        };
    }
    if(initialOrientation == "right"){
        for(let i = 0; i < spaces.length; i++){
            let freeCompletely = 1;
            let spaceFree = [spaces[i][0],spaces[i][1]];
            let freeSpace = spaces.some(arr => JSON.stringify(arr) === JSON.stringify(spaceFree));
            if(freeSpace){
                for(let x = 1; x <= initialSnakeScale; x++){
                    spaceFree = [spaces[i][0]-(x*pixelScale),spaces[i][1]];
                    let free = spaces.some(arr => JSON.stringify(arr) === JSON.stringify(spaceFree));
                    if(!free){
                        freeCompletely = freeCompletely - 1;
                        break;
                    };
                };
                if(freeCompletely == 1){
                    return [spaces[i][0],spaces[i][1]];
                };
            };
        };
    }
    error("No space enough!");
    return [-1,-1]; // to avoid visual bug
};
function buildSnakes(){
    // Snakes
    continueStarting = true;
    for (let i = 0; i < amountOfSnakes; i++) { // create snake and show them
        let snakeColor = 360/amountOfSnakes*(i+1); // custom color different for each snake
        
        let positions, headPositionX, headPositionY;
        if (useMaps == false){
            [headPositionX,headPositionY] = initialSnakeHeadPosition(i);
            positions = [[headPositionX,headPositionY]];
            drawSnakeHead(headPositionX,headPositionY,snakeColor,"up"); // draw head

            for (let x = 0; x < initialSnakeScale; x++){ // positions of bodyparts
                let bodyPartPositionY = headPositionY+pixelScale*(x+1);
                positions.push([headPositionX,bodyPartPositionY]);
                drawSnakeBody(headPositionX,bodyPartPositionY,snakeColor);
            };
        }else{
            [headPositionX,headPositionY] = randomSnakeHeadPosition();
            positions = [[headPositionX,headPositionY]];

            if(headPositionX == -1){
                continueStarting = false;
                return continueStarting;
            };

            if (initialOrientation == "up"){
                for (let x = 0; x < initialSnakeScale; x++){ // positions of bodyparts
                    drawSnakeHead(headPositionX,headPositionY,snakeColor,"up");
                    let bodyPartPositionY = headPositionY+pixelScale*(x+1);
                    positions.push([headPositionX,bodyPartPositionY]);
                    drawSnakeBody(headPositionX,bodyPartPositionY,snakeColor);
                };
            }else if(initialOrientation == "down"){
                for (let x = 0; x < initialSnakeScale; x++){ // positions of bodyparts
                    drawSnakeHead(headPositionX,headPositionY,snakeColor,"down");
                    let bodyPartPositionY = headPositionY-pixelScale*(x+1);
                    positions.push([headPositionX,bodyPartPositionY]);
                    drawSnakeBody(headPositionX,bodyPartPositionY,snakeColor);
                };
            }else if (initialOrientation == "right"){
                for (let x = 0; x < initialSnakeScale; x++){ // positions of bodyparts
                    drawSnakeHead(headPositionX,headPositionY,snakeColor,"right");
                    let bodyPartPositionX = headPositionX-pixelScale*(x+1);
                    positions.push([bodyPartPositionX,headPositionY]);
                    drawSnakeBody(bodyPartPositionX,headPositionY,snakeColor);
                };
            }else if(initialOrientation == "left"){
                for (let x = 0; x < initialSnakeScale; x++){ // positions of bodyparts
                    drawSnakeHead(headPositionX,headPositionY,snakeColor,"left");
                    let bodyPartPositionX = headPositionX+pixelScale*(x+1);
                    positions.push([bodyPartPositionX,headPositionY]);
                    drawSnakeBody(bodyPartPositionX,headPositionY,snakeColor);
                };
            };
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

function buildMap(wallsToBuild){
    for(let i = 0; i < wallsToBuild.length; i++){
        let x=wallsToBuild[i][0]*pixelScale;
        let y=wallsToBuild[i][1]*pixelScale;
        drawWall(x,y);
        walls.push([x,y]);
    }
};

function drawSnakeHead(posX,posY,color,lookTo){
    const head = document.createElement("img")
    head.className = "img snake";

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
    bPart.className = "img snake";

    bPart.src = "img/bodyPart.png";
    bPart.style.width = pixelScale + "px";

    bPart.style.left = posX + "px";
    bPart.style.top = posY + "px";

    bPart.style.filter = "hue-rotate("+color+"deg)";

    screen.appendChild(bPart);
};

function drawFruit(address,posX,posY){
    const fr = document.createElement("img");
    fr.className = "img fruit";

    fr.src = address;
    fr.style.width = pixelScale + "px";

    fr.style.left = posX + "px";
    fr.style.top = posY + "px";

    screen.appendChild(fr);
};

function drawWall(posX,posY){
    const w = document.createElement("div");
    w.className = "img";

    w.style.width = pixelScale + "px";
    w.style.height = pixelScale + "px";

    w.style.left = posX + "px";
    w.style.top = posY + "px";

    w.style.backgroundColor = "rgb(105, 105, 248)";

    screen.appendChild(w);
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
    toKill.sort((a, b) => a - b); // order the index
    while(toKill.length > 0){
        deathSnakes.push(snakes[toKill[toKill.length-1]]);
        snakes.splice(toKill[toKill.length-1],1); // kills the snake
        toKill.splice(toKill.length-1,1); // takes off the dead snake
    };
};

function snakeDeaths(diedSnakesInTick){ // death: out of borders, touching his own body, touching another snake, touching fruit, touching wall
    // death
    const toKill = new Set(); // sets dont repeat the elements
    for(let i = 0; i < snakes.length; i++){ //out of borders
        if (snakes[i].position[0][0] > screenWidth-pixelScale || snakes[i].position[0][0] < 0 || snakes[i].position[0][1] > screenHeight-pixelScale || snakes[i].position[0][1] < 0){
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
    for(let i = 0; i < snakes.length; i++){ // head with wall
        for(let x = 0; x < walls.length; x++){
            if(snakes[i].position[0][0] == walls[x][0] && snakes[i].position[0][1] == walls[x][1]){ // head and fruit colision
                toKill.add(i);
                diedSnakesInTick.push(snakes[i]);
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
    if(snakes.length == 1){
        winSimulation(false, snakes[0]); // send winner
    }else if(snakes.length == 0){
        winSimulation(true, diedSnakesInTick); // send winners
    }
};
function gameEjecution(){ // main control
    snakeMovement();

    snakeDied(snakeDeaths(diedSnakesInTick));

    snakeEating();

    snakeMind();

    //Draw frame
    screen.querySelectorAll(".snake").forEach(s => s.remove());
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
    winComprobation(); // if game ended, this brokes the interval
    diedSnakesInTick = [];
    //clearInterval(ejecution)
};
function endSimulation(){
    clearInterval(ejecution);
    let historyOfThisGame = [];
    historyOfThisGame.push[deathSnakes];
    stopButton.style.display = "none";
    startButton.style.display = "block";
    ejecutionButton.style.display = "none";
    paused = false;
    ejecutionButton.children[0].src = "img/resume.png";
    isRunning = false;
    snakes.length = 0;
    fruits.length = 0;
    deathSnakes.length = 0;
    walls.length = 0;
    diedSnakesInTick.length = 0;
}
function winSimulation(twoOrMore, winner){
    clearInterval(ejecution);
    console.log("End");
    if(twoOrMore){
        if (tiebreaker){ // break the tie by score
            let toAdd = [];
            let winnerArray = [];
            let ant = 0;
            for(let i = 1; i < winner.length; i++){
                if(winner[ant].score < winner[i].score){
                    ant = i;
                    toAdd.length = 0;
                }else if(winner[ant].score == winner[i].score){
                    toAdd.push(i);
                };
            };
            toAdd.unshift(ant);
            for (let i = 0; i < toAdd.length; i++){
                winnerArray.push(winner[toAdd[i]]);
            };
            winner = winnerArray;
        };
        if(winner.length == 1){ // breaktie by score
            winnerText.innerHTML = "The snake " + winner[0].shortName + " won the Game!";
        }else if(winner.length == 2){ // a tie of two
            winnerText.innerHTML = "It's a Tie between " + winner[0].shortName + " and " + winner[1].shortName + "!";
        }else{ // a tie of three or more
            let text = "It's a Tie between ";
            for(let i = 0; i < winner.length; i++){
                if(i == winner.length-1){
                    text = text + " and " + winner[i].shortName + "!";
                }else if(i == 0){
                    text = text + winner[i].shortName;
                }else{
                    text = text + ", " + winner[i].shortName;
                };
            };
            winnerText.innerHTML = text;
        };
    }else{
        winnerText.innerHTML = "The snake " + winner.shortName + " won the Game!"; // show the winner
    };

    endSimulation();
};
function error(text){
    console.log(text);
     winnerText.innerHTML = text;
     endSimulation();
};
function playSimulation(){
    if(isRunning){
        return
    };
    console.log("Start");
    winnerText.innerHTML = "";
    screen.innerHTML = "";
    stopButton.style.display = "block";
    startButton.style.display = "none";
    ejecutionButton.style.display = "block";
    isRunning = true;
    if(useMaps){
        mapSelected = maps[Math.floor(Math.random()*(maps.length))];
        buildMap(mapSelected);
    };
    if(buildSnakes() == false){
        return;
    }; // prepare snakes
    ejecution = setInterval(gameEjecution, tickTime); // ejecution every tick
};

ejecutionButton.onclick = () => {
    paused = !paused;
    if(paused){
        ejecutionButton.children[0].src = "img/pause.png"
        clearInterval(ejecution)
    }else{
        ejecutionButton.children[0].src = "img/resume.png"
        ejecution = setInterval(gameEjecution, tickTime);
    }
};
stopButton.onclick = () => {
    endSimulation();
}
startButton.onclick = () => {
    playSimulation();
}