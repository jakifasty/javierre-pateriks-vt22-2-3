import SummaryView from "../views/summaryView.js";
import { shoppingList } from "../utilities"
export default
function Summary(props){
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

  return <SummaryView people={props.model.numberOfGuests} ingredients={shoppingList(props.model.dishes) /* empty array for starters */}/>;
}
