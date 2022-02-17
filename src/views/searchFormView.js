function SearchFormView(props){
  function listCB(option, index){
    return <option value={option}>{option}</option>;
  }
  return (
          <div>
              <div>
                <input type="text" onchange = {function(event){props.search(this.value)}}>
                </input>
                <select onchange = {function(event){props.choiceChangeACB(this.value)}}>
                <option value="default">
                Choose:
                </option>
                  {props.dishTypeOptions.map(listCB)}
                </select>
                <button onclick = {function(event){props.click()}}>
                Search!
                </button>
              </div>
          </div>
  );
}
export default SearchFormView;
