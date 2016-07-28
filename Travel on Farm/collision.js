//Скрипт для столкновени с объктами(с игроком)
//Просто необходим для комфортной игры...

var filesLoad = 0;

var boomSong = new Audio("media/explosion1.ogg");
boomSong.loop = false;

var coinSong = new Audio("media/pickup_coin1.ogg");
coinSong.loop = false;

//Загрузка...
var block_box1 = new Image(),
block_box2 = new Image();

block_box1.src = "img/block_1.png";
block_box1.onload = function() {
	filesLoad++;
	console.log("Файл 'block_box1' загружен.");
}

block_box2.src = "img/block_2.png";
block_box2.onload = function() {
	filesLoad++;
	console.log("Файл 'block_box2' загружен.");
}

addCoin = new Image();
addCoin.src = "img/coin.png";
addCoin.onload = function()
{
	console.log("Файл 'addCoin' загружен.");
}

//Случейные координаты
function randomBoxs(number) {
	if(obj_system.gamePos == "game")
    {
		console.log("random");
		
		if(number == 1)
		{
	        obj_box1.x = Math.round(Math.random() * 500 + 854 + obj_system.boxSize);
		}
		if(number == 2)
		{
	        obj_box2.x = Math.round(Math.random() * 500 + 1708 + obj_system.boxSize);
		}
		if(number == 1.2)
		{
	        obj_box1_2.x = Math.round(Math.random() * 500 + 1908 + obj_system.boxSize);
		}
		if(number == 3)
		{
	        obj_addCoin.x = Math.round(Math.random() * 500 + 2608 + obj_system.boxSize);
		}
    }

}

//Соприкосновение
function checkCollision()
{
	if(player.x + player.width >= obj_box1.x && player.x + player.width <= obj_box1.x + obj_system.boxSize + player.width)
	{
		if(player.y + player.height >= player.con_y + obj_system.boxSize)
		{	
			gameOver();
			obj_system.checkEnd = true;
			
			if(obj_system.playSongs == true)
            {
				boomSong.play();
			}
		}
	}
	
	if(player.x + player.width >= obj_box1_2.x && player.x + player.width <= obj_box1_2.x + obj_system.boxSize + player.width)
	{
		if(player.y + player.height >= player.con_y + obj_system.boxSize)
		{	
			gameOver();
			obj_system.checkEnd = true;
			
			if(obj_system.playSongs == true)
            {
				boomSong.play();
			}
		}
	}
	
	if(player.x + player.width >= obj_box2.x && player.x + player.width <= obj_box2.x + obj_system.boxSize + player.width)
	{
		if(player.y + player.height >= player.con_y + obj_system.boxSize)
		{	
			gameOver();
			obj_system.checkEnd = true;
			
			if(obj_system.playSongs == true)
            {
				boomSong.play();
			}
		}
	}
	
	if(player.x + player.width >= obj_addCoin.x && player.x + player.width <= obj_addCoin.x + obj_system.boxSize - 10)
	{
		if(player.y + player.height >= player.con_y + 15)
		{	
			obj_system.moneyPlayer += 1;
			randomBoxs(3);
			
			if(obj_system.playSongs == true)
            {
				coinSong.play();
			}
		}
	}
	
	if(obj_bullet.x >= obj_box1.x && obj_bullet.x <= obj_box1.x + obj_system.boxSize && obj_bullet.y >= player.con_y + 10)
	{
		obj_bullet.x = 854;
		obj_bullet.y = 0;
		randomBoxs(1);
		
		if(obj_system.playSongs == true)
        {
			boomSong.play();
		}
	}
	
	if(obj_bullet.x >= obj_box1_2.x && obj_bullet.x <= obj_box1_2.x + obj_system.boxSize && obj_bullet.y >= player.con_y + 10)
	{
		obj_bullet.x = 854;
		obj_bullet.y = 0;
		randomBoxs(1.2);
		
		if(obj_system.playSongs == true)
        {
			boomSong.play();
		}
	}
	
	if(obj_bullet.x >= obj_box2.x && obj_bullet.x <= obj_box2.x + obj_system.boxSize && obj_bullet.y >= player.con_y + 10)
	{
		obj_bullet.x = 854;
		obj_bullet.y = 0;
		randomBoxs(2);
		
		if(obj_system.playSongs == true)
        {
		    boomSong.play();
		}
	}
}

//Свод результатов
function gameOver()
{
	if(obj_system.scorePlayer > obj_system.best_score)
	{
		obj_system.best_score = obj_system.scorePlayer;
	}
	
	obj_system.move = false;
	obj_system.gameOver = true;
	obj_system.gamePos = "gameOver";
	
	saveGame();
}

console.log("'collision.js' загружен!");