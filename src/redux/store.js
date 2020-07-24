import AuthReducer from "./slices/authSlice";
import PlayerReducer from "./slices/playerSlice";

import { createStore, combineReducers } from 'redux';

import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

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