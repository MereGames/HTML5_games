//@ objects.js for Big War: The origin of the war
//@ Author - Mere Games or Rodion Kraynov
//@ Site - http://meregames.ru


var buildsGame = [];

//Baze
var objBaze = {
	x: 64*9,
	y: 64*7,
	radius: 64*3,
	name: "baze",

	draw: function() {
		if(this.x - this.radius - movAddX <= WIDTH + viewDis && this.x - this.radius - movAddX >= -viewDis && this.y - this.radius - movAddY <= HEIGHT + viewDis && this.y - this.radius - movAddY >= -viewDis) {
		    ctx.drawImage(objectImages[0], this.x - this.radius - movAddX, this.y - this.radius - movAddY);
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

buildsGame.push(objBaze);

//other objs
var objectsGame = [];
