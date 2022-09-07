let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//Canvas properties
let width;
let height;
let drawinterval;
let iterations = 144;
let fps = 144;

let elementList = [];

function drawIndividual(i){
	// let now = performance.now();
	// console.log(now-then);
	elementList[i][0]++;
	let loops = elementList[i][0];

	let rectWidth = (width/iterations)*loops;
	let rectHeight = (height/iterations)*loops;

	let posX = (elementList[i][1]/iterations)*(iterations-loops);
	let posY = (elementList[i][2]/iterations)*(iterations-loops);

	ctx.fillStyle = elementList[i][3];
	ctx.fillRect(posX, posY, rectWidth, rectHeight);

	// console.log(performance.now()-now);
	// let wait = ((1000/fps)-(performance.now()-now));
}

function draw(){
	window.requestAnimationFrame(draw);
	for (let i = 0; i < elementList.length; i++) {    
		drawIndividual(i);
	}
	for (let i = 0; i < elementList.length; i++) {if (elementList[i][0] >= iterations) elementList.splice(i, 1);}
}

// Getting a random color
// https://stackoverflow.com/questions/1484506/random-color-generator
function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {color += letters[Math.floor(Math.random() * 16)];}
	return color;
}

//Calculating all variables from click pos and initializing drawing
canvas.onclick= function(e){
	// console.log(e.pageX, e.pageY);
	// let now = performance.now();
	// draw(0, getRandomColor(), e.pageX, e.pageY, now);
	elementList.push([0, e.pageX, e.pageY, getRandomColor()]);
}

//Setting up canvas/rescaling it
function setup() {
	width = window.innerWidth;
	height = window.innerHeight;

	canvas.setAttribute("width", width + "px");
	canvas.setAttribute("height", height + "px");

	// Writing the click text on the middle of the screen
	ctx.font = '2rem Arial';
	ctx.fillStyle = "White";
	ctx.textAlign = "center";
	ctx.fillText("Click", width/2, height/2);

	//ctx.fillStyle = color;
	//ctx.fillRect(0, 0, width, height);
}

window.onresize = setup; //Resizing makes setup run again
setup();
draw();