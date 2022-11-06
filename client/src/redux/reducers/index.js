import breedsReducer from "./BreedReducer";
import tempsReducer from "./TemperamentReducer";
import { combineReducers } from 'redux'

export default combineReducers({
    breeds: breedsReducer,
    temps: tempsReducer
})