import SearchFormView from "../views/searchFormView.js";
import SearchResultsView from "../views/searchResultsView.js";
import promiseNoData from "../views/promiseNoData.js";
import  {searchDishes, getDishDetails} from "../dishSource.js";
const knownTypes=["starter", "main course", "dessert"];
export default
function Search(props){

  const [promise, setPromise]=React.useState();
  const [query, setQuery]=React.useState("");
  const [type, setType]=React.useState("");
  const [data, setData]= React.useState([]);
  const [error, setError]= React.useState([]);


  function wasCreatedACB(){
    setPromise(searchDishes({}))
  }
  React.useEffect(wasCreatedACB, []);

  function promiseChangedACB(){
    setData(null); setError(null);
  	let cancelled=false;
    function changedAgainACB(){ cancelled=true; };  // also called at teardown!
  	 if(promise)
     promise.then(function saveDataACB(dt){  if(!cancelled) setData(dt);})
         .catch(function saveErrACB(er){ if(!cancelled) setError(er);});
     return changedAgainACB;  // promiseChangedACB will be called for the new value!
    }
  React.useEffect(promiseChangedACB , [promise] );

  function clickACB(){
    setPromise(searchDishes({query: query, type: type}));
    //props.model.doSearch({query: props.model.searchParams.query, type: props.model.searchParams.type});
  }
  function searchACB(input){
    setQuery(input);
  }
  function choicesACB(input){
    setType(input);
  }
  function chooseDishACB(dish){
    //console.log("hello");
    props.model.setCurrentDish(dish.id);
  }
  return (
          <div>
                <SearchFormView dishTypeOptions={knownTypes} click={clickACB} search={searchACB} choiceChangeACB={choicesACB}/>
                {promiseNoData({promise: promise, data: data, error: error}) || <SearchResultsView searchResults={data} chooseDish={chooseDishACB}/>}
          </div>);
}
