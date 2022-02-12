import DetailsView from "../views/detailsView.js";
import promiseNoData from "../views/promiseNoData.js";
import {isDishInMenu} from "../utilities.js"
export default
function Details(props){
    function addToMenueACB(){props.model.addToMenu(props.model.currentDishPromiseState.data);}
    return (promiseNoData(props.model.currentDishPromiseState) || <DetailsView guests={props.model.numberOfGuests} dishData={props.model.currentDishPromiseState.data} isDishInMenu={isDishInMenu(props.model.dishes, props.model.currentDish)} addToMenu={addToMenueACB}/>);
}
