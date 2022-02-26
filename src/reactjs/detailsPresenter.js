import DetailsView from "../views/detailsView.js";
import promiseNoData from "../views/promiseNoData.js";
import {isDishInMenu} from "../utilities.js"
export default
function Details(props){
    const [, setGuests]=React.useState(null);
    const [, setDishes]=React.useState(null);
    const [, setPromiseData]=React.useState(null);
    const [, setPromise]=React.useState(null);
    const [, setError]=React.useState(null);

    function observerACB(){
      setGuests(props.model.numberOfGuests);
      setDishes(props.model.dishes);
      setPromiseData(props.model.currentDishPromiseState.data)
      setPromise(props.model.currentDishPromiseState.promise)
      setPromise(props.model.currentDishPromiseState.error)
    }
    function wasCreatedACB(){
      observerACB();
      props.model.addObserver(observerACB);
      return function isTakenDownACB(){props.model.removeObserver(observerACB);}
    }

    React.useEffect(wasCreatedACB, []);

    function addToMenueACB(){props.model.addToMenu(props.model.currentDishPromiseState.data); window.location.hash = "search";}
    return (promiseNoData(props.model.currentDishPromiseState) || <DetailsView
    guests={props.model.numberOfGuests}
    dishData={props.model.currentDishPromiseState.data}
    isDishInMenu={isDishInMenu(props.model.dishes, props.model.currentDish)}
    addToMenu={addToMenueACB}/>);
}
