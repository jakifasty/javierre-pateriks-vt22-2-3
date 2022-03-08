//searchResultsView.js file
//Component SearchFormView

function SearchResultsView(props){

	function clickBubblesACB(event){
		console.log(event.target.value);
	}

	function viewResultImages2JSX_CB(dish){
		return (<span onClickCapture={function chooseDishACB(event){props.onChangeDish(dish)}} class="searchResults"> 
					<img src={"https://spoonacular.com/recipeImages/" + dish.image} height="100"  ></img>
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