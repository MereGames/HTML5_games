/**
*
* @ Copyryght Mere Games 2016
* @ support@meregames.ru
* @ Mail - meregames@mail.ru
*
**/

//const test
const TEST_GAME = true;
var startLocat = "game";
var startId = 0;

//detect and devises --- #
var userAg = detect.parse(navigator.userAgent);
var deviceJs = device.noConflict();
isMobile = false;

var loadComlit = false;
var drawScane = false;

var startFPS = 60;

var allObjsGame = [];

var numPoints = 0;

var addXBg = 0;
var addSize = 2;
var viewDis = 3;
var maxDis = 4;
var _maxDis = 4;

var endTrans = true;

var openInput = false;

var viewFPS = true;
var viewMsg = false;
var viewHelpBl = false;

var textMsg = "";

var helpsTexts = [
    "Физическая атака",
    "Магическая атака",
    "Защита",
    "Здоровье"
];


// ================ 'game' loop =============
game.newLoop('game', function () {
	//Clear All
	// ## game.clear(); ##

	//Fill canvas
	game.fill('#777');

	//One func for dell arr *******
	OOP.once("dellArr", function () {
		//log(menuIconsObjs);
	});

	//draw world
	drawWorld();

	if(drawScane == true) {

	    //Funcs
	    updateWorld();
	    updatePlayer();

	    mouseEvents();

	    //Fps game
	    if(viewFPS == true) {
	        drawFPS();
        }
    }else {
    	drawLoading();
    }
});


// ====== Pasive Loops ======
// -- Loop menu game --
game.newLoop('menu', function () {
	//Clear All
	// ## game.clear(); ##

	//Fill canvas
	game.fill('#555');

	//Background menu
	scaneGame.draw();

	rectMenu.draw();

	//img for input(bg text)
	inputObj.draw();

  if(drawScane == true) {

	//Mouse events ------
	mouseEvents();

	drawBrushText();

	if(rectMenu.visible == false || mainPlayer.visible == false) {
		rectMenu.visible = true;
		mainPlayer.visible = true;
	}

	if(mouse.isPress("LEFT")) {
	    if(mouse.isInObject(inputObj)) {
		    openInput = true;
	    }else {
    	    openInput = false;
        }
    }

	if(openInput == true) {
		key.setInputMode(true);

		var char = key.getInputChar();
        var iKey = key.getInputKey();

        if(inputText.length < 10 && char) {
    	    inputText += char;
        }

        if(iKey) {
    	    if(iKey == 'BACKSPACE') {
                inputText = inputText.substr(0, inputText.length - 1);
            }
        }
	}else if(key.isInputMode()){
		key.setInputMode(false);
	}

	//Key for enter in game world
	if(iKey == "ENTER" || key.isPress("ENTER")) {
		openInput = false;
		key.setInputMode(false);
        checkEnter();
    }

	// ## drawCtxText(); (--in develop--) ##

	//THIS INPUT TEXT
	brush.drawText({
		x: gameWidth/2 - 140, y: gameHeight - 80,
		size: 25,
		align: "left",
		color: "#fff",
		font: "cursive",
		text: (openInput == true) ? inputText + "|" : inputText + ""
	});

	//MSG for user
	viewMsgEr(textMsg);

	//Draw whioth OOP in PointJS
	OOP.drawArr(menuIconsObjs);
	//Buts menu
	OOP.drawArr(arrPlusMenu);
	OOP.drawArr(arrMinusMenu);

	//Draw stop player
	mainPlayer.drawFrames(mainPlayer.strFram, mainPlayer.endFram);

	//View Help
	viewHelp();

	//Fps game - end layer
	if(viewFPS == true) {
	    drawFPS();
    }
  }else {
  	drawLoading();
  }
});

//Texts menu
function drawBrushText() {
	brush.drawText({
		x: gameWidth/2, y: gameHeight - 33,
		size: 20,
		align: "center",
		color: "red",
		font: "cursive",
		text: "для продолжения нажмите Enter",
	});

	brush.drawText({
		x: gameWidth/2 - 5, y: gameHeight/2 - 135,
		size: 21,
		align: "center",
		color: "#E66659",
		font: "cursive",
		text: "Очки умений",
	});

	brush.drawText({
		x: gameWidth/2 + 145, y: gameHeight/2 - 132,
		size: 20,
		align: "center",
		color: (numPoints > 0) ? "#3BB10A" : "red",
		font: "cursive",
		text: numPoints,
	});

	//Nums
	for(let i = 4;i--;) {
		brush.drawText({
		    x: gameWidth/2 + 90, y: gameHeight/2 - 65 + (45*i),
		    size: 20,
		    align: "center",
		    color: "red",
		    font: "cursive",
		    text: (i==0) ? mainPlayer.dameg : (i==1) ? mainPlayer.skilGmg : (i==2) ? mainPlayer.defent : mainPlayer.health,
	    });
	}
}

//Check enter in game
function checkEnter() {
	if(numPoints == 0 && inputText.length >= 4 && inputText.length <= 10) {
		//Load scane
		gameData.nextScaneId = 0;
		gameData.nextScaneName = "game";
		gameData.newPlayer = false;
		drawScane = false;
		mainPlayer.name = inputText;
		gameLog("Main Player name is: \"" + mainPlayer.name + "\"", "PLR", "Done");

		mouse.setCursorImage('img/cur_def.png');

		game.startLoop("loadingScane");
	}else {
		openInput = true;
		viewMsg = true;
		textMsgObj.alpha = 1;
		if(numPoints > 0) {
			textMsg = "Не все очки навыков распределены!";
		}else if(inputText.length < 4) {
			textMsg = "Слишком короткое имя!";
		}else if(inputText.length > 10) {
			textMsg = "Введите имя игрока!";
		}

		//timer view msg
		setTimeout(function () {
			viewMsg = false;
			endTrans = false;
		}, 4000);
	}
}

//Massage error use
function viewMsgEr(text) {
	if(viewMsg == true) {
		textMsgObj.drawTXT(text);
	}else if(textMsgObj.alpha > 0 && endTrans == false) {
		textMsgObj.drawTXT(text);
		textMsgObj.transparent(-0.01);
	}else if(textMsgObj.alpha <= 0){
		endTrans = true;
	}
}




// -- Loop loading --
game.newLoop('loadingScane', function () {
	//Clear All
	// ## game.clear(); ##

	//Fill canvas
	game.fill('#999');

	//Load and dell
	if(loadComlit == false) {
	    deletPath(gameData.totalScaneName, gameData.totalScaneId);
	    loadPath(gameData.nextScaneName, gameData.nextScaneId);
	    loadComlit = true;
    }

    drawLoading();

	if(resources.isLoaded() && resources.getProgress() >= 99) {
		game.startLoop(gameData.nextScaneName);
		gameLog('Go to ' + gameData.nextScaneName, 'RPG', 'Done');

		gameData.totalScaneId = gameData.nextScaneId;
		gameData.totalScaneName = gameData.nextScaneName;
		    // @ New pos player
		if(gameData.nextScaneName == "menu") {
		    mainPlayer.setPosition(point(gameWidth/2 - rectMenu.w/2 + 70, gameHeight/2 - mainPlayer.h/2 + 20));
	    }else {
	    	mainPlayer.setPosition(point(gameWidth/2 - mainPlayer.w, gameHeight/2 + mainPlayer.h));
	    }

	    //Timer
		setTimeout(function () {
	        loadComlit = false;

	        drawScane = true;
		}, 1000);
	}
});

function drawLoading() {
	//Bg loading img
	scaneGame.draw();
	mainPlayer.visible = false;
	if(rectMenu.w != undefined || rectMenu.w != null) {
		rectMenu.visible = false;
	}

	if(TEST_GAME == true) {
	    gameLog("Enter in loop 'loading': " + resources.getProgress() + "%", "LOD", "Done");
    }


	brush.drawText({
		x: gameWidth/2, y: gameHeight - 50,
		size: 30,
		align: "center",
		color: "orange",
		font: "cursive",
		text: "Загрузка... " +  (resources.getProgress() - 1) + "%",
	});

	//Fps game - and layer
	if(viewFPS == true) {
	    drawFPS();
    }
}





//DrawWorld game ------
function drawWorld() {
	//draw Map scane
	sizeMap = addSize;
	for(let s = sizeMap; s--;) {
	    scaneGame.x = addXBg;
	    if(scaneGame.isInCamera()) {
	        scaneGame.draw();
	        if(_maxDis > maxDis) {
	        	maxDis += 1;
	        }
	    }else {
	    	if(addSize < maxSizeMap && addSize < viewDis) {
	    	    addSize += 1;
	        }else if(viewDis < maxDis){
	        	viewDis += 1;
	        	_maxDis += 1;
	        }
	    }
	    addXBg += scaneGame.w;
    }
    //set 0 - add
    addXBg = 0;

	// ## OOP.drawArr(allObjsGame); ##
	//Draw player -------------
	mainPlayer.drawFrames(mainPlayer.strFram, mainPlayer.endFram);
}


//Update game -------
function updateWorld() {
	//
}

function updatePlayer() {
	//Move plaer
	movePlayer();

	//draw ui
	mainPlayer.drawUI();

	//Player stoping and run
	if(key.isDown("LEFT") || key.isDown("RIGHT") || key.isDown("UP") || key.isDown("DOWN")) {
		mainPlayer.playAnim("run");
	}else {
		mainPlayer.playAnim("stop");
	}

	if(mainPlayer.visible == false) {
		mainPlayer.visible = true;
	}
}

//Mouse events
function mouseEvents() {
	//Left click
	if(mouse.isPress("LEFT")) {
		//Plus and musis
		if(gameData.totalScaneName == "menu") {
		    for(let i = 4; i--;) {
			    if(mouse.isInObject(arrPlusMenu[i]) && numPoints > 0) {
				    (i==0) ? mainPlayer.dameg += 1 : (i==1) ? mainPlayer.skilGmg += 1 : (i==2) ? mainPlayer.defent += 1 : mainPlayer.health += 1;

				    numPoints -= 1;
			    }else if(mouse.isInObject(arrMinusMenu[i])) {
				    (i==0 && mainPlayer.dameg > 3) ? mainPlayer.dameg -= 1 : (i==1 && mainPlayer.skilGmg > 1) ? mainPlayer.skilGmg -= 1 : (i==2 && mainPlayer.defent > 0) ? mainPlayer.defent -= 1 : (i==3 && mainPlayer.health > 5) ? mainPlayer.health -= 1 : numPoints -= 1;

				    numPoints += 1;
			    }
		    }
	    }

	    //
	}
	if(gameData.totalScaneName == "menu") {
		for(let i = 4; i--;) {
			if(mouse.isInObject(arrMinusMenu[i]) || mouse.isInObject(arrPlusMenu[i])) {
				mouse.setCursorImage('img/cur_poi.png');
				return;
			}else {
				mouse.setCursorImage('img/cur_def.png');
			}
		}
		if(mouse.isInObject(inputObj)) {
			mouse.setCursorImage('img/cur_poi.png');
		    return;
		}else {
			mouse.setCursorImage('img/cur_def.png');
		}

		for(let i = 4;i--;) {
			if(mouse.isInObject(menuIconsObjs[i])) {
			    viewHelpBl = true;
			    textHelp = helpsTexts[i];
		        return;
		    }else {
				viewHelpBl = false;
		    }
		}
	}

	// *
}




//Analog console.log() or log()
function gameLog(text, type, stat) {
	console.log("*-------------------------------------------------------*\n# " + stat + ": [" + type + "] : " + text + " #\n*-------------------------------------------------------*");
}

//View Help blank
function viewHelp() {
	if(viewHelpBl == true) {
	    blankObj.setPosition(point(mouse.getPosition().x + 20, mouse.getPosition().y + 16));
	    blankObj.setSize(w2h(textHelp.length * 14, 40));
	    blankObj.draw();

	    brush.drawText({
	    	x: blankObj.x + 5, y: blankObj.y + 5,
	    	size: 20,
	    	font: "cursive",
	    	color: "#fff",
	    	text: textHelp
	    });
    }
}


//Other params =================================

//is browser not chrome to 'stop'
game.newLoop("stop", function() {
	brush.drawText({
		x: gameWidth/2, y: gameHeight/2,
		size: 23,
		color: "red",
		text: (!isMobile) ? "Извините, но игра работает только в Google Chrome!" : "Извините, но игра НЕ работает в мобильном браузере!",
		align: "center"
	});
});

//Start Game!!!
system.addEvent("onload", "loadPage", function () {
	gameLog("Page load!", "ELOAD", "Done");
    system.delEvent("onload", "loadPage");
});

//New player -------------
if(gameData.newPlayer == true) {
    gameData.nextScaneId = startId;
    gameData.nextScaneName = startLocat;
}

//Version PointJS
log("Engine: PointJS 0.5.8 whith my context");

//Check Chrome Browser and Mobile version
if(userAg.browser.family == "Chrome" || userAg.browser.family == "chrome") {
	//Load
	if(!deviceJs.android() && !deviceJs.ios() && !deviceJs.ipad() && !deviceJs.iphone() && !deviceJs.mobile()) {
        game.startLoop('loadingScane');
        drawScane = false;
        game.setFPS(startFPS);
        gameLog("Start game! Browser is Chrome!", "DTC", "Start");
        userAg = null;
        deviceJs = null;
    }else {
	    game.startLoop("stop");
	    userAg = null;
	    deviceJs = null;
	    //Mobile!
	    isMobile = true;
    }
}else {
	game.startLoop("stop");
	gameLog("Stop game! Browser not Chrome!", "DTC", "Stop");
	userAg = null;
	deviceJs = null;
}
