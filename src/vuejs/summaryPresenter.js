import SummaryView from "../views/searchFormView.js";
import { shoppingList } from "../utilities"
export default
function Summary(props){
    return <SummaryView people={props.model.numberOfGuests} ingredients={shoppingList(props.model.dishes) /* empty array for starters */}/>;
}
