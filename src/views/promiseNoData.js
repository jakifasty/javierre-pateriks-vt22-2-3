function promiseNoData(props){
  let loading_gif = "https://i.stack.imgur.com/kOnzy.gif";
  let lama = "https://www.icegif.com/wp-content/uploads/icegif-30.gif";
  function render (promise, data, error){
    if(!promise){

      return <div>no data</div>
    }else if(promise && !data && !error){
      return  <img height="200" src={lama}></img>
    }else if(error){
      return <div>{error}</div>
    }else return ""
  }
  return render(props.promise, props.data, props.error);
}
export default promiseNoData;
