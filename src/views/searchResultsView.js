function SearchResultsView(props){
  function listCB(dish){
    let url="https://spoonacular.com/recipeImages/"+dish.image;
    return <span key={dish.id} className="searchResults" onClickCapture={function(event){props.chooseDish(dish); window.location.hash="details"}}>
              <img height="200" src={url}></img>
              <div className="center">
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
