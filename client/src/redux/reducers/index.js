import breedReducer from "./BreedReducer";
import { combineReducers } from 'redux'

export default combineReducers({
    breed: breedReducer
})