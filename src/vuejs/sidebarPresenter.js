import SidebarView from "../views/sidebarView.js";

export default
function Sidebar(props){
    function numberChangeACB(nr){props.model.setNumberOfGuests(nr);}
    function removeDishACB(dish){props.model.removeFromMenu(dish,);}
    function setCurrentDishACB(dish){props.model.setCurrentDish(dish.id);}
    return <SidebarView number={props.model.numberOfGuests} onNumberChange={numberChangeACB} dishes={props.model.dishes} setCurrentDish={setCurrentDishACB} onRemove={removeDishACB}/>;
}