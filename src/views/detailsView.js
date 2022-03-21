//detailsView.js file
import {menuPrice, dishType, sortDishes} from "../utilities.js"
import {treatHTTPResponseACB, transformResultACB, getDishDetails, searchDishes} from "../dishSource.js"


function DetailsView(props) {

	function clickAddToMenuCB(dish){
		return props.onAddToMenu(dish);
	}

	function clickRemoveFromMenuCB(dish){
		return props.searchDishes(dish);
	}

	function listIngredientsCB(item){
		return <p>{item.name}: {item.amount} {item.unit}</p>;
	}
	//? true : false
	return( 
		<div>
	    	<div class="detailsRow">
	    		<div class="detailsColumn">
		    		<span><h1>{props.dishData.title}</h1></span>
			    		<div>
			                <button type="button" onClick={clickAddToMenuCB} disabled={props.isDishInMenu}>Add to menu</button>
			    		</div>
		    			<tr>
			    			<th><img src={props.dishData.image} height="100"></img></th>
			    			<table class="border">
				    			<tr>
						    		<th>Price: {props.dishData.pricePerServing}</th>
					    			<th>for {props.guests} guests: {((props.dishData.pricePerServing)*(props.guests)).toFixed(2)}</th>
				    			</tr>
			    			</table>
		    			</tr>
		    			<tr>
		    			</tr>
		    		<table class="border">
		    			<span>{props.dishData.extendedIngredients.map(listIngredientsCB)}</span>
		    		</table>
		    		<tr>
	    			</tr>
		    		<table class="border">
		    			<span >{props.dishData.instructions}</span>
	    			</table>
					<p><a href={props.dishData.sourceUrl}>More information</a></p>

	    		</div>    		
			</div>
		</div>
	);
}

export default DetailsView;

	

