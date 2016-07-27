"use strict";

var audio = new Audio();
audio.src = 'aud.mp3';
audio.play();

var WIDTH = 800, HEIGHT = 500;

canvas.width = WIDTH;
canvas.height = HEIGHT;
var ctx = canvas.getContext("2d");
canvas.style.background = "lightblue";

var elemsGame = [
    {player: {x: WIDTH/2 - 20, y: HEIGHT - 50, move: 2, score: 0}}
];

var lengthPoints = 90;
var addScore = 1000;

setInterval(function (){
	if(gameConfig[1].pos == "game") {
		gameConfig[1].speed += 0.1;
		elemsGame[0].player.move += 0.03;
	}else{
		gameConfig[1].speed = 1;
	}
}, 2000);

setInterval(function() {
	if(gameConfig[1].pos == "game") {
		if(addScore < 200) {
			 addScore -= 20;
		}else {
			 addScore = 200;
		}
		 elemsGame[0].player.score += 1;
	}else {
		addScore = 1000;
	}
}, addScore);

//Logo Game
var logo = new Image();
logo.src = 'logo.png';

var pointPlayer = new Image();
pointPlayer.src = 'point.png';

var point = new Image();
point.src = 'point2.png';

var musicOn = new Image();
musicOn.src = 'musicOn.png';

var musicOff = new Image();
musicOff.src = 'musicOff.png';

var music = false;

for(var i = 0; i < lengthPoints; i++) {
	var obj = {x: Math.round(Math.random()*WIDTH), y: Math.round(Math.random()*WIDTH), num: i};
	elemsGame.push(obj);
}

for(var t = 1; t < lengthPoints; t++) {
	for(var r = 1; r < lengthPoints; r++) {
		if(t!=r) {
			if(elemsGame[t].x >= elemsGame[r].x && elemsGame[t].x < elemsGame[r].x+ 30 && elemsGame[t].y >= elemsGame[r].y && elemsGame[t].y < elemsGame[r].y+ 30) {
				elemsGame[t].x += 20;
				elemsGame[r].x -= 20;
				
				elemsGame[t].y += 20;
				elemsGame[r].y -= 20;
			}
		}
	}
}
//Configuration Game
var gameConfig = [
    {name: "Through points", version: "v-0.7.6"},
	{pos: "preLoad", speed: 1, bestScore: 0}
];



//Main Function or Init
function main() {
	setTimeout(function () {
		gameConfig[1].pos = "menu";
	}, 2000);
	loadScore();
}

//Loop Game
function loopGame() {
	updateElems();
	drawElems();
	moveEnemyPoint();
	
	requestAnimationFrame(loopGame, canvas);
}
requestAnimationFrame(loopGame, canvas);

//Draw Elements
var overPlay = false;
function drawElems() {
	if(gameConfig[1].pos === "preLoad") {
		ctx.drawImage(logo, -1, 0, WIDTH+1, HEIGHT);
	}else if(gameConfig[1].pos === "menu") {
		for(var j = 1; j < lengthPoints; j++) {
			ctx.drawImage(point, elemsGame[j].x, elemsGame[j].y);
		}
		ctx.strokeRect(WIDTH/2-135, HEIGHT/2 - 30, 270,60);
		ctx.fillStyle = "#000";
		if(overPlay == true) {
			ctx.fillRect(WIDTH/2-135, HEIGHT/2-30, 270, 60);
		}
		if(music == true) {
			ctx.drawImage(musicOn, WIDTH-50, -5, 50, 50);
		}else{
			ctx.drawImage(musicOff, WIDTH-50, -5, 50, 50);
		}
		ctx.font = "40px Arial";
		ctx.fillStyle = "#fff";
		ctx.fillText("Play", WIDTH/2 - 40, HEIGHT/2 + 15);
		ctx.font = "20px Arial";
		ctx.fillText("Best Score: "+gameConfig[1].bestScore, WIDTH/2 - 60, HEIGHT/2 + 55);
	}else if(gameConfig[1].pos == "game") {
		 for(var j = 1; j < lengthPoints; j++) {
			ctx.drawImage(point, elemsGame[j].x, elemsGame[j].y);
		 }
		 ctx.drawImage(pointPlayer, elemsGame[0].player.x, elemsGame[0].player.y);
		 ctx.font = "40px Arial";
		 ctx.fillText("Score: "+elemsGame[0].player.score, WIDTH/2-60, 50);
	}
	ctx.fillStyle = "#fff";
	ctx.font = "17px Arial";
	ctx.fillText(gameConfig[0].version, WIDTH-60, HEIGHT - 7);
}

var iterMove = false;
var x, y;
var itr;
function movePoint(e) {
	 x = e.pageX;
    y = e.pageY;
	 if(x > WIDTH/2-135 && x < WIDTH/2+135 && y > HEIGHT/2-30 && y < HEIGHT/2+30) {
    	overPlay = true;
    }else {overPlay = false;}
	if(gameConfig[1].pos == "game") {
	
	if(iterMove == false) {
		itr = setInterval(function () {
          if(x > elemsGame[0].player.x && elemsGame[0].player.x < WIDTH-25) {
	          elemsGame[0].player.x += elemsGame[0].player.move;
	      }else if(x < elemsGame[0].player.x && elemsGame[0].player.x > 0) {
		      elemsGame[0].player.x -= elemsGame[0].player.move;
	      }
	      
	      if(y > elemsGame[0].player.y && elemsGame[0].player.y < HEIGHT-25) {
	          elemsGame[0].player.y += elemsGame[0].player.move;
	      }else if(y < elemsGame[0].player.y && elemsGame[0].player.y > 0) {
		      elemsGame[0].player.y -= elemsGame[0].player.move;
	      }
	      
	      if(x == elemsGame[0].player.x && y == elemsGame[0].player.y) {
	      	  iterMove = false;
	      	  clearInterval(itr);
	      }
		}, 1000/60);
		iterMove = true;
	}
	
	}
}

function moveEnemyPoint() {
	for(var w = 0; w < lengthPoints; w++) {
		elemsGame[w].y += gameConfig[1].speed;
		if(elemsGame[w].y > HEIGHT + 30) {
			elemsGame[w].y = -100;
			elemsGame[w].x = Math.round(Math.random()*WIDTH);
		}
		checkCollision();
	}
}

function checkCollision() {
	if(gameConfig[1].pos == "game") {
		for(var q = 1; q < lengthPoints; q++) {
			if(elemsGame[0].player.x >= elemsGame[q].x && elemsGame[0].player.x <= elemsGame[q].x + 19 || elemsGame[0].player.x <= elemsGame[q].x + 19 && elemsGame[0].player.x >= elemsGame[q].x-19) {
				if(elemsGame[0].player.y >= elemsGame[q].y-19 && elemsGame[0].player.y <= elemsGame[q].y + 19) {
					gameConfig[1].pos = "menu";
					gameConfig[1].speed = 1;
					if(elemsGame[0].player.score > gameConfig[1].bestScore) gameConfig[1].bestScore = elemsGame[0].player.score;
					elemsGame[0].player.score = 0;
					saveScore();
				}
			}
		}
	}
}

//Update Elements
function updateElems() {
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	
	 for(var t = 1; t < lengthPoints; t++) {
	for(var r = 1; r < lengthPoints; r++) {
		if(t!=r) {
			if(elemsGame[t].x >= elemsGame[r].x && elemsGame[t].x < elemsGame[r].x+ 35 && elemsGame[t].y >= elemsGame[r].y && elemsGame[t].y < elemsGame[r].y+ 35) {
				elemsGame[t].x += 20;
				elemsGame[r].x -= 20;
				
				elemsGame[t].y += 20;
				elemsGame[r].y -= 20;
			}
		}
	}
}
	
	
}

function clickEvents(e) {
	var pX = e.pageX;
	var pY = e.pageY;
	
	if(gameConfig[1].pos == "menu") {
		if(pX >= WIDTH/2-135 && pX <= WIDTH/2+135 && pY > HEIGHT/2 && pY < HEIGHT/2+30) {
			gameConfig[1].pos = "game";
			for(var j = 1; j < lengthPoints; j++) {
				elemsGame[j].y += -HEIGHT;
				elemsGame[0].player.move = 2;
			}
		}
	}
	if(pX >= WIDTH-50 && pX <= WIDTH-5 && pY >= 5 && pY <= 45 ) {
		if(music == true) {
		    music = false;
		    musicGameOff();
		}else {
			music = true;
			musicGameOn();
		}
	}
}

function musicGameOn() {
	audio.play();
}
function musicGameOff() {
	audio.pause();
}

function saveScore() {
	localStorage.setItem("best", gameConfig[1].bestScore);
}

function loadScore() {
	gameConfig[1].bestScore = localStorage.getItem("best");
	if(gameConfig[1].bestScore == undifined || gameConfig[1].bestScore == null) {
		gameConfig[1].bestScore = 0;
	}
}

canvas.onclick = clickEvents;
canvas.onmousemove = movePoint;
canvas.onmouseout = function () {
	iterMove = false;
	clearInterval(itr);
}
window.onload = main;