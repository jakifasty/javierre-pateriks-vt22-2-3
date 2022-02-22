//searchFormView.js file
//Component SearchFormView
import {menuPrice, dishType, sortDishes} from "../utilities"
import {treatHTTPResponseACB, transformResultACB, getDishDetails, searchDishes} from "../dishSource.js"

function SearchFormView(props) {

	function dishOptions2JSX_CB(option){ 
		return <option value={option}>{option}</option>; 
	}

	/*function clickButtonOnSearchCB(){
		return props.mode.onSearch();
			props.model.doSearch(props.model.searchParams);
			props.model.searchParams
	}*/

	return (
			<div class="debug">
				<div>
					<input onchange={function valueInputOnChnageACB(event){props.inputOnChange(event.target.value)}} placeholder={"Input what you want..."}></input>
					<select onchange={function valueTypeOnChangeACB(event){props.typeOnChange(event.target.value)}}>
						<option value="default">
							Choose:
						</option>
							{props.dishTypeOptions.map(dishOptions2JSX_CB)}
					</select> 
					<button onClick = {props.onSearch}>Search!</button>
				</div>
			</div>
	);
}

export default SearchFormView;