/*
   This component uses Vue-specific and React-specific presenters: Sidebar, Summary, Search, Details, Show
   Therefore it needs to import from alternative paths, depending on the framework.
   To achieve that, we use require() with a prefix, instead of import.
*/
const PREFIX = window.location.toString().includes("reactjs")?"reactjs":"vuejs";

const Summary = require("../"+PREFIX+"/summaryPresenter.js").default;
const Sidebar = require("../"+PREFIX+"/sidebarPresenter.js").default;
const Search = require("../"+PREFIX+"/searchPresenter.js").default;
const Details = require("../"+PREFIX+"/detailsPresenter.js").default;
const Show = require("../"+"reactjs"+"/show.js").default;

/*import Summary from "../reactjs/summaryPresenter.js";
import Sidebar from "../reactjs/sidebarPresenter.js";
import Search from "../reactjs/searchPresenter.js";
import Details from "../reactjs/detailsPresenter.js";
import Show from "../reactjs/show.js"*/
//const Show = require("../"+"reactjs"+"/show.js").default;
window.location.hash = "search"


export default
function App(props){
    return (<div class="flexParent">
                <span class="detailsRow">
                    <Show hash="#sidebar">{<Sidebar model={props.model}/>}</Show>
                </span>
                <span class="mainContent">
                    <Show hash="#summary">{<Summary model={props.model}/>}</Show>
                    <Show hash="#search">{<Search model={props.model}/>}</Show>
                    <Show hash="#details">{<Details model={props.model}/>}</Show>
                </span>
            </div>
    );
}

//<div class="sidebar"><Sidebar model={props.model} /></div>
//<div class="mainContent"><Summary model={props.model} /></div>
//<div class="mainContent"><Search model={props.model}/></div>
//<div class="mainContent"><Details model={props.model}/></div>
