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
	defent: 4,
	dameg: 8,
	skilGmg: 2,
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
		if(photoUser != null) {
			userImg.setPositionS(point(0, 0));
			userImg.draw();
		}
		//UI
		for(let p = arrUIPlayer.length; p--;) {
			arrUIPlayer[p].setPositionS(point(0, 0));
			arrUIPlayer[p].setPositionS(point(0, 0));
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
	}
});


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
	}else if(key.isDown("DOWN") && mainPlayer.y < gameHeight - mainPlayer.h) {
		mainPlayer.move(v2d(0, mainPlayer.speed));
	}
}
