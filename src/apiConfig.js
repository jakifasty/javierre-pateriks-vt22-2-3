//source/apiConfig.js file

const BASE_URL="https://brfenergi.se/iprog/group/35/";   // the DH2642 proxy server for group 35
const API_KEY="3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767";

//TODO: export (not default) BASE_URL and API_KEY
export {BASE_URL, API_KEY}; //if not working, try export BASE_URL; if not working, try export API_KEY;

// then in other files you can write import {BASE_URL, API_KEY} from /src/apiConfig.js;