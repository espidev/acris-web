import React from 'react';
import "@patternfly/react-core/dist/styles/base.css";

import {Provider} from "react-redux";
import {persistor, store} from "../redux/store";
import {PersistGate} from 'redux-persist/integration/react'

import {BrowserRouter as Router} from "react-router-dom";

import PlayerPanel from "./panels/PlayerPanel";

import {initializeIcons} from "@uifabric/icons";
import AcrisContainer from "./AcrisContainer";
initializeIcons();

export default class Acris extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router>
                        <AcrisContainer/>
                    </Router>
                </PersistGate>
            </Provider>
        )
    }
}
