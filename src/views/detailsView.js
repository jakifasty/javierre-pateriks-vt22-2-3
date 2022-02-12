function DetailsView(props){
  console.log(props.dishData)
  function listCB(item){
    return <li>{item.name}: {item.amount} {item.unit}</li>;
  }
  return (
          <div>
              <span class="details">
                <span>
                <h1>{props.dishData.title}</h1>
                </span>
                <span>
                  <img height="100" src={props.dishData.image}></img>
                  <div class="detailsprice">
                  Price {props.dishData.pricePerServing.toFixed(2)}
                  <p></p>
                  For {props.guests} {(props.dishData.pricePerServing*props.guests).toFixed(2)}
                  </div>
                </span>
                <span>
                <h2>Ingredients:</h2>
                {props.dishData.extendedIngredients.map(listCB)}
                </span>
                <span>
                <h2>Instructions:</h2>
                {props.dishData.instructions}
                </span>
                <span>
                <p>
                <a href={props.dishData.sourceUrl}>More information</a>
                </p>
                </span>
              </span>
              <button onClickCapture={function clickACB(event){props.addToMenu()}} disabled={props.isDishInMenu}>
              Add to menu!
              </button>
          </div>
  );
}
export default DetailsView;
