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

			/*if(payload.numberOfGuests){
				firebase.database().ref(REF+"/numberOfGuests").set(payload.numberOfGuests);
			}
			if(payload.setDishes){
				firebase.database().ref(REF+"/setDishes").set(payload.setDish);
			}
			if(payload.addDish && payload.addDish.id){
				firebase.database().ref(REF+"/menuDishes/"+payload.addDish.id).set(payload.addDish);
			}
			if(payload.removeDish && payload.removeDish.id){
				firebase.database().ref(REF+"/menuDishes/"+payload.removeDish.id).set(payload.removeDish);
			}*/
		}	
		console.log(payload);
	}
	//props.model.addObserver(observerACB);
}

/*function updateModelFromFirebase(argument) {
	// body...
}
	

	const [, setCurrentDishPromiseState] = React.useState();
	const [, setDishes] = React.useState();
	const [, setNumberOfGuests] = React.useState();

    const [promise, setPromise] = React.useState(); //rerendering and initializing undefined component state as empty Object for clickButtonACB
    const [qr, setSearchQuery] = React.useState(""); //rerendering and initializing of component state for clickButtonACB
    const [ty, setSearchType] = React.useState(""); //rerendering and initializing of component state for clickButtonACB
    const [data, setData] = React.useState([]); //rerendering and initializing of component state for clickButtonACB
    const [err, setError] = React.useState([]); //rerendering and initializing of component state for clickButtonACB

	function observerACB(payload) {
		setDishes()
	}

	//props.model.addObserver();ç
	observerACB();
	console.log(props.model.addObserver(observerACB));
	console.log(model);

}*/

export {updateFirebaseFromModel};