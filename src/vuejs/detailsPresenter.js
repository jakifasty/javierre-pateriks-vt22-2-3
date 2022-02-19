//detailsPresenter.js file
import DinnerModel from "C:/Users/borja/javierre-pateriks-vt22-2_3/src/DinnerModel.js"
import DetailsView from "../views/detailsView.js";
import promiseNoData from "C:/Users/borja/javierre-pateriks-vt22-2_3/src/views/promiseNoData.js"

export default
function Details(props){

	function sameidCB(dishToCompare) { //this is a CB function
		if(props.model.currentDish === dishToCompare.id) 
			return true;
		else
			return false;
	}

	function isDishInMenu(dishes, dish_id){
  		function hasSameIdCB(dish){
    		return dish.id === dish_id;
	      // TODO return true if the id property of dish isDishEqualCB _different_ from the dishToRemove's id property
	      // This will keep the dish when we filter below.
	      // That is, we will not keep the dish that has the same id as dishToRemove (if any)
  		}
  		return 0 < dishes.filter(hasSameIdCB).length;
	}

	function addToMenuACB(){
		props.model.addToMenu(props.model.currentDishPromiseState.data);
	}

	return (promiseNoData(props.model.currentDishPromiseState) || <DetailsView dishData={props.model.currentDishPromiseState.data} //dishData, isDIshInMenu and guests are props
			isDishInMenu={isDishInMenu(props.model.dishes, props.model.currentDish)} guests={props.model.numberOfGuests} onAddToMenu={addToMenuACB}/>) //addToMenu is a custom event
}
