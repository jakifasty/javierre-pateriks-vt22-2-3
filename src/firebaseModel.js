//firebaseModel.js file
import firebaseConfig from '/src/firebaseConfig.js';
import DinnerModel from "./DinnerModel.js"
import { searchDishes, getDishDetails } from './dishSource.js';

firebase.initializeApp(firebaseConfig);

//REF is the “root” Firebase path. NN is your TW2_TW3 group number
const REF="dinnerModel35";

//firebase.database().ref(REF+"/test").set("dummy1"); //first dummy test

function updateFirebaseFromModel(model) { //Model --> Persistance

	function observerACB(payload) {

		if(payload){
			if(payload.numberOfGuests){
				firebase.database().ref(REF+"/numberOfGuests").set(payload.numberOfGuests);
			}
			if(payload.setCurrentDish){
				firebase.database().ref(REF+"/setCurrentDish").set(payload.setCurrentDish); //or "setCurrentDish"
			}
			/*console.log("payload 3 value 1")
			console.log(payload.dishToAdd)
			console.log("payload 3 value 2")
			console.log(payload.dishToAdd.id)*/
			if(payload.dishToAdd && payload.dishToAdd.id){
				//console.log("payload 3 EXISTS")
				//console.log(payload.dishToAdd)
				firebase.database().ref(REF+"/menuDishes/"+payload.dishToAdd.id).set(payload.dishToAdd);
			}

			/*console.log("payload 4 value 1")
			console.log(payload.removeDish)
			console.log("payload 4 value 2")
			console.log(payload.removeDish.id)*/
			if(payload.removeDish && payload.removeDish.id){
				//console.log("payload 4 EXISTS")
				firebase.database().ref(REF+"/menuDishes/"+payload.removeDish.id).set(null);
			}
		}
	}
	model.addObserver(observerACB);
}

function updateModelFromFirebase(model) { //Persistance --> Model

	firebase.database().ref(REF+"/numberOfGuests").on("value",
		function guestsChangedInFirebaseACB(firebaseData){ 
			//console.log("Inside guestsChangedInFirebaseACB")
			model.setNumberOfGuests(firebaseData.val());
		});

	firebase.database().ref(REF+"/setCurrentDish").on("value",
		function cdChangedInFirebaseACB(firebaseData) {
			model.setCurrentDish(firebaseData.val());
		});

	firebase.database().ref(REF+"/menuDishes").on("child_added", //or "on"
		function dishesChangedInFirebaseACB(firebaseData){
			//console.log("Inside menuDishes")
			function hasSameIdCB(dish) {
				return +firebaseData.key == dish.id;
			}
			let hasDish = [];
			hasDish = model.dishes.filter(hasSameIdCB);
			if(hasDish.length == 0){
				getDishDetails(+firebaseData.key).then(function addToMenuACB(dish){model.addToMenu(dish)})
			}
		}
	);
	firebase.database().ref(REF+"/menuDishes").on("child_removed",
		function dishesChangedInFirebaseACB(firebaseData) {
			//console.log("Inside menuDishes 2")
			model.removeFromMenu(+firebaseData.key);
		});
}	

function firebaseModelPromise() { //initial persistaence promise
	function bigPromiseToMakeACB(firebaseData){
		//console.log("Inside bigPromiseToMakeACB")
		function modelToCreateCB(dishes) {
			console.log("Inside modelToCreateCB")
			//console.log(numberOfGuests)
			//let numberOfGuests = firebaseData.val().numberOfGuests? firebaseData.val().numberOfGuests : 1;
			let numberOfGuests;
			try{
				numberOfGuests = firebaseData.val().numberOfGuests? firebaseData.val().numberOfGuests : 2;
			}catch(e){
				console.log(e)
			}
			return new DinnerModel(numberOfGuests, dishes);
		}
		function dishPromiseToMakeCB(dishId) {
			//console.log("Inside dishPromiseToMakeCB")
			return getDishDetails(dishId);
		}

		let mD = [];
		try{
			mD = firebaseData.val().menuDishes? firebaseData.val().menuDishes : [];
		}catch(e){
			console.log(e)
			//throw "not found value for firebaseData.";
		}
		const dishPromiseArray = Object.keys(mD).map(dishPromiseToMakeCB);
		return Promise.all(dishPromiseArray).then(modelToCreateCB);

		//console.log("firebaseData value:")
		//console.log(firebaseData.val())
		/*if(!firebaseData.val().menuDishes){
			const dishPromiseArray = Object.keys(firebaseData.val().menuDishes).map(dishPromiseToMakeACB);
			return Promise.all(dishPromiseArray).then(modelToCreateACB)
		}
		else{
			return new DinnerModel();
		}*/
		
	}
	return firebase.database().ref(REF).once("value").then(bigPromiseToMakeACB);
}

export {updateFirebaseFromModel, updateModelFromFirebase, firebaseModelPromise};