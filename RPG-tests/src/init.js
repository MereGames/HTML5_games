/**
*
* @ Copyryght Mere Games 2016
* @ support@meregames.ru
* @ Mail - meregames@mail.ru
*
**/



//init PointJs
var pjs = new PointJS('2d', 950, 500);

//Main init var
var log = pjs.system.log;
var game = pjs.game;
var point = pjs.vector.point;
var camera = pjs.camera;
var brush = pjs.brush;
var OOP = pjs.OOP;
var math = pjs.math;
var vector = pjs.vector;
var v2d = vector.v2d;
var w2h = vector.w2h;
var system = pjs.system;
var resources = pjs.resources;
var tiles = pjs.tiles;
var dialogs = pjs.dialogs;

//Context canvas
var ctx = system.getContext();

//Keyboard
var key = pjs.keyControl;
key.initKeyControl();

//FPS
pjs.system.initFPSCheck();
var fpsGame = pjs.system.getFPS();
function drawFPS() {
	fpsGame = system.getFPS();
	    brush.drawTextS({
		x: gameWidth, y: 0,
		size: 25,
		align: "right",
		color: "#fff",
		text: fpsGame + "FPS"
	});
}

//Mouse
var mouse = pjs.mouseControl;
mouse.initMouseControl();
mouse.setCursorImage("img/cur_def.png");

//Sizes
var gameWidth = game.getWH().w;
var gameHeight = game.getWH().h;
