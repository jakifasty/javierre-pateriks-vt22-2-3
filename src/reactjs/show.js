export default
function Show(props){
  const [hashState, setHash] = React.useState(window.location.hash);

  function hashListenerACB(){ 
    setHash(window.location.hash);
  }

  function wasCreatedACB(){
    window.addEventListener("hashchange", hashListenerACB);   // 1 subscribe
    function tearDownACB(){ window.removeEventListener("hashchange", hashListenerACB); }
    return tearDownACB;
  }
  
  React.useEffect(wasCreatedACB, []);
  let clas = (hashState === props.hash)? "" : "hidden";
  return <div class={clas}>{props.children}</div>
}