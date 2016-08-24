/**
*
* @ Copyryght Mere Games 2016
* @ support@meregames.ru
* @ Mail - meregames@mail.ru
*
**/


var saveData = [];
var stringData = "";

setInterval(function () {
	//Player data
	var dataPlayer = {
		health: mainPlayer.health,
		maxHealth: mainPlayer.maxHealth,
		engMana: mainPlayer.engMana,
	    maxEngMana: mainPlayer.maxEngMana,
	    superMana: mainPlayer.superMana,
	    maxSuperMana: mainPlayer.maxSuperMana,

		defent: mainPlayer.defent,
		dameg: mainPlayer.dameg,
		skilDmg: mainPlayer.skilDmg,
		speed: mainPlayer.speed,
		name: mainPlayer.name,
		activ: mainPlayer.activ
	}

	//save
	saveData = [dataPlayer];
	stringData = OOP.toString(saveData);
}, saveTime);

