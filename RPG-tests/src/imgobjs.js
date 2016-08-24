/**
*
* @ Copyryght Mere Games 2016
* @ support@meregames.ru
* @ Mail - meregames@mail.ru
*
**/

//Init
var menuIconsObjs = [];
const NUM_ICONS = 4;
const NUM_SCANES = 1;
const NUM_UI = 1;

var arrPlusMenu = [];
var arrMinusMenu = [];
var arrUIPlayer = [];

var scaneGame = {};
var menuBg = {};
var rectMenu = {};
var inputObj = {};
var blankObj = {};
var userImg = {};

var dataMap = {};

//For Plus and Minus
var addY = -60; var addX = 47;

var widSTR = 200;





//Del path ---------
function deletPath(path, id) {
	scaneGame  = null;

	if(path == "menu") {
	    menuIconsObjs = [];
	    arrMinusMenu = [];
	    arrPlusMenu = [];

	    menuBg = {};
	    rectMenu = {};
	    inputObj = {};
	    blankObj = {};
	    dataMap = {};
    }else if(path == "game") {
    	arrUIPlayer = [];
    	userImg = {};
    	dataMap = {};
    }
}

//load path ---------
function loadPath(path, id, world) {
	//Scane
    scaneGame = game.newImageObject({
	    x: 0, y: 0,
	    w: gameWidth, h: gameHeight,
	    file: "maps/world_" + world + "/img/scane_" + id + ".png"
    });
    OOP.readJSON("maps/world_" + world + "/data/scane_" + id + ".json", function (obj) {
    	dataMap = obj;
    	maxSizeMap = dataMap.maxSize;
    });

    //Menu load
    if(path == "menu") {
    	//Icons Menu
        for(let i = 0; i < 4; i+= 1) {
	        let iconObj = game.newImageObject({
		        x: gameWidth/2 - 10, y: gameHeight/2 - 80 + (46*i),
		        w: 50, h: 50,
		        file: "img/icon_" + i + ".png"
	        });
	        menuIconsObjs.push(iconObj);
        }
        //Plus and Minus
        for(let i = 4; i--;) {

	        let butPlus = game.newImageObject({
	            w: 20, h: 20,
	            x: 0, y: 0,
	            file: "img/plus.png"
            });
            let butMinus = game.newImageObject({
	            w: 20, h: 20,
	            x: 0, y: 0,
	            file: "img/minus.png"
            });

	        butMinus.x = gameWidth/2 + addX;
	        butPlus.x = gameWidth/2 + addX + 65;

	        butMinus.y = gameHeight/2 + addY;
	        butPlus.y = gameHeight/2 + addY;

	        arrPlusMenu.push(butPlus);
	        arrMinusMenu.push(butMinus);

	       addY += 45;
        }

        //Bg - menu
        menuBg = game.newImageObject({
	        x: 0, y: 0,
	        w: gameWidth, h: gameHeight,
	        file: "img/menu_bg.png"
        });
        //Hero bg menu
        rectMenu = game.newImageObject({
	        w: 400, h: 300,
	        x: gameWidth/2 - (200), y: gameHeight/2 - 150,
	        file: "img/menu.png"
        });
        //Input name player
        inputObj = game.newImageObject({
	        x: gameWidth/2 - 150, y: gameHeight - 88,
	        w: 300, h: 55,
	        file: "img/input.png"
        });

        //Help blank
        blankObj = game.newImageObject({
	        x: gameWidth/2 - 150, y: gameHeight - 88,
	        w: 300, h: 55,
	        file: "img/help_blank.png"
        });
    }else if(path == "game") {
    	//Bg  main stat
    	for(let i = NUM_UI; i--;) {
    		let ui = game.newImageObject({
    			x: 0, y: 0,
    			file: "img/ui_"+i+".png",
    			w: 111, h: 162
    		});
    		ui.setUserData({
    			addX: 0,
    			addY: 0
    		});

    		arrUIPlayer.push(ui);
    	}
    	//Stat lines
    	widSTR = 200;
    	for(let i = 3; i--;) {
    		let strokStat = game.newRectObject({
    			x: 0, y: 0,
    			w: widSTR, h: 15,
    			strokeColor: "#fff",
    			fillColor: "#666",
    			strokeWidth: 2
    		});
    		strokStat.setUserData({
    			addX: 105,
    			addY: 20*i + 10
    		});

    		let rectStat = game.newRectObject({
    			x: 0, y: 0,
    			w: widSTR, h: 13,
    			fillColor: (i==0) ? "red" : (i==1) ? "blue" : ("orange")
    		});
    		rectStat.setUserData({
    			addX: 105,
    			addY: 20*i + 12
    		});

    		arrUIPlayer.push(rectStat);
    		arrUIPlayer.push(strokStat);
    		widSTR += 40;
    	}

    	//level player
    	let lvlBarSt = game.newRectObject({
    		x: 10, y: gameHeight - 20,
    		w: gameWidth - 20, h: 10,
    		strokeColor: "#fff", strokeWidth: 2,
    	});
    	lvlBarSt.setUserData({
    		addX: 10,
    		addY: gameHeight - 20
    	});
    	let lvlBar = game.newRectObject({
    		x: 10, y: gameHeight - 20,
    		w: gameWidth - 20, h: 10,
    		fillColor: "#BAAA24"
    	});
    	lvlBar.setUserData({
    		addX: 10,
    		addY: gameHeight - 20
    	});
    	//Save in arr
    	arrUIPlayer.push(lvlBarSt);
    	arrUIPlayer.push(lvlBar);


    	//user img
    	if(photoUser == null) {
    		photoUser = "img/uer_img.jpg";
    	}
    }

    //
}
