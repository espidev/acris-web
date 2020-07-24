import React from 'react';
import {connect} from "react-redux";
import {Route, Switch, withRouter} from "react-router-dom";
import Header from "./panels/Header";
import Sidebar from "./panels/Sidebar";
import LandingPage from "./Landing";
import Login from "./Login";
import {Page} from "@patternfly/react-core";
import PlayerPanel from "./PlayerPanel";

const mapStateToProps = state => ({
    selectedCollection: state.player.collection,
    user: state.auth.user,
});

class AcrisContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{"height": "100%"}}>
                <Page isManagedSidebar header={<Header/>} sidebar={(this.props.user === null) ? <React.Fragment/> : <Sidebar/>}>
                    <Switch>
                        <Route exact path="/"><LandingPage/></Route>
                        <Route exact path="/collection/:collection_id/tracks"/>
                        <Route exact path="/collection/:collection_id/albums"/>
                        <Route exact path="/collection/:collection_id/artists"/>
                        <Route exact path="/collection/:collection_id/genres"/>
                        <Route exact path="/collection/:collection_id/playlists"/>
                        <Route exact path="/login"><Login/></Route>
                    </Switch>
                </Page>

                {(this.props.user === null || this.props.selectedCollection === null) ? <React.Fragment/> : <PlayerPanel/>}
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(AcrisContainer));