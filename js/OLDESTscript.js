let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//Initiate all variables
//Click pos
let posX;
let posY;

//Canvas properties
let width;
let height;
let aspectratio;

//Rectangle properties
let rectWidth;
let rectHeight;
let rectOffsetNumX;
let rectOffsetNumY;
let rectPosX;
let rectPosY;
//Margin Left, Right, Top, Bottom
let mLeft;
let mRight;
let mTop;
let mBottom;

//Interval properties
let drawinterval;
let iterations = 60;
let fps = 60;
let loops = 0;

//Draw properties
let color = "#000000";

window.onresize = setup;
setup();
window.addEventListener("click", init_draw);


//Setting up canvas/rescaling it
function setup() {
    width = window.innerWidth;
    height = window.innerHeight;
    aspectratio = width/height;

    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
}

//Calculating all variables from click pos/initializing drawing
function init_draw(edata){
    window.removeEventListener("click", init_draw);

    posX = edata.clientX;
    posY = edata.clientY;
    
    mLeft = posX/iterations
    mRight = (width - posX)/iterations

    mTop = posY/iterations
    mBottom = (height - posY)/iterations
    
    rectWidth = mLeft + mRight;
    rectHeight = mTop + mBottom;

    rectOffsetNumX = ((width/2) - posX)/iterations;
    rectOffsetNumY = ((height/2) - posY)/iterations;

    rectPosX = posX + rectOffsetNumX + (rectWidth/2);
    rectPosY = posY + rectOffsetNumY + (rectHeight/2);

    color = getRandomColor();
    ctx.fillStyle = color;


    console.log("Clickpos: x" + posX + ", y" + posY + " | FPS: " + fps + " | Total Frames: " + iterations + " | AspectRatio: " + parseFloat(aspectratio).toFixed(3));
    console.log("Random color: %c" + color, "background: " + color + "; color: " + invertColor(color));
    
    drawinterval = setInterval(draw, 1000/fps);
}

//Drawing shit
function draw(){
    if (loops < iterations-1) {
        ctx.fillRect(rectPosX, rectPosY, rectWidth, rectHeight)
        rectWidth += mLeft + mRight;
        rectHeight += mTop + mBottom;
        rectPosX = posX + rectOffsetNumX*loops - (rectWidth/2);
        rectPosY = posY + rectOffsetNumY*loops - (rectHeight/2);
        loops++;
    }
    else{
        //Last loop resets things and restarts click-listener
        ctx.fillRect(0, 0, width, height);
        console.log("Drawing completed!");
        clearInterval(drawinterval);
        loops = 0;

        window.addEventListener("click", init_draw);
    }
}


//Getting a random color
//https://stackoverflow.com/questions/1484506/random-color-generator
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {color += letters[Math.floor(Math.random() * 16)];}
    return color;
}

//Outputting either black or white based on color brightness
//Inspired by https://stackoverflow.com/questions/35969656/how-can-i-generate-the-opposite-color-according-to-current-color
function invertColor(hex) {
    hex = hex.slice(1);
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);

    // http://stackoverflow.com/a/3943023/112731
    return (r * 0.299 + g * 0.587 + b * 0.114) > 128
        ? '#000000'
        : '#FFFFFF';
}