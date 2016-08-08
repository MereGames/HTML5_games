//@ Animation for Big War: The origin of the war

var animationObjs = [];

var animatGrX = 0;
var animatGrY = 0;


setInterval(function () {
	for(let e = 0; e < 1; e++) {
	if(animatGrY == 64) {
		animatGrY = 0;
		return;
	}
	if(animatGrX == 64) {
		animatGrX = 0;
		animatGrY += 64;
		return;
	}
	animatGrX += 64;
  }
}, 700);

/*setInterval(function () {
	for(let s = 0; s < objectsGame.length; s++) {
		if(animBoomX == 0 && animBoomY == 64) {
			objectsGame[s].animEnd = true;
		}

		if(objectsGame[s].boom == true) {
			 for(let e = 0; e < 1; e++) {
	if(animBoomY == 64) {
		animBoomY = 0;
		return;
	}
	if(animBoomX == 64) {
		animBoomX = 0;
		animBoomY += 64;
		return;
	}
	animBoomX += 64;
  }
		}
	}
}, 180);*/

