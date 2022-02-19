/*
   This component uses Vue-specific and React-specific presenters: Sidebar, Summary, Search, Details, Show
   Therefore it needs to import from alternative paths, depending on the framework.
   To achieve that, we use require() with a prefix, instead of import.
*/
const PREFIX=window.location.toString().includes("react")?"reactjs":"vuejs";

const Sidebar=require("../"+PREFIX+"/sidebarPresenter.js").default;
<<<<<<< HEAD
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
=======
const Summary=require("../"+PREFIX+"/summaryPresenter.js").default;
const Search=require("../"+PREFIX+"/searchPresenter.js").default;
export default
function App(props){
    return (<div class="flexParent">
                {/* TODO TW1.2 Sidebar will be added here, inside a DIV, like Summary below */}
                <div  class="sidebar"><Sidebar model={props.model} /></div>
                <div  class="mainContent"><Summary model={props.model} /></div>
>>>>>>> 52c62853d00c39c1985886e5ef82b30e193bdacd
            </div>
    );
}
