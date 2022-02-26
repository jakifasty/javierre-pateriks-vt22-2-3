function SearchFormView(props){
  function listCB(option, index){
    return <option key={index+1} value={option}>{option}</option>;
  }
  return (
          <div>
              <div>
                <input type="text" onChange = {function(event){props.search(event.target.value)}}>
                </input>
                <select onChange = {function(event){props.choiceChangeACB(event.target.value)}}>
                <option key={0} value="default">
                Choose:
                </option>
                  {props.dishTypeOptions.map(listCB)}
                </select>
                <button onClick = {function(event){props.click()}}>
                Search!
                </button>
                <button onClick = {function(event){window.location.hash="summary"}}>
                Summary
                </button>
              </div>
          </div>
  );
}
export default SearchFormView;
