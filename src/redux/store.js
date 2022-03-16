import { combineReducers, createStore } from "redux";
import login from "./login.js";
import contact from "./contact.js";

let reducers = combineReducers({
    login: login,
    contact: contact
});

let store = createStore(reducers);

 window.store = store;

 export default store;