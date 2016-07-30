//@ JavaScript for Big War: The origin of the war
//@ Author - Mere Games or Rodion Kraynov
//@ Site - http://meregames.ru


/*## Data from data.js:
  gameConfig - 0:position, pre_position, endLoad, leng; 1:name, fullName, version;
  loadingGame - 0:loadMain; 1:loadMenu;
##*/
"use strict";

//Constants:
const TILE_SIZE = 64;
const NUM_MENU = 2, NUM_BUTTONS = 9, NUM_GROUND = 10;
const WIDTH = (TILE_SIZE*14), HEIGHT = (TILE_SIZE*8);

//Canvas
var canvas = document.getElementById("canvas"), ctx = canvas.getContext("2d");
canvas.width = WIDTH; canvas.height = HEIGHT;
//Main Global-Virabels
var musikPlay = true;
var musik = new Audio();
musik.src = "audio/ms_1.mp3";
musik.loop = true;
musik.play();

//Time for save_data.js
var timeSave = 800;

//Menu Images in menuImages
//Buttons Images in buttonImages
//Other Images in otherImages
//Ground Images in groundImages
//Objects Images in objectImages

//Menu
for(let num = 0; num < NUM_MENU; num++) {
	let img = new Image();
	img.src="img/menu_" + num + ".png";
    menuImages.push(img);
}

//Buttons
for(let num = 0; num < NUM_BUTTONS; num++) {
	let img = new Image();
	img.src = "img/but_" + num + ".png";
	buttonImages.push(img);
}

//Ground
for(let num = 0; num < NUM_GROUND; num++) {
	let img = new Image();
	img.src="img/ground_" + num + ".png";
    groundImages.push(img);
}

var objImg = new Image();
objImg.src = "img/baze_0.png";
objectImages.push(objImg);

var objImg2 = new Image();
objImg2.src = "img/robot_0.png";
objectImages.push(objImg2);


for(let i = 0; i < groundImages.length; i++) {
	selectsEdit.push({num: i, sel: false});
	if(i == 0) {
		selectsEdit[i].sel = true;
	}
}


//All buttons
var objButtons = [
    //Company - 0
    new button("company", WIDTH/2 - 85, HEIGHT/2 - 100, WIDTH/2 - 80, HEIGHT/2 - 73, 170, 40, "Company", "30px Arial", "levels", "position", "menu", buttonImages[0], false),
    //Settings - 1
    new button("settings", WIDTH/2 - 85, HEIGHT/2 + 80, WIDTH/2 - 80, HEIGHT/2 + 108, 170, 40, "Settings", "30px Arial", "settings", "pre_position", "menu", buttonImages[0], false),
    //Map Editor - 2
    new button("mapEditor", WIDTH/2 - 85, HEIGHT/2 + 20, WIDTH/2 - 80, HEIGHT/2 + 50, 170, 40, "Map editor", "30px Arial", "mapEditor", "position", "menu", buttonImages[0], false),
    //Free game - 3
    new button("freeGame", WIDTH/2 - 85, HEIGHT/2 - 40, WIDTH/2 - 80, HEIGHT/2 - 13, 170, 40, "Free game", "30px Arial", "freeGame", "position", "menu", buttonImages[0], false),
    //Author - 4
    new button("author", WIDTH/2 - 85, HEIGHT/2 + 140, WIDTH/2 - 80, HEIGHT/2 + 170, 170, 40, "Author", "30px Arial", "author", "pre_position", "menu", buttonImages[0], false),

    //Cross for pre_pos - 5
    new button("cross", 617, 100, WIDTH/2 - 57, HEIGHT/2 + 108, 40, 40, "", "30px Arial", "none", "pre_position", "menu", buttonImages[1], false),
    //Left leng - 6
    new button("leftLeng", 280, 180, WIDTH/2 - 57, HEIGHT/2 + 108, 60, 40, "", "30px Arial", "en", "leng", "menu", buttonImages[2], false),
    //Right leng - 7
    new button("rightLeng", 560, 180, WIDTH/2 - 57, HEIGHT/2 + 108, 60, 40, "", "30px Arial", "ru", "leng", "menu", buttonImages[3], false),

    //Off and On - 8
    new button("on", 410, 295, WIDTH/2 - 57, HEIGHT/2 + 108, 40, 40, "", "30px Arial", "on", "mus", "menu", buttonImages[4], false),
    // off - 9
    new button("off", 450, 295, WIDTH/2 - 57, HEIGHT/2 + 108, 40, 40, "", "30px Arial", "off", "mus", "menu", buttonImages[5], false),

    //Back - 10
    new button("back", 20, 20, 45, 50, 100, 45, "Back", "30px Arial", "menu", "position", "menu", buttonImages[6], false),
    //Menu - 11
    new button("menu", WIDTH/2 - 85, HEIGHT/2 - 100, WIDTH/2 - 40, HEIGHT/2 - 70, 170, 40, "Menu", "30px Arial", "menu", "position", "menu", buttonImages[0], false),
    //Settings - 12
    new button("settings_menu", WIDTH/2 - 85, HEIGHT/2 - 40, WIDTH/2 - 80, HEIGHT/2 - 12, 170, 40, "Settings", "30px Arial", "settings", "pre_position", "menu", buttonImages[0], false),

    //Low - 13
    new button("low", 450, 300, WIDTH/2 - 80, HEIGHT/2 - 12, 30, 30, "", "30px Arial", "1", "dis", "menu", buttonImages[7], false),
    //Hard - 14
    new button("hard", 550, 300, WIDTH/2 - 80, HEIGHT/2 - 12, 30, 30, "", "30px Arial", "128", "dis", "menu", buttonImages[7], false),
    //on - off - 15
    new button("onOff", 550, 300, WIDTH/2 - 80, HEIGHT/2 - 12, 30, 30, "", "30px Arial", "", "onOff", "menu", buttonImages[8], false),
    //Save map - 16
    new button("saveMap", WIDTH/2 - 85, HEIGHT/2 + 22, WIDTH/2 - 70, HEIGHT/2 + 50, 170, 40, "Save map", "30px Arial", "", "save", "menu", buttonImages[0], false),
    //delet - 17
    new button("deleteMaps", WIDTH/2 + 240, HEIGHT/2 - 230, WIDTH/2 + 240, HEIGHT/2 - 200, 180, 40, "Delete maps", "30px Arial", "", "del", "menu", buttonImages[0], false)
];

var endButton = objButtons.length;

//img pre_posiiotns
var pre_pos = new Image();
pre_pos.src = "img/pre_0.png";
otherImages.push(pre_pos);

var zamok = new Image();
zamok.src = 'img/zamok.png';
otherImages.push(zamok);


//Start Game func
function startGame() {
	//Begin
	loadingGame[0].loadMain = true;
	loadingGame[1].loadMenu = true;

	gameConfig[0].position == "menu";

	if(loadGameData("save_main")) {
		var dat = JSON.parse(localStorage.getItem("save_main"));
		gameConfig[0].leng = dat[0].leng;
		lengGame(dat[0].leng);
		mapsGame = dat[1].gameMaps;
		dev = dat[1].dev;
		if(mapsGame.length > 0) {
		    for(let i = 0; i < mapsGame.length; i++) {
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
		    }
		    for(let y = 0; y < levels.length; y++) {
		    	levels.open = dat[2].levels[y].open;
		    }
		console.log("load save!");
	}else {
		console.log("dont have this save!");
	}
}

function loadGameData(item) {
	if(localStorage.getItem(item) != null || localStorage.getItem(item) != undefined) {
		return true;
    } else {
    	return false;
    }
}

function deleteSaves() {
	localStorage.clear();
}

//Logo
function logoGame() {
	var logo = new Image();
	logo.src = "logo.png";

	var iterLogo = setInterval(function () {
		ctx.drawImage(logo, 0, 0, WIDTH, HEIGHT);
	}, 1000/60);

	setTimeout(function (){
		clearInterval(iterLogo);
		ctx.clearRect(0, 0, WIDTH, HEIGHT);

		if(loadingGame[0].loadMain == true){
			gameConfig[0].position = "menu";
		}else {
			gameConfig[0].position = "loading";
			gameConfig[0].endLoad = "menu";
			loadLocation(timesLoad[1].time);
		}
	}, 1300);
}

//loop game
function loop() {

	if(gameConfig[0].position != "logo") {
    	//Clear All
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
    }

     if(gameConfig[0].endLoad == "level" || gameConfig[0].endLoad == "free" || gameConfig[0].endLoad == "mapEditor"){
    	    updateScene();
	        drawScene();
    }
    
	if(gameConfig[0].position == "menu" || gameConfig[0].position == "freeGame" || gameConfig[0].position == "logo" || gameConfig[0].position == "loading" || gameConfig[0].pre_position == "_menu" || gameConfig[0].pre_position == "settings") {
	    updateMenu();
	    drawMenu();
    }
    if(gameConfig[0].position == "levels"){
    	updateLevels();
	    drawLevels();
	    // -----------------------------------------------
    }

    requestAnimationFrame(loop, canvas);
}

//Update menu
function updateMenu() {
	if(gameConfig[0].position != "logo") {

		if(gameConfig[0].pre_position == "none" || gameConfig[0].pre_position == "_menu") {
			document.body.style.cursor = "default";
		    for(let t = 0; t < objButtons.length; t++) {
		    	try {
		            if(objButtons[t].over == true) {
			            document.body.style.cursor = "pointer";
			            return;
		            }else {
			            document.body.style.cursor = "default";
		           }
	        }catch (err) {};
	    }
	    }else {
	    	document.body.style.cursor = "default";
		    for(let t = 0; t < objButtons.length; t++) {
		    	if(objButtons[t] != null) {
			// --------------------------------------------------------------
			    if(objButtons[t].name == "cross" || objButtons[t].name == "leftLeng" || objButtons[t].name == "rightLeng" || objButtons[t].name == "on" || objButtons[t].name == "off" || objButtons[t].name == "low" || objButtons[t].name == "hard" || objButtons[t].name == "onOff") {
		            if(objButtons[t].over == true) {
			            document.body.style.cursor = "pointer";
			            return;
		            }else {
			            document.body.style.cursor = "default";
		            }
		        }
		    }
	    }
	}

		//Check loading
		// -----------------------------------------------------------------------
		if(loadingGame[1].loadMenu == false || loadingGame[0].loadMain == false) {
		    gameConfig[0].position = "loading";
	    }

	    if(gameConfig[0].pre_position == "_menu") {
				clearInterval(iter);
			}

	}
}

var pas = 65;
//Draw menu
function drawMenu() {
	if(gameConfig[0].position != "logo") {

		// ====Menu====
	    if(gameConfig[0].position == "menu") {
		    ctx.drawImage(menuImages[0], 0, 0, WIDTH, HEIGHT);

		    objButtons[0].draw();
		    objButtons[1].draw();
		    objButtons[2].draw();
		    objButtons[3].draw();
		    objButtons[4].draw();

		    ctx.font = "80px cursive";
		    ctx.fillStyle = "Red";
		    ctx.fillText("Big War I", WIDTH/2 - 180, 90);
	    }else if(gameConfig[0].position == "freeGame") {
		    ctx.drawImage(menuImages[0], 0, 0, WIDTH, HEIGHT);

		    objButtons[10].draw();
		    objButtons[17].draw();

		    for(let i = 0; i < mapsGame.length; i++) {
		    for(let j = endButton; j < objButtons.length; j++) {
		    	if(objButtons[j] != null) {
		    		if(objButtons[j].name == "map_" + i) {
		    			objButtons[j].draw();
		    		}
		    	}
		    }
		    }
	    }

	    if(gameConfig[0].pre_position != "none") {
	    	ctx.save();
	    	ctx.globalAlpha = 0.5;
	    	ctx.fillStyle = "#000";
	    	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	    	ctx.restore();
	    	ctx.drawImage(otherImages[0], WIDTH/2-200, HEIGHT/2-150, 400, 300);
	    	objButtons[5].draw();

	    	if(gameConfig[0].pre_position == "error") {
	    		ctx.fillText("Error!", WIDTH/2 - 30, HEIGHT/2);
	    	}

	    	if(gameConfig[0].pre_position == "settings") {
	    		ctx.save();
	    		ctx.font = "30px strong";
	    		ctx.fillStyle = "#BA7A04";
	    		if(gameConfig[0].leng == "en") {
	    		    ctx.fillText("Language", 390, 170);
	    		    ctx.fillText("Music", 310, 280);
	    		    ctx.font = "20px Arial";
	    	    	ctx.fillText("Render distance", 440, 280);
	    	    	ctx.font = "30px cursive";

	    	    	ctx.fillText("Close", 420, 360);
	    	    	ctx.fillText("Away", 540, 360);

	    		    ctx.save();
	    		    ctx.font = "30px cursive";
	    		    if(musikPlay == true) {
	    		        ctx.fillText("On", 327, 365);
	    		    }else {
	    		    	ctx.fillText("Off", 319, 365);
	    		    }
	    		    ctx.restore();
	    	    }else if(gameConfig[0].leng == "ru") {
	    	    	ctx.fillText("Язык", 420, 170);
	    	    	ctx.fillText("Музыка", 300, 280);
	    	    	ctx.font = "20px Arial";
	    	    	ctx.fillText("Дальность прорисовки", 410, 280);
	    	    	ctx.font = "25px cursive";

	    	    	ctx.fillText("Близко", 420, 360);
	    	    	ctx.fillText("Далеко", 540, 360);

	    	    	ctx.save();
	    		    ctx.font = "30px cursive";
	    		    if(musikPlay == true) {
	    		        ctx.fillText("Вкл.", 319, 365);
	    		    }else {
	    		    	ctx.fillText("Выкл.", 317, 365);
	    		    }
	    		    ctx.restore();
	    	    }
	    		ctx.font = "30px cursive";
	    		if(gameConfig[0].leng == "en") {
	    			ctx.fillText("English", 395, 210);
	    		}else if(gameConfig[0].leng == "ru") {
	    			ctx.fillText("Русский", 395, 210);
	    		}
	    		ctx.restore();
	    		objButtons[6].draw();
	    		objButtons[7].draw();
	    		if(musikPlay == true) {
	    			objButtons[8].x = 687;
	    			objButtons[9].x = 327;
	    			objButtons[9].draw();
	    	    }else if(musikPlay == false){
	    	    	objButtons[8].x = 327;
	    			objButtons[9].x = 590;
	    			objButtons[8].draw();
	    	    }

	    	    objButtons[13].draw();
	    		objButtons[14].draw();
	    		objButtons[15].draw();
	    	}else if(gameConfig[0].pre_position == "author") {
	    		if(gameConfig[0].leng == "en") {
	    			ctx.save();
	    			ctx.fillStyle = "#BA7A04";
	    			ctx.font = "30px Arial";
	    			ctx.fillText("Mere Games", WIDTH/2 - 80, 150);
	    			ctx.font = "17px Arial";
	    			ctx.fillText("Copyright 2016", WIDTH/2 - 50, 380);
	    			ctx.font = "20px Arial";
	    			ctx.fillText("Official site:", WIDTH/2 - 40, 180);
	    			ctx.fillText('http://meregames.ru', WIDTH/2 - 80, 210);
	    			ctx.fillText("Developer:", WIDTH/2 - 40, 250);
	    			ctx.fillText('Rodion Kraynov', WIDTH/2 - 70, 280);
	    			ctx.restore();
	    		}else if(gameConfig[0].leng == "ru") {
	    			ctx.save();
	    			ctx.fillStyle = "#BA7A04";
	    			ctx.font = "30px Arial";
	    			ctx.fillText("Mere Games", WIDTH/2 - 80, 150);
	    			ctx.font = "17px Arial";
	    			ctx.fillText("Copyright 2016", WIDTH/2 - 50, 380);
	    			ctx.font = "20px Arial";
	    			ctx.fillText("Официальный сайт:", WIDTH/2 - 80, 180);
	    			ctx.fillText('http://meregames.ru', WIDTH/2 - 80, 210);
	    			ctx.fillText("Разработчик:", WIDTH/2 - 55, 250);
	    			ctx.fillText('Родион Крайнов', WIDTH/2 - 70, 280);
	    			ctx.restore();
	    		}
	    	}else if(gameConfig[0].pre_position == "_menu") {
	    	    ctx.fillStyle = "#fff";
	    	    ctx.font = "50px cursive";
	    	    if(gameConfig[0].leng == "en") {
	    	        ctx.fillText("Pause", WIDTH/2-50, 50);
	            }else if(gameConfig[0].leng == "ru") {
	        	    ctx.fillText("Пауза", WIDTH/2-50, 50);
	            }
	    	        ctx.fillStyle = "#fff";
	    	        objButtons[11].draw();
	    	        objButtons[12].draw();
	    	        if(gameConfig[0].position == "mapEditor") {
	    	        	objButtons[16].draw();
	    	        }
	    	}
	    }

	    // ====Loading=====
	    if(gameConfig[0].position == "loading") {
		    //-----------------------------------------------------------------------
		        ctx.font = "70px cursive";
		        ctx.fillStyle = "#fff";
		        ctx.drawImage(menuImages[0], 0, 0, WIDTH, HEIGHT);
		        if(gameConfig[0].leng == "en") {
		            ctx.fillText("Loading...", WIDTH/2 - 140, HEIGHT/2);
		        }else if(gameConfig[0].leng == "ru"){
		        	ctx.fillText("Загрузка...", WIDTH/2 - 140, HEIGHT/2);
		        }
		        document.body.style.cursor = "default";
	    }

	    //====*Version
	    if(gameConfig[0].position == "menu") {
	        ctx.font = "13px Arial";
	        ctx.fillStyle = "#fff";
	        ctx.fillText(gameConfig[1].version, WIDTH - 32, HEIGHT - 5);
	    }

    }
}

//Load locations
function loadLocation(time) {
	gameConfig[0].position = "loading";
	setTimeout(function () {
		gameConfig[0].position = gameConfig[0].endLoad;
		if(gameConfig[0].position == "mapEditor") {
	    	editMap = true;
	    }else {
	    	editMap = false;
	    }
	}, time);
}

//Lenguege
function lengGame(leng) {
	if(leng == "ru") {
		gameConfig[0].leng = "ru";
		//buttons
		for(let i = 0; i < objButtons.length; i++) {
			if(objButtons[i] != null) {
			if(objButtons[i].name == tranTexts[0].ru[i].name) {
				objButtons[i].text = tranTexts[0].ru[i].tran;
				//---------------------======--------------
				if(objButtons[i].name == "freeGame" || objButtons[i].name == "mapEditor") {
					objButtons[i].font = "20px Arial";
				}
			}
		}
	}
	}else if(leng == "en") {
		gameConfig[0].leng = "en";
		//buttons
		for(let i = 0; i < objButtons.length; i++) {
			if(objButtons[i] != null) {
			if(objButtons[i].name == tranTexts[1].en[i].name) {
				objButtons[i].text = tranTexts[1].en[i].tran;
				// -------------------========--------------
				if(objButtons[i].name == "freeGame" || objButtons[i].name == "mapEditor") {
					objButtons[i].font = "30px Arial";
				}
			}
		}
	}
	}
}

//Music off and on
function musikOnOff(type) {
	if(type == "off") {
		musik.pause();
		musikPlay = false;;
	}else {
		musik.play();
		musikPlay = true;
	}
}

logoGame();
var iterMap = false;
var iter;

var nameA = "name";
//Events
//Moves
function moveEvent(e) {
	let x = e.clientX;
	let y = e.clientY;

	xP = e.clientX;
	yP = e.clientY;

	if(gameConfig[0].position != "logo" && gameConfig[0].pre_position == "none") {
		if(gameConfig[0].position == "menu") {
			for(let i = 0; i < objButtons.length; i++) {
				if(objButtons[i] != null) {
				if(checkPosMouse(x, y, objButtons[i].x, objButtons[i].y, objButtons[i].width, objButtons[i].height) && objButtons[i].text != "") {
					objButtons[i].over = true;
				}else {
					objButtons[i].over = false;
				}
			}
		}
		}else if(gameConfig[0].position == "levels") {
			if(checkPosMouse(x, y, objButtons[10].x, objButtons[10].y, objButtons[10].width, objButtons[10].height)) {
					objButtons[10].over = true;
				}else {
					objButtons[10].over = false;
				}

			for(let i = 0; i < levels.length; i++) {
				if(checkPosMouse(x, y, levels[i].x, levels[i].y - 65, 65, 65) && levels[i].open == true) {
					levels[i].over = true;
				}else {
					levels[i].over = false;
				}
			}
		}else if(gameConfig[0].endLoad == "level" || gameConfig[0].endLoad == "free" || gameConfig[0].endLoad == "mapEditor"  || gameConfig[0].endLoad == "freeGame") {

			if(gameConfig[0].pre_position == "_menu") {
				iterMap = true;
			}

			if(x >= WIDTH - 20) {
				if(iterMap == false) {
					iter = setInterval(function () {
						moveMap("right");
					}, 1000/60);
					iterMap = true;
				}
			}else if(x <= 20) {
				if(iterMap == false) {
					iter = setInterval(function () {
						moveMap("left");
					}, 1000/60);
					iterMap = true;
				}
			}else if(y >= HEIGHT - 20) {
				if(iterMap == false) {
					iter = setInterval(function () {
						moveMap("down");
					}, 1000/60);
					iterMap = true;
				}
			}else if(y <= 20) {
				if(iterMap == false) {
					iter = setInterval(function () {
						moveMap("top");
					}, 1000/60);
					iterMap = true;
				}
			}else {
				clearInterval(iter);
				iterMap = false;
			}
			if(checkPosMouse(x, y, objButtons[10].x, objButtons[10].y, objButtons[10].width, objButtons[10].height)) {
				objButtons[10].over = true;
			}else {
				objButtons[10].over = false;
			}
			if(checkPosMouse(x, y, objButtons[17].x, objButtons[17].y, objButtons[17].width, objButtons[17].height)) {
				objButtons[17].over = true;
			}else {
				objButtons[17].over = false;
			}
		}
	}else {
		try {
		for(let i = 0; i < objButtons.length; i++) {
			// ---------------------------------------------
				if(checkPosMouse(x, y, objButtons[i].x, objButtons[i].y, objButtons[i].width, objButtons[i].height)) {
					if(gameConfig[0].pre_position == "settings") {
						if(objButtons[i].name == "cross" || objButtons[i].name == "leftLeng" || objButtons[i].name == "rightLeng" || objButtons[i].name == "on" || objButtons[i].name == "off" || objButtons[i].name == "low" || objButtons[i].name == "hard" || objButtons[i].name == "onOff") {
					    objButtons[i].over = true;
				    }
				}else if(gameConfig[0].pre_position == "author") {
						if(objButtons[i].name == "cross") {
					    objButtons[i].over = true;
				    }
			}else if(gameConfig[0].pre_position == "_menu" && gameConfig[0].position != "freeGame") {
						if(objButtons[i].name == "cross" || objButtons[i].name == "menu" || objButtons[i].name == "settings_menu" || objButtons[i].name == "saveMap") {
					        if(objButtons[i].name == "saveMap" && gameConfig[0].position == "mapEditor") {
					            objButtons[i].over = true;
					        }else if(objButtons[i].name != "saveMap") {
					        	objButtons[i].over = true;
					        }
				    }
			}
			}else {
					  objButtons[i].over = false;
				  }
		}
	}catch (err) {};
}
}

//Clicks
function clickEvent(e) {
	let x = e.clientX;
	let y = e.clientY;

	for(let r = 0; r < objButtons.length; r++) {
		if(objButtons[r] != null) {
		    objButtons[r].over = false;
	    }
	}

	if(gameConfig[0].position != "logo" && gameConfig[0].pre_position == "none") {
		if(gameConfig[0].position == "menu") {
			for(let i = 0; i < 5; i++) {
				if(checkPosMouse(x, y, objButtons[i].x, objButtons[i].y, objButtons[i].width, objButtons[i].height)) {
					objButtons[i].activ();
				}
			}
		}else if(gameConfig[0].position == "levels") {
			for(let i = 10; i < objButtons.length; i++) {
				if(objButtons[i] != null) {
				if(checkPosMouse(x, y, objButtons[i].x, objButtons[i].y, objButtons[i].width, objButtons[i].height)) {
					objButtons[i].activ();
				}
			}
			for(let i = 0; i < levels.length; i++) {
				if(checkPosMouse(x, y, levels[i].x, levels[i].y - 65, 65, 65) && levels[i].open == true) {
					select_level = levels[i].level;
					gameConfig[0].endLoad = "level";
					loadLocation(timesLoad[2].time);
				}
			}
		}
		}else if(gameConfig[0].position == "freeGame") {
			for(let i = 10; i < objButtons.length; i++) {
				if(objButtons[i] != null && objButtons[i].name != "menu" && objButtons[i].name != "settings_menu") {
				if(checkPosMouse(x, y, objButtons[i].x, objButtons[i].y, objButtons[i].width, objButtons[i].height)) {
					if(i >= endButton) {
					    idMap = i - endButton;
					    objButtons[i].activ();
					    for(let r = 0; r < mapsGame[idMap].map.length; r++) {
					    	for(let t = 0; t < mapsGame[idMap].map.length; t++) {
					    	    mapsGame[idMap].map[r][t].tum = true;
					        }
					    }
					    return;
				    }else {
				    	objButtons[i].activ();
				    }
				}
			}
		}
		}else if(gameConfig[0].position == "free" && editMap == false || gameConfig[0].position == "level" && editMap == false) {
			if(x >= objBaze.x - objBaze.radius - movAddX && x <= objBaze.x - objBaze.radius - movAddX + 64 && y >= objBaze.y - objBaze.radius - movAddY && y <= objBaze.y - objBaze.radius - movAddY + 64) {
				objectsGame.push(new gameObject("robot_1", objectImages[1], "robot", "build", objBaze.x + 64, objBaze.y, idMap, 2, 50));
		}
			for(let n = 0; n < objectsGame.length; n++) {
				if(objectsGame[n].map == idMap) {
					for(let i = 0; i < mapsGame[idMap].map.length; i++) {
						for(let j = 0; j < mapsGame[idMap].map.length; j++) {
							if(x >= TILE_SIZE * i - movAddX && x <= TILE_SIZE * i - movAddX + TILE_SIZE &&  y >= TILE_SIZE * j - movAddY && y <= TILE_SIZE * j - movAddY + TILE_SIZE && objectsGame[n].select == true && e.altKey == false) {
								objectsGame[n].point.x = TILE_SIZE * i;
								objectsGame[n].point.y = TILE_SIZE * j;
							}
							if(x >= objectsGame[n].x - objectsGame[n].radius - movAddX && x <= objectsGame[n].x - objectsGame[n].radius - movAddX + TILE_SIZE&&  y >= objectsGame[n].y - objectsGame[n].radius - movAddY  && y <= objectsGame[n].y - objectsGame[n].radius - movAddY + TILE_SIZE) {
								if(e.altKey == true || e.shiftKey == false) {
								    objectsGame[n].select = true;
							    }
							}
					    }
					}
				}
			}
		}
	}else {
		for(let i = 0; i < objButtons.length; i++) {
			if(objButtons[i] != null) {
			// -------------------------------------------------
				if(checkPosMouse(x, y, objButtons[i].x, objButtons[i].y, objButtons[i].width, objButtons[i].height)) {
					if(gameConfig[0].pre_position == "settings") {
						if(objButtons[i].name == "cross" || objButtons[i].name == "leftLeng" || objButtons[i].name == "rightLeng" || objButtons[i].name == "on" || objButtons[i].name == "off" || objButtons[i].name == "low" || objButtons[i].name == "hard" || objButtons[i].name == "onOff") {
					        objButtons[i].activ();
					    }
				    }else if(gameConfig[0].pre_position == "author") {
				    	if(objButtons[i].name == "cross") {
					        objButtons[i].activ();
					    }
				    }else if(gameConfig[0].pre_position == "_menu") {
				    	if(objButtons[i].name == "cross" || objButtons[i].name == "menu" || objButtons[i].name == "settings_menu"  || objButtons[i].name == "saveMap") {
				    		if(objButtons[i].name == "saveMap" && gameConfig[0].position == "mapEditor") {
					            objButtons[i].activ();
					        }else if(objButtons[i].name != "saveMap") {
					        	objButtons[i].activ();
					        }
					    }
				    }
				}
		}
	}
	}
}

function delMaps() {
	deleteProg = true;
	mapsGame = [];
	for(let i = endButton; i < objButtons.length; i++) {
	    objButtons.splice(i, i);
	    tranTexts[0].ru.splice(i, i);
	    tranTexts[1].en.splice(i, i);
	}
	dev = 1.15;
}

function checkPosMouse(x, y, xo, yo, width, height) {
	if(x >= xo && x <= xo + width && y >= yo && y <= yo + height) {
		return true;
	}else {
		return false;
	}
}

canvas.onmousemove = moveEvent;
canvas.onclick = clickEvent;
requestAnimationFrame(loop, canvas);
window.onload = startGame;

window.onerror = function () {
	gameConfig[0].pre_position = "error";
	alert("error");
}