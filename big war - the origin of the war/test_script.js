"use strict";

var tileSize = 64;
var numW = 13, numH = 7;

const WIDTH = numW*tileSize, HEIGHT = numH*tileSize;
var canvas = document.getElementById("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
canvas.style.background = "black";
var ctx = canvas.getContext("2d");

var tile = new Image();
tile.src = "img/ground_0.png";

var baze = new Image();
baze.src = "img/baze_1.png";

var tiles = new Image();
tiles.src = 'tiles.png';

var three = new Image();
three.src = 'img/three_0.png';

var clicked = false;

//Initilisation
function init() {
	requestAnimationFrame(loop, canvas);
}

function loop() {
	update();
	draw();

	requestAnimationFrame(loop, canvas);
}

//Box plaers
var boxA = {
	x: 100,
	y: 100,
	select: false,
	point: {
		x: this.x,
		y: this.y
	},
	width: tileSize/2,
	height: tileSize/2,
	draw: function (type) {
		if(type == "simple") {
			ctx.fillStyle = "red";
		    ctx.fillRect(this.x, this.y, this.width, this.height);
	    }else {
	    	ctx.fillStyle = "yellow";
	    	ctx.fillRect(this.x, this.y, this.width, this.height);
	    }
	}
}

var select = {
	x: 0,
	y: 0,
	width: 10,
	height: 100,

	draw: function () {
		ctx.fillStyle = "#999";
		ctx.globalAlpha = 0.5;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.globalAlpha = 1;
	}
}

var protoMap = [];
protoMap.push(tile, tile, tile, tile, tile, tile, three, tile, tile, tile, tile, tile, baze);
var gameMap = [];
var arr = [];
for(let w = 0; w < numW; w++) {
	arr.push(protoMap[w]);
}
for(let h = 0; h < numH; h++) {
	gameMap.push(arr);
}

var solders = [];

function loop() {
	update();
	draw();

	requestAnimationFrame(loop, canvas);
}

var soldersTwo = [];
var h = 0, w = 0;

//Draw
function draw() {
	//draw map
	h = 0;
	w = 0;
	for(let i = 0; i < HEIGHT; i += tileSize, h+=1) {
		for(let j = 0; j < WIDTH; j += tileSize, w+=1) {
			    ctx.drawImage(gameMap[h][w], j, i, tileSize, tileSize);
		}
		w = 0;
	}
	if(boxA.select == false) {
		boxA.draw("simple");
	}else {
		boxA.draw("");
	}

	if(clicked == true) {
		select.draw();
	}

	ctx.save();

	ctx.translate(64,64);
    ctx.rotate(degRotate(180));
    ctx.drawImage(baze, -baze.width/2, -baze.width/2);

    ctx.restore();
}

const speedGame = 1;

function update() {
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	
	if(boxA.x != boxA.point.x || boxA.y != boxA.point.y) {
		if(boxA.x > boxA.point.x) {
			boxA.x -= speedGame;
		}else if(boxA.x < boxA.point.x){
			boxA.x += speedGame;
		}

		if(boxA.y > boxA.point.y) {
			boxA.y -= speedGame;
		}else if(boxA.y < boxA.point.y){
			boxA.y += speedGame;
		}
	}
}

//Classes
function ClassSolder(type) {
	this.width = 30;
	this.height = 30;
	this.health = 100;
	if(type == "one") {
	  this.x = 50 - (this.width/2);
	  this.y = 250 - (this.height/2);
    }else {
      this.x = 750 - (this.width/2);
	  this.y = 250 - (this.height/2);
    }
	this.draw = function () {
		if(type == "two") {
		  ctx.fillStyle = "red";
	    }else {
	    	ctx.fillStyle = "green";
	    }
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = "black";
	}
}

function degRotate(num) {
	return num * Math.PI/180;
}

//Events
function clickEvent(e) {
}

function moveEvent(e) {
	let x = e.pageX;
	let y = e.pageY;

	if(clicked == true) {
		select.width = e.offsetX - select.x;
		select.height = e.offsetY - select.y;

		if(select.x + select.width >= boxA.x && select.y + select.height >= boxA.y && select.x < boxA.x && select.y < boxA.y || select.x + select.width <= boxA.x + boxA.width && select.y + select.height <= boxA.y + boxA.height && select.x > boxA.x && select.y > boxA.y) {
		    boxA.select = true;
	    }else {
	    	boxA.select = false;
	    }
	}
	/*if(clicked == true && select.x < boxA.x && select.y < boxA.y) {
		if((e.offsetX - select.x) >= boxA.x -  boxA.width && (e.offsetY - select.y) >= boxA.y - boxA.height && clicked == true) {
		   boxA.select = true;
	    }else {
		   boxA.select = false;
	    }
	}else if(clicked == true && select.x > boxA.x && select.y > boxA.y) {
		if(e.offsetX <= boxA.x && e.offsetY <= boxA.y && clicked == true) {
		   boxA.select = true;
	    }else {
		   boxA.select = false;
	    }
	}*/
}

canvas.onmousemove = moveEvent;
canvas.onclick = clickEvent;
canvas.onmousedown = function (e) {
	clicked = true;
	select.x = e.clientX;
	select.y = e.clientY;

	var x = e.clientX;
	var y = e.clientY;



	if(x >= boxA.x && x <= boxA.x + boxA.width && y >= boxA.y && y <= boxA.y + boxA.height) {
		boxA.select = true;
	}else if(e.shiftKey == false){
		boxA.select = false;
	}

	if(e.shiftKey == true && boxA.select == true) {
		boxA.point.x = x;
		boxA.point.y = y;
	}
}
canvas.onmouseup = function (e) {
	clicked = false;
	select.width = 0;
	select.height = 0;
	select.x = 0;
	select.y = 0;
}
window.onload = init;