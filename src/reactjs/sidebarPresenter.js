//sidebarPresenter.js React
import SidebarView from "../views/sidebarView.js"

export default
function Sidebar(props){
	const [, setNumberOfGuests] = React.useState(null); //allows functional components to have state, like this.state in class components.
	const [, setDishes] = React.useState(null); 

	function observerACB(){
		setNumberOfGuests(props.model.numberOfGuests);
		setDishes(props.model.dishes);
	}

    function observerItWasCreatedACB(){
    	observerACB(); //create Object and set props
		props.model.addObserver(observerACB); //add the observer to the model

		return function isPutDownACB(){ //function to be called when removing the observer
			props.model.removeObserver(observerACB);
		}
    }
    React.useEffect(observerItWasCreatedACB, []); //allows functional components to have lifecycle methods in one single API

    function numberChangeACB(nr){
    	props.model.setNumberOfGuests(nr);
    }
    function removeDishACB(dish){
    	props.model.removeFromMenu(dish);
    }
    function setCurrentDishACB(dish){
    	props.model.setCurrentDish(dish.id);
    }

    return <SidebarView number={props.model.numberOfGuests} onNumberChange={numberChangeACB} 
            dishes={props.model.dishes} onCurrentDish={setCurrentDishACB} onRemove={removeDishACB}/>;

}