import { combineReducers } from "redux"
import graphReducer from "./graphReducer"
import mapReducer from "./mapReducer"


export default combineReducers({
    data: graphReducer,
    map: mapReducer
})
