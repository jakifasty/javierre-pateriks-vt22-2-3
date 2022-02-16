//searchPresenter.js file
import SearchFormView from "../views/searchFormView.js";
import SearchResultsView from "../views/searchResultsView.js";
import promiseNoData from "../views/promiseNoData.js"
import { shoppingList, knownTypes } from "../utilities"
import {searchDishes} from "../dishSource.js"


export default
function Search(props){

    function inputOnChangeACB(inputString){
        props.model.setSearchQuery(inputString);
        console.log(inputString);
    }

    function setTypeOnSearchACB(event){ //set search text
        props.model.setSearchType(knownTypes[2]);
        //console.log("hall");
    }

    function onClickButtonACB(){ //search on click
        props.model.doSearch();
    }

    function changeDishOnClickACB(name){ //set search text
        props.model.setCurrentDish(name);
    }


    if(!props.model.searchResultsPromiseState) props.doSearch({query: "foo", type: "bar"});
    return <div>
                <SearchFormView inputOnChange ={inputOnChangeACB} typeOnChange={setTypeOnSearchACB} onClick= {onClickButtonACB} 
                dishTypeOptions={knownTypes}/>
                {promiseNoData(props.model.searchResultsPromiseState) || 
                <SearchResultsView searchResults = {props.searchResultsPromiseState.data} onChangeDish={changeDishOnClickACB}/>}
            </div>
           
}