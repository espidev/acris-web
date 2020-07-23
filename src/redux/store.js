import AuthReducer from "./slices/authSlice";
import PlayerReducer from "./slices/playerSlice";
import { createStore, combineReducers } from 'redux';

const reducer = combineReducers({
    auth: AuthReducer,
    player: PlayerReducer,
});

export const store = createStore(reducer);