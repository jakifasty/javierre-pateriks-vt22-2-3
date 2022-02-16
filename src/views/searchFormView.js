//searchFormView.js file
//Component SearchFormView
import {menuPrice, dishType, sortDishes} from "../utilities"
import {treatHTTPResponseACB, transformResultACB, getDishDetails, searchDishes} from "../dishSource.js"

function SearchFormView(props) {

	function dishOptions2JSX_CB(option, index){ return <option value={index}>{option}</option>; }

	return (
			<div class="debug">
				<input onchange={function (event){props.inputOnChange(this.value)}} placeholder={"Input what you want..."}></input>
				<select onChange={props.typeOnChange}>
					<option>
						Choose:
					</option>
						{props.dishTypeOptions.map(dishOptions2JSX_CB)}
				</select> 
				<button onClick = {props.onSearch}>Search!</button>
			</div>
	);
}

export default SearchFormView;