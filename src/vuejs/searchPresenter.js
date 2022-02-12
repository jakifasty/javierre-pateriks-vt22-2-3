import promiseNoData from "../views/promiseNoData.js";
import SearchResultsView from "../views/searchResultsView.js";
import SearchFormView from "../views/searchFormView.js"
import {knownTypes} from "../utilities.js"
export default
function Search(props){
  function clickACB(){
    props.model.doSearch();
  }
  function searchACB(input){
    props.model.setSearchQuery(input);
  }
  function choiceACB(input){
    props.model.setSearchType(knownTypes[input]);
  }
  function chooseDishACB(dish){
    props.model.addToMenu(dish);
  }
  if(!props.model.searchResultsPromiseState.promise){
    props.model.doSearch({query:"foo", type:"bar"});
  }
  return(
          <div>
                <SearchFormView dishTypeOptions={knownTypes} click={clickACB} search={searchACB} choice={choiceACB}/>
                {promiseNoData(props.model.searchResultsPromiseState) || <SearchResultsView searchResults={props.model.searchResultsPromiseState.data} chooseDish={chooseDishACB}/>}
          </div>);
}
