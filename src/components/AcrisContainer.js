import React from 'react';
import {connect} from "react-redux";
import {Route, withRouter, Redirect, Switch} from "react-router-dom";
import RouteTransition from './util/RouteTransition';

import {Page} from "@patternfly/react-core";

import Header from "./panels/Header";
import Sidebar from "./panels/Sidebar";
import Login from "./Login";
import PlayerPanel from "./panels/PlayerPanel";
import CollectionContainer from "./collection/CollectionRouteContainer";
import NewCollectionForm from "./collection/NewCollectionForm";
import CollectionSelect from "./collection/CollectionSelect";

const mapStateToProps = state => ({
    user: state.auth.user,
});

class AcrisContainer extends React.Component {

    render() {
        const PrivateRoute = ({ children, ...rest }) => {
            return (
                <Route
                    {...rest}
                    render={({ location }) =>
                        this.props.user !== null ? children : (
                            <Redirect
                                to={{
                                    pathname: "/login",
                                    state: { from: location }
                                }}
                            />
                        )
                    }
                />
            );
        }

        return (
            <div style={{"height": "100%"}}>
                <Page isManagedSidebar header={<Header/>} sidebar={(this.props.user === null) ? <React.Fragment/> : <Sidebar/>}>
                    <Switch>
                        <PrivateRoute exact path="/">{RouteTransition(CollectionSelect)()}</PrivateRoute>
                        <PrivateRoute exact path="/new-collection">{RouteTransition(NewCollectionForm)()}</PrivateRoute>
                        <PrivateRoute path="/collection/:collectionId">{RouteTransition(CollectionContainer)()}</PrivateRoute>
                        <Route exact path="/login">{RouteTransition(Login)()}</Route>
                    </Switch>
                </Page>

                {(this.props.user === null) ? <React.Fragment/> : <PlayerPanel/>}
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(AcrisContainer));