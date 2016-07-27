//@ Save Data in Big War: The origin of the war

var dataForSave = [];

var saveGame = setInterval(function () {
	localStorage.setItem("save_main", JSON.stringify(dataForSave));
}, timeSave);

var updateData = setInterval(function () {
	dataForSave = [
        {leng: gameConfig[0].leng}
    ];
}, 100);