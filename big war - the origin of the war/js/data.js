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
               {name: "author", tran: "Автор"},
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
    		   {name: "author", tran: "Author"},
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
var otherImages = [];


//Prop for objsGame ------------- ----------- ------------
var objsProp = {
	//Player
	player: {
		robot: {
			reload: 35,
			speed: 1,
			ataca: 12,
			health: 55,
			price: 50
		},

		tank: {
			reload: 70,
			speed: 2,
			ataca: 17,
			health: 70,
			price: 75
		},

		tank_hard: {
			reload: 75,
			speed: 1,
			ataca: 20,
			health: 150,
			price: 150
		}
	},

	//Enemy
	enemy: {
		tank_enemy: {
			reload: 70,
			speed: 2,
			ataca: 16,
			health: 65
		}
	}
};
