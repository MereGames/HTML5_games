/**
*
* @ Copyryght Mere Games 2016
* @ support@meregames.ru
* @ Mail - meregames@mail.ru
*
**/


//Input text
var inputText = "Имя игрока (мин. 4)";

var textMsgObj = game.newTextObject({
	x: gameWidth/2, y: 60,
	size: 23,
	align: "center",
	font: "cursive",
	color: "red",
	text: ""
});

textMsgObj.setUserData({
	drawTXT: function (text) {
		this.text = text;
		this.align = "center";
		this.draw();
	}
});
