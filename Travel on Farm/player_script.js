//Сценарий игрока
//Его передвижения, прыжки, стрельба и т.д.
var filesPlayer = 0;

var bulletImg = new Image();
bulletImg.src = "img/bullet.png";
bulletImg.onload = function()
{
	console.log("Файл 'bulletImg' загружен");
	filesPlayer++;
}
var bulletIcon = new Image();
bulletIcon.src = "img/bullet_icon.png";
bulletIcon.onload = function()
{
	console.log("Файл 'bulletIcon' загружен");
	filesPlayer++;
}

var jumpSong = new Audio("media/powerup_1.ogg");
jumpSong.loop = false;

var player = {
	x: 400,
	y: 381,
	con_y: 381,
	bonus: 0,
	
	jump_end: true,
	reload: true,
	
	width: 60,
	height: 60,
	
	jump: function () {
		if(this.jump_end == true && obj_system.move == true)
		{
			console.log("Прыжок");
			this.jump_end = false;
			if(obj_system.playSongs == true)
			{
				jumpSong.play();
			}
			
			//Прыжок игрока
			var upPlayer = setInterval(function() {
				if(obj_system.gravity > 0)
				{
					if(obj_system.gravity > 0)
					{
						obj_system.gravity -= obj_system.SPEED_GRAVITY;
					}
					if(obj_system.gravity < 0)
					{
						player.y -= obj_system.MAX_GRAVITY - obj_system.MAX_GRAVITY;
					}
					else
					{
						player.y -= obj_system.gravity;
					}
				}
				else
				{
					clearInterval(upPlayer);
					var downPlayer = setInterval(function() {
						if(obj_system.gravity < obj_system.MAX_GRAVITY)
						{
							obj_system.gravity += obj_system.SPEED_GRAVITY;
							if(obj_system.gravity > obj_system.MAX_GRAVITY)
							{
								player.y += obj_system.MAX_GRAVITY;
							}
							else
							{
								player.y += obj_system.gravity;
							}
							
							if(player.y > player.con_y)
							{
								player.y = player.con_y;
							}
						}
						else
						{
							player.jump_end = true;
							clearInterval(downPlayer);
						}
					}, 1);
				}
			}, 1);
		}
	},
	
	//Игрок стреляет
	shoort: function () {
		if(this.reload == true && obj_system.numBullets > 0)
		{
			obj_system.numBullets -= 1;
			
			var shoortSong = new Audio("media/laser_shoot1.m4a");
			shoortSong.loop = false;
			if(obj_system.playSongs == true)
			{
				shoortSong.play();
			}
			
			this.reload = false;
			
			console.log("Shoort!");
			
			obj_bullet.x = player.x + player.width;
			obj_bullet.y = player.y + 40;
			
		}
	}
	
}


console.log("'player_script.js' загружен.");