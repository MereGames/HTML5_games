/* Главный сценарий игры.

 Именно здесь происходит загрузка игры,
 растановка элементов и обработка информации...

 Автор: Родион Крайнов
 
 Версия: 1.1.2 */

//Глобальные переменные
var 
canvas = document.getElementById("main_canvas"),
ofsetX = canvas.offsetLeft,
ofsetY = canvas.offsetTop,
ctx = canvas.getContext("2d"),
overButton = false,
overHome = false,
overRating = false,
overReload = false,
overBack = false,
overLeft = false,
overRight = false,

nameImg = "buyingImg",

gamePosition = "main",
startGame = false,
numFiles = 0,
speedBorder = 3,
selectPlayer = 2,
buyPlayers = [
    [{name: 1, buy: false}],
	[{name: 2, buy: true}],
	[{name: 3, buy: false}]
];

var fullName;

var arrPlayers = [
    {name: fullName, bestScore: obj_system.best_score, position: 1},
	{name: "Малый Интеллект", bestScore: 50, position: 2},
	{name: "Невидимый Разум", bestScore: 74, position: 3},
	{name: "Горелый Процессор", bestScore: 83, position: 4},
	{name: "Интеллект Робота", bestScore: 116, position: 5},
	{name: "Иск-нный Интеллект", bestScore: 158, position: 6},
	{name: "Мега Мозг", bestScore: 289, position: 7}
];

if(checkLoad() === true) {
		buyPlayers = JSON.parse(localStorage.getItem("buy_players"));
}

 
 var 
playAudio = true,
viewTutorial = false,
windowFocus = true,
viewRating = false,

//Константы
WIDTH = 854,
HEIGHT = 480,
SPASE_KEY = 32,
CTRL_KEY = 17;


//========Загрузка игры============
canvas.addEventListener('click', function (event) {
	var x = event.pageX - ofsetX,
	y = event.pageY - ofsetY;
	
	
	clickEvent(x, y);
	
}, false);

canvas.addEventListener("mousemove", function(event) {
	var x = event.pageX - ofsetX,
	y = event.pageY - ofsetY;
	
	overEvent(x, y);
	
}, false);

window.onkeydown = function(evnt) {
	var code = evnt.keyCode;
	
	keyStates(code);
};

var audioGame = new Audio('media/Morning_Stroll.mp3');
audioGame.src = 'media/morning_stroll.ogg';
audioGame.loop = true;
audioGame.play();

var fonImage = new Image();
fonImage.src = "img/bg_2.png";
fonImage.onload = function()
{
    console.log("Файл 'fonImage' загружен.");
    numFiles++;
}

var skyImage = new Image();
skyImage.src = "img/sky.png";
skyImage.onload = function()
{
	console.log("Файл 'skyImage' загружен.");
	numFiles++;
}

var farmImage = new Image();
farmImage.src = "img/farm-min.png";
farmImage.onload = function()
{
    console.log("Файл 'farmImage' загружен.");
    numFiles++;
}

var plat = new Image();
plat.src = 'img/plat-min.png';
plat.onload = function()
{
	console.log("Файл 'plat' загружен.");
	numFiles++;
}

var iconFullscreen = new Image();
iconFullscreen.src = "img/menu-icon-min.png";
iconFullscreen.onload = function()
{
	console.log("Файл 'iconFullscreen' загружен.");
	numFiles++;
}

var iconAudio = new Image();
iconAudio.src = "img/audio_icon-min.png";
iconAudio.onload = function()
{
	console.log("Файл 'iconAudio' загружен.");
	numFiles++;
}
var iconNoAudio = new Image();
iconNoAudio.src = "img/noaudio_icon.png";
iconNoAudio.onload = function()
{
	console.log("Файл 'iconNoAudio' загружен.");
	numFiles++;
}

var playerMenu1 = new Image();
playerMenu1.src = "img/player.png";
playerMenu1.onload = function()
{
	console.log("Файл 'playerMenu1' загружен.");
	numFiles++;
}

var playerMenu2 = new Image();
playerMenu2.src = "img/player2.png";
playerMenu2.onload = function()
{
	console.log("Файл 'playerMenu2' загружен.");
	numFiles++;
}

var playerMenu3 = new Image();
playerMenu3.src = "img/player3.png";
playerMenu3.onload = function()
{
	console.log("Файл 'playerMenu3' загружен.");
	numFiles++;
}
var buttonPlay = new Image();
buttonPlay.src = "img/play.png";
buttonPlay.onload = function()
{
	console.log("Файл 'buttonPlay' загружен.");
	numFiles++;
}
var borderPlayers = new Image();
borderPlayers.src = "img/border_players.png";
borderPlayers.onload = function()
{
	console.log("Файл 'borderPlayers' загружен.");
	numFiles++;
}
var leftButton = new Image();
leftButton.src = "img/left_button.png";
leftButton.onload = function()
{
	console.log("Файл 'leftButton' загружен.");
	numFiles++;
}
var rightButton = new Image();
rightButton.src = "img/right_button.png";
rightButton.onload = function()
{
	console.log("Файл 'rightButton' загружен.");
	numFiles++;
}
var keyboardTut = new Image();
keyboardTut.src = "img/keyboard.png";
keyboardTut.onload = function()
{
	console.log("Файл 'keyboardTut' загружен.");
	numFiles++;
}
var playerImg = new Image();
playerImg.src = "img/player2.png";
playerImg.onload = function()
{
	console.log("Файл 'playerImg' загружен.");
	numFiles++;
}
var iconCoin = new Image();
iconCoin.src = "img/coin.png";
iconCoin.onload = function()
{
	console.log("Файл 'iconCoin' загружен.");
	numFiles++;
}
var gameOverImg = new Image();
gameOverImg.src = "img/game_over.png";
gameOverImg.onload = function()
{
	console.log("Файл 'gameOverImg' загружен.");
	numFiles++;
}
var homeButton = new Image();
homeButton.src = "img/home_button.png";
homeButton.onload = function()
{
	console.log("Файл 'homeButton' загружен.");
	numFiles++;
}
var buyingImg = new Image();
buyingImg.src = "img/buying.png";

var buyImg = new Image();
buyImg.src = "img/buy.png";

var ratingButton = new Image();
ratingButton.src = "img/rating_button.png";
ratingButton.onload = function()
{
	console.log("Файл 'ratingButton' загружен.");
	numFiles++;
}
var reloadButton = new Image();
reloadButton.src = "img/reload_button.png";
reloadButton.onload = function()
{
	console.log("Файл 'reloadButton' загружен.");
	numFiles++;
}
var backButton = new Image();
backButton.src = "img/back_button.png";
backButton.onload = function()
{
	console.log("Файл 'reloadButton' загружен.");
	numFiles++;
}

numFiles = (filesLoad + filesPlayer + numFiles);


    var prozentLoading = 0;
    var interLoading = window.setInterval(loadGame, 60);

var loadingDone = false;


/*==================Главная функция=============*/
;function main() 
{
	
	if(startGame == false)
	{
		//Начало начал
	    console.log("Файлов загруженно: " + numFiles);
	    console.log("Загрузка \"" + obj_system.nameProject + "\" успешно завершена! :)");
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	    drawImages("main");
		
		obj_system.gamePos = "preLoad";
		
	}
	
	
	/*===============------ Цикл игры, т.е FPS ------================*/
	if(startGame == false)
	{
		var loopGame = function()
	   {
		drawImages(gamePosition);
		updateElements();
		drawTexts(gamePosition);
		
		requestAnimationFrame(loopGame, canvas);
	   }
		requestAnimationFrame(loopGame, canvas);
	}
		
		
		if(gamePosition == "game")
		{
			if(selectPlayer == 1) {obj_system.speed = 4};
			var addScore = setInterval(function() {
				if(windowFocus == true && obj_system.move == true && gamePosition == "game")
				{
				    obj_system.scorePlayer += obj_system.speed/2;
					if(selectPlayer == 1) {obj_system.scorePlayer += 3};
				}
				else
				{
					clearInterval(addScore);
				}
			}, 1000);
			
			var addSpeed = setInterval(function() {
				if(windowFocus == true)
				{
					var maxSpeed = 7;
					if(selectPlayer == 1) {maxSpeed = 15};
				    if(obj_system.speed < maxSpeed && obj_system.move == true && gamePosition == "game")
				    {
					    obj_system.speed += 0.1;
				    }
				    else
				    {
					    clearInterval(addSpeed);
				    }
				}
			   }, 3000);
			}
		
		
		startGame = true;
		loadingDone = true;
}

//Визуальная загрузка игры...
function loadGame()
{
	if(loadingDone == false) {
	    ctx.drawImage(fonImage, obj_fon.x, obj_fon.y);
	    ctx.drawImage(skyImage, obj_sky.x, obj_sky.y);
	    ctx.drawImage(farmImage, obj_farm.x, obj_farm.y);
	    ctx.drawImage(plat, obj_plat.x, obj_plat.y, obj_system.width, obj_plat.height);
	    ctx.drawImage(iconFullscreen, obj_fullscreen.x, obj_fullscreen.y, obj_system.sizeSitings, obj_system.sizeSitings);
	    ctx.drawImage(playerMenu2, 400, 240);
		
	   if(prozentLoading < 100)
	    {
		    prozentLoading += 4;
		    document.getElementById("prozent").innerHTML = prozentLoading;
	    }
       if(prozentLoading >= 100)
	    {
		    clearInterval(interLoading);
		    document.getElementById("textLoading").style.display = "none";
	    }
	}else if(loadingDone == true){
		clearInterval(interLoading);
		document.getElementById("textLoading").style.display = "none";
	}
	
}

/*==================== Обновление элементов на холсте =================*/
function updateElements()
{
	fullName = obj_system.firstName + " " + obj_system.lastName;
	arrPlayers[0].bestScore = Math.round(obj_system.best_score);
	if(windowFocus == true)
	{
		  VK.callMethod("scrollWindow", 0, 0);
	    //Стерание всего и вся на холсте
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	    //Изменение даных объектов
	    if(obj_system.move === true)
	    {
		    obj_plat.x = obj_plat.x - obj_system.speed;
	        obj_farm.x = obj_farm.x - (obj_system.speed/2);
	        obj_sky.x = obj_sky.x - (obj_system.speed/2);
			obj_fon.x = obj_fon.x - (obj_system.speed/5);
			
			obj_box1.x = obj_box1.x - obj_system.speed;
			obj_box1_2.x = obj_box1_2.x - obj_system.speed;
			obj_box2.x = obj_box2.x - obj_system.speed;
			obj_addCoin.x = obj_addCoin.x - obj_system.speed;
			
			obj_bullet.x = obj_bullet.x + obj_system.speed * 2;
			//moneyPlayer = obj_system.moneyPlayer;
		
	    }
		
		gamePosition = obj_system.gamePos;
		obj_system.playSongs = playAudio;
	
	    checkPositions();
		
		if(obj_system.checkEnd == false)
		{
			checkCollision();
		}
	
	
	    //Вырисовка изображений с новыми кординатами
	    drawImages(gamePosition);
	}
}


function checkPositions()
{
	if(obj_plat.x < -obj_system.width/2)
	{
		obj_plat.x = obj_plat.x + (obj_system.width/2);
	}
	if(obj_farm.x < -obj_system.width/2)
	{
		obj_farm.x = obj_farm.x + (obj_system.width/2);
	}
	if(obj_sky.x < -obj_system.width/2)
	{
		obj_sky.x = obj_sky.x + (obj_system.width/2);
	}
	if(obj_fon.x < -obj_system.width/2)
	{
		obj_fon.x = obj_fon.x + (obj_system.width/2);
	}
	
	if(obj_box1.x < -obj_system.boxSize)
	{
		randomBoxs(1);
	}
	if(obj_box2.x < -obj_system.boxSize)
	{
		randomBoxs(2);
	}
	if(obj_box1_2.x < -obj_system.boxSize)
	{
		randomBoxs(1.2);
	}
	if(obj_addCoin.x < -obj_system.boxSize)
	{
		randomBoxs(3);
	}
	
	if(obj_bullet.x >= WIDTH)
	{
		player.reload = true;
	}
}

var drawPre = false;
//Рисование на холсте.
function drawImages(type)
{
  if(windowFocus == true)
  {
	  
	  
	  if(type == "preLoad") {
		  var my_gradient=ctx.createLinearGradient(0,0,0,170);
          my_gradient.addColorStop(0,"#A7863A");
          my_gradient.addColorStop(1,"#BF9A42");
	      ctx.fillStyle = my_gradient;
	      ctx.fillRect(0, 0, WIDTH, HEIGHT);
	      ctx.fillStyle = "#FFFFFF";
	      ctx.font = "80px Lora";
	      ctx.fillText("Mere Games", WIDTH/2 - 210, HEIGHT/2 + 20);
		  
		  if(drawPre == false) {
		    audioGame.pause();
		    setTimeout(function () {
			    audioGame.play();
			    obj_system.gamePos = "main";
		    }, 2000);
		  }
		  drawPre = true;
	  }
	  
	  
	if(type == "main" || type == "ratingMenu")
	{
		ctx.drawImage(fonImage, obj_fon.x, obj_fon.y);
		ctx.drawImage(skyImage, obj_sky.x, obj_sky.y);
		ctx.drawImage(farmImage, obj_farm.x, obj_farm.y);
		ctx.drawImage(plat, obj_plat.x, obj_plat.y, obj_system.width, obj_plat.height);
		ctx.drawImage(iconFullscreen, obj_fullscreen.x, obj_fullscreen.y, obj_system.sizeSitings, obj_system.sizeSitings);
		ctx.drawImage(playerMenu1, 400, 381);
		
		selectPlayer--;
		if(overButton == true)
		{
			ctx.globalAlpha = 0.5;
		}
		if(buyPlayers[selectPlayer][0].buy == false) {
			selectPlayer++;
			if(selectPlayer == 1 && obj_system.moneyPlayer < 50) {
				ctx.globalAlpha = 0.5;
			}
			if(selectPlayer == 3 && obj_system.moneyPlayer < 100) {
				ctx.globalAlpha = 0.5;
			}
			selectPlayer--;
		}
		selectPlayer++;
		
		if(selectPlayer == 2 && buyPlayers[1][0].buy == true) {
		    ctx.drawImage(buttonPlay, obj_buttonPlay.x, obj_buttonPlay.y, obj_buttonPlay.width, obj_buttonPlay.height);
		}else if(selectPlayer == 1 && buyPlayers[0][0].buy == true) {
			ctx.drawImage(buttonPlay, obj_buttonPlay.x, obj_buttonPlay.y, obj_buttonPlay.width, obj_buttonPlay.height);
		}else if(selectPlayer == 3 && buyPlayers[2][0].buy == true) {
			ctx.drawImage(buttonPlay, obj_buttonPlay.x, obj_buttonPlay.y, obj_buttonPlay.width, obj_buttonPlay.height);
		}
		
		if(selectPlayer == 2 && buyPlayers[1][0].buy == true) {
		    ctx.drawImage(buttonPlay, obj_buttonPlay.x, obj_buttonPlay.y, obj_buttonPlay.width, obj_buttonPlay.height);
		}else if(selectPlayer == 1 && buyPlayers[0][0].buy == false) {
			ctx.drawImage(buyImg, obj_buttonPlay.x, obj_buttonPlay.y, obj_buttonPlay.width, obj_buttonPlay.height);
		}else if(selectPlayer == 3 && buyPlayers[2][0].buy == false) {
			ctx.drawImage(buyImg, obj_buttonPlay.x, obj_buttonPlay.y, obj_buttonPlay.width, obj_buttonPlay.height);
		}
		
		ctx.globalAlpha = 1;
		if(playAudio === true)
		{
			ctx.drawImage(iconAudio, obj_audio.x, obj_audio.y, obj_system.sizeSitings,obj_system.sizeSitings);
		}
		else
		{
			ctx.drawImage(iconNoAudio, obj_audio.x, obj_audio.y, obj_system.sizeSitings,obj_system.sizeSitings);
		}
		ctx.drawImage(borderPlayers, obj_border.x, obj_border.y, obj_border.width, obj_border.height);
        ctx.drawImage(borderPlayers, obj_border.x + obj_border.width + 20, obj_border.y, obj_border.width, obj_border.height);
        ctx.drawImage(borderPlayers, obj_border.x - obj_border.width - 20, obj_border.y, obj_border.width, obj_border.height);
		ctx.drawImage(playerMenu2, obj_border.x + 43, 130, 120, 120);
		ctx.drawImage(playerMenu1, obj_border.x - 180, 130, 120, 120);
		ctx.drawImage(playerMenu3, obj_border.x + 260, 130, 120, 120);
		
		if(buyPlayers[0][0].buy == false) {
		    nameImg = buyImg;
			ctx.drawImage(nameImg, obj_border.x - 220, 320, 200, 50);
		}else {
			nameImg = buyingImg;
			ctx.drawImage(nameImg, obj_border.x - 220, 320, 200, 50);
		}
		
		nameImg = buyingImg;
		ctx.drawImage(nameImg, obj_border.x, 320, 200, 50);
		
		if(buyPlayers[2][0].buy == false) { 
		    nameImg = buyImg;
		}
		ctx.drawImage(nameImg, obj_border.x + 220, 320, 200, 50);
		nameImg = buyingImg;
		
		
		ctx.fillStyle = "#ffffff";
		ctx.font = "19px Arial";
		ctx.fillText("Особенности:", obj_border.x + 40, 270);
		ctx.fillText("Особенности:", obj_border.x - 180, 270);
		ctx.fillText("Особенности:", obj_border.x + 260, 270);
		
		ctx.fillText("Нет", obj_border.x + 90, 295);
		ctx.fillText("+5 к скорости", obj_border.x - 180, 295);
		ctx.fillText("+5 доп. патронов", obj_border.x + 250, 295);
		
		
		if(overLeft == true)
		{
			ctx.globalAlpha = 0.6;
		}
		ctx.drawImage(leftButton, obj_left.x, obj_left.y, obj_system.sizeButtons, obj_system.sizeButtons);
		ctx.globalAlpha = 1;
		if(overRight == true)
		{
			ctx.globalAlpha = 0.6;
		}
		ctx.drawImage(rightButton, obj_right.x, obj_right.y, obj_system.sizeButtons, obj_system.sizeButtons);
		ctx.globalAlpha = 1;
		ctx.drawImage(iconCoin, 828, 3, 24, 28);
		
	}
	else if(type == "game" || type == "gameOver" || type == "rating")
	{
		ctx.drawImage(fonImage, obj_fon.x, obj_fon.y);
		ctx.drawImage(skyImage, obj_sky.x, obj_sky.y);
		ctx.drawImage(farmImage, obj_farm.x, obj_farm.y);
		ctx.drawImage(plat, obj_plat.x, obj_plat.y, obj_system.width, obj_plat.height);
		ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
		ctx.drawImage(iconCoin, 828, 3, 24, 28);
		
		//Приграды
		ctx.drawImage(block_box1, obj_box1.x, player.con_y + 10, obj_system.boxSize, obj_system.boxSize);
		ctx.drawImage(block_box2, obj_box2.x, player.con_y + 10, obj_system.boxSize, obj_system.boxSize);
		ctx.drawImage(block_box1, obj_box1_2.x, player.con_y + 10, obj_system.boxSize, obj_system.boxSize);
		ctx.drawImage(addCoin, obj_addCoin.x, player.con_y + 15, obj_addCoin.width, obj_addCoin.height);
		
		ctx.drawImage(bulletImg, obj_bullet.x, obj_bullet.y, 17, 6);
		
		//Зарание рисует текст
		ctx.font = "25px Arial";
		ctx.fillStyle = "#E2B552";
		if(obj_system.moneyPlayer <= 9)
		{
			ctx.fillText(obj_system.moneyPlayer, 812, 26);
		}
		else if(obj_system.moneyPlayer <= 99)
		{
			ctx.fillText(obj_system.moneyPlayer, 798, 26);
		}
		else if(obj_system.moneyPlayer <= 999)
		{
			ctx.fillText(obj_system.moneyPlayer, 784, 26);
		}
		else
		{
			ctx.fillText(obj_system.moneyPlayer, 770, 26);
		}
		
		ctx.fillText(Math.round(obj_system.scorePlayer) + "м", 6, 23);
		ctx.textAlign = "right";
		ctx.fillText(obj_system.numBullets, 400, 23);
		ctx.textAlign = "left";
		ctx.drawImage(bulletIcon, 395, 0);
		
		//Туториат
		if(viewTutorial == true)
		{
			ctx.fillStyle = "#000000";
			ctx.globalAlpha = 0.6;
			ctx.fillRect(0,0, 854, 480);
			ctx.globalAlpha = 1;
			ctx.drawImage(keyboardTut, 100, 50);
		}
		
		if(obj_system.gameOver == true && viewRating == false)
		{
			ctx.fillStyle = "#000000";
			ctx.globalAlpha = 0.6;
			ctx.fillRect(0,0, 854, 480);
			ctx.globalAlpha = 1;
			ctx.drawImage(gameOverImg, 250, 50);
			if(overHome == true)
			{
				ctx.globalAlpha = 0.6;
			}
			else{
				ctx.globalAlpha = 1;
			}
			ctx.drawImage(homeButton, obj_home.x, obj_home.y, obj_system.sizeButtons, obj_system.sizeButtons);
			ctx.globalAlpha = 1;
			
			if(overRating == true)
			{
				ctx.globalAlpha = 0.6;
			}
			else{
				ctx.globalAlpha = 1;
			}
			ctx.drawImage(ratingButton, obj_rating.x, obj_rating.y, obj_system.sizeButtons, obj_system.sizeButtons);
			ctx.globalAlpha = 1;
			
			if(overReload == true)
			{
				ctx.globalAlpha = 0.6;
			}
			else{
				ctx.globalAlpha = 1;
			}
			ctx.drawImage(reloadButton, obj_reload.x, obj_reload.y, obj_system.sizeButtons, obj_system.sizeButtons);
			ctx.globalAlpha = 1;
		}
		if(viewRating == true)
		{
			ratingPlayersAi();
		}
	}
	
  }
	
}

function drawTexts(type)
{
  if(windowFocus == true && gamePosition != "preLoad")
  {
	/*ctx.fillStyle = "#000000";
	ctx.font = "13px Arial";
	ctx.fillText(obj_system.version, 3, 475);*/
	
	if(type == "main" || type == "ratingMenu")
	{
		ctx.font = "37px Arial";
		ctx.fillStyle = "#ffffff";
		
		if(buyPlayers[0][0].buy == true) {
		    ctx.fillText("Куплено", obj_border.x - 190, 357);
		}
		else {
			ctx.fillText("50", obj_border.x - 135, 357);
		}
		
		if(buyPlayers[1][0].buy == true) {
		    ctx.fillText("Куплено", obj_border.x + 30, 357);
		}
		
		if(buyPlayers[2][0].buy == true) {
		    ctx.fillText("Куплено", obj_border.x + 250, 357);
		}else {
			ctx.fillText("100", obj_border.x + 295, 357);
		}
		
		selectPlayer--;
		if(overButton == true)
		{
			ctx.globalAlpha = 0.5;
		}
		if(buyPlayers[selectPlayer][0].buy == false) {
			selectPlayer++;
			if(selectPlayer == 1 && obj_system.moneyPlayer < 50) {
				ctx.globalAlpha = 0.5;
			}
			if(selectPlayer == 3 && obj_system.moneyPlayer < 100) {
				ctx.globalAlpha = 0.5;
			}
			selectPlayer--;
		}
		selectPlayer++;
		
		if(selectPlayer == 2 && buyPlayers[1][0].buy == true) {
		    ctx.fillText("Играть", canvas.width/2 - 55, 438);
		}else if(selectPlayer == 1 && buyPlayers[0][0].buy == true) {
			ctx.fillText("Играть", canvas.width/2 - 55, 438);
		}else if(selectPlayer == 3 && buyPlayers[2][0].buy == true) {
			ctx.fillText("Играть", canvas.width/2 - 55, 438);
		}
		
		if(selectPlayer == 2 && buyPlayers[1][0].buy == false) {
		    ctx.fillText("Купить", canvas.width/2 - 55, 438);
		}else if(selectPlayer == 1 && buyPlayers[0][0].buy == false) {
			ctx.fillText("Купить", canvas.width/2 - 55, 438);
		}else if(selectPlayer == 3 && buyPlayers[2][0].buy == false) {
			ctx.fillText("Купить", canvas.width/2 - 55, 438);
		}
		
		ctx.fillStyle = "#000000";
		ctx.globalAlpha = 1;
		
		ctx.font = "26px Arial";
		ctx.fillStyle = "#ffffff";
		ctx.fillText("Цыпленок Цыпа", obj_border.x, 140);
		ctx.fillText("Кот Тимур", obj_border.x - 180, 140);
		ctx.fillText("Овца Филя", obj_border.x + 250, 140);
		
		
		//moneyPlayer = obj_system.moneyPlayer;
		
		ctx.font = "25px Arial";
		ctx.fillStyle = "#E2B552";
		if(obj_system.moneyPlayer <= 9)
		{
			ctx.fillText(obj_system.moneyPlayer, 812, 26);
		}
		else if(obj_system.moneyPlayer <= 99)
		{
			ctx.fillText(obj_system.moneyPlayer, 798, 26);
		}
		else if(obj_system.moneyPlayer <= 999)
		{
			ctx.fillText(obj_system.moneyPlayer, 784, 26);
		}
		else
		{
			ctx.fillText(obj_system.moneyPlayer, 770, 26);
		}
		
		ctx.fillStyle = "#fdfаа0";
		ctx.fillText("Лучшее расстояние:\n" + Math.round(obj_system.best_score) + "м", 300, 40);
		
		if(viewRating == true)
		{
			ratingPlayersAi();
		}
	}
	else if(type == "game" || type == "gameOver")
	{
		if(viewTutorial == true)
		{
			
			ctx.font = "30px Arial";
		    ctx.fillStyle = "#ffffff";
		    ctx.fillText("Прыгать", 470, 350);
			ctx.fillText("Стрелять", 70, 380);
			
			ctx.font = "25px Arial"; 
			ctx.fillText("Нажмите на пробел, чтобы начать", 200, 430);
		}
		
		if(obj_system.gameOver == true)
		{
			
			ctx.font = "26px Arial";
		    ctx.fillStyle = "#ffffff";
			ctx.fillText("Врезание!", 380, 100);
		    ctx.fillText("Текушие расстояние:\n" + Math.round(obj_system.scorePlayer) + "м", 300, 160);
			ctx.fillText("Лучшее расстояние:\n" + Math.round(obj_system.best_score) + "м", 300, 250);
			
		}
	}
	else if(type == "rating")
	{
		ratingPlayersAi();
	}
	
  }
}

//После клика даные x, y отправляются сюда
function clickEvent(x, y)
{
	if(obj_system.gamePos == "ratingMenu" && startGame == true) {
		if(x >= obj_back.x && x <= obj_back.x + obj_back.width && y >= obj_back.y && y <= obj_back.y + obj_back.height)
		{
			obj_system.gamePos = "main";
			viewRating = false;
			
			console.log(obj_system.gamePos);
		}
	}
	
	if(gamePosition == "main" && startGame == true)
	{
	  console.log("Клик! x: " + x + " y: " + y);
	
	  if(x >= obj_fullscreen.x && x <= obj_fullscreen.x + obj_system.sizeSitings && y >= obj_fullscreen.y && y <= obj_fullscreen.y + obj_system.sizeSitings)
	  {
		  obj_system.gamePos = "ratingMenu";
		  viewRating = true;
	  }
	  else if(x >= obj_audio.x && x <= obj_audio.x + obj_system.sizeSitings && y >= obj_audio.y && y <= obj_audio.y + obj_system.sizeSitings)
	  {
		  if(playAudio === true)
		  {
			  playAudio = false;
			  audioGame.pause();
		  }
		  else
		  {
			  playAudio = true;
			  audioGame.play();
		  }
	  }
	  else if(x >= obj_buttonPlay.x && x <= obj_buttonPlay.x + obj_buttonPlay.width && y >= obj_buttonPlay.y && y <= obj_buttonPlay.y + obj_buttonPlay.height)
	  {
		  selectPlayer--;
		  if(buyPlayers[selectPlayer][0].buy == true) {
			  selectPlayer++;
		      gamePosition = "game";
		      obj_system.gamePos = gamePosition;
		      console.log("Go to Game");
		      obj_system.move = false;
		      obj_system.checkEnd = false;
		      viewTutorial = true;
		  
		      obj_box1.x = -obj_system.boxSize;
		      obj_box1_2.x = -obj_system.boxSize;
		      obj_box2.x = -obj_system.boxSize;
		      obj_system.scorePlayer = 0;
		      obj_system.speed = 2;
		      obj_system.numBullets = 5;
			  if(selectPlayer == 3) {obj_system.numBullets = 10};
		
		      main();
			  
		  }else {
			  selectPlayer++;
			  buyPlayersSystem();
		  }
	  }
	  
	  else if(x >= obj_left.x && x <= obj_left.x + obj_system.sizeButtons && y >= obj_left.y && y <= obj_left.y + obj_system.sizeButtons)
	  {
		  if(selectPlayer > 1)
		  {
			  selectPlayer -= 1;
		  }
		  moveBorderPlayers('left');
	  }
	  else if(x >= obj_right.x && x <= obj_right.x + obj_system.sizeButtons && y >= obj_right.y && y <= obj_right.y + obj_system.sizeButtons)
	  {
		  if(selectPlayer < 3)
		  {
			  selectPlayer += 1;
		  }
		  moveBorderPlayers('right');
	  }
	}
	else if(gamePosition == "gameOver" && startGame == true && obj_system.gameOver == true)
	{
		if(x >= obj_home.x && x <= obj_home.x + obj_system.sizeButtons && y >= obj_home.y && y <= obj_home.y + obj_system.sizeButtons)
		{
			obj_system.gameOver = false;
			obj_system.gamePos = "main";
			obj_system.move = true;
			console.log(obj_system.gamePos);
			
			obj_system.speed = 2;
			obj_system.numBullets = 5;
			if(selectPlayer == 3) {obj_system.numBullets = 10};
			
			randomScores();
		}
		
		if(x >= obj_rating.x && x <= obj_rating.x + obj_system.sizeButtons && y >= obj_rating.y && y <= obj_rating.y + obj_system.sizeButtons)
		{
			obj_system.gamePos = "rating";
			viewRating = true;
			
			randomScores();
			
			
			console.log(obj_system.gamePos);
		}
		
		if(x >= obj_reload.x && x <= obj_reload.x + obj_system.sizeButtons && y >= obj_reload.y && y <= obj_reload.y + obj_system.sizeButtons)
		{
			gamePosition = "game";
		  obj_system.gamePos = gamePosition;
		  obj_system.move = false;
		  obj_system.checkEnd = false;
		  viewTutorial = true;
		  obj_system.gameOver = false;
		  
		  randomScores();
		  
		  
		  console.log("reload");
		  
		  obj_box1.x = -obj_system.boxSize;
		  obj_box1_2.x = -obj_system.boxSize;
		  obj_box2.x = -obj_system.boxSize;
		  obj_system.scorePlayer = 0;
		  obj_system.speed = 2;
		  obj_system.numBullets = 5;
		  if(selectPlayer == 3) {obj_system.numBullets = 10};
		
		  main();
		}
	}
	else if(gamePosition == "rating")
	{
		if(x >= obj_back.x && x <= obj_back.x + obj_back.width && y >= obj_back.y && y <= obj_back.y + obj_back.height)
		{
			obj_system.gamePos = "gameOver";
			viewRating = false;
			
			console.log(obj_system.gamePos);
		}
	}
}

//Наведение курсора мыши
function overEvent(x, y)
{
	if(x >= obj_buttonPlay.x && x <= obj_buttonPlay.x + obj_buttonPlay.width && y >= obj_buttonPlay.y && y <= obj_buttonPlay.y + obj_buttonPlay.height && gamePosition == "main")
	{
		overButton = true;
	}
	else
	{
		overButton = false;
	}
	
	if(x >= obj_home.x && x <= obj_home.x + obj_system.sizeButtons && y >= obj_home.y && y <= obj_home.y + obj_system.sizeButtons)
	{
		overHome = true;
	}
	else
	{
		overHome = false;
	}
	
	if(x >= obj_rating.x && x <= obj_rating.x + obj_system.sizeButtons && y >= obj_rating.y && y <= obj_rating.y + obj_system.sizeButtons)
	{
		overRating = true;
	}
	else
	{
		overRating = false;
	}
	
	if(x >= obj_reload.x && x <= obj_reload.x + obj_system.sizeButtons && y >= obj_reload.y && y <= obj_reload.y + obj_system.sizeButtons)
	{
		overReload = true;
	}
	else
	{
		overReload = false;
	}
	if(x >= obj_back.x && x <= obj_back.x + obj_back.width && y >= obj_back.y && y <= obj_back.y + obj_back.height)
	{
		overBack = true;
	}
	else
	{
		overBack = false;
	}
	if(x >= obj_left.x && x <= obj_left.x + obj_system.sizeButtons && y >= obj_left.y && y <= obj_left.y + obj_system.sizeButtons && gamePosition == "main")
	{
		overLeft = true;
	}
	else
	{
		overLeft = false;
	}
	if(x >= obj_right.x && x <= obj_right.x + obj_system.sizeButtons && y >= obj_right.y && y <= obj_right.y + obj_system.sizeButtons && gamePosition == "main")
	{
		overRight = true;
	}
	else
	{
		overRight = false;
	}
}

//Нажатие клавиш
function keyStates(code)
{
	if(gamePosition == "game" && startGame == true)
	{
	  if(code == SPASE_KEY)
	  {
		  up();
		  if(viewTutorial == true)
		  {
			  viewTutorial = false;
			  obj_system.move = true;
			  
		  }
		  else if(viewTutorial == false && gamePosition == "game")
		  {
			  player.jump();
		  }
	  }
	  if(code == CTRL_KEY)
	  {
		  if(viewTutorial == false && gamePosition == "game")
		  {
			  player.shoort();
		  }
	  }
	}
}


loadingGame();
setInterval(saveGame, 500);
//Сохранение
function saveGame()
{
	localStorage.setItem("best_score", obj_system.best_score);
	localStorage.setItem("money_player", obj_system.moneyPlayer);
	
	var JSONsave = JSON.stringify(buyPlayers);
	localStorage.setItem("buy_players", JSONsave);
}

//Загрузка
function loadingGame()
{
	obj_system.best_score = Math.round(localStorage.getItem("best_score"));
	if(obj_system.best_score == null)
	{
		obj_system.best_score = 0;
	}
	
	obj_system.moneyPlayer = +localStorage.getItem("money_player");
}

function checkLoad() {
	if(localStorage.getItem("buy_players")  != null) {
		return true;
	}else {
		return false;
	}
}

var checkPositionRat = false;
var lengthArr = arrPlayers.length;
var heightRat = 150;
var pos = 1;
function ratingPlayersAi() {
	arrPlayers[0].name = fullName;
	ctx.fillStyle = "#000000";
	ctx.globalAlpha = 0.6;
	ctx.fillRect(0,0, 854, 480);
	ctx.globalAlpha = 1;
	ctx.drawImage(gameOverImg, 250, 50);
	if(overBack == false)
	{
		ctx.globalAlpha = 1;
	}
	else
	{
		ctx.globalAlpha = 0.6;
	}
	ctx.drawImage(backButton, obj_back.x, obj_back.y);
	ctx.globalAlpha = 1;
	
	
	ctx.fillStyle = '#fff';
	ctx.font = "27px Arial";
	ctx.fillText("Рейтинг с ИИ", WIDTH/2 - 40, HEIGHT/2 - 155);
	
	if(checkPositionRat == false) {
	for(var k = 0; k < lengthArr; k++) {
		for(var p = 0; p < lengthArr; p++) {
			if(arrPlayers[k].bestScore > arrPlayers[p].bestScore) {
				if(arrPlayers[k].position != 1) {
					arrPlayers[k].position -= 1;
				}
				arrPlayers[p].position += 1;
				if(arrPlayers[p].position > 7) {
					arrPlayers[p].position = 7;
				}
			}
		}
	  }
	  
	  for(var k = 0; k < lengthArr; k++) {
		  for(var p = 0; p < lengthArr; p++) {
			  if(arrPlayers[k].position == arrPlayers[p].position && arrPlayers[k].name != arrPlayers[p].name) {
					if(arrPlayers[k].bestScore > arrPlayers[p].bestScore) {
				        arrPlayers[p].position += 1;
				        if(arrPlayers[p].position > 7) {
					        arrPlayers[p].position = 7;
				      }
					}else {
						arrPlayers[p].position -= 1;
						if(arrPlayers[p].position <= 0) {
							arrPlayers[p].position = 1;
						}
					}
				}
		  }
	  }
	  
	  checkPositionRat = true;
	  console.log(arrPlayers);
	}
	
  if(checkPositionRat == true) {
	for(var i = 0; i < lengthArr; i++) {
		pos = arrPlayers[i].position;
		
		if(pos == 1) {
			heightRat = 140;
		}else if(pos == 2) {
			heightRat = 180;
		}else if(pos == 3) {
			heightRat = 220;
		}else if(pos == 4) {
			heightRat = 260;
		}else if(pos == 5) {
			heightRat = 300;
		}else if(pos == 6) {
			heightRat = 340;
		}else if(pos == 7) {
			heightRat = 380;
		}
		
		if(arrPlayers[i].name == fullName) {
			ctx.fillStyle = "#86BA36";
		}else {
			ctx.fillStyle = "#FFF";
		}
		ctx.fillText(pos + "." + arrPlayers[i].name + " - " + arrPlayers[i].bestScore + "м", WIDTH/2 - 170, heightRat);
	}
  }
}

function moveBorderPlayers(der)
{
	if(gamePosition == "main")
	{
		if(der == 'left' && selectPlayer == 3)
		{
			playerImg.src = "img/player3.png";
			var interBorder = setInterval(function() {
				if(obj_border.x < 548)
				{
					obj_border.x += speedBorder;
				}
				else
				{
					obj_border.x = 548;
					clearInterval(interBorder);
				}
			}, 1);
		}else if(der == 'left' && selectPlayer == 2)
		{
			playerImg.src = "img/player2.png";
			var interBorder = setInterval(function() {
				if(obj_border.x < 327)
				{
					obj_border.x += speedBorder;
				}
				else
				{
					obj_border.x = 327;
					clearInterval(interBorder);
				}
			}, 1);
		}
		else if(der == 'left' && selectPlayer == 1)
		{
			playerImg.src = "img/player.png";
			var interBorder = setInterval(function() {
				if(obj_border.x < 548)
				{
					obj_border.x += speedBorder;
				}
				else
				{
					obj_border.x = 548;
					clearInterval(interBorder);
				}
			}, 1);
		}
		else if(der == 'right' && selectPlayer == 3)
		{
			playerImg.src = "img/player3.png";
			var interBorder = setInterval(function() {
				if(obj_border.x > 108)
				{
					obj_border.x -= speedBorder;
				}
				else
				{
					obj_border.x = 108;
					clearInterval(interBorder);
				}
			}, 1);
		}
		else if(der == 'right' && selectPlayer == 2)
		{
			playerImg.src = "img/player2.png";
			var interBorder = setInterval(function() {
				if(obj_border.x > 327)
				{
					obj_border.x -= speedBorder;
				}
				else
				{
					obj_border.x = 327;
					clearInterval(interBorder);
				}
			}, 1);
		}
	}
}

function randomScores() {
	var firstRandom = Math.round(Math.random(1));
	if(firstRandom == 1) {
		var randScor = Math.round(Math.random() * 50);
		var randPl = Math.round(Math.random() * 6);
		arrPlayers[randPl].bestScore += randScor;
		
		checkPositionRat = false;
	}
}

function buyPlayersSystem() {
	if(selectPlayer == 1) {
		if(obj_system.moneyPlayer >= 50) {
			selectPlayer--;
			obj_system.moneyPlayer -= 50;
			buyPlayers[selectPlayer][0].buy = true;
			selectPlayer+=1;
		}
	}else if(selectPlayer == 3) {
		      if(obj_system.moneyPlayer >= 100) {
			      selectPlayer--;
				  obj_system.moneyPlayer -= 100;
			      buyPlayers[selectPlayer][0].buy = true;
				  selectPlayer+=1;
	}
}
}

//Проверка на фокус страницы
window.onblur =  function() {
    audioGame.pause();
	windowFocus = false;
	console.log("No focus");
}
window.onfocus = function() {
	if(playAudio == true && gamePosition != "preLoad")
	{
	    audioGame.play();
	}
	else if(playAudio == false &&gamePosition != "preLoad"){
		audioGame.pause();
	}
	windowFocus = true;
	console.log("Focus!");
}

var t;
function up() {
  var top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
  if(top > 0) {
    window.scrollBy(0,-100);
    t = setTimeout('up()',20);
  } else clearTimeout(t);
  return false;
}

function clearSaves() {
	setInterval(function () {
		window.localStorage.clear();
	}, 1000/60);
}
//clearSaves();



//Если возникла ошибка в коде
window.onerror = function(msg, url, linenumber) {
    console.log('Ошибка: '+msg+'\nURL: '+url+'\nЛиния: '+linenumber);
    return false;
}

    document.addEventListener("DOMContentLoaded", main);