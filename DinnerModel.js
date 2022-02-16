/* This is an example of a JavaScript class.
   The Model keeps only abstract data and has no notions of graohics or interaction
*/
import resolvePromise from "./resolvePromise.js"
import {getDishDetails, searchDishes} from "./dishSource.js"

class DinnerModel{
    constructor(nrGuests=2, dishArray=[], currentDish){
        this.setNumberOfGuests(nrGuests);
        this.dishes= dishArray;
        this.currentDish = {}; //ADDED TESTING

        this.currentDishPromiseState = {};
        this.searchResultsPromiseState = {} ; //(property). DinnerModel constructor, set model properties to empty objects
        this.searchParams = {}; //(property). DinnerModel constructor, set model properties to empty objects
    }
    setNumberOfGuests(nr){
        if(Number.isInteger(nr) & nr>0){
          this.numberOfGuests = nr;
        }else{
          throw new Error ('number of guests not a positive integer');
        }
        // TODO throw an error if the argument is smaller than 1 or not an integer
        // the error message must be exactly "number of guests not a positive integer"
        // to check for integer: test at the console Number.isInteger(3.14)

        // TODO if the argument is a valid number of guests, store it in this.numberOfGuests

        // when this is done the TW1.1 DinnerModel "can set the number of guests" should pass
        // also "number of guests is a positive integer"
    }
    addToMenu(dishToAdd){
        // array spread syntax example. Make sure you understand the code below.
        // It sets this.dishes to a new array [   ] where we spread (...) the previous value
        this.dishes= [...this.dishes, dishToAdd];
    }

    removeFromMenu(dishToRemove){
        // callback exercise! Also return keyword exercise
        function hasSameIdCB(dish){
            return dishToRemove.id !== dish.id;
            // TODO return true if the id property of dish is _different_ from the dishToRemove's id property
            // This will keep the dish when we filter below.
            // That is, we will not keep the dish that has the same id as dishToRemove (if any)
        }
        this.dishes= this.dishes.filter(hasSameIdCB/*TODO pass the callback!*/);
        // the test "can remove dishes" should pass
    }
    /*
       ID of dish currently checked by the user.
       A strict MVC/MVP Model would not keep such data,
       but we take a more relaxed, "Application state" approach.
       So we store also abstract data that will influence the application status.
    */
    setCurrentDish(id){
        //console.log(currentDish)
        if((typeof(id) === "number") && (id !== null)  && (id !== this.currentDish)){
            
            resolvePromise(getDishDetails(id), this.currentDishPromiseState);
        }
        else
            this.currentDish = id;
        /*if((typeof(id) === "defined") && (id !== currentDish.id)){
            this.currentDishPromiseState = resolvePromise(searchDishes(this.searchParams), this.searchResultsPromiseState);
            //this.currentDishPromiseState = resolvePromise(getDishDetails(id), this.searchResultsPromiseState);
        }*/  
    }
    removeDish(id){
        // callback exercise! Also return keyword exercise
        function hasSameIdCB(dish){
            return id !== dish.id;
            // TODO return true if the id property of dish is _different_ from the dishToRemove's id property
            // This will keep the dish when we filter below.
            // That is, we will not keep the dish that has the same id as dishToRemove (if any)
        }
        this.dishes = this.dishes.filter(hasSameIdCB);
    // the test "can remove dishes" should pass
    }

    setSearchQuery(q){
        this.searchParams.query = q;

    }

    setSearchType(t){
        this.searchParams.type = t;
    }

    doSearch(params){

        if(!params)
            resolvePromise(searchDishes(this.searchParams), this.searchResultsPromiseState);
        else
            resolvePromise(searchDishes(params), this.searchResultsPromiseState);
    }

}

export default DinnerModel;
