import resolvePromise from "./resolvePromise.js";
import  {searchDishes, getDishDetails} from "./dishSource.js";
/* This is an example of a JavaScript class.
   The Model keeps only abstract data and has no notions of graohics or interaction
*/
function isValid(id){
  return (typeof(id) == "number");
}
class DinnerModel{
    constructor(nrGuests=2, dishArray=[], currentDish){
        this.observers = [];
        this.setNumberOfGuests(nrGuests);
        this.dishes= dishArray;
        this.searchResultsPromiseState = {};
        this.currentDishPromiseState = {};
        this.searchParams = {};
    }
    notifyObservers(payload){
      function invokeObserverCB(obs){
        try{
          obs(payload);
        }catch (err){
          console.log(err);
        }
      }
      this.observers.forEach(invokeObserverCB);
    }
    setNumberOfGuests(nr){
        if(Number.isInteger(nr) & nr>0){
          if(nr !== this.numberOfGuests){
            this.numberOfGuests = nr;
            this.notifyObservers({numberOfGuests : nr});
          }
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
        function hasSameIdCB(dish){
          return dishToAdd.id === dish.id;
            // TODO return true if the id property of dish is _different_ from the dishToRemove's id property
            // This will keep the dish when we filter below.
            // That is, we will not keep the dish that has the same id as dishToRemove (if any)
        }
        let hasDish = [];
        hasDish = this.dishes.filter(hasSameIdCB/*TODO pass the callback!*/);
        if(hasDish.length == 0){
          this.dishes= [...this.dishes, dishToAdd];
          this.notifyObservers({addDish : dishToAdd})
        }
    }

    removeFromMenu(dishToRemove){
      // callback exercise! Also return keyword exercise
      function hasSameIdCB(dish){
        return dishToRemove.id === dish.id;
          // TODO return true if the id property of dish isDishEqualCB _different_ from the dishToRemove's id property
          // This will keep the dish when we filter below.
          // That is, we will not keep the dish that has the same id as dishToRemove (if any)
      }
      let toRemove = []
      toRemove = this.dishes.filter(hasSameIdCB);
      if(toRemove.length == 0){

      }else{
        this.notifyObservers({removeDish: dishToRemove});
        this.dishes= this.dishes.filter(function notSameIdCB(dish){return dishToRemove.id !== dish.id;});/*TODO pass the callback!*/

      }
    }

    /*
       ID of dish currently checked by the user.
       A strict MVC/MVP Model would not keep such data,
       but we take a more relaxed, "Application state" approach.
       So we store also abstract data that will influence the application status.
     */
     setCurrentDish(id){
        const theModel = this;
        function notifyACB() {theModel.notifyObservers(null);};
         if(!id || id == this.currentDish || !isValid(id)){

         }
         else{
           this.currentDish= id;
           resolvePromise(getDishDetails(id), this.currentDishPromiseState, notifyACB);
           this.notifyObservers({setCurrentDish : id});
         }
     }
     removeDish(id){
       // callback exercise! Also return keyword exercise
       function hasSameIdCB(dish){
         return id === dish.id;
           // TODO return true if the id property of dish isDishEqualCB _different_ from the dishToRemove's id property
           // This will keep the dish when we filter below.
           // That is, we will not keep the dish that has the same id as dishToRemove (if any)
       }
       let toRemove = []
       toRemove = this.dishes.filter(hasSameIdCB);
       if(toRemove.length == 0){

       }else{
         //notifyObservers({removeDish: id});
         this.dishes= this.dishes.filter(function notSameIdCB(){return id !== dish.id;});

       }
       // the test "can remove dishes" should pass
     }
     setSearchQuery(q){
       this.searchParams.query = q;
       this.notifyObservers();
     }
     setSearchType(t){
       this.searchParams.type = t;
       this.notifyObservers();
     }
     doSearch(params){
       const theModel = this;
       function notifyACB() {theModel.notifyObservers(null);};
       if(params){
         resolvePromise(searchDishes(params), this.searchResultsPromiseState, notifyACB);
       }
       else{
         resolvePromise(searchDishes(this.searchParams), this.searchResultsPromiseState, notifyACB);
       }
     }
     addObserver(callback){
       this.observers = [...this.observers, callback];
     }
     removeObserver(callback){
       function removeCB(cb){
         (cb === callback)? false : true;
       }
       this.observers = this.observers.filter(removeCB);
     }

}

export default DinnerModel;
