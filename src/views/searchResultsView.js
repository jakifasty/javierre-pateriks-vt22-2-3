//searchResultsView.js file
//Component SearchFormView

function SearchResultsView(props){

	function clickBubblesACB(event){
		console.log(event.target.value);
	}

	function viewResultImages2JSX_CB(dish){
		return (<span class="searchResults"> 
					<img src={"https://spoonacular.com/recipeImages/" + dish.image} height="100"  onClickCapture={props.onChangeDish}></img>
					<div>
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