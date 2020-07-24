import React from 'react';
import "@patternfly/react-core/dist/styles/base.css";

import {Provider} from "react-redux";
import {persistor, store} from "../redux/store";
import {PersistGate} from 'redux-persist/integration/react'

import LandingPage from "./Landing";
import Login from "./Login";
import Sidebar from "./Sidebar";
import Header from "./header/Header";

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import {
    Page,
    PageSection,
    PageSectionVariants
} from "@patternfly/react-core";
import PlayerPanel from "./PlayerPanel";

import {initializeIcons} from "@uifabric/icons";
initializeIcons();

export default class Acris extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router>
                        <Page isManagedSidebar header={<Header/>} sidebar={<Sidebar/>}>
                            <PageSection variant={PageSectionVariants.light}>
                                <Switch>
                                    <Route exact path="/"><LandingPage/></Route>
                                    <Route exact path="/collection/:collection_id/tracks"/>
                                    <Route exact path="/collection/:collection_id/albums"/>
                                    <Route exact path="/collection/:collection_id/artists"/>
                                    <Route exact path="/collection/:collection_id/genres"/>
                                    <Route exact path="/collection/:collection_id/playlists"/>
                                    <Route exact path="/login"><Login/></Route>
                                </Switch>
                            </PageSection>
                        </Page>
                        <PlayerPanel/>
                    </Router>
                </PersistGate>
            </Provider>
        )
    }
}
