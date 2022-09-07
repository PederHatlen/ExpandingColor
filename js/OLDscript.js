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
let loops = 0; //Current frame

//Draw properties
let color = "#000000";

window.onresize = setup; //Resizing makes setup run again
setup(); //init. setup after all values are declared

canvas.addEventListener("click", init_draw); //starting click-detection


//Setting up canvas/rescaling it
function setup() {

    width = canvas.clientWidth;
    height = canvas.clientHeight;
    aspectratio = width/height;

    canvas.setAttribute("width", width + "px");
    canvas.setAttribute("height", height + "px");

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
}

//Calculating all variables from click pos and initializing drawing
function init_draw(edata){
    canvas.removeEventListener("click", init_draw);

    var rect = edata.target.getBoundingClientRect();
    posX = edata.clientX - rect.left;
    posY = edata.clientY - rect.top;
    
    //
    mLeft = posX/iterations;
    mRight = (width - posX)/iterations;
    mTop = posY/iterations;
    mBottom = (height - posY)/iterations;

    rectOffsetNumX = ((width/2) - posX)/iterations;
    rectOffsetNumY = ((height/2) - posY)/iterations;

    color = getRandomColor();
    ctx.fillStyle = color;

    // console.log(mLeft * iterations + ", " + posX + " | " + mRight * iterations + ", " + (width-posX) + " | " + ((mRight*iterations) + (mLeft*iterations)) + ", " + width);
    console.log("Clickpos: x" + posX + ", y" + posY + " | FPS: " + fps + " | Total Frames: " + iterations + " | AspectRatio: " + parseFloat(aspectratio).toFixed(3));
    // console.log("Random color: %c" + color, "background: " + color + "; color: " + invertColor(color));

    drawinterval = setInterval(draw, 1000/fps);
}

//Drawing shit
function draw(){
    if (loops < iterations) {
        //adding margins/frames
        rectWidth = mLeft*(loops+1) + mRight*(loops+1);
        rectHeight = mTop*(loops+1) + mBottom*(loops+1);

        //calculating possition of center: position + length from center/2*the current frame - rectwidth/2(centering point in rectangle)
        rectPosX = posX + rectOffsetNumX*(loops+1) - (rectWidth/2);
        rectPosY = posY + rectOffsetNumY*(loops+1) - (rectHeight/2);

        //Drawing the image
        ctx.fillRect(rectPosX, rectPosY, rectWidth, rectHeight);
        // console.log(loops + " | X:"+rectPosX.toFixed(3)+" Y:"+rectPosY.toFixed(3)+" Width:"+rectWidth.toFixed(3)+" Height:"+rectHeight.toFixed(3));
        loops++;
    }
    else{
        console.log("Drawing completed! | Loops: " + loops);

        // ctx.fillStyle = invertColor(color);
        // ctx.fillRect(posX-5, posY-5, 10, 10);

        //Clear intervall and variables
        clearInterval(drawinterval);
        loops = 0;

        //Restart click-listener
        canvas.addEventListener("click", init_draw);
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
    hex = parseInt(hex.slice(1));
    let r = hex & 0xFF0000,
        g = hex & 0x00FF00,
        b = hex & 0x0000FF
    // http://stackoverflow.com/a/3943023/112731
    return (r * 0.299 + g * 0.587 + b * 0.114) > 128
        ? '#FFFFFF'
        : '#000000';
}