import SidebarView from "../views/sidebarView.js";
export default
function Sidebar(props){
    const [, setGuests]=React.useState(null);
    const [, setDishes]=React.useState(null);

    function observerACB(){
      setGuests(props.model.numberOfGuests);
      setDishes(props.model.dishes);
    }
    function wasCreatedACB(){
      observerACB();
      props.model.addObserver(observerACB);
      return function isTakenDownACB(){props.model.removeObserver(observerACB);}
    }
    React.useEffect(wasCreatedACB, []);

    function numberChangeACB(nr){props.model.setNumberOfGuests(nr);}
    function removeDishACB(dish){props.model.removeFromMenu(dish);}
    function setCurrentDishACB(dish){props.model.setCurrentDish(dish.id);}

    return <SidebarView number={props.model.numberOfGuests}
                        onNumberChange={numberChangeACB}
                        dishes={props.model.dishes}
                        setCurrentDish={setCurrentDishACB}
                        onRemove={removeDishACB}/>;
}
