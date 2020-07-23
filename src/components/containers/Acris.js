import React from 'react';
import "@patternfly/react-core/dist/styles/base.css";

import {Provider} from "react-redux";
import {store} from "../../redux/store";

import LandingPage from "./Landing";
import Login from "./Login";
import Sidebar from "./Sidebar";
import Header from "./Header";

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

export default class Acris extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Page isManagedSidebar header={<Header/>} sidebar={<Sidebar/>}>
                        <PageSection variant={PageSectionVariants.light}>
                            <Switch>
                                <Route path="/"><LandingPage/></Route>
                                <Route path="/collection/:collection_id/tracks"/>
                                <Route path="/collection/:collection_id/albums"/>
                                <Route path="/collection/:collection_id/artists"/>
                                <Route path="/collection/:collection_id/genres"/>
                                <Route path="/collection/:collection_id/playlists"/>
                                <Route path="/login" component={Login}/>
                            </Switch>
                        </PageSection>
                    </Page>
                </Router>
            </Provider>
        )
    }
}
