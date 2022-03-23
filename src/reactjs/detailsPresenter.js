//detailsPresenter.js React
import DinnerModel from "../DinnerModel.js"
import DetailsView from "../views/detailsView.js"
import promiseNoData from "../views/promiseNoData.js"
import {isDishInMenu} from "../utilities.js"

export default
function Details(props){

	const [, setNumberOfGuests] = React.useState();
	const [, setDishes] = React.useState();
	const [, setData] = React.useState();
	const [, setPromise] = React.useState();
	const [, setError] = React.useState();

	function observerACB() {
		setNumberOfGuests(props.model.numberOfGuests);
		setDishes(props.model.dishes);
		setData(props.model.currentDishPromiseState.data);
		setPromise(props.model.currentDishPromiseState.promise);
		setError(props.model.currentDishPromiseState.error);
	}

	function observerItWasCreatedACB(){
		observerACB();
		props.model.addObserver(observerACB); //add the observer to the model

		return function isPutDownACB(){ //function to be called if we want to remove the observer
			props.model.removeObserver(observerACB);
		}
	}
    React.useEffect(observerItWasCreatedACB, []); //allows functional components to have lifecycle methods in one single API

	function sameidCB(dishToCompare){
		return props.model.currentDish === dishToCompare.id;
	}

	function addToMenuACB(){
		props.model.addToMenu(props.model.currentDishPromiseState.data);
	}

	return promiseNoData(props.model.currentDishPromiseState) || <DetailsView dishData={props.model.currentDishPromiseState.data} //dishData, isDIshInMenu and guests are props
		   isDishInMenu={isDishInMenu(props.model.dishes, props.model.currentDish)} guests={props.model.numberOfGuests} onAddToMenu={addToMenuACB} /> //addToMenu is a custom event
}