//searchPresenter.js file
import SearchFormView from "../views/searchFormView.js";
import SearchResultsView from "../views/searchResultsView.js";
import promiseNoData from "../views/promiseNoData.js"
import { shoppingList, knownTypes } from "../utilities.js"
import {searchDishes} from "../dishSource.js"


export default
function Search(props){

    function clickButtonACB(){ //search on click button
        props.model.doSearch(props.model.searchParams);
    }

    function inputOnChangeACB(inputString){ //to look up for a specific dish when inputing a string (1st element)
        props.model.setSearchQuery(inputString);
        //console.log(value)
    }

    function setTypeOnSearchACB(value){ //set choices from the TypeDish menu
        //console.log("HERE DEBUG")
        //console.log(value);
        //console.log(knownTypes[value]);
        props.model.setSearchType(value);
    }

    function changeDishOnClickACB(dish){ //to look up for another specific dish when inputing a string (1st element)
        //console.log(dish);
        props.model.setCurrentDish(dish.id);
    }


    if(!props.model.searchResultsPromiseState.promise) {props.model.doSearch({});}
    return (<div>
                <SearchFormView dishTypeOptions={knownTypes} onSearch={clickButtonACB} inputOnChange={inputOnChangeACB} typeOnChange={setTypeOnSearchACB} />
                {promiseNoData(props.model.searchResultsPromiseState) || <SearchResultsView searchResults = {props.model.searchResultsPromiseState.data} onChangeDish={changeDishOnClickACB}/>}
            </div>
    );
}