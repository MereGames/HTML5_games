//@ Buldings for Big War: The origin of the war

var preBuild = {
	x: 0,
	y: 0,
	empty: false
};

var buildings = [
    {name: "army", price: 700, select: false, radius: 64*3, time: 70, faer: false, reload: 0, ataca: 0, health: 340, addRes: {name: "noen", num: 0}},
    {name: "factory_1", price: 660, select: false, radius: 64*3, time: 0, faer: false, reload: 0, ataca: 0, health: 230, addRes: {name: "money", num: 26}},
    {name: "touer", price: 1540, select: false, radius: 64*3, time: 0, faer: true, reload: 60, ataca: 45, health: 550, addRes: {name: "none", num: 0}},
    {name: "armyHard", price: 1860, select: false, radius: 64*3, time: 120, faer: false, reload: 0, ataca: 0, health: 480, addRes: {name: "noee", num: 0}},
    {name: "armyFast", price: 1200, select: false, radius: 64*3, time: 90, faer: false, reload: 60, ataca: 0, health: 360, addRes: {name: "none", num: 0}},
    {name: "healthReg", price: 5000, select: false, radius: 64*3, time: 0, faer: false, reload: 0, ataca: 0, health: 450, addRes: {name: "health", num: 3}},
    {name: "armyTwo", price: 6200, select: false, radius: 64*3, time: 160, faer: false, reload: 0, ataca: 0, health: 860, addRes: {name: "noen", num: 0}},
    {name: "factory_2", price: 1640, select: false, radius: 64*3, time: 0, faer: false, reload: 0, ataca: 0, health: 610, addRes: {name: "money", num: 52}},
    {name: "touer2", price: 4500, select: false, radius: 64*3, time: 0, faer: true, reload: 70, ataca: 95, health: 1200, addRes: {name: "none", num: 0}}
];
