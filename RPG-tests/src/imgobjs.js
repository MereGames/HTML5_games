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

var arrPlusMenu = [];
var arrMinusMenu = [];
var arrUIPlayer = [];

var scaneGame = {};
var menuBg = {};
var rectMenu = {};
var inputObj = {};
var blankObj = {};

//For Plus and Minus
var addY = -60; var addX = 47;





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
    }else if(path == "game") {
    	arrUIPlayer = [];
    }
}

//load path ---------
function loadPath(path, id) {
	//Scane
    scaneGame = game.newImageObject({
	    x: 0, y: 0,
	    w: gameWidth, h: gameHeight,
	    file: "maps/img/scane_" + id + ".png"
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
    	for(let i = 1; i--;) {
    		let ui = game.newImageObject({
    			x: 0, y: 0,
    			file: "img/ui_"+i+".png",
    			w: 111, h: 162
    		});

    		arrUIPlayer.push(ui);
    	}

    	//User img
    	if(photoUser != null) {
    	    var userImg = game.newImageObject({
    		    file: photoUser,
			    x: 5, y: 5,
			    w: 100, h: 100
    	    });
        }
    }

    //
}
