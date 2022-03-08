//searchPresenter.js React file
import SearchFormView from "../views/searchFormView.js"
import SearchResultsView from "../views/searchResultsView.js"
import promiseNoData from "../views/promiseNoData.js"
import { knownTypes } from "../utilities"
import { searchDishes } from "../dishSource.js"
import React from "react"
import {useState, useEffect} from 'react'

//export default
function Search(props){ //React state hook, i.e. React Steteful Component

    //declare constants to be used
    const [promise, setPromise] = React.userStatus(); //rerendering and initializing of component state as empty Object for clickButtonACB
    const [qr, setSearchQuery] = React.userStatus(""); //rerendering and initializing of component state for clickButtonACB
    const [ty, setSearchType] = React.userStatus(""); //rerendering and initializing of component state for clickButtonACB
    const [data, setData] = Reacy.userStatus([]); //rerendering and initializing of component state for clickButtonACB
    const [err, setError] = React.userStatus([]); //rerendering and initializing of component state for clickButtonACB


    function wasCreatedACB(){
        setPromise(searchDishes({})); //query: setSearchQuery, type: setSearchQuery
        //promise.then(setData).catch(setError)
    }
    React.useEffect(wasCreatedACB, []);

    function promiseIsChangedACB(){

        props.model.setData(null);
        prop.model.setError(null);
        let itIsCanceled = false;

        function changedBackACB(){
            itIsCanceled = true;
        }

        function savingDataACB(data){
            if(!itIsCanceled)
                setData(data);
        }

        function savingErrorACB(error){
            if(!itIsCanceled)
                setError(error);
        }

        if(promise)
            promise.then(savingDataACB).catch(savingErrorACB);
        return changedBackACB;

        console.log(payload);
    }
    React.useEffect(promiseIsChangedACB, [promise]);

    function clickButtonACB(){ //search on click button
        setPromise(searchDishes({query: query, type: type}));
        //props.model.doSearch(props.model.searchParams);
    }

    function inputOnChangeACB(qr){ //to look up for a specific dish when inputing a string (1st element)
        setSearchQuery(qr); //setter for query
    }

    function setTypeOnSearchACB(ty){ //set choices from the TypeDish menu
        setSearchType(ty); //setter for type
    }

    function changeDishOnClickACB(dish){ //to look up for another specific dish when inputing a string (1st element)
        //console.log("inside changeDishOnClickACB");
        props.model.setCurrentDish(dish.id);
    }

    /*if(!props.model.searchResultsPromiseState.promise) {props.model.doSearch({promise: "foo",
          data: "bar"});}*/
    //<SearchResultsView searchResults = {data} onChangeDish={changeDishOnClickACB}/>}
    return (<div>
                <SearchFormView dishTypeOptions={knownTypes} onSearch={clickButtonACB} inputOnChange={inputOnChangeACB} typeOnChange={setTypeOnSearchACB} />
                {promiseNoData({promise: promise, data: data, err: error}) || <SearchResultsView searchResults={data} chooseDish={chooseDishACB}/>}
            </div>
    );
}

export default Search;