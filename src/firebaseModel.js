import DinnerModel from "./DinnerModel.js";
import firebaseConfig from "/src/firebaseConfig.js";
import  {searchDishes, getDishDetails} from "./dishSource.js";
firebase.initializeApp(firebaseConfig);
//  REF is the “root” Firebase path. NN is your TW2_TW3 group number
const REF="dinnerModel35";
function updateFirebaseFromModel(model){

  function observerACB(payload){
    if(payload){
      if(payload.numberOfGuests){
        firebase.database().ref(REF+"/numberOfGuests").set(payload.numberOfGuests);
      }
      if(payload.setCurrentDish) firebase.database().ref(REF+"/setCurrentDish").set(model.currentDish);
      if(payload.addDish && payload.addDish.id) firebase.database().ref(REF+"/menuDishes/"+payload.addDish.id).set(payload.addDish);
      if(payload.removeDish && payload.removeDish.id) firebase.database().ref(REF+"/menuDishes/"+payload.removeDish.id).set(null);
    }
  }
  model.addObserver(observerACB);

}
function updateModelFromFirebase(model){

  firebase.database().ref(REF+"/numberOfGuests").on("value",
   function guestsChangedInFirebaseACB(firebaseData){model.setNumberOfGuests(firebaseData.val());}
  );
  firebase.database().ref(REF+"/setCurrentDish").on("value",
   function cdChangedInFirebaseACB(firebaseData){model.setCurrentDish(firebaseData.val());}
  );
  firebase.database().ref(REF+"/menuDishes").on("child_added",
         function dishesChangedInFirebaseACB(firebaseData){
           function hasSameIdCB(dish){
             return +firebaseData.key === dish.id;
               // TODO return true if the id property of dish is _different_ from the dishToRemove's id property
               // This will keep the dish when we filter below.
               // That is, we will not keep the dish that has the same id as dishToRemove (if any)
           }
           let hasDish = [];
           hasDish = model.dishes.filter(hasSameIdCB);
           if(hasDish.length == 0){
             getDishDetails(+firebaseData.key).then(function addToMenuACB(dish){model.addToMenu(dish)})
           }
         }
  );
  firebase.database().ref(REF+"/menuDishes").on("child_removed",
   function dishesChangedInFirebaseACB(firebaseData){
     model.removeDish(+firebaseData.key);
   }
  );
}
function firebaseModelPromise(){
  function makeBigPromiseACB(firebaseData){
    function createModelACB(dishes){
      let numberOfGuests = firebaseData.val().numberOfGuests? firebaseData.val().numberOfGuests : 1;
      return new DinnerModel(numberOfGuests, dishes);
    }
    function makeDishPromiseCB(dishId){
      return getDishDetails(dishId);
    }
    const dishPromiseArray= Object.keys(firebaseData.val().menuDishes).map(makeDishPromiseCB);
    return Promise.all(dishPromiseArray).then(createModelACB);
  }
  return firebase.database().ref(REF).once("value").then(makeBigPromiseACB);
}
export {updateFirebaseFromModel, updateModelFromFirebase, firebaseModelPromise};
