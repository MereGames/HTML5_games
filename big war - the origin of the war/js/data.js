//@ Data baze for Big War: The origin of the war
//@ Data for link in main.js

//Loading game status
var loadingGame = [
    {loadMain: false},
    {loadMenu: false}
];

var gameSave = false;

//Data game
var gameConfig = [
    {position: "logo", pre_position: "none", endLoad: "menu", leng: "en"},
    {name: "Big War", fullName: "Big War: The origin of the war", version: "0.0.5"}
];

//Leng
var tranTexts = [
    //Russian
    {
    	ru: [
    	       {name: "company", tran: "Компания"},
               {name: "settings", tran: "Настройки"},
               {name: "mapEditor", tran: "Редактор карт"},
               {name: "freeGame", tran: "Свободная игра"},
               {name: "author", tran: "Авторы"},
               {name: "cross", tran: ""},
               {name: "leftLeng", tran: ""},
               {name: "rightLeng", tran: ""},
               {name: "on", tran: ""},
               {name: "off", tran: ""},
               {name: "back", tran: "Назад"},
               {name: "menu", tran: "Меню"},
               {name: "settings_menu", tran: "Настройки"},
               {name: "on", tran: ""},
               {name: "off", tran: ""},
               {name: "on", tran: ""},
               {name: "saveMap", tran: "Сохр. карту"},
               {name: "deleteMaps", tran: "Удалить карты"}
            ]
    },
    //Englend
    {
    	en: [
    		   {name: "company", tran: "Company"},
    		   {name: "settings", tran: "Sittings"},
    		   {name: "mapEditor", tran: "Map editor"},
    		   {name: "freeGame", tran: "Free game"},
    		   {name: "author", tran: "Authors"},
    		   {name: "cross", tran: ""},
    		   {name: "leftLeng", tran: ""},
               {name: "rightLeng", tran: ""},
               {name: "on", tran: ""},
               {name: "off", tran: ""},
               {name: "back", tran: "Back"},
               {name: "menu", tran: "Menu"},
               {name: "settings_menu", tran: "Sittings"},
               {name: "on", tran: ""},
               {name: "off", tran: ""},
               {name: "on", tran: ""},
               {name: "saveMap", tran: "Save map"},
               {name: "deleteMaps", tran: "Delete maps"}
    		]
    }
];

//Arrays for Iames
var menuImages = [];
var bordersInfo = [];
var buildImages = [];
var buttonImages = [];
var groundImages = [];
var objectImages = [];
var objectImagesEnemy = [];
var boomImages = [];
var otherImages = [];


//Prop for objsGame ------------- ----------- ------------
var objsProp = {
	//Player
	player: {
		robot: {
			reload: 55,
			speed: 1,
			ataca: 12,
			health: 70,
			price: 50
		},

		tank: {
			reload: 70,
			speed: 2,
			ataca: 17,
			health: 120,
			price: 80
		},

		tank_hard: {
			reload: 80,
			speed: 1,
			ataca: 33,
			health: 256,
			price: 150
		},

		tank_fast: {
			reload: 15,
			speed: 4,
			ataca: 6,
			health: 30,
			price: 100
		},

		tank_two: {
			reload: 80,
			speed: 2,
			ataca: 45,
			health: 500,
			price: 350
		}
	},

	//Enemy
	enemy: {
		tank_enemy: {
			reload: 70,
			speed: 2,
			ataca: 16,
			health: 125
		},
    tankHard_enemy: {
      reload: 250,
      speed: 1,
      ataca: 110,
      health: 260
    }
	}
};
