//@ objects.js for Big War: The origin of the war
//@ Author - Mere Games or Rodion Kraynov
//@ Site - http://meregames.ru


var buildsGame = [{name: "none"}];

//other objs
var objectsGame = [];

//Baze
var objBaze = {
	x: 64*9,
	y: 64*7,
	radius: 64*3,
	name: "baze",
	timeOut: 0,
	_timeOut: 50,
	num: 0,
	health: 7400,
	_health: 7400,
	type: "player",
	canFaer: false,

	draw: function() {
		if(this.x - this.radius - movAddX <= WIDTH + viewDis && this.x - this.radius - movAddX >= -viewDis && this.y - this.radius - movAddY <= HEIGHT + viewDis && this.y - this.radius - movAddY >= -viewDis) {
		    ctx.drawImage(objectImages[0], this.x - this.radius - movAddX, this.y - this.radius - movAddY);

		    ctx.save();
		    ctx.fillStyle = "#0AAC2B";
		    ctx.strokeStyle = "#fff";


		    ctx.fillRect(this.x - this.radius - movAddX + 5, this.y - this.radius - movAddY + 74, this.health/(this._health/64), 5);
		    ctx.strokeRect(this.x - this.radius - movAddX + 5, this.y - this.radius - movAddY + 74, this._health/(this._health/64), 5);

		    ctx.restore();
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
		        }else if(this.timeOut >= this._timeOut && numPlayer < maxPlayer && stopGame == false) {
		        	this.num -= 1;
		        	this.timeOut = 0;
		        	if(gameConfig[0].position == "free") {
		        	    objectsGame.push(new gameObject("robot", objectImages[1], "player", "bliz", this.x + 64, this.y, idMap, objsProp.player.robot.speed, objsProp.player.robot.health, objsProp.player.robot.ataca, objsProp.player.robot.reload));
		            }else {
		            	objectsGame.push(new gameObject("robot", objectImages[1], "player", "bliz", this.x + 64, this.y, levelsMaps[select_level].map[0].name,  objsProp.player.robot.speed, objsProp.player.robot.health, objsProp.player.robot.ataca, objsProp.player.robot.reload));
		            }
		            numPlayer += 1;
		        }
		    }
		    ctx.restore();

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
}

//Baze enemy
var objBazeEnemy = {
	x: 64*20,
	y: 64*20,
	name: "bazeEnemy",
	timeOut: 0,
	_timeOut: 50,
	num: 0,
	health: 1000,
	_health: 1000,
	type: "enemy",
	canFaer: true,
	reload: 30,
	_reload: 30,
	drawBol: true,
	ataca: 60,

	draw: function() {
		if(this.x - movAddX <= WIDTH + viewDis && this.x - movAddX >= -viewDis && this.y - movAddY <= HEIGHT + viewDis && this.y - movAddY >= -viewDis && this.drawBol == true) {
		    ctx.drawImage(objectImages[0], this.x - movAddX, this.y - movAddY);

		    ctx.save();
		    ctx.fillStyle = "red";
		    ctx.strokeStyle = "#fff";
		    ctx.fillRect(this.x - movAddX + 5, this.y - movAddY + 74, this.health/(this._health/64), 5);
		    ctx.strokeRect(this.x - movAddX + 5, this.y - movAddY + 74, this._health/(this._health/64), 5);
		    ctx.restore();
	    }

	    if(this.health <= 0) {
		    	this.health = 0;
		    }

	    if(gameConfig[0].position == "level") {
		    	if(select_level != 4) {
		    		this.health = this._health;
		    		this.ataca = 80;
		    	}
		    }

	    if(this.canFaer == true && stopGame == false) {
		    	if(this.reload >= this._reload) {
		    	    objBull.push(new bullet(this.x + 64, this.y + 32, 0, this.type, this.name));
		    	    objBull.push(new bullet(this.x, this.y + 32, 128, this.type, this.name, this.map));
		    	    objBull.push(new bullet(this.x + 32, this.y + 64, 64, this.type, this.name));
		    	    objBull.push(new bullet(this.x + 32, this.y, 192, this.type, this.name));

		    	    this.reload = 0;
		        }
		    }

		    if(this.reload < this._reload && stopGame == false) {
		    	this.reload += 1;
		    }

		    if(gameConfig[0].position == "free" && this.type == "enemy"){
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
		}else if(gameConfig[0].position == "level" && this.type == "enemy"){
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


var miniMap = {
	width: 192,
	heigth: 192,
	x: 704,
	y: 320,

	size: 8,

	draw: function () {
		ctx.save();
		ctx.fillStyle = "#9D6B0F";
		ctx.textAlign = "right";
		ctx.fillRect(872, 300, 25, 25);
		ctx.fillStyle = "#fff";
		ctx.font = "20px Arial";
		ctx.fillText("M", 892, 318);
		ctx.fillStyle = "green";
		ctx.fillRect(this.x, this.y, this.width, this.heigth);
		ctx.strokeStyle = "#fff";
		ctx.strokeRect(705, 321, this.width, this.heigth);
		if(gameConfig[0].position == "level") {
			for(let w = sizeMap; w-=1;) {
				for(let q = sizeMap; q-=1;) {
					ctx.save();

					if(levelsMaps[select_level].map[0].map[w][q].tum == true) {
					    ctx.fillStyle = "#000";
				    }else if(levelsMaps[select_level].map[0].map[w][q].img == 1 || levelsMaps[select_level].map[0].map[w][q].img == 5) {
				    	ctx.fillStyle = "#AC8A00";
				    }else if(levelsMaps[select_level].map[0].map[w][q].img == 2 || levelsMaps[select_level].map[0].map[w][q].img == 6) {
				    	ctx.fillStyle = "#806807";
				    }else if(levelsMaps[select_level].map[0].map[w][q].img == 3 || levelsMaps[select_level].map[0].map[w][q].img == 7 || levelsMaps[select_level].map[0].map[w][q].img == 9) {
				    	ctx.fillStyle = "#454545";
				    }else if(levelsMaps[select_level].map[0].map[w][q].img == 4) {
				    	ctx.fillStyle = "#E2C445";
				    }else if(levelsMaps[select_level].map[0].map[w][q].img == 8) {
				    	ctx.fillStyle = "blue";
				    }

				    if(numPlayer > 0 || numEnemy > 0) {
				    for(let a = numPlayer + numEnemy; a-=1;) {
				    	if(objectsGame[a].x - objectsGame[a].radius  >= 64 * w && objectsGame[a].x - objectsGame[a].radius <= 64 * w + 64 &&  objectsGame[a].y - objectsGame[a].radius >= 64 * q && objectsGame[a].y - objectsGame[a].radius <= 64 * q + 64) {
				    		if(levelsMaps[select_level].map[0].map[w][q].tum == false) {
				    			if(objectsGame[a].type == "player") {
				    		        ctx.fillStyle = "lightgreen";
				    		    }else {
				    		    	ctx.fillStyle = "red";
				    		    }
				    	    }
				    	}
				    }
				  }

				  //if(this.size*w <= this.width && this.size*q <= this.heigth) {
					ctx.fillRect(this.size*w + this.x + 1, this.size*q + this.y + 1, this.size, this.size);
				  //}
					ctx.restore();
			    }
			}
		}else if(gameConfig[0].position == "free") {
			for(let w = sizeMap; w-=1;) {
				for(let q = sizeMap; q-=1;) {
					ctx.save();

					if(mapsGame[idMap].map[w][q].tum == true) {
					    ctx.fillStyle = "#000";
				    }else if(mapsGame[idMap].map[w][q].img == 1 || mapsGame[idMap].map[w][q].img == 5) {
				    	ctx.fillStyle = "#AC8A00";
				    }else if(mapsGame[idMap].map[w][q].img == 2 || mapsGame[idMap].map[w][q].img == 6) {
				    	ctx.fillStyle = "#806807";
				    }else if(mapsGame[idMap].map[w][q].img == 3 || mapsGame[idMap].map[w][q].img == 7 || mapsGame[idMap].map[w][q].img == 9) {
				    	ctx.fillStyle = "#454545";
				    }else if(mapsGame[idMap].map[w][q].img == 4) {
				    	ctx.fillStyle = "#E2C445";
				    }else if(mapsGame[idMap].map[w][q].img == 8) {
				    	ctx.fillStyle = "blue";
				    }

				    if(numPlayer > 0 || numEnemy > 0) {
				    for(let a = numPlayer + numEnemy; a-=1;) {
				    	if(objectsGame[a].x - objectsGame[a].radius  >= 64 * w && objectsGame[a].x - objectsGame[a].radius <= 64 * w + 64 &&  objectsGame[a].y - objectsGame[a].radius >= 64 * q && objectsGame[a].y - objectsGame[a].radius <= 64 * q + 64) {
				    		if(mapsGame[idMap].map[w][q].tum == false) {
				    			if(objectsGame[a].type == "player") {
				    		        ctx.fillStyle = "lightgreen";
				    		    }else {
				    		    	ctx.fillStyle = "red";
				    		    }
				    	    }
				    	}
				    }
				  }

				  //if(this.size*w <= this.width && this.size*q <= this.heigth) {
					ctx.fillRect(this.size*w + this.x + 1, this.size*q + this.y + 1, this.size, this.size);
				  //}
					ctx.restore();
			    }
			}
		}
		ctx.restore();
	}
}
