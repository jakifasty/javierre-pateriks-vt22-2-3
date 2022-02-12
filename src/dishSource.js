import {BASE_URL, API_KEY} from "./apiConfig"
function treatHTTPResponseACB(response){
   /*TODO throw if the HTTP response is not 200, otherwise return response.json()*/
   if(response.status !== 200){
     throw new Error (response.status);
   }else{
     return response.json();
   }

}

function transformResultsACB(data){
  return data.results;
}


function getDishDetails(dish_id) {
  let API_SERVER = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";
  let endpoint = "recipes/"+dish_id+"/information";
  let params = new URLSearchParams({});
  return fetch(BASE_URL+endpoint, {  // object literal
              "method": "GET",              // HTTP method
              "headers": {                  // HTTP headers, also object literal
  		     "X-Mashape-Key": API_KEY,
           "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
           } // end of headers object
  	}/* end of second fetch parameter, object */
  )
        .then(treatHTTPResponseACB)   ;

}

function searchDishes(query) {
  let API_SERVER = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";
  let endpoint = "recipes/search?";
  let params = new URLSearchParams(query);
  return fetch(BASE_URL+endpoint+params, {  // object literal
              "method": "GET",              // HTTP method
              "headers": {
            "content-type": "application/json",                // HTTP headers, also object literal
  		      "X-Mashape-Key": API_KEY,
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
           } // end of headers object
  	}/* end of second fetch parameter, object */
  )
        .then(treatHTTPResponseACB).then(transformResultsACB)   ;

}
export {getDishDetails, searchDishes};
