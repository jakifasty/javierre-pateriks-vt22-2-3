//searchFormView.js file
//Component SearchFormView
import {menuPrice, dishType, sortDishes} from "../utilities"
import {treatHTTPResponseACB, transformResultACB, getDishDetails, searchDishes} from "../dishSource.js"

function SearchFormView(props) {

	function clickSearchACB(){
		props.searchDishes(props.name);
	}

	function dishOptions2JSX_CB(dishTypeOptions){ return <option>{dishTypeOptions}</option>; }      

	return (
			<div class="debug">
				<input placeholder={"Input what you want..."}></input>
				<select>
					<option>
						Choose:
					</option>
						{props.dishTypeOptions.map(dishOptions2JSX_CB)}
				</select> 
				<button onClick = {clickSearchACB}>Search!</button>
			</div>
	);
}

export default SearchFormView;