import AuthReducer from "./slices/authSlice";
import PlayerReducer from "./slices/playerSlice";

import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import storage from 'redux-persist/lib/storage'
import {persistStore, persistReducer} from 'redux-persist'

// why is javascript land so damn fragmented, why do i need a million dependencies just to manage state

const reducer = combineReducers({
    auth: AuthReducer,
    player: PlayerReducer,
});

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);