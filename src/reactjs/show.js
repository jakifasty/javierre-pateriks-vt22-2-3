export default
function Show(props){
  const [hashState, setHash]=React.useState(window.location.hash);
  function hashListenerACB(){ setHash(window.location.hash);}
  function wasCreatedACB(){
      window.addEventListener("hashchange", hashListenerACB);   // 1 subscribe
      function tearDownACB(){ window.removeEventListener("hashchange", listener); }
      return tearDownACB;
  }
  React.useEffect(wasCreatedACB, []);
  console.log(hashState, props.hash);
  let classe = (hashState === props.hash)? "" : "hidden";
  return <div class={classe}>{props.children}</div>
}
