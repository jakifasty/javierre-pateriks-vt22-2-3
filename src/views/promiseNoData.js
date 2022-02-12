function promiseNoData(props){
  function render (promise, data, error){
    if(!promise){

      return <div>no data</div>
    }else if(promise && !data && !error){
      return  <img height="100" src="https://i.stack.imgur.com/kOnzy.gif"></img>
    }else if(error){
      return <div>{error}</div>
    }else return ""
  }
  return render(props.promise, props.data, props.error);
}
export default promiseNoData;
