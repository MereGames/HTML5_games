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

var playerData = {
	maney: 0,
	score: 0
};

//Arrays for Iames
var menuImages = [];
var buttonImages = [];
var groundImages = [];
var objectImages = [];
var otherImages = [];
