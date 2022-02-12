function SearchResultsView(props){
  function listCB(dish){
    let url="https://spoonacular.com/recipeImages/"+dish.image;
    return <span onClickCapture={function(event){props.chooseDish(dish)}} class="searchResults">
              <img height="100" src={url}></img>
              <div class="center">
              {dish.title}
              </div>
            </span>;
  }
  return (
          <div>
            {props.searchResults.map(listCB)}
          </div>
  );
}
export default SearchResultsView;
