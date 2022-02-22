/*
   This component uses Vue-specific and React-specific presenters: Sidebar, Summary, Search, Details, Show
   Therefore it needs to import from alternative paths, depending on the framework.
   To achieve that, we use require() with a prefix, instead of import.
*/
const PREFIX=window.location.toString().includes("react")?"reactjs":"vuejs";

const Summary=require("../"+PREFIX+"/summaryPresenter.js").default;
const Sidebar=require("../"+PREFIX+"/sidebarPresenter.js").default;
const Search=require("../"+PREFIX+"/searchPresenter.js").default;
const Details=require("../"+PREFIX+"/detailsPresenter.js").default;

export default
function App(props){
    return (<div class="flexParent">
                <span class="sidebar">
                    <Sidebar model={props.model} />
                    <Summary model={props.model}/>
                </span>
                <span class="mainContent">
                    <Search model={props.model}/>
                    <Details model={props.model}/>
                </span>
            </div>
    );
}
