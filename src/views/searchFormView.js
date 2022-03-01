function SearchFormView(props){
  function listCB(option, index){
    return <option key={index+1} value={option}>{option}</option>;
  }
  return (
          <div>
              <div>
                <table>
                <thead>
                </thead>
                <tbody>
                <tr>
                <td>
                <input type="text" onChange = {function(event){props.search(event.target.value)}}>
                </input>
                </td>
                <td>
                <select onChange = {function(event){props.choiceChangeACB(event.target.value)}}>
                <option key={0} value="default">
                Choose:
                </option>
                  {props.dishTypeOptions.map(listCB)}
                </select>
                </td>
                <td>
                <button onClick = {function(event){props.click()}}>
                Search!
                </button>
                </td>
                <td width="200px"></td>
                <td>
                <button onClick = {function(event){window.location.hash="summary"}}>
                Summary
                </button>
                </td>
                </tr>
                </tbody>
                </table>
              </div>
          </div>
  );
}
export default SearchFormView;
