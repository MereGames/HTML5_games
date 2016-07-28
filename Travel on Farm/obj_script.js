//==Различные игровые объекты== Стоит почти на самом верху

//Самое главное
var obj_system = {
	nameProject: document.getElementById("gameTitle").innerHTML,
	version: "1.1.2",
	speed: 2,
	width: 1706,
	sizeSitings: 25,
	sizeButtons: 70,
	boxSize: 50,
	moneyPlayer: Math.round(localStorage.getItem("money_player")),
	scorePlayer: 0,
	best_score: Math.round(localStorage.getItem("best_score")),
	move: true,
	checkEnd: false,
	gamePos: "main",
	gameOver: false,
	numBullets: 5,
	playSongs: true,
	
	speedFon: 0.5,
	
	appId: 5485475,
	appSecret: "zmaV11FtFZSTL0ZvSfJG",
	appInsel: true,

    //Игрок
    firstName: "none",
    lastName: "none",
	
	//Немного физики
	gravity: 2,
	MAX_GRAVITY: 2,
	SPEED_GRAVITY: 0.01
};

//Дополнение
var obj_sky = {
	x: -1,
	y: 0,
	speed: obj_system.speed
},
obj_farm = {
	x: -1,
	y: 152,
	speed: obj_system.speed
},
obj_fon = {
	x: -1,
	y: 176,
	speed: obj_system.speed
},
obj_plat = {
	x: -1,
	y: 435,
	height: 46,
	speed: obj_system.speed
},
obj_fullscreen = {
	x: 9,
	y: 4,
},
obj_audio = {
	x: 49,
	y: obj_fullscreen.y
},
obj_buttonPlay ={
	x: 327,
	y: 400,
	width: 200,
	height: 50
},
obj_border = {
	x: 327,
	y: 100,
	width: 200,
	height: 270
},
obj_box1 = {
	x: 0
},
obj_box1_2 = {
	x: 0
},
obj_box2 = {
	x: 0
},

obj_home = {
	x: 310,
	y: 300
},
obj_rating = {
	x: 410,
	y: 300
},
obj_reload = {
	x: 510,
	y: 300
},
obj_back = {
	x: 255,
	y: 55,
	width: 100,
	height: 40
},
obj_left = {
	x: 30,
	y: 200
},
obj_right = {
	x: 755,
	y: 200
},

obj_bullet = {
	x: 0,
	y: -20
},

obj_addCoin = {
	x: 0,
	width: 28,
	height: 34
}


console.log("***'obj_script.js' загружен.****");