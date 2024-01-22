// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')

let machine = {
	water: 400,
	oatMilk: 540,
	coffeeBeans: 120,
	disposableCups: 9,
	money: 550,
}

let espressoResources = {
	water: 250,
	oatMilk: 0,
	coffeeBeans: 16,
	disposableCups: 1,
	money: 4,
}

let latteResources = {
	water: 350,
	oatMilk: 75,
	coffeeBeans: 20,
	disposableCups: 1,
	money: 7,
}

let cappuccinoResources = {
	water: 200,
	oatMilk: 100,
	coffeeBeans: 12,
	disposableCups: 1,
	money: 6,
}

function readCoffeeMachineStatus() {
	console.log("The coffee machine has:");
	console.log(machine.water + " ml of water");
	console.log(machine.oatMilk + " ml of oat milk");
	console.log(machine.coffeeBeans + " g of coffee beans");
	console.log(machine.disposableCups + " disposable cups")
	console.log("\$" + machine.money + " of money");
}

function canMakeCoffee(requiredResources) {
	return machine.water >= requiredResources.water &&
		   machine.oatMilk >= requiredResources.oatMilk &&
		   machine.coffeeBeans >= requiredResources.coffeeBeans &&
		   machine.disposableCups >= requiredResources.disposableCups;
}

function makeCoffee(requiredResources) {
	machine.water -= requiredResources.water;
	machine.oatMilk -= requiredResources.oatMilk;
	machine.coffeeBeans -= requiredResources.coffeeBeans;
	machine.disposableCups -= requiredResources.disposableCups;
	machine.money += requiredResources.money;
}

function missingResourcesNotification(requiredResources) {
	if (machine.water < requiredResources.water) {
		console.log("Sorry, not enough water!");
	}
	if (machine.oatMilk < requiredResources.oatMilk) {
		console.log("Sorry, not enough oat milk!");
	}
	if (machine.coffeeBeans < requiredResources.coffeeBeans) {
		console.log("Sorry, not enough coffee beans!");
	}
	if (machine.disposableCups < requiredResources.disposableCups) {
		console.log("Sorry, not enough disposable cups!");
	}
	return;
}

while(true) {
	console.log();
	let action = input("Write action (buy, fill, take, remaining, exit):");

	if (action == "buy") {
		let coffeeChoice = input("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu:");
		if (coffeeChoice == 1) {
			if (canMakeCoffee(espressoResources)) {
				console.log("I have enough resources, making you a coffee!");
				makeCoffee(espressoResources);
			} else {
				missingResourcesNotification(espressoResources);
			}
		} else if (coffeeChoice == 2) {
			if (canMakeCoffee(latteResources)) {
				console.log("I have enough resources, making you a coffee!");
				makeCoffee(latteResources);
			} else {
				missingResourcesNotification(latteResources);
			}
		} else if (coffeeChoice == 3) {
			if (canMakeCoffee(cappuccinoResources)) {
				console.log("I have enough resources, making you a coffee!");
				makeCoffee(cappuccinoResources);
			} else {
				missingResourcesNotification(cappuccinoResources);
			}
		} else if (coffeeChoice == "back") {
			continue;
		}
	} else if (action == "fill") {
		machine.water += parseInt(input("Write how many ml of water you want to add:"));
		machine.oatMilk += parseInt(input("Write how many ml of oat milk you want to add:"));
		machine.coffeeBeans += parseInt(input("Write how many grams of coffee beans you want to add:"));
		machine.disposableCups += parseInt(input("Write how many disposable cups you want to add:"));
	} else if (action == "take") {
		console.log("I gave you \$" + machine.money);
		machine.money = 0;
	} else if (action == "remaining") {
		console.log("\n");
		readCoffeeMachineStatus();
	} else if (action == "exit") {
		break;
	}
}
