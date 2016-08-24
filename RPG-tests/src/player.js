/**
*
* @ Copyryght Mere Games 2016
* @ support@meregames.ru
* @ Mail - meregames@mail.ru
*
**/

var sizeMap = 2;
var maxSizeMap = 3;

//Player main
var mainPlayer = game.newAnimationObject({
	animation: tiles.newImage("img/player.png").getAnimation(0, 0, 109, 200, 1),
	delay: 20,
	x: 0, y: 0,
	w: 70, h: 120,
	angle: 0,
	alpha: 1,
	visible: true
});

//My data for obj 'player'
mainPlayer.setUserData({
	//Baze
	health: 10,
	maxHealth: 10,
	engMana: 20,
	maxEngMana: 30,
	superMana: 50,
	maxSuperMana: 100,

	level: 1,
	opit: 43,
	needOpit: 150,

	//Stat
	defent: 4,
	dameg: 8,
	skilDmg: 2,
	speed: 6,
	name: "player",

	activ: false,

	//num Frames
	strFram: 0,
	endFram: 1,

	playAnim: function (anim) {
		//Set Type Animation
		if(anim == "stop") {
			if(this.strFram != 0 || this.endFram != 1) {
				this.strFram = 0;
				this.endFram = 1;
			}
	    }else if(anim == "run") {
			if(this.strFram != 0 || this.endFram != 0) {
				this.strFram = 0;
				this.endFram = 0;
			}
	    }
	},

	//Draw ui
	drawUI: function () {

		//Draw imgs
		//UPdat

		//User img
		brush.drawImageS({
			file: photoUser,
			x: 5, y: 5,
			w: 100, h: 100
		});

		//UI
		widSTR = 200;
		for(let p = arrUIPlayer.length; p--;) {
			arrUIPlayer[p].setPositionS(point(0 + arrUIPlayer[p].addX, 0 + arrUIPlayer[p].addY));

			//lines width
			if(arrUIPlayer[p].id == 9 || arrUIPlayer[p].id == 5 || arrUIPlayer[p].id == 7) {
				let id = arrUIPlayer[p].id;
				arrUIPlayer[p].w = (id == 9) ? (this.health/this.maxHealth)*280 : (id == 7) ? (this.engMana/this.maxEngMana)*240 : (this.superMana/this.maxSuperMana)*200;
			}else if(arrUIPlayer[p].id == 11) {
				arrUIPlayer[p].w = (this.opit/this.needOpit)*(gameWidth - 20);
			}

		    //Draw bg stat
		    arrUIPlayer[p].draw();
		}

		//Draw text name
		brush.drawTextS({
			size: (this.name.length*10 > 90) ? 10 : 15,
			x: 55, y: (this.size == 15) ? 96 : 109,
			color: "lightgreen",
			text: this.name,
			font: "cursive",
			align: "center"
		});

		//Draw level
		brush.drawTextS({
			size: 20,
			x: gameWidth/2, y: gameHeight - 50,
			color: "orange",
			text: this.level + " Уровень",
			font: "cursive",
			align: "center"
		});

		//Text sts
		for(let i = 4; i--;) {
			textStat(i);
		}
	}
});

//Draw text
function textStat(id) {
	    brush.drawTextS({
		    size: (id!=3) ? 13 : 8,
		    x: (id!=3) ? widSTR : gameWidth/2, y: (id!=3) ? 20*id+10 : gameHeight - 20,
		    color: (id!=3) ? "#fff" : "#000",
		    text: (id==0) ? mainPlayer.health + "/" + mainPlayer.maxHealth : (id==1) ? mainPlayer.engMana + "/" + mainPlayer.maxEngMana : (id==2) ? mainPlayer.superMana + "/" + mainPlayer.maxSuperMana : mainPlayer.opit + "/" + mainPlayer.needOpit,
		    font: "cursive",
		    align: "center"
	    });
	    widSTR += 40;
}


//Move player
function movePlayer() {

	//Camera
	camera.setPosition(point(mainPlayer.x - gameWidth/2 + mainPlayer.w, 0));
	if(camera.getPosition().x <= 0) {
		camera.setPosition(point(0, 0));
	}else if(camera.getPosition().x + gameWidth >= maxSizeMap*scaneGame.w) {
		camera.setPosition(point(maxSizeMap*scaneGame.w - gameWidth, 0));
	}

	//Keyas move
	if(key.isDown("LEFT") && mainPlayer.x > 0) {
		mainPlayer.move(v2d(-mainPlayer.speed, 0));
		mainPlayer.setFlip(1, 0);
	}else if(key.isDown("RIGHT") && mainPlayer.x < maxSizeMap*scaneGame.w - mainPlayer.w) {
		mainPlayer.move(v2d(mainPlayer.speed, 0));
		mainPlayer.setFlip(0, 0);
	}

	if(key.isDown("UP") && mainPlayer.y > gameHeight/2 - 50) {
		mainPlayer.move(v2d(0, -mainPlayer.speed));
	}else if(key.isDown("DOWN") && mainPlayer.y < gameHeight - mainPlayer.h - 50) {
		mainPlayer.move(v2d(0, mainPlayer.speed));
	}
}
