//searchResultsView.js file
//Component SearchFormView
window.location.hash="details"

function SearchResultsView(props){

	function chooseDishACB(event){
		console.log("DEBUG HERE")
		console.log(props.dish)
		props.chooseDish(props.dish);
		windows.location.hash="details";
	}

	function viewResultImages2JSX_CB(dish){
		return (<span key={dish.id} onClick={function(event){props.chooseDish(dish);}} className="searchResults"> 
					<img src={"https://spoonacular.com/recipeImages/" + dish.image} height="100"></img>
					<div class="left">
						{dish.title}
					</div>
				</span>
		);
	}

	return(
			<div>
				{props.searchResults.map(viewResultImages2JSX_CB)}
			</div>
			);
}

export default SearchResultsView;