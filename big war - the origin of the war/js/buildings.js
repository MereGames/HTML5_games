//@ Buldings for Big War: The origin of the war

var preBuild = {
	x: 0,
	y: 0,
	empty: false
};

var buildings = [
    {name: "army", price: 500, select: false, radius: 64*3, time: 100, faer: false, reload: 0, ataca: 0, health: 120, addRes: {name: "noen", num: 0}},
    {name: "factory_1", price: 1000, select: false, radius: 64*3, time: 0, faer: false, reload: 0, ataca: 0, health: 150, addRes: {name: "money", num: 43}},
    {name: "touer", price: 3000, select: false, radius: 64*3, time: 0, faer: true, reload: 40, ataca: 50, health: 200, addRes: {name: "none", num: 0}}
];
