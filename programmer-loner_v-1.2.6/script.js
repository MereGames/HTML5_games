"use strict";

//Constants in code
const WIDTH = 700, HEIGHT = 400;

//Context Canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = WIDTH;
canvas.height = HEIGHT;

//all sitings game
var gameSitings = [
  {position: "preLoad", version: "1.2.6", name: "Programmer-loner"},
  {audio: true, loaded: false}
];

var alr = false;
var text = {
	msg: "none"
}

var clicked = false;
var oneSec = true;

var gameData = {
	money: 15.00,
	strong: 100,
	population: 4,
	razum: 6,
	golod: 0,
	nastro: 100,
	addMoney: 0.00
};
var statusStrong = 'green', statusGolod = "green", statusNastro = "green";
var img_msg = new Image();
img_msg.src = "img/for_msg.png";

//Images for canvas
var logo = new Image();
logo.src = 'logo.png';

//src on but over 'blue_button03.png'
var buttonPL = new Image();
buttonPL.src = 'img/blue_button02.png';

var buttonPO = new Image();
buttonPO.src = 'img/blue_button03.png';

var arrImg = [];
var objImg = {};

for(let p = 1; p<13; p++) {
	var nImg = new Image();
	if(p < 4) nImg.src = 'img/metal'+p+'.jpg';
	if(p>=4) {
		p-=3;
	  nImg.src = 'img/metalBl'+p+'.jpg';
	  p+=3;
	}
	objImg = {image: nImg, name: 'num'+p};
	arrImg.push(objImg);
}

var restX = 130, restMinX = 400;
var firstY = 180, secondY = 250, threeY = 320;
//bjects buttons 
//Town
// --- 0 ---
var but_home = new butGame(restX, firstY, buttonPL, buttonPO, 190, 45, "Home", 30);
// --- 1 ---
var but_store = new butGame(restX, secondY, buttonPL, buttonPO, 190, 45, "Store", 30);
// --- 2 ---
var but_cafe = new butGame(restX, threeY, buttonPL, buttonPO, 190, 45, "Cafe", 30);
// --- 17 ---
var but_business = new butGame(restMinX, firstY, buttonPL, buttonPO, 190, 45, "Business", 30);
// --- 25 ---
var but_travel = new butGame(restMinX, secondY, buttonPL, buttonPO, 190, 45, "Travels", 30);
// --- 26 ---
var but_taxi = new butGame(restMinX, threeY, buttonPL, buttonPO, 190, 45, "Taxi", 30);

//Home
// --- 5 ---
var but_create = new butGame(restX, secondY, buttonPL, buttonPO, 190, 45, "Create game", 30);
// --- 6 ---
var but_pere = new butGame(restX, threeY, buttonPL, buttonPO, 190, 45, "Have a snack", 30);
// --- 7 ---
var but_learn = new butGame(restMinX, firstY, buttonPL, buttonPO, 190, 45, "Study", 30);
// --- 8 ---
var but_relax = new butGame(restMinX, secondY, buttonPL, buttonPO, 190, 45, "Relax", 30);
// --- 23 ---
var but_watch = new butGame(restMinX, threeY, buttonPL, buttonPO, 190, 45, "Watching TV", 30);

//Store
// --- 9 ---
var but_upCom = new butGame(restX, secondY, buttonPL, buttonPO, 190, 45, "Improve Com", 30);
// --- 10 ---
var but_upHom = new butGame(restX, threeY, buttonPL, buttonPO, 190, 45, "Improve Hom", 30);
// --- 11 ---
var but_moon = new butGame(restMinX, firstY, buttonPL, buttonPO, 190, 45, "Moonlighting", 30);
// --- 14 ---
var but_car = new butGame(restMinX, secondY, buttonPL, buttonPO, 190, 45, "Buy car", 30);
// --- 15 ---
var but_office = new butGame(restMinX, threeY, buttonPL, buttonPO, 190, 45, "Buy office", 30);

//Cafe
// --- 12 ---
var but_eat = new butGame(restX, secondY, buttonPL, buttonPO, 190, 45, "Eat", 30); 
// --- 13 ---
var but_fill = new butGame(restX, threeY, buttonPL, buttonPO, 190, 45, "Eat one's fill", 30);
// --- 16 ---
var but_cafeBuy = new butGame(restMinX, secondY, buttonPL, buttonPO, 190, 45, "Buy Cafe", 30);
// --- 24 ---
var but_good = new butGame(restMinX, threeY, buttonPL, buttonPO, 190, 45, "Good rest", 30);

//Business
// --- 18 ---
var but_addOne = new butGame(restX, secondY, buttonPL, buttonPO, 190, 45, "Add$0.05/sec", 30);
// --- 19 ---
var but_addTwo = new butGame(restX, threeY, buttonPL, buttonPO, 190, 45, "Add$0.15/sec", 30);
// --- 20 ---
var but_addThree = new butGame(restMinX, firstY, buttonPL, buttonPO, 190, 45, "Add$0.40/sec", 30);
// --- 21 ---
var but_addFoor = new butGame(restMinX, secondY, buttonPL, buttonPO, 190, 45, "Add$1.10/sec", 30);
// --- 22 ---
var but_addFife = new butGame(restMinX, threeY, buttonPL, buttonPO, 190, 45, "Add$1.50/sec", 30);

//Travels
// --- 28 ---
var but_egypt = new butGame(restX, secondY, buttonPL, buttonPO, 190, 45, "Egypt", 30);
// --- 29 ---
var but_turkey = new butGame(restX, threeY, buttonPL, buttonPO, 190, 45, "Turkey", 30);
// --- 30 ---
var but_hawaii = new butGame(restMinX, firstY, buttonPL, buttonPO, 190, 45, "Hawaii", 30);
// --- 31 ---
var but_france = new butGame(restMinX, secondY, buttonPL, buttonPO, 190, 45, "France", 30);
// --- 32 ---
var but_china = new butGame(restMinX, threeY, buttonPL, buttonPO, 190, 45, "China", 30);

//all areas
// --- 3 ---
var but_town = new butGame(restX, firstY, buttonPL, buttonPO, 190, 45, "Town", 30);
// --- 4 ---
var but_newGame = new butGame(7, 180, buttonPL, buttonPO, 100, 30, "New game", 20);

//Other
// --- 27 --- 
var but_ok = new butGame(WIDTH/2 - 95, HEIGHT/2 + 60, buttonPL, buttonPO, 190, 45, "OK", 30);

//Save in arr
var objsBut = [];
objsBut.push(but_home, but_store, but_cafe, but_town, but_newGame, but_create, but_pere, but_learn, but_relax, but_upCom, but_upHom, but_moon, but_eat, but_fill, but_car, but_office, but_cafeBuy, but_business, but_addOne, but_addTwo, but_addThree, but_addFoor, but_addFife, but_watch, but_good, but_travel, but_taxi, but_ok, but_egypt, but_turkey, but_hawaii, but_france, but_china);

//Main function calls@window.onload
function main() {
	var timeLoading = 1000;
	
	requestAnimationFrame(loop, canvas);
	
	//time for end loading
	setTimeout(function () {
		gameSitings[0].position = "Town";
		baner.style.display = "none";
		gameSitings[1].loaded = true;
	}, timeLoading);
	
	 var newPlayer = localStorage.getItem("newPl");
if(newPlayer == 'false') {
	loadGame();
}else {
  saveGame();
}
  checkData();
}

//loop game call@RequestAnimationFrame in start 'main'
function loop() {
	update();
	draw();
	
	//open loop elem... 'canvas'
	requestAnimationFrame(loop, canvas);
}

function update() {
	if(gameSitings[1].loaded == true) {
		if(gameData.golod < 0) {
		    gameData.golod = 0;
	    }
	    if(gameData.strong > 100) {
		    gameData.strong = 100;
	    }
		if(gameData.nastro > 100) {
		    gameData.nastro = 100;
	    }
		if(gameData.strong < 0) {
		    gameData.strong = 0;
	    }
	}
	
	checkData();
	
	if(oneSec == true) {
		oneSec = false;
		setTimeout(function () {
			gameData.money += gameData.addMoney;
			
			saveGame();
			oneSec = true;
		}, 1000);
	}
}


//Draw from loop
var startGame = false, endGame = true;
var etapsGame = {
	one: false,
	two: false,
	three: false,
	
	views: 0,
	money: 0
};

function draw() {
	//clear all on canvas
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	
	//draw Logo 'Mere Games'
	if(gameSitings[0].position === "preLoad") {
		ctx.drawImage(logo, -1, 0, WIDTH+1, HEIGHT);
	}
	//All time draw this befo loading
	if(gameSitings[1].loaded == true) {
		ctx.drawImage(arrImg[0].image, 0, 0, 80, 120);
		ctx.drawImage(arrImg[1].image, WIDTH-80, 0, 80, 120);
		
		for(let x = 80, y = 210; x < WIDTH-80; x+=80) {
		    ctx.drawImage(arrImg[5].image, x, 121, 80, 110);
		    ctx.drawImage(arrImg[2].image, x, 0, 80, 120);
		    ctx.drawImage(arrImg[10].image, x, 290, 80, 110);
			  ctx.drawImage(arrImg[11].image, x, 180, 80, 110);
		}
		
		ctx.drawImage(arrImg[3].image, 0, 120, 80, 110);
		ctx.drawImage(arrImg[4].image, WIDTH-80, 120, 80, 110);
		
		ctx.fillStyle = "#fff";
		ctx.font = "30px Arial";
		ctx.textAlign = "center";
		ctx.fillText(gameSitings[0].position, WIDTH/2, 149);
		
		
		for(let y = 210; y < 320; y+=110) {
			ctx.drawImage(arrImg[6].image, 0, y, 80, 110);
			ctx.drawImage(arrImg[7].image, WIDTH-80, y, 80, 110);
		}
		
		ctx.drawImage(arrImg[8].image, 0, 290, 80, 110);
		ctx.drawImage(arrImg[9].image, WIDTH-80, 290, 80, 110);
		
		//data
		ctx.font = "20px Arial";
		ctx.textAlign = "center";
		ctx.fillText("Money:", 90, 30);
		ctx.fillText("Force:", 90, 80);
		ctx.fillText("Mastery:", WIDTH/2, 30);
		ctx.fillText("Reputation:", WIDTH-70, 30);
		ctx.fillText("Hunger:", WIDTH/2, 80);
		ctx.fillText("Mood:", WIDTH-70, 80);
		ctx.fillStyle = "#BF8F46";
		ctx.fillText("$"+gameData.money.toFixed(2), 90, 50);
		ctx.fillText(gameData.razum, WIDTH/2, 50);
		ctx.fillText(gameData.population, WIDTH-70, 50);
		ctx.fillStyle = statusStrong;
		ctx.fillText(gameData.strong+"/100", 90, 100);
		 ctx.fillStyle = statusGolod;
		ctx.fillText(Math.round(gameData.golod)+"/100", WIDTH/2, 100);
		 ctx.fillStyle = statusNastro;
		ctx.fillText(gameData.nastro+"/100", WIDTH-70, 100);
		ctx.fillStyle = "#fff";
		
		//Town
		if(gameSitings[0].position == "Town") {
		  but_home.draw();
		  but_store.draw();
		  but_cafe.draw();
		  but_business.draw();
		  but_travel.draw();
		  but_taxi.draw();
	    }
	    //Home
		if(gameSitings[0].position == "Home") {
			but_town.draw();
			but_create.draw();
			but_pere.draw();
			but_learn.draw();
			but_relax.draw();
			but_watch.draw();
		}
		//Store
		if(gameSitings[0].position == "Store") {
			but_town.draw();
			but_upCom.draw();
			but_upHom.draw();
			but_moon.draw();
			but_car.draw();
			but_office.draw();
		}
		//Cafe
		if(gameSitings[0].position == "Cafe") {
			but_town.draw();
			but_eat.draw();
			but_fill.draw();
			but_moon.draw();
			but_cafeBuy.draw();
			but_good.draw();
		}
		 //Business
		 if(gameSitings[0].position == "Business") {
			 but_town.draw();
			 but_addOne.draw();
			 but_addTwo.draw();
			 but_addThree.draw();
			 but_addFoor.draw();
			 but_addFife.draw();
		 }
		 //Travels
		 if(gameSitings[0].position == "Travels") {
			 but_town.draw();
			 but_egypt.draw();
			 but_turkey.draw();
			 but_hawaii.draw();
			 but_france.draw();
			 but_china.draw();
		 }
		 //Taxi
		 if(gameSitings[0].position == "Taxi") {
			 but_town.draw();
			 but_moon.draw();
		 }
		//You game
		if(gameSitings[0].position == "You Game") {
			if(startGame == true) {
				youGameStats();
				startGame = false;
		}
			
			ctx.textAlign = "right";
			if(etapsGame.one == true) {
				ctx.fillText("Creating a game...", 320, 300);
			}
			ctx.fillStyle = "green";
			if(etapsGame.two == true) {
				ctx.fillText("Views: "+etapsGame.views, 430, 300);
			}
			if(etapsGame.three == true) {
				ctx.fillText("Money: +$"+etapsGame.money, 620, 300);
			}
			ctx.fillStyle = "#fff";
			
			if(endGame == true) {
				but_town.draw();
			}
		}
		but_newGame.draw();
		 //fillText version game
		ctx.font = "15px Arial";
		ctx.textAlign = "right";
		ctx.fillText(gameSitings[0].version, WIDTH-10, HEIGHT-10);
		ctx.fillStyle = "#000";
		
		 //MSG
		if(alr == true) {
			ctx.globalAlpha = 0.5;
			ctx.fillStyle = "#000";
			ctx.fillRect(0, 0, WIDTH, HEIGHT);
			ctx.globalAlpha = 1;
			ctx.fillStyle = "#fff";
			ctx.font = "20px Arial";
			ctx.drawImage(img_msg, WIDTH/2 - 215, HEIGHT/2 - 150);
			ctx.textAlign = "center";
			ctx.fillText(text.msg, WIDTH/2, HEIGHT/2);
			but_ok.draw();
		}
	}
	
}

function youGameStats() {
	setTimeout(function () {
		etapsGame.one = true;
		setTimeout(function () {
			etapsGame.two = true;
			setTimeout(function () {
				etapsGame.three = true;
				endGame = true;
				gameData.money += +etapsGame.money;
				saveGame();
			}, 500);
		}, 2300);
	}, 100);
}

//Classes
function butGame(x, y, img, ovrImg, width, height, text, font) {
	this.x = x;
	this.y = y;
	this.img = img;
	this.ovrImg = ovrImg;
	this.over = false;
	this.width = width;
	this.height = height;
	this.text = text;
	this.font = font;
	this.draw = function() {
		ctx.font = this.font+"px Arial";
		ctx.textAlign = "center";
		if(this.over == false) {
		    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
		    ctx.fillText(this.text, this.x+this.width/2, this.y+this.height/2+8);
		}else {
			ctx.drawImage(this.ovrImg, this.x, this.y, this.width, this.height);
		    ctx.fillText(this.text, this.x+this.width/2, this.y+this.height/2+8);
		}
	}
}

//Events
function moveMouse(e) {
	let x = e.clientX;
	let y = e.clientY;
	
	if(gameSitings[1].loaded == true && alr == false) {
			for(let t = 0; t < objsBut.length; t++) {
				if(x >= objsBut[t].x && x <= objsBut[t].x + objsBut[t].width && y >= objsBut[t].y && y <= objsBut[t].y + objsBut[t].height) {
					objsBut[t].over = true;
					if(objsBut[t].y >= threeY) {
						objsBut[t].y = 325;
					}else if(objsBut[t].y >= secondY) {
						objsBut[t].y = 255;
					}else {
						objsBut[t].y = 185;
					}
				}else {
					objsBut[t].over = false;
					if(objsBut[t].y >= threeY) {
						objsBut[t].y = 320;
					}else if(objsBut[t].y >= secondY) {
						objsBut[t].y = 250;
					}else {
						objsBut[t].y = 180;
					}
				}
			}
	}else if(alr == true) {
		if(x >= objsBut[27].x && x <= objsBut[27].x + objsBut[27].width && y >= objsBut[27].y && y <= objsBut[27].y + objsBut[27].height) {
					objsBut[27].over = true;
					objsBut[27].y = HEIGHT/2 + 65;
				}else {
					objsBut[27].over = false;
					objsBut[27].y = HEIGHT/2 + 60;
				}
	}
	
}

function clickMouse(e) {
	var x = e.clientX;
	var y = e.clientY;
	
	if(gameSitings[1].loaded == true && alr == false) {
			for(let t = 0; t < objsBut.length; t++) {
			    if(x >= objsBut[t].x && x <= objsBut[t].x + objsBut[t].width && y >= objsBut[t].y && y <= objsBut[t].y + objsBut[t].height && clicked == false) {
			    	 oneStep("simple");
			    	if(gameSitings[0].position == "Town") {
					switch(t) {
						case 0:
						  gameSitings[0].position = "Home";
						  clicked = true;
						  clickTime();
						break;
						
						case 1:
						  gameSitings[0].position = "Store";
						  clicked = true;
						  clickTime();
						break;
						
						case 2:
						  gameSitings[0].position = "Cafe";
						  clicked = true;
						  clickTime();
						break;
						
						 case 17:
						  gameSitings[0].position = "Business";
						  clicked = true;
						  clickTime();
						break;
						
						case 25:
						  gameSitings[0].position = "Travels";
						  clicked = true;
						  clickTime();
						break;
						
						case 26:
						  gameSitings[0].position = "Taxi";
						  clicked = true;
						  clickTime();
						break;
						
						case 4:
						  reloadGame(true);
						  clicked = true;
						  clickTime();
						break;
					}
					}else if(gameSitings[0].position == "Home") {
						 switch(t) {
						case 3:
						  gameSitings[0].position = "Town";
						  clicked = true;
						  clickTime();
						break;
						
						case 4:
						  reloadGame(true);
						  clicked = true;
						  clickTime();
						break;
						
						case 5:
						  if(gameData.strong >= 56 && gameData.nastro >= 43) {
						  gameSitings[0].position = "You Game";
						  startGame = true;
						  endGame = false;
						  etapsGame.one = false;
				          etapsGame.two = false;
				          etapsGame.three = false;
						  etapsGame.money = Math.random() * gameData.razum;
						  if(etapsGame.money < 50.00) {
							  etapsGame.money *= 2;
						  }
						  var ju = etapsGame.money;
						  etapsGame.money = ju.toFixed(2);
						  etapsGame.views = Math.round(Math.random() + 20 * gameData.population);
						  gameData.population += 1;
						  gameData.strong -= 56;
						  gameData.nastro -= 43;
						  gameData.golod += 33;
						  checkData();
						  clicked = true;
						  clickTime();
						  }else {
							  alertMsg("You need 56 forse and 43 mood!");
						  }
						break;
						
						case 6:
						  changeData("pere");
						  clicked = true;
						  clickTime();
						break;
						
						case 23:
						  changeData("watch");
						  clicked = true;
						  clickTime();
						break;
						
						case 7:
						  changeData("learn");
						  clicked = true;
						  clickTime();
						break;
						
						case 8:
						  changeData("relax");
						  clicked = true;
						  clickTime();
						break;
					}
					}else if(gameSitings[0].position == "Store") {
						 switch(t) {
						case 3:
						  gameSitings[0].position = "Town";
						  clicked = true;
						  clickTime();
						break;
						
						case 9:
						  if(gameData.money >= 26.37) {
						  	gameData.money -= 26.37;
						  	gameData.razum += 7;
						  	gameData.population += 5;
						    clicked = true;
						    clickTime();
						  }else {
						  	alertMsg("You need $26.37!");
						  }
						break;
						
						case 10:
						  if(gameData.money >= 127.48) {
						  	gameData.money -= 127.48;
						  	gameData.razum += 6;
						  	gameData.nastro += 26;
						  	gameData.population += 16;
						    clicked = true;
						    clickTime();
						  }else {
						  	alertMsg("You need $127.48!");
						  }
						break;
						
						case 11:
						  if(gameData.strong >= 20 && gameData.nastro >= 16) {
							  gameData.strong -= 20;
							  gameData.money += 1.50;
							  gameData.nastro -= 16;
							  
						      clicked = true;
						      clickTime();
						  }else {
							  alertMsg("You need 20 forse and 16 mood!");
						  }
						break;
						
						case 14:
						  if(gameData.money >= 160.47) {
						  	gameData.money -= 160.47;
						  	gameData.population += 27;
						  	gameData.razum += 14;
						  	 clicked = true;
						    clickTime();
						  }else {
						  	alertMsg("You need $160.47");
						  }
						break;
						
						 case 15:
						  if(gameData.money >= 549.25) {
						  	 gameData.money -= 549.25;
						  	 gameData.population += 132;
						  	 gameData.razum += 24;
						  	 clicked = true;
						    clickTime();
						  }else {
						  	alertMsg("You need $549.25!");
						  }
						break;
						
						case 4:
						  reloadGame(true);
						  clicked = true;
						  clickTime();
						break;
					}
					}else if(gameSitings[0].position == "Cafe") {
						 switch(t) {
						case 3:
						  gameSitings[0].position = "Town";
						  clicked = true;
						  clickTime();
						break;
						
						case 4:
						  reloadGame(true);
						  clicked = true;
						  clickTime();
						break;
						
						case 12:
						  if(gameData.money >= 5.00) {
						  	gameData.golod -= 58;
						  	gameData.nastro += 5;
						  	gameData.money -= 5.00;
						  	gameData.strong += 10;
						    clicked = true;
						    clickTime();
						  }else {
						  	alertMsg("You need $5.00");
						  }
						break;
						
						case 13:
						  if(gameData.money >= 17.50) {
						  	gameData.money -= 17.50;
						  	gameData.nastro += 30;
						  	gameData.golod -= 100;
						  	gameData.strong += 10;
						    clicked = true;
						    clickTime();
						  }else {
						  	alertMsg("You need $17.50!");
						  }
						break;
						
						 case 16:
						  if(gameData.money >= 340.50) {
						  	gameData.money -= 340.50;
						  	gameData.nastro += 40;
						  	gameData.golod -= 100;
						  	gameData.strong += 20;
						  	gameData.population += 110;
						    clicked = true;
						    clickTime();
						  }else {
						  	alertMsg("You need $340.50");
						  }
						break;
						
						case 24:
						  if(gameData.money >= 63.42) {
						  	gameData.money -= 63.42;
						  	gameData.nastro += 100;
						  	gameData.golod -= 60;
						  	gameData.strong += 14;
							gameData.razum += 2;
						    clicked = true;
						    clickTime();
						  }else {
						  	alertMsg("You need $63.42!");
						  }
						break;
						
						case 11:
						  if(gameData.strong >= 20 && gameData.nastro >= 16) {
							  gameData.strong -= 20;
							  gameData.money += 1.50;
							  gameData.nastro -= 16;
							  
						      clicked = true;
						      clickTime();
						  }else {
							  alertMsg("You need 20 forse and 16 mood!");
						  }
						  clicked = true;
						  clickTime();
						break;
					}
					}else if(gameSitings[0].position == "You Game") {
						
						switch(t) {
						case 3:
						if(endGame == true) {
						  gameSitings[0].position = "Town";
						  clicked = true;
						  clickTime();
						}
						break;
						
						case 4:
						  reloadGame(true);
						  clicked = true;
						  clickTime();
						break;
						}
					}else if(gameSitings[0].position == "Business") {
						switch(t) {
						 case 3:
						  gameSitings[0].position = "Town";
						  clicked = true;
						  clickTime();
						break;
						
						case 18:
						  if(gameData.money >= 36.63) {
						  	gameData.money -= 36.63;
						  	gameData.addMoney += 0.05;
						    clicked = true;
						    clickTime();
						  }else {
						  	alertMsg("You need $36.63!");
						  }
						break;
						
						case 19:
						  if(gameData.money >= 136.52) {
						  	gameData.money -= 136.52;
						  	gameData.addMoney += 0.15;
						    clicked = true;
						    clickTime();
						  }else {
						  	alertMsg("You need $136.52!");
						  }
						break;
						
						case 20:
						  if(gameData.money >= 247.84) {
						  	gameData.money -= 247.84;
						  	gameData.addMoney += 0.40;
						    clicked = true;
						    clickTime();
						  }else {
						  	alertMsg("You need $247.84!");
						  }
						break;
						
						case 21:
						  if(gameData.money >= 483.74) {
						  	gameData.money -= 483.74;
						  	gameData.addMoney += 1.10;
						    clicked = true;
						    clickTime();
						  }else {
						  	alertMsg("You need $483.74!");
						  }
						break;
						
						case 22:
						  if(gameData.money >= 857.35) {
						  	gameData.money -= 857.35;
						  	gameData.addMoney += 2.40;
						    clicked = true;
						    clickTime();
						  }else {
						  	alertMsg("You need $857.35!");
						  }
						break;
						
						 case 4:
						  reloadGame(true);
						  clicked = true;
						  clickTime();
						break;
						}
					}else if(gameSitings[0].position == "Travels") {
						switch(t) {
						 case 3:
						  gameSitings[0].position = "Town";
						  clicked = true;
						  clickTime();
						break;

						case 28:
						  if(gameData.money >= 200.50) {
						  	gameData.money -= 200.50;
						  	gameData.nastro += 90;
						  	gameData.strong += 70;
						  	gameData.golod -= 10;
						  	gameData.position += 20;
						  	gameData.razum += 6;
						  }else {
						  	alertMsg("You need $200.50");
						  }
						  clicked = true;
						  clickTime();
						break;

						case 29:
						  if(gameData.money >= 243.50) {
						  	gameData.money -= 243.50;
						  	gameData.nastro += 90;
						  	gameData.strong += 70;
						  	gameData.golod -= 10;
						  	gameData.position += 20;
						  	gameData.razum += 6;
						  }else {
						  	alertMsg("You need $243.50");
						  }
						  clicked = true;
						  clickTime();
						break;

						case 30:
						  if(gameData.money >= 352.50) {
						  	gameData.money -= 352.50;
						  	gameData.nastro += 100;
						  	gameData.strong += 90;
						  	gameData.golod -= 20;
						  	gameData.position += 20;
						  	gameData.razum += 6;
						  }else {
						  	alertMsg("You need $352.50");
						  }
						  clicked = true;
						  clickTime();
						break;

						case 31:
						  if(gameData.money >= 362.50) {
						  	gameData.money -= 362.50;
						  	gameData.nastro += 100;
						  	gameData.strong += 90;
						  	gameData.golod -= 15;
						  	gameData.position += 20;
						  	gameData.razum += 6;
						  }else {
						  	alertMsg("You need $362.50");
						  }
						  clicked = true;
						  clickTime();
						break;

						case 32:
						  if(gameData.money >= 437.50) {
						  	gameData.money -= 437.50;
						  	gameData.nastro += 100;
						  	gameData.strong += 100;
						  	gameData.golod -= 40;
						  	gameData.position += 30;
						  	gameData.razum += 13;
						  }else {
						  	alertMsg("You need $437.50");
						  }
						  clicked = true;
						  clickTime();
						break;
						
						
						 case 4:
						  reloadGame(true);
						  clicked = true;
						  clickTime();
						break;
						}
				 } else if(gameSitings[0].position == "Taxi") {
						switch(t) {
						 case 3:
						  gameSitings[0].position = "Town";
						  clicked = true;
						  clickTime();
						break;

						case 11:
						  if(gameData.strong >= 20 && gameData.nastro >= 16) {
							  gameData.strong -= 20;
							  gameData.money += 1.50;
							  gameData.nastro -= 16;
							  
						      clicked = true;
						      clickTime();
						  }else {
							  alertMsg("You need 20 forse and 16 mood!");
						  }
						  clicked = true;
						  clickTime();
						break;
						
						
						 case 4:
						  reloadGame(true);
						  clicked = true;
						  clickTime();
						break;
						}
				}
				}
				}
		}else if(x >= objsBut[27].x && x <= objsBut[27].x + objsBut[27].width && y >= objsBut[27].y && y <= objsBut[27].y + objsBut[27].height && clicked == false){
			alr = false;
			if(gameData.golod >= 100) {
				reloadGame(false);
			}
		}
}


function clickTime() {
	setTimeout(function () {
		clicked = false;
	},200);
}

function oneStep(type){
	if(type == "simple") {
		if(gameData.money >= 500.00) {
			gameData.golod += 5;
		    gameData.strong -= 7;
			gameData.nastro -= 5;
		}else if(gameData.money >= 200.00) {
			gameData.golod += 3;
		    gameData.strong -= 5;
			gameData.nastro -= 7;
		}else if(gameData.money >= 70.00) {
			gameData.golod += 1.5;
		    gameData.strong -= 4;
		}else {
			gameData.golod += 0.5;
		    gameData.strong -= 2;
		}
	}
	
	checkData();
	saveGame();
}

function checkData() {
	if(gameData.golod > 60) {
		statusGolod = "red";
	}else {
		statusGolod = "green";
	}
	if(gameData.strong < 50) {
		statusStrong = "red";
	}else {
		statusStrong = "green";
	}
	if(gameData.nastro < 40) {
		statusNastro = "red";
	}else {
		statusNastro = "green";
	}
	
	if(gameData.golod > 100) {
		alertMsg("Game Over!!! You hunger > 100!");
		setInterval(function() {
					gameData.golod = 100;
		}, 100);
	}
}

function changeData(data) {
	if(data == "pere") {
		if(gameData.money >= 1.50) {
			gameData.money -= 1.5;
		 	gameData.golod -= 5;
			gameData.nastro += 8;
		}else {
			alertMsg("You need $1.50!");
		}
	}else if(data == "learn") {
		if(gameData.money >= 3.50 && gameData.strong >= 17 && gameData.nastro >= 7) {
		    gameData.razum += 1;
		    gameData.golod += 5;
		    gameData.strong -= 17;
			gameData.money -= 3.50;
			gameData.nastro -= 7;
		}else {
			alertMsg("You need $3.50 and forse 17 and mood 7!");
		}
	}else if(data == "relax") {
		gameData.strong += 48;
		gameData.golod += 2;
		gameData.nastro += 18;
	}else if(data == "watch") {
		gameData.nastro += 39;
		gameData.golod += 13;
		gameData.strong += 8;
	}
}

function reloadGame(ask){
	if(ask == true) {
	var conf = confirm("Are you sure you want to start a new game?");
	if(conf === true) {
		localStorage.clear();
		location.reload();
	}
	}else {
		localStorage.clear();
		localStorage.setItem("newPl", true);
		location.reload();
	}
}

function alertMsg(msg) {
	alr = true;
	text.msg = msg;
}

function saveGame() {
	localStorage.setItem("newPl", false);
	
	localStorage.setItem("data", JSON.stringify(gameData));
}
function loadGame() {
	gameData = JSON.parse(localStorage.getItem("data"));
}

canvas.onclick = clickMouse;
canvas.onmousemove = moveMouse;
window.onload = main;