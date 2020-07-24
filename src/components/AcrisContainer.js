import React from 'react';
import {connect} from "react-redux";
import {Route, Switch, withRouter, useParams, Redirect} from "react-router-dom";

import {Page} from "@patternfly/react-core";

import Header from "./panels/Header";
import Sidebar from "./panels/Sidebar";
import LandingPage from "./Landing";
import Login from "./Login";
import PlayerPanel from "./PlayerPanel";
import CollectionContainer from "./CollectionContainer";

const mapStateToProps = state => ({
    user: state.auth.user,
});

class AcrisContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const PrivateRoute = ({ children, ...rest }) => {
            return (
                <Route
                    {...rest}
                    render={({ location }) =>
                        this.props.user !== null ? (
                            children
                        ) : (
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
                        <PrivateRoute exact path="/"><LandingPage/></PrivateRoute>
                        <PrivateRoute path="/collection/:collectionId"><CollectionContainer/></PrivateRoute>
                        <Route exact path="/login"><Login/></Route>
                    </Switch>
                </Page>

                {(this.props.user === null) ? <React.Fragment/> : <PlayerPanel/>}
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(AcrisContainer));