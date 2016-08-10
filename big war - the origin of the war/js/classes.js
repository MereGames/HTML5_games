//@ Classes for Big War: The origin of the war


var deleteProg = false;
var dev = 1.15;
var addDev = 0.07;

var objBull = [];

//Class button
var button = function (name, x, y, xt, yt, width, height, text, font, action, typeAction, type, img, over) {
	this.x = x;
	this.y = y;
	this.xt = xt;
	this.yt = yt;
	this.width = width;
	this.height = height;
	this.img = img;
	this.imgOver = img;
	this.font = font;
	this.over = over;
	this.name = name;

	this.text = text;
	this.action = action;
	this.typeAction = typeAction;
	this.type = type;


	this.draw = function () {
		if(this.type == "menu") {
			ctx.save();
			(this.over == true || this.over == 'true') ? ctx.globalAlpha = 0.5 : ctx.globalAlpha = 1;
			if(this.over == false) {
			    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
		    }else {
		    	ctx.drawImage(this.imgOver, this.x, this.y, this.width, this.height);
		    }
			ctx.font = this.font;
			ctx.fillText(this.text, this.xt, this.yt);
			ctx.restore();
		}
	}
	this.activ = function () {
		if(this.typeAction == "position") {
			gameConfig[0].endLoad = this.action;
			gameConfig[0].pre_position = "none";
			movAddX = -68;
			movAddY = -68;
			if(gameConfig[0].endLoad == "menu" || gameConfig[0].endLoad == "mapEditor") {
				levelsMaps[0].map = [];
				for(let i = 0; i < 1; i++) {
	for(let i = 0; i < 1; i++) {
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
}}
levelsMaps[0].map = JSON.stringify(levelsMaps[0].map);
levelsMaps[0].map = JSON.parse(levelsMaps[0].map);
			}
			if(this.action == "menuRel") {
				window.location.reload();
			}
			loadLocation(timesLoad[0].time);
		}else if(this.typeAction == "pre_position") {
			gameConfig[0].pre_position = this.action;
		}else if(this.typeAction == "leng"  && gameConfig[0].pre_position != "none") {
			lengGame(action);
		}else if(this.typeAction == "mus"  && gameConfig[0].pre_position != "none") {
			musikOnOff(action);
			return;
		}else if(this.typeAction == "dis"  && gameConfig[0].pre_position != "none") {
			if(objButtons[15].x == objButtons[14].x && this.name == "low") {
				objButtons[15].x = objButtons[13].x;
				viewDis = -TILE_SIZE;
			}else if(objButtons[15].x == objButtons[13].x && this.name == "hard") {
				objButtons[15].x = objButtons[14].x;
				viewDis = TILE_SIZE*2;
			}
		}else if(this.typeAction == "save"  && gameConfig[0].pre_position == "_menu") {
			gameConfig[0].pre_position = "none";
			if(gameSave == false) {
				gameSave = true;
				for(let t = 0; t < levelsMaps[0].map.length; t++) {
					for(let y = 0; y < levelsMaps[0].map.length; y++) {
					    levelsMaps[0].map[t][y].tum = true;
				    }
				}
				//Maps save
				mapsGame.push({name: "map_" + mapsGame.length, map: levelsMaps[0].map, playerData: {money: 99000, addMoney: 5, laut: 1, time: 10}});
				console.log("---------------------New Map------------------\n" + JSON.stringify(mapsGame));
				for(let i = (mapsGame.length - 1); i < mapsGame.length; i++) {
					if(i < 0) {
						i = 0;
					}
		    	    objButtons.push(new button(mapsGame[i].name, WIDTH/2 - 150, 40 + (i*60), WIDTH/2 -40, 65 + (i*65)/dev, 300, 40, mapsGame[i].name, "30px Arial", "free", "position", "menu", buttonImages[0], false));
		    	    tranTexts[0].ru.push({name: mapsGame[i].name, tran: mapsGame[i].name});
		    	    tranTexts[1].en.push({name: mapsGame[i].name, tran: mapsGame[i].name});
		        }
		        if(dev < 1.08) {
		        	dev = 1.08;
		        }else {
		        	dev -= 0.02;
		        }

			    setTimeout(function () {
				    gameSave = false;
			    }, 1500);
		    }
		}else if(this.typeAction == "del") {
			delMaps();
			deleteProg = true;
			return;
		}
	}
}

//Bullet
function bullet(x, y, anim, type, name) {
	this.x = x;
	this.y = y;
	this.anim = anim;
	this.speed = 8;
	this.time = 150;
	this.type = type;
	this.name = name;
	this.drawBol = true;

	this.draw = function () {
		if(this.x - movAddX <= WIDTH + viewDis && this.x - movAddX >= -viewDis && this.y - movAddY <= HEIGHT + viewDis && this.y - movAddY >= -viewDis && this.drawBol == true) {
		    ctx.drawImage(otherImages[2], this.x - movAddX, this.y - movAddY, 7, 7);

		    if(gameConfig[0].position == "free") {
			for(let i = 0; i < mapsGame[idMap].map.length; i++) {
				for(let j = 0; j < mapsGame[idMap].map.length; j++) {
						if(this.x >= 64 * i && this.x <= 64 * i + 64 &&  this.y >= 64 * j && this.y <= 64 * j + 64) {
						    if(mapsGame[idMap].map[i][j].tum == true) {
						    	this.drawBol = false;
						    }else {
						    	this.drawBol = true;
						    }
					    }
				}
			}
		}else if(gameConfig[0].position == "level") {
			for(let i = 0; i < levelsPar[select_level].size; i++) {
				for(let j = 0; j < levelsPar[select_level].size; j++) {
						if(this.x >= 64 * i && this.x <= 64 * i + 64 &&  this.y >= 64 * j && this.y <= 64 * j + 64) {
						    if(levelsMaps[select_level].map[0].map[i][j].tum == true) {
						    	this.drawBol = false;
						    }else {
						    	this.drawBol = true;
						    }
					    }
				}
			}
		}
	    }
	}
}

//Objects game
function gameObject(name, img, type, prof, x, y, map, speed, health, ataca, reload) {
	this.img = img;
	this.name = name;
	this.map = map;
	this.speed = speed;
	this._speed = speed;
	this.x = x;
	this.y = y;
	this.width = 64;
	this.height = 64;
	this.type = type;
	this.prof = prof;
	this.radius = 64*3;
	this.point = {x: x - 64*3 + 64, y: y - 64*3};
	this.select = false;
	this.ataca = ataca;
	this.animation = 0;
	this.reload = reload;
	this._reload = reload;
	this.drawBol = true;
	this.faer = false;
	this.target = {bull: false, en: 0, pl: 0};
	this.endLoop = true;

	this.gun1 = new Audio("audio/gun1.mp3");
    this.gun1.loop = false;

    this.boom1 = new Audio("audio/boom1.mp3");
    this.boom1.loop = false;

	this.boom = false;
	this.animEnd = false;
	this.animBoomY = 0;
	this.animBoomX = 0;

	this.health = health;
	this._health = health;


	this.iter = function () {
		if(this.animBoomX == 0 && this.animBoomY == 64 && this.boom == true) {
		    this.animEnd = true;
		}

		if(this.boom == true) {
			 for(let e = 0; e < 1; e++) {
	if(this.animBoomY == 64) {
		this.animBoomY = 0;
		return;
	}
	if(this.animBoomX == 64) {
		this.animBoomX = 0;
		this.animBoomY += 64;
		return;
	}
	this.animBoomX += 64;
  }
		}
},

	this.draw = function () {
		if(this.x - this.radius - movAddX <= WIDTH + viewDis && this.x - this.radius - movAddX >= -viewDis && this.y - this.radius - movAddY <= HEIGHT + viewDis && this.y - this.radius - movAddY >= -viewDis && this.drawBol == true) {
		    ctx.drawImage(img, this.animation, 0, 64, 64, this.x - this.radius - movAddX, this.y - this.radius - movAddY, 64, 64);
		    ctx.save();
		    if(this.type == "enemy") {
		    	ctx.fillStyle = "red";
		    }else {
		    	ctx.fillStyle = "#0AAC2B";
		    }
		    ctx.strokeStyle = "#fff";

		    ctx.fillRect(this.x - this.radius - movAddX + 5, this.y - this.radius - movAddY + 55, this.health/(this._health/64), 5);
		    ctx.strokeRect(this.x - this.radius - movAddX + 5, this.y - this.radius - movAddY + 55, this._health/(this._health/64), 5);

		    ctx.restore();
		    if(this.select == true) {
		    	ctx.strokeStyle = "red";
			    ctx.strokeRect(this.x - this.radius - movAddX, this.y - this.radius - movAddY, 64, 64);
		    }

		    if(this.boom == true) {
		    	ctx.drawImage(boomImages[0], this.animBoomX, this.animBoomY, 64, 64, this.x - this.radius - movAddX - 32, this.y - this.radius - movAddY - 32, 128, 128);
		    }
	    }

	    if(this.health <= 0) {
		    this.health = 0;
		}

		if(this.health >= this._health) {
			this.health = this._health;
		}


	    if(this.faer == true && stopGame == false) {
		    	if(this.reload >= this._reload) {
		    		if(this.animation == 0) {
		    	        objBull.push(new bullet(this.x - this.radius + 64, this.y - this.radius + 32, this.animation, this.type, this.name));
		    	    }else if(this.animation == 128) {
		    	    	objBull.push(new bullet(this.x - this.radius, this.y - this.radius + 32, this.animation, this.type, this.name));
		    	    }else if(this.animation == 64) {
		    	    	objBull.push(new bullet(this.x - this.radius + 32, this.y - this.radius + 64, this.animation, this.type, this.name));
		    	    }else if(this.animation == 192) {
		    	    	objBull.push(new bullet(this.x - this.radius + 32, this.y - this.radius, this.animation, this.type, this.name));
		    	    }
		    	    if(musikPlay == true) {
		    	        this.gun1.play();
		    	    }
		    	    this.reload = 0;
		        }
		    }

		    if(this.reload < this._reload && stopGame == false) {
		    	this.reload += 1;
		    }

		if(gameConfig[0].position == "free" && this.type != "enemy") {
			for(let i = 0; i < mapsGame[idMap].map.length; i++) {
				for(let j = 0; j < mapsGame[idMap].map.length; j++) {
						if(this.x - 64 - movAddX >= 64 * i - movAddX && this.x - 64 - movAddX <= 64 * i - movAddX + 64 + this.radius &&  this.y - 64 - movAddY >= 64 * j - movAddY && this.y - 64 - movAddY <= 64 * j - movAddY + 64 + this.radius) {
						    mapsGame[idMap].map[i][j].tum = false;
					    }
				}
			}
		}else if(gameConfig[0].position == "level" && this.type != "enemy") {
			for(let i = 0; i < levelsPar[select_level].size; i++) {
				for(let j = 0; j < levelsPar[select_level].size; j++) {
						if(this.x - 64 - movAddX >= 64 * i - movAddX && this.x - 64 - movAddX <= 64 * i - movAddX + 64 + this.radius &&  this.y - 64 - movAddY >= 64 * j - movAddY && this.y - 64 - movAddY <= 64 * j - movAddY + 64 + this.radius) {
						    levelsMaps[select_level].map[0].map[i][j].tum = false;
					    }
				}
			}
		}
		if(gameConfig[0].position == "free" && this.type == "enemy"){
			for(let i = 0; i < mapsGame[idMap].map.length; i++) {
				for(let j = 0; j < mapsGame[idMap].map.length; j++) {
						if(this.x - this.radius >= 64 * i && this.x - this.radius <= 64 * i + 64 &&  this.y - this.radius >= 64 * j && this.y - this.radius <= 64 * j + 64) {
						    if(mapsGame[idMap].map[i][j].tum == true) {
						    	this.drawBol = false;
						    }else {
						    	this.drawBol = true;
						    }
					    }
				}
			}
		}else if(gameConfig[0].position == "level" && this.type == "enemy"){
			for(let i = 0; i < levelsPar[select_level].size; i++) {
				for(let j = 0; j < levelsPar[select_level].size; j++) {
						if(this.x - this.radius >= 64 * i && this.x - this.radius <= 64 * i + 64 &&  this.y - this.radius >= 64 * j && this.y - this.radius <= 64 * j + 64) {
						    if(levelsMaps[select_level].map[0].map[i][j].tum == true) {
						    	this.drawBol = false;
						    }else {
						    	this.drawBol = true;
						    }
					    }
				}
			}
		}
	}
}

function build(name, img, x, y, radius, time, map, type, canFaer, reload, ataca, health, addRes) {
	this.name = name;
	this.img = img;
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.timeOut = 0;
	this._timeOut = time;
	this.num = 0;
	this.map = map;
	this.health = health;
	this._health = health;
	this.type = type;
	this.canFaer = canFaer;
	this.reload = reload;
	this._reload = reload;
	this.ataca = ataca;
	this.addRes = addRes;

	this.boom1 = new Audio("audio/boom1.mp3");
    this.boom1.loop = false;

	this.boom = false;
	this.animEnd = false;
	this.animBoomY = 0;
	this.animBoomX = 0;

	this.iter = function () {
		if(this.animBoomX == 0 && this.animBoomY == 64) {
		    this.animEnd = true;
		}

		if(this.boom == true) {
			 for(let e = 0; e < 1; e++) {
	if(this.animBoomY == 64) {
		this.animBoomY = 0;
		return;
	}
	if(this.animBoomX == 64) {
		this.animBoomX = 0;
		this.animBoomY += 64;
		return;
	}
	this.animBoomX += 64;
  }
		}
};

	this.draw = function () {
		if(this.x - this.radius - movAddX <= WIDTH + viewDis && this.x - this.radius - movAddX >= -viewDis && this.y - this.radius - movAddY <= HEIGHT + viewDis && this.y - this.radius - movAddY >= -viewDis) {
		    ctx.drawImage(img, this.x - this.radius - movAddX, this.y - this.radius - movAddY);

		    ctx.save();
		    ctx.fillStyle = "#0AAC2B";
		    ctx.strokeStyle = "#fff";
		    ctx.fillRect(this.x - this.radius - movAddX + 5, this.y - this.radius - movAddY + 74, this.health/(this._health/64), 5);
		    ctx.strokeRect(this.x - this.radius - movAddX + 5, this.y - this.radius - movAddY + 74, this._health/(this._health/64), 5);
		    ctx.restore();

		    if(this.boom == true) {
		    	ctx.drawImage(boomImages[0], this.animBoomX, this.animBoomY, 64, 64, this.x - this.radius - movAddX - 32, this.y - this.radius - movAddY - 32, 128, 128);
		    }
	    }

	    if(this.health <= 0) {
		     this.health = 0;
		}

	    ctx.save();
		    ctx.font = "20px cursive";
		    ctx.textAlign = "center";
		    if(this.num > 0) {
		    	ctx.strokeStyle = "#fff";
		        ctx.fillText(this.num, this.x - this.radius - movAddX + 34, this.y - this.radius - movAddY + 40);
		        ctx.fillStyle = "blue";

		        ctx.fillRect(this.x - this.radius - movAddX + 5, this.y - this.radius - movAddY + 66, this.timeOut/(this._timeOut/64), 5);
		        ctx.strokeRect(this.x - this.radius - movAddX + 5, this.y - this.radius - movAddY + 66, this._timeOut/(this._timeOut/64), 5);

		        if(this.timeOut < this._timeOut && stopGame == false) {
		        	this.timeOut += 0.5;
		        }else if(this.timeOut >= this._timeOut && stopGame == false && numPlayer < maxPlayer) {
		        	this.num -= 1;
		        	this.timeOut = 0;
		        	if(this.name == "army") {
		        		if(gameConfig[0].position == "free") {
		        	        objectsGame.push(new gameObject("tank", objectImages[2], "player", "dis", this.x + 64, this.y, idMap, objsProp.player.tank.speed, objsProp.player.tank.health, objsProp.player.tank.ataca, objsProp.player.tank.reload));
		        	    }else {
		        	    	objectsGame.push(new gameObject("tank", objectImages[2], "player", "dis", this.x + 64, this.y, levelsMaps[select_level].map[0].name, objsProp.player.tank.speed, objsProp.player.tank.health, objsProp.player.tank.ataca, objsProp.player.tank.reload));
		        	    }
		            }else if(this.name == "armyHard") {
		        		if(gameConfig[0].position == "free") {
		        	        objectsGame.push(new gameObject("tank_hard", objectImages[3], "player", "dis", this.x + 64, this.y, idMap, objsProp.player.tank_hard.speed, objsProp.player.tank_hard.health, objsProp.player.tank_hard.ataca, objsProp.player.tank_hard.reload));
		        	    }else {
		        	    	objectsGame.push(new gameObject("tank_hard", objectImages[3], "player", "dis", this.x + 64, this.y, levelsMaps[select_level].map[0].name, objsProp.player.tank_hard.speed, objsProp.player.tank_hard.health, objsProp.player.tank_hard.ataca, objsProp.player.tank_hard.reload));
		        	    }
		            }else if(this.name == "armyFast") {
		        		if(gameConfig[0].position == "free") {
		        	        objectsGame.push(new gameObject("tank_fast", objectImages[4], "player", "dis", this.x + 64, this.y, idMap, objsProp.player.tank_fast.speed, objsProp.player.tank_fast.health, objsProp.player.tank_fast.ataca, objsProp.player.tank_fast.reload));
		        	    }else {
		        	    	objectsGame.push(new gameObject("tank_fast", objectImages[4], "player", "dis", this.x + 64, this.y, levelsMaps[select_level].map[0].name, objsProp.player.tank_fast.speed, objsProp.player.tank_fast.health, objsProp.player.tank_fast.ataca, objsProp.player.tank_fast.reload));
		        	    }
		            }else if(this.name == "armyTwo") {
		        		if(gameConfig[0].position == "free") {
		        	        objectsGame.push(new gameObject("tank_two", objectImages[5], "player", "dis", this.x + 64, this.y, idMap, objsProp.player.tank_two.speed, objsProp.player.tank_two.health, objsProp.player.tank_two.ataca, objsProp.player.tank_two.reload));
		        	    }else {
		        	    	objectsGame.push(new gameObject("tank_two", objectImages[5], "player", "dis", this.x + 64, this.y, levelsMaps[select_level].map[0].name, objsProp.player.tank_two.speed, objsProp.player.tank_two.health, objsProp.player.tank_two.ataca, objsProp.player.tank_two.reload));
		        	    }
		            }

		            numPlayer += 1;
		        }
		    }
		    ctx.restore();

		    if(this.canFaer == true && stopGame == false) {
		    	if(this.reload >= this._reload) {
		    	    objBull.push(new bullet(this.x - this.radius + 64, this.y - this.radius + 32, 0, this.type, this.name));
		    	    objBull.push(new bullet(this.x - this.radius, this.y - this.radius + 32, 128, this.type, this.name, this.map));
		    	    objBull.push(new bullet(this.x - this.radius + 32, this.y - this.radius + 64, 64, this.type, this.name));
		    	    objBull.push(new bullet(this.x - this.radius + 32, this.y - this.radius, 192, this.type, this.name));

		    	    this.reload = 0;
		        }
		    }

		    if(this.reload < this._reload && stopGame == false) {
		    	this.reload += 1;
		    }
	}

	if(gameConfig[0].position == "free") {
			for(let i = 0; i < mapsGame[idMap].map.length; i++) {
				for(let j = 0; j < mapsGame[idMap].map.length; j++) {
						if(this.x - 64 - movAddX >= 64 * i - movAddX && this.x - 64 - movAddX <= 64 * i - movAddX + 64 + this.radius &&  this.y - 64 - movAddY >= 64 * j - movAddY && this.y - 64 - movAddY <= 64 * j - movAddY + 64 + this.radius) {
						    mapsGame[idMap].map[i][j].tum = false;
					    }
				}
			}
		}else if(gameConfig[0].position == "level") {
			for(let i = 0; i < levelsPar[select_level].size; i++) {
				for(let j = 0; j < levelsPar[select_level].size; j++) {
						if(this.x - 64 - movAddX >= 64 * i - movAddX && this.x - 64 - movAddX <= 64 * i - movAddX + 64 + this.radius &&  this.y - 64 - movAddY >= 64 * j - movAddY && this.y - 64 - movAddY <= 64 * j - movAddY + 64 + this.radius) {
						    levelsMaps[select_level].map[0].map[i][j].tum = false;
					    }
				}
			}
		}
}
