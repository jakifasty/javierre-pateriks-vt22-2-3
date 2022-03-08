import resolvePromise from "./resolvePromise.js";
import {searchDishes, getDishDetails} from "./dishSource.js";
import {isDishInMenu} from "./utilities.js"
    
function isValid(id){
  return (typeof(id) == "number")
}

class DinnerModel{
    constructor(observerArray=[], nrGuests=2, dishArray=[], currentDish){
        this.observers = observerArray; //empty array
        this.setNumberOfGuests(nrGuests);
        this.dishes= dishArray;
        //this.currentDish = {}; //ADDED TESTING

        this.currentDishPromiseState = {};
        this.searchResultsPromiseState = {} ; //(property). DinnerModel constructor, set model properties to empty objects
        this.searchParams = {}; //(property). DinnerModel constructor, set model properties to empty objects
        this.searchResultsPromiseState = {};
        this.currentDishPromiseState = {};
        this.searchParams = {};
    }
    setNumberOfGuests(nr){
        if(Number.isInteger(nr) & nr>0){
            if (!(this.numberOfGuests === nr)){
                this.numberOfGuests = nr;
                this.notifyObservers({numberOfGuests: nr}) //first the key (numberOfGuests) and then the value
            }
        }else {
            throw new Error ('number of guests not a positive integer');
        }

        // TODO throw an error if the argument is smaller than 1 or not an integer
        // the error message must be exactly "number of guests not a positive integer"
        // to check for integer: test at the console Number.isInteger(3.14)

        // TODO if the argument is a valid number of guests, store it in this.numberOfGuests

        // when this is done the TW1.1 DinnerModel "can set the number of guests" should pass
        // also "number of guests is a positive integer"
    }
    
    addToMenu(addDish){
        // array spread syntax example. Make sure you understand the code below.
        // It sets this.dishes to a new array [   ] where we spread (...) the previous value
        console.log(isDishInMenu)
        if(!isDishInMenu(this.dishes, addDish.id)){
            this.dishes = [...this.dishes, addDish];
            this.notifyObservers({dishToAdd: addDish});
        }
    }

    removeFromMenu(dishToRemove){
        // callback exercise! Also return keyword exercise
        function hasSameIdCB(dish){
            return dishToRemove.id !== dish.id;
            // TODO return true if the id property of dish is _different_ from the dishToRemove's id property
            // This will keep the dish when we filter below.
            // That is, we will not keep the dish that has the same id as dishToRemove (if any)
        }

        if(isDishInMenu(this.dishes, dishToRemove.id)){
            this.dishes = this.dishes.filter(hasSameIdCB);
            // the test "can remove dishes" should pass
            this.notifyObservers({toRemoveDish: dishToRemove});
        }

    }

    /*
       ID of dish currently checked by the user.
       A strict MVC/MVP Model would not keep such data,
       but we take a more relaxed, "Application state" approach.
       So we store also abstract data that will influence the application status.
    */
    setCurrentDish(id){
        /*if((typeof(id) === "number") && (id !== null)  && (id !== this.currentDish)){
            
            resolvePromise(getDishDetails(id), this.currentDishPromiseState);
        }
        else*/

        /*if((typeof(id) === "defined") && (id !== currentDish.id)){
            this.currentDishPromiseState = resolvePromise(searchDishes(this.searchParams), this.searchResultsPromiseState);
            //this.currentDishPromiseState = resolvePromise(getDishDetails(id), this.searchResultsPromiseState);
        }*/

        console.log(id)
        let myModel = this;
        
        function notifyACB(){
            myModel.notifyObservers(null); 
        }

        if(!id || id == this.currentDish || !isValid(id)) return;
            
        resolvePromise(getDishDetails(id), this.currentDishPromiseState, notifyACB);

        this.currentDish = id;

        this.notifyObservers({setCurrentDish: id});
    }

    setSearchQuery(q){
        this.searchParams.query = q;

    }

    setSearchType(t){
        this.searchParams.type = t;
    }

    doSearch(params){
        const theModel = this;
        
        function notifyACB(){
            theModel.notifyObservers(); 
        }

        if(!params)
            resolvePromise(searchDishes(this.searchParams), this.searchResultsPromiseState, notifyACB);
        else
            resolvePromise(searchDishes(params), this.searchResultsPromiseState, notifyACB);
    }
    
    removeDish(id){
        //callback exercise! Also return keyword exercise
        function hasSameIdCB(dish){
            return id !== dish.id;
            // TODO return true if the id property of dish isDishEqualCB _different_ from the dishToRemove's id property
            // This will keep the dish when we filter below.
            // That is, we will not keep the dish that has the same id as dishToRemove (if any)
        }
        this.dishes= this.dishes.filter(hasSameIdCB/*TODO pass the callback!*/);
        //the test "can remove dishes" should pass
    }

    //new methods TW3
    addObserver(callback){
        this.observers = [...this.observers, callback];
    }

    removeObserver(callback){ //to remove observer for 

        console.log(callback);

        function hasSameIdCallbackCB(id){
            return callback!==id;
        }

        this.observers = this.observers.filter(hasSameIdCallbackCB) 
    }


    //this method will be called 
    notifyObservers(payload){
        try{
            this.observers.forEach(function invokeObserverCB(obs){obs(payload);}) //payload is used for the persistance
        }
        catch(err){
            console.error(err);
        }
    }

}

export default DinnerModel;
