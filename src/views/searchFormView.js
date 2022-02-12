function SearchFormView(props){
  function listCB(option, index){
    return <option value={index}>{option}</option>;
  }
  return (
          <div>
              <div>
                <input type="text" onchange = {function(event){props.search(this.value)}}>
                </input>
                <select onchange = {function(event){props.choice(this.value)}}>
                <option>
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
