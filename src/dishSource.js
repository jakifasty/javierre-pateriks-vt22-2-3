//dishSource.js file
import {BASE_URL, API_KEY} from "./apiConfig.js"

function treatHTTPResponseACB(response){ 
	   	/*TODO throw if the HTTP response is not 200, otherwise return response.json()*/
		function throwExplanationACB(data){
			throw new Error("API error "+ response.status +" "+ data);
		}
		if(!response.ok)
			throw new response.text().then(throwExplanationACB); //.then() represents a promise
		return response.json();
}

function transformResultACB(params){
		//console.log(params);
	return params.results;
}

function getDishDetails(id){ //taken from GET Get Recipe Information

	const endpoint = 'recipes/' + id + '/information';
	return fetch(BASE_URL + endpoint, {
		"method": "GET",
		"headers":  {
			'X-Mashape-Key': API_KEY,
			"x-rapidapi-url": BASE_URL,
		}}).then(treatHTTPResponseACB);
}

function searchDishes(params){ //taken from GET Search Recipes
	const endpoint = 'recipes/search?'; //if I need to get the key from json to string, use a for 
	return fetch(BASE_URL + endpoint + new URLSearchParams(params), {
		"method": "GET", //HTTP method
		"headers": { //HTTP headers
			'X-Mashape-Key': API_KEY,
			"x-rapidapi-url": BASE_URL,
		}}).then(treatHTTPResponseACB).then(transformResultACB);
}

/*function myAPICall(apiParams){
	const API_ROOT = 'https://rapidapi.com/'; //this is the server adress
	//const apiParams = 

	function getMyAPICall(argument) {
		return fetch();
	}

	function updateMyAPICall(argument) {
		return 
	}

	return fetch(API_ROOT + apiParams); 
	// again, no catch, we let the caller of myAPICall catch and treat the error
}*/

export {getDishDetails, searchDishes};