/*
   This component uses Vue-specific and React-specific presenters: Sidebar, Summary, Search, Details, Show
   Therefore it needs to import from alternative paths, depending on the framework.
   To achieve that, we use require() with a prefix, instead of import.
*/
const PREFIX=window.location.toString().includes("react")?"reactjs":"vuejs";

const Sidebar=require("../"+PREFIX+"/sidebarPresenter.js").default;
const Summary=require("../"+PREFIX+"/summaryPresenter.js").default;
const Search=require("../"+PREFIX+"/searchPresenter.js").default;
const Details=require("../"+PREFIX+"/detailsPresenter.js").default;
const Show=require("../"+"reactjs"+"/show.js").default;
export default
function App(props){
    window.location.hash = "search"
    return (<div class="flex-container">
                {/* TODO TW1.2 Sidebar will be added here, inside a DIV, like Summary below */}
                <div  class="flex-item-left">
                  <Sidebar model={props.model} />
                </div>
                <div  class="flex-item-right">
                <Show hash="#search"><Search model={props.model}/></Show>
                <Show hash="#details"><Details model={props.model}/></Show>
                <Show hash="#summary"><Summary model={props.model}/></Show>
                </div>
            </div>
           );
}
