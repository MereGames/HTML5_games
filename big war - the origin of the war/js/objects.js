//@ objects.js for Big War: The origin of the war
//@ Author - Mere Games or Rodion Kraynov
//@ Site - http://meregames.ru


var buildsGame = [{name: "none"}];

//other objs
var objectsGame = [];
var number = 0;

//Baze
var objBaze = {
	x: 64*9,
	y: 64*7,
	radius: 64*3,
	name: "baze",
	timeOut: 0,
	_timeOut: 50,
	num: 0,
	health: 5000,

	draw: function() {
		if(this.x - this.radius - movAddX <= WIDTH + viewDis && this.x - this.radius - movAddX >= -viewDis && this.y - this.radius - movAddY <= HEIGHT + viewDis && this.y - this.radius - movAddY >= -viewDis) {
		    ctx.drawImage(objectImages[0], this.x - this.radius - movAddX, this.y - this.radius - movAddY);
		    ctx.save();
		    ctx.font = "20px cursive";
		    ctx.textAlign = "center";
		    if(this.num > 0) {
		    	ctx.strokeStyle = "#fff";
		        ctx.fillText(this.num, this.x - this.radius - movAddX + 34, this.y - this.radius - movAddY + 40);
		        ctx.fillStyle = "blue";
		        ctx.fillRect(this.x - this.radius - movAddX + 5, this.y - this.radius - movAddY + 64, this.timeOut, 5);
		        ctx.strokeRect(this.x - this.radius - movAddX + 5, this.y - this.radius - movAddY + 64, this._timeOut, 5);
		        if(this.timeOut < this._timeOut && stopGame == false) {
		        	this.timeOut += 0.5;
		        }else if(this.timeOut >= this._timeOut) {
		        	this.num -= 1;
		        	this.timeOut = 0;
		        	objectsGame.push(new gameObject("robot", objectImages[1], "robot", "atac", this.x + 64, this.y, idMap, 2, 50, 10, number));
		        	number += 1;
		        	animationObjs.push({name: "robot", x: 0});
		        }
		    }
		    ctx.restore();
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
			for(let i = 0; i < levelsMaps[select_level].map.length; i++) {
				for(let j = 0; j < levelsMaps[select_level].map.length; j++) {
						if(this.x - 64 - movAddX >= 64 * i - movAddX && this.x - 64 - movAddX <= 64 * i - movAddX + 64 + this.radius &&  this.y - 64 - movAddY >= 64 * j - movAddY && this.y - 64 - movAddY <= 64 * j - movAddY + 64 + this.radius) {
						    levelsMaps[select_level].map[i][j].tum = false;
					    }
				}
			}
		}
	}
}

