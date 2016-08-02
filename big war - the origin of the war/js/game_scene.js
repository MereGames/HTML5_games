//@ game_scene.js for Big War: The origin of the war
//@ Author - Mere Games or Rodion Kraynov
//@ Site - http://meregames.ru



const SPEED_MAP = 10;

var levelsPar = [
    {level: 0, size: 50, dif: "none", tum: true},
    {level: 1, size: 30, dif: "easy", tum: true},
    {level: 2, size: 30, dif: "easy", tum: true},
    {level: 3, size: 50, dif: "easy", tum: true},
    {level: 4, size: 50, dif: "easy", tum: true},
    {level: 5, size: 60, dif: "normal", tum: true},
    {level: 6, size: 70, dif: "normal", tum: true},
    {level: 7, size: 70, dif: "normal", tum: true},
    {level: 8, size: 70, dif: "normal", tum: true},
    {level: 9, size: 70, dif: "normal", tum: true},
    {level: 10, size: 90, dif: "hard", tum: true},
    {level: 11, size: 90, dif: "hard", tum: true},
    {level: 12, size: 90, dif: "hard", tum: true}
];

var selectsEdit = [];
var selectsBuilds = [];

var add;
var pause = false;
var lastTime = 10;

var xS = 75;
var xT = 100;

var viewBorders = [
    {name: "baze", view: false}
];

var stopGame = false;
var viewDis = 128;
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

var movAddX = -64, movAddY = -64;

var sceneObjs = [];

//Maps
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
		for(let k = 0; k < levelsPar[select_level].size; k++) {
			loop2:
			for(let l = 0; l < levelsPar[select_level].size; l++) {
				if(levelsMaps[select_level].map[k][l].tum == true && TILE_SIZE * k - movAddX > -viewDis && TILE_SIZE * k - movAddX < WIDTH + viewDis && TILE_SIZE * l - movAddY > -viewDis && TILE_SIZE * l - movAddY < HEIGHT + viewDis) {
					ctx.drawImage(groundImages[levelsMaps[select_level].map[k][l].img], TILE_SIZE * k - movAddX, TILE_SIZE * l - movAddY, TILE_SIZE, TILE_SIZE);
					ctx.save();
					ctx.fillStyle = "#000";
					ctx.globalAlpha = 0.5;
					ctx.fillRect(TILE_SIZE * k - movAddX, TILE_SIZE * l - movAddY, TILE_SIZE, TILE_SIZE);
					ctx.restore();
				}else if(TILE_SIZE * k - movAddX > -viewDis && TILE_SIZE * k - movAddX < WIDTH + viewDis && TILE_SIZE * l - movAddY > -viewDis && TILE_SIZE * l - movAddY < HEIGHT + viewDis){
					ctx.drawImage(groundImages[levelsMaps[select_level].map[k][l].img], TILE_SIZE * k - movAddX, TILE_SIZE * l - movAddY, TILE_SIZE, TILE_SIZE);
				}
		    }
		}

		//Objects
	    objBaze.draw();
	    


        //Update
	    if(gameConfig[0].pre_position != "_menu") {
	        collisionsObjects();
	        moveObjects();
	        killObjects();

	        moveEnemy();
	    }
	    
	}else if(gameConfig[0].position == "free" || gameConfig[0].endLoad == "free") {
		loop1:
		for(let k = 0; k < mapsGame[idMap].map.length; k++) {
			loop2:
			for(let l = 0; l < mapsGame[idMap].map.length; l++) {
				if(mapsGame[idMap].map[k][l].img == -1) {
					continue loop1;
				}
				if(mapsGame[idMap].map[k][l].tum == true && TILE_SIZE * k - movAddX > -viewDis && TILE_SIZE * k - movAddX < WIDTH + viewDis && TILE_SIZE * l - movAddY > -viewDis && TILE_SIZE * l - movAddY < HEIGHT + viewDis) {
					ctx.drawImage(groundImages[mapsGame[idMap].map[k][l].img], TILE_SIZE * k - movAddX, TILE_SIZE * l - movAddY, TILE_SIZE, TILE_SIZE);
					ctx.save();
					ctx.fillStyle = "#000";
					ctx.globalAlpha = 0.4;
					ctx.fillRect(TILE_SIZE * k - movAddX, TILE_SIZE * l - movAddY, TILE_SIZE, TILE_SIZE);
					ctx.restore();
				}else if(TILE_SIZE * k - movAddX > -viewDis && TILE_SIZE * k - movAddX < WIDTH + viewDis && TILE_SIZE * l - movAddY > -viewDis && TILE_SIZE * l - movAddY < HEIGHT + viewDis){
					ctx.drawImage(groundImages[mapsGame[idMap].map[k][l].img], TILE_SIZE * k - movAddX, TILE_SIZE * l - movAddY, TILE_SIZE, TILE_SIZE);
				}
		    }
		}

		//Objects
		objBaze.draw();
	    for(let h = 1; h < buildsGame.length; h++) {
	    	buildsGame[h].draw();
	    }

	    if(objectsGame.length > 0) {
	    	for(let n = 0; n < objectsGame.length; n++) {
	    		if(objectsGame[n].map == idMap) {
	    	        objectsGame[n].draw();
	    	    }
	        }
	    }

	    //View Borders
	    if(buildsGame.length > 0 && stopGame == false) {
	        for(let o = 1; o < viewBorders.length; o++) {
	        	for(let j = 0; j < buildsGame.length; j++) {
	              if(viewBorders[o].view == true) {
	            		if(buildsGame[j].name == "army") {
	    	                ctx.drawImage(bordersInfo[1], buildsGame[j].x - buildsGame[j].radius - movAddX, buildsGame[j].y - buildsGame[j].radius - movAddY, 64, 64);
	    	            }
	            }
	        }
	      }
	        if(viewBorders[0].view == true) {
	            ctx.drawImage(bordersInfo[0], objBaze.x - objBaze.radius - movAddX, objBaze.y - objBaze.radius - movAddY, 64, 64);
	        }
	    }else if(viewBorders[0].view == true && stopGame == false) {
	    	ctx.drawImage(bordersInfo[0], objBaze.x - objBaze.radius - movAddX, objBaze.y - objBaze.radius - movAddY, 64, 64);
	    }

	    //Update
	    if(gameConfig[0].pre_position != "_menu" && stopGame == false) {
	        collisionsObjects();
	        moveObjects();
	        killObjects();

	        moveEnemy();
	    }

	    for(let a = 0; a < objBull.length; a++) {
	    	objBull[a].draw();
	    }

	    //Left menu
	    for(let d = 0; d < buildings.length; d++) {
	    	ctx.save();
	    	ctx.fillStyle = "#9D6B0F";

	    	if(d == 0) {
	    	    ctx.fillRect(20, 20, 64, 64);
	        }else if(d == 1) {
	        	ctx.fillRect(20, 100, 64, 64);
	        }

	    	ctx.fillStyle = "#fff";
	    	ctx.font = "25px Arial";

	    	if(buildings[d].select == true) {
	    		ctx.strokeStyle = "red";
	    	}else {
	    		ctx.strokeStyle = "#fff";
	    	}

	    	if(d == 0) {
	    	    ctx.drawImage(buildImages[d], 20, 20);
	        }else if(d == 1) {
	        	ctx.drawImage(buildImages[d], 20, 100);
	        }

	        if(d == 0) {
	    	    ctx.strokeRect(20, 20, 64, 64);
	        }else if(d == 1) {
	        	ctx.strokeRect(20, 100, 64, 64);
	        }

	    	ctx.textAlign = "center";

	    	if(d == 0) {
	    	    ctx.fillText(d, 50, 40);
	        }else if(d == 1) {
	        	ctx.fillText(d, 50, 120);
	        }

	    	ctx.fillStyle = "yellow";
	    	ctx.font = "20px cursive";

	    	if(d == 0) {
	    	    ctx.fillText(buildings[d].price + "$", 50, 80);
	        }else if(d == 1) {
	        	ctx.fillText(buildings[d].price + "$", 50, 160);
	        }
	    	ctx.restore();

	    	if(buildings[d].select == true) {
	    		ctx.save();
	    		ctx.globalAlpha = 0.6;
	    		ctx.strokeStyle = "#FF4B0F";
	    		ctx.fillStyle = "red";
	    		ctx.drawImage(buildImages[d], preBuild.x, preBuild.y, 64, 64);
	    		if(preBuild.empty == false) {
	    			ctx.strokeRect(preBuild.x, preBuild.y, 64, 64);
	    			ctx.fillRect(preBuild.x, preBuild.y, 64, 64);
	    		}
	    		ctx.restore();
	    	}
	    }

	    //Player data
	    ctx.save();
	    ctx.textAlign = "right";
	    ctx.fillStyle = "#fff";
	    ctx.font = "30px cursive";
	    ctx.fillText(mapsGame[idMap].playerData.money.toLocaleString() + "$", WIDTH - 8, 32);
	    if(gameConfig[0].leng == "en") {
	        ctx.fillText("+"+mapsGame[idMap].playerData.addMoney.toLocaleString() + "$/sec", WIDTH - 8, 64);
	    }else {
	    	ctx.fillText("+"+mapsGame[idMap].playerData.addMoney.toLocaleString() + "$/сек", WIDTH - 8, 64);
	    }
	    ctx.textAlign = "center";
	    ctx.fillStyle = "red";
	    ctx.fillText(mapsGame[idMap].playerData.laut, WIDTH/2 + 20, HEIGHT - 10);
	    ctx.fillStyle = "yellow";
	    if(gameConfig[0].leng == "en") {
	        ctx.fillText(mapsGame[idMap].playerData.time + "s", WIDTH/2 - 40, HEIGHT - 10);
	    }else {
	    	ctx.fillText(mapsGame[idMap].playerData.time + "с", WIDTH/2 - 40, HEIGHT - 10);
	    }
	    ctx.restore();

	    //Pause
	    if(pause == true) {
	    	ctx.save();
	    	ctx.textAlign = "center";
	    	if(gameConfig[0].leng == "en") {
	    		ctx.fillText("Pause", WIDTH/2, 60);
	    	}else if(gameConfig[0].leng == "ru") {
	    		ctx.fillText("Пауза", WIDTH/2, 60);
	    	}
	    	ctx.restore();
	    }

	    //Map Editor
	}else if(gameConfig[0].position == "mapEditor" || gameConfig[0].endLoad == "mapEditor") {
		loop1:
		for(let k = 0; k < levelsPar[0].size; k++) {
			loop2:
			for(let l = 0; l < levelsPar[0].size; l++) {
	            if(TILE_SIZE * k - movAddX > -viewDis && TILE_SIZE * k - movAddX < WIDTH + viewDis && TILE_SIZE * l - movAddY > -viewDis && TILE_SIZE * l - movAddY < HEIGHT + viewDis){
					ctx.drawImage(groundImages[levelsMaps[0].map[k][l].img], TILE_SIZE * k - movAddX, TILE_SIZE * l - movAddY, TILE_SIZE, TILE_SIZE);
				}
		    }
		}

		//Objects
	    objBaze.draw();


        
        //Text and nums on editor img
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

		//Editor image
		if(gameConfig[0].position == "mapEditor" && clicked == true) {
			loop1:
			for(let j = 0; j < levelsPar[0].size; j++) {
				loop2:
				for(let l = 0; l < levelsPar[0].size; l++) {
				    if(xP >= TILE_SIZE * j - movAddX && xP <= TILE_SIZE * j - movAddX + TILE_SIZE &&  yP >= TILE_SIZE * l - movAddY && yP <= TILE_SIZE * l - movAddY + TILE_SIZE) {
				    	for(let p = 0; p < selectsEdit.length; p++) {
				    		if(selectsEdit[p].sel == true) {
				    			selectsEdit[p].num;
				    		    levelsMaps[0].map[j][l].img = selectsEdit[p].num;
				    		}
				    	}
				    }
			    }
			}
		}
	}

	//Save text
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
	if(gameConfig[0].pre_position == "none" && pause == false) {
		stopGame = false;
	}
	if(stopGame == false) {
	    document.body.style.cursor = "default";
	}

	for(let o = 0; o < viewBorders.length; o++) {
		if(viewBorders[o].view == true) {
			document.body.style.cursor = "pointer";
		}
	}

	if(stopGame == false && gameConfig[0].position == "free" || stopGame == false && gameConfig[0].position == "level") {
		addMoneyPlayer();
	}else {
		clearInterval(add);
		add = null;
	}
}

function addMoneyPlayer() {
	if(add == undefined || add == null) {
	add = setInterval(function () {
		if(gameConfig[0].position == "free") {
			mapsGame[idMap].playerData.money += mapsGame[idMap].playerData.addMoney;
		}
	}, 1000);
  }
}


//Move map
function moveMap(pos) {
	if(stopGame == false) {
	if(pos == "left" && movAddX > -TILE_SIZE) {
		movAddX -= SPEED_MAP;
	}else if(pos == "right" && movAddX < (levelsPar[select_level].size * TILE_SIZE + TILE_SIZE - WIDTH)) {
		movAddX += SPEED_MAP;
	}else if(pos == "down" && movAddY < (levelsPar[select_level].size * TILE_SIZE + TILE_SIZE - HEIGHT)) {
		movAddY += SPEED_MAP;
	}else if(pos == "top" && movAddY > -TILE_SIZE) {
		movAddY -= SPEED_MAP;
	}
}
}

//Keys
function keyEvent(e) {
	let keyCode = e.keyCode;

	if(keyCode == 80) {
	    	if(stopGame == false) {
	    		stopGame = true;
	    		pause = true;
	    		return;
	    	}else if(stopGame == true) {
	    		stopGame = false;
	    		pause = false;
	    	}
	    }

if(stopGame == false) {
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

	//For editor
  if(gameConfig[0].position == "mapEditor") {
	for(let i = 1; i < 11; i++) {
		if(keyCode == keyCodes[i].code) {
			for(let o = 0; o < selectsEdit.length; o++) {
				selectsEdit[o].sel = false;
			}
			i--;
			selectsEdit[i].sel = true;
			i++;
		}
	}
  }else if(gameConfig[0].position == "free" || gameConfig[0].position == "level") {
  	for(let i = 1; i < 11; i++) {
		if(keyCode == keyCodes[i].code) {
			i--;
			if(buildings[i].select == true) {
				buildings[i].select = false;
				return;
			}
			for(let o = 0; o < buildings.length; o++) {
				buildings[o].select = false;
			}
				buildings[i].select = true;
				preBuild.empty = false;
			i++;
		}
	}
  }


	//for all select whith name == name
	for(let n = 0; n < objectsGame.length; n++) {
		if(objectsGame[n].select == true && e.keyCode == keyCodes[11].code) {
			for(let t = 0; t < objectsGame.length; t++) {
				if(objectsGame[t].name == objectsGame[n].name) {
				    objectsGame[t].select = true;
			    }
			}
		}
	}
}

	keyCode = null;
}


//Move objects
function moveObjects() {
	for(let r = 0; r < objectsGame.length; r++) {
		if(objectsGame[r].map == idMap) {
			if(objectsGame[r].x - movAddX - objectsGame[r].radius < objectsGame[r].point.x - movAddX) {
				objectsGame[r].x += objectsGame[r].speed;
				objectsGame[r].animation = 0;

			}else if(objectsGame[r].x - movAddX - objectsGame[r].radius > objectsGame[r].point.x - movAddX) {
				objectsGame[r].x -= objectsGame[r].speed;
				objectsGame[r].animation = 128;
			}

			if(objectsGame[r].y - objectsGame[r].radius < objectsGame[r].point.y) {
				objectsGame[r].y += objectsGame[r].speed;
				objectsGame[r].animation = 64;
			}else if(objectsGame[r].y - objectsGame[r].radius > objectsGame[r].point.y) {
				objectsGame[r].y -= objectsGame[r].speed;
				objectsGame[r].animation = 192;
			}
		}
	}
	for(let b = 0; b < objBull.length; b++) {
		if(objBull[b].anim == 0) {
			objBull[b].x += objBull[b].speed;
		}else if(objBull[b].anim == 64) {
			objBull[b].y += objBull[b].speed;
		}else if(objBull[b].anim == 128) {
			objBull[b].x -= objBull[b].speed;
		}else if(objBull[b].anim == 192) {
			objBull[b].y -= objBull[b].speed;
		}
		objBull[b].time -= 1;
		if(objBull[b].time <= 0) {
			objBull.splice(1, b);
		}
	}
}

//Collisions
function collisionsObjects() {
	if(objectsGame.length > 0) {
	for(let n = 0; n < objectsGame.length; n++) {
		for(let r = 0; r < objectsGame.length; r++) {
		    if(objectsGame[n].x == objectsGame[r].x && objectsGame[n].y == objectsGame[r].y && n != r) {

		    	objectsGame[n].speed = 8;
		    	objectsGame[r].speed = 8;

		    	if(objectsGame[n].x+64 == objectsGame[r].x) {
		    	    objectsGame[n].point.x -= 64;
		        }else {
		        		objectsGame[n].point.x += 64;
		        }

		        if(objectsGame[r].y+64 == objectsGame[n].y) {
		    	    objectsGame[r].point.y -= 64;
		        }else {
		    	    objectsGame[r].point.y += 64;
		        }
		    	return;
		    }else {
		    	objectsGame[n].speed = objectsGame[n]._speed;
		    	objectsGame[r].speed = objectsGame[r]._speed;
		    }
	    }

	    if(objectsGame[n].y == TILE_SIZE*2 || objectsGame[n].y == TILE_SIZE*3) {
		    objectsGame[n].point.y += TILE_SIZE*3;
		}
		if(objectsGame[n].x == TILE_SIZE*2 || objectsGame[n].x == TILE_SIZE*3) {
		    objectsGame[n].point.x += TILE_SIZE*3;
		}

		if(objectsGame[n].y >= mapsGame[idMap].map.length * TILE_SIZE + TILE_SIZE*2 || objectsGame[n].x >= mapsGame[idMap].map.length * TILE_SIZE + TILE_SIZE*3) {
		    objectsGame[n].point.y -= TILE_SIZE*3;
		}
		if(objectsGame[n].x >= mapsGame[idMap].map.length * TILE_SIZE + TILE_SIZE*2 || objectsGame[n].x >= mapsGame[idMap].map.length * TILE_SIZE + TILE_SIZE*3) {
		    objectsGame[n].point.x -= TILE_SIZE*3;
		}
	}

	for(let u = 0; u < objectsGame.length; u++) {
	  for(let i = 0; i < mapsGame[idMap].map.length; i++) {
		for(let j = 0; j < mapsGame[idMap].map.length; j++) {
			if(TILE_SIZE*i == objectsGame[u].x - objectsGame[u].radius && TILE_SIZE*j == objectsGame[u].y - objectsGame[u].radius) {
				if(mapsGame[idMap].map[i][j].img == 9 || mapsGame[idMap].map[i][j].img == 8 || mapsGame[idMap].map[i][j].img == 3 || mapsGame[idMap].map[i][j].img == 7) {
					objectsGame[u].health = 0;
				}else if(mapsGame[idMap].map[i][j].img == 1 || mapsGame[idMap].map[i][j].img == 2 || mapsGame[idMap].map[i][j].img == 5 || mapsGame[idMap].map[i][j].img == 6) {
					objectsGame[u].point.x -= 64;
				    objectsGame[u].point.y -= 64;
				}
			}else if(TILE_SIZE*i == objectsGame[u].x + TILE_SIZE - objectsGame[u].radius && TILE_SIZE*j == objectsGame[u].y + TILE_SIZE - objectsGame[u].radius || TILE_SIZE*i == objectsGame[u].x - TILE_SIZE - objectsGame[u].radius && TILE_SIZE*j == objectsGame[u].y - TILE_SIZE - objectsGame[u].radius) {
				if(mapsGame[idMap].map[i][j].img == 1 || mapsGame[idMap].map[i][j].img == 2 || mapsGame[idMap].map[i][j].img == 5 || mapsGame[idMap].map[i][j].img == 6) {
				    if(TILE_SIZE*i == objectsGame[u].x + TILE_SIZE - objectsGame[u].radius && TILE_SIZE*j == objectsGame[u].y + TILE_SIZE - objectsGame[u].radius) {
				    	objectsGame[u].point.x -= 64;
				    	objectsGame[u].point.y -= 64;
				    }else if(TILE_SIZE*i == objectsGame[u].x - TILE_SIZE - objectsGame[u].radius && TILE_SIZE*j == objectsGame[u].y - TILE_SIZE - objectsGame[u].radius) {
				    	objectsGame[u].point.x += 64;
				    	objectsGame[u].point.y += 64;
				    }
				}
			}
	    }
	}
  }

  for(let o = 0; o < objectsGame.length; o++) {
	 for(let b = 0; b < objBull.length; b++) {
  		if(objBull[b].x >= objectsGame[o].x - objectsGame[o].radius && objBull[b].x <= objectsGame[o].x + 64 - objectsGame[o].radius) {
  			if(objBull[b].y >= objectsGame[o].y - objectsGame[o].radius && objBull[b].y <= objectsGame[o].y + 64 - objectsGame[o].radius) {
  				if(objectsGame[o].type != objBull[b].type) {
  					for(let q = 0; q < objectsGame.length; q++) {
  						if(q!=o && objBull[b].name == objectsGame[q].name) {
  					        objectsGame[o].health -= objectsGame[q].ataca;
  					        objBull.splice(1, b);
  					        return;
  					    }
  				    }
  				}
  			}
  		}
  	}
  }

  for(let p = 0; p < buildsGame.length; p++) {
  	for(let r = 0; r < objectsGame.length; r++) {
  		if(objectsGame[r].x - objectsGame[r].radius == buildsGame[p].x - buildsGame[p].radius && objectsGame[r].y - objectsGame[r].radius == buildsGame[p].y - buildsGame[p].radius || objectsGame[r].x - objectsGame[r].radius == objBaze.x - objBaze.radius && objectsGame[r].y - objectsGame[r].radius == objBaze.y - objBaze.radius) {
  			objectsGame[r].point.x += 64;
			objectsGame[r].point.y += 64;
  		}
  	}
  }
}
}


//Kill objects
function killObjects() {
	for(let r = 0; r < objectsGame.length; r++) {
		if(objectsGame[r].health <= 0) {
			//if(r != 0) {
			    objectsGame.splice(r, 1);
		    //}else {
		    	//objectsGame.splice(r, 1);
		    //}
		}
	}
}

//Emeny move
function moveEnemy() {
	for(let r = 0; r < objectsGame.length; r++) {
		for(let p = 0; p < objectsGame.length; p++) {
		    if(r != p && objectsGame[r].type == "enemy") {
		    	objectsGame[r].faer = true;
		    	if(objectsGame[r].x != objectsGame[p].x + 256) {
		    		objectsGame[r].point.x = objectsGame[p].x;
		    	}
		    	if(objectsGame[r].y != objectsGame[p].y + 256) {
		    		objectsGame[r].point.y = objectsGame[p].y;
		    	}
		    }

		    if(objectsGame[r].x == objectsGame[p].x) {
		    	objectsGame[r].faer = true;
		    }
   }
  }

  for(let d = 0; d < objectsGame.length; d++) {
  	for(let s = 0; s < objectsGame.length; s++) {
  		if(objectsGame[d].type == "enemy" && objectsGame[s].type == "enemy" && s != d) {
  			if(objectsGame[d].point.x == objectsGame[s].point.x) {
  				objectsGame[d].point.x = 64;
  			}
  		}
  	}
  }
}

//Timer
function timerLauts() {
	setInterval(function () {
		if(mapsGame.length > 0 && stopGame == false) {
			if(gameConfig[0].position == "free" || gameConfig[0].position == "level") {
		      if(mapsGame[idMap].playerData.time > 0) {
		          mapsGame[idMap].playerData.time -= 1;
	          }else {
	          	mapsGame[idMap].playerData.time = lastTime + 20;
	          	lastTime = lastTime + 20;
	          	mapsGame[idMap].playerData.laut += 1;
	          	createEnemy();
	          }
	      }
	    }
	}, 1000);
}
timerLauts();


//Enemy
function createEnemy() {
	for(let k = 0; k < mapsGame[idMap].playerData.laut * 3; k++) {
	    objectsGame.push(new gameObject("tank", objectImagesEnemy[0], "enemy", "dis", 256, 256, idMap, 1, 100, 10, 20));
    }
}

window.onkeydown = keyEvent;
canvas.onmousedown = function (e) {
	clicked = true;
	let x = e.clientX;
	let y = e.clientY;

	if(e.shiftKey == false && e.altKey == false) {
	    for(let n = 0; n < objectsGame.length; n++) {
		    objectsGame[n].select = false;
	    }
    }
}
canvas.onmouseup = function (e) {
	clicked = false;
	select.x = -64;
	select.y = -64;
	select.width = 0;
	select.height = 0;
}
