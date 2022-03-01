import { menuPrice, dishType, sortDishes} from "../utilities"

function sidebarView(props){
    return (
            <div>
                <table>
                  <tr>
                    <td>
                    Number of guests
                    </td>
                    <td width="10px">
                    </td>
                    <td>
                      <button type="button" onClick={function clickACB(event){props.onNumberChange(props.number-1)}} disabled={props.number<=1? true : false}>-</button>
                      <span title="nr guests">{props.number}</span>
                      <button type="button" onClick={function clickACB(event){props.onNumberChange(props.number+1)}}>+</button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Total cost:
                    </td>
                    <td width="10px">
                    </td>
                    <td class="right">
                      {(menuPrice(props.dishes)*props.number).toFixed(2)}
                    </td>
                  </tr>
                </table>
                {renderDishes(props.setCurrentDish, props.onRemove, props.dishes, props.number)}
            </div>
    );
}


function renderDishes(setDish, onRemove, dishes, number){
    function dishesTableRowCB(dish){
        return     <tr key={ /* TODO what's a key? */dish.id}>
                    <td>
                      <button onClickCapture= {function clickACB(e){onRemove(dish);}}>x</button>
                    </td>
                    <td onClickCapture={function clickACB(e){setDish(dish);}}>
                      <a href="#details">{dish.title}</a>
                    </td>
                    <td>
                      {dishType(dish)}
                    </td>
                    <td class="right">
                      {(dish.pricePerServing*number).toFixed(2)}
                    </td>
                  </tr>
    }
    return <table>
        <tbody>
          {  //  <---- we are in JSX, with this curly brace, we go back to JavaScript
             sortDishes(dishes).map(dishesTableRowCB/*TODO send callback here */)
             // TODO sort the ingredients. Import the needed function from utilities.js
          }
        </tbody>
        </table>;
}

export default sidebarView;
