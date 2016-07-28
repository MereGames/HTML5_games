//@ game_scene.js for Big War: The origin of the war
//@ Author - Mere Games or Rodion Kraynov
//@ Site - http://meregames.ru



const SPEED_MAP = 6;

var levelsPar = [
    {level: 0, size: 128, dif: "none", tum: true},
    {level: 1, size: 40, dif: "easy", tum: true},
    {level: 2, size: 40, dif: "easy", tum: true},
    {level: 3, size: 64, dif: "easy", tum: true},
    {level: 4, size: 64, dif: "easy", tum: true},
    {level: 5, size: 64, dif: "normal", tum: true},
    {level: 6, size: 80, dif: "normal", tum: true},
    {level: 7, size: 80, dif: "normal", tum: true},
    {level: 8, size: 80, dif: "normal", tum: true},
    {level: 9, size: 80, dif: "normal", tum: true},
    {level: 10, size: 128, dif: "hard", tum: true},
    {level: 11, size: 128, dif: "hard", tum: true},
    {level: 12, size: 128, dif: "hard", tum: true}
];

var selectsEdit = [];

var xS = 75;
var xT = 100;

var stopGame = false;
var viewDis = 64;
var devText = 1.15;

var xP = 0, yP = 0;

//select
var select = {
	x: -64,
	y: -64,
	width: 0,
	height: 0,

	draw: function () {
		ctx.fillStyle = "#999";
		ctx.strokeStyle = "#fff";
		ctx.globalAlpha = 0.5;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.strokeRect(this.x, this.y, this.width, this.height);
		ctx.globalAlpha = 1;
	}
}
var clicked = false;
var editMap = false;

var movAddX = 64, movAddY = 64;

var sceneObjs = [];


for(let i = 0; i < levelsPar.length; i++) {
	let arrLin = [];
	for(let u = 0;u < levelsPar[i].size; u++) {
		if(levelsPar[i].tum == true) {
	        arrLin.push({img: 0, tum: true});
	    }else {
	    	arrLin.push({img: 0, tum: false});
	    }
    }
    for(let t = 0; t < levelsPar[i].size; t++) {
    	levelsMaps[i].map.push(arrLin);
    }
    arrLin = null;
}

for(let num = 0; num < levelsMaps.length; num++) {
	levelsMaps[num].map = JSON.stringify(levelsMaps[num].map);
	levelsMaps[num].map = JSON.parse(levelsMaps[num].map);
}

sceneObjs.push(levelsPar, levelsMaps);

//Draw
function drawScene() {
	if(gameConfig[0].position == "level" || gameConfig[0].endLoad == "level") {
		loop1:
		for(let k = 0; k < 40; k++) {
			loop2:
			for(let l = 0; l < 40; l++) {
				if(levelsMaps[select_level].map[k][l].tum == true && TILE_SIZE * k + movAddX > -viewDis && TILE_SIZE * k + movAddX < WIDTH + viewDis && TILE_SIZE * l + movAddY > -viewDis && TILE_SIZE * l + movAddY < HEIGHT + viewDis) {
					ctx.drawImage(groundImages[levelsMaps[select_level].map[k][l].img], TILE_SIZE * k + movAddX, TILE_SIZE * l + movAddY, TILE_SIZE, TILE_SIZE);
					ctx.save();
					ctx.fillStyle = "#000";
					ctx.globalAlpha = 0.5;
					ctx.fillRect(TILE_SIZE * k + movAddX, TILE_SIZE * l + movAddY, TILE_SIZE, TILE_SIZE);
					ctx.restore();
				}else if(TILE_SIZE * k + movAddX > -viewDis && TILE_SIZE * k + movAddX < WIDTH + viewDis && TILE_SIZE * l + movAddY > -viewDis && TILE_SIZE * l + movAddY < HEIGHT + viewDis){
					ctx.drawImage(groundImages[levelsMaps[select_level].map[k][l].img], TILE_SIZE * k + movAddX, TILE_SIZE * l + movAddY, TILE_SIZE, TILE_SIZE);
				}
		    }
		}
	}else if(gameConfig[0].position == "free" || gameConfig[0].endLoad == "free") {
		loop1:
		for(let k = 0; k < mapsGame[idMap].map.length; k++) {
			loop2:
			for(let l = 0; l < mapsGame[idMap].map.length; l++) {
				if(mapsGame[idMap].map[k][l].img == -1) {
					continue loop1;
				}
				if(mapsGame[idMap].map[k][l].tum == true && TILE_SIZE * k + movAddX > -viewDis && TILE_SIZE * k + movAddX < WIDTH + viewDis && TILE_SIZE * l + movAddY > -viewDis && TILE_SIZE * l + movAddY < HEIGHT + viewDis) {
					ctx.drawImage(groundImages[mapsGame[idMap].map[k][l].img], TILE_SIZE * k + movAddX, TILE_SIZE * l + movAddY, TILE_SIZE, TILE_SIZE);
					ctx.save();
					ctx.fillStyle = "#000";
					ctx.globalAlpha = 0.4;
					ctx.fillRect(TILE_SIZE * k + movAddX, TILE_SIZE * l + movAddY, TILE_SIZE, TILE_SIZE);
					ctx.restore();
				}else if(TILE_SIZE * k + movAddX > -viewDis && TILE_SIZE * k + movAddX < WIDTH + viewDis && TILE_SIZE * l + movAddY > -viewDis && TILE_SIZE * l + movAddY < HEIGHT + viewDis){
					ctx.drawImage(groundImages[mapsGame[idMap].map[k][l].img], TILE_SIZE * k + movAddX, TILE_SIZE * l + movAddY, TILE_SIZE, TILE_SIZE);
				}
		    }
		}
	}else if(gameConfig[0].position == "mapEditor" || gameConfig[0].endLoad == "mapEditor") {
		loop1:
		for(let k = 0; k < levelsPar[0].size; k++) {
			loop2:
			for(let l = 0; l < levelsPar[0].size; l++) {
	            if(TILE_SIZE * k + movAddX > -viewDis && TILE_SIZE * k + movAddX < WIDTH + viewDis && TILE_SIZE * l + movAddY > -viewDis && TILE_SIZE * l + movAddY < HEIGHT + viewDis){
					ctx.drawImage(groundImages[levelsMaps[0].map[k][l].img], TILE_SIZE * k + movAddX, TILE_SIZE * l + movAddY, TILE_SIZE, TILE_SIZE);
				}
		    }
		}


		ctx.save();
		ctx.font = "30px Arial";
		for(let i = 0; i < groundImages.length; i++) {
			if(i == 2) {
				devText  = 1.22;
			}else if(i == 0 || i == 1){
				devText = 1.15;
			}else if(i == 3) {
				devText = 1.23;
			}else if(i == 4) {
				devText = 1.26;
			}else if(i == 5) {
				devText = 1.27;
			}else if(i == 6) {
				devText = 1.29;
			}
			if(selectsEdit[i].sel == false) {
			    ctx.strokeStyle = "#000000";
		    }else {
		    	ctx.strokeStyle = "#F5B339";
		    }
			if(i >= 1) {
			    ctx.drawImage(groundImages[i], xS * (i + 1), 40);
			    ctx.fillText(i, xT * (i + 1)/devText, 30);
			    ctx.strokeRect(xS * (i + 1), 40, 64, 64);
		    }else {
		    	ctx.drawImage(groundImages[i], xS, 40);
		    	ctx.fillText(i, xT, 30);
		    	ctx.strokeRect(xS, 40, 64, 64);
		    }
		}
		ctx.restore();

		if(gameConfig[0].position == "mapEditor" && clicked == true) {
			loop1:
			for(let j = 0; j < levelsPar[0].size; j++) {
				loop2:
				for(let l = 0; l < levelsPar[0].size; l++) {
				    if(xP >= TILE_SIZE * j + movAddX && xP <= TILE_SIZE * j + movAddX + TILE_SIZE &&  yP >= TILE_SIZE * l + movAddY && yP <= TILE_SIZE * l + movAddY + TILE_SIZE) {
				    	for(let p = 0; p < selectsEdit.length; p++) {
				    		if(selectsEdit[p].sel == true) {
				    			selectsEdit[p].num;
				    			levelsMaps[0].map[j][l].img = selectsEdit[p].num;
				    	        //return;
				    		}
				    	}
				    }
			    }
			}
		}
	}

	if(clicked == true && gameConfig[0].position != "mapEditor") {
		select.draw();
	}

	if(gameSave == true) {
		ctx.save();
		ctx.font = "40px cursive";
		ctx.fillStyle = "#fff";
		if(gameConfig[0].leng == "en") {
		    ctx.fillText("Save...", WIDTH/2 - 25, HEIGHT/2);
	    }else {
	    	ctx.fillText("Сохранение...", WIDTH/2 - 90, HEIGHT/2);
	    }
		ctx.restore();
	}
}


//Update
function updateScene() {
	if(gameConfig[0].pre_position == "none") {
		stopGame = false;
	}
	if(stopGame == false) {
	    document.body.style.cursor = "default";
	}
}


function moveMap(pos) {
	if(pos == "left" && movAddX < TILE_SIZE) {
		movAddX += SPEED_MAP;
	}else if(pos == "right" && movAddX > -(levelsPar[select_level].size * TILE_SIZE + TILE_SIZE - WIDTH)) {
		movAddX -= SPEED_MAP;
	}else if(pos == "down" && movAddY > -(levelsPar[select_level].size * TILE_SIZE + TILE_SIZE - HEIGHT)) {
		movAddY -= SPEED_MAP;
	}else if(pos == "top" && movAddY < TILE_SIZE) {
		movAddY += SPEED_MAP;
	}
}

function keyEvent(e) {
	let keyCode = e.keyCode;

	if(keyCode == keyCodes[0].code && keyCodes[0].name == "Esc") {
		if(gameConfig[0].leng == "en") {
	    	    objButtons[12].xt = WIDTH/2 - 50;
	    	}else {
	    	    objButtons[12].xt = WIDTH/2 - 75;
	    }

	    if(gameConfig[0].leng == "ru") {
	    	    objButtons[16].xt = WIDTH/2 - 80;
	    	}else {
	    	    objButtons[16].xt = WIDTH/2 - 70;
	    }
	    
		if(gameConfig[0].endLoad == "level" || gameConfig[0].endLoad == "free" || gameConfig[0].endLoad == "mapEditor") {
			if(gameConfig[0].pre_position != "_menu") {
		        gameConfig[0].pre_position = "_menu";
		        stopGame = true;
		    }else if(gameConfig[0].pre_position == "_menu"){
	    	gameConfig[0].pre_position = "none";
	    	stopGame = false;
	    }else {
	    	gameConfig[0].pre_position = "none";
	    	stopGame = false;
	    }
	    }
	}

	for(let i = 1; i < keyCodes.length; i++) {
		if(keyCode == keyCodes[i].code) {
			for(let o = 0; o < selectsEdit.length; o++) {
				selectsEdit[o].sel = false;
			}
			i--;
			selectsEdit[i].sel = true;
			i++;
		}
	}

	keyCode = null;
}

window.onkeydown = keyEvent;
canvas.onmousedown = function (e) {
	clicked = true;
	select.x = e.clientX;
	select.y = e.clientY;
}
canvas.onmouseup = function (e) {
	clicked = false;
	select.x = -64;
	select.y = -64;
	select.width = 0;
	select.height = 0;
}
