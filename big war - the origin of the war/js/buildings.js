//@ Buldings for Big War: The origin of the war

var preBuild = {
	x: 0,
	y: 0,
	empty: false
};

var buildings = [
    {name: "army", price: 700, select: false, radius: 64*3, time: 70, faer: false, reload: 0, ataca: 0, health: 340, addRes: {name: "noen", num: 0}},
    {name: "factory_1", price: 660, select: false, radius: 64*3, time: 0, faer: false, reload: 0, ataca: 0, health: 150, addRes: {name: "money", num: 16}},
    {name: "touer", price: 1540, select: false, radius: 64*3, time: 0, faer: true, reload: 60, ataca: 45, health: 520, addRes: {name: "none", num: 0}},
    {name: "armyHard", price: 1860, select: false, radius: 64*3, time: 120, faer: false, reload: 0, ataca: 0, health: 480, addRes: {name: "noee", num: 0}},
    {name: "armyFast", price: 1200, select: false, radius: 64*3, time: 90, faer: false, reload: 60, ataca: 0, health: 360, addRes: {name: "none", num: 0}},
    {name: "healthReg", price: 5000, select: false, radius: 64*3, time: 0, faer: false, reload: 0, ataca: 0, health: 450, addRes: {name: "health", num: 5}},
    {name: "armyTwo", price: 3000, select: false, radius: 64*3, time: 140, faer: false, reload: 0, ataca: 0, health: 560, addRes: {name: "noen", num: 0}}
];
