import promiseNoData from "../views/promiseNoData.js";
import SearchResultsView from "../views/searchResultsView.js";
import SearchFormView from "../views/searchFormView.js"
const knownTypes=["starter", "main course", "dessert"];
export default
function Search(props){
  function clickACB(){
    props.model.doSearch();
  }
  function searchACB(input){
    props.model.setSearchQuery(input);
  }
  function choicesACB(input){
    props.model.setSearchType(input);
  }
  function chooseDishACB(dish){
    props.model.setCurrentDish(dish.id);
  }
  if(!props.model.searchResultsPromiseState.promise){
    props.model.doSearch({query:"foo", type:"bar"});
  }
  return(
          <div>
                <SearchFormView dishTypeOptions={knownTypes} click={clickACB} search={searchACB} choiceChangeACB={choicesACB}/>
                {promiseNoData(props.model.searchResultsPromiseState) || <SearchResultsView searchResults={props.model.searchResultsPromiseState.data} chooseDish={chooseDishACB}/>}
          </div>);
}
