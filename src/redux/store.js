import AuthReducer from "./slices/authSlice";
import PlayerReducer from "./slices/playerSlice";

import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'connected-react-router'
import storage from 'redux-persist/lib/storage'
import {persistStore, persistReducer} from 'redux-persist'
import {connectRouter} from 'connected-react-router';
import {createBrowserHistory} from 'history';

// why is javascript land so damn fragmented, why do i need a million dependencies just to manage state

export const history = createBrowserHistory();

const reducer = combineReducers({
    router: connectRouter(history),
    auth: AuthReducer,
    player: PlayerReducer,
});

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer, compose(applyMiddleware(routerMiddleware(history))));
export const persistor = persistStore(store);