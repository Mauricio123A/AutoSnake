screen = document.getElementById("screen");
button = document.getElementById("button");
text = document.getElementById("h1");
width = 25;
height = 25;
scale = 20;
array = [];
screen.style.display = "flex";
screen.style= "flex-wrap: wrap";
screen.style.width = width*scale +"px";
screen.style.height = height*scale +"px";

button.style.width = scale+"px";
button.style.height = scale+"px";
button.style.backgroundColor = "rgb(255,255,255)";

for(let i = 0; i < width*height; i++){
    array.push(false);
    buttonClone = button.cloneNode();
    screen.appendChild(buttonClone);
};
for(let i = 0; i < screen.children.length; i++){
    screen.children[i].onclick = ()=>{
        if(!array[i-1]){
            array[i-1] = true
            screen.children[i-1].style.backgroundColor = "rgb(0,0,0)";
        }else{
            array[i-1] = false
            screen.children[i-1].style.backgroundColor = "rgb(255,255,255)";
        }
        totext()
    }
}
function totext(){
    let innertext = "[";
    for(let i = 0; i < array.length; i++){
        if(array[i]){
            pos = ",[" + i%width + "," + Math.floor(i/height) + "]";
            innertext = innertext + pos
        }
    }
    textnew = innertext.slice(0,1) + innertext.slice(2) 
    innertext = textnew + "]"
    text.innerHTML = innertext
}
screen.removeChild(button);