//@ Levels.js for Big War: The origin of the war
//@ Author - Mere Games or Rodion Kraynov
//@ Site - http://meregames.ru

"use strict";

var select_level = 0;
var levels = [
    {level: 1, open: true, x: 90, y: 450, over: false},
    {level: 2, open: true, x: 160, y: 330, over: false},
    {level: 3, open: true, x: 140, y: 174, over: false},
    {level: 4, open: true, x: 245, y: 82, over: false},
    {level: 5, open: false, x: 380, y: 153, over: false},
    {level: 6, open: false, x: 390, y: 295, over: false},
    {level: 7, open: false, x: 458, y: 435, over: false},
    {level: 8, open: false, x: 640, y: 475, over: false},
    {level: 9, open: false, x: 780, y: 391, over: false},
    {level: 10, open: false, x: 622, y: 303, over: false},
    {level: 11, open: false, x: 643, y: 140, over: false},
    {level: 12, open: false, x: 785, y: 65, over: false}
];
//Images

//Draw
function drawLevels () {
	ctx.drawImage(menuImages[1], -1, 1, WIDTH, HEIGHT);

	ctx.save();
	ctx.font = "40px cursive";
	for(let i = 0; i < levels.length; i++) {
		if(levels[i].open == true) {
				if(levels[i].over == true) {
					ctx.globalAlpha = 0.5;
				}else {
					ctx.globalAlpha = 1;
				}
			    ctx.fillText(levels[i].level, levels[i].x, levels[i].y);
		}else {
			ctx.globalAlpha = 1;
			if(levels[i].level <= 9) {
			    ctx.drawImage(otherImages[1], levels[i].x - 15, levels[i].y - 47, 50, 60);
		    }else {
		    	ctx.drawImage(otherImages[1], levels[i].x - 5, levels[i].y - 47, 50, 60);
		    }
		}
	}
	ctx.restore();
	objButtons[10].draw();
	if(gameConfig[0].leng == "ru") {
		objButtons[10].font = "20px Arial";
	}else {
		objButtons[10].font = "30px Arial";
	}
}


//Update
function updateLevels () {
	// --------------------------------------
	if(gameConfig[0].poisition != "level" && gameConfig[0].pre_position != "_menu") {
	for(let t = 0; t < levels.length; t++) {
		        if(levels[t].over == true || objButtons[10].over == true) {
			        document.body.style.cursor = "pointer";
			        return;
		        }else {
			        document.body.style.cursor = "default";
		        }
	}
}
}