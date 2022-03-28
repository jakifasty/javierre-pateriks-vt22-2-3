//firebaseModel.js file
import firebaseConfig from '/src/firebaseConfig.js';
import DinnerModel from "./DinnerModel.js"
import { getDishDetails } from './dishSource.js';

firebase.initializeApp(firebaseConfig);

//REF is the “root” Firebase path. NN is your TW2_TW3 group number
const REF="dinnerModel35";

firebase.database().ref(REF+"/test").set("dummy");


function updateFirebaseFromModel(model) { //Model --> Persistance

	function observerACB(payload) {

		if(payload){

			if(payload.numberOfGuests){
				firebase.database().ref(REF+"/numberOfGuests").set(payload.numberOfGuests);
			}
			if(payload.setDishes){
				firebase.database().ref(REF+"/setDishes").set(payload.setDish); //or "setCurrentDish"
			}
			if(payload.addDish && payload.addDish.id){
				firebase.database().ref(REF+"/menuDishes/"+payload.addDish.id).set(payload.addDish);
			}
			if(payload.removeDish && payload.removeDish.id){
				firebase.database().ref(REF+"/menuDishes/"+payload.removeDish.id).set(payload.removeDish);
			}
		}	
		//console.log(payload);
	}
	model.addObserver(observerACB);
}

function updateModelFromFirebase(model) { //Persistance --> Model

	firebase.database().ref(REF+"/numberOfGuests").on("value",
		function guestsChangedInFirebaseACB(firebaseData){ 
			model.setNumberOfGuests(firebaseData.val());
		});

	firebase.database().ref(REF+"/setDishes").on("value", //or "setCurrentDish"
		function cdChangedInFirebaseACB(firebaseData) {
			model.setDishes(firebaseData.val());
		});

	firebase.database(REF+"/menuDishes").then("child_added", //or "on"
		function dishesChangedInFirebaseACB(firebaseData){
			function hasSameIdCB(dish) {
				return firebaseData.key === dish.id;
			}
			let hasDish = [];
			hasDish = model.dishes.filter(hasSameIdCB);
			if(hasDish.length == 0){
				getDishDetails(+firebaseData.key).then(function addToMenuACB(dish){model.addToMenu(dish)})
			}
			//model.addToMenu(dish.val());
		}
	);
	firebase.database().ref(REF+"/menuDishes").on("child_removed",
		function dishesChangedInFirebaseACB(argument) {
			model.removeFromMenu(+firebaseData.key);
		});
}

/*fetchDishDataBasedOnID(REF+"/menuDishes/"+model.payload.removeDish.id).on("child_removed",
		function dishesAddedInFirebaseACB(dish){
			model.removeFromMenu(dish.val());
		});*/
	

function firebaseModelPromise() { //initial persistaence promise
	function makeBigPromiseACB(firebaseData){
		function createModelACB(dishes) {
			let numberOfGuests = firebaseData.val().numberOfGuests? firebaseData.val().numberOfGuests : 1;
			return new DinnerModel(numberOfGuests, dishes);
		}
		function makeDishPromiseACB(dishID) {
			return getDishDetails(dishId);
		}
		const dishPromiseArray = Object.keys(firebaseData.val().menuDishes).map(makeDishPromiseCB);
		return Promise.all(dishPromiseArray).then(createModelACB)
	}
	return firebase.database().ref(REF).once("value").then(makeBigPromiseACB);
}

export {updateFirebaseFromModel, updateModelFromFirebase, firebaseModelPromise};